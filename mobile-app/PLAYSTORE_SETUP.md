# Android Keystore & Play Store Setup

## Generate a Keystore (One-Time)

Run this command **once** to create your signing key:

```bash
keytool -genkey -v -keystore slp-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 \
  -alias slp-key \
  -storepass YOUR_KEYSTORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=Your Name, O=Your Organization, C=PK"
```

**Replace:**
- `YOUR_KEYSTORE_PASSWORD` — password for the keystore
- `YOUR_KEY_PASSWORD` — password for the key
- `CN`, `O`, `C` values with your info

This creates `slp-release-key.jks` — keep it safe!

## Encode Keystore to Base64 (for GitHub Secrets)

```bash
base64 -i slp-release-key.jks > slp-release-key.jks.b64
cat slp-release-key.jks.b64
```

Copy the entire output.

## Add GitHub Secrets

Go to your GitHub repository **Settings → Secrets and variables → Actions**.

Add these secrets:
- `ANDROID_KEYSTORE_BASE64` — paste the base64 output
- `ANDROID_KEYSTORE_PASSWORD` — the keystore password
- `ANDROID_KEY_ALIAS` — `slp-key` (or your chosen alias)
- `ANDROID_KEY_PASSWORD` — the key password

## CI will now automatically sign the AAB for Play Store submission.

---

## Play Store Upload

Once the workflow produces a signed AAB artifact:

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app or open existing
3. Go to **Release → Production** (or Internal Testing)
4. Click **Create release**
5. Upload the signed AAB
6. Fill in Release notes, screenshots, store listing, etc.
7. Submit for review

See [Android Developers — Publish to Play Store](https://developer.android.com/studio/publish/app-signing) for more.
