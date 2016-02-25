(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define('ss.DateField', ['./jQuery'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('./jQuery'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.jQuery);
		global.ssDateField = mod.exports;
	}
})(this, function (_jQuery) {
	'use strict';

	var _jQuery2 = _interopRequireDefault(_jQuery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_jQuery2.default.fn.extend({
		ssDatepicker: function ssDatepicker(opts) {
			return (0, _jQuery2.default)(this).each(function () {
				if ((0, _jQuery2.default)(this).data('datepicker')) return; // already applied

				(0, _jQuery2.default)(this).siblings("button").addClass("ui-icon ui-icon-calendar");

				var holder = (0, _jQuery2.default)(this).parents('.field.date:first'),
				    config = _jQuery2.default.extend(opts || {}, (0, _jQuery2.default)(this).data(), (0, _jQuery2.default)(this).data('jqueryuiconfig'), {});
				if (!config.showcalendar) return;

				if (config.locale && _jQuery2.default.datepicker.regional[config.locale]) {
					config = _jQuery2.default.extend(config, _jQuery2.default.datepicker.regional[config.locale], {});
				}

				if (config.min) config.minDate = _jQuery2.default.datepicker.parseDate('yy-mm-dd', config.min);
				if (config.max) config.maxDate = _jQuery2.default.datepicker.parseDate('yy-mm-dd', config.max);

				// Initialize and open a datepicker
				// live() doesn't have "onmatch", and jQuery.entwine is a bit too heavyweight for this, so we need to do this onclick.
				config.dateFormat = config.jquerydateformat;
				(0, _jQuery2.default)(this).datepicker(config);
			});
		}
	});

	(0, _jQuery2.default)(document).on("click", ".field.date input.text,input.text.date", function () {
		(0, _jQuery2.default)(this).ssDatepicker();

		if ((0, _jQuery2.default)(this).data('datepicker')) {
			(0, _jQuery2.default)(this).datepicker('show');
		}
	});
});