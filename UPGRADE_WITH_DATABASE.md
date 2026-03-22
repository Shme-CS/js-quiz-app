# 🔥 Upgrade Quiz App with Database & Leaderboard

This guide shows you how to add a database and leaderboard to your Quiz Master app.

## 🎯 What We'll Build

- **Global Leaderboard**: Top 10 scores for each category
- **Score Persistence**: Scores saved to database
- **Real-time Updates**: See latest scores
- **User Rankings**: Compare with other players

---

## 📋 Prerequisites

1. Quiz app deployed on Vercel
2. Vercel account (free tier works)

---

## 🚀 Step-by-Step Implementation

### Step 1: Create Vercel Postgres Database

1. Go to https://vercel.com/dashboard
2. Click on your project (`js-quiz-app`)
3. Go to "Storage" tab
4. Click "Create Database"
5. Select "Postgres"
6. Choose a name: `quiz-leaderboard`
7. Click "Create"

**What happens:**
- Vercel creates a PostgreSQL database
- Automatically adds environment variables to your project
- No configuration needed!

---

### Step 2: Create Database Table

1. In Vercel dashboard, go to your database
2. Click "Query" tab
3. Run this SQL:

```sql
CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  time_taken INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_category_score ON leaderboard(category, score DESC);
CREATE INDEX idx_created_at ON leaderboard(created_at DESC);
```

**What this creates:**
- Table to store quiz scores
- Indexes for fast queries
- Automatic timestamps

---

### Step 3: Install Dependencies

Add this to your project:

```bash
npm install @vercel/postgres
```

Create `package.json` if you don't have one:

```json
{
  "name": "quiz-master",
  "version": "1.0.0",
  "dependencies": {
    "@vercel/postgres": "^0.5.0"
  }
}
```

---

### Step 4: Create API Endpoints

#### API 1: Save Score

**File: `api/save-score.js`**

```javascript
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { 
      playerName, 
      score, 
      totalQuestions, 
      category, 
      difficulty,
      timeTaken 
    } = req.body;
    
    // Validate input
    if (!playerName || score === undefined || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Save to database
    const result = await sql`
      INSERT INTO leaderboard 
        (player_name, score, total_questions, category, difficulty, time_taken)
      VALUES 
        (${playerName}, ${score}, ${totalQuestions}, ${category}, ${difficulty}, ${timeTaken})
      RETURNING id, created_at
    `;
    
    res.status(200).json({ 
      success: true, 
      message: 'Score saved!',
      id: result.rows[0].id,
      timestamp: result.rows[0].created_at
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to save score',
      details: error.message 
    });
  }
}
```

#### API 2: Get Leaderboard

**File: `api/leaderboard.js`**

```javascript
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const { category, difficulty, limit = 10 } = req.query;
    
    let query;
    
    // Filter by category and difficulty if provided
    if (category && difficulty) {
      query = sql`
        SELECT 
          player_name,
          score,
          total_questions,
          category,
          difficulty,
          time_taken,
          created_at,
          RANK() OVER (ORDER BY score DESC, time_taken ASC) as rank
        FROM leaderboard
        WHERE category = ${category} AND difficulty = ${difficulty}
        ORDER BY score DESC, time_taken ASC
        LIMIT ${parseInt(limit)}
      `;
    } else if (category) {
      query = sql`
        SELECT 
          player_name,
          score,
          total_questions,
          category,
          difficulty,
          time_taken,
          created_at,
          RANK() OVER (ORDER BY score DESC, time_taken ASC) as rank
        FROM leaderboard
        WHERE category = ${category}
        ORDER BY score DESC, time_taken ASC
        LIMIT ${parseInt(limit)}
      `;
    } else {
      // All categories
      query = sql`
        SELECT 
          player_name,
          score,
          total_questions,
          category,
          difficulty,
          time_taken,
          created_at,
          RANK() OVER (ORDER BY score DESC, time_taken ASC) as rank
        FROM leaderboard
        ORDER BY score DESC, time_taken ASC
        LIMIT ${parseInt(limit)}
      `;
    }
    
    const result = await query;
    
    res.status(200).json({ 
      leaderboard: result.rows,
      count: result.rows.length
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch leaderboard',
      details: error.message 
    });
  }
}
```

#### API 3: Get User Rank

**File: `api/get-rank.js`**

```javascript
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const { playerName, category } = req.query;
    
    if (!playerName) {
      return res.status(400).json({ error: 'Player name required' });
    }
    
    const result = await sql`
      WITH ranked_scores AS (
        SELECT 
          player_name,
          score,
          category,
          RANK() OVER (
            PARTITION BY category 
            ORDER BY score DESC, time_taken ASC
          ) as rank
        FROM leaderboard
      )
      SELECT * FROM ranked_scores
      WHERE player_name = ${playerName}
      ${category ? sql`AND category = ${category}` : sql``}
      ORDER BY rank ASC
    `;
    
    res.status(200).json({ 
      rankings: result.rows
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch rank',
      details: error.message 
    });
  }
}
```

#### API 4: Get Statistics

**File: `api/stats.js`**

```javascript
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const stats = await sql`
      SELECT 
        COUNT(*) as total_games,
        COUNT(DISTINCT player_name) as total_players,
        AVG(score) as average_score,
        MAX(score) as highest_score,
        category,
        COUNT(*) as games_per_category
      FROM leaderboard
      GROUP BY category
    `;
    
    const recentGames = await sql`
      SELECT 
        player_name,
        score,
        category,
        created_at
      FROM leaderboard
      ORDER BY created_at DESC
      LIMIT 5
    `;
    
    res.status(200).json({ 
      statistics: stats.rows,
      recentGames: recentGames.rows
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch statistics',
      details: error.message 
    });
  }
}
```

---

### Step 5: Update Frontend JavaScript

Add these functions to `js/script.js`:

```javascript
// ===================================
// API Functions
// ===================================

async function saveScoreToDatabase(playerName, score, totalQuestions, category, difficulty, timeTaken) {
    try {
        const response = await fetch('/api/save-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerName,
                score,
                totalQuestions,
                category,
                difficulty,
                timeTaken
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('Score saved successfully!');
            return true;
        } else {
            console.error('Failed to save score:', data.error);
            return false;
        }
    } catch (error) {
        console.error('Error saving score:', error);
        return false;
    }
}

async function loadLeaderboard(category, difficulty, limit = 10) {
    try {
        const params = new URLSearchParams({
            category,
            difficulty,
            limit
        });
        
        const response = await fetch(`/api/leaderboard?${params}`);
        const data = await response.json();
        
        return data.leaderboard || [];
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        return [];
    }
}

async function getUserRank(playerName, category) {
    try {
        const params = new URLSearchParams({ playerName, category });
        const response = await fetch(`/api/get-rank?${params}`);
        const data = await response.json();
        
        return data.rankings || [];
    } catch (error) {
        console.error('Error getting rank:', error);
        return [];
    }
}

async function getStatistics() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error getting statistics:', error);
        return null;
    }
}

// ===================================
// Update endQuiz function
// ===================================

function endQuiz() {
    stopTimer();
    appState.endTime = Date.now();
    
    // Calculate results
    const results = calculateScore();
    
    // Ask for player name
    const playerName = prompt('Enter your name for the leaderboard:') || 'Anonymous';
    
    // Save to database
    saveScoreToDatabase(
        playerName,
        appState.score,
        appState.questions.length,
        appState.currentCategory,
        appState.currentDifficulty,
        results.time
    );
    
    // Show results
    showResults();
    
    // Load and display leaderboard
    displayLeaderboard();
}

// ===================================
// Display Leaderboard
// ===================================

async function displayLeaderboard() {
    const leaderboard = await loadLeaderboard(
        appState.currentCategory,
        appState.currentDifficulty
    );
    
    // Create leaderboard HTML
    const leaderboardHTML = `
        <div class="leaderboard-section">
            <h3>🏆 Top 10 Players</h3>
            <div class="leaderboard-list">
                ${leaderboard.map((entry, index) => `
                    <div class="leaderboard-entry">
                        <span class="rank">#${index + 1}</span>
                        <span class="player-name">${entry.player_name}</span>
                        <span class="score">${entry.score}/${entry.total_questions}</span>
                        <span class="time">${entry.time_taken}s</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add to result screen
    const resultCard = document.querySelector('#resultScreen .quiz-card');
    const leaderboardDiv = document.createElement('div');
    leaderboardDiv.innerHTML = leaderboardHTML;
    resultCard.appendChild(leaderboardDiv);
}
```

---

### Step 6: Add Leaderboard Styles

Add to `css/style.css`:

```css
/* ===================================
   Leaderboard Styles
   =================================== */

.leaderboard-section {
    margin-top: 30px;
    padding: 20px;
    background: var(--bg-secondary);
    border-radius: var(--border-radius-sm);
}

.leaderboard-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: var(--text-primary);
    font-size: 1.5rem;
}

.leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.leaderboard-entry {
    display: grid;
    grid-template-columns: 50px 1fr 80px 60px;
    align-items: center;
    padding: 15px;
    background: var(--bg-card);
    border-radius: var(--border-radius-sm);
    border-left: 4px solid var(--primary-color);
    transition: transform var(--transition-speed);
}

.leaderboard-entry:hover {
    transform: translateX(5px);
}

.leaderboard-entry:nth-child(1) {
    border-left-color: #FFD700; /* Gold */
}

.leaderboard-entry:nth-child(2) {
    border-left-color: #C0C0C0; /* Silver */
}

.leaderboard-entry:nth-child(3) {
    border-left-color: #CD7F32; /* Bronze */
}

.leaderboard-entry .rank {
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--primary-color);
}

.leaderboard-entry .player-name {
    font-weight: 600;
    color: var(--text-primary);
}

.leaderboard-entry .score {
    font-weight: 700;
    color: var(--secondary-color);
    text-align: right;
}

.leaderboard-entry .time {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-align: right;
}
```

---

### Step 7: Deploy to Vercel

```bash
# Commit changes
git add .
git commit -m "Add database integration and leaderboard"
git push

# Vercel automatically deploys!
```

---

## 🎯 Testing Your APIs

### Test Save Score:

```bash
curl -X POST https://your-app.vercel.app/api/save-score \
  -H "Content-Type: application/json" \
  -d '{
    "playerName": "John Doe",
    "score": 8,
    "totalQuestions": 10,
    "category": "javascript",
    "difficulty": "medium",
    "timeTaken": 245
  }'
```

### Test Get Leaderboard:

```bash
curl https://your-app.vercel.app/api/leaderboard?category=javascript&difficulty=medium
```

---

## 📊 What You've Built

✅ **Global Leaderboard** - Top players worldwide
✅ **Score Persistence** - Scores saved forever
✅ **Category Rankings** - Separate leaderboards per category
✅ **Difficulty Levels** - Rankings by difficulty
✅ **Time Tracking** - Faster times rank higher
✅ **Statistics** - Overall game stats
✅ **User Rankings** - See your position

---

## 🚀 Next Steps

### Add More Features:

1. **User Authentication**
   - Sign up/login
   - Personal profile
   - Score history

2. **Social Features**
   - Share scores
   - Challenge friends
   - Comments

3. **Advanced Stats**
   - Performance graphs
   - Category strengths
   - Improvement tracking

4. **Achievements**
   - Badges
   - Milestones
   - Rewards

---

## 💡 Pro Tips

1. **Rate Limiting**: Add rate limiting to prevent spam
2. **Validation**: Always validate user input
3. **Caching**: Cache leaderboard for better performance
4. **Pagination**: Add pagination for large leaderboards
5. **Real-time**: Use WebSockets for live updates

---

**Your Quiz App is now a full-stack application! 🎉**

Users can compete globally, track their progress, and see how they rank against others!
