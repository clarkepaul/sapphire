(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define('ss.LeftAndMain.Ping', ['jQuery'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('jQuery'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.jQuery);
		global.ssLeftAndMainPing = mod.exports;
	}
})(this, function (_jQuery) {
	'use strict';

	var _jQuery2 = _interopRequireDefault(_jQuery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_jQuery2.default.entwine('ss.ping', function ($) {

		$('.cms-container').entwine( /** @lends ss.Form_EditForm */{
			/**
    * Variable: PingIntervalSeconds
    * (Number) Interval in which /Security/ping will be checked for a valid login session.
    */
			PingIntervalSeconds: 5 * 60,

			onadd: function onadd() {
				this._setupPinging();
				this._super();
			},

			/**
    * Function: _setupPinging
    *
    * This function is called by prototype when it receives notification that the user was logged out.
    * It uses /Security/ping for this purpose, which should return '1' if a valid user session exists.
    * It redirects back to the login form if the URL is either unreachable, or returns '0'.
    */
			_setupPinging: function _setupPinging() {
				var onSessionLost = function onSessionLost(xmlhttp, status) {
					if (xmlhttp.status > 400 || xmlhttp.responseText == 0) {
						// TODO will pile up additional alerts when left unattended
						if (window.open('Security/login')) {
							alert('Please log in and then try again');
						} else {
							alert('Please enable pop-ups for this site');
						}
					}
				};

				// setup pinging for login expiry
				setInterval(function () {
					$.ajax({
						url: 'Security/ping',
						global: false,
						type: 'POST',
						complete: onSessionLost
					});
				}, this.getPingIntervalSeconds() * 1000);
			}
		});
	}); /**
      * File: LeftAndMain.Ping.js
      */
});