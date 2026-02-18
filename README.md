# WP Playground Preview

A Chrome extension that adds a **"Try in Playground"** button to WordPress plugin and theme pages, enabling instant testing in WordPress Playground without any setup.

![Extension Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)

## 🎯 Features

- **One-Click Testing**: Instantly test any WordPress plugin in WordPress Playground
- **Smart Detection**: Only adds the button when Live Preview isn't already available
- **Seamless Integration**: Matches WordPress.org's native button styling
- **New Tab Opening**: Opens playground in a new tab for easy side-by-side testing
- **Clean UI**: Minimal, non-intrusive design that fits perfectly with WordPress.org

## 📸 Screenshots

The extension adds a "Try in Playground" button next to the Download button on WordPress plugin and theme pages:

```
[Download] [Try in Playground]
```

## 🚀 Installation

### Method 1: Install from Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store listing](#) (coming soon)
2. Click "Add to Chrome"
3. Confirm the installation

### Method 2: Install from Source (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension directory
6. The extension is now installed!

## 📝 Usage

1. Navigate to any WordPress plugin or theme page on wordpress.org
   - Example: https://wordpress.org/plugins/contact-form-7/
2. Look for the "Try in Playground" button next to the Download button
3. Click the button to open the plugin in WordPress Playground
4. Test the plugin instantly in a live WordPress environment!

**Note**: The button only appears when:
- You're on a specific plugin page (not search results)
- The plugin doesn't already have a "Live Preview" button

## 🔧 Technical Details

### Manifest Version
- Uses Manifest V3 (latest Chrome extension standard)

### Permissions
- `host_permissions`: Access to wordpress.org to inject the button
- No additional permissions required (privacy-focused)

### Files Structure
```
wp-playground-preview/
├── manifest.json          # Extension configuration
├── content.js            # Main script that adds the button
├── styles.css            # Custom button styling
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
├── README.md             # This file
└── LICENSE               # License information
```

## 🎨 Extension Details

### Name Options
1. **WP Playground Preview** (Recommended - Clear and descriptive)
2. **WordPress Playground Launcher**
3. **Playground Quick Test**
4. **WP Plugin Tester**

### Slug
- `wp-playground-preview`

### Icon Design
- WordPress blue gradient background (#0073aa to #005a87)
- White play button symbol
- Clean, professional appearance
- Available in sizes: 16x16, 32x32, 48x48, 128x128

## 🔗 How It Works

1. **Detection**: The extension runs on all `wordpress.org/plugins/*` pages
2. **URL Parsing**: Extracts the plugin slug from the URL
3. **Button Check**: Verifies that a Live Preview button doesn't already exist
4. **Button Creation**: Creates a styled button matching WordPress.org design
5. **Link Generation**: Creates playground URL: `https://playground.wordpress.net/?plugin={slug}`
6. **Insertion**: Places the button next to the Download button

## 🛠️ Development

### Building from Source
```bash
# Clone the repository
git clone https://github.com/yourusername/wp-playground-preview.git

# Navigate to directory
cd wp-playground-preview

# Generate icons (if needed)
python3 generate_icons.py
```

### Testing
1. Load the extension in Chrome (Developer Mode)
2. Visit any WordPress plugin or theme page
3. Verify the button appears and functions correctly
4. Test with plugins that have/don't have Live Preview

### Code Quality
- Clean, commented JavaScript
- ES6+ syntax
- Mutation Observer for dynamic content
- Error handling and logging

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Add keyboard shortcut (Alt+P) to open playground
- [ ] Settings panel for customization
- [ ] Support for theme pages
- [ ] Option to open with specific WordPress version
- [ ] Statistics tracking (optional, with user consent)
- [ ] Dark mode support

## 🐛 Known Issues

None currently. Please [report issues](https://github.com/yourusername/wp-playground-preview/issues) if you find any!

## ❓ FAQ

**Q: Why doesn't the button appear on some plugin pages?**  
A: The button only appears when there's no existing "Live Preview" button to avoid duplication.

**Q: Is this extension safe to use?**  
A: Yes! The extension only adds a button to WordPress.org pages. It doesn't collect data or require sensitive permissions.

**Q: Does this work with themes too?**  
A: Currently, it only works with plugins. Theme support may be added in a future version.

**Q: Can I customize the button text or style?**  
A: Currently, no. Customization options may be added in future updates.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- WordPress.org for the amazing plugin repository
- WordPress Playground team for the incredible testing platform
- The WordPress community for continuous inspiration

## 📞 Support

- Report bugs: [GitHub Issues](https://github.com/yourusername/wp-playground-preview/issues)
- Feature requests: [GitHub Discussions](https://github.com/yourusername/wp-playground-preview/discussions)
- Email: support@example.com

## 🌟 Star This Repository

If you find this extension helpful, please consider giving it a star on GitHub!

---

Made with ❤️ for the WordPress community