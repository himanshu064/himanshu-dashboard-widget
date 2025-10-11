# Himanshu Dashboard Widget

A React dashboard widget component library.

## Installation

Install from GitHub:

```bash
# Using npm
npm install github:himanshu064/himanshu-dashboard-widget

# Using yarn
yarn add github:himanshu064/himanshu-dashboard-widget
```

## Setup

This package depends on private Telesero packages. You need to configure access to the Telesero registry:

1. Copy `.npmrc.example` to `.npmrc`:
   ```bash
   cp .npmrc.example .npmrc
   ```

2. Copy `.yarnrc.example` to `.yarnrc`:
   ```bash
   cp .yarnrc.example .yarnrc
   ```

3. Set the `TELESERO_NPM_TOKEN` environment variable with your Telesero registry token:
   ```bash
   export TELESERO_NPM_TOKEN=your-token-here
   ```

## Usage

```javascript
import { YourComponent } from '@himanshu064/himanshu-dashboard-widget';

// Use the component in your React app
function App() {
  return <YourComponent />;
}
```

## Building from Source

```bash
# Install dependencies
yarn install

# Build the project
yarn build
```

## GitHub Actions Setup

This repository uses GitHub Actions for CI/CD. To set up the workflow:

1. Go to your GitHub repository settings
2. Navigate to **Settings > Secrets and variables > Actions**
3. Add a new repository secret:
   - Name: `TELESERO_NPM_TOKEN`
   - Value: Your Telesero npm registry token

The workflow will automatically:
- Run tests on all pushes and pull requests
- Build the package on master branch
- Upload build artifacts (accessible from Actions tab)

## License

Proprietary