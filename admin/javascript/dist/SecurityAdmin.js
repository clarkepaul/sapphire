(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define('ss.SecurityAdmin', ['jQuery'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('jQuery'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.jQuery);
		global.ssSecurityAdmin = mod.exports;
	}
})(this, function (_jQuery) {
	'use strict';

	var _jQuery2 = _interopRequireDefault(_jQuery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var refreshAfterImport = function refreshAfterImport(e) {
		// Check for a message <div>, an indication that the form has been submitted.
		var existingFormMessage = (0, _jQuery2.default)((0, _jQuery2.default)(this).contents()).find('.message');
		if (existingFormMessage && existingFormMessage.html()) {
			// Refresh member listing
			var memberTableField = (0, _jQuery2.default)(window.parent.document).find('#Form_EditForm_Members').get(0);
			if (memberTableField) memberTableField.refresh();

			// Refresh tree
			var tree = (0, _jQuery2.default)(window.parent.document).find('.cms-tree').get(0);
			if (tree) tree.reload();
		}
	};

	/**
  * Refresh the member listing every time the import iframe is loaded,
  * which is most likely a form submission.
  */
	/**
  * File: SecurityAdmin.js
  */
	(0, _jQuery2.default)('#MemberImportFormIframe, #GroupImportFormIframe').entwine({
		onadd: function onadd() {
			this._super();
			// TODO entwine can't seem to bind to iframe load events
			(0, _jQuery2.default)(this).bind('load', refreshAfterImport);
		}
	});

	_jQuery2.default.entwine('ss', function ($) {
		/**
   * Class: #Permissions .checkbox[value=ADMIN]
   * 
   * Automatically check and disable all checkboxes if ADMIN permissions are selected.
   * As they're disabled, any changes won't be submitted (which is intended behaviour),
   * checking all boxes is purely presentational.
   */
		$('.permissioncheckboxset .checkbox[value=ADMIN]').entwine({
			onmatch: function onmatch() {
				this.toggleCheckboxes();

				this._super();
			},
			onunmatch: function onunmatch() {
				this._super();
			},
			/**
    * Function: onclick
    */
			onclick: function onclick(e) {
				this.toggleCheckboxes();
			},
			/**
    * Function: toggleCheckboxes
    */
			toggleCheckboxes: function toggleCheckboxes() {
				var self = this,
				    checkboxes = this.parents('.field:eq(0)').find('.checkbox').not(this);

				if (this.is(':checked')) {
					checkboxes.each(function () {
						$(this).data('SecurityAdmin.oldChecked', $(this).is(':checked'));
						$(this).data('SecurityAdmin.oldDisabled', $(this).is(':disabled'));
						$(this).prop('disabled', true);
						$(this).prop('checked', true);
					});
				} else {
					checkboxes.each(function () {
						$(this).prop('checked', $(this).data('SecurityAdmin.oldChecked'));
						$(this).prop('disabled', $(this).data('SecurityAdmin.oldDisabled'));
					});
				}
			}
		});
	});
});