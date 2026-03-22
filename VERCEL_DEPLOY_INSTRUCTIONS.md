# Vercel Deployment Instructions

## 🚀 Deploy to Vercel

Your project is ready to deploy! Follow these steps:

### Step 1: Login to Vercel

Open your terminal in the `js-quiz-app` directory and run:

```bash
vercel login
```

This will open your browser. Choose your preferred login method:
- GitHub
- GitLab
- Bitbucket
- Email

### Step 2: Deploy the Project

Once logged in, run:

```bash
vercel --prod
```

### Step 3: Follow the Prompts

The CLI will ask you several questions:

1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account (Shme-CS)
3. **Link to existing project?** → No
4. **What's your project's name?** → js-quiz-app (or press Enter)
5. **In which directory is your code located?** → ./ (press Enter)
6. **Want to override the settings?** → No (press Enter)

### Step 4: Get Your Deployment URL

After deployment completes, you'll see:

```
✅ Production: https://js-quiz-app-xxxx.vercel.app [copied to clipboard]
```

### Step 5: Update README

Copy your Vercel URL and update the README.md file:

Replace this line:
```markdown
- **Live Demo (Vercel)**: [Deploy and add your Vercel URL here]
```

With your actual URL:
```markdown
- **Live Demo (Vercel)**: [https://your-actual-url.vercel.app](https://your-actual-url.vercel.app)
```

### Alternative: Deploy via Vercel Dashboard

If you prefer using the web interface:

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `Shme-CS/js-quiz-app`
4. Click "Deploy"
5. Wait for deployment to complete
6. Copy the deployment URL

## 📝 Post-Deployment

After deploying, commit the README update:

```bash
git add README.md
git commit -m "Update README with Vercel deployment URL"
git push
```

## 🎉 Done!

Your Quiz Master app is now live on Vercel!

### Useful Vercel Commands

- `vercel` - Deploy to preview
- `vercel --prod` - Deploy to production
- `vercel ls` - List deployments
- `vercel domains` - Manage domains
- `vercel logs` - View logs

## 🔧 Custom Domain (Optional)

To add a custom domain:

1. Go to your project on Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 📊 Deployment Status

- ✅ GitHub Repository: https://github.com/Shme-CS/js-quiz-app
- ⏳ Vercel Deployment: Pending (follow steps above)
- ⏳ GitHub Pages: Enable in repository settings

---

Need help? Check the [Vercel Documentation](https://vercel.com/docs)
