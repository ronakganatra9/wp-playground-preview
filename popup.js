/**
 * WP Playground Preview - Popup Script
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a WordPress plugin page
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTab = tabs[0];
      const statusElement = document.getElementById('status');
      
      if (currentTab && currentTab.url && (currentTab.url.includes('wordpress.org/plugins/') || currentTab.url.includes('wordpress.org/themes/'))) {
        statusElement.className = 'status';
        statusElement.innerHTML = '<div class="status-text">✓ Active on this page</div>';
      } else {
        statusElement.className = 'status inactive';
        statusElement.innerHTML = '<div class="status-text">⚠ Navigate to a WordPress plugin or theme page to use</div>';
      }
    });
  
    // Handle report issue link
    document.getElementById('report-issue').addEventListener('click', function(e) {
      e.preventDefault();
      alert('To report an issue, please visit the extension\'s GitHub repository or contact support.');
    });
  });