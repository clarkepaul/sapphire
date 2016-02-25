(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define('ss.TabSet', ['./jQuery'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('./jQuery'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.jQuery);
		global.ssTabSet = mod.exports;
	}
})(this, function (_jQuery) {
	'use strict';

	var _jQuery2 = _interopRequireDefault(_jQuery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_jQuery2.default.entwine('ss', function ($) {
		/**
   * Lightweight wrapper around jQuery UI tabs for generic tab set-up
   */
		$('.ss-tabset').entwine({
			IgnoreTabState: false,

			onadd: function onadd() {
				var hash = window.location.hash;

				// Can't name redraw() as it clashes with other CMS entwine classes
				this.redrawTabs();

				if (hash !== '') {
					this.openTabFromURL(hash);
				}

				this._super();
			},

			onremove: function onremove() {
				if (this.data('tabs')) this.tabs('destroy');
				this._super();
			},

			redrawTabs: function redrawTabs() {
				this.rewriteHashlinks();
				this.tabs();
			},

			/**
    * @func openTabFromURL
    * @param {string} hash
    * @desc Allows linking to a specific tab.
    */
			openTabFromURL: function openTabFromURL(hash) {
				var $trigger;

				// Make sure the hash relates to a valid tab.
				$.each(this.find('.cms-panel-link'), function () {
					// The hash in in the button's href and there is exactly one tab with that id.
					if (this.href.indexOf(hash) !== -1 && $(hash).length === 1) {
						$trigger = $(this);
						return false; // break the loop
					}
				});

				// If there's no tab, it means the hash is invalid, so do nothing.
				if ($trigger === void 0) {
					return;
				}

				// Switch to the correct tab when AJAX loading completes.
				$(window).one('ajaxComplete', function () {
					$trigger.click();
				});
			},

			/**
    * @func rewriteHashlinks
    * @desc Ensure hash links are prefixed with the current page URL, otherwise jQuery interprets them as being external.
    */
			rewriteHashlinks: function rewriteHashlinks() {
				$(this).find('ul a').each(function () {
					if (!$(this).attr('href')) return;

					var matches = $(this).attr('href').match(/#.*/);
					if (!matches) return;
					$(this).attr('href', document.location.href.replace(/#.*/, '') + matches[0]);
				});
			}
		});
	});
});