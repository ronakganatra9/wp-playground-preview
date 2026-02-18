/**
 * WP Playground Preview - Content Script
 * Try in Playground + Add to Playground Cart for plugins and themes
 */

(function() {
  'use strict';

  const CART_STORAGE_KEY = 'wpPlaygroundCart';
  const WP_VERSION_API = 'https://api.wordpress.org/core/version-check/1.7/';

  function getPluginSlug() {
    const match = window.location.pathname.match(/\/plugins\/([^\/]+)\/?/);
    return match ? match[1] : null;
  }

  function getThemeSlug() {
    const match = window.location.pathname.match(/\/themes\/([^\/]+)\/?/);
    return match ? match[1] : null;
  }

  function isPluginPage() {
    return window.location.pathname.match(/\/plugins\/[^\/]+\/?$/);
  }

  function isThemePage() {
    return window.location.pathname.match(/\/themes\/[^\/]+\/?$/);
  }

  function getPageTitle() {
    const h1 = document.querySelector('h1');
    return (h1 && h1.textContent && h1.textContent.trim()) || '';
  }

  function hasLivePreview() {
    const el = document.querySelector('.plugin-actions');
    if (!el) return false;
    return !!el.querySelector('.plugin-preview, a[href*="?preview=1"]');
  }

  // --- Cart storage ---
  function getCart() {
    return new Promise(function(resolve) {
      chrome.storage.local.get([CART_STORAGE_KEY], function(data) {
        const cart = data[CART_STORAGE_KEY];
        resolve(cart && typeof cart === 'object' ? cart : { plugins: [], theme: null });
      });
    });
  }

  function setCart(cart) {
    return new Promise(function(resolve) {
      chrome.storage.local.set({ [CART_STORAGE_KEY]: cart }, resolve);
    });
  }

  // --- Try in Playground (existing single-item buttons) ---
  function createPluginPlaygroundButton(slug) {
    const wrap = document.createElement('div');
    wrap.className = 'wp-block-button is-small plugin-playground-preview download-button is-style-outline';
    const a = document.createElement('a');
    a.className = 'wp-block-button__link wp-element-button';
    a.href = 'https://playground.wordpress.net/?plugin=' + encodeURIComponent(slug);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'Try in Playground';
    a.title = 'Test this plugin in WordPress Playground';
    const icon = document.createElement('span');
    icon.className = 'playground-icon';
    icon.innerHTML = '▶';
    icon.style.marginRight = '6px';
    a.insertBefore(icon, a.firstChild);
    wrap.appendChild(a);
    return wrap;
  }

  function createThemePlaygroundButton(slug) {
    const wrap = document.createElement('div');
    wrap.className = 'wp-block-button is-style-outline is-style-outline--8 wp-playground-theme-try';
    const a = document.createElement('a');
    a.href = 'https://playground.wordpress.net/?theme=' + encodeURIComponent(slug);
    a.className = 'wp-block-button__link wp-element-button';
    a.id = 'wporg-theme-button-preview';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'Try in Playground';
    wrap.appendChild(a);
    return wrap;
  }

  // --- Add to Playground Cart buttons ---
  function createCartButton(type, slug, name, options) {
    const wrap = document.createElement('div');
    wrap.className = type === 'plugin'
      ? 'wp-block-button is-small plugin-playground-preview download-button is-style-outline wp-playground-cart-button-wrap'
      : 'wp-playground-cart-button-wrap wp-block-button';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'wp-block-button__link wp-element-button wp-playground-cart-btn';
    btn.setAttribute('data-cart-type', type);
    btn.setAttribute('data-cart-slug', slug);
    if (options && options.disabled) {
      btn.disabled = true;
      btn.classList.add('is-disabled');
      btn.textContent = options.label || 'Already in Playground list';
      if (options.message) {
        const msg = document.createElement('span');
        msg.className = 'wp-playground-cart-msg';
        msg.textContent = options.message;
        wrap.appendChild(msg);
      }
    } else {
      btn.textContent = options && options.label ? options.label : 'Add to Playground list';
      btn.title = 'Add to list and open Playground with multiple items later';
    }
    wrap.appendChild(btn);
    return wrap;
  }

  function updateCartButtonState(container, type, slug, cart) {
    const wrap = container.querySelector('.wp-playground-cart-button-wrap');
    if (!wrap) return;
    const btn = wrap.querySelector('.wp-playground-cart-btn');
    const msgEl = wrap.querySelector('.wp-playground-cart-msg');
    if (type === 'plugin') {
      const inCart = cart.plugins && cart.plugins.some(function(p) { return p.slug === slug; });
      if (inCart) {
        btn.disabled = true;
        btn.classList.add('is-disabled');
        btn.textContent = 'Already in Playground list';
        if (msgEl) msgEl.remove();
      } else {
        btn.disabled = false;
        btn.classList.remove('is-disabled');
        btn.textContent = 'Add to Playground list';
      }
    } else {
      if (cart.theme) {
        if (cart.theme.slug === slug) {
          btn.disabled = true;
          btn.classList.add('is-disabled');
          btn.textContent = 'Already in Playground list';
          if (msgEl) msgEl.remove();
        } else {
          btn.disabled = true;
          btn.classList.add('is-disabled');
          btn.textContent = 'Add to Playground list';
          if (!msgEl) {
            const m = document.createElement('span');
            m.className = 'wp-playground-cart-msg';
            wrap.appendChild(m);
          }
          const m = wrap.querySelector('.wp-playground-cart-msg');
          if (m) m.textContent = 'Already "' + (cart.theme.name || cart.theme.slug) + '" theme in Playground list. Remove it to add this theme.';
        }
      } else {
        btn.disabled = false;
        btn.classList.remove('is-disabled');
        btn.textContent = 'Add to Playground list';
        if (msgEl) msgEl.remove();
      }
    }
  }

  function addPluginButtons(pluginActions, slug) {
    if (hasLivePreview()) return;
    if (pluginActions.querySelector('.plugin-playground-preview')) return;

    const tryBtn = createPluginPlaygroundButton(slug);
    const downloadBtn = pluginActions.querySelector('.plugin-download');
    if (downloadBtn) {
      downloadBtn.parentNode.insertBefore(tryBtn, downloadBtn.nextSibling);
    } else {
      pluginActions.appendChild(tryBtn);
    }

    const cartWrap = createCartButton('plugin', slug, getPageTitle(), {});
    tryBtn.parentNode.insertBefore(cartWrap, tryBtn.nextSibling);

    btnCartClick(cartWrap, 'plugin', slug, getPageTitle());
  }

  function addThemeButtons(themeActions, slug) {
    if (themeActions.querySelector('.wp-playground-theme-try')) return;

    const tryBtn = createThemePlaygroundButton(slug);
    themeActions.appendChild(tryBtn);

    const cartWrap = createCartButton('theme', slug, getPageTitle(), {});
    themeActions.appendChild(cartWrap);

    btnCartClick(cartWrap, 'theme', slug, getPageTitle());
  }

  function btnCartClick(wrap, type, slug, name) {
    const btn = wrap.querySelector('.wp-playground-cart-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      if (btn.disabled) return;
      getCart().then(function(cart) {
        if (type === 'plugin') {
          if (!cart.plugins) cart.plugins = [];
          if (cart.plugins.some(function(p) { return p.slug === slug; })) return;
          cart.plugins.push({ slug: slug, name: name || slug });
        } else {
          if (cart.theme) return;
          cart.theme = { slug: slug, name: name || slug };
        }
        return setCart(cart).then(function() {
          updateCartButtonState(wrap.parentNode, type, slug, cart);
          refreshFloatingCart();
        });
      });
    });
  }

  // --- Floating cart widget ---
  let floatingCartEl = null;
  let cartPanelOpen = false;

  function getCartCount(cart) {
    let n = (cart.plugins && cart.plugins.length) || 0;
    if (cart.theme) n += 1;
    return n;
  }

  function buildPlaygroundUrl(cart, wpVersion, phpVersion) {
    const base = 'https://playground.wordpress.net/';
    const params = [];
    if (cart.plugins && cart.plugins.length) {
      cart.plugins.forEach(function(p) {
        params.push('plugin=' + encodeURIComponent(p.slug));
      });
    }
    if (cart.theme) {
      params.push('theme=' + encodeURIComponent(cart.theme.slug));
    }
    if (wpVersion && wpVersion !== 'latest') {
      params.push('wp=' + encodeURIComponent(wpVersion));
    }
    if (phpVersion && phpVersion !== 'latest') {
      params.push('php=' + encodeURIComponent(phpVersion));
    }
    return params.length ? base + '?' + params.join('&') : base;
  }

  var PHP_VERSIONS = ['latest', '8.5', '8.4', '8.3', '8.2', '8.1', '8.0', '7.4'];

  function fetchWpVersionsLast3() {
    return fetch(WP_VERSION_API)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        const offers = data.offers || [];
        const byMajor = {};
        offers.forEach(function(o) {
          const v = o.version;
          if (!v) return;
          const parts = v.split('.');
          var major = parts[0] + '.' + (parts[1] || '0');
          if (!byMajor[major]) byMajor[major] = major;
        });
        const sorted = Object.keys(byMajor).sort(function(a, b) {
          const ap = a.split('.').map(Number);
          const bp = b.split('.').map(Number);
          return bp[0] !== ap[0] ? bp[0] - ap[0] : bp[1] - ap[1];
        });
        return sorted.slice(0, 3);
      })
      .catch(function() { return []; });
  }

  function refreshFloatingCart() {
    getCart().then(function(cart) {
      if (!floatingCartEl) {
        injectFloatingCart();
        floatingCartEl = document.getElementById('wp-playground-floating-cart');
      }
      if (!floatingCartEl) return;

      const count = getCartCount(cart);
      const badge = floatingCartEl.querySelector('.wp-playground-cart-badge');
      if (badge) badge.textContent = count;
      floatingCartEl.classList.toggle('is-empty', count === 0);

      const list = floatingCartEl.querySelector('.wp-playground-cart-list');
      if (list) {
        list.innerHTML = '';
        if (count === 0) {
          const empty = document.createElement('div');
          empty.className = 'wp-playground-cart-empty';
          empty.textContent = 'Your Playground list is empty. Add plugins or a theme from WordPress.org.';
          list.appendChild(empty);
        } else {
          if (cart.plugins && cart.plugins.length > 0) {
            const plugHead = document.createElement('div');
            plugHead.className = 'wp-playground-list-category';
            plugHead.textContent = 'Plugins';
            list.appendChild(plugHead);
            cart.plugins.forEach(function(p) {
              const row = document.createElement('div');
              row.className = 'wp-playground-cart-item';
              row.innerHTML = '<span class="wp-playground-cart-item-name">' + escapeHtml(p.name || p.slug) + '</span> <button type="button" class="wp-playground-cart-remove" data-type="plugin" data-slug="' + escapeHtml(p.slug) + '" aria-label="Remove">×</button>';
              list.appendChild(row);
            });
          }
          if (cart.theme) {
            const themeHead = document.createElement('div');
            themeHead.className = 'wp-playground-list-category';
            themeHead.textContent = 'Themes';
            list.appendChild(themeHead);
            const row = document.createElement('div');
            row.className = 'wp-playground-cart-item';
            row.innerHTML = '<span class="wp-playground-cart-item-name">' + escapeHtml(cart.theme.name || cart.theme.slug) + '</span> <button type="button" class="wp-playground-cart-remove" data-type="theme" data-slug="' + escapeHtml(cart.theme.slug) + '" aria-label="Remove">×</button>';
            list.appendChild(row);
          }
        }
      }

      const clearBtn = floatingCartEl.querySelector('.wp-playground-clear-list');
      if (clearBtn) clearBtn.style.display = count === 0 ? 'none' : 'block';

      bindCartRemoveButtons(floatingCartEl);
      bindProceedButton(floatingCartEl);
      const proceed = floatingCartEl.querySelector('.wp-playground-proceed-btn');
      if (proceed) proceed.disabled = count === 0;
    });
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function bindCartRemoveButtons(root) {
    if (!root) return;
    root.querySelectorAll('.wp-playground-cart-remove').forEach(function(btn) {
      btn.onclick = function() {
        const type = btn.getAttribute('data-type');
        const slug = btn.getAttribute('data-slug');
        getCart().then(function(cart) {
          if (type === 'plugin' && cart.plugins) {
            cart.plugins = cart.plugins.filter(function(p) { return p.slug !== slug; });
          } else if (type === 'theme') {
            cart.theme = null;
          }
          return setCart(cart).then(function() {
            refreshFloatingCart();
            updatePageCartButtons();
          });
        });
      };
    });
  }

  function updatePageCartButtons() {
    getCart().then(function(cart) {
      const pluginSlug = getPluginSlug();
      const themeSlug = getThemeSlug();
      if (pluginSlug) {
        const container = document.querySelector('.plugin-actions');
        if (container) updateCartButtonState(container, 'plugin', pluginSlug, cart);
      }
      if (themeSlug) {
        const container = document.querySelector('.wporg-theme-actions');
        if (container) updateCartButtonState(container, 'theme', themeSlug, cart);
      }
    });
  }

  function bindProceedButton(root) {
    const proceed = root.querySelector('.wp-playground-proceed-btn');
    if (!proceed) return;
    proceed.onclick = function() {
      getCart().then(function(cart) {
        if (getCartCount(cart) === 0) return;
        const advanced = root.querySelector('.wp-playground-advanced-toggle');
        let wpVersion = 'latest';
        let phpVersion = 'latest';
        if (advanced && advanced.checked) {
          const wpSel = root.querySelector('.wp-playground-version-select');
          if (wpSel && wpSel.value) wpVersion = wpSel.value;
          const phpSel = root.querySelector('.wp-playground-php-select');
          if (phpSel && phpSel.value) phpVersion = phpSel.value;
        }
        const url = buildPlaygroundUrl(cart, wpVersion === 'latest' ? '' : wpVersion, phpVersion === 'latest' ? '' : phpVersion);
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    };
  }

  function injectFloatingCart() {
    if (document.getElementById('wp-playground-floating-cart')) return;

    const root = document.createElement('div');
    root.id = 'wp-playground-floating-cart';
    root.className = 'wp-playground-floating-cart';
    root.innerHTML =
      '<button type="button" class="wp-playground-cart-trigger" aria-label="Playground list">' +
        '<span class="wp-playground-cart-icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="28" height="28" fill="none"><path fill="#fff" fill-rule="evenodd" d="M11.9 36.425c-2.181 3.007-3.332 6.703-3.517 10.765a26.43 26.43 0 0 0-.014 1.998c.276 9.138 5.134 19.78 13.898 28.544C35.678 91.144 53.492 95.41 63.575 88.1c-4.241-1-8.532-2.558-12.757-4.635a23.019 23.019 0 0 1-3.502-.44c-2.139-.427-4.4-1.161-6.703-2.206-4.213-1.91-8.568-4.857-12.572-8.861-4.004-4.004-6.95-8.358-8.86-12.57-1.045-2.304-1.78-4.566-2.207-6.704a23.006 23.006 0 0 1-.439-3.501c-2.078-4.226-3.636-8.517-4.636-12.758Zm-8.401 25.43c.305-.305.625-.59.96-.854a50.372 50.372 0 0 0 3.868 8.526c-.214.943-.26 2.235.087 3.966.688 3.437 2.831 7.657 6.634 11.46 3.802 3.802 8.022 5.945 11.459 6.633 1.732.346 3.024.301 3.967.087A50.375 50.375 0 0 0 39 95.541c-.264.334-.55.655-.855.96-6.378 6.378-19.304 3.793-28.872-5.774C-.294 81.159-2.879 68.233 3.5 61.855Zm31.76 2.886C54.392 83.875 80.245 89.046 93.001 76.29c4.613-4.613 6.881-10.937 6.994-18.037.198-12.536-6.327-27.49-18.543-39.706C62.32-.588 36.466-5.76 23.71 6.997c-4.618 4.62-6.887 10.954-6.994 18.066-.187 12.53 6.336 27.471 18.543 39.678Zm26.946 3.395c.356 1.777.492 3.384.45 4.827-7.185-2.501-14.8-7.174-21.622-13.996-6.822-6.822-11.495-14.437-13.996-21.623 1.442-.04 3.05.095 4.826.45 6.05 1.21 13.081 4.873 19.276 11.067 6.194 6.195 9.857 13.226 11.066 19.275ZM29.484 12.772c-3.458 3.458-5.302 9.08-4.373 16.521 9.781-.95 21.973 3.965 31.802 13.794 9.828 9.828 14.745 22.02 13.794 31.801 7.44.93 13.063-.915 16.52-4.372 3.848-3.847 5.698-10.376 3.952-19.104-1.732-8.662-6.914-18.505-15.5-27.091-8.586-8.586-18.43-13.768-27.091-15.5-8.729-1.746-15.257.104-19.104 3.951Z" clip-rule="evenodd"/></svg>' +
        '</span>' +
        '<span class="wp-playground-cart-badge">0</span>' +
      '</button>' +
      '<div class="wp-playground-cart-panel">' +
        '<div class="wp-playground-cart-panel-header">' +
          '<strong>Playground list</strong>' +
          '<button type="button" class="wp-playground-cart-close" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="wp-playground-cart-list"></div>' +
        '<button type="button" class="wp-playground-clear-list" style="display:none">Clear list</button>' +
        '<div class="wp-playground-cart-advanced">' +
          '<label class="wp-playground-advanced-label">' +
            '<input type="checkbox" class="wp-playground-advanced-toggle"> Advanced options' +
          '</label>' +
          '<div class="wp-playground-advanced-content" hidden>' +
            '<label>WordPress version</label>' +
            '<select class="wp-playground-version-select">' +
              '<option value="latest">Latest</option>' +
            '</select>' +
            '<label>PHP version</label>' +
            '<select class="wp-playground-php-select">' +
              '<option value="latest">Latest</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
        '<div class="wp-playground-cart-footer">' +
          '<button type="button" class="wp-playground-proceed-btn">Open in Playground</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(root);

    const trigger = root.querySelector('.wp-playground-cart-trigger');
    const panel = root.querySelector('.wp-playground-cart-panel');
    const closeBtn = root.querySelector('.wp-playground-cart-close');
    const advancedToggle = root.querySelector('.wp-playground-advanced-toggle');
    const advancedContent = root.querySelector('.wp-playground-advanced-content');
    const versionSelect = root.querySelector('.wp-playground-version-select');

    function togglePanel() {
      cartPanelOpen = !cartPanelOpen;
      panel.classList.toggle('is-open', cartPanelOpen);
    }

    trigger.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', function() {
      cartPanelOpen = false;
      panel.classList.remove('is-open');
    });

    advancedToggle.addEventListener('change', function() {
      const show = advancedToggle.checked;
      advancedContent.hidden = !show;
      if (show) {
        if (versionSelect.options.length <= 1) {
          versionSelect.innerHTML = '<option value="latest">Latest</option>';
          fetchWpVersionsLast3().then(function(versions) {
            (versions.slice(1, 3) || []).forEach(function(v) {
              var opt = document.createElement('option');
              opt.value = v;
              opt.textContent = v;
              versionSelect.appendChild(opt);
            });
          });
        }
        var phpSelect = root.querySelector('.wp-playground-php-select');
        if (phpSelect && phpSelect.options.length <= 1) {
          phpSelect.innerHTML = '';
          PHP_VERSIONS.forEach(function(v) {
            var opt = document.createElement('option');
            opt.value = v;
            opt.textContent = v === 'latest' ? 'Latest' : v;
            phpSelect.appendChild(opt);
          });
        }
      }
    });

    root.querySelector('.wp-playground-clear-list').addEventListener('click', function() {
      setCart({ plugins: [], theme: null }).then(function() {
        refreshFloatingCart();
        updatePageCartButtons();
      });
    });

    refreshFloatingCart();
  }

  // --- Plugin page ---
  function addPlaygroundButton() {
    if (!isPluginPage()) return;
    const slug = getPluginSlug();
    if (!slug) return;
    const pluginActions = document.querySelector('.plugin-actions');
    if (!pluginActions) return;

    getCart().then(function(cart) {
      if (pluginActions.querySelector('.plugin-playground-preview')) {
        var wrap = pluginActions.querySelector('.wp-playground-cart-button-wrap');
        if (!wrap) {
          var tryBtn = pluginActions.querySelector('.plugin-playground-preview');
          wrap = createCartButton('plugin', slug, getPageTitle(), {});
          tryBtn.parentNode.insertBefore(wrap, tryBtn.nextSibling);
          btnCartClick(wrap, 'plugin', slug, getPageTitle());
        }
        updateCartButtonState(pluginActions, 'plugin', slug, cart);
        return;
      }
      addPluginButtons(pluginActions, slug);
      wrap = pluginActions.querySelector('.wp-playground-cart-button-wrap');
      if (wrap) updateCartButtonState(pluginActions, 'plugin', slug, cart);
    });
  }

  // --- Theme page ---
  function addThemePlaygroundButton() {
    if (!isThemePage()) return;
    const slug = getThemeSlug();
    if (!slug) return;
    const themeActions = document.querySelector('.wporg-theme-actions');
    if (!themeActions) return;

    getCart().then(function(cart) {
      if (themeActions.querySelector('.wp-playground-theme-try, #wporg-theme-button-preview')) {
        var wrap = themeActions.querySelector('.wp-playground-cart-button-wrap');
        if (!wrap) {
          var cartWrap = createCartButton('theme', slug, getPageTitle(), {});
          themeActions.appendChild(cartWrap);
          btnCartClick(themeActions.querySelector('.wp-playground-cart-button-wrap'), 'theme', slug, getPageTitle());
        }
        updateCartButtonState(themeActions, 'theme', slug, cart);
        return;
      }
    });
    addThemeButtons(themeActions, slug);
  }

  function runInjector() {
    if (isPluginPage()) {
      addPlaygroundButton();
    } else if (isThemePage()) {
      addThemePlaygroundButton();
    }
    injectFloatingCart();
  }

  chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'local' && changes[CART_STORAGE_KEY]) {
      refreshFloatingCart();
      updatePageCartButtons();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInjector);
  } else {
    runInjector();
  }

  const observer = new MutationObserver(function(mutations) {
    let run = false;
    mutations.forEach(function(m) {
      if (m.addedNodes.length) run = true;
    });
    if (run) {
      if (isPluginPage()) {
        const pluginActions = document.querySelector('.plugin-actions');
        if (pluginActions && !pluginActions.querySelector('.plugin-playground-preview')) addPlaygroundButton();
      } else if (isThemePage()) {
        const themeActions = document.querySelector('.wporg-theme-actions');
        if (themeActions) addThemePlaygroundButton();
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
