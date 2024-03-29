/* eslint-disable */

!(function (e) {
	if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e();
	else if ('function' == typeof define && define.amd) define([], e);
	else {
		('undefined' != typeof window
			? window
			: 'undefined' != typeof global
			? global
			: 'undefined' != typeof self
			? self
			: this
		).drkmdJs = e();
	}
})(function () {
	return (function e(t, n, o) {
		function r(i, d) {
			if (!n[i]) {
				if (!t[i]) {
					var c = 'function' == typeof require && require;
					if (!d && c) return c(i, !0);
					if (a) return a(i, !0);
					var u = new Error("Cannot find module '" + i + "'");
					throw ((u.code = 'MODULE_NOT_FOUND'), u);
				}
				var l = (n[i] = { exports: {} });
				t[i][0].call(
					l.exports,
					function (e) {
						return r(t[i][1][e] || e);
					},
					l,
					l.exports,
					e,
					t,
					n,
					o,
				);
			}
			return n[i].exports;
		}
		for (var a = 'function' == typeof require && require, i = 0; i < o.length; i++) r(o[i]);
		return r;
	})(
		{
			1: [
				function (e, t, n) {
					'use strict';
					function o(e, t) {
						for (var n = 0; n < t.length; n++) {
							var o = t[n];
							(o.enumerable = o.enumerable || !1),
								(o.configurable = !0),
								'value' in o && (o.writable = !0),
								Object.defineProperty(e, o.key, o);
						}
					}
					Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.default = n.IS_BROWSER = void 0);
					var r = 'undefined' != typeof window;
					n.IS_BROWSER = r;
					var a = (function () {
						function e(t) {
							var n = this;
							!(function (e, t) {
								if (!(e instanceof t))
									throw new TypeError(
										'Cannot call a class as a function',
									);
							})(this, e);
							(t = Object.assign(
								{},
								{
									top: 'unset',
									bottom: '20px',
									right: '20px',
									left: 'unset',
									attach: !1,
									buttonLight: '#fff',
									buttonDark: '#000',
									events: !0,
									cookie: !1,
									localStorage: !0,
									label: '🌓',
									autoMatchOsTheme: !0,
									defaultTheme: 'light',
								},
								t,
							)),
								(this.options = t),
								(this.dark = !1),
								t.autoMatchOsTheme &&
									(window
										.matchMedia(
											'(prefers-color-scheme: dark)',
										)
										.addListener(function (e) {
											return (
												e.matches &&
												n._handlePreferedThemeChangeEvent()
											);
										}),
									window
										.matchMedia(
											'(prefers-color-scheme: light)',
										)
										.addListener(function (e) {
											return (
												e.matches &&
												n._handlePreferedThemeChangeEvent()
											);
										}));
							var o = 'light' !== t.defaultTheme;
							if (
								(t.autoMatchOsTheme &&
									(o = this._preferedThemeIsDark()),
								this.options.cookie)
							) {
								var r = document.cookie.match(
									RegExp('(?:^|;\\s*)darkmode=([^;]*)'),
								);
								o = r ? 'true' === r[1] : null;
							}
							this.options.localStorage &&
								null !== window.localStorage &&
								(o =
									'true' ===
									window.localStorage.getItem('darkmode')),
								this._changeThemeToDark(o);
						}
						var t, n, r;
						return (
							(t = e),
							(n = [
								{
									key: 'attach',
									value: function () {
										var e = this,
											t =
												'\n            .drkmd-toggle-button{\n                position: fixed;\n                z-index: 1000;\n                left: '
													.concat(
														this
															.options
															.left,
														';\n                right: ',
													)
													.concat(
														this
															.options
															.right,
														';\n                bottom: ',
													)
													.concat(
														this
															.options
															.bottom,
														';\n                top: ',
													)
													.concat(
														this
															.options
															.top,
														';\n                height: 3rem;\n                min-width: 3rem;\n                border-radius: 3rem;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                background: ',
													)
													.concat(
														this
															.options
															.buttonDark,
														';\n                color: ',
													)
													.concat(
														this
															.options
															.buttonLight,
														';\n                cursor: pointer;\n            }\n\n            .drkmd-toggle-button span{\n                margin: 0;\n                padding: 0px 10px;\n            }\n\n            .dark-theme .drkmd-toggle-button{\n                background: ',
													)
													.concat(
														this
															.options
															.buttonLight,
														';\n                color: ',
													)
													.concat(
														this
															.options
															.buttonDark,
														'\n            }\n        ',
													),
											n =
												document.createElement(
													'div',
												),
											o =
												document.createElement(
													'span',
												);
										(o.innerHTML = this.options.label),
											(n.className =
												'drkmd-toggle-button'),
											n.setAttribute(
												'title',
												'Toggle dark mode',
											),
											n.setAttribute(
												'aria-label',
												'Toggle dark mode',
											),
											n.setAttribute(
												'aria-checked',
												'false',
											),
											n.setAttribute(
												'role',
												'checkbox',
											),
											n.appendChild(o),
											n.addEventListener(
												'click',
												function () {
													e.toggle();
												},
											),
											document.body.insertBefore(
												n,
												document.body
													.firstChild,
											),
											this._addStyle(t);
									},
								},
								{
									key: 'toLight',
									value: function () {
										this.options.events &&
											window.dispatchEvent(
												new CustomEvent(
													'theme-change',
													{
														detail: {
															to: 'light',
														},
													},
												),
											),
											document.documentElement.setAttribute(
												'data-theme',
												'light',
											),
											document.body.classList.remove(
												'dark-theme',
											),
											document.body.classList.add(
												'light-theme',
											),
											this._setStorageValue(!1),
											(this.dark = !1);
									},
								},
								{
									key: 'toDark',
									value: function () {
										this.options.events &&
											window.dispatchEvent(
												new CustomEvent(
													'theme-change',
													{
														detail: {
															to: 'dark',
														},
													},
												),
											),
											document.documentElement.setAttribute(
												'data-theme',
												'dark',
											),
											document.body.classList.add(
												'dark-theme',
											),
											document.body.classList.remove(
												'light-theme',
											),
											this._setStorageValue(!0),
											(this.dark = !0);
									},
								},
								{
									key: 'toggle',
									value: function () {
										var e = !this.dark;
										return this._changeThemeToDark(e), e;
									},
								},
								{
									key: 'isDark',
									value: function () {
										return !0 === this.dark;
									},
								},
								{
									key: 'isLight',
									value: function () {
										return !1 === this.dark;
									},
								},
								{
									key: 'currentTheme',
									value: function () {
										return this.dark ? 'dark' : 'light';
									},
								},
								{
									key: '_preferedThemeIsDark',
									value: function () {
										return (
											window.matchMedia &&
											window.matchMedia(
												'(prefers-color-scheme: dark)',
											).matches
										);
									},
								},
								{
									key: '_handlePreferedThemeChangeEvent',
									value: function () {
										var e = this._preferedThemeIsDark();
										this._changeThemeToDark(e);
									},
								},
								{
									key: '_changeThemeToDark',
									value: function (e) {
										e ? this.toDark() : this.toLight();
									},
								},
								{
									key: '_setStorageValue',
									value: function (e) {
										this.options.localStorage &&
										null !== window.localStorage
											? window.localStorage.setItem(
													'darkmode',
													e,
											  )
											: this.options.cookie &&
											  (document.cookie =
													'darkmode='.concat(
														e,
													));
									},
								},
								{
									key: '_addStyle',
									value: function (e) {
										var t = document.createElement('link');
										t.setAttribute('rel', 'stylesheet'),
											t.setAttribute(
												'type',
												'text/css',
											),
											t.setAttribute(
												'href',
												'data:text/css;charset=UTF-8,' +
													encodeURIComponent(
														e,
													),
											),
											document.head.appendChild(t);
									},
								},
							]) && o(t.prototype, n),
							r && o(t, r),
							e
						);
					})();
					n.default = a;
				},
				{},
			],
			2: [
				function (e, t, n) {
					'use strict';
					function o(e) {
						return (o =
							'function' == typeof Symbol &&
							'symbol' == typeof Symbol.iterator
								? function (e) {
										return typeof e;
								  }
								: function (e) {
										return e &&
											'function' == typeof Symbol &&
											e.constructor === Symbol &&
											e !== Symbol.prototype
											? 'symbol'
											: typeof e;
								  })(e);
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
					var r = (function (e) {
						if (e && e.__esModule) return e;
						if (null === e || ('object' !== o(e) && 'function' != typeof e))
							return { default: e };
						var t = a();
						if (t && t.has(e)) return t.get(e);
						var n = {},
							r = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var i in e)
							if (Object.prototype.hasOwnProperty.call(e, i)) {
								var d = r
									? Object.getOwnPropertyDescriptor(e, i)
									: null;
								d && (d.get || d.set)
									? Object.defineProperty(n, i, d)
									: (n[i] = e[i]);
							}
						(n.default = e), t && t.set(e, n);
						return n;
					})(e('./drkmd'));
					function a() {
						if ('function' != typeof WeakMap) return null;
						var e = new WeakMap();
						return (
							(a = function () {
								return e;
							}),
							e
						);
					}
					var i = r.default;
					n.default = i;
					r.IS_BROWSER
						? (function () {
								var e = document.querySelector('[data-drkmd-opts]'),
									t =
										document.querySelector(
											'[data-drkmd-attach]',
										),
									n =
										document.querySelectorAll(
											'[data-drkmd-toggle]',
										),
									o =
										document.querySelectorAll(
											'[data-drkmd-to-light]',
										),
									a =
										document.querySelectorAll(
											'[data-drkmd-to-dark]',
										);
								if (
									!e &&
									!t &&
									n.length < 1 &&
									o.length < 1 &&
									a.length < 1
								)
									window.Darkmode = r.default;
								else {
									var i =
											(e &&
												e.getAttribute(
													'data-drkmd-opts',
												)) ||
											'{}',
										d = JSON.parse(i);
									if (
										((window.darkmode = new r.default(d)),
										n.length > 0)
									)
										for (var c = 0; c < n.length; c++)
											n[c].addEventListener(
												'click',
												function () {
													window.darkmode.toggle();
												},
											);
									if (o.length > 0)
										for (var u = 0; u < o.length; u++)
											o[u].addEventListener(
												'click',
												function () {
													window.darkmode.toLight();
												},
											);
									if (a.length > 0)
										for (var l = 0; l < a.length; l++)
											a[l].addEventListener(
												'click',
												function () {
													window.darkmode.toDark();
												},
											);
									(window.darkmode.options.attach || t) &&
										window.darkmode.attach();
								}
						  })()
						: console.warn(
								'drkmd.js: Detected environment without a `window` object',
						  );
				},
				{ './drkmd': 1 },
			],
		},
		{},
		[2],
	)(2);
});
