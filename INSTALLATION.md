# Installation Guide - WP Playground Preview

This guide will walk you through installing the WP Playground Preview Chrome extension.

## Prerequisites

- Google Chrome browser (version 88 or higher)
- Basic understanding of browser extensions

## Installation Methods

### Option A: Load Unpacked Extension (Developer Mode)

This method is for testing the extension locally before it's published to the Chrome Web Store.

#### Step 1: Prepare the Extension Files

1. Download or extract the extension files to a folder on your computer
2. Ensure the folder contains these files:
   ```
   wp-playground-preview/
   ├── manifest.json
   ├── content.js
   ├── styles.css
   ├── popup.html
   ├── popup.js
   └── icons/
       ├── icon16.png
       ├── icon32.png
       ├── icon48.png
       └── icon128.png
   ```

#### Step 2: Open Chrome Extensions Page

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
   - OR click the three-dot menu (⋮) → More Tools → Extensions

#### Step 3: Enable Developer Mode

1. Look for the "Developer mode" toggle in the top-right corner
2. Click to enable it (it should turn blue/on)

#### Step 4: Load the Extension

1. Click the "Load unpacked" button that appears after enabling Developer mode
2. Browse to and select the `wp-playground-preview` folder
3. Click "Select Folder"

#### Step 5: Verify Installation

1. You should see the extension card appear with:
   - Extension name: "WP Playground Preview"
   - Version: 1.0.0
   - Icon: Blue gradient with play button
2. Make sure the toggle switch is turned ON (enabled)

#### Step 6: Test the Extension

1. Navigate to any WordPress plugin page:
   - Example: https://wordpress.org/plugins/contact-form-7/
2. Look for the "Try in Playground" button next to the Download button
3. Click it to test!

## Troubleshooting

### Extension Not Appearing

**Problem**: Extension loaded but doesn't show up in the toolbar  
**Solution**: 
- Click the puzzle piece icon (🧩) in Chrome toolbar
- Pin "WP Playground Preview" to make it always visible

**Problem**: Extension loaded but button doesn't appear on WordPress.org  
**Solution**:
1. Open Chrome DevTools (F12)
2. Check the Console tab for any error messages
3. Make sure you're on a specific plugin page (not search results)
4. Verify the plugin doesn't already have a "Live Preview" button

### Permission Errors

**Problem**: Extension shows permission warnings  
**Solution**: 
- This extension only requires access to wordpress.org
- Click "Allow" when prompted
- If you're concerned, review the manifest.json file

### Button Not Styled Correctly

**Problem**: Button appears but doesn't match WordPress.org style  
**Solution**:
1. Check that styles.css is in the extension folder
2. Reload the extension: Go to `chrome://extensions/` and click the reload icon
3. Hard refresh the WordPress.org page (Ctrl+Shift+R or Cmd+Shift+R)

### Extension Disabled After Chrome Restart

**Problem**: Extension turns off when you restart Chrome  
**Solution**:
- This is normal for unpacked extensions
- Simply re-enable it from `chrome://extensions/`
- Once published to Chrome Web Store, this won't happen

## Updating the Extension

When you make changes to the extension files:

1. Go to `chrome://extensions/`
2. Find "WP Playground Preview"
3. Click the reload icon (🔄) on the extension card
4. Refresh any open WordPress.org tabs to see changes

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find "WP Playground Preview"
3. Click "Remove"
4. Confirm removal

## Next Steps

Once installed:

1. **Test Basic Functionality**
   - Visit: https://wordpress.org/plugins/contact-form-7/
   - Look for the "Try in Playground" button
   - Click it and verify WordPress Playground opens

2. **Test Edge Cases**
   - Visit a plugin with Live Preview (button should NOT appear)
   - Visit plugin search results (button should NOT appear)
   - Try different plugins to ensure consistency

3. **Customize (Optional)**
   - Edit `content.js` to change button text or behavior
   - Edit `styles.css` to modify button appearance
   - Edit `manifest.json` to change extension name or description

## Publishing to Chrome Web Store (For Developers)

If you want to publish this extension:

1. Create a Chrome Web Store developer account ($5 one-time fee)
2. Package the extension as a ZIP file
3. Upload to Chrome Web Store Developer Dashboard
4. Fill in store listing details (description, screenshots, etc.)
5. Submit for review
6. Once approved, users can install directly from the store

## Support

If you encounter issues:

1. Check the [README.md](README.md) for common questions
2. Open Chrome DevTools Console for error messages
3. Report issues on GitHub (if available)
4. Contact support with detailed error information

## Tips for Best Experience

- **Keep Chrome Updated**: Ensure you're running the latest version of Chrome
- **Regular Testing**: Test the extension on different plugin pages
- **Provide Feedback**: Share your experience to help improve the extension
- **Star on GitHub**: If you find it useful, give it a star!

---

**Installation Date**: _________________  
**Installed By**: _________________  
**Notes**: _________________