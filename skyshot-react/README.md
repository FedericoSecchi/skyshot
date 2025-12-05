# SkyShot Lab - React + Vite

A modern React application for SkyShot Lab, built with Vite and React Bits, ready for deployment on GitHub Pages.

## 🚀 Features

- **Vite + React**: Fast development and optimized production builds
- **React Bits**: Component library integration for enhanced UI components
- **GitHub Pages Ready**: Configured for deployment at `/skyshot` path
- **Responsive Design**: Fully responsive layout with smooth animations
- **Video Background**: Hero section with autoplay, muted, loop video
- **Image Gallery**: Lightbox functionality with keyboard navigation
- **Smooth Scrolling**: Enhanced navigation experience

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📤 Deployment to GitHub Pages

### Prerequisites

1. Ensure your repository is set up on GitHub
2. The repository should be named `skyshot` (or update the base path in `vite.config.js`)

### Deploy Steps

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

   Or use the combined command:
   ```bash
   npm run predeploy && npm run deploy
   ```

3. Configure GitHub Pages:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Set source to "gh-pages" branch
   - Your site will be available at: `https://federicosecchi.github.io/skyshot`

### Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. The `dist` folder contains the static files
3. Push the contents of `dist` to the `gh-pages` branch

## 📁 Project Structure

```
skyshot-react/
├── public/
│   ├── Video/          # Background video files
│   ├── Fotos/          # Gallery images
│   └── skyshot-logo/   # Logo assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # React entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Customization

### Changing the Base Path

If your GitHub Pages URL is different, update `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

And update `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

### React Bits Components

The project includes React Bits library. You can import and use components:

```jsx
import { Button, Card, Hero } from 'react-bits'
```

See [React Bits documentation](https://react-bits.dev/docs/getting-started) for available components.

## 🔧 Technologies Used

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **React Bits**: Component library
- **Bootstrap 5**: CSS framework (via CDN)
- **gh-pages**: GitHub Pages deployment

## 📝 Notes

- The video file should be placed in `public/video/` directory
- All images should be in `public/fotos/` directory
- Logo files should be in `public/skyshot-logo/` directory
- The build output goes to `dist/` folder
- GitHub Pages serves from the `gh-pages` branch

## 🐛 Troubleshooting

### Assets not loading after deployment

- Ensure all asset paths use relative paths starting with `/`
- Check that `base` in `vite.config.js` matches your GitHub Pages path
- Verify assets are in the `public/` folder

### Build errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (recommended: 18+)

### Deployment issues

- Ensure you have push access to the repository
- Check that `gh-pages` branch is created after first deployment
- Verify GitHub Pages is enabled in repository settings

## 📄 License

© SkyShot Lab. Aerial & Outdoor Visuals.
