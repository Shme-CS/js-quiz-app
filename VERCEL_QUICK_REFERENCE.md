# 🚀 Vercel Quick Reference Guide

## 📋 Quick Deploy Checklist

### Deploy Static Site (Like Quiz App)
```bash
# Method 1: Dashboard (Easiest)
1. Go to vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select your repository
5. Click "Deploy"
✅ Done in 2 minutes!

# Method 2: CLI
vercel login
vercel --prod
```

---

## 🎯 Common Use Cases

### 1. Static Website (HTML/CSS/JS)
**What you need:**
- HTML files
- CSS files
- JavaScript files

**Deploy:**
- Just push to GitHub
- Vercel serves files from CDN
- No configuration needed

**Example:** Your Quiz App ✅

---

### 2. React/Vue/Angular App
**What you need:**
- package.json
- Build command
- Output directory

**Vercel auto-detects:**
```json
{
  "scripts": {
    "build": "npm run build"
  }
}
```

**Deploy:**
- Push to GitHub
- Vercel builds automatically
- Serves from CDN

---

### 3. Next.js App (Best for Vercel)
**What you need:**
- Next.js project

**Deploy:**
- Push to GitHub
- Zero configuration
- Automatic optimization

**Features:**
- Server-side rendering
- API routes
- Image optimization
- Automatic code splitting

---

### 4. API/Backend (Serverless Functions)
**What you need:**
- `api/` folder
- JavaScript/Python/Go files

**Example Structure:**
```
project/
├── api/
│   ├── hello.js       # /api/hello
│   └── users.js       # /api/users
└── public/
    └── index.html
```

**Example Function:**
```javascript
// api/hello.js
export default function handler(req, res) {
  res.json({ message: 'Hello!' });
}
```

---

## 💾 Database Options

### Quick Comparison:

| Database | Setup Time | Best For | Free Tier |
|----------|-----------|----------|-----------|
| **Vercel Postgres** | 2 min | SQL data | 256 MB |
| **Vercel KV** | 1 min | Caching | Limited |
| **MongoDB Atlas** | 5 min | NoSQL | 512 MB |
| **Supabase** | 3 min | Full backend | 500 MB |
| **Firebase** | 5 min | Real-time | 1 GB |

### Vercel Postgres (Easiest):
```bash
# 1. Create in Vercel dashboard
# 2. Install package
npm install @vercel/postgres

# 3. Use in API
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const result = await sql`SELECT * FROM users`;
  res.json(result.rows);
}
```

### MongoDB Atlas:
```bash
# 1. Create cluster at mongodb.com/atlas
# 2. Get connection string
# 3. Add to Vercel env variables
# 4. Use in code

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
```

---

## 🔐 Environment Variables

### Add in Vercel Dashboard:
```
1. Project Settings
2. Environment Variables
3. Add:
   - Key: DATABASE_URL
   - Value: your-connection-string
   - Environment: Production
```

### Use in Code:
```javascript
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
```

### Common Variables:
```bash
DATABASE_URL=postgresql://...
MONGODB_URI=mongodb+srv://...
API_KEY=your-api-key
JWT_SECRET=your-secret
STRIPE_KEY=sk_test_...
```

---

## ⚡ Serverless Functions Cheat Sheet

### Basic Function:
```javascript
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello!' });
}
```

### Handle Methods:
```javascript
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST
  } else if (req.method === 'GET') {
    // Handle GET
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

### Dynamic Routes:
```javascript
// api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  res.json({ userId: id });
}
// Access: /api/users/123
```

### With Database:
```javascript
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const result = await sql`SELECT * FROM users`;
  res.json(result.rows);
}
```

### Error Handling:
```javascript
export default async function handler(req, res) {
  try {
    // Your code
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## 🌐 Custom Domains

### Add Domain:
```
1. Project Settings → Domains
2. Add your domain: myapp.com
3. Update DNS:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
4. Wait 5-60 minutes
5. HTTPS automatic!
```

---

## 📊 Useful Commands

### CLI Commands:
```bash
# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View logs
vercel logs

# Environment variables
vercel env add API_KEY
vercel env pull

# Remove deployment
vercel remove [deployment-url]

# Link to project
vercel link

# Get project info
vercel inspect
```

---

## 🎯 Configuration File

### vercel.json:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "redirects": [
    {
      "source": "/old",
      "destination": "/new",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

---

## 🔥 Common Patterns

### 1. Form Submission:
```javascript
// Frontend
async function submitForm(data) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Backend (api/submit.js)
export default async function handler(req, res) {
  const { name, email } = req.body;
  // Save to database
  res.json({ success: true });
}
```

### 2. Authentication:
```javascript
// api/login.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { username, password } = req.body;
  
  // Verify credentials
  if (valid) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}
```

### 3. File Upload:
```javascript
// api/upload.js
export default async function handler(req, res) {
  // Handle file upload
  // Save to storage (S3, Cloudinary, etc.)
  res.json({ url: 'uploaded-file-url' });
}
```

### 4. Send Email:
```javascript
// api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message
  });
  
  res.json({ success: true });
}
```

---

## 🐛 Troubleshooting

### Build Fails:
```bash
# Check logs in Vercel dashboard
# Common issues:
- Missing dependencies in package.json
- Wrong build command
- Environment variables not set
```

### Function Timeout:
```bash
# Free tier: 10 seconds max
# Pro tier: 60 seconds max
# Solution: Optimize code or upgrade
```

### Database Connection:
```bash
# Check environment variables
# Verify connection string
# Check database is running
# Review function logs
```

### CORS Errors:
```javascript
// Add CORS headers
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.json({ data: 'your data' });
}
```

---

## 📚 Resources

- **Docs**: https://vercel.com/docs
- **Examples**: https://github.com/vercel/examples
- **Templates**: https://vercel.com/templates
- **Community**: https://github.com/vercel/vercel/discussions
- **Status**: https://vercel-status.com

---

## 🎓 Learning Path

### Beginner:
1. Deploy static site
2. Add custom domain
3. Use environment variables

### Intermediate:
4. Create serverless functions
5. Add database (Vercel Postgres)
6. Implement API endpoints

### Advanced:
7. Use Edge Functions
8. Implement authentication
9. Add real-time features
10. Optimize performance

---

## 💡 Pro Tips

1. **Preview Deployments**: Every PR gets a unique URL
2. **Automatic HTTPS**: No configuration needed
3. **Global CDN**: Fast loading worldwide
4. **Zero Downtime**: Deployments are atomic
5. **Rollback**: Easy to revert to previous version
6. **Analytics**: Built-in performance monitoring
7. **Logs**: Real-time function logs
8. **Caching**: Automatic edge caching

---

## 🎯 Quick Start Projects

### 1. Static Portfolio:
```bash
# Just HTML/CSS/JS
# Push to GitHub → Deploy on Vercel
```

### 2. React App:
```bash
npx create-react-app my-app
cd my-app
# Push to GitHub → Deploy on Vercel
```

### 3. Next.js App:
```bash
npx create-next-app my-app
cd my-app
# Push to GitHub → Deploy on Vercel
```

### 4. API Backend:
```bash
# Create api/ folder
# Add functions
# Push to GitHub → Deploy on Vercel
```

---

**Remember: Vercel makes deployment simple. Push to GitHub and it handles the rest! 🚀**
