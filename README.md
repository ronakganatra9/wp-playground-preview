# WP Playground Preview

A Chrome extension that adds **"Try in Playground"** and **"Add to Playground list"** to WordPress.org plugin and theme pages, enabling instant testing in [WordPress Playground](https://playground.wordpress.net) with one click or with multiple plugins and a theme together.

![Extension Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)

## 🎯 Features

- **Try in Playground**: One-click testing for any WordPress **plugin** or **theme** in WordPress Playground
- **Add to Playground list**: Build a list of multiple plugins and one theme, then open them all in Playground at once
- **Floating list**: A floating icon shows your list count; open it to view items by category (Plugins / Themes), remove items, clear list, or open in Playground
- **Advanced options**: Before opening, choose WordPress version (latest + 2 previous majors) and PHP version (7.4–8.5 or latest)
- **Smart detection**: On plugin pages, the button is only added when Live Preview isn’t already available
- **Theme & locale support**: Works on plugin and theme pages, including locale subdomains (e.g. `en-gb.wordpress.org`)
- **Seamless integration**: Matches WordPress.org button styling; list stored locally on your device

## 📸 Screenshots

On **plugin** and **theme** pages you’ll see:

- **Try in Playground** – opens this plugin/theme in Playground in a new tab  
- **Add to Playground list** – adds it to your list (or shows “Already in Playground list” when already added)

```
[Download] [Try in Playground] [Add to Playground list]
```

A **floating icon** (bottom-right) opens your Playground list: view items, remove any, clear list, set WordPress/PHP version (advanced), then **Open in Playground**.

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

### Try in Playground (single item)

1. Go to any WordPress **plugin** or **theme** page on wordpress.org (including locale sites like `en-gb.wordpress.org`).
   - Plugin example: https://wordpress.org/plugins/contact-form-7/
   - Theme example: https://wordpress.org/themes/twentytwentyfour/
2. Click **Try in Playground** to open that plugin or theme in WordPress Playground in a new tab.
3. Test it in a live WordPress environment.

### Add to Playground list (multiple items)

1. On plugin or theme pages, click **Add to Playground list** to add the current plugin or theme to your list.
   - You can add **multiple plugins** and **one theme** (adding another theme replaces the need to remove the current theme first).
2. Use the **floating icon** (bottom-right) to open your list:
   - View items under **Plugins** and **Themes**.
   - Remove items with the × button or **Clear list** to empty the list.
   - Optionally enable **Advanced options** to choose **WordPress version** (Latest, 6.8, 6.7, etc.) and **PHP version** (Latest, 8.5, 8.4, … 7.4).
3. Click **Open in Playground** to open Playground with all listed plugins and the theme (and chosen WP/PHP version if set).

**Note**: Buttons appear only on **single** plugin or theme pages (not on search or listing pages). On plugin pages, “Try in Playground” is only added when the page doesn’t already have a Live Preview button.

## 🔧 Technical Details

### Manifest Version
- Uses Manifest V3 (latest Chrome extension standard)

### Permissions
- **storage**: Saves your Playground list locally on your device (no server).
- **activeTab**: Lets the popup detect if the current tab is a WordPress.org plugin/theme page when you open the extension.
- **host_permissions**: wordpress.org and api.wordpress.org — to inject buttons and fetch the public WordPress version list for Advanced options.

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

### Name
**WP Playground Preview** — works for both plugins and themes.

### Slug
- `wp-playground-preview`

### Icon Design
- WordPress blue gradient background (#0073aa to #005a87)
- White play button symbol
- Clean, professional appearance
- Available in sizes: 16x16, 32x32, 48x48, 128x128

## 🔗 How It Works

- **Try in Playground**: On each plugin/theme page, the extension parses the slug from the URL and adds a link to `https://playground.wordpress.net/?plugin={slug}` or `?theme={slug}`. On plugin pages it only adds the button when the page doesn’t already have a Live Preview button.
- **Add to Playground list**: Clicking “Add to Playground list” stores the item (plugin or theme) in `chrome.storage.local`. The floating icon shows the count; opening it shows the list (Plugins / Themes), remove and Clear list, and Advanced options (WordPress + PHP version). “Open in Playground” builds a URL with all `plugin=` and `theme=` params (and optional `wp=` and `php=`) and opens it in a new tab.

## 🛠️ Development

### Building from Source
```bash
# Clone the repository
git clone https://github.com/ronakganatra9/wp-playground-preview.git

# Navigate to directory
cd wp-playground-preview
# Then load the folder as an unpacked extension in Chrome (see Installation).
```

### Testing
1. Load the extension in Chrome (Developer Mode).
2. Visit a WordPress plugin page and a theme page; confirm “Try in Playground” and “Add to Playground list” appear and work.
3. Add several plugins and one theme to the list, open the floating icon, then click “Open in Playground” and confirm the URL and Playground load correctly.
4. Test Advanced options (WordPress version, PHP version) and Clear list.

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



## 🐛 Known Issues

None currently. Please [report issues](https://github.com/ronakganatra9/wp-playground-preview/issues) if you find any!

## ❓ FAQ

**Q: Does this work with plugins and themes?**  
A: Yes. It works on both plugin and theme pages on wordpress.org (and locale subdomains like en-gb.wordpress.org). You get “Try in Playground” and “Add to Playground list” on both.

**Q: Why doesn’t the button appear on some plugin pages?**  
A: On plugin pages, “Try in Playground” is only added when the page doesn’t already have a “Live Preview” button. On theme pages it’s always added.

**Q: What is the Playground list?**  
A: A list you build by clicking “Add to Playground list” on plugin/theme pages. You can add multiple plugins and one theme. Open the floating icon to see the list, remove items, clear it, set WordPress/PHP version (Advanced options), then click “Open in Playground” to open everything at once.

**Q: Is this extension safe to use?**  
A: Yes. It only runs on WordPress.org and adds buttons + a local list. Your list is stored only on your device (Chrome local storage). It doesn’t send your data to any server. See [PRIVACY.md](PRIVACY.md) for details.

**Q: Can I customize the button text or style?**  
A: Not in the UI yet. Customization may be added in a future update.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- WordPress.org for the plugin and theme repositories
- WordPress Playground team for the testing platform
- The WordPress community for continuous inspiration

## 📞 Support

- Report bugs: [GitHub Issues](https://github.com/ronakganatra9/wp-playground-preview/issues)
- Email: ronakganatra9@gmail.com

## 🌟 Star This Repository

If you find this extension helpful, please consider giving it a star on GitHub!

---

Made with ❤️ for the WordPress community