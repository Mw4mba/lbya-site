# Setup & Deployment Guide

## Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

## Local Development Setup

### 1. Install Dependencies
```bash
cd d:\apps2\silh
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see the site.

### 3. File Structure Overview
```
d:\apps2\silh\
├── src/
│   └── app/
│       ├── components/          # React components
│       ├── globals.css          # Global styles & animations
│       ├── layout.tsx           # Root layout wrapper
│       └── page.tsx             # Main home page
├── public/                      # Static assets
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── DESIGN.md                    # Design documentation
├── COMPONENTS.md                # Component guide
└── README.md                    # This file
```

## Development Workflow

### Making Changes
1. Edit component files in `src/app/components/`
2. Changes hot-reload automatically
3. Check browser console for errors
4. Use browser DevTools for inspection

### Adding New Sections
1. Create new component in `src/app/components/`
2. Import and add to `src/app/page.tsx`
3. Example:
```tsx
import NewSection from './components/NewSection';

export default function Home() {
  return (
    <main>
      {/* ... existing sections ... */}
      <NewSection />
    </main>
  );
}
```

### Styling
- Use Tailwind CSS classes for styling
- Create custom CSS in `globals.css` for complex styles
- Import animations from `globals.css` using class names

### Animations
- Import GSAP in components: `import gsap from 'gsap'`
- Register plugins: `gsap.registerPlugin(ScrollTrigger)`
- Use in useEffect with proper cleanup

## Building for Production

### Create Optimized Build
```bash
npm run build
```

This will:
- Compile TypeScript
- Optimize React components
- Build static assets
- Generate production bundle

### Test Production Build Locally
```bash
npm run build
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)
Vercel is created by the Next.js team and provides the best integration.

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/silh.git
git branch -M main
git push -u origin main
```

2. **Connect on Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will auto-detect Next.js and configure settings
- Click "Deploy"

3. **Custom Domain (Optional)**
- In Vercel project settings → Domains
- Add your domain and follow DNS instructions

#### Neon Postgres Setup (Recommended for Vercel)

Use Neon as the production database backend for Prisma.

1. Create a Neon project and copy the pooled connection string.
2. In Vercel Project Settings -> Environment Variables, set:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-long-random-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

3. Deploy schema migrations to Neon:

```bash
npx prisma migrate deploy
```

4. Optional local verification:

```bash
npx prisma generate
npm run build
```

Notes:
- Do not use SQLite for Vercel production in this project.
- If Prisma generate fails on Windows with an EPERM DLL rename error, stop active Node/Next processes and run again.

### Option 2: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t silh:latest .
docker run -p 3000:3000 silh:latest
```

### Option 3: Traditional Hosting (Netlify, GitHub Pages, etc.)

#### Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select repository
5. Set build command: `npm run build`
6. Set publish directory: `.next`
7. Deploy

#### Traditional Server (AWS, DigitalOcean, Linode)
```bash
# On your server:
sudo apt update && sudo apt install nodejs npm
git clone https://github.com/yourusername/silh.git
cd silh
npm install
npm run build
npm start
```

## Environment Variables

Create `.env.local` for local development:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Create `.env.production` for production:
```
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

Reference in code:
```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Performance Optimization

### Image Optimization
Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
/>
```

### Code Splitting
Next.js automatically code-splits at page/component level.

### CSS Optimization
Tailwind CSS purges unused styles in production automatically.

### Analytics
Add Google Analytics:
```tsx
// In layout.tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Security Checklist

- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set security headers in `next.config.ts`
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated: `npm audit`, `npm update`
- [ ] Enable CORS if needed

## Monitoring & Maintenance

### Regular Updates
```bash
# Check outdated packages
npm outdated

# Update to latest versions
npm update

# Update to major versions (be careful)
npm install -g npm-check-updates
ncu -u
npm install
```

### Performance Monitoring
- Use Lighthouse in Chrome DevTools
- Check Core Web Vitals on PageSpeed Insights
- Monitor with Vercel Analytics (if using Vercel)

### Error Tracking
Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

```tsx
// Example Sentry setup
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

## Debugging Tips

### Enable Debug Logging
```bash
# For Next.js debug info
DEBUG=* npm run dev
```

### Check Build Size
```bash
npm install -g next-bundle-analyzer
ANALYZE=true npm run build
```

### Browser DevTools
- Use React DevTools browser extension
- Inspect component props and state
- Check Network tab for requests
- Use Console for debugging

## Common Issues & Solutions

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# macOS/Linux
lsof -i :3000
kill -9 [PID]
```

### Build Fails with TypeScript Errors
```bash
# Check TypeScript
npx tsc --noEmit

# Fix auto-fixable issues
npx tsc --noEmit --fixable
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### Animations Not Working
- Ensure GSAP is installed: `npm list gsap`
- Check browser console for errors
- Verify refs are attached to DOM elements
- Test in different browser

## Git Workflow

### Committing Changes
```bash
git add .
git commit -m "Descriptive message"
git push origin main
```

### Branches for Features
```bash
git checkout -b feature/new-section
# Make changes
git add .
git commit -m "Add new section"
git push origin feature/new-section
# Create Pull Request on GitHub
```

## Continuous Integration (CI/CD)

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Click on previous deployment
3. Click "Promote to Production"

### Manual Rollback
```bash
git log --oneline
git reset --hard [commit-hash]
git push origin main --force
```

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Last Updated**: October 31, 2025
**Status**: Production Ready ✅
