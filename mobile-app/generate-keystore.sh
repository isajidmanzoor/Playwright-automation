#!/bin/bash
# Generate Android signing keystore for Play Store
# Run this script in the mobile-app directory

set -e

KEYSTORE_FILE="slp-release-key.jks"
KEYSTORE_PASSWORD="slp_store_2026"
KEY_ALIAS="slp-key"
KEY_PASSWORD="slp_key_2026"

echo "Generating Android signing keystore..."
echo "Keystore file: $KEYSTORE_FILE"
echo "Key alias: $KEY_ALIAS"

keytool -genkey -v \
  -keystore "$KEYSTORE_FILE" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias "$KEY_ALIAS" \
  -storepass "$KEYSTORE_PASSWORD" \
  -keypass "$KEY_PASSWORD" \
  -dname "CN=SLP Developer, O=Smart Living Pakistan, C=PK"

if [ -f "$KEYSTORE_FILE" ]; then
  echo "✓ Keystore created successfully!"
  ls -lh "$KEYSTORE_FILE"
  
  echo ""
  echo "Next steps:"
  echo "1. Base64 encode the keystore:"
  echo "   base64 -i $KEYSTORE_FILE"
  echo ""
  echo "2. Add GitHub secrets to your repository:"
  echo "   ANDROID_KEYSTORE_BASE64: [base64 output]"
  echo "   ANDROID_KEYSTORE_PASSWORD: $KEYSTORE_PASSWORD"
  echo "   ANDROID_KEY_ALIAS: $KEY_ALIAS"
  echo "   ANDROID_KEY_PASSWORD: $KEY_PASSWORD"
  echo ""
  echo "3. Push to main branch to trigger build"
  echo ""
  echo "⚠️  IMPORTANT: Keep $KEYSTORE_FILE safe and secure!"
else
  echo "✗ Keystore creation failed"
  exit 1
fi
