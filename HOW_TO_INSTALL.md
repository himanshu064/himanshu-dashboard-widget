# Dashboard Widget Installation Guide

I just verified these files are available at:
- https://www.hellovoip.co/himanshu-dashboard-widget/v1.0.2/widgets.js
- https://www.hellovoip.co/himanshu-dashboard-widget/v1.0.2/dashboard-widget.js

Now I want to install this package with version and use it. Here's the complete guide to import and use it in a React app.

## ✅ Excellent! Your CDN deployment is working perfectly!

---

## 📦 Option 1: Install from GitHub (Recommended for Development)

### Installation

```bash
# Install latest version from main branch
yarn add github:himanshu064/himanshu-dashboard-widget

# OR install specific version tag
yarn add github:himanshu064/himanshu-dashboard-widget#v1.0.2
```

### Usage in React App

```javascript
// Import components/functions from the package
import { YourComponent } from '@himanshu064/himanshu-dashboard-widget';

// If you have specific exports, use them
// Example:
function App() {
  return (
    <div>
      <h1>My App</h1>
      <YourComponent />
    </div>
  );
}

export default App;
```

### Setup Required in Your React App

Since your package depends on Telesero packages, you need to configure access:

1. **Create `.npmrc` in your React app root:**
   ```
   //repo.npm.systems.cxcl.io/:_authToken="${TELESERO_NPM_TOKEN}"
   ```

2. **Create `.yarnrc` in your React app root:**
   ```
   strict-ssl false
   email automation@telesero.com
   username automation
   
   "@telesero:registry" "https://repo.npm.systems.cxcl.io/"
   ```

3. **Set environment variable:**
   ```bash
   export TELESERO_NPM_TOKEN=your-token-here
   ```

4. **Then run:**
   ```bash
   yarn install
   ```

---

## 🌐 Option 2: Load from CDN (For Direct Browser Usage)

### In HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <div id="root"></div>

    <!-- Load from your CDN -->
    <script src="https://www.hellovoip.co/himanshu-dashboard-widget/v1.0.2/widgets.js"></script>

    <script>
        // Your widget should now be available globally
        // Access it according to how it's exported in your package

        // Example if it's exposed as window.DashboardWidget:
        // const widget = new window.DashboardWidget.YourComponent();

        console.log('Widget loaded:', window);
    </script>
</body>
</html>
```

### In React App (Loading from CDN)

```javascript
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load widget from CDN
    const script = document.createElement('script');
    script.src = 'https://www.hellovoip.co/himanshu-dashboard-widget/v1.0.2/widgets.js';
    script.async = true;
    script.onload = () => {
      console.log('Widget loaded from CDN');
      // Now you can access the widget from window object
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>My App with CDN Widget</h1>
      {/* Your widget will be available here */}
    </div>
  );
}

export default App;
```

---

## 🎯 Option 3: Create a React Hook for CDN Loading

```javascript
// hooks/useWidgetCDN.js
import { useState, useEffect } from 'react';

export const useWidgetCDN = (version = 'v1.0.2') => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.hellovoip.co/himanshu-dashboard-widget/${version}/widgets.js`;
    script.async = true;

    script.onload = () => {
      setLoaded(true);
      console.log('Dashboard widget loaded');
    };

    script.onerror = () => {
      setError(new Error('Failed to load widget'));
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [version]);

  return { loaded, error };
};
```

### Usage in component:

```javascript
import { useWidgetCDN } from './hooks/useWidgetCDN';

function MyComponent() {
  const { loaded, error } = useWidgetCDN('v1.0.2');

  if (error) return <div>Error loading widget: {error.message}</div>;
  if (!loaded) return <div>Loading widget...</div>;

  return (
    <div>
      <h1>Widget Loaded!</h1>
      {/* Use your widget here */}
    </div>
  );
}
```

---

## 📋 Complete Usage Guide for Your Package

### Method 1: Using WidgetLoader Function

```bash
# Install the package
yarn add github:himanshu064/himanshu-dashboard-widget#v1.0.2

# OR latest
yarn add github:himanshu064/himanshu-dashboard-widget
```

```javascript
// App.js
import React, { useEffect } from 'react';
import { WidgetLoader, Widget, api } from '@himanshu064/himanshu-dashboard-widget';

function App() {
  useEffect(() => {
    WidgetLoader({
      containerId: 'dashboard-widget-container',
      config: {
        // Your configuration here
        advertisedPages: ['page1', 'page2']
      },
      onLoad: () => {
        console.log('Dashboard widget loaded!');
      },
      onError: (error) => {
        console.error('Error loading widget:', error);
      }
    });
  }, []);

  return (
    <div>
      <h1>My Application</h1>
      <div id="dashboard-widget-container"></div>
    </div>
  );
}

export default App;
```

### Method 2: Direct Component Import

```javascript
// App.js
import React from 'react';
import { Widget } from '@himanshu064/himanshu-dashboard-widget';

function App() {
  const config = {
    advertisedPages: ['dashboard', 'analytics']
  };

  return (
    <div>
      <h1>My Application</h1>
      <Widget config={config} />
    </div>
  );
}

export default App;
```

### Method 3: Using API Object

```javascript
import { api } from '@himanshu064/himanshu-dashboard-widget';

// Later in your code
api.DashboardLoader({
  containerId: 'my-dashboard',
  config: { /* your config */ }
});
```

---

## 🌐 Load from CDN (No Installation Required)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Widget Demo</title>
</head>
<body>
    <div id="dashboard-widget-container"></div>

    <!-- Load React and ReactDOM (required dependencies) -->
    <script crossorigin src="https://unpkg.com/react@16.14.0/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16.14.0/umd/react-dom.production.min.js"></script>

    <!-- Load your widget from CDN -->
    <script src="https://www.hellovoip.co/himanshu-dashboard-widget/v1.0.2/widgets.js"></script>

    <script>
        // Initialize the widget
        window.WidgetLoader({
            containerId: 'dashboard-widget-container',
            config: {
                advertisedPages: ['page1', 'page2']
            },
            onLoad: () => {
                console.log('✅ Widget loaded successfully!');
            },
            onError: (error) => {
                console.error('❌ Error loading widget:', error);
            }
        });
    </script>
</body>
</html>
```

---

## ⚡ Load CDN in React App

```javascript
// App.js
import { useEffect, useState } from 'react';

function App() {
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    // Load widget script from CDN
    const script = document.createElement('script');
    script.src = 'https://www.hellovoip.co/himanshu-dashboard-widget/v1.0.2/widgets.js';
    script.async = true;

    script.onload = () => {
      console.log('Widget script loaded');
      setWidgetReady(true);

      // Initialize widget
      if (window.WidgetLoader) {
        window.WidgetLoader({
          containerId: 'dashboard-widget-container',
          config: {
            advertisedPages: ['analytics', 'reports']
          },
          onLoad: () => console.log('✅ Dashboard loaded!'),
          onError: (err) => console.error('❌ Error:', err)
        });
      }
    };

    script.onerror = () => {
      console.error('Failed to load widget script');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <h1>My Application</h1>
      {!widgetReady && <div>Loading dashboard widget...</div>}
      <div id="dashboard-widget-container"></div>
    </div>
  );
}

export default App;
```

---

## 🔧 Custom React Hook for Easy Integration

```javascript
// hooks/useDashboardWidget.js
import { useEffect, useState } from 'react';

export const useDashboardWidget = (config = {}, version = 'v1.0.2') => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.hellovoip.co/himanshu-dashboard-widget/${version}/widgets.js`;
    script.async = true;

    script.onload = () => {
      setLoaded(true);

      if (window.WidgetLoader) {
        window.WidgetLoader({
          containerId: config.containerId || 'dashboard-widget-container',
          config: config,
          onLoad: () => console.log('Dashboard widget loaded'),
          onError: (err) => setError(err)
        });
      }
    };

    script.onerror = () => {
      setError(new Error('Failed to load dashboard widget'));
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [version, config]);

  return { loaded, error };
};
```

### Usage:

```javascript
import { useDashboardWidget } from './hooks/useDashboardWidget';

function Dashboard() {
  const { loaded, error } = useDashboardWidget({
    advertisedPages: ['home', 'analytics']
  }, 'v1.0.2');

  if (error) return <div>Error: {error.message}</div>;
  if (!loaded) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div id="dashboard-widget-container"></div>
    </div>
  );
}
```

---

## ⚙️ Configuration Options

Based on your code, here are the available options:

```javascript
WidgetLoader({
  // Container ID where widget will be rendered
  containerId: 'dashboard-widget-container', // default

  // Configuration object
  config: {
    advertisedPages: ['page1', 'page2'], // Optional
    // Add any other config your widget needs
  },

  // Callback when widget loads successfully
  onLoad: () => {
    console.log('Widget loaded!');
  },

  // Error handler
  onError: (error) => {
    console.error('Widget error:', error);
  }
});
```

---

## 🚀 Quick Start Example

### Create New React App:

```bash
npx create-react-app my-app
cd my-app
yarn add github:himanshu064/himanshu-dashboard-widget#v1.0.2
```

### Replace src/App.js:

```javascript
import React from 'react';
import { Widget } from '@himanshu064/himanshu-dashboard-widget';
import './App.css';

function App() {
  const dashboardConfig = {
    advertisedPages: ['dashboard', 'analytics', 'reports']
  };

  return (
    <div className="App">
      <header>
        <h1>My Dashboard Application</h1>
      </header>
      <main>
        <Widget config={dashboardConfig} />
      </main>
    </div>
  );
}

export default App;
```

### Run:

```bash
yarn start
```

**That's it! Your dashboard widget is now integrated! 🎉**


🚀 How to Use (After Next Push):

  For You (Publisher):

  Just commit and push:
  git add .
  git commit -m "feat: add GitHub Packages publishing"
  git push origin main

  The workflow will automatically:
  1. Bump version (1.0.1 → 1.0.2)
  2. Build the package
  3. Publish to GitHub Packages ✨
  4. Create GitHub Release
  5. Deploy to CDN

  For Users (Consumers):

  Step 1: Create GitHub Token
  - Go to https://github.com/settings/tokens
  - Generate new token (classic)
  - Select read:packages scope
  - Copy the token

  Step 2: Configure .npmrc in their project:
  # .npmrc
  //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
  @himanshu064:registry=https://npm.pkg.github.com

  Step 3: Install normally:
  yarn add @himanshu064/himanshu-dashboard-widget

  Step 4: Use it:
  import { Widget } from '@himanshu064/himanshu-dashboard-widget';

  function App() {
    return <Widget config={{ advertisedPages: ['dashboard'] }} />;
  }

  ---
  🎯 Benefits:

  ✅ Install like a normal package: yarn add @himanshu064/himanshu-dashboard-widget✅ Version management: Install specific
  versions easily✅ Private but accessible: Anyone with a GitHub token can install✅ Free: GitHub Packages is free for public      
  repositories✅ Automatic publishing: Workflow handles everything

  ---
  📦 Where to Find Published Packages:

  After the next push, your package will be visible at:
  - https://github.com/himanshu064/himanshu-dashboard-widget/packages

  Users can browse versions and installation instructions there.

  ---
  💡 Quick Summary:

  Now your package will be available in 3 ways:

  1. GitHub Packages (New!): yarn add @himanshu064/himanshu-dashboard-widget
  2. Direct GitHub: yarn add github:himanshu064/himanshu-dashboard-widget
  3. CDN: https://www.hellovoip.co/himanshu-dashboard-widget/v1.0.2/widgets.js

  Commit and push to see it in action! 🎉
