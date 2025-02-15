# Deployment Guide

This guide explains how to build and deploy the Snake game for web platforms.

## Building for Production

1. Install dependencies (if not already done):
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

This will create a `dist` directory containing the production-ready files:
- Minified JavaScript
- Optimized assets
- HTML and CSS

## Testing the Production Build

1. Test the production build locally:
```bash
npm run serve
```

This will:
- Build the project
- Start a local server
- Open the production version in your browser

## Deploying to a Web Server

1. After building, copy the contents of the `dist` directory to your web server.

2. The game can be deployed to various platforms:
   - GitHub Pages
   - Netlify
   - Vercel
   - Any static web hosting service

### Example: GitHub Pages Deployment

1. Push your code to GitHub
2. Enable GitHub Pages in your repository settings
3. Set the source to the `dist` directory
4. Your game will be available at `https://[username].github.io/snake/`

### Example: Static Web Server Deployment

1. Build the project: `npm run build`
2. Copy the contents of `dist` to your web server's public directory
3. The game will be available at your server's URL

## Important Notes

- The game uses relative paths (configured in `vite.config.ts`)
- All assets are included in the build
- The build is optimized for:
  - Minimal file size
  - Fast loading
  - Browser compatibility

## Troubleshooting

If you encounter issues:

1. Check browser console for errors
2. Verify all assets are loading correctly
3. Ensure your server is configured for single-page applications
4. Test locally with `npm run serve` before deploying

## Performance Considerations

The build is optimized for:
- Code minification
- Asset optimization
- Chunk splitting
- Console log removal in production
- Source map exclusion 