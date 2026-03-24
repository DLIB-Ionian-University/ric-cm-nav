# RiC-CM NavTool

RiC-CM NavTool is a Vue app for browsing:
- Entities
- Attributes
- Relations
- Relation Attributes

The app is built based on **RiC-CM 1.0**.

Official RiC-CM page:
https://www.ica.org/ica-network/expert-groups/egad/records-in-contexts-conceptual-model/

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Test Locally Before Push

1. Start the development server:

```sh
npm run dev
```

2. Open the local Vite URL (usually `http://localhost:5173`) and go to the Modeling Playground.
3. Add a text node and verify it shows:
- First line: text label
- Second line: node ID (for example `n1`), like entity nodes

Optional: preview the production build locally:

```sh
npm run preview
```

### Deploy to GitHub Pages

This project is configured for GitHub Pages with the repository path `/ric-cm-nav/`.

Then in GitHub:
1. Go to `Settings` -> `Pages`.
2. Set `Source` to `GitHub Actions`.
3. Push to `main` (or `master`) to trigger `.github/workflows/deploy-pages.yml`.

You can also trigger deployment manually in:
`Actions` -> `Deploy to GitHub Pages` -> `Run workflow`.
