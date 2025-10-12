# Dashboard Widget - Technical Documentation

## Overview

`@himanshu064/himanshu-dashboard-widget` is a React-based dashboard widget library that supports two loading methods:
1. **ES Module Import** - For modern bundlers (webpack, vite, etc.)
2. **AMD/RequireJS** - For legacy applications using AMD module system

## Package Information

- **Package Name**: `@himanshu064/himanshu-dashboard-widget`
- **Registry**: GitHub Packages (`https://npm.pkg.github.com`)
- **Current Version**: 1.0.7
- **License**: Proprietary

## Installation

### Prerequisites

1. Configure npm to use GitHub Packages for the `@himanshu064` scope:

```bash
# Create/edit ~/.npmrc
echo "@himanshu064:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

2. Authenticate with GitHub Packages (requires a GitHub Personal Access Token with `read:packages` scope):

```bash
npm login --registry=https://npm.pkg.github.com --scope=@himanshu064
```

### Install the Package

```bash
npm install @himanshu064/himanshu-dashboard-widget
```

Or with yarn:

```bash
yarn add @himanshu064/himanshu-dashboard-widget
```

## Usage Methods

### Method 1: ES Module Import (Modern Apps)

Use this method if your application uses webpack, vite, or any modern bundler.

```javascript
import { WidgetLoader, api, Widget } from "@himanshu064/himanshu-dashboard-widget";

// Initialize the widget
WidgetLoader({
  containerId: "dashboard-widget-container",
  config: {
    advertisedPages: [
      { id: "page1", name: "Page 1" },
      { id: "page2", name: "Page 2" }
    ]
  },
  onLoad: () => {
    console.log("Widget loaded successfully!");
  },
  onError: (error) => {
    console.error("Widget failed to load:", error);
  }
});
```

**Available Named Exports:**
- `WidgetLoader` - Main function to initialize the dashboard widget
- `api` - API object containing `DashboardLoader` (alias for `WidgetLoader`)
- `Widget` - The raw React component for advanced usage

### Method 2: AMD/RequireJS (Legacy Apps)

Use this method if your application uses RequireJS or AMD module system.

```javascript
require(["dashboard-widget"], function(dashboardWidget) {
  dashboardWidget.WidgetLoader({
    containerId: "dashboard-widget-container",
    config: {
      advertisedPages: [
        { id: "page1", name: "Page 1" }
      ]
    },
    onLoad: function() {
      console.log("Widget loaded successfully!");
    },
    onError: function(error) {
      console.error("Widget failed to load:", error);
    }
  });
});
```

**Alternative: Using the Global Helper**

The standalone build (`dist/widgets.js`) also exposes a global helper:

```html
<script src="path/to/dist/widgets.js"></script>
<script>
  window.TeleseroWidgetLoader({
    containerId: "dashboard-widget-container",
    config: { /* your config */ }
  });
</script>
```

## Configuration Options

### WidgetLoader Options

```typescript
interface WidgetLoaderOptions {
  // ID of the DOM element where the widget will be rendered
  containerId?: string; // Default: "dashboard-widget-container"

  // Configuration object passed to the widget
  config?: {
    advertisedPages?: Array<{
      id: string;
      name: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  };

  // Callback fired when widget loads successfully
  onLoad?: () => void;

  // Callback fired when widget fails to load
  onError?: (error: Error) => void;
}
```

### HTML Setup

Ensure you have a container element in your HTML:

```html
<div id="dashboard-widget-container"></div>
```

## Build System

This package uses a dual-build system powered by Neutrino and webpack:

### Build Process

```bash
# Production build
npm run build

# Debug build (unminified)
npm run build:debug
```

### Build Output

The build process generates the following files in the `dist/` directory:

- `dashboard-widget.js` - AMD-compatible widget bundle (591KB)
- `telesero-base.js` - Base dependencies bundle (1.06MB)
- `widgets.js` - Standalone concatenated file with global helper (1.65MB)
- `*.json` - Asset manifests for AMD loading
- `bundle-stats.html` - Bundle analysis report

### Build Steps

1. **Webpack Build**: Compiles React/JSX code with Babel
   - Targets IE11+ browsers
   - Transpiles ES6+ to ES5
   - Handles styled-components and Material-UI

2. **RequireJS Optimization**: Creates AMD-compatible modules
   - Wraps output in AMD module format
   - Minifies with UglifyJS (in production mode)
   - Generates dependency manifests

3. **Standalone Preparation**: Concatenates files
   - Combines `telesero-base.js` + `dashboard-widget.js` + helpers
   - Creates `widgets.js` with global `TeleseroWidgetLoader`

## Architecture

### File Structure

```
himanshu-dashboard-widget/
├── src/
│   ├── index.js              # Main entry point (ES modules)
│   ├── Widget.js             # Core widget component
│   ├── store/
│   │   └── advertised-pages.js
│   └── components/           # Additional components
├── dist/                     # Build output (AMD/standalone)
│   ├── dashboard-widget.js   # AMD module
│   ├── telesero-base.js      # Shared dependencies
│   └── widgets.js            # Standalone bundle
├── build/                    # Intermediate build artifacts
├── .neutrinorc.js            # Neutrino configuration
├── webpack.config.js         # Webpack configuration
├── requirejs.build.js        # RequireJS build config
└── package.json              # Package metadata
```

### Technology Stack

- **Framework**: React 16.14.0
- **UI Library**: Material-UI v4
- **Styling**: styled-components 5.2.1
- **Build Tools**:
  - Neutrino 9.4.0
  - webpack 4.44.2
  - RequireJS 2.3.6
- **State Management**: react-hooks-global-state
- **Grid System**: react-grid-layout
- **Date Handling**: Luxon

### Dependencies

**Core Dependencies:**
- `@telesero/frontend-common` - Shared frontend utilities
- `@telesero/widget-base` - Base widget functionality
- `react` & `react-dom` - UI framework
- `@material-ui/core`, `@material-ui/icons`, `@material-ui/lab` - UI components
- `styled-components` - CSS-in-JS styling
- `react-grid-layout` - Draggable grid layout
- `luxon` - Date/time handling

### Babel Configuration

The build targets IE11+ with the following transformations:
- ES6+ to ES5 transpilation
- Object rest/spread syntax
- JSX transformation
- Runtime helpers via `@babel/plugin-transform-runtime`

## Entry Points

The package provides multiple entry points for different use cases:

```json
{
  "main": "dist/dashboard-widget.js",    // CommonJS/AMD (bundled)
  "module": "src/index.js",              // ES modules (source)
  "types": "src/index.d.ts"              // TypeScript definitions
}
```

**Entry Point Usage:**
- Modern bundlers (webpack 5+, vite) will use `module` (tree-shakeable source)
- Legacy bundlers will use `main` (pre-built AMD module)
- RequireJS will load `dashboard-widget` directly from AMD registry

## Publishing

The package is published to GitHub Packages:

```bash
# Ensure you're authenticated to GitHub Packages
npm login --registry=https://npm.pkg.github.com --scope=@himanshu064

# Publish the package
npm publish
```

**Note**: The `files` field in package.json controls what gets published:
- `dist/` - Pre-built AMD modules
- `src/` - Source files for ES module imports

## Common Issues & Troubleshooting

### Issue: Widget container not found

```
Error: Container element with ID "dashboard-widget-container" not found
```

**Solution**: Ensure the container element exists in your HTML before calling `WidgetLoader`.

```html
<div id="dashboard-widget-container"></div>
```

### Issue: Module not found when importing

```
Error: Cannot find module '@himanshu064/himanshu-dashboard-widget'
```

**Solution**:
1. Verify your `.npmrc` has the GitHub Packages registry configured
2. Authenticate with GitHub Packages
3. Reinstall the package

### Issue: RequireJS cannot load module

```
Error: Load timeout for modules: dashboard-widget
```

**Solution**:
1. Ensure `dist/widgets.js` is included in your page
2. Verify the AMD module path is correctly configured
3. Check browser console for 404 errors

### Issue: Styled-components conflicts

If you see styled-components version conflicts:

**Solution**: The package uses resolutions to lock styled-components to v5.2.1. Ensure your parent project doesn't force a different version.

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run development build
npm run build:debug

# Watch for changes (requires additional setup)
# Add to package.json scripts:
# "dev": "webpack --mode development --watch"
```

### Testing Integration

**In a modern React app:**

```javascript
import { WidgetLoader } from "@himanshu064/himanshu-dashboard-widget";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    WidgetLoader({
      containerId: "dashboard-widget-container",
      config: { /* your config */ }
    });
  }, []);

  return <div id="dashboard-widget-container" />;
}
```

**In a legacy app with RequireJS:**

```html
<!DOCTYPE html>
<html>
<head>
  <script src="path/to/require.js"></script>
</head>
<body>
  <div id="dashboard-widget-container"></div>

  <script>
    requirejs.config({
      paths: {
        'dashboard-widget': 'path/to/dist/dashboard-widget'
      }
    });

    require(['dashboard-widget'], function(widget) {
      widget.WidgetLoader({
        containerId: 'dashboard-widget-container'
      });
    });
  </script>
</body>
</html>
```

## Performance Considerations

### Bundle Sizes

- `dashboard-widget.js`: ~591KB (minified)
- `telesero-base.js`: ~1.06MB (shared dependencies)
- `widgets.js`: ~1.65MB (everything included)

### Optimization Tips

1. **For ES Module imports**: Your bundler can tree-shake unused code
2. **For AMD**: Load only required modules, don't use `widgets.js` unless necessary
3. **Consider code splitting**: Load the widget on-demand rather than upfront
4. **Enable gzip**: The build outputs compress well with gzip

### Browser Support

```json
[
  ">1%",
  "not dead",
  "not op_mini all",
  "last 2 version",
  "not ie 11",
  "not ie_mob 11"
]
```

Note: Despite IE11 being excluded from browserslist, the build is configured to support IE11 via Babel transpilation.

## API Reference

### WidgetLoader(options)

Main function to initialize and render the dashboard widget.

**Parameters:**
- `options` (Object) - Configuration options (see Configuration Options section)

**Returns:** `void`

**Throws:** Error if container element is not found

**Example:**
```javascript
WidgetLoader({
  containerId: "my-container",
  config: {
    advertisedPages: [...]
  },
  onLoad: () => console.log("Loaded!"),
  onError: (err) => console.error(err)
});
```

### api.DashboardLoader(options)

Alias for `WidgetLoader`. Provided for consistency with widget-base pattern.

### Widget Component

The raw React component exported for advanced usage.

**Props:**
- `config` (Object) - Widget configuration

**Example:**
```javascript
import { Widget } from "@himanshu064/himanshu-dashboard-widget";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Widget config={{ advertisedPages: [...] }} />,
  document.getElementById("container")
);
```

## Support & Contribution

For issues, questions, or contributions:

1. Check the existing documentation in `/docs`
2. Review the source code in `/src`
3. Contact the repository maintainers

## Version History

- **v1.0.7** (Current) - Latest stable release
- **v1.0.6** - REACT_APP_API issue fix
- Previous versions - See git history

## License

Proprietary - All rights reserved.
