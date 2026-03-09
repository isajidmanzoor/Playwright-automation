SLP Mobile Wrapper (Capacitor)

This scaffold creates a minimal Capacitor-based mobile app that loads https://smartlivingpakistan.com in a WebView.

Important notes:
- App Stores often reject apps that are simple webview wrappers without native functionality. Add native features (push notifications, offline, deep links, platform UI) to improve acceptance.
- For iOS you must build & sign using Xcode and provide Apple Developer credentials.

Quick start:

1. Install deps

```bash
cd mobile-app
npm install
```

2. Initialize Capacitor (only needed once)

```bash
npm run cap:init
```

3. Add platforms

```bash
npm run cap:add-android
npm run cap:add-ios
```

4. Build & sync web assets (if you have a build step, place files in `www`)

```bash
# if you have a front-end build pipeline, put output in mobile-app/www
npm run cap:sync
```

5. Open native projects

```bash
npm run cap:open:android   # opens Android Studio
npm run cap:open:ios       # opens Xcode
```

6. From Android Studio / Xcode build, sign, and run on device/emulator.

Optional: Replace the simple iframe approach with a local bundled web app for offline capability. For deeper native integration, use Capacitor plugins.
