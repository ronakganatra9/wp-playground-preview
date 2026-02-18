# Privacy Policy – WP Playground Preview

**Last updated:** 2026

## Overview

WP Playground Preview is a Chrome extension that adds "Try in Playground" and "Add to Playground list" on WordPress.org plugin and theme pages. This policy describes what data the extension uses and where it is stored.

## Data storage

- **Local storage only:** The extension uses Chrome’s local storage (`chrome.storage.local`) to save your "Playground list" (plugin and theme slugs and names you add). This data stays on your device and is not sent to any external server.
- **No account or personal data:** The extension does not collect, transmit, or store any account information, emails, or other personal data.

## Network requests

- **WordPress.org and API:** The extension loads and runs only on WordPress.org (and locale subdomains such as `en-gb.wordpress.org`). It may request the public WordPress version API (`api.wordpress.org/core/version-check/1.7/`) when you use "Advanced options" to choose a WordPress version. No personal data is sent in these requests.
- **Playground:** When you click "Try in Playground" or "Open in Playground," your browser opens `playground.wordpress.net` with the selected plugin/theme in the URL. That request is made by your browser to WordPress Playground; the extension does not send data to any other servers.

## Permissions

- **storage:** Used to save and read your Playground list locally.
- **activeTab:** Used only when you open the extension popup so it can detect whether the current tab is a WordPress.org plugin or theme page and show the right status.
- **host_permissions** (wordpress.org, api.wordpress.org): Used so the extension can run on WordPress.org pages and fetch the public version list from the WordPress API.

## Changes

We may update this privacy policy from time to time. The "Last updated" date at the top will be revised when we do.

## Contact

For questions about this extension or its privacy practices, use the support or contact option provided in the Chrome Web Store listing or the extension’s repository.
