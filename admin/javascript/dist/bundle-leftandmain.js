(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss', function ($) {
	$('.ss-tabset.ss-ui-action-tabset').entwine({
		IgnoreTabState: true,

		onadd: function onadd() {
			this._super();

			this.tabs({ 'collapsible': true, 'active': false });
		},

		onremove: function onremove() {
			var frame = $('.cms-container').find('iframe');
			frame.each(function (index, iframe) {
				$(iframe).contents().off('click.ss-ui-action-tabset');
			});
			$(document).off('click.ss-ui-action-tabset');

			this._super();
		},

		'ontabsbeforeactivate': function ontabsbeforeactivate(event, ui) {
			this.riseUp(event, ui);
		},

		onclick: function onclick(event, ui) {
			this.attachCloseHandler(event, ui);
		},

		attachCloseHandler: function attachCloseHandler(event, ui) {
			var that = this,
			    frame = $('.cms-container').find('iframe'),
			    _closeHandler;

			_closeHandler = function closeHandler(event) {
				var panel, frame;
				panel = $(event.target).closest('.ss-ui-action-tabset .ui-tabs-panel');

				if (!$(event.target).closest(that).length && !panel.length) {
					that.tabs('option', 'active', false);
					frame = $('.cms-container').find('iframe');
					frame.each(function (index, iframe) {
						$(iframe).contents().off('click.ss-ui-action-tabset', _closeHandler);
					});
					$(document).off('click.ss-ui-action-tabset', _closeHandler);
				}
			};

			$(document).on('click.ss-ui-action-tabset', _closeHandler);

			if (frame.length > 0) {
				frame.each(function (index, iframe) {
					$(iframe).contents().on('click.ss-ui-action-tabset', _closeHandler);
				});
			}
		},

		riseUp: function riseUp(event, ui) {
			var elHeight, trigger, endOfWindow, elPos, activePanel, activeTab, topPosition, containerSouth, padding;

			elHeight = $(this).find('.ui-tabs-panel').outerHeight();
			trigger = $(this).find('.ui-tabs-nav').outerHeight();
			endOfWindow = $(window).height() + $(document).scrollTop() - trigger;
			elPos = $(this).find('.ui-tabs-nav').offset().top;

			activePanel = ui.newPanel;
			activeTab = ui.newTab;

			if (elPos + elHeight >= endOfWindow && elPos - elHeight > 0) {
				this.addClass('rise-up');

				if (activeTab.position() !== null) {
					topPosition = -activePanel.outerHeight();
					containerSouth = activePanel.parents('.south');
					if (containerSouth) {
						padding = activeTab.offset().top - containerSouth.offset().top;
						topPosition = topPosition - padding;
					}
					$(activePanel).css('top', topPosition + "px");
				}
			} else {
				this.removeClass('rise-up');
				if (activeTab.position() !== null) {
					$(activePanel).css('top', '0px');
				}
			}
			return false;
		}
	});

	$('.cms-content-actions .ss-tabset.ss-ui-action-tabset').entwine({
		'ontabsbeforeactivate': function ontabsbeforeactivate(event, ui) {
			this._super(event, ui);

			if ($(ui.newPanel).length > 0) {
				$(ui.newPanel).css('left', ui.newTab.position().left + "px");
			}
		}
	});

	$('.cms-actions-row.ss-tabset.ss-ui-action-tabset').entwine({
		'ontabsbeforeactivate': function ontabsbeforeactivate(event, ui) {
			this._super(event, ui);

			$(this).closest('.ss-ui-action-tabset').removeClass('tabset-open tabset-open-last');
		}
	});

	$('.cms-content-fields .ss-tabset.ss-ui-action-tabset').entwine({
		'ontabsbeforeactivate': function ontabsbeforeactivate(event, ui) {
			this._super(event, ui);
			if ($(ui.newPanel).length > 0) {
				if ($(ui.newTab).hasClass("last")) {
					$(ui.newPanel).css({ 'left': 'auto', 'right': '0px' });

					$(ui.newPanel).parent().addClass('tabset-open-last');
				} else {
					$(ui.newPanel).css('left', ui.newTab.position().left + "px");

					if ($(ui.newTab).hasClass("first")) {
						$(ui.newPanel).css('left', "0px");
						$(ui.newPanel).parent().addClass('tabset-open');
					}
				}
			}
		}
	});

	$('.cms-tree-view-sidebar .cms-actions-row.ss-tabset.ss-ui-action-tabset').entwine({
		'from .ui-tabs-nav li': {
			onhover: function onhover(e) {
				$(e.target).parent().find('li .active').removeClass('active');
				$(e.target).find('a').addClass('active');
			}
		},

		'ontabsbeforeactivate': function ontabsbeforeactivate(event, ui) {
			this._super(event, ui);

			$(ui.newPanel).css({ 'left': 'auto', 'right': 'auto' });

			if ($(ui.newPanel).length > 0) {
				$(ui.newPanel).parent().addClass('tabset-open');
			}
		}
	});
});

},{"jQuery":"jQuery"}],2:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss.tree', function ($) {
	$('#Form_BatchActionsForm').entwine({
		Actions: [],

		getTree: function getTree() {
			return $('.cms-tree');
		},

		fromTree: {
			oncheck_node: function oncheck_node(e, data) {
				this.serializeFromTree();
			},
			onuncheck_node: function onuncheck_node(e, data) {
				this.serializeFromTree();
			}
		},

		registerDefault: function registerDefault() {
			this.register('admin/pages/batchactions/publish', function (ids) {
				var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_PUBLISH_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to publish?"), { 'num': ids.length }));
				return confirmed ? ids : false;
			});

			this.register('admin/pages/batchactions/unpublish', function (ids) {
				var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_UNPUBLISH_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to unpublish"), { 'num': ids.length }));
				return confirmed ? ids : false;
			});

			this.register('admin/pages/batchactions/delete', function (ids) {
				var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_DELETE_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to delete?"), { 'num': ids.length }));
				return confirmed ? ids : false;
			});

			this.register('admin/pages/batchactions/archive', function (ids) {
				var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_ARCHIVE_PROMPT", "You have {num} page(s) selected.\n\nAre you sure you want to archive these pages?\n\nThese pages and all of their children pages will be unpublished and sent to the archive."), { 'num': ids.length }));
				return confirmed ? ids : false;
			});

			this.register('admin/pages/batchactions/restore', function (ids) {
				var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_RESTORE_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to restore to stage?\n\nChildren of archived pages will be restored to the root level, unless those pages are also being restored."), { 'num': ids.length }));
				return confirmed ? ids : false;
			});

			this.register('admin/pages/batchactions/deletefromlive', function (ids) {
				var confirmed = confirm(_i18n2.default.inject(_i18n2.default._t("CMSMAIN.BATCH_DELETELIVE_PROMPT", "You have {num} page(s) selected.\n\nDo you really want to delete these pages from live?"), { 'num': ids.length }));
				return confirmed ? ids : false;
			});
		},

		onadd: function onadd() {
			this.registerDefault();
			this._super();
		},

		register: function register(type, callback) {
			this.trigger('register', { type: type, callback: callback });
			var actions = this.getActions();
			actions[type] = callback;
			this.setActions(actions);
		},

		unregister: function unregister(type) {
			this.trigger('unregister', { type: type });

			var actions = this.getActions();
			if (actions[type]) delete actions[type];
			this.setActions(actions);
		},

		refreshSelected: function refreshSelected(rootNode) {
			var self = this,
			    st = this.getTree(),
			    ids = this.getIDs(),
			    allIds = [],
			    viewMode = $('.cms-content-batchactions-button'),
			    actionUrl = this.find(':input[name=Action]').val();

			if (rootNode == null) rootNode = st;

			for (var idx in ids) {
				$($(st).getNodeByID(idx)).addClass('selected').attr('selected', 'selected');
			}

			if (!actionUrl || actionUrl == -1 || !viewMode.hasClass('active')) {
				$(rootNode).find('li').each(function () {
					$(this).setEnabled(true);
				});
				return;
			}

			$(rootNode).find('li').each(function () {
				allIds.push($(this).data('id'));
				$(this).addClass('treeloading').setEnabled(false);
			});

			var actionUrlParts = $.path.parseUrl(actionUrl);
			var applicablePagesUrl = actionUrlParts.hrefNoSearch + '/applicablepages/';
			applicablePagesUrl = $.path.addSearchParams(applicablePagesUrl, actionUrlParts.search);
			applicablePagesUrl = $.path.addSearchParams(applicablePagesUrl, { csvIDs: allIds.join(',') });
			jQuery.getJSON(applicablePagesUrl, function (applicableIDs) {
				jQuery(rootNode).find('li').each(function () {
					$(this).removeClass('treeloading');

					var id = $(this).data('id');
					if (id == 0 || $.inArray(id, applicableIDs) >= 0) {
						$(this).setEnabled(true);
					} else {
						$(this).removeClass('selected').setEnabled(false);
						$(this).prop('selected', false);
					}
				});

				self.serializeFromTree();
			});
		},

		serializeFromTree: function serializeFromTree() {
			var tree = this.getTree(),
			    ids = tree.getSelectedIDs();

			this.setIDs(ids);

			return true;
		},

		setIDs: function setIDs(ids) {
			this.find(':input[name=csvIDs]').val(ids ? ids.join(',') : null);
		},

		getIDs: function getIDs() {
			var value = this.find(':input[name=csvIDs]').val();
			return value ? value.split(',') : [];
		},

		onsubmit: function onsubmit(e) {
			var self = this,
			    ids = this.getIDs(),
			    tree = this.getTree(),
			    actions = this.getActions();

			if (!ids || !ids.length) {
				alert(_i18n2.default._t('CMSMAIN.SELECTONEPAGE', 'Please select at least one page'));
				e.preventDefault();
				return false;
			}

			var type = this.find(':input[name=Action]').val();
			if (actions[type]) {
				ids = this.getActions()[type].apply(this, [ids]);
			}

			if (!ids || !ids.length) {
				e.preventDefault();
				return false;
			}

			this.setIDs(ids);

			tree.find('li').removeClass('failed');

			var button = this.find(':submit:first');
			button.addClass('loading');

			jQuery.ajax({
				url: type,
				type: 'POST',
				data: this.serializeArray(),
				complete: function complete(xmlhttp, status) {
					button.removeClass('loading');

					tree.jstree('refresh', -1);
					self.setIDs([]);

					self.find(':input[name=Action]').val('').change();

					var msg = xmlhttp.getResponseHeader('X-Status');
					if (msg) statusMessage(decodeURIComponent(msg), status == 'success' ? 'good' : 'bad');
				},
				success: function success(data, status) {
					var id, node;

					if (data.modified) {
						var modifiedNodes = [];
						for (id in data.modified) {
							node = tree.getNodeByID(id);
							tree.jstree('set_text', node, data.modified[id]['TreeTitle']);
							modifiedNodes.push(node);
						}
						$(modifiedNodes).effect('highlight');
					}
					if (data.deleted) {
						for (id in data.deleted) {
							node = tree.getNodeByID(id);
							if (node.length) tree.jstree('delete_node', node);
						}
					}
					if (data.error) {
						for (id in data.error) {
							node = tree.getNodeByID(id);
							$(node).addClass('failed');
						}
					}
				},
				dataType: 'json'
			});

			e.preventDefault();
			return false;
		}

	});

	$('.cms-content-batchactions-button').entwine({
		onmatch: function onmatch() {
			this._super();
			this.updateTree();
		},
		onunmatch: function onunmatch() {
			this._super();
		},
		onclick: function onclick(e) {
			this.updateTree();
		},
		updateTree: function updateTree() {
			var tree = $('.cms-tree'),
			    form = $('#Form_BatchActionsForm');

			this._super();

			if (this.data('active')) {
				tree.addClass('multiple');
				tree.removeClass('draggable');
				form.serializeFromTree();
			} else {
				tree.removeClass('multiple');
				tree.addClass('draggable');
			}

			$('#Form_BatchActionsForm').refreshSelected();
		}
	});

	$('#Form_BatchActionsForm select[name=Action]').entwine({
		onchange: function onchange(e) {
			var form = $(e.target.form),
			    btn = form.find(':submit'),
			    selected = $(e.target).val();
			if (!selected || selected == -1) {
				btn.attr('disabled', 'disabled').button('refresh');
			} else {
				btn.removeAttr('disabled').button('refresh');
			}

			$('#Form_BatchActionsForm').refreshSelected();

			this.trigger("liszt:updated");

			this._super(e);
		}
	});
});

},{"i18n":"i18n","jQuery":"jQuery"}],3:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss', function ($) {
	$('.cms-content').entwine({

		onadd: function onadd() {
			var self = this;

			this.find('.cms-tabset').redrawTabs();
			this._super();
		},

		redraw: function redraw() {
			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));

			this.add(this.find('.cms-tabset')).redrawTabs();
			this.find('.cms-content-header').redraw();
			this.find('.cms-content-actions').redraw();
		}
	});

	$('.cms-content .cms-tree').entwine({
		onadd: function onadd() {
			var self = this;

			this._super();

			this.bind('select_node.jstree', function (e, data) {
				var node = data.rslt.obj,
				    loadedNodeID = self.find(':input[name=ID]').val(),
				    origEvent = data.args[2],
				    container = $('.cms-container');

				if (!origEvent) {
					return false;
				}

				if ($(node).hasClass('disabled')) return false;

				if ($(node).data('id') == loadedNodeID) return;

				var url = $(node).find('a:first').attr('href');
				if (url && url != '#') {
					url = url.split('?')[0];

					self.jstree('deselect_all');
					self.jstree('uncheck_all');

					if ($.path.isExternal($(node).find('a:first'))) url = url = $.path.makeUrlAbsolute(url, $('base').attr('href'));

					if (document.location.search) url = $.path.addSearchParams(url, document.location.search.replace(/^\?/, ''));

					container.loadPanel(url);
				} else {
					self.removeForm();
				}
			});
		}
	});

	$('.cms-content .cms-content-fields').entwine({
		redraw: function redraw() {
			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));
		}
	});

	$('.cms-content .cms-content-header, .cms-content .cms-content-actions').entwine({
		redraw: function redraw() {
			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));

			this.height('auto');
			this.height(this.innerHeight() - this.css('padding-top') - this.css('padding-bottom'));
		}
	});
});

},{"jQuery":"jQuery"}],4:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onbeforeunload = function (e) {
	var form = (0, _jQuery2.default)('.cms-edit-form');
	form.trigger('beforesubmitform');
	if (form.is('.changed') && !form.is('.discardchanges')) {
		return _i18n2.default._t('LeftAndMain.CONFIRMUNSAVEDSHORT');
	}
};

_jQuery2.default.entwine('ss', function ($) {
	$('.cms-edit-form').entwine({
		PlaceholderHtml: '',

		ChangeTrackerOptions: {
			ignoreFieldSelector: '.no-change-track, .ss-upload :input, .cms-navigator :input'
		},

		onadd: function onadd() {
			var self = this;

			this.attr("autocomplete", "off");

			this._setupChangeTracker();

			for (var overrideAttr in { 'action': true, 'method': true, 'enctype': true, 'name': true }) {
				var el = this.find(':input[name=' + '_form_' + overrideAttr + ']');
				if (el) {
					this.attr(overrideAttr, el.val());
					el.remove();
				}
			}

			if (this.hasClass('validationerror')) {
				var tabError = this.find('.message.validation, .message.required').first().closest('.tab');
				$('.cms-container').clearCurrentTabState();
				tabError.closest('.ss-tabset').tabs('option', 'active', tabError.index('.tab'));
			}

			this._super();
		},
		onremove: function onremove() {
			this.changetracker('destroy');
			this._super();
		},
		onmatch: function onmatch() {
			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		},
		redraw: function redraw() {
			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));

			this.add(this.find('.cms-tabset')).redrawTabs();
			this.find('.cms-content-header').redraw();
		},

		_setupChangeTracker: function _setupChangeTracker() {
			this.changetracker(this.getChangeTrackerOptions());
		},

		confirmUnsavedChanges: function confirmUnsavedChanges() {
			this.trigger('beforesubmitform');
			if (!this.is('.changed') || this.is('.discardchanges')) {
				return true;
			}
			var confirmed = confirm(_i18n2.default._t('LeftAndMain.CONFIRMUNSAVED'));
			if (confirmed) {
				this.addClass('discardchanges');
			}
			return confirmed;
		},

		onsubmit: function onsubmit(e, button) {
			if (this.prop("target") != "_blank") {
				if (button) this.closest('.cms-container').submitForm(this, button);
				return false;
			}
		},

		validate: function validate() {
			var isValid = true;
			this.trigger('validate', { isValid: isValid });

			return isValid;
		},

		'from .htmleditor': {
			oneditorinit: function oneditorinit(e) {
				var self = this,
				    field = $(e.target).closest('.field.htmleditor'),
				    editor = field.find('textarea.htmleditor').getEditor().getInstance();

				editor.onClick.add(function (e) {
					self.saveFieldFocus(field.attr('id'));
				});
			}
		},

		'from .cms-edit-form :input:not(:submit)': {
			onclick: function onclick(e) {
				this.saveFieldFocus($(e.target).attr('id'));
			},
			onfocus: function onfocus(e) {
				this.saveFieldFocus($(e.target).attr('id'));
			}
		},

		'from .cms-edit-form .treedropdown *': {
			onfocusin: function onfocusin(e) {
				var field = $(e.target).closest('.field.treedropdown');
				this.saveFieldFocus(field.attr('id'));
			}
		},

		'from .cms-edit-form .dropdown .chzn-container a': {
			onfocusin: function onfocusin(e) {
				var field = $(e.target).closest('.field.dropdown');
				this.saveFieldFocus(field.attr('id'));
			}
		},

		'from .cms-container': {
			ontabstaterestored: function ontabstaterestored(e) {
				this.restoreFieldFocus();
			}
		},

		saveFieldFocus: function saveFieldFocus(selected) {
			if (typeof window.sessionStorage == "undefined" || window.sessionStorage === null) return;

			var id = $(this).attr('id'),
			    focusElements = [];

			focusElements.push({
				id: id,
				selected: selected
			});

			if (focusElements) {
				try {
					window.sessionStorage.setItem(id, JSON.stringify(focusElements));
				} catch (err) {
					if (err.code === DOMException.QUOTA_EXCEEDED_ERR && window.sessionStorage.length === 0) {
						return;
					} else {
						throw err;
					}
				}
			}
		},

		restoreFieldFocus: function restoreFieldFocus() {
			if (typeof window.sessionStorage == "undefined" || window.sessionStorage === null) return;

			var self = this,
			    hasSessionStorage = typeof window.sessionStorage !== "undefined" && window.sessionStorage,
			    sessionData = hasSessionStorage ? window.sessionStorage.getItem(this.attr('id')) : null,
			    sessionStates = sessionData ? JSON.parse(sessionData) : false,
			    elementID,
			    tabbed = this.find('.ss-tabset').length !== 0,
			    activeTab,
			    elementTab,
			    toggleComposite,
			    scrollY;

			if (hasSessionStorage && sessionStates.length > 0) {
				$.each(sessionStates, function (i, sessionState) {
					if (self.is('#' + sessionState.id)) {
						elementID = $('#' + sessionState.selected);
					}
				});

				if ($(elementID).length < 1) {
					this.focusFirstInput();
					return;
				}

				activeTab = $(elementID).closest('.ss-tabset').find('.ui-tabs-nav .ui-tabs-active .ui-tabs-anchor').attr('id');
				elementTab = 'tab-' + $(elementID).closest('.ss-tabset .ui-tabs-panel').attr('id');

				if (tabbed && elementTab !== activeTab) {
					return;
				}

				toggleComposite = $(elementID).closest('.togglecomposite');

				if (toggleComposite.length > 0) {
					toggleComposite.accordion('activate', toggleComposite.find('.ui-accordion-header'));
				}

				scrollY = $(elementID).position().top;

				if (!$(elementID).is(':visible')) {
					elementID = '#' + $(elementID).closest('.field').attr('id');
					scrollY = $(elementID).position().top;
				}

				$(elementID).focus();

				if (scrollY > $(window).height() / 2) {
					self.find('.cms-content-fields').scrollTop(scrollY);
				}
			} else {
				this.focusFirstInput();
			}
		},

		focusFirstInput: function focusFirstInput() {
			this.find(':input:not(:submit)[data-skip-autofocus!="true"]').filter(':visible:first').focus();
		}
	});

	$('.cms-edit-form .Actions input.action[type=submit], .cms-edit-form .Actions button.action').entwine({
		onclick: function onclick(e) {
			if (this.hasClass('gridfield-button-delete') && !confirm(_i18n2.default._t('TABLEFIELD.DELETECONFIRMMESSAGE'))) {
				e.preventDefault();
				return false;
			}

			if (!this.is(':disabled')) {
				this.parents('form').trigger('submit', [this]);
			}
			e.preventDefault();
			return false;
		}
	});

	$('.cms-edit-form .Actions input.action[type=submit].ss-ui-action-cancel, .cms-edit-form .Actions button.action.ss-ui-action-cancel').entwine({
		onclick: function onclick(e) {
			if (History.getStateByIndex(1)) {
				History.back();
			} else {
				this.parents('form').trigger('submit', [this]);
			}
			e.preventDefault();
		}
	});

	$('.cms-edit-form .ss-tabset').entwine({
		onmatch: function onmatch() {
			if (!this.hasClass('ss-ui-action-tabset')) {
				var tabs = this.find("> ul:first");

				if (tabs.children("li").length == 1) {
					tabs.hide().parent().addClass("ss-tabset-tabshidden");
				}
			}

			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		}
	});
});

},{"i18n":"i18n","jQuery":"jQuery"}],5:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss', function ($) {

    $('.cms-description-toggle').entwine({
        onadd: function onadd() {
            var shown = false,
                fieldId = this.prop('id').substr(0, this.prop('id').indexOf('_Holder')),
                $trigger = this.find('.cms-description-trigger'),
                $description = this.find('.description');

            if (this.hasClass('description-toggle-enabled')) {
                return;
            }

            if ($trigger.length === 0) {
                $trigger = this.find('.middleColumn').first().after('<label class="right" for="' + fieldId + '"><a class="cms-description-trigger" href="javascript:void(0)"><span class="btn-icon-information"></span></a></label>').next();
            }

            this.addClass('description-toggle-enabled');

            $trigger.on('click', function () {
                $description[shown ? 'hide' : 'show']();
                shown = !shown;
            });

            $description.hide();
        }
    });
});

},{"jQuery":"jQuery"}],6:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss', function ($) {
	$(".cms .field.cms-description-tooltip").entwine({
		onmatch: function onmatch() {
			this._super();

			var descriptionEl = this.find('.description'),
			    inputEl,
			    tooltipEl;
			if (descriptionEl.length) {
				this.attr('title', descriptionEl.text()).tooltip({ content: descriptionEl.html() });
				descriptionEl.remove();
			}
		}
	});

	$(".cms .field.cms-description-tooltip :input").entwine({
		onfocusin: function onfocusin(e) {
			this.closest('.field').tooltip('open');
		},
		onfocusout: function onfocusout(e) {
			this.closest('.field').tooltip('close');
		}
	});
});

},{"jQuery":"jQuery"}],7:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.fn.layout.defaults.resize = false;

jLayout = typeof jLayout === 'undefined' ? {} : jLayout;

jLayout.threeColumnCompressor = function (spec, options) {
	if (typeof spec.menu === 'undefined' || typeof spec.content === 'undefined' || typeof spec.preview === 'undefined') {
		throw 'Spec is invalid. Please provide "menu", "content" and "preview" elements.';
	}
	if (typeof options.minContentWidth === 'undefined' || typeof options.minPreviewWidth === 'undefined' || typeof options.mode === 'undefined') {
		throw 'Spec is invalid. Please provide "minContentWidth", "minPreviewWidth", "mode"';
	}
	if (options.mode !== 'split' && options.mode !== 'content' && options.mode !== 'preview') {
		throw 'Spec is invalid. "mode" should be either "split", "content" or "preview"';
	}

	var obj = {
		options: options
	};

	var menu = _jQuery2.default.jLayoutWrap(spec.menu),
	    content = _jQuery2.default.jLayoutWrap(spec.content),
	    preview = _jQuery2.default.jLayoutWrap(spec.preview);

	obj.layout = function (container) {
		var size = container.bounds(),
		    insets = container.insets(),
		    top = insets.top,
		    bottom = size.height - insets.bottom,
		    left = insets.left,
		    right = size.width - insets.right;

		var menuWidth = spec.menu.width(),
		    contentWidth = 0,
		    previewWidth = 0;

		if (this.options.mode === 'preview') {
			contentWidth = 0;
			previewWidth = right - left - menuWidth;
		} else if (this.options.mode === 'content') {
			contentWidth = right - left - menuWidth;
			previewWidth = 0;
		} else {
			contentWidth = (right - left - menuWidth) / 2;
			previewWidth = right - left - (menuWidth + contentWidth);

			if (contentWidth < this.options.minContentWidth) {
				contentWidth = this.options.minContentWidth;
				previewWidth = right - left - (menuWidth + contentWidth);
			} else if (previewWidth < this.options.minPreviewWidth) {
				previewWidth = this.options.minPreviewWidth;
				contentWidth = right - left - (menuWidth + previewWidth);
			}

			if (contentWidth < this.options.minContentWidth || previewWidth < this.options.minPreviewWidth) {
				contentWidth = right - left - menuWidth;
				previewWidth = 0;
			}
		}

		var prehidden = {
			content: spec.content.hasClass('column-hidden'),
			preview: spec.preview.hasClass('column-hidden')
		};

		var posthidden = {
			content: contentWidth === 0,
			preview: previewWidth === 0
		};

		spec.content.toggleClass('column-hidden', posthidden.content);
		spec.preview.toggleClass('column-hidden', posthidden.preview);

		menu.bounds({ 'x': left, 'y': top, 'height': bottom - top, 'width': menuWidth });
		menu.doLayout();

		left += menuWidth;

		content.bounds({ 'x': left, 'y': top, 'height': bottom - top, 'width': contentWidth });
		if (!posthidden.content) content.doLayout();

		left += contentWidth;

		preview.bounds({ 'x': left, 'y': top, 'height': bottom - top, 'width': previewWidth });
		if (!posthidden.preview) preview.doLayout();

		if (posthidden.content !== prehidden.content) spec.content.trigger('columnvisibilitychanged');
		if (posthidden.preview !== prehidden.preview) spec.preview.trigger('columnvisibilitychanged');

		if (contentWidth + previewWidth < options.minContentWidth + options.minPreviewWidth) {
			spec.preview.trigger('disable');
		} else {
			spec.preview.trigger('enable');
		}

		return container;
	};

	function typeLayout(type) {
		var func = type + 'Size';

		return function (container) {
			var menuSize = menu[func](),
			    contentSize = content[func](),
			    previewSize = preview[func](),
			    insets = container.insets();

			width = menuSize.width + contentSize.width + previewSize.width;
			height = Math.max(menuSize.height, contentSize.height, previewSize.height);

			return {
				'width': insets.left + insets.right + width,
				'height': insets.top + insets.bottom + height
			};
		};
	}

	obj.preferred = typeLayout('preferred');
	obj.minimum = typeLayout('minimum');
	obj.maximum = typeLayout('maximum');

	return obj;
};

},{"jQuery":"jQuery"}],8:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss', function ($) {
	$('.cms-panel.cms-menu').entwine({
		togglePanel: function togglePanel(doExpand, silent, doSaveState) {
			$('.cms-menu-list').children('li').each(function () {
				if (doExpand) {
					$(this).children('ul').each(function () {
						$(this).removeClass('collapsed-flyout');
						if ($(this).data('collapse')) {
							$(this).removeData('collapse');
							$(this).addClass('collapse');
						}
					});
				} else {
					$(this).children('ul').each(function () {
						$(this).addClass('collapsed-flyout');
						$(this).hasClass('collapse');
						$(this).removeClass('collapse');
						$(this).data('collapse', true);
					});
				}
			});

			this.toggleFlyoutState(doExpand);

			this._super(doExpand, silent, doSaveState);
		},
		toggleFlyoutState: function toggleFlyoutState(bool) {
			if (bool) {
				$('.collapsed').find('li').show();

				$('.cms-menu-list').find('.child-flyout-indicator').hide();
			} else {
				$('.collapsed-flyout').find('li').each(function () {
					$(this).hide();
				});

				var par = $('.cms-menu-list ul.collapsed-flyout').parent();
				if (par.children('.child-flyout-indicator').length === 0) par.append('<span class="child-flyout-indicator"></span>').fadeIn();
				par.children('.child-flyout-indicator').fadeIn();
			}
		},
		siteTreePresent: function siteTreePresent() {
			return $('#cms-content-tools-CMSMain').length > 0;
		},

		getPersistedStickyState: function getPersistedStickyState() {
			var persistedState, cookieValue;

			if ($.cookie !== void 0) {
				cookieValue = $.cookie('cms-menu-sticky');

				if (cookieValue !== void 0 && cookieValue !== null) {
					persistedState = cookieValue === 'true';
				}
			}

			return persistedState;
		},

		setPersistedStickyState: function setPersistedStickyState(isSticky) {
			if ($.cookie !== void 0) {
				$.cookie('cms-menu-sticky', isSticky, { path: '/', expires: 31 });
			}
		},

		getEvaluatedCollapsedState: function getEvaluatedCollapsedState() {
			var shouldCollapse,
			    manualState = this.getPersistedCollapsedState(),
			    menuIsSticky = $('.cms-menu').getPersistedStickyState(),
			    automaticState = this.siteTreePresent();

			if (manualState === void 0) {
				shouldCollapse = automaticState;
			} else if (manualState !== automaticState && menuIsSticky) {
				shouldCollapse = manualState;
			} else {
				shouldCollapse = automaticState;
			}

			return shouldCollapse;
		},

		onadd: function onadd() {
			var self = this;

			setTimeout(function () {
				self.togglePanel(!self.getEvaluatedCollapsedState(), false, false);
			}, 0);

			$(window).on('ajaxComplete', function (e) {
				setTimeout(function () {
					self.togglePanel(!self.getEvaluatedCollapsedState(), false, false);
				}, 0);
			});

			this._super();
		}
	});

	$('.cms-menu-list').entwine({
		onmatch: function onmatch() {
			var self = this;

			this.find('li.current').select();

			this.updateItems();

			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		},

		updateMenuFromResponse: function updateMenuFromResponse(xhr) {
			var controller = xhr.getResponseHeader('X-Controller');
			if (controller) {
				var item = this.find('li#Menu-' + controller.replace(/\\/g, '-').replace(/[^a-zA-Z0-9\-_:.]+/, ''));
				if (!item.hasClass('current')) item.select();
			}
			this.updateItems();
		},

		'from .cms-container': {
			onafterstatechange: function onafterstatechange(e, data) {
				this.updateMenuFromResponse(data.xhr);
			},
			onaftersubmitform: function onaftersubmitform(e, data) {
				this.updateMenuFromResponse(data.xhr);
			}
		},

		'from .cms-edit-form': {
			onrelodeditform: function onrelodeditform(e, data) {
				this.updateMenuFromResponse(data.xmlhttp);
			}
		},

		getContainingPanel: function getContainingPanel() {
			return this.closest('.cms-panel');
		},

		fromContainingPanel: {
			ontoggle: function ontoggle(e) {
				this.toggleClass('collapsed', $(e.target).hasClass('collapsed'));
				$(window).resize();
				if (this.hasClass('collapsed')) this.find('li.children.opened').removeClass('opened');

				if (!this.hasClass('collapsed')) {
					$('.toggle-children.opened').closest('li').addClass('opened');
				}
			}
		},

		updateItems: function updateItems() {
			var editPageItem = this.find('#Menu-CMSMain');

			editPageItem[editPageItem.is('.current') ? 'show' : 'hide']();

			var currentID = $('.cms-content input[name=ID]').val();
			if (currentID) {
				this.find('li').each(function () {
					if ($.isFunction($(this).setRecordID)) $(this).setRecordID(currentID);
				});
			}
		}
	});

	$('.cms-menu-list li').entwine({
		toggleFlyout: function toggleFlyout(bool) {
			var fly = $(this);

			if (fly.children('ul').first().hasClass('collapsed-flyout')) {
				if (bool) {
					if (!fly.children('ul').first().children('li').first().hasClass('clone')) {

						var li = fly.clone();
						li.addClass('clone').css({});

						li.children('ul').first().remove();

						li.find('span').not('.text').remove();

						li.find('a').first().unbind('click');

						fly.children('ul').prepend(li);
					}

					$('.collapsed-flyout').show();
					fly.addClass('opened');
					fly.children('ul').find('li').fadeIn('fast');
				} else {
					if (li) {
						li.remove();
					}
					$('.collapsed-flyout').hide();
					fly.removeClass('opened');
					fly.find('toggle-children').removeClass('opened');
					fly.children('ul').find('li').hide();
				}
			}
		}
	});

	$('.cms-menu-list li').hoverIntent(function () {
		$(this).toggleFlyout(true);
	}, function () {
		$(this).toggleFlyout(false);
	});

	$('.cms-menu-list .toggle').entwine({
		onclick: function onclick(e) {
			e.preventDefault();
			$(this).toogleFlyout(true);
		}
	});

	$('.cms-menu-list li').entwine({
		onmatch: function onmatch() {
			if (this.find('ul').length) {
				this.find('a:first').append('<span class="toggle-children"><span class="toggle-children-icon"></span></span>');
			}
			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		},
		toggle: function toggle() {
			this[this.hasClass('opened') ? 'close' : 'open']();
		},

		open: function open() {
			var parent = this.getMenuItem();
			if (parent) parent.open();
			if (this.find('li.clone')) {
				this.find('li.clone').remove();
			}
			this.addClass('opened').find('ul').show();
			this.find('.toggle-children').addClass('opened');
		},
		close: function close() {
			this.removeClass('opened').find('ul').hide();
			this.find('.toggle-children').removeClass('opened');
		},
		select: function select() {
			var parent = this.getMenuItem();
			this.addClass('current').open();

			this.siblings().removeClass('current').close();
			this.siblings().find('li').removeClass('current');
			if (parent) {
				var parentSiblings = parent.siblings();
				parent.addClass('current');
				parentSiblings.removeClass('current').close();
				parentSiblings.find('li').removeClass('current').close();
			}

			this.getMenu().updateItems();

			this.trigger('select');
		}
	});

	$('.cms-menu-list *').entwine({
		getMenu: function getMenu() {
			return this.parents('.cms-menu-list:first');
		}
	});

	$('.cms-menu-list li *').entwine({
		getMenuItem: function getMenuItem() {
			return this.parents('li:first');
		}
	});

	$('.cms-menu-list li a').entwine({
		onclick: function onclick(e) {
			var isExternal = $.path.isExternal(this.attr('href'));
			if (e.which > 1 || isExternal) return;

			if (this.attr('target') == "_blank") {
				return;
			}

			e.preventDefault();

			var item = this.getMenuItem();

			var url = this.attr('href');
			if (!isExternal) url = $('base').attr('href') + url;

			var children = item.find('li');
			if (children.length) {
				children.first().find('a').click();
			} else {
				if (!$('.cms-container').loadPanel(url)) return false;
			}

			item.select();
		}
	});

	$('.cms-menu-list li .toggle-children').entwine({
		onclick: function onclick(e) {
			var li = this.closest('li');
			li.toggle();
			return false;
		}
	});

	$('.cms .profile-link').entwine({
		onclick: function onclick() {
			$('.cms-container').loadPanel(this.attr('href'));
			$('.cms-menu-list li').removeClass('current').close();
			return false;
		}
	});

	$('.cms-menu .sticky-toggle').entwine({

		onadd: function onadd() {
			var isSticky = $('.cms-menu').getPersistedStickyState() ? true : false;

			this.toggleCSS(isSticky);
			this.toggleIndicator(isSticky);

			this._super();
		},

		toggleCSS: function toggleCSS(isSticky) {
			this[isSticky ? 'addClass' : 'removeClass']('active');
		},

		toggleIndicator: function toggleIndicator(isSticky) {
			this.next('.sticky-status-indicator').text(isSticky ? 'fixed' : 'auto');
		},

		onclick: function onclick() {
			var $menu = this.closest('.cms-menu'),
			    persistedCollapsedState = $menu.getPersistedCollapsedState(),
			    persistedStickyState = $menu.getPersistedStickyState(),
			    newStickyState = persistedStickyState === void 0 ? !this.hasClass('active') : !persistedStickyState;

			if (persistedCollapsedState === void 0) {
				$menu.setPersistedCollapsedState($menu.hasClass('collapsed'));
			} else if (persistedCollapsedState !== void 0 && newStickyState === false) {
				$menu.clearPersistedCollapsedState();
			}

			$menu.setPersistedStickyState(newStickyState);

			this.toggleCSS(newStickyState);
			this.toggleIndicator(newStickyState);

			this._super();
		}
	});
});

},{"jQuery":"jQuery"}],9:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss', function ($) {
	$.entwine.warningLevel = $.entwine.WARN_LEVEL_BESTPRACTISE;

	$('.cms-panel').entwine({

		WidthExpanded: null,

		WidthCollapsed: null,

		canSetCookie: function canSetCookie() {
			return $.cookie !== void 0 && this.attr('id') !== void 0;
		},

		getPersistedCollapsedState: function getPersistedCollapsedState() {
			var isCollapsed, cookieValue;

			if (this.canSetCookie()) {
				cookieValue = $.cookie('cms-panel-collapsed-' + this.attr('id'));

				if (cookieValue !== void 0 && cookieValue !== null) {
					isCollapsed = cookieValue === 'true';
				}
			}

			return isCollapsed;
		},

		setPersistedCollapsedState: function setPersistedCollapsedState(newState) {
			if (this.canSetCookie()) {
				$.cookie('cms-panel-collapsed-' + this.attr('id'), newState, { path: '/', expires: 31 });
			}
		},

		clearPersistedCollapsedState: function clearPersistedCollapsedState() {
			if (this.canSetCookie()) {
				$.cookie('cms-panel-collapsed-' + this.attr('id'), '', { path: '/', expires: -1 });
			}
		},

		getInitialCollapsedState: function getInitialCollapsedState() {
			var isCollapsed = this.getPersistedCollapsedState();

			if (isCollapsed === void 0) {
				isCollapsed = this.hasClass('collapsed');
			}

			return isCollapsed;
		},

		onadd: function onadd() {
			var collapsedContent, container;

			if (!this.find('.cms-panel-content').length) throw new Exception('Content panel for ".cms-panel" not found');

			if (!this.find('.cms-panel-toggle').length) {
				container = $("<div class='cms-panel-toggle south'></div>").append('<a class="toggle-expand" href="#"><span>&raquo;</span></a>').append('<a class="toggle-collapse" href="#"><span>&laquo;</span></a>');

				this.append(container);
			}

			this.setWidthExpanded(this.find('.cms-panel-content').innerWidth());

			collapsedContent = this.find('.cms-panel-content-collapsed');
			this.setWidthCollapsed(collapsedContent.length ? collapsedContent.innerWidth() : this.find('.toggle-expand').innerWidth());

			this.togglePanel(!this.getInitialCollapsedState(), true, false);

			this._super();
		},

		togglePanel: function togglePanel(doExpand, silent, doSaveState) {
			var newWidth, collapsedContent;

			if (!silent) {
				this.trigger('beforetoggle.sspanel', doExpand);
				this.trigger(doExpand ? 'beforeexpand' : 'beforecollapse');
			}

			this.toggleClass('collapsed', !doExpand);
			newWidth = doExpand ? this.getWidthExpanded() : this.getWidthCollapsed();

			this.width(newWidth);
			collapsedContent = this.find('.cms-panel-content-collapsed');
			if (collapsedContent.length) {
				this.find('.cms-panel-content')[doExpand ? 'show' : 'hide']();
				this.find('.cms-panel-content-collapsed')[doExpand ? 'hide' : 'show']();
			}

			if (doSaveState !== false) {
				this.setPersistedCollapsedState(!doExpand);
			}

			this.trigger('toggle', doExpand);
			this.trigger(doExpand ? 'expand' : 'collapse');
		},

		expandPanel: function expandPanel(force) {
			if (!force && !this.hasClass('collapsed')) return;

			this.togglePanel(true);
		},

		collapsePanel: function collapsePanel(force) {
			if (!force && this.hasClass('collapsed')) return;

			this.togglePanel(false);
		}
	});

	$('.cms-panel.collapsed .cms-panel-toggle').entwine({
		onclick: function onclick(e) {
			this.expandPanel();
			e.preventDefault();
		}
	});

	$('.cms-panel *').entwine({
		getPanel: function getPanel() {
			return this.parents('.cms-panel:first');
		}
	});

	$('.cms-panel .toggle-expand').entwine({
		onclick: function onclick(e) {
			e.preventDefault();
			e.stopPropagation();

			this.getPanel().expandPanel();

			this._super(e);
		}
	});

	$('.cms-panel .toggle-collapse').entwine({
		onclick: function onclick(e) {
			e.preventDefault();
			e.stopPropagation();

			this.getPanel().collapsePanel();

			this._super(e);
		}
	});

	$('.cms-content-tools.collapsed').entwine({
		onclick: function onclick(e) {
			this.expandPanel();
			this._super(e);
		}
	});
});

},{"jQuery":"jQuery"}],10:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss.preview', function ($) {
	$('.cms-preview').entwine({
		AllowedStates: ['StageLink', 'LiveLink', 'ArchiveLink'],

		CurrentStateName: null,

		CurrentSizeName: 'auto',

		IsPreviewEnabled: false,

		DefaultMode: 'split',

		Sizes: {
			auto: {
				width: '100%',
				height: '100%'
			},
			mobile: {
				width: '335px',
				height: '568px'
			},
			mobileLandscape: {
				width: '583px',
				height: '320px'
			},
			tablet: {
				width: '783px',
				height: '1024px'
			},
			tabletLandscape: {
				width: '1039px',
				height: '768px'
			},
			desktop: {
				width: '1024px',
				height: '800px'
			}
		},

		changeState: function changeState(stateName, save) {
			var self = this,
			    states = this._getNavigatorStates();
			if (save !== false) {
				$.each(states, function (index, state) {
					self.saveState('state', stateName);
				});
			}

			this.setCurrentStateName(stateName);
			this._loadCurrentState();
			this.redraw();

			return this;
		},

		changeMode: function changeMode(modeName, save) {
			var container = $('.cms-container');

			if (modeName == 'split') {
				container.entwine('.ss').splitViewMode();
				this.setIsPreviewEnabled(true);
				this._loadCurrentState();
			} else if (modeName == 'content') {
				container.entwine('.ss').contentViewMode();
				this.setIsPreviewEnabled(false);
			} else if (modeName == 'preview') {
					container.entwine('.ss').previewMode();
					this.setIsPreviewEnabled(true);
					this._loadCurrentState();
				} else {
					throw 'Invalid mode: ' + modeName;
				}

			if (save !== false) this.saveState('mode', modeName);

			this.redraw();

			return this;
		},

		changeSize: function changeSize(sizeName) {
			var sizes = this.getSizes();

			this.setCurrentSizeName(sizeName);
			this.removeClass('auto desktop tablet mobile').addClass(sizeName);
			this.find('.preview-device-outer').width(sizes[sizeName].width).height(sizes[sizeName].height);
			this.find('.preview-device-inner').width(sizes[sizeName].width);

			this.saveState('size', sizeName);

			this.redraw();

			return this;
		},

		redraw: function redraw() {

			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));

			var currentStateName = this.getCurrentStateName();
			if (currentStateName) {
				this.find('.cms-preview-states').changeVisibleState(currentStateName);
			}

			var layoutOptions = $('.cms-container').entwine('.ss').getLayoutOptions();
			if (layoutOptions) {
				$('.preview-mode-selector').changeVisibleMode(layoutOptions.mode);
			}

			var currentSizeName = this.getCurrentSizeName();
			if (currentSizeName) {
				this.find('.preview-size-selector').changeVisibleSize(this.getCurrentSizeName());
			}

			return this;
		},

		saveState: function saveState(name, value) {
			if (this._supportsLocalStorage()) window.localStorage.setItem('cms-preview-state-' + name, value);
		},

		loadState: function loadState(name) {
			if (this._supportsLocalStorage()) return window.localStorage.getItem('cms-preview-state-' + name);
		},

		disablePreview: function disablePreview() {
			this.setPendingURL(null);
			this._loadUrl('about:blank');
			this._block();
			this.changeMode('content', false);
			this.setIsPreviewEnabled(false);
			return this;
		},

		enablePreview: function enablePreview() {
			if (!this.getIsPreviewEnabled()) {
				this.setIsPreviewEnabled(true);

				if ($.browser.msie && $.browser.version.slice(0, 3) <= 7) {
					this.changeMode('content');
				} else {
					this.changeMode(this.getDefaultMode(), false);
				}
			}
			return this;
		},

		getOrAppendFontFixStyleElement: function getOrAppendFontFixStyleElement() {
			var style = $('#FontFixStyleElement');
			if (!style.length) {
				style = $('<style type="text/css" id="FontFixStyleElement" disabled="disabled">' + ':before,:after{content:none !important}' + '</style>').appendTo('head');
			}

			return style;
		},

		onadd: function onadd() {
			var self = this,
			    layoutContainer = this.parent(),
			    iframe = this.find('iframe');

			iframe.addClass('center');
			iframe.bind('load', function () {
				self._adjustIframeForPreview();

				self._loadCurrentPage();

				$(this).removeClass('loading');
			});

			if ($.browser.msie && 8 === parseInt($.browser.version, 10)) {
				iframe.bind('readystatechange', function (e) {
					if (iframe[0].readyState == 'interactive') {
						self.getOrAppendFontFixStyleElement().removeAttr('disabled');
						setTimeout(function () {
							self.getOrAppendFontFixStyleElement().attr('disabled', 'disabled');
						}, 0);
					}
				});
			}

			this.append('<div class="cms-preview-overlay ui-widget-overlay-light"></div>');
			this.find('.cms-preview-overlay').hide();

			this.disablePreview();

			this._super();
		},

		_supportsLocalStorage: function _supportsLocalStorage() {
			var uid = new Date();
			var storage;
			var result;
			try {
				(storage = window.localStorage).setItem(uid, uid);
				result = storage.getItem(uid) == uid;
				storage.removeItem(uid);
				return result && storage;
			} catch (exception) {
				console.warn('localStorge is not available due to current browser / system settings.');
			}
		},

		onenable: function onenable() {
			var $viewModeSelector = $('.preview-mode-selector');

			$viewModeSelector.removeClass('split-disabled');
			$viewModeSelector.find('.disabled-tooltip').hide();
		},

		ondisable: function ondisable() {
			var $viewModeSelector = $('.preview-mode-selector');

			$viewModeSelector.addClass('split-disabled');
			$viewModeSelector.find('.disabled-tooltip').show();
		},

		_block: function _block() {
			this.addClass('blocked');
			this.find('.cms-preview-overlay').show();
			return this;
		},

		_unblock: function _unblock() {
			this.removeClass('blocked');
			this.find('.cms-preview-overlay').hide();
			return this;
		},

		_initialiseFromContent: function _initialiseFromContent() {
			var mode, size;

			if (!$('.cms-previewable').length) {
				this.disablePreview();
			} else {
				mode = this.loadState('mode');
				size = this.loadState('size');

				this._moveNavigator();
				if (!mode || mode != 'content') {
					this.enablePreview();
					this._loadCurrentState();
				}
				this.redraw();

				if (mode) this.changeMode(mode);
				if (size) this.changeSize(size);
			}
			return this;
		},

		'from .cms-container': {
			onafterstatechange: function onafterstatechange(e, data) {
				if (data.xhr.getResponseHeader('X-ControllerURL')) return;

				this._initialiseFromContent();
			}
		},

		PendingURL: null,

		oncolumnvisibilitychanged: function oncolumnvisibilitychanged() {
			var url = this.getPendingURL();
			if (url && !this.is('.column-hidden')) {
				this.setPendingURL(null);
				this._loadUrl(url);
				this._unblock();
			}
		},

		'from .cms-container .cms-edit-form': {
			onaftersubmitform: function onaftersubmitform() {
				this._initialiseFromContent();
			}
		},

		_loadUrl: function _loadUrl(url) {
			this.find('iframe').addClass('loading').attr('src', url);
			return this;
		},

		_getNavigatorStates: function _getNavigatorStates() {
			var urlMap = $.map(this.getAllowedStates(), function (name) {
				var stateLink = $('.cms-preview-states .state-name[data-name=' + name + ']');
				if (stateLink.length) {
					return {
						name: name,
						url: stateLink.attr('data-link'),
						active: stateLink.is(':radio') ? stateLink.is(':checked') : stateLink.is(':selected')
					};
				} else {
					return null;
				}
			});

			return urlMap;
		},

		_loadCurrentState: function _loadCurrentState() {
			if (!this.getIsPreviewEnabled()) return this;

			var states = this._getNavigatorStates();
			var currentStateName = this.getCurrentStateName();
			var currentState = null;

			if (states) {
				currentState = $.grep(states, function (state, index) {
					return currentStateName === state.name || !currentStateName && state.active;
				});
			}

			var url = null;

			if (currentState[0]) {
				url = currentState[0].url;
			} else if (states.length) {
				this.setCurrentStateName(states[0].name);
				url = states[0].url;
			} else {
				this.setCurrentStateName(null);
			}

			url += (url.indexOf('?') === -1 ? '?' : '&') + 'CMSPreview=1';

			if (this.is('.column-hidden')) {
				this.setPendingURL(url);
				this._loadUrl('about:blank');
				this._block();
			} else {
				this.setPendingURL(null);

				if (url) {
					this._loadUrl(url);
					this._unblock();
				} else {
					this._block();
				}
			}

			return this;
		},

		_moveNavigator: function _moveNavigator() {
			var previewEl = $('.cms-preview .cms-preview-controls');
			var navigatorEl = $('.cms-edit-form .cms-navigator');

			if (navigatorEl.length && previewEl.length) {
				previewEl.html($('.cms-edit-form .cms-navigator').detach());
			} else {
				this._block();
			}
		},

		_loadCurrentPage: function _loadCurrentPage() {
			if (!this.getIsPreviewEnabled()) return;

			var doc = this.find('iframe')[0].contentDocument,
			    containerEl = $('.cms-container');

			var id = $(doc).find('meta[name=x-page-id]').attr('content');
			var editLink = $(doc).find('meta[name=x-cms-edit-link]').attr('content');
			var contentPanel = $('.cms-content');

			if (id && contentPanel.find(':input[name=ID]').val() != id) {
				if (window.History.enabled) $('.cms-container').entwine('.ss').loadPanel(editLink);
			}
		},

		_adjustIframeForPreview: function _adjustIframeForPreview() {
			var iframe = this.find('iframe')[0];
			if (iframe) {
				var doc = iframe.contentDocument;
			} else {
				return;
			}

			if (!doc) return;

			var links = doc.getElementsByTagName('A');
			for (var i = 0; i < links.length; i++) {
				var href = links[i].getAttribute('href');
				if (!href) continue;

				if (href.match(/^http:\/\//)) links[i].setAttribute('target', '_blank');
			}

			var navi = doc.getElementById('SilverStripeNavigator');
			if (navi) navi.style.display = 'none';
			var naviMsg = doc.getElementById('SilverStripeNavigatorMessage');
			if (naviMsg) naviMsg.style.display = 'none';

			this.trigger('afterIframeAdjustedForPreview', [doc]);
		}
	});

	$('.cms-edit-form').entwine({
		onadd: function onadd() {
			this._super();
			$('.cms-preview')._initialiseFromContent();
		}
	});

	$('.cms-preview-states').entwine({
		changeVisibleState: function changeVisibleState(state) {
			this.find('input[data-name="' + state + '"]').prop('checked', true);
		}
	});

	$('.cms-preview-states .state-name').entwine({
		onclick: function onclick(e) {
			this.parent().find('.active').removeClass('active');
			this.next('label').addClass('active');

			var targetStateName = $(this).attr('data-name');

			$('.cms-preview').changeState(targetStateName);
		}
	});

	$('.preview-mode-selector').entwine({
		changeVisibleMode: function changeVisibleMode(mode) {
			this.find('select').val(mode).trigger('liszt:updated')._addIcon();
		}
	});

	$('.preview-mode-selector select').entwine({
		onchange: function onchange(e) {
			this._super(e);
			e.preventDefault();

			var targetStateName = $(this).val();
			$('.cms-preview').changeMode(targetStateName);
		}
	});

	$('.preview-mode-selector .chzn-results li').entwine({
		onclick: function onclick(e) {
			if ($.browser.msie) {
				e.preventDefault();
				var index = this.index();
				var targetStateName = this.closest('.preview-mode-selector').find('select option:eq(' + index + ')').val();

				$('.cms-preview').changeMode(targetStateName);
			}
		}
	});

	$('.cms-preview.column-hidden').entwine({
		onmatch: function onmatch() {
			$('#preview-mode-dropdown-in-content').show();

			if ($('.cms-preview .result-selected').hasClass('font-icon-columns')) {
				statusMessage(_i18n2.default._t('LeftAndMain.DISABLESPLITVIEW', "Screen too small to show site preview in split mode"), "error");
			}
			this._super();
		},

		onunmatch: function onunmatch() {
			$('#preview-mode-dropdown-in-content').hide();
			this._super();
		}
	});

	$('#preview-mode-dropdown-in-content').entwine({
		onmatch: function onmatch() {
			if ($('.cms-preview').is('.column-hidden')) {
				this.show();
			} else {
				this.hide();
			}
			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		}
	});

	$('.preview-size-selector').entwine({
		changeVisibleSize: function changeVisibleSize(size) {
			this.find('select').val(size).trigger('liszt:updated')._addIcon();
		}
	});

	$('.preview-size-selector select').entwine({
		onchange: function onchange(e) {
			e.preventDefault();

			var targetSizeName = $(this).val();
			$('.cms-preview').changeSize(targetSizeName);
		}
	});

	$('.preview-selector select.preview-dropdown').entwine({
		'onliszt:showing_dropdown': function onlisztShowing_dropdown() {
			this.siblings().find('.chzn-drop').addClass('open')._alignRight();
		},

		'onliszt:hiding_dropdown': function onlisztHiding_dropdown() {
			this.siblings().find('.chzn-drop').removeClass('open')._removeRightAlign();
		},

		'onliszt:ready': function onlisztReady() {
			this._super();
			this._addIcon();
		},

		_addIcon: function _addIcon() {
			var selected = this.find(':selected');
			var iconClass = selected.attr('data-icon');

			var target = this.parent().find('.chzn-container a.chzn-single');
			var oldIcon = target.attr('data-icon');
			if (typeof oldIcon !== 'undefined') {
				target.removeClass(oldIcon);
			}
			target.addClass(iconClass);
			target.attr('data-icon', iconClass);

			return this;
		}
	});

	$('.preview-selector .chzn-drop').entwine({
		_alignRight: function _alignRight() {
			var that = this;
			$(this).hide();

			setTimeout(function () {
				$(that).css({ left: 'auto', right: 0 });
				$(that).show();
			}, 100);
		},
		_removeRightAlign: function _removeRightAlign() {
			$(this).css({ right: 'auto' });
		}

	});

	$('.preview-mode-selector .chzn-drop li:last-child').entwine({
		onmatch: function onmatch() {
			if ($('.preview-mode-selector').hasClass('split-disabled')) {
				this.parent().append('<div class="disabled-tooltip"></div>');
			} else {
				this.parent().append('<div class="disabled-tooltip" style="display: none;"></div>');
			}
		}
	});

	$('.preview-scroll').entwine({
		ToolbarSize: 53,

		_redraw: function _redraw() {
			var toolbarSize = this.getToolbarSize();

			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));
			var previewHeight = this.height() - toolbarSize;
			this.height(previewHeight);
		},

		onmatch: function onmatch() {
			this._redraw();
			this._super();
		},

		onunmatch: function onunmatch() {
			this._super();
		}
	});

	$('.preview-device-outer').entwine({
		onclick: function onclick() {
			this.toggleClass('rotate');
		}
	});
});

},{"i18n":"i18n","jQuery":"jQuery"}],11:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss.tree', function ($) {

	$('.cms-tree').entwine({

		Hints: null,

		IsUpdatingTree: false,

		IsLoaded: false,

		onadd: function onadd() {
			this._super();

			if ($.isNumeric(this.data('jstree_instance_id'))) return;

			var hints = this.attr('data-hints');
			if (hints) this.setHints($.parseJSON(hints));

			var self = this;
			this.jstree(this.getTreeConfig()).bind('loaded.jstree', function (e, data) {
				self.setIsLoaded(true);

				data.inst._set_settings({ 'html_data': { 'ajax': {
							'url': self.data('urlTree'),
							'data': function data(node) {
								var params = self.data('searchparams') || [];

								params = $.grep(params, function (n, i) {
									return n.name != 'ID' && n.name != 'value';
								});
								params.push({ name: 'ID', value: $(node).data("id") ? $(node).data("id") : 0 });
								params.push({ name: 'ajax', value: 1 });
								return params;
							}
						} } });

				self.updateFromEditForm();
				self.css('visibility', 'visible');

				data.inst.hide_checkboxes();
			}).bind('before.jstree', function (e, data) {
				if (data.func == 'start_drag') {
					if (!self.hasClass('draggable') || self.hasClass('multiselect')) {
						e.stopImmediatePropagation();
						return false;
					}
				}

				if ($.inArray(data.func, ['check_node', 'uncheck_node'])) {
					var node = $(data.args[0]).parents('li:first');
					var allowedChildren = node.find('li:not(.disabled)');

					if (node.hasClass('disabled') && allowedChildren == 0) {
						e.stopImmediatePropagation();
						return false;
					}
				}
			}).bind('move_node.jstree', function (e, data) {
				if (self.getIsUpdatingTree()) return;

				var movedNode = data.rslt.o,
				    newParentNode = data.rslt.np,
				    oldParentNode = data.inst._get_parent(movedNode),
				    newParentID = $(newParentNode).data('id') || 0,
				    nodeID = $(movedNode).data('id');
				var siblingIDs = $.map($(movedNode).siblings().andSelf(), function (el) {
					return $(el).data('id');
				});

				$.ajax({
					'url': self.data('urlSavetreenode'),
					'type': 'POST',
					'data': {
						ID: nodeID,
						ParentID: newParentID,
						SiblingIDs: siblingIDs
					},
					success: function success() {
						if ($('.cms-edit-form :input[name=ID]').val() == nodeID) {
							$('.cms-edit-form :input[name=ParentID]').val(newParentID);
						}
						self.updateNodesFromServer([nodeID]);
					},
					statusCode: {
						403: function _() {
							$.jstree.rollback(data.rlbk);
						}
					}
				});
			}).bind('select_node.jstree check_node.jstree uncheck_node.jstree', function (e, data) {
				$(document).triggerHandler(e, data);
			});
		},
		onremove: function onremove() {
			this.jstree('destroy');
			this._super();
		},

		'from .cms-container': {
			onafterstatechange: function onafterstatechange(e) {
				this.updateFromEditForm();
			}
		},

		'from .cms-container form': {
			onaftersubmitform: function onaftersubmitform(e) {
				var id = $('.cms-edit-form :input[name=ID]').val();

				this.updateNodesFromServer([id]);
			}
		},

		getTreeConfig: function getTreeConfig() {
			var self = this;
			return {
				'core': {
					'initially_open': ['record-0'],
					'animation': 0,
					'html_titles': true
				},
				'html_data': {},
				'ui': {
					"select_limit": 1,
					'initially_select': [this.find('.current').attr('id')]
				},
				"crrm": {
					'move': {
						'check_move': function check_move(data) {
							var movedNode = $(data.o),
							    newParent = $(data.np),
							    isMovedOntoContainer = data.ot.get_container()[0] == data.np[0],
							    movedNodeClass = movedNode.getClassname(),
							    newParentClass = newParent.getClassname(),
							    hints = self.getHints(),
							    disallowedChildren = [],
							    hintKey = newParentClass ? newParentClass : 'Root',
							    hint = hints && typeof hints[hintKey] != 'undefined' ? hints[hintKey] : null;

							if (hint && movedNode.attr('class').match(/VirtualPage-([^\s]*)/)) movedNodeClass = RegExp.$1;

							if (hint) disallowedChildren = typeof hint.disallowedChildren != 'undefined' ? hint.disallowedChildren : [];
							var isAllowed = movedNode.data('id') !== 0 && !movedNode.hasClass('status-archived') && (!isMovedOntoContainer || data.p == 'inside') && !newParent.hasClass('nochildren') && (!disallowedChildren.length || $.inArray(movedNodeClass, disallowedChildren) == -1);

							return isAllowed;
						}
					}
				},
				'dnd': {
					"drop_target": false,
					"drag_target": false
				},
				'checkbox': {
					'two_state': true
				},
				'themes': {
					'theme': 'apple',
					'url': $('body').data('frameworkpath') + '/thirdparty/jstree/themes/apple/style.css'
				},

				'plugins': ['html_data', 'ui', 'dnd', 'crrm', 'themes', 'checkbox']
			};
		},

		search: function search(params, callback) {
			if (params) this.data('searchparams', params);else this.removeData('searchparams');
			this.jstree('refresh', -1, callback);
		},

		getNodeByID: function getNodeByID(id) {
			return this.find('*[data-id=' + id + ']');
		},

		createNode: function createNode(html, data, callback) {
			var self = this,
			    parentNode = data.ParentID !== void 0 ? self.getNodeByID(data.ParentID) : false,
			    newNode = $(html);

			var properties = { data: '' };
			if (newNode.hasClass('jstree-open')) {
				properties.state = 'open';
			} else if (newNode.hasClass('jstree-closed')) {
				properties.state = 'closed';
			}
			this.jstree('create_node', parentNode.length ? parentNode : -1, 'last', properties, function (node) {
				var origClasses = node.attr('class');

				for (var i = 0; i < newNode[0].attributes.length; i++) {
					var attr = newNode[0].attributes[i];
					node.attr(attr.name, attr.value);
				}

				node.addClass(origClasses).html(newNode.html());
				callback(node);
			});
		},

		updateNode: function updateNode(node, html, data) {
			var self = this,
			    newNode = $(html),
			    origClasses = node.attr('class');

			var nextNode = data.NextID ? this.getNodeByID(data.NextID) : false;
			var prevNode = data.PrevID ? this.getNodeByID(data.PrevID) : false;
			var parentNode = data.ParentID ? this.getNodeByID(data.ParentID) : false;

			$.each(['id', 'style', 'class', 'data-pagetype'], function (i, attrName) {
				node.attr(attrName, newNode.attr(attrName));
			});

			origClasses = origClasses.replace(/status-[^\s]*/, '');

			var origChildren = node.children('ul').detach();
			node.addClass(origClasses).html(newNode.html()).append(origChildren);

			if (nextNode && nextNode.length) {
				this.jstree('move_node', node, nextNode, 'before');
			} else if (prevNode && prevNode.length) {
				this.jstree('move_node', node, prevNode, 'after');
			} else {
				this.jstree('move_node', node, parentNode.length ? parentNode : -1);
			}
		},

		updateFromEditForm: function updateFromEditForm() {
			var node,
			    id = $('.cms-edit-form :input[name=ID]').val();
			if (id) {
				node = this.getNodeByID(id);
				if (node.length) {
					this.jstree('deselect_all');
					this.jstree('select_node', node);
				} else {
					this.updateNodesFromServer([id]);
				}
			} else {
				this.jstree('deselect_all');
			}
		},

		updateNodesFromServer: function updateNodesFromServer(ids) {
			if (this.getIsUpdatingTree() || !this.getIsLoaded()) return;

			var self = this,
			    i,
			    includesNewNode = false;
			this.setIsUpdatingTree(true);
			self.jstree('save_selected');

			var correctStateFn = function correctStateFn(node) {
				self.getNodeByID(node.data('id')).not(node).remove();

				self.jstree('deselect_all');
				self.jstree('select_node', node);
			};

			self.jstree('open_node', this.getNodeByID(0));
			self.jstree('save_opened');
			self.jstree('save_selected');

			$.ajax({
				url: $.path.addSearchParams(this.data('urlUpdatetreenodes'), 'ids=' + ids.join(',')),
				dataType: 'json',
				success: function success(data, xhr) {
					$.each(data, function (nodeId, nodeData) {
						var node = self.getNodeByID(nodeId);

						if (!nodeData) {
							self.jstree('delete_node', node);
							return;
						}

						if (node.length) {
							self.updateNode(node, nodeData.html, nodeData);
							setTimeout(function () {
								correctStateFn(node);
							}, 500);
						} else {
							includesNewNode = true;

							if (nodeData.ParentID && !self.find('li[data-id=' + nodeData.ParentID + ']').length) {
								self.jstree('load_node', -1, function () {
									newNode = self.find('li[data-id=' + nodeId + ']');
									correctStateFn(newNode);
								});
							} else {
								self.createNode(nodeData.html, nodeData, function (newNode) {
									correctStateFn(newNode);
								});
							}
						}
					});

					if (!includesNewNode) {
						self.jstree('deselect_all');
						self.jstree('reselect');
						self.jstree('reopen');
					}
				},
				complete: function complete() {
					self.setIsUpdatingTree(false);
				}
			});
		}

	});

	$('.cms-tree.multiple').entwine({
		onmatch: function onmatch() {
			this._super();
			this.jstree('show_checkboxes');
		},
		onunmatch: function onunmatch() {
			this._super();
			this.jstree('uncheck_all');
			this.jstree('hide_checkboxes');
		},

		getSelectedIDs: function getSelectedIDs() {
			return $(this).jstree('get_checked').not('.disabled').map(function () {
				return $(this).data('id');
			}).get();
		}
	});

	$('.cms-tree li').entwine({
		setEnabled: function setEnabled(bool) {
			this.toggleClass('disabled', !bool);
		},

		getClassname: function getClassname() {
			var matches = this.attr('class').match(/class-([^\s]*)/i);
			return matches ? matches[1] : '';
		},

		getID: function getID() {
			return this.data('id');
		}
	});
});

},{"jQuery":"jQuery"}],12:[function(require,module,exports){
'use strict';

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.entwine('ss', function ($) {
	$('.TreeDropdownField').entwine({
		'from .cms-container form': {
			onaftersubmitform: function onaftersubmitform(e) {
				this.find('.tree-holder').empty();
				this._super();
			}
		}
	});
});

},{"jQuery":"jQuery"}],13:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jQuery2.default.noConflict();

window.ss = window.ss || {};

var windowWidth, windowHeight;

window.ss.debounce = function (func, wait, immediate) {
	var timeout, context, args;

	var later = function later() {
		timeout = null;
		if (!immediate) func.apply(context, args);
	};

	return function () {
		var callNow = immediate && !timeout;

		context = this;
		args = arguments;

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
};

(0, _jQuery2.default)(window).bind('resize.leftandmain', function (e) {
	var cb = function cb() {
		(0, _jQuery2.default)('.cms-container').trigger('windowresize');
	};

	if (_jQuery2.default.browser.msie && parseInt(_jQuery2.default.browser.version, 10) < 9) {
		var newWindowWidth = (0, _jQuery2.default)(window).width(),
		    newWindowHeight = (0, _jQuery2.default)(window).height();
		if (newWindowWidth != windowWidth || newWindowHeight != windowHeight) {
			windowWidth = newWindowWidth;
			windowHeight = newWindowHeight;
			cb();
		}
	} else {
		cb();
	}
});

_jQuery2.default.entwine.warningLevel = _jQuery2.default.entwine.WARN_LEVEL_BESTPRACTISE;
_jQuery2.default.entwine('ss', function ($) {
	$(window).on("message", function (e) {
		var target,
		    event = e.originalEvent,
		    data = _typeof(event.data) === 'object' ? event.data : JSON.parse(event.data);

		if ($.path.parseUrl(window.location.href).domain !== $.path.parseUrl(event.origin).domain) return;

		target = typeof data.target === 'undefined' ? $(window) : $(data.target);

		switch (data.type) {
			case 'event':
				target.trigger(data.event, data.data);
				break;
			case 'callback':
				target[data.callback].call(target, data.data);
				break;
		}
	});

	var positionLoadingSpinner = function positionLoadingSpinner() {
		var offset = 120;
		var spinner = $('.ss-loading-screen .loading-animation');
		var top = ($(window).height() - spinner.height()) / 2;
		spinner.css('top', top + offset);
		spinner.show();
	};

	var applyChosen = function applyChosen(el) {
		if (el.is(':visible')) {
			el.addClass('has-chzn').chosen({
				allow_single_deselect: true,
				disable_search_threshold: 20
			});

			var title = el.prop('title');

			if (title) {
				el.siblings('.chzn-container').prop('title', title);
			}
		} else {
			setTimeout(function () {
				el.show();
				applyChosen(el);
			}, 500);
		}
	};

	var isSameUrl = function isSameUrl(url1, url2) {
		var baseUrl = $('base').attr('href');
		url1 = $.path.isAbsoluteUrl(url1) ? url1 : $.path.makeUrlAbsolute(url1, baseUrl), url2 = $.path.isAbsoluteUrl(url2) ? url2 : $.path.makeUrlAbsolute(url2, baseUrl);
		var url1parts = $.path.parseUrl(url1),
		    url2parts = $.path.parseUrl(url2);
		return url1parts.pathname.replace(/\/*$/, '') == url2parts.pathname.replace(/\/*$/, '') && url1parts.search == url2parts.search;
	};

	var ajaxCompleteEvent = window.ss.debounce(function () {
		$(window).trigger('ajaxComplete');
	}, 1000, true);

	$(window).bind('resize', positionLoadingSpinner).trigger('resize');

	$(document).ajaxComplete(function (e, xhr, settings) {
		if (window.History.enabled) {
			var url = xhr.getResponseHeader('X-ControllerURL'),
			    origUrl = History.getPageUrl().replace(/\/$/, ''),
			    destUrl = settings.url,
			    opts;

			if (url !== null && (!isSameUrl(origUrl, url) || !isSameUrl(destUrl, url))) {
				opts = {
					id: new Date().getTime() + String(Math.random()).replace(/\D/g, ''),
					pjax: xhr.getResponseHeader('X-Pjax') ? xhr.getResponseHeader('X-Pjax') : settings.headers['X-Pjax']
				};
				window.History.pushState(opts, '', url);
			}
		}

		var msg = xhr.getResponseHeader('X-Status') ? xhr.getResponseHeader('X-Status') : xhr.statusText,
		    reathenticate = xhr.getResponseHeader('X-Reauthenticate'),
		    msgType = xhr.status < 200 || xhr.status > 399 ? 'bad' : 'good',
		    ignoredMessages = ['OK'];

		if (reathenticate) {
			$('.cms-container').showLoginDialog();
			return;
		}

		if (xhr.status !== 0 && msg && $.inArray(msg, ignoredMessages)) {
			statusMessage(decodeURIComponent(msg), msgType);
		}

		ajaxCompleteEvent(this);
	});

	$('.cms-container').entwine({
		StateChangeXHR: null,

		FragmentXHR: {},

		StateChangeCount: 0,

		LayoutOptions: {
			minContentWidth: 940,
			minPreviewWidth: 400,
			mode: 'content'
		},

		onadd: function onadd() {
			var self = this;

			if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
				$('.ss-loading-screen').append('<p class="ss-loading-incompat-warning"><span class="notice">' + 'Your browser is not compatible with the CMS interface. Please use Internet Explorer 8+, Google Chrome or Mozilla Firefox.' + '</span></p>').css('z-index', $('.ss-loading-screen').css('z-index') + 1);
				$('.loading-animation').remove();

				this._super();
				return;
			}

			this.redraw();

			$('.ss-loading-screen').hide();
			$('body').removeClass('loading');
			$(window).unbind('resize', positionLoadingSpinner);
			this.restoreTabState();
			this._super();
		},

		fromWindow: {
			onstatechange: function onstatechange(e) {
				this.handleStateChange(e);
			}
		},

		'onwindowresize': function onwindowresize() {
			this.redraw();
		},

		'from .cms-panel': {
			ontoggle: function ontoggle() {
				this.redraw();
			}
		},

		'from .cms-container': {
			onaftersubmitform: function onaftersubmitform() {
				this.redraw();
			}
		},

		'from .cms-menu-list li a': {
			onclick: function onclick(e) {
				var href = $(e.target).attr('href');
				if (e.which > 1 || href == this._tabStateUrl()) return;
				this.splitViewMode();
			}
		},

		updateLayoutOptions: function updateLayoutOptions(newSpec) {
			var spec = this.getLayoutOptions();

			var dirty = false;

			for (var k in newSpec) {
				if (spec[k] !== newSpec[k]) {
					spec[k] = newSpec[k];
					dirty = true;
				}
			}

			if (dirty) this.redraw();
		},

		splitViewMode: function splitViewMode() {
			this.updateLayoutOptions({
				mode: 'split'
			});
		},

		contentViewMode: function contentViewMode() {
			this.updateLayoutOptions({
				mode: 'content'
			});
		},

		previewMode: function previewMode() {
			this.updateLayoutOptions({
				mode: 'preview'
			});
		},

		RedrawSuppression: false,

		redraw: function redraw() {
			if (this.getRedrawSuppression()) return;

			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));

			this.data('jlayout', jLayout.threeColumnCompressor({
				menu: this.children('.cms-menu'),
				content: this.children('.cms-content'),
				preview: this.children('.cms-preview')
			}, this.getLayoutOptions()));

			this.layout();

			this.find('.cms-panel-layout').redraw();
			this.find('.cms-content-fields[data-layout-type]').redraw();
			this.find('.cms-edit-form[data-layout-type]').redraw();
			this.find('.cms-preview').redraw();
			this.find('.cms-content').redraw();
		},

		checkCanNavigate: function checkCanNavigate(selectors) {
			var contentEls = this._findFragments(selectors || ['Content']),
			    trackedEls = contentEls.find(':data(changetracker)').add(contentEls.filter(':data(changetracker)')),
			    safe = true;

			if (!trackedEls.length) {
				return true;
			}

			trackedEls.each(function () {
				if (!$(this).confirmUnsavedChanges()) {
					safe = false;
				}
			});

			return safe;
		},

		loadPanel: function loadPanel(url, title, data, forceReload, forceReferer) {
			if (!data) data = {};
			if (!title) title = "";
			if (!forceReferer) forceReferer = History.getState().url;

			if (!this.checkCanNavigate(data.pjax ? data.pjax.split(',') : ['Content'])) {
				return;
			}

			this.saveTabState();

			if (window.History.enabled) {
				$.extend(data, { __forceReferer: forceReferer });

				if (forceReload) {
					$.extend(data, { __forceReload: Math.random() });
					window.History.replaceState(data, title, url);
				} else {
					window.History.pushState(data, title, url);
				}
			} else {
				window.location = $.path.makeUrlAbsolute(url, $('base').attr('href'));
			}
		},

		reloadCurrentPanel: function reloadCurrentPanel() {
			this.loadPanel(window.History.getState().url, null, null, true);
		},

		submitForm: function submitForm(form, button, callback, ajaxOptions) {
			var self = this;

			if (!button) button = this.find('.Actions :submit[name=action_save]');

			if (!button) button = this.find('.Actions :submit:first');

			form.trigger('beforesubmitform');
			this.trigger('submitform', { form: form, button: button });

			$(button).addClass('loading');

			var validationResult = form.validate();
			if (typeof validationResult !== 'undefined' && !validationResult) {
				statusMessage("Validation failed.", "bad");

				$(button).removeClass('loading');

				return false;
			}

			var formData = form.serializeArray();

			formData.push({ name: $(button).attr('name'), value: '1' });

			formData.push({ name: 'BackURL', value: History.getPageUrl().replace(/\/$/, '') });

			this.saveTabState();

			jQuery.ajax(jQuery.extend({
				headers: { "X-Pjax": "CurrentForm,Breadcrumbs" },
				url: form.attr('action'),
				data: formData,
				type: 'POST',
				complete: function complete() {
					$(button).removeClass('loading');
				},
				success: function success(data, status, xhr) {
					form.removeClass('changed');
					if (callback) callback(data, status, xhr);

					var newContentEls = self.handleAjaxResponse(data, status, xhr);
					if (!newContentEls) return;

					newContentEls.filter('form').trigger('aftersubmitform', { status: status, xhr: xhr, formData: formData });
				}
			}, ajaxOptions));

			return false;
		},

		LastState: null,

		PauseState: false,

		handleStateChange: function handleStateChange() {
			if (this.getPauseState()) {
				return;
			}

			if (this.getStateChangeXHR()) this.getStateChangeXHR().abort();

			var self = this,
			    h = window.History,
			    state = h.getState(),
			    fragments = state.data.pjax || 'Content',
			    headers = {},
			    fragmentsArr = fragments.split(','),
			    contentEls = this._findFragments(fragmentsArr);

			this.setStateChangeCount(this.getStateChangeCount() + 1);
			var isLegacyIE = $.browser.msie && parseInt($.browser.version, 10) < 9;
			if (isLegacyIE && this.getStateChangeCount() > 20) {
				document.location.href = state.url;
				return;
			}

			if (!this.checkCanNavigate()) {
				if (h.emulated.pushState) {
					return;
				}

				var lastState = this.getLastState();

				this.setPauseState(true);

				if (lastState) {
					h.pushState(lastState.id, lastState.title, lastState.url);
				} else {
					h.back();
				}
				this.setPauseState(false);

				return;
			}
			this.setLastState(state);

			if (contentEls.length < fragmentsArr.length) {
				fragments = 'Content', fragmentsArr = ['Content'];
				contentEls = this._findFragments(fragmentsArr);
			}

			this.trigger('beforestatechange', { state: state, element: contentEls });

			headers['X-Pjax'] = fragments;

			if (typeof state.data.__forceReferer !== 'undefined') {
				var url = state.data.__forceReferer;

				try {
					url = decodeURI(url);
				} catch (e) {} finally {
					headers['X-Backurl'] = encodeURI(url);
				}
			}

			contentEls.addClass('loading');
			var xhr = $.ajax({
				headers: headers,
				url: state.url,
				complete: function complete() {
					self.setStateChangeXHR(null);

					contentEls.removeClass('loading');
				},
				success: function success(data, status, xhr) {
					var els = self.handleAjaxResponse(data, status, xhr, state);
					self.trigger('afterstatechange', { data: data, status: status, xhr: xhr, element: els, state: state });
				}
			});

			this.setStateChangeXHR(xhr);
		},

		loadFragment: function loadFragment(url, pjaxFragments) {

			var self = this,
			    xhr,
			    headers = {},
			    baseUrl = $('base').attr('href'),
			    fragmentXHR = this.getFragmentXHR();

			if (typeof fragmentXHR[pjaxFragments] !== 'undefined' && fragmentXHR[pjaxFragments] !== null) {
				fragmentXHR[pjaxFragments].abort();
				fragmentXHR[pjaxFragments] = null;
			}

			url = $.path.isAbsoluteUrl(url) ? url : $.path.makeUrlAbsolute(url, baseUrl);
			headers['X-Pjax'] = pjaxFragments;

			xhr = $.ajax({
				headers: headers,
				url: url,
				success: function success(data, status, xhr) {
					var elements = self.handleAjaxResponse(data, status, xhr, null);

					self.trigger('afterloadfragment', { data: data, status: status, xhr: xhr, elements: elements });
				},
				error: function error(xhr, status, _error) {
					self.trigger('loadfragmenterror', { xhr: xhr, status: status, error: _error });
				},
				complete: function complete() {
					var fragmentXHR = self.getFragmentXHR();
					if (typeof fragmentXHR[pjaxFragments] !== 'undefined' && fragmentXHR[pjaxFragments] !== null) {
						fragmentXHR[pjaxFragments] = null;
					}
				}
			});

			fragmentXHR[pjaxFragments] = xhr;

			return xhr;
		},

		handleAjaxResponse: function handleAjaxResponse(data, status, xhr, state) {
			var self = this,
			    url,
			    selectedTabs,
			    guessFragment,
			    fragment,
			    $data;

			if (xhr.getResponseHeader('X-Reload') && xhr.getResponseHeader('X-ControllerURL')) {
				var baseUrl = $('base').attr('href'),
				    rawURL = xhr.getResponseHeader('X-ControllerURL'),
				    url = $.path.isAbsoluteUrl(rawURL) ? rawURL : $.path.makeUrlAbsolute(rawURL, baseUrl);

				document.location.href = url;
				return;
			}

			if (!data) return;

			var title = xhr.getResponseHeader('X-Title');
			if (title) document.title = decodeURIComponent(title.replace(/\+/g, ' '));

			var newFragments = {},
			    newContentEls;

			if (xhr.getResponseHeader('Content-Type').match(/^((text)|(application))\/json[ \t]*;?/i)) {
				newFragments = data;
			} else {
				fragment = document.createDocumentFragment();

				jQuery.clean([data], document, fragment, []);
				$data = $(jQuery.merge([], fragment.childNodes));

				guessFragment = 'Content';
				if ($data.is('form') && !$data.is('[data-pjax-fragment~=Content]')) guessFragment = 'CurrentForm';

				newFragments[guessFragment] = $data;
			}

			this.setRedrawSuppression(true);
			try {
				$.each(newFragments, function (newFragment, html) {
					var contentEl = $('[data-pjax-fragment]').filter(function () {
						return $.inArray(newFragment, $(this).data('pjaxFragment').split(' ')) != -1;
					}),
					    newContentEl = $(html);

					if (newContentEls) newContentEls.add(newContentEl);else newContentEls = newContentEl;

					if (newContentEl.find('.cms-container').length) {
						throw 'Content loaded via ajax is not allowed to contain tags matching the ".cms-container" selector to avoid infinite loops';
					}

					var origStyle = contentEl.attr('style');
					var origParent = contentEl.parent();
					var origParentLayoutApplied = typeof origParent.data('jlayout') !== 'undefined';
					var layoutClasses = ['east', 'west', 'center', 'north', 'south', 'column-hidden'];
					var elemClasses = contentEl.attr('class');
					var origLayoutClasses = [];
					if (elemClasses) {
						origLayoutClasses = $.grep(elemClasses.split(' '), function (val) {
							return $.inArray(val, layoutClasses) >= 0;
						});
					}

					newContentEl.removeClass(layoutClasses.join(' ')).addClass(origLayoutClasses.join(' '));
					if (origStyle) newContentEl.attr('style', origStyle);

					var styles = newContentEl.find('style').detach();
					if (styles.length) $(document).find('head').append(styles);

					contentEl.replaceWith(newContentEl);

					if (!origParent.is('.cms-container') && origParentLayoutApplied) {
						origParent.layout();
					}
				});

				var newForm = newContentEls.filter('form');
				if (newForm.hasClass('cms-tabset')) newForm.removeClass('cms-tabset').addClass('cms-tabset');
			} finally {
				this.setRedrawSuppression(false);
			}

			this.redraw();
			this.restoreTabState(state && typeof state.data.tabState !== 'undefined' ? state.data.tabState : null);

			return newContentEls;
		},

		_findFragments: function _findFragments(fragments) {
			return $('[data-pjax-fragment]').filter(function () {
				var i,
				    nodeFragments = $(this).data('pjaxFragment').split(' ');
				for (i in fragments) {
					if ($.inArray(fragments[i], nodeFragments) != -1) return true;
				}
				return false;
			});
		},

		refresh: function refresh() {
			$(window).trigger('statechange');

			$(this).redraw();
		},

		saveTabState: function saveTabState() {
			if (typeof window.sessionStorage == "undefined" || window.sessionStorage === null) return;

			var selectedTabs = [],
			    url = this._tabStateUrl();
			this.find('.cms-tabset,.ss-tabset').each(function (i, el) {
				var id = $(el).attr('id');
				if (!id) return;
				if (!$(el).data('tabs')) return;
				if ($(el).data('ignoreTabState') || $(el).getIgnoreTabState()) return;

				selectedTabs.push({ id: id, selected: $(el).tabs('option', 'selected') });
			});

			if (selectedTabs) {
				var tabsUrl = 'tabs-' + url;
				try {
					window.sessionStorage.setItem(tabsUrl, JSON.stringify(selectedTabs));
				} catch (err) {
					if (err.code === DOMException.QUOTA_EXCEEDED_ERR && window.sessionStorage.length === 0) {
						return;
					} else {
						throw err;
					}
				}
			}
		},

		restoreTabState: function restoreTabState(overrideStates) {
			var self = this,
			    url = this._tabStateUrl(),
			    hasSessionStorage = typeof window.sessionStorage !== "undefined" && window.sessionStorage,
			    sessionData = hasSessionStorage ? window.sessionStorage.getItem('tabs-' + url) : null,
			    sessionStates = sessionData ? JSON.parse(sessionData) : false;

			this.find('.cms-tabset, .ss-tabset').each(function () {
				var index,
				    tabset = $(this),
				    tabsetId = tabset.attr('id'),
				    tab,
				    forcedTab = tabset.find('.ss-tabs-force-active');

				if (!tabset.data('tabs')) {
					return;
				}

				tabset.tabs('refresh');

				if (forcedTab.length) {
					index = forcedTab.index();
				} else if (overrideStates && overrideStates[tabsetId]) {
					tab = tabset.find(overrideStates[tabsetId].tabSelector);
					if (tab.length) {
						index = tab.index();
					}
				} else if (sessionStates) {
					$.each(sessionStates, function (i, sessionState) {
						if (tabset.is('#' + sessionState.id)) {
							index = sessionState.selected;
						}
					});
				}
				if (index !== null) {
					tabset.tabs('option', 'active', index);
					self.trigger('tabstaterestored');
				}
			});
		},

		clearTabState: function clearTabState(url) {
			if (typeof window.sessionStorage == "undefined") return;

			var s = window.sessionStorage;
			if (url) {
				s.removeItem('tabs-' + url);
			} else {
				for (var i = 0; i < s.length; i++) {
					if (s.key(i).match(/^tabs-/)) s.removeItem(s.key(i));
				}
			}
		},

		clearCurrentTabState: function clearCurrentTabState() {
			this.clearTabState(this._tabStateUrl());
		},

		_tabStateUrl: function _tabStateUrl() {
			return History.getState().url.replace(/\?.*/, '').replace(/#.*/, '').replace($('base').attr('href'), '');
		},

		showLoginDialog: function showLoginDialog() {
			var tempid = $('body').data('member-tempid'),
			    dialog = $('.leftandmain-logindialog'),
			    url = 'CMSSecurity/login';

			if (dialog.length) dialog.remove();

			url = $.path.addSearchParams(url, {
				'tempid': tempid,
				'BackURL': window.location.href
			});

			dialog = $('<div class="leftandmain-logindialog"></div>');
			dialog.attr('id', new Date().getTime());
			dialog.data('url', url);
			$('body').append(dialog);
		}
	});

	$('.leftandmain-logindialog').entwine({
		onmatch: function onmatch() {
			this._super();

			this.ssdialog({
				iframeUrl: this.data('url'),
				dialogClass: "leftandmain-logindialog-dialog",
				autoOpen: true,
				minWidth: 500,
				maxWidth: 500,
				minHeight: 370,
				maxHeight: 400,
				closeOnEscape: false,
				open: function open() {
					$('.ui-widget-overlay').addClass('leftandmain-logindialog-overlay');
				},
				close: function close() {
					$('.ui-widget-overlay').removeClass('leftandmain-logindialog-overlay');
				}
			});
		},
		onunmatch: function onunmatch() {
			this._super();
		},
		open: function open() {
			this.ssdialog('open');
		},
		close: function close() {
			this.ssdialog('close');
		},
		toggle: function toggle(bool) {
			if (this.is(':visible')) this.close();else this.open();
		},

		reauthenticate: function reauthenticate(data) {
			if (typeof data.SecurityID !== 'undefined') {
				$(':input[name=SecurityID]').val(data.SecurityID);
			}

			if (typeof data.TempID !== 'undefined') {
				$('body').data('member-tempid', data.TempID);
			}
			this.close();
		}
	});

	$('form.loading,.cms-content.loading,.cms-content-fields.loading,.cms-content-view.loading').entwine({
		onmatch: function onmatch() {
			this.append('<div class="cms-content-loading-overlay ui-widget-overlay-light"></div><div class="cms-content-loading-spinner"></div>');
			this._super();
		},
		onunmatch: function onunmatch() {
			this.find('.cms-content-loading-overlay,.cms-content-loading-spinner').remove();
			this._super();
		}
	});

	$('.cms input[type="submit"], .cms button, .cms input[type="reset"], .cms .ss-ui-button').entwine({
		onadd: function onadd() {
			this.addClass('ss-ui-button');
			if (!this.data('button')) this.button();
			this._super();
		},
		onremove: function onremove() {
			if (this.data('button')) this.button('destroy');
			this._super();
		}
	});

	$('.cms .cms-panel-link').entwine({
		onclick: function onclick(e) {
			if ($(this).hasClass('external-link')) {
				e.stopPropagation();

				return;
			}

			var href = this.attr('href'),
			    url = href && !href.match(/^#/) ? href : this.data('href'),
			    data = { pjax: this.data('pjaxTarget') };

			$('.cms-container').loadPanel(url, null, data);
			e.preventDefault();
		}
	});

	$('.cms .ss-ui-button-ajax').entwine({
		onclick: function onclick(e) {
			$(this).removeClass('ui-button-text-only');
			$(this).addClass('ss-ui-button-loading ui-button-text-icons');

			var loading = $(this).find(".ss-ui-loading-icon");

			if (loading.length < 1) {
				loading = $("<span></span>").addClass('ss-ui-loading-icon ui-button-icon-primary ui-icon');

				$(this).prepend(loading);
			}

			loading.show();

			var href = this.attr('href'),
			    url = href ? href : this.data('href');

			jQuery.ajax({
				url: url,

				complete: function complete(xmlhttp, status) {
					var msg = xmlhttp.getResponseHeader('X-Status') ? xmlhttp.getResponseHeader('X-Status') : xmlhttp.responseText;

					try {
						if (typeof msg != "undefined" && msg !== null) eval(msg);
					} catch (e) {}

					loading.hide();

					$(".cms-container").refresh();

					$(this).removeClass('ss-ui-button-loading ui-button-text-icons');
					$(this).addClass('ui-button-text-only');
				},
				dataType: 'html'
			});
			e.preventDefault();
		}
	});

	$('.cms .ss-ui-dialog-link').entwine({
		UUID: null,
		onmatch: function onmatch() {
			this._super();
			this.setUUID(new Date().getTime());
		},
		onunmatch: function onunmatch() {
			this._super();
		},
		onclick: function onclick() {
			this._super();

			var self = this,
			    id = 'ss-ui-dialog-' + this.getUUID();
			var dialog = $('#' + id);
			if (!dialog.length) {
				dialog = $('<div class="ss-ui-dialog" id="' + id + '" />');
				$('body').append(dialog);
			}

			var extraClass = this.data('popupclass') ? this.data('popupclass') : '';

			dialog.ssdialog({ iframeUrl: this.attr('href'), autoOpen: true, dialogExtraClass: extraClass });
			return false;
		}
	});

	$('.cms-content .Actions').entwine({
		onmatch: function onmatch() {
			this.find('.ss-ui-button').click(function () {
				var form = this.form;

				if (form) {
					form.clickedButton = this;

					setTimeout(function () {
						form.clickedButton = null;
					}, 10);
				}
			});

			this.redraw();
			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		},
		redraw: function redraw() {
			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));

			this.contents().filter(function () {
				return this.nodeType == 3 && !/\S/.test(this.nodeValue);
			}).remove();

			this.find('.ss-ui-button').each(function () {
				if (!$(this).data('button')) $(this).button();
			});

			this.find('.ss-ui-buttonset').buttonset();
		}
	});

	$('.cms .field.date input.text').entwine({
		onmatch: function onmatch() {
			var holder = $(this).parents('.field.date:first'),
			    config = holder.data();
			if (!config.showcalendar) {
				this._super();
				return;
			}

			config.showOn = 'button';
			if (config.locale && $.datepicker.regional[config.locale]) {
				config = $.extend(config, $.datepicker.regional[config.locale], {});
			}

			$(this).datepicker(config);


			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		}
	});

	$('.cms .field.dropdown select, .cms .field select[multiple], .fieldholder-small select.dropdown').entwine({
		onmatch: function onmatch() {
			if (this.is('.no-chzn')) {
				this._super();
				return;
			}

			if (!this.data('placeholder')) this.data('placeholder', ' ');

			this.removeClass('has-chzn chzn-done');
			this.siblings('.chzn-container').remove();

			applyChosen(this);

			this._super();
		},
		onunmatch: function onunmatch() {
			this._super();
		}
	});

	$(".cms-panel-layout").entwine({
		redraw: function redraw() {
			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));
		}
	});

	$('.cms .ss-gridfield').entwine({
		showDetailView: function showDetailView(url) {
			var params = window.location.search.replace(/^\?/, '');
			if (params) url = $.path.addSearchParams(url, params);
			$('.cms-container').loadPanel(url);
		}
	});

	$('.cms-search-form').entwine({
		onsubmit: function onsubmit(e) {
			var nonEmptyInputs, url;

			nonEmptyInputs = this.find(':input:not(:submit)').filter(function () {
				var vals = $.grep($(this).fieldValue(), function (val) {
					return val;
				});
				return vals.length;
			});

			url = this.attr('action');

			if (nonEmptyInputs.length) {
				url = $.path.addSearchParams(url, nonEmptyInputs.serialize());
			}

			var container = this.closest('.cms-container');
			container.find('.cms-edit-form').tabs('select', 0);
			container.loadPanel(url, "", {}, true);

			return false;
		}
	});

	$(".cms-search-form button[type=reset], .cms-search-form input[type=reset]").entwine({
		onclick: function onclick(e) {
			e.preventDefault();

			var form = $(this).parents('form');

			form.clearForm();
			form.find(".dropdown select").prop('selectedIndex', 0).trigger("liszt:updated");
			form.submit();
		}
	});

	window._panelDeferredCache = {};
	$('.cms-panel-deferred').entwine({
		onadd: function onadd() {
			this._super();
			this.redraw();
		},
		onremove: function onremove() {
			if (window.debug) console.log('saving', this.data('url'), this);

			if (!this.data('deferredNoCache')) window._panelDeferredCache[this.data('url')] = this.html();
			this._super();
		},
		redraw: function redraw() {
			if (window.debug) console.log('redraw', this.attr('class'), this.get(0));

			var self = this,
			    url = this.data('url');
			if (!url) throw 'Elements of class .cms-panel-deferred need a "data-url" attribute';

			this._super();

			if (!this.children().length) {
				if (!this.data('deferredNoCache') && typeof window._panelDeferredCache[url] !== 'undefined') {
					this.html(window._panelDeferredCache[url]);
				} else {
					this.addClass('loading');
					$.ajax({
						url: url,
						complete: function complete() {
							self.removeClass('loading');
						},
						success: function success(data, status, xhr) {
							self.html(data);
						}
					});
				}
			}
		}
	});

	$('.cms-tabset').entwine({
		onadd: function onadd() {
			this.redrawTabs();
			this._super();
		},
		onremove: function onremove() {
			if (this.data('tabs')) this.tabs('destroy');
			this._super();
		},
		redrawTabs: function redrawTabs() {
			this.rewriteHashlinks();

			var id = this.attr('id'),
			    activeTab = this.find('ul:first .ui-tabs-active');

			if (!this.data('uiTabs')) this.tabs({
				active: activeTab.index() != -1 ? activeTab.index() : 0,
				beforeLoad: function beforeLoad(e, ui) {
					return false;
				},
				activate: function activate(e, ui) {
					if (ui.newTab) {
						ui.newTab.find('.cms-panel-link').click();
					}

					var actions = $(this).closest('form').find('.Actions');
					if ($(ui.newTab).closest('li').hasClass('readonly')) {
						actions.fadeOut();
					} else {
						actions.show();
					}
				}
			});
		},

		rewriteHashlinks: function rewriteHashlinks() {
			$(this).find('ul a').each(function () {
				if (!$(this).attr('href')) return;
				var matches = $(this).attr('href').match(/#.*/);
				if (!matches) return;
				$(this).attr('href', document.location.href.replace(/#.*/, '') + matches[0]);
			});
		}
	});

	$('#filters-button').entwine({
		onmatch: function onmatch() {
			this._super();

			this.data('collapsed', true);
			this.data('animating', false);
		},
		onunmatch: function onunmatch() {
			this._super();
		},
		showHide: function showHide() {
			var self = this,
			    $filters = $('.cms-content-filters').first(),
			    collapsed = this.data('collapsed');

			if (this.data('animating')) {
				return;
			}

			this.toggleClass('active');
			this.data('animating', true);

			$filters[collapsed ? 'slideDown' : 'slideUp']({
				complete: function complete() {
					self.data('collapsed', !collapsed);
					self.data('animating', false);
				}
			});
		},
		onclick: function onclick() {
			this.showHide();
		}
	});
});

var statusMessage = function statusMessage(text, type) {
	text = jQuery('<div/>').text(text).html();
	jQuery.noticeAdd({ text: text, type: type, stayTime: 5000, inEffect: { left: '0', opacity: 'show' } });
};

var errorMessage = function errorMessage(text) {
	jQuery.noticeAdd({ text: text, type: 'error', stayTime: 5000, inEffect: { left: '0', opacity: 'show' } });
};

},{"jQuery":"jQuery"}],14:[function(require,module,exports){
'use strict';

require('../../src/LeftAndMain.Layout.js');
require('../../src/LeftAndMain.js');
require('../../src/LeftAndMain.ActionTabSet.js');
require('../../src/LeftAndMain.Panel.js');
require('../../src/LeftAndMain.Tree.js');
require('../../src/LeftAndMain.Content.js');
require('../../src/LeftAndMain.EditForm.js');
require('../../src/LeftAndMain.Menu.js');
require('../../src/LeftAndMain.Preview.js');
require('../../src/LeftAndMain.BatchActions.js');
require('../../src/LeftAndMain.FieldHelp.js');
require('../../src/LeftAndMain.FieldDescriptionToggle.js');
require('../../src/LeftAndMain.TreeDropdownField.js');

},{"../../src/LeftAndMain.ActionTabSet.js":1,"../../src/LeftAndMain.BatchActions.js":2,"../../src/LeftAndMain.Content.js":3,"../../src/LeftAndMain.EditForm.js":4,"../../src/LeftAndMain.FieldDescriptionToggle.js":5,"../../src/LeftAndMain.FieldHelp.js":6,"../../src/LeftAndMain.Layout.js":7,"../../src/LeftAndMain.Menu.js":8,"../../src/LeftAndMain.Panel.js":9,"../../src/LeftAndMain.Preview.js":10,"../../src/LeftAndMain.Tree.js":11,"../../src/LeftAndMain.TreeDropdownField.js":12,"../../src/LeftAndMain.js":13}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZG1pbi9qYXZhc2NyaXB0L3NyYy9MZWZ0QW5kTWFpbi5BY3Rpb25UYWJTZXQuanMiLCJhZG1pbi9qYXZhc2NyaXB0L3NyYy9MZWZ0QW5kTWFpbi5CYXRjaEFjdGlvbnMuanMiLCJhZG1pbi9qYXZhc2NyaXB0L3NyYy9MZWZ0QW5kTWFpbi5Db250ZW50LmpzIiwiYWRtaW4vamF2YXNjcmlwdC9zcmMvTGVmdEFuZE1haW4uRWRpdEZvcm0uanMiLCJhZG1pbi9qYXZhc2NyaXB0L3NyYy9MZWZ0QW5kTWFpbi5GaWVsZERlc2NyaXB0aW9uVG9nZ2xlLmpzIiwiYWRtaW4vamF2YXNjcmlwdC9zcmMvTGVmdEFuZE1haW4uRmllbGRIZWxwLmpzIiwiYWRtaW4vamF2YXNjcmlwdC9zcmMvTGVmdEFuZE1haW4uTGF5b3V0LmpzIiwiYWRtaW4vamF2YXNjcmlwdC9zcmMvTGVmdEFuZE1haW4uTWVudS5qcyIsImFkbWluL2phdmFzY3JpcHQvc3JjL0xlZnRBbmRNYWluLlBhbmVsLmpzIiwiYWRtaW4vamF2YXNjcmlwdC9zcmMvTGVmdEFuZE1haW4uUHJldmlldy5qcyIsImFkbWluL2phdmFzY3JpcHQvc3JjL0xlZnRBbmRNYWluLlRyZWUuanMiLCJhZG1pbi9qYXZhc2NyaXB0L3NyYy9MZWZ0QW5kTWFpbi5UcmVlRHJvcGRvd25GaWVsZC5qcyIsImFkbWluL2phdmFzY3JpcHQvc3JjL0xlZnRBbmRNYWluLmpzIiwiYWRtaW4vamF2YXNjcmlwdC9zcmMvYnVuZGxlcy9sZWZ0YW5kbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDVUEsaUJBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsVUFBUyxDQUFULEVBQVk7QUFNM0IsR0FBRSxnQ0FBRixFQUFvQyxPQUFwQyxDQUE0QztBQUUzQyxrQkFBZ0IsSUFBaEI7O0FBRUEsU0FB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QVMsTUFBVCxFQUF0QixFQUE3RCxFQURpQztDQUFmOzs7OztBQ3grQ25CLFFBQVEsaUNBQVI7QUFDQSxRQUFRLDBCQUFSO0FBQ0EsUUFBUSx1Q0FBUjtBQUNBLFFBQVEsZ0NBQVI7QUFDQSxRQUFRLCtCQUFSO0FBQ0EsUUFBUSxrQ0FBUjtBQUNBLFFBQVEsbUNBQVI7QUFDQSxRQUFRLCtCQUFSO0FBQ0EsUUFBUSxrQ0FBUjtBQUNBLFFBQVEsdUNBQVI7QUFDQSxRQUFRLG9DQUFSO0FBQ0EsUUFBUSxpREFBUjtBQUNBLFFBQVEsNENBQVIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBGaWxlOiBMZWZ0QW5kTWFpbi5BY3Rpb25UYWJzZXQuanNcbiAqXG4gKiBDb250YWlucyBydWxlcyBmb3IgLnNzLXVpLWFjdGlvbi10YWJzZXQsIHVzZWQgZm9yOlxuICogKiBTaXRlIHRyZWUgYWN0aW9uIHRhYnMgKHRvIHBlcmZvcm0gYWN0aW9ucyBvbiB0aGUgc2l0ZSB0cmVlKVxuICogKiBBY3Rpb25zIG1lbnUgKEVkaXQgcGFnZSBhY3Rpb25zKVxuICpcbiAqL1xuaW1wb3J0ICQgZnJvbSAnalF1ZXJ5JztcblxuJC5lbnR3aW5lKCdzcycsIGZ1bmN0aW9uKCQpIHtcblx0LyoqXG5cdCAqIEdlbmVyaWMgcnVsZXMgZm9yIGFsbCBzcy11aS1hY3Rpb24tdGFic2V0c1xuXHQgKiAqIEFjdGlvbk1lbnVzXG5cdCAqICogU2l0ZVRyZWUgQWN0aW9uVGFic1xuXHQgKi9cblx0JCgnLnNzLXRhYnNldC5zcy11aS1hY3Rpb24tdGFic2V0JykuZW50d2luZSh7XG5cdFx0Ly8gSWdub3JlIHRhYiBzdGF0ZSBzbyBpdCB3aWxsIG5vdCBiZSByZW9wZW5lZCBvbiBmb3JtIHN1Ym1pc3Npb24uXG5cdFx0SWdub3JlVGFiU3RhdGU6IHRydWUsXG5cblx0XHRvbmFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIC5zcy10YWJzZXQgaXMgYWxyZWFkeSBpbml0aWFsaXNlZCB0byBhcHBseSBvdXIgbW9kaWZpY2F0aW9ucyBvbiB0b3AuXG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdFx0Ly9TZXQgYWN0aW9uVGFicyB0byBhbGxvdyBjbG9zaW5nIGFuZCBiZSBjbG9zZWQgYnkgZGVmYXVsdFxuXHRcdFx0dGhpcy50YWJzKHsnY29sbGFwc2libGUnOiB0cnVlLCAnYWN0aXZlJzogZmFsc2V9KTtcblx0XHR9LFxuXG5cdFx0b25yZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBib3VuZCBldmVudHMuXG5cdFx0XHQvLyBUaGlzIGd1YXJkcyBhZ2FpbnN0IGFuIGVkZ2UgY2FzZSB3aGVyZSB0aGUgY2xpY2sgaGFuZGxlcnMgYXJlIG5vdCB1bmJvdW5kXG5cdFx0XHQvLyBiZWNhdXNlIHRoZSBwYW5lbCBpcyBzdGlsbCBvcGVuIHdoZW4gdGhlIGFqYXggZWRpdCBmb3JtIHJlbG9hZHMuXG5cdFx0XHR2YXIgZnJhbWUgPSAkKCcuY21zLWNvbnRhaW5lcicpLmZpbmQoJ2lmcmFtZScpO1xuXHRcdFx0ZnJhbWUuZWFjaChmdW5jdGlvbihpbmRleCwgaWZyYW1lKXtcblx0XHRcdFx0JChpZnJhbWUpLmNvbnRlbnRzKCkub2ZmKCdjbGljay5zcy11aS1hY3Rpb24tdGFic2V0Jyk7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLm9mZignY2xpY2suc3MtdWktYWN0aW9uLXRhYnNldCcpO1xuXG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZWFsIHdpdGggYXZhaWxhYmxlIHZlcnRpY2FsIHNwYWNlXG5cdFx0ICovXG5cdFx0J29udGFic2JlZm9yZWFjdGl2YXRlJzogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0XHR0aGlzLnJpc2VVcChldmVudCwgdWkpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBIYW5kbGUgb3BlbmluZyBhbmQgY2xvc2luZyB0YWJzXG5cdFx0ICovXG5cdFx0b25jbGljazogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0XHR0aGlzLmF0dGFjaENsb3NlSGFuZGxlcihldmVudCwgdWkpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBHZW5lcmljIGZ1bmN0aW9uIHRvIGNsb3NlIG9wZW4gdGFicy4gU3RvcmVzIGV2ZW50IGluIGEgaGFuZGxlcixcblx0XHQgKiBhbmQgcmVtb3ZlcyB0aGUgYm91bmQgZXZlbnQgb25jZSBhY3RpdmF0ZWQuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBTaG91bGQgYmUgY2FsbGVkIGJ5IGEgY2xpY2sgZXZlbnQgYXR0YWNoZWQgdG8gJ3RoaXMnXG5cdFx0ICovXG5cdFx0YXR0YWNoQ2xvc2VIYW5kbGVyOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdHZhciB0aGF0ID0gdGhpcywgZnJhbWUgPSAkKCcuY21zLWNvbnRhaW5lcicpLmZpbmQoJ2lmcmFtZScpLCBjbG9zZUhhbmRsZXI7XG5cblx0XHRcdC8vIENyZWF0ZSBhIGhhbmRsZXIgZm9yIHRoZSBjbGljayBldmVudCBzbyB3ZSBjYW4gY2xvc2UgdGFic1xuXHRcdFx0Ly8gYW5kIGVhc2lseSByZW1vdmUgdGhlIGV2ZW50IG9uY2UgZG9uZVxuXHRcdFx0Y2xvc2VIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0dmFyIHBhbmVsLCBmcmFtZTtcblx0XHRcdFx0cGFuZWwgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnNzLXVpLWFjdGlvbi10YWJzZXQgLnVpLXRhYnMtcGFuZWwnKTtcblxuXHRcdFx0XHQvLyBJZiBhbnl0aGluZyBleGNlcHQgdGhlIHVpLW5hdiBidXR0b24gb3IgcGFuZWwgaXMgY2xpY2tlZCxcblx0XHRcdFx0Ly8gY2xvc2UgcGFuZWwgYW5kIHJlbW92ZSBoYW5kbGVyLiBXZSBjYW4ndCBjbG9zZSBpZiBjbGljayB3YXNcblx0XHRcdFx0Ly8gd2l0aGluIHBhbmVsLCBhcyBpdCBtaWdodCd2ZSBjYXVzZWQgYSBidXR0b24gYWN0aW9uLFxuXHRcdFx0XHQvLyBhbmQgd2UgbmVlZCB0byBzaG93IGl0cyBsb2FkaW5nIGluZGljYXRvci5cblx0XHRcdFx0aWYgKCEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCh0aGF0KS5sZW5ndGggJiYgIXBhbmVsLmxlbmd0aCkge1xuXHRcdFx0XHRcdHRoYXQudGFicygnb3B0aW9uJywgJ2FjdGl2ZScsIGZhbHNlKTsgLy8gY2xvc2UgdGFic1xuXG5cdFx0XHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50IGZyb20gb2JqZWN0cyBpdCBpcyBib3VuZCB0byAoaWZyYW1lJ3MgYW5kIGRvY3VtZW50KVxuXHRcdFx0XHRcdGZyYW1lID0gJCgnLmNtcy1jb250YWluZXInKS5maW5kKCdpZnJhbWUnKTtcblx0XHRcdFx0XHRmcmFtZS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBpZnJhbWUpe1xuXHRcdFx0XHRcdFx0JChpZnJhbWUpLmNvbnRlbnRzKCkub2ZmKCdjbGljay5zcy11aS1hY3Rpb24tdGFic2V0JywgY2xvc2VIYW5kbGVyKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkKGRvY3VtZW50KS5vZmYoJ2NsaWNrLnNzLXVpLWFjdGlvbi10YWJzZXQnLCBjbG9zZUhhbmRsZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBCaW5kIGNsaWNrIGV2ZW50IHRvIGRvY3VtZW50LCBhbmQgdXNlIGNsb3NlSGFuZGxlciB0byBoYW5kbGUgdGhlIGV2ZW50XG5cdFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2suc3MtdWktYWN0aW9uLXRhYnNldCcsIGNsb3NlSGFuZGxlcik7XG5cdFx0XHQvLyBNYWtlIHN1cmUgaWZyYW1lIGNsaWNrIGFsc28gY2xvc2VzIHRhYlxuXHRcdFx0Ly8gaWZyYW1lIG5lZWRzIGEgc3BlY2lhbCBjYXNlLCBlbHNlIHRoZSBjbGljayBldmVudCB3aWxsIG5vdCByZWdpc3RlciBoZXJlXG5cdFx0XHRpZihmcmFtZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0ZnJhbWUuZWFjaChmdW5jdGlvbihpbmRleCwgaWZyYW1lKSB7XG5cdFx0XHRcdFx0JChpZnJhbWUpLmNvbnRlbnRzKCkub24oJ2NsaWNrLnNzLXVpLWFjdGlvbi10YWJzZXQnLCBjbG9zZUhhbmRsZXIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uIHJpc2VVcCBjaGVja3MgdG8gc2VlIGlmIGEgdGFiIHNob3VsZCBiZSBvcGVuZWQgdXB3YXJkc1xuXHRcdCAqIChiYXNlZCBvbiBzcGFjZSBjb25jZXJucykuIElmIHRydWUsIHRoZSByaXNlLXVwIGNsYXNzIGlzIGFwcGxpZWRcblx0XHQgKiBhbmQgYSBuZXcgcG9zaXRpb24gaXMgY2FsY3VsYXRlZCBhbmQgYXBwbGllZCB0byB0aGUgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIE5vdGU6IFNob3VsZCBiZSBjYWxsZWQgYnkgYSB0YWJzYmVmb3JlYWN0aXZhdGUgZXZlbnRcblx0XHQgKi9cblx0XHRyaXNlVXA6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdFx0dmFyIGVsSGVpZ2h0LCB0cmlnZ2VyLCBlbmRPZldpbmRvdywgZWxQb3MsIGFjdGl2ZVBhbmVsLCBhY3RpdmVUYWIsIHRvcFBvc2l0aW9uLCBjb250YWluZXJTb3V0aCwgcGFkZGluZztcblxuXHRcdFx0Ly8gR2V0IHRoZSBudW1iZXJzIG5lZWRlZCB0byBjYWxjdWxhdGUgcG9zaXRpb25zXG5cdFx0XHRlbEhlaWdodCA9ICQodGhpcykuZmluZCgnLnVpLXRhYnMtcGFuZWwnKS5vdXRlckhlaWdodCgpO1xuXHRcdFx0dHJpZ2dlciA9ICQodGhpcykuZmluZCgnLnVpLXRhYnMtbmF2Jykub3V0ZXJIZWlnaHQoKTtcblx0XHRcdGVuZE9mV2luZG93ID0gKCQod2luZG93KS5oZWlnaHQoKSArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpKSAtIHRyaWdnZXI7XG5cdFx0XHRlbFBvcyA9ICQodGhpcykuZmluZCgnLnVpLXRhYnMtbmF2Jykub2Zmc2V0KCkudG9wO1xuXG5cdFx0XHRhY3RpdmVQYW5lbCA9IHVpLm5ld1BhbmVsO1xuXHRcdFx0YWN0aXZlVGFiID0gdWkubmV3VGFiO1xuXG5cdFx0XHRpZiAoZWxQb3MgKyBlbEhlaWdodCA+PSBlbmRPZldpbmRvdyAmJiBlbFBvcyAtIGVsSGVpZ2h0ID4gMCl7XG5cdFx0XHRcdHRoaXMuYWRkQ2xhc3MoJ3Jpc2UtdXAnKTtcblxuXHRcdFx0XHRpZiAoYWN0aXZlVGFiLnBvc2l0aW9uKCkgIT09IG51bGwpe1xuXHRcdFx0XHRcdHRvcFBvc2l0aW9uID0gLWFjdGl2ZVBhbmVsLm91dGVySGVpZ2h0KCk7XG5cdFx0XHRcdFx0Y29udGFpbmVyU291dGggPSBhY3RpdmVQYW5lbC5wYXJlbnRzKCcuc291dGgnKTtcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyU291dGgpe1xuXHRcdFx0XHRcdFx0Ly8gSWYgY29udGFpbmVyIGlzIHRoZSBzb3V0aGVybiBwYW5lbCwgbWFrZSB0YWIgYXBwZWFyIGZyb20gdGhlIHRvcCBvZiB0aGUgY29udGFpbmVyXG5cdFx0XHRcdFx0XHRwYWRkaW5nID0gYWN0aXZlVGFiLm9mZnNldCgpLnRvcCAtIGNvbnRhaW5lclNvdXRoLm9mZnNldCgpLnRvcDtcblx0XHRcdFx0XHRcdHRvcFBvc2l0aW9uID0gdG9wUG9zaXRpb24tcGFkZGluZztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JChhY3RpdmVQYW5lbCkuY3NzKCd0b3AnLHRvcFBvc2l0aW9uK1wicHhcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGVsc2UgcmVtb3ZlIHRoZSByaXNlLXVwIGNsYXNzIGFuZCBzZXQgdG9wIHRvIDBcblx0XHRcdFx0dGhpcy5yZW1vdmVDbGFzcygncmlzZS11cCcpO1xuXHRcdFx0XHRpZiAoYWN0aXZlVGFiLnBvc2l0aW9uKCkgIT09IG51bGwpe1xuXHRcdFx0XHRcdCQoYWN0aXZlUGFuZWwpLmNzcygndG9wJywnMHB4Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXG5cblx0LyoqXG5cdCAqIEFjdGlvbk1lbnVzXG5cdCAqICogU3BlY2lmaWMgcnVsZXMgZm9yIEFjdGlvbk1lbnVzLCB1c2VkIGZvciBlZGl0IHBhZ2UgYWN0aW9uc1xuXHQgKi9cblx0JCgnLmNtcy1jb250ZW50LWFjdGlvbnMgLnNzLXRhYnNldC5zcy11aS1hY3Rpb24tdGFic2V0JykuZW50d2luZSh7XG5cdFx0LyoqXG5cdFx0ICogTWFrZSBuZWNlc3NhcnkgYWRqdXN0bWVudHMgYmVmb3JlIHRhYiBpcyBhY3RpdmF0ZWRcblx0XHQgKi9cblx0XHQnb250YWJzYmVmb3JlYWN0aXZhdGUnOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdHRoaXMuX3N1cGVyKGV2ZW50LCB1aSk7XG5cdFx0XHQvL1NldCB0aGUgcG9zaXRpb24gb2YgdGhlIG9wZW5pbmcgdGFiIChpZiBpdCBleGlzdHMpXG5cdFx0XHRpZigkKHVpLm5ld1BhbmVsKS5sZW5ndGggPiAwKXtcblx0XHRcdFx0JCh1aS5uZXdQYW5lbCkuY3NzKCdsZWZ0JywgdWkubmV3VGFiLnBvc2l0aW9uKCkubGVmdCtcInB4XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0LyoqXG5cdCAqIFNpdGVUcmVlIEFjdGlvblRhYnNcblx0ICogU3BlY2lmaWMgcnVsZXMgZm9yIHNpdGUgdHJlZSBhY3Rpb24gdGFicy4gQXBwbGllcyB0byB0YWJzXG5cdCAqIHdpdGhpbiB0aGUgZXhwYW5kZWQgY29udGVudCBhcmVhLCBhbmQgd2l0aGluIHRoZSBzaWRlYmFyXG5cdCAqL1xuXHQkKCcuY21zLWFjdGlvbnMtcm93LnNzLXRhYnNldC5zcy11aS1hY3Rpb24tdGFic2V0JykuZW50d2luZSh7XG5cdFx0LyoqXG5cdFx0ICogTWFrZSBuZWNlc3NhcnkgYWRqdXN0bWVudHMgYmVmb3JlIHRhYiBpcyBhY3RpdmF0ZWRcblx0XHQgKi9cblx0XHQnb250YWJzYmVmb3JlYWN0aXZhdGUnOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdHRoaXMuX3N1cGVyKGV2ZW50LCB1aSk7XG5cdFx0XHQvLyBSZW1vdmUgdGFic2V0IG9wZW4gY2xhc3NlcyAoTGFzdCBnZXRzIGEgdW5pcXVlIGNsYXNzXG5cdFx0XHQvLyBpbiB0aGUgYmlnZ2VyIHNpdGV0cmVlLiBSZW1vdmUgdGhpcyBpZiB3ZSBoYXZlIGl0KVxuXHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuc3MtdWktYWN0aW9uLXRhYnNldCcpXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCd0YWJzZXQtb3BlbiB0YWJzZXQtb3Blbi1sYXN0Jyk7XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogU2l0ZVRyZWUgQWN0aW9uVGFiczogZXhwYW5kZWRcblx0ICogKiBTcGVjaWZpYyBydWxlcyBmb3Igc2l0ZVRyZWUgYWN0aW9ucyB3aXRoaW4gdGhlIGV4cGFuZGVkIGNvbnRlbnQgYXJlYS5cblx0ICovXG5cdCQoJy5jbXMtY29udGVudC1maWVsZHMgLnNzLXRhYnNldC5zcy11aS1hY3Rpb24tdGFic2V0JykuZW50d2luZSh7XG5cdFx0LyoqXG5cdFx0ICogTWFrZSBuZWNlc3NhcnkgYWRqdXN0bWVudHMgYmVmb3JlIHRhYiBpcyBhY3RpdmF0ZWRcblx0XHQgKi9cblx0XHQnb250YWJzYmVmb3JlYWN0aXZhdGUnOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdHRoaXMuX3N1cGVyKGV2ZW50LCB1aSk7XG5cdFx0XHRpZigkKCB1aS5uZXdQYW5lbCkubGVuZ3RoID4gMCl7XG5cdFx0XHRcdGlmKCQodWkubmV3VGFiKS5oYXNDbGFzcyhcImxhc3RcIikpe1xuXHRcdFx0XHRcdC8vIEFsaWduIG9wZW4gdGFiIHRvIHRoZSByaWdodCAoYmVjYXVzZSBvcGVuZWQgdGFiIGlzIGxhc3QpXG5cdFx0XHRcdFx0JCh1aS5uZXdQYW5lbCkuY3NzKHsnbGVmdCc6ICdhdXRvJywgJ3JpZ2h0JzogJzBweCd9KTtcblxuXHRcdFx0XHRcdC8vIExhc3QgbmVlZHMgdG8gYmUgc3R5bGVkIGRpZmZlcmVudGx5IHdoZW4gb3Blbiwgc28gYXBwbHkgYSB1bmlxdWUgY2xhc3Ncblx0XHRcdFx0XHQkKHVpLm5ld1BhbmVsKS5wYXJlbnQoKS5hZGRDbGFzcygndGFic2V0LW9wZW4tbGFzdCcpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHQvLyBBc3NpZ24gcG9zaXRpb24gdG8gdGFicGFuZWwgYmFzZWQgb24gcG9zaXRpb24gb2YgcmVsaXZlbnQgYWN0aXZlIHRhYiBpdGVtXG5cdFx0XHRcdFx0JCh1aS5uZXdQYW5lbCkuY3NzKCdsZWZ0JywgdWkubmV3VGFiLnBvc2l0aW9uKCkubGVmdCtcInB4XCIpO1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgdGFiLCBtYWtlIHN1cmUgdGhlIHBvc2l0aW9uIGRvZXNuJ3QgaW5jbHVkZSBib3JkZXJcblx0XHRcdFx0XHQvLyAoaGFyZCBzZXQgcG9zaXRpb24gdG8gMCApLCBhbmQgYWRkIHRoZSB0YWItc2V0IG9wZW4gY2xhc3Ncblx0XHRcdFx0XHRpZigkKHVpLm5ld1RhYikuaGFzQ2xhc3MoXCJmaXJzdFwiKSl7XG5cdFx0XHRcdFx0XHQkKHVpLm5ld1BhbmVsKS5jc3MoJ2xlZnQnLFwiMHB4XCIpO1xuXHRcdFx0XHRcdFx0JCh1aS5uZXdQYW5lbCkucGFyZW50KCkuYWRkQ2xhc3MoJ3RhYnNldC1vcGVuJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogU2l0ZVRyZWUgQWN0aW9uVGFiczogc2lkZWJhclxuXHQgKiAqIFNwZWNpZmljIHJ1bGVzIGZvciB3aGVuIHRoZSBzaXRlIHRyZWUgYWN0aW9ucyBwYW5lbCBhcHBlYXJzIGluXG5cdCAqICogdGhlIHNpZGUtYmFyXG5cdCAqL1xuXHQkKCcuY21zLXRyZWUtdmlldy1zaWRlYmFyIC5jbXMtYWN0aW9ucy1yb3cuc3MtdGFic2V0LnNzLXVpLWFjdGlvbi10YWJzZXQnKS5lbnR3aW5lKHtcblxuXHRcdC8vIElmIGFjdGlvbnMgcGFuZWwgaXMgd2l0aGluIHRoZSBzaWRlYmFyLCBhcHBseSBhY3RpdmUgY2xhc3Ncblx0XHQvLyB0byBoZWxwIGFuaW1hdGUgb3Blbi9jbG9zZSBvbiBob3ZlclxuXHRcdCdmcm9tIC51aS10YWJzLW5hdiBsaSc6IHtcblx0XHRcdG9uaG92ZXI6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0JChlLnRhcmdldCkucGFyZW50KCkuZmluZCgnbGkgLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JChlLnRhcmdldCkuZmluZCgnYScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTWFrZSBuZWNlc3NhcnkgYWRqdXN0bWVudHMgYmVmb3JlIHRhYiBpcyBhY3RpdmF0ZWRcblx0XHQgKi9cblx0XHQnb250YWJzYmVmb3JlYWN0aXZhdGUnOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdHRoaXMuX3N1cGVyKGV2ZW50LCB1aSk7XG5cdFx0XHQvLyBSZXNldCBwb3NpdGlvbiBvZiB0YWJzLCBlbHNlIGFueW9uZSBnb2luZyBiZXR3ZWVuIHRoZSBsYXJnZVxuXHRcdFx0Ly8gYW5kIHRoZSBzbWFsbCBzaXRldHJlZSB3aWxsIHNlZSBicm9rZW4gdGFic1xuXHRcdFx0Ly8gQXBwbHkgc3R5bGVzIHdpdGggLmNzcywgdG8gYXZvaWQgb3ZlcnJpZGluZyBjdXJyZW50bHkgYXBwbGllZCBzdHlsZXNcblx0XHRcdCQodWkubmV3UGFuZWwpLmNzcyh7J2xlZnQnOiAnYXV0bycsICdyaWdodCc6ICdhdXRvJ30pO1xuXG5cdFx0XHRpZigkKHVpLm5ld1BhbmVsKS5sZW5ndGggPiAwKXtcblx0XHRcdFx0JCh1aS5uZXdQYW5lbCkucGFyZW50KCkuYWRkQ2xhc3MoJ3RhYnNldC1vcGVuJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxufSk7XG4iLCIvKipcbiAqIEZpbGU6IExlZnRBbmRNYWluLkJhdGNoQWN0aW9ucy5qc1xuICovXG5pbXBvcnQgJCBmcm9tICdqUXVlcnknO1xuaW1wb3J0IGkxOG4gZnJvbSAnaTE4bic7XG5cbiQuZW50d2luZSgnc3MudHJlZScsIGZ1bmN0aW9uKCQpe1xuXG5cdC8qKlxuXHQgKiBDbGFzczogI0Zvcm1fQmF0Y2hBY3Rpb25zRm9ybVxuXHQgKiBcblx0ICogQmF0Y2ggYWN0aW9ucyB3aGljaCB0YWtlIGEgYnVuY2ggb2Ygc2VsZWN0ZWQgcGFnZXMsXG5cdCAqIHVzdWFsbHkgZnJvbSB0aGUgQ01TIHRyZWUgaW1wbGVtZW50YXRpb24sIGFuZCBwZXJmb3JtIHNlcnZlcnNpZGVcblx0ICogY2FsbGJhY2tzIG9uIHRoZSB3aG9sZSBzZXQuIFdlIG1ha2UgdGhlIHRyZWUgc2VsZWN0YWJsZSB3aGVuIHRoZSBqUXVlcnkuVUkgdGFiXG5cdCAqIGVuY2xvc2luZyB0aGlzIGZvcm0gaXMgb3BlbmVkLlxuXHQgKiBcblx0ICogRXZlbnRzOlxuXHQgKiAgcmVnaXN0ZXIgLSBDYWxsZWQgYmVmb3JlIGFuIGFjdGlvbiBpcyBhZGRlZC5cblx0ICogIHVucmVnaXN0ZXIgLSBDYWxsZWQgYmVmb3JlIGFuIGFjdGlvbiBpcyByZW1vdmVkLlxuXHQgKi9cblx0JCgnI0Zvcm1fQmF0Y2hBY3Rpb25zRm9ybScpLmVudHdpbmUoe1xuXG5cdFx0LyoqXG5cdFx0ICogVmFyaWFibGU6IEFjdGlvbnNcblx0XHQgKiAoQXJyYXkpIFN0b3JlcyBhbGwgYWN0aW9ucyB0aGF0IGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlIGNvbGxlY3RlZCBJRHMgYXNcblx0XHQgKiBmdW5jdGlvbiBjbG9zdXJlcy4gVGhpcyBtaWdodCB0cmlnZ2VyIGZpbHRlcmluZyBvZiB0aGUgc2VsZWN0ZWQgSURzLFxuXHRcdCAqIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIGV0Yy5cblx0XHQgKi9cblx0XHRBY3Rpb25zOiBbXSxcblxuXHRcdGdldFRyZWU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuICQoJy5jbXMtdHJlZScpO1xuXHRcdH0sXG5cblx0XHRmcm9tVHJlZToge1xuXHRcdFx0b25jaGVja19ub2RlOiBmdW5jdGlvbihlLCBkYXRhKXtcblx0XHRcdFx0dGhpcy5zZXJpYWxpemVGcm9tVHJlZSgpO1xuXHRcdFx0fSxcblx0XHRcdG9udW5jaGVja19ub2RlOiBmdW5jdGlvbihlLCBkYXRhKXtcblx0XHRcdFx0dGhpcy5zZXJpYWxpemVGcm9tVHJlZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgcmVnaXN0ZXJEZWZhdWx0XG5cdFx0ICogQGRlc2MgUmVnaXN0ZXIgZGVmYXVsdCBidWxrIGNvbmZpcm1hdGlvbiBkaWFsb2dzXG5cdFx0ICovXG5cdFx0cmVnaXN0ZXJEZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHRcdC8vIFB1Ymxpc2ggc2VsZWN0ZWQgcGFnZXMgYWN0aW9uXG5cdFx0XHR0aGlzLnJlZ2lzdGVyKCdhZG1pbi9wYWdlcy9iYXRjaGFjdGlvbnMvcHVibGlzaCcsIGZ1bmN0aW9uKGlkcykge1xuXHRcdFx0XHR2YXIgY29uZmlybWVkID0gY29uZmlybShcblx0XHRcdFx0XHRpMThuLmluamVjdChcblx0XHRcdFx0XHRcdGkxOG4uX3QoXG5cdFx0XHRcdFx0XHRcdFwiQ01TTUFJTi5CQVRDSF9QVUJMSVNIX1BST01QVFwiLFxuXHRcdFx0XHRcdFx0XHRcIllvdSBoYXZlIHtudW19IHBhZ2Uocykgc2VsZWN0ZWQuXFxuXFxuRG8geW91IHJlYWxseSB3YW50IHRvIHB1Ymxpc2g/XCJcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHR7J251bSc6IGlkcy5sZW5ndGh9XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm4gKGNvbmZpcm1lZCkgPyBpZHMgOiBmYWxzZTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBVbnB1Ymxpc2ggc2VsZWN0ZWQgcGFnZXMgYWN0aW9uXG5cdFx0XHR0aGlzLnJlZ2lzdGVyKCdhZG1pbi9wYWdlcy9iYXRjaGFjdGlvbnMvdW5wdWJsaXNoJywgZnVuY3Rpb24oaWRzKSB7XG5cdFx0XHRcdHZhciBjb25maXJtZWQgPSBjb25maXJtKFxuXHRcdFx0XHRcdGkxOG4uaW5qZWN0KFxuXHRcdFx0XHRcdFx0aTE4bi5fdChcblx0XHRcdFx0XHRcdFx0XCJDTVNNQUlOLkJBVENIX1VOUFVCTElTSF9QUk9NUFRcIixcblx0XHRcdFx0XHRcdFx0XCJZb3UgaGF2ZSB7bnVtfSBwYWdlKHMpIHNlbGVjdGVkLlxcblxcbkRvIHlvdSByZWFsbHkgd2FudCB0byB1bnB1Ymxpc2hcIlxuXHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdHsnbnVtJzogaWRzLmxlbmd0aH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiAoY29uZmlybWVkKSA/IGlkcyA6IGZhbHNlO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIERlbGV0ZSBzZWxlY3RlZCBwYWdlcyBhY3Rpb25cblx0XHRcdC8vIEBkZXByZWNhdGVkIHNpbmNlIDQuMCBVc2UgYXJjaGl2ZSBpbnN0ZWFkXG5cdFx0XHR0aGlzLnJlZ2lzdGVyKCdhZG1pbi9wYWdlcy9iYXRjaGFjdGlvbnMvZGVsZXRlJywgZnVuY3Rpb24oaWRzKSB7XG5cdFx0XHRcdHZhciBjb25maXJtZWQgPSBjb25maXJtKFxuXHRcdFx0XHRcdGkxOG4uaW5qZWN0KFxuXHRcdFx0XHRcdFx0aTE4bi5fdChcblx0XHRcdFx0XHRcdFx0XCJDTVNNQUlOLkJBVENIX0RFTEVURV9QUk9NUFRcIixcblx0XHRcdFx0XHRcdFx0XCJZb3UgaGF2ZSB7bnVtfSBwYWdlKHMpIHNlbGVjdGVkLlxcblxcbkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGU/XCJcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHR7J251bSc6IGlkcy5sZW5ndGh9XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm4gKGNvbmZpcm1lZCkgPyBpZHMgOiBmYWxzZTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBEZWxldGUgc2VsZWN0ZWQgcGFnZXMgYWN0aW9uXG5cdFx0XHR0aGlzLnJlZ2lzdGVyKCdhZG1pbi9wYWdlcy9iYXRjaGFjdGlvbnMvYXJjaGl2ZScsIGZ1bmN0aW9uKGlkcykge1xuXHRcdFx0XHR2YXIgY29uZmlybWVkID0gY29uZmlybShcblx0XHRcdFx0XHRpMThuLmluamVjdChcblx0XHRcdFx0XHRcdGkxOG4uX3QoXG5cdFx0XHRcdFx0XHRcdFwiQ01TTUFJTi5CQVRDSF9BUkNISVZFX1BST01QVFwiLFxuXHRcdFx0XHRcdFx0XHRcIllvdSBoYXZlIHtudW19IHBhZ2Uocykgc2VsZWN0ZWQuXFxuXFxuQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGFyY2hpdmUgdGhlc2UgcGFnZXM/XFxuXFxuVGhlc2UgcGFnZXMgYW5kIGFsbCBvZiB0aGVpciBjaGlsZHJlbiBwYWdlcyB3aWxsIGJlIHVucHVibGlzaGVkIGFuZCBzZW50IHRvIHRoZSBhcmNoaXZlLlwiXG5cdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0eydudW0nOiBpZHMubGVuZ3RofVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuIChjb25maXJtZWQpID8gaWRzIDogZmFsc2U7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gUmVzdG9yZSBzZWxlY3RlZCBhcmNoaXZlZCBwYWdlc1xuXHRcdFx0dGhpcy5yZWdpc3RlcignYWRtaW4vcGFnZXMvYmF0Y2hhY3Rpb25zL3Jlc3RvcmUnLCBmdW5jdGlvbihpZHMpIHtcblx0XHRcdFx0dmFyIGNvbmZpcm1lZCA9IGNvbmZpcm0oXG5cdFx0XHRcdFx0aTE4bi5pbmplY3QoXG5cdFx0XHRcdFx0XHRpMThuLl90KFxuXHRcdFx0XHRcdFx0XHRcIkNNU01BSU4uQkFUQ0hfUkVTVE9SRV9QUk9NUFRcIixcblx0XHRcdFx0XHRcdFx0XCJZb3UgaGF2ZSB7bnVtfSBwYWdlKHMpIHNlbGVjdGVkLlxcblxcbkRvIHlvdSByZWFsbHkgd2FudCB0byByZXN0b3JlIHRvIHN0YWdlP1xcblxcbkNoaWxkcmVuIG9mIGFyY2hpdmVkIHBhZ2VzIHdpbGwgYmUgcmVzdG9yZWQgdG8gdGhlIHJvb3QgbGV2ZWwsIHVubGVzcyB0aG9zZSBwYWdlcyBhcmUgYWxzbyBiZWluZyByZXN0b3JlZC5cIlxuXHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdHsnbnVtJzogaWRzLmxlbmd0aH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiAoY29uZmlybWVkKSA/IGlkcyA6IGZhbHNlO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIERlbGV0ZSBzZWxlY3RlZCBwYWdlcyBmcm9tIGxpdmUgYWN0aW9uXG5cdFx0XHR0aGlzLnJlZ2lzdGVyKCdhZG1pbi9wYWdlcy9iYXRjaGFjdGlvbnMvZGVsZXRlZnJvbWxpdmUnLCBmdW5jdGlvbihpZHMpIHtcblx0XHRcdFx0dmFyIGNvbmZpcm1lZCA9IGNvbmZpcm0oXG5cdFx0XHRcdFx0aTE4bi5pbmplY3QoXG5cdFx0XHRcdFx0XHRpMThuLl90KFxuXHRcdFx0XHRcdFx0XHRcIkNNU01BSU4uQkFUQ0hfREVMRVRFTElWRV9QUk9NUFRcIixcblx0XHRcdFx0XHRcdFx0XCJZb3UgaGF2ZSB7bnVtfSBwYWdlKHMpIHNlbGVjdGVkLlxcblxcbkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgdGhlc2UgcGFnZXMgZnJvbSBsaXZlP1wiXG5cdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0eydudW0nOiBpZHMubGVuZ3RofVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuIChjb25maXJtZWQpID8gaWRzIDogZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0b25hZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5yZWdpc3RlckRlZmF1bHQoKTtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBmdW5jIHJlZ2lzdGVyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuXHRcdCAqL1xuXHRcdHJlZ2lzdGVyOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaykge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdyZWdpc3RlcicsIHt0eXBlOiB0eXBlLCBjYWxsYmFjazogY2FsbGJhY2t9KTtcblx0XHRcdHZhciBhY3Rpb25zID0gdGhpcy5nZXRBY3Rpb25zKCk7XG5cdFx0XHRhY3Rpb25zW3R5cGVdID0gY2FsbGJhY2s7XG5cdFx0XHR0aGlzLnNldEFjdGlvbnMoYWN0aW9ucyk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBmdW5jIHVucmVnaXN0ZXJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuXHRcdCAqIEBkZXNjIFJlbW92ZSBhbiBleGlzdGluZyBhY3Rpb24uXG5cdFx0ICovXG5cdFx0dW5yZWdpc3RlcjogZnVuY3Rpb24odHlwZSkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCd1bnJlZ2lzdGVyJywge3R5cGU6IHR5cGV9KTtcblxuXHRcdFx0dmFyIGFjdGlvbnMgPSB0aGlzLmdldEFjdGlvbnMoKTtcblx0XHRcdGlmKGFjdGlvbnNbdHlwZV0pIGRlbGV0ZSBhY3Rpb25zW3R5cGVdO1xuXHRcdFx0dGhpcy5zZXRBY3Rpb25zKGFjdGlvbnMpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBAZnVuYyByZWZyZXNoU2VsZWN0ZWRcblx0XHQgKiBAcGFyYW0ge29iamVjdH0gcm9vdE5vZGVcblx0XHQgKiBAZGVzYyBBamF4IGNhbGxiYWNrcyBkZXRlcm1pbmUgd2hpY2ggcGFnZXMgaXMgc2VsZWN0YWJsZSBpbiBhIGNlcnRhaW4gYmF0Y2ggYWN0aW9uLlxuXHRcdCAqL1xuXHRcdHJlZnJlc2hTZWxlY3RlZCA6IGZ1bmN0aW9uKHJvb3ROb2RlKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdHN0ID0gdGhpcy5nZXRUcmVlKCksXG5cdFx0XHRcdGlkcyA9IHRoaXMuZ2V0SURzKCksXG5cdFx0XHRcdGFsbElkcyA9IFtdLFxuXHRcdFx0XHR2aWV3TW9kZSA9ICQoJy5jbXMtY29udGVudC1iYXRjaGFjdGlvbnMtYnV0dG9uJyksXG5cdFx0XHRcdGFjdGlvblVybCA9IHRoaXMuZmluZCgnOmlucHV0W25hbWU9QWN0aW9uXScpLnZhbCgpO1xuXHRcdFxuXHRcdFx0Ly8gRGVmYXVsdCB0byByZWZyZXNoaW5nIHRoZSBlbnRpcmUgdHJlZVxuXHRcdFx0aWYocm9vdE5vZGUgPT0gbnVsbCkgcm9vdE5vZGUgPSBzdDtcblxuXHRcdFx0Zm9yKHZhciBpZHggaW4gaWRzKSB7XG5cdFx0XHRcdCQoJChzdCkuZ2V0Tm9kZUJ5SUQoaWR4KSkuYWRkQ2xhc3MoJ3NlbGVjdGVkJykuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgbm8gYWN0aW9uIGlzIHNlbGVjdGVkLCBlbmFibGUgYWxsIG5vZGVzXG5cdFx0XHRpZighYWN0aW9uVXJsIHx8IGFjdGlvblVybCA9PSAtMSB8fCAhdmlld01vZGUuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG5cdFx0XHRcdCQocm9vdE5vZGUpLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKHRoaXMpLnNldEVuYWJsZWQodHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIERpc2FibGUgdGhlIG5vZGVzIHdoaWxlIHRoZSBhamF4IHJlcXVlc3QgaXMgYmVpbmcgcHJvY2Vzc2VkXG5cdFx0XHQkKHJvb3ROb2RlKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFsbElkcy5wdXNoKCQodGhpcykuZGF0YSgnaWQnKSk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ3RyZWVsb2FkaW5nJykuc2V0RW5hYmxlZChmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly8gUG9zdCB0byB0aGUgc2VydmVyIHRvIGFzayB3aGljaCBwYWdlcyBjYW4gaGF2ZSB0aGlzIGJhdGNoIGFjdGlvbiBhcHBsaWVkXG5cdFx0XHQvLyBSZXRhaW4gZXhpc3RpbmcgcXVlcnkgcGFyYW1ldGVycyBpbiBVUkwgYmVmb3JlIGFwcGVuZGluZyBwYXRoXG5cdFx0XHR2YXIgYWN0aW9uVXJsUGFydHMgPSAkLnBhdGgucGFyc2VVcmwoYWN0aW9uVXJsKTtcblx0XHRcdHZhciBhcHBsaWNhYmxlUGFnZXNVcmwgPSBhY3Rpb25VcmxQYXJ0cy5ocmVmTm9TZWFyY2ggKyAnL2FwcGxpY2FibGVwYWdlcy8nO1xuXHRcdFx0YXBwbGljYWJsZVBhZ2VzVXJsID0gJC5wYXRoLmFkZFNlYXJjaFBhcmFtcyhhcHBsaWNhYmxlUGFnZXNVcmwsIGFjdGlvblVybFBhcnRzLnNlYXJjaCk7XG5cdFx0XHRhcHBsaWNhYmxlUGFnZXNVcmwgPSAkLnBhdGguYWRkU2VhcmNoUGFyYW1zKGFwcGxpY2FibGVQYWdlc1VybCwge2NzdklEczogYWxsSWRzLmpvaW4oJywnKX0pO1xuXHRcdFx0alF1ZXJ5LmdldEpTT04oYXBwbGljYWJsZVBhZ2VzVXJsLCBmdW5jdGlvbihhcHBsaWNhYmxlSURzKSB7XG5cdFx0XHRcdC8vIFNldCBhIENTUyBjbGFzcyBvbiBlYWNoIHRyZWUgbm9kZSBpbmRpY2F0aW5nIHdoaWNoIGNhbiBiZSBiYXRjaC1hY3Rpb25lZCBhbmQgd2hpY2ggY2FuJ3Rcblx0XHRcdFx0alF1ZXJ5KHJvb3ROb2RlKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygndHJlZWxvYWRpbmcnKTtcblxuXHRcdFx0XHRcdHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcblx0XHRcdFx0XHRpZihpZCA9PSAwIHx8ICQuaW5BcnJheShpZCwgYXBwbGljYWJsZUlEcykgPj0gMCkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5zZXRFbmFibGVkKHRydWUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBEZS1zZWxlY3QgdGhlIG5vZGUgaWYgaXQncyBub24tYXBwbGljYWJsZVxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKS5zZXRFbmFibGVkKGZhbHNlKTtcblx0XHRcdFx0XHRcdCQodGhpcykucHJvcCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdHNlbGYuc2VyaWFsaXplRnJvbVRyZWUoKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgc2VyaWFsaXplRnJvbVRyZWVcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHRcdCAqL1xuXHRcdHNlcmlhbGl6ZUZyb21UcmVlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0cmVlID0gdGhpcy5nZXRUcmVlKCksIGlkcyA9IHRyZWUuZ2V0U2VsZWN0ZWRJRHMoKTtcblx0XHRcdFxuXHRcdFx0Ly8gd3JpdGUgSURzIHRvIHRoZSBoaWRkZW4gZmllbGRcblx0XHRcdHRoaXMuc2V0SURzKGlkcyk7XG5cdFx0XHRcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgc2V0SURTXG5cdFx0ICogQHBhcmFtIHthcnJheX0gaWRzXG5cdFx0ICovXG5cdFx0c2V0SURzOiBmdW5jdGlvbihpZHMpIHtcblx0XHRcdHRoaXMuZmluZCgnOmlucHV0W25hbWU9Y3N2SURzXScpLnZhbChpZHMgPyBpZHMuam9pbignLCcpIDogbnVsbCk7XG5cdFx0fSxcblx0XHRcblx0XHQvKipcblx0XHQgKiBAZnVuYyBnZXRJRFNcblx0XHQgKiBAcmV0dXJuIHthcnJheX1cblx0XHQgKi9cblx0XHRnZXRJRHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gTWFwIGVtcHR5IHZhbHVlIHRvIGVtcHR5IGFycmF5XG5cdFx0XHR2YXIgdmFsdWUgPSB0aGlzLmZpbmQoJzppbnB1dFtuYW1lPWNzdklEc10nKS52YWwoKTtcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0XHQ/IHZhbHVlLnNwbGl0KCcsJylcblx0XHRcdFx0OiBbXTtcblx0XHR9LFxuXG5cdFx0b25zdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcywgaWRzID0gdGhpcy5nZXRJRHMoKSwgdHJlZSA9IHRoaXMuZ2V0VHJlZSgpLCBhY3Rpb25zID0gdGhpcy5nZXRBY3Rpb25zKCk7XG5cdFx0XHRcblx0XHRcdC8vIGlmIG5vIG5vZGVzIGFyZSBzZWxlY3RlZCwgcmV0dXJuIHdpdGggYW4gZXJyb3Jcblx0XHRcdGlmKCFpZHMgfHwgIWlkcy5sZW5ndGgpIHtcblx0XHRcdFx0YWxlcnQoaTE4bi5fdCgnQ01TTUFJTi5TRUxFQ1RPTkVQQUdFJywgJ1BsZWFzZSBzZWxlY3QgYXQgbGVhc3Qgb25lIHBhZ2UnKSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBhcHBseSBjYWxsYmFjaywgd2hpY2ggbWlnaHQgbW9kaWZ5IHRoZSBJRHNcblx0XHRcdHZhciB0eXBlID0gdGhpcy5maW5kKCc6aW5wdXRbbmFtZT1BY3Rpb25dJykudmFsKCk7XG5cdFx0XHRpZihhY3Rpb25zW3R5cGVdKSB7XG5cdFx0XHRcdGlkcyA9IHRoaXMuZ2V0QWN0aW9ucygpW3R5cGVdLmFwcGx5KHRoaXMsIFtpZHNdKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gRGlzY29udGludWUgcHJvY2Vzc2luZyBpZiB0aGVyZSBhcmUgbm8gZnVydGhlciBpdGVtc1xuXHRcdFx0aWYoIWlkcyB8fCAhaWRzLmxlbmd0aCkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcblx0XHRcdC8vIHdyaXRlIChwb3NzaWJseSBtb2RpZmllZCkgSURzIGJhY2sgaW50byB0byB0aGUgaGlkZGVuIGZpZWxkXG5cdFx0XHR0aGlzLnNldElEcyhpZHMpO1xuXHRcdFx0XG5cdFx0XHQvLyBSZXNldCBmYWlsdXJlIHN0YXRlc1xuXHRcdFx0dHJlZS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdmYWlsZWQnKTtcblx0XHRcblx0XHRcdHZhciBidXR0b24gPSB0aGlzLmZpbmQoJzpzdWJtaXQ6Zmlyc3QnKTtcblx0XHRcdGJ1dHRvbi5hZGRDbGFzcygnbG9hZGluZycpO1xuXHRcdFxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHQvLyBkb24ndCB1c2Ugb3JpZ2luYWwgZm9ybSB1cmxcblx0XHRcdFx0dXJsOiB0eXBlLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdGRhdGE6IHRoaXMuc2VyaWFsaXplQXJyYXkoKSxcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKHhtbGh0dHAsIHN0YXR1cykge1xuXHRcdFx0XHRcdGJ1dHRvbi5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXG5cdFx0XHRcdFx0Ly8gUmVmcmVzaCB0aGUgdHJlZS5cblx0XHRcdFx0XHQvLyBNYWtlcyBzdXJlIGFsbCBub2RlcyBoYXZlIHRoZSBjb3JyZWN0IENTUyBjbGFzc2VzIGFwcGxpZWQuXG5cdFx0XHRcdFx0dHJlZS5qc3RyZWUoJ3JlZnJlc2gnLCAtMSk7XG5cdFx0XHRcdFx0c2VsZi5zZXRJRHMoW10pO1xuXG5cdFx0XHRcdFx0Ly8gUmVzZXQgYWN0aW9uXG5cdFx0XHRcdFx0c2VsZi5maW5kKCc6aW5wdXRbbmFtZT1BY3Rpb25dJykudmFsKCcnKS5jaGFuZ2UoKTtcblx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gc3RhdHVzIG1lc3NhZ2UgKGRlY29kZSBpbnRvIFVURi04LCBIVFRQIGhlYWRlcnMgZG9uJ3QgYWxsb3cgbXVsdGlieXRlKVxuXHRcdFx0XHRcdHZhciBtc2cgPSB4bWxodHRwLmdldFJlc3BvbnNlSGVhZGVyKCdYLVN0YXR1cycpO1xuXHRcdFx0XHRcdGlmKG1zZykgc3RhdHVzTWVzc2FnZShkZWNvZGVVUklDb21wb25lbnQobXNnKSwgKHN0YXR1cyA9PSAnc3VjY2VzcycpID8gJ2dvb2QnIDogJ2JhZCcpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcblx0XHRcdFx0XHR2YXIgaWQsIG5vZGU7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoZGF0YS5tb2RpZmllZCkge1xuXHRcdFx0XHRcdFx0dmFyIG1vZGlmaWVkTm9kZXMgPSBbXTtcblx0XHRcdFx0XHRcdGZvcihpZCBpbiBkYXRhLm1vZGlmaWVkKSB7XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSB0cmVlLmdldE5vZGVCeUlEKGlkKTtcblx0XHRcdFx0XHRcdFx0dHJlZS5qc3RyZWUoJ3NldF90ZXh0Jywgbm9kZSwgZGF0YS5tb2RpZmllZFtpZF1bJ1RyZWVUaXRsZSddKTtcblx0XHRcdFx0XHRcdFx0bW9kaWZpZWROb2Rlcy5wdXNoKG5vZGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JChtb2RpZmllZE5vZGVzKS5lZmZlY3QoJ2hpZ2hsaWdodCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihkYXRhLmRlbGV0ZWQpIHtcblx0XHRcdFx0XHRcdGZvcihpZCBpbiBkYXRhLmRlbGV0ZWQpIHtcblx0XHRcdFx0XHRcdFx0bm9kZSA9IHRyZWUuZ2V0Tm9kZUJ5SUQoaWQpO1xuXHRcdFx0XHRcdFx0XHRpZihub2RlLmxlbmd0aClcdHRyZWUuanN0cmVlKCdkZWxldGVfbm9kZScsIG5vZGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihkYXRhLmVycm9yKSB7XG5cdFx0XHRcdFx0XHRmb3IoaWQgaW4gZGF0YS5lcnJvcikge1xuXHRcdFx0XHRcdFx0XHRub2RlID0gdHJlZS5nZXROb2RlQnlJRChpZCk7XG5cdFx0XHRcdFx0XHRcdCQobm9kZSkuYWRkQ2xhc3MoJ2ZhaWxlZCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJ1xuXHRcdFx0fSk7XG5cdFx0XG5cdFx0XHQvLyBOZXZlciBwcm9jZXNzIHRoaXMgYWN0aW9uOyBPbmx5IGludm9rZSB2aWEgYWpheFxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XG5cdH0pO1xuXG5cdCQoJy5jbXMtY29udGVudC1iYXRjaGFjdGlvbnMtYnV0dG9uJykuZW50d2luZSh7XG5cdFx0b25tYXRjaDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHRcdHRoaXMudXBkYXRlVHJlZSgpO1xuXHRcdH0sXG5cdFx0b251bm1hdGNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0b25jbGljazogZnVuY3Rpb24gKGUpIHtcblx0XHRcdHRoaXMudXBkYXRlVHJlZSgpO1xuXHRcdH0sXG5cdFx0dXBkYXRlVHJlZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHRyZWUgPSAkKCcuY21zLXRyZWUnKSxcblx0XHRcdFx0Zm9ybSA9ICQoJyNGb3JtX0JhdGNoQWN0aW9uc0Zvcm0nKTtcblxuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblxuXHRcdFx0aWYodGhpcy5kYXRhKCdhY3RpdmUnKSkge1xuXHRcdFx0XHR0cmVlLmFkZENsYXNzKCdtdWx0aXBsZScpO1xuXHRcdFx0XHR0cmVlLnJlbW92ZUNsYXNzKCdkcmFnZ2FibGUnKTtcblx0XHRcdFx0Zm9ybS5zZXJpYWxpemVGcm9tVHJlZSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHJlZS5yZW1vdmVDbGFzcygnbXVsdGlwbGUnKTtcblx0XHRcdFx0dHJlZS5hZGRDbGFzcygnZHJhZ2dhYmxlJyk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdCQoJyNGb3JtX0JhdGNoQWN0aW9uc0Zvcm0nKS5yZWZyZXNoU2VsZWN0ZWQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBDbGFzczogI0Zvcm1fQmF0Y2hBY3Rpb25zRm9ybSA6c2VsZWN0W25hbWU9QWN0aW9uXVxuXHQgKi9cblx0JCgnI0Zvcm1fQmF0Y2hBY3Rpb25zRm9ybSBzZWxlY3RbbmFtZT1BY3Rpb25dJykuZW50d2luZSh7XG5cdFx0b25jaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBmb3JtID0gJChlLnRhcmdldC5mb3JtKSxcblx0XHRcdFx0YnRuID0gZm9ybS5maW5kKCc6c3VibWl0JyksXG5cdFx0XHRcdHNlbGVjdGVkID0gJChlLnRhcmdldCkudmFsKCk7XG5cdFx0XHRpZighc2VsZWN0ZWQgfHwgc2VsZWN0ZWQgPT0gLTEpIHtcblx0XHRcdFx0YnRuLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuYnV0dG9uKCdyZWZyZXNoJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidG4ucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5idXR0b24oJ3JlZnJlc2gnKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gUmVmcmVzaCBzZWxlY3RlZCAvIGVuYWJsZWQgbm9kZXNcblx0XHRcdCQoJyNGb3JtX0JhdGNoQWN0aW9uc0Zvcm0nKS5yZWZyZXNoU2VsZWN0ZWQoKTtcblxuXHRcdFx0Ly8gVE9ETyBTaG91bGQgd29yayBieSB0cmlnZ2VyaW5nIGNoYW5nZSgpIGFsb25nLCBidXQgZG9lc24ndCAtIGVudHdpbmUgZXZlbnQgYnViYmxpbmc/XG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJsaXN6dDp1cGRhdGVkXCIpO1xuXG5cdFx0XHR0aGlzLl9zdXBlcihlKTtcblx0XHR9XG5cdH0pO1xufSk7XG4iLCJpbXBvcnQgJCBmcm9tICdqUXVlcnknO1xuXG4kLmVudHdpbmUoJ3NzJywgZnVuY3Rpb24oJCl7XG5cdFxuXHQvKipcblx0ICogVGhlIFwiY29udGVudFwiIGFyZWEgY29udGFpbnMgYWxsIG9mIHRoZSBzZWN0aW9uIHNwZWNpZmljIFVJIChleGNsdWRpbmcgdGhlIG1lbnUpLlxuXHQgKiBUaGlzIGFyZWEgY2FuIGJlIGEgZm9ybSBpdHNlbGYsIGFzIHdlbGwgYXMgY29udGFpbiBvbmUgb3IgbW9yZSBmb3Jtcy5cblx0ICogRm9yIGV4YW1wbGUsIGEgcGFnZSBlZGl0IGZvcm0gbWlnaHQgZmlsbCB0aGUgd2hvbGUgYXJlYSwgXG5cdCAqIHdoaWxlIGEgTW9kZWxBZG1pbiBsYXlvdXQgc2hvd3MgYSBzZWFyY2ggZm9ybSBvbiB0aGUgbGVmdCwgYW5kIGVkaXQgZm9ybSBvbiB0aGUgcmlnaHQuXG5cdCAqL1xuXHQkKCcuY21zLWNvbnRlbnQnKS5lbnR3aW5lKHtcblx0XHRcblx0XHRvbmFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdC8vIEZvcmNlIGluaXRpYWxpemF0aW9uIG9mIGNlcnRhaW4gVUkgZWxlbWVudHMgdG8gYXZvaWQgbGF5b3V0IGdsaXRjaGVzXG5cdFx0XHR0aGlzLmZpbmQoJy5jbXMtdGFic2V0JykucmVkcmF3VGFicygpO1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblxuXHRcdH0sXG5cblx0XHRyZWRyYXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYod2luZG93LmRlYnVnKSBjb25zb2xlLmxvZygncmVkcmF3JywgdGhpcy5hdHRyKCdjbGFzcycpLCB0aGlzLmdldCgwKSk7XG5cdFx0XHRcblx0XHRcdC8vIEZvcmNlIGluaXRpYWxpemF0aW9uIG9mIGNlcnRhaW4gVUkgZWxlbWVudHMgdG8gYXZvaWQgbGF5b3V0IGdsaXRjaGVzXG5cdFx0XHR0aGlzLmFkZCh0aGlzLmZpbmQoJy5jbXMtdGFic2V0JykpLnJlZHJhd1RhYnMoKTtcblx0XHRcdHRoaXMuZmluZCgnLmNtcy1jb250ZW50LWhlYWRlcicpLnJlZHJhdygpO1xuXHRcdFx0dGhpcy5maW5kKCcuY21zLWNvbnRlbnQtYWN0aW9ucycpLnJlZHJhdygpO1xuXHRcdH1cblx0fSk7XG5cblx0LyoqXG5cdCAqIExvYWQgZWRpdCBmb3JtIGZvciB0aGUgc2VsZWN0ZWQgbm9kZSB3aGVuIGl0cyBjbGlja2VkLlxuXHQgKi9cblx0JCgnLmNtcy1jb250ZW50IC5jbXMtdHJlZScpLmVudHdpbmUoe1xuXHRcdG9uYWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblxuXHRcdFx0dGhpcy5iaW5kKCdzZWxlY3Rfbm9kZS5qc3RyZWUnLCBmdW5jdGlvbihlLCBkYXRhKSB7XG5cdFx0XHRcdHZhciBub2RlID0gZGF0YS5yc2x0Lm9iaiwgbG9hZGVkTm9kZUlEID0gc2VsZi5maW5kKCc6aW5wdXRbbmFtZT1JRF0nKS52YWwoKSwgb3JpZ0V2ZW50ID0gZGF0YS5hcmdzWzJdLCBjb250YWluZXIgPSAkKCcuY21zLWNvbnRhaW5lcicpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gRG9uJ3QgdHJpZ2dlciB1bmxlc3MgY29taW5nIGZyb20gYSBjbGljayBldmVudC5cblx0XHRcdFx0Ly8gQXZvaWRzIHByb2JsZW1zIHdpdGggYXV0b21hdGVkIHNlY3Rpb24gc3dpdGNoZXMgZnJvbSB0cmVlIHRvIGRldGFpbCB2aWV3XG5cdFx0XHRcdC8vIHdoZW4gSlNUcmVlIGF1dG8tc2VsZWN0cyBlbGVtZW50cyBvbiBmaXJzdCBsb2FkLlxuXHRcdFx0XHRpZighb3JpZ0V2ZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBEb24ndCBhbGxvdyBjaGVja2luZyBkaXNhYmxlZCBub2Rlc1xuXHRcdFx0XHRpZigkKG5vZGUpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYWxsb3cgcmVsb2FkaW5nIG9mIGN1cnJlbnRseSBzZWxlY3RlZCBub2RlLFxuXHRcdFx0XHQvLyBtYWlubHkgdG8gYXZvaWQgZG9pbmcgYW4gYWpheCByZXF1ZXN0IG9uIGluaXRpYWwgcGFnZSBsb2FkXG5cdFx0XHRcdGlmKCQobm9kZSkuZGF0YSgnaWQnKSA9PSBsb2FkZWROb2RlSUQpIHJldHVybjtcblxuXHRcdFx0XHR2YXIgdXJsID0gJChub2RlKS5maW5kKCdhOmZpcnN0JykuYXR0cignaHJlZicpO1xuXHRcdFx0XHRpZih1cmwgJiYgdXJsICE9ICcjJykge1xuXHRcdFx0XHRcdC8vIHN0cmlwIHBvc3NpYmxlIHF1ZXJ5c3RyaW5ncyBmcm9tIHRoZSB1cmwgdG8gYXZvaWQgZHVwbGljYXRlaW5nIGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaFxuXHRcdFx0XHRcdHVybCA9IHVybC5zcGxpdCgnPycpWzBdO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIERlc2VsZWN0IGFsbCBub2RlcyAod2lsbCBiZSByZXNlbGVjdGVkIGFmdGVyIGxvYWQgYWNjb3JkaW5nIHRvIGZvcm0gc3RhdGUpXG5cdFx0XHRcdFx0c2VsZi5qc3RyZWUoJ2Rlc2VsZWN0X2FsbCcpO1xuXHRcdFx0XHRcdHNlbGYuanN0cmVlKCd1bmNoZWNrX2FsbCcpO1xuXG5cdFx0XHRcdFx0Ly8gRW5zdXJlIFVSTCBpcyBhYnNvbHV0ZSAoaW1wb3J0YW50IGZvciBJRSlcblx0XHRcdFx0XHRpZigkLnBhdGguaXNFeHRlcm5hbCgkKG5vZGUpLmZpbmQoJ2E6Zmlyc3QnKSkpIHVybCA9IHVybCA9ICQucGF0aC5tYWtlVXJsQWJzb2x1dGUodXJsLCAkKCdiYXNlJykuYXR0cignaHJlZicpKTtcblx0XHRcdFx0XHQvLyBSZXRhaW4gc2VhcmNoIHBhcmFtZXRlcnNcblx0XHRcdFx0XHRpZihkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2gpIHVybCA9ICQucGF0aC5hZGRTZWFyY2hQYXJhbXModXJsLCBkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSk7XG5cdFx0XHRcdFx0Ly8gTG9hZCBuZXcgcGFnZVxuXHRcdFx0XHRcdGNvbnRhaW5lci5sb2FkUGFuZWwodXJsKTtcdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYucmVtb3ZlRm9ybSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5jbXMtY29udGVudCAuY21zLWNvbnRlbnQtZmllbGRzJykuZW50d2luZSh7XG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHdpbmRvdy5kZWJ1ZykgY29uc29sZS5sb2coJ3JlZHJhdycsIHRoaXMuYXR0cignY2xhc3MnKSwgdGhpcy5nZXQoMCkpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLmNtcy1jb250ZW50IC5jbXMtY29udGVudC1oZWFkZXIsIC5jbXMtY29udGVudCAuY21zLWNvbnRlbnQtYWN0aW9ucycpLmVudHdpbmUoe1xuXHRcdHJlZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih3aW5kb3cuZGVidWcpIGNvbnNvbGUubG9nKCdyZWRyYXcnLCB0aGlzLmF0dHIoJ2NsYXNzJyksIHRoaXMuZ2V0KDApKTtcblxuXHRcdFx0Ly8gRml4IGRpbWVuc2lvbnMgdG8gYWN0dWFsIGV4dGVudHMsIGluIHByZXBhcmF0aW9uIGZvciBhIHJlbGF5b3V0IHZpYSBqc2xheW91dC5cblx0XHRcdHRoaXMuaGVpZ2h0KCdhdXRvJyk7XG5cdFx0XHR0aGlzLmhlaWdodCh0aGlzLmlubmVySGVpZ2h0KCktdGhpcy5jc3MoJ3BhZGRpbmctdG9wJyktdGhpcy5jc3MoJ3BhZGRpbmctYm90dG9tJykpO1xuXHRcdH1cblx0fSk7XG5cblx0XG59KTtcbiIsIi8qKlxuICogRmlsZTogTGVmdEFuZE1haW4uRWRpdEZvcm0uanNcbiAqL1xuaW1wb3J0ICQgZnJvbSAnalF1ZXJ5JztcbmltcG9ydCBpMThuIGZyb20gJ2kxOG4nO1xuXG4vLyBDYW4ndCBiaW5kIHRoaXMgdGhyb3VnaCBqUXVlcnlcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uKGUpIHtcblx0dmFyIGZvcm0gPSAkKCcuY21zLWVkaXQtZm9ybScpO1xuXHRmb3JtLnRyaWdnZXIoJ2JlZm9yZXN1Ym1pdGZvcm0nKTtcblx0aWYoZm9ybS5pcygnLmNoYW5nZWQnKSAmJiAhIGZvcm0uaXMoJy5kaXNjYXJkY2hhbmdlcycpKSB7XG5cdFx0cmV0dXJuIGkxOG4uX3QoJ0xlZnRBbmRNYWluLkNPTkZJUk1VTlNBVkVEU0hPUlQnKTtcblx0fVxufTtcblxuJC5lbnR3aW5lKCdzcycsIGZ1bmN0aW9uKCQpe1xuXG5cdC8qKlxuXHQgKiBDbGFzczogLmNtcy1lZGl0LWZvcm1cblx0ICpcblx0ICogQmFzZSBlZGl0IGZvcm0sIHByb3ZpZGVzIGFqYXhpZmllZCBzYXZpbmdcblx0ICogYW5kIHJlbG9hZGluZyBpdHNlbGYgdGhyb3VnaCB0aGUgYWpheCByZXR1cm4gdmFsdWVzLlxuXHQgKiBUYWtlcyBjYXJlIG9mIHJlc2l6aW5nIHRhYnNldHMgd2l0aGluIHRoZSBsYXlvdXQgY29udGFpbmVyLlxuXHQgKlxuXHQgKiBDaGFuZ2UgdHJhY2tpbmcgaXMgZW5hYmxlZCBvbiBhbGwgZmllbGRzIHdpdGhpbiB0aGUgZm9ybS4gSWYgeW91IHdhbnRcblx0ICogdG8gZGlzYWJsZSBjaGFuZ2UgdHJhY2tpbmcgZm9yIGEgc3BlY2lmaWMgZmllbGQsIGFkZCBhIFwibm8tY2hhbmdlLXRyYWNrXCJcblx0ICogY2xhc3MgdG8gaXQuXG5cdCAqXG5cdCAqIEBuYW1lIHNzLkZvcm1fRWRpdEZvcm1cblx0ICogQHJlcXVpcmUganF1ZXJ5LmNoYW5nZXRyYWNrZXJcblx0ICpcblx0ICogRXZlbnRzOlxuXHQgKiAgYWpheHN1Ym1pdCAtIEZvcm0gaXMgYWJvdXQgdG8gYmUgc3VibWl0dGVkIHRocm91Z2ggYWpheFxuXHQgKiAgdmFsaWRhdGUgLSBDb250YWlucyB2YWxpZGF0aW9uIHJlc3VsdFxuXHQgKiAgbG9hZCAtIEZvcm0gaXMgYWJvdXQgdG8gYmUgbG9hZGVkIHRocm91Z2ggYWpheFxuXHQgKi9cblx0JCgnLmNtcy1lZGl0LWZvcm0nKS5lbnR3aW5lKC8qKiBAbGVuZHMgc3MuRm9ybV9FZGl0Rm9ybSAqL3tcblx0XHQvKipcblx0XHQgKiBWYXJpYWJsZTogUGxhY2Vob2xkZXJIdG1sXG5cdFx0ICogKFN0cmluZ18gSFRNTCB0ZXh0IHRvIHNob3cgd2hlbiBubyBmb3JtIGNvbnRlbnQgaXMgY2hvc2VuLlxuXHRcdCAqIFdpbGwgc2hvdyBpbnNpZGUgdGhlIDxmb3JtPiB0YWcuXG5cdFx0ICovXG5cdFx0UGxhY2Vob2xkZXJIdG1sOiAnJyxcblxuXHRcdC8qKlxuXHRcdCAqIFZhcmlhYmxlOiBDaGFuZ2VUcmFja2VyT3B0aW9uc1xuXHRcdCAqIChPYmplY3QpXG5cdFx0ICovXG5cdFx0Q2hhbmdlVHJhY2tlck9wdGlvbnM6IHtcblx0XHRcdGlnbm9yZUZpZWxkU2VsZWN0b3I6ICcubm8tY2hhbmdlLXRyYWNrLCAuc3MtdXBsb2FkIDppbnB1dCwgLmNtcy1uYXZpZ2F0b3IgOmlucHV0J1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBDb25zdHJ1Y3Rvcjogb25tYXRjaFxuXHRcdCAqL1xuXHRcdG9uYWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0Ly8gVHVybiBvZmYgYXV0b2NvbXBsZXRlIHRvIGZpeCB0aGUgYWNjZXNzIHRhYiByYW5kb21seSBzd2l0Y2hpbmcgcmFkaW8gYnV0dG9ucyBpbiBGaXJlZm94XG5cdFx0XHQvLyB3aGVuIHJlZnJlc2ggdGhlIHBhZ2Ugd2l0aCBhbiBhbmNob3IgdGFnIGluIHRoZSBVUkwuIEUuZzogL2FkbWluI1Jvb3RfQWNjZXNzLlxuXHRcdFx0Ly8gQXV0b2NvbXBsZXRlIGluIHRoZSBDTVMgYWxzbyBjYXVzZXMgc3RyYW5nZW5lc3MgaW4gb3RoZXIgYnJvd3NlcnMsXG5cdFx0XHQvLyBmaWxsaW5nIG91dCBzZWN0aW9ucyBvZiB0aGUgZm9ybSB0aGF0IHRoZSB1c2VyIGRvZXMgbm90IHdhbnQgdG8gYmUgZmlsbGVkIG91dCxcblx0XHRcdC8vIHNvIHRoaXMgdHVybnMgaXQgb2ZmIGZvciBhbGwgYnJvd3NlcnMuXG5cdFx0XHQvLyBTZWUgdGhlIGZvbGxvd2luZyBwYWdlIGZvciBkZW1vIGFuZCBleHBsYW5hdGlvbiBvZiB0aGUgRmlyZWZveCBidWc6XG5cdFx0XHQvLyAgaHR0cDovL3d3dy5yeWFuY3JhbWVyLmNvbS9qb3VybmFsL2VudHJpZXMvcmFkaW9fYnV0dG9uc19maXJlZm94L1xuXHRcdFx0dGhpcy5hdHRyKFwiYXV0b2NvbXBsZXRlXCIsIFwib2ZmXCIpO1xuXG5cdFx0XHR0aGlzLl9zZXR1cENoYW5nZVRyYWNrZXIoKTtcblxuXHRcdFx0Ly8gQ2F0Y2ggbmF2aWdhdGlvbiBldmVudHMgYmVmb3JlIHRoZXkgcmVhY2ggaGFuZGxlU3RhdGVDaGFuZ2UoKSxcblx0XHRcdC8vIGluIG9yZGVyIHRvIGF2b2lkIGNoYW5naW5nIHRoZSBtZW51IHN0YXRlIGlmIHRoZSBhY3Rpb24gaXMgY2FuY2VsbGVkIGJ5IHRoZSB1c2VyXG5cdFx0XHQvLyAkKCcuY21zLW1lbnUnKVxuXG5cdFx0XHQvLyBPcHRpb25hbGx5IGdldCB0aGUgZm9ybSBhdHRyaWJ1dGVzIGZyb20gZW1iZWRkZWQgZmllbGRzLCBzZWUgRm9ybS0+Zm9ybUh0bWxDb250ZW50KClcblx0XHRcdGZvcih2YXIgb3ZlcnJpZGVBdHRyIGluIHsnYWN0aW9uJzp0cnVlLCdtZXRob2QnOnRydWUsJ2VuY3R5cGUnOnRydWUsJ25hbWUnOnRydWV9KSB7XG5cdFx0XHRcdHZhciBlbCA9IHRoaXMuZmluZCgnOmlucHV0W25hbWU9JysgJ19mb3JtXycgKyBvdmVycmlkZUF0dHIgKyAnXScpO1xuXHRcdFx0XHRpZihlbCkge1xuXHRcdFx0XHRcdHRoaXMuYXR0cihvdmVycmlkZUF0dHIsIGVsLnZhbCgpKTtcblx0XHRcdFx0XHRlbC5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUT0RPXG5cdFx0XHQvLyAvLyBSZXdyaXRlICMgbGlua3Ncblx0XHRcdC8vIGh0bWwgPSBodG1sLnJlcGxhY2UoLyg8YVtePl0raHJlZiAqPSAqXCIpIy9nLCAnJDEnICsgd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qJC8sJycpICsgJyMnKTtcblx0XHRcdC8vXG5cdFx0XHQvLyAvLyBSZXdyaXRlIGlmcmFtZSBsaW5rcyAoZm9yIElFKVxuXHRcdFx0Ly8gaHRtbCA9IGh0bWwucmVwbGFjZSgvKDxpZnJhbWVbXj5dKnNyYz1cIikoW15cIl0rKShcIltePl0qPikvZywgJyQxJyArICQoJ2Jhc2UnKS5hdHRyKCdocmVmJykgKyAnJDIkMycpO1xuXG5cdFx0XHQvLyBTaG93IHZhbGlkYXRpb24gZXJyb3JzIGlmIG5lY2Vzc2FyeVxuXHRcdFx0aWYodGhpcy5oYXNDbGFzcygndmFsaWRhdGlvbmVycm9yJykpIHtcblx0XHRcdFx0Ly8gRW5zdXJlIHRoZSBmaXJzdCB2YWxpZGF0aW9uIGVycm9yIGlzIHZpc2libGVcblx0XHRcdFx0dmFyIHRhYkVycm9yID0gdGhpcy5maW5kKCcubWVzc2FnZS52YWxpZGF0aW9uLCAubWVzc2FnZS5yZXF1aXJlZCcpLmZpcnN0KCkuY2xvc2VzdCgnLnRhYicpO1xuXHRcdFx0XHQkKCcuY21zLWNvbnRhaW5lcicpLmNsZWFyQ3VycmVudFRhYlN0YXRlKCk7IC8vIGNsZWFyIHN0YXRlIHRvIGF2b2lkIG92ZXJyaWRlIGxhdGVyIG9uXG5cdFx0XHRcdHRhYkVycm9yLmNsb3Nlc3QoJy5zcy10YWJzZXQnKS50YWJzKCdvcHRpb24nLCAnYWN0aXZlJywgdGFiRXJyb3IuaW5kZXgoJy50YWInKSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvbnJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNoYW5nZXRyYWNrZXIoJ2Rlc3Ryb3knKTtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvbm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvbnVubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXHRcdHJlZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih3aW5kb3cuZGVidWcpIGNvbnNvbGUubG9nKCdyZWRyYXcnLCB0aGlzLmF0dHIoJ2NsYXNzJyksIHRoaXMuZ2V0KDApKTtcblxuXHRcdFx0Ly8gRm9yY2UgaW5pdGlhbGl6YXRpb24gb2YgdGFic2V0cyB0byBhdm9pZCBsYXlvdXQgZ2xpdGNoZXNcblx0XHRcdHRoaXMuYWRkKHRoaXMuZmluZCgnLmNtcy10YWJzZXQnKSkucmVkcmF3VGFicygpO1xuXHRcdFx0dGhpcy5maW5kKCcuY21zLWNvbnRlbnQtaGVhZGVyJykucmVkcmF3KCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uOiBfc2V0dXBDaGFuZ2VUcmFja2VyXG5cdFx0ICovXG5cdFx0X3NldHVwQ2hhbmdlVHJhY2tlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBEb24ndCBiaW5kIGFueSBldmVudHMgaGVyZSwgYXMgd2UgZG9udCByZXBsYWNlIHRoZVxuXHRcdFx0Ly8gZnVsbCA8Zm9ybT4gdGFnIGJ5IGFueSBhamF4IHVwZGF0ZXMgdGhleSB3b24ndCBhdXRvbWF0aWNhbGx5IHJlYXBwbHlcblx0XHRcdHRoaXMuY2hhbmdldHJhY2tlcih0aGlzLmdldENoYW5nZVRyYWNrZXJPcHRpb25zKCkpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBGdW5jdGlvbjogY29uZmlybVVuc2F2ZWRDaGFuZ2VzXG5cdFx0ICpcblx0XHQgKiBDaGVja3MgdGhlIGpxdWVyeS5jaGFuZ2V0cmFja2VyIHBsdWdpbiBzdGF0dXMgZm9yIHRoaXMgZm9ybSxcblx0XHQgKiBhbmQgYXNrcyB0aGUgdXNlciBmb3IgY29uZmlybWF0aW9uIHZpYSBhIGJyb3dzZXIgZGlhbG9nIGlmIGNoYW5nZXMgYXJlIGRldGVjdGVkLlxuXHRcdCAqIERvZXNuJ3QgY2FuY2VsIGFueSB1bmxvYWQgb3IgZm9ybSByZW1vdmFsIGV2ZW50cywgeW91J2xsIG5lZWQgdG8gaW1wbGVtZW50IHRoaXMgYmFzZWQgb24gdGhlIHJldHVyblxuXHRcdCAqIHZhbHVlIG9mIHRoaXMgbWVzc2FnZS5cblx0XHQgKlxuXHRcdCAqIElmIGNoYW5nZXMgYXJlIGNvbmZpcm1lZCBmb3IgZGlzY2FyZCwgdGhlICdjaGFuZ2VkJyBmbGFnIGlzIHJlc2V0LlxuXHRcdCAqXG5cdFx0ICogUmV0dXJuczpcblx0XHQgKiAgKEJvb2xlYW4pIEZBTFNFIGlmIHRoZSB1c2VyIHdhbnRzIHRvIGFib3J0IHdpdGggY2hhbmdlcyBwcmVzZW50LCBUUlVFIGlmIG5vIGNoYW5nZXMgYXJlIGRldGVjdGVkXG5cdFx0ICogIG9yIHRoZSB1c2VyIHdhbnRzIHRvIGRpc2NhcmQgdGhlbS5cblx0XHQgKi9cblx0XHRjb25maXJtVW5zYXZlZENoYW5nZXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdiZWZvcmVzdWJtaXRmb3JtJyk7XG5cdFx0XHRpZighdGhpcy5pcygnLmNoYW5nZWQnKSB8fCB0aGlzLmlzKCcuZGlzY2FyZGNoYW5nZXMnKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHZhciBjb25maXJtZWQgPSBjb25maXJtKGkxOG4uX3QoJ0xlZnRBbmRNYWluLkNPTkZJUk1VTlNBVkVEJykpO1xuXHRcdFx0aWYoY29uZmlybWVkKSB7XG5cdFx0XHRcdC8vIEVuc3VyZXMgdGhhdCBvbmNlIGEgZm9ybSBpcyBjb25maXJtZWQsIHN1YnNlcXVlbnRcblx0XHRcdFx0Ly8gY2hhbmdlcyB0byB0aGUgdW5kZXJseWluZyBmb3JtIGRvbid0IHRyaWdnZXJcblx0XHRcdFx0Ly8gYWRkaXRpb25hbCBjaGFuZ2UgY29uZmlybWF0aW9uIHJlcXVlc3RzXG5cdFx0XHRcdHRoaXMuYWRkQ2xhc3MoJ2Rpc2NhcmRjaGFuZ2VzJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY29uZmlybWVkO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBGdW5jdGlvbjogb25zdWJtaXRcblx0XHQgKlxuXHRcdCAqIFN1cHByZXNzIHN1Ym1pc3Npb24gdW5sZXNzIGl0IGlzIGhhbmRsZWQgdGhyb3VnaCBhamF4U3VibWl0KCkuXG5cdFx0ICovXG5cdFx0b25zdWJtaXQ6IGZ1bmN0aW9uKGUsIGJ1dHRvbikge1xuXHRcdFx0Ly8gT25seSBzdWJtaXQgaWYgYSBidXR0b24gaXMgcHJlc2VudC5cblx0XHRcdC8vIFRoaXMgc3VwcmVzc2VkIHN1Ym1pdHMgZnJvbSBFTlRFUiBrZXlzIGluIGlucHV0IGZpZWxkcyxcblx0XHRcdC8vIHdoaWNoIG1lYW5zIHRoZSBicm93c2VyIGF1dG8tc2VsZWN0cyB0aGUgZmlyc3QgYXZhaWxhYmxlIGZvcm0gYnV0dG9uLlxuXHRcdFx0Ly8gVGhpcyBtaWdodCBiZSBhbiB1bnJlbGF0ZWQgYnV0dG9uIG9mIHRoZSBmb3JtIGZpZWxkLFxuXHRcdFx0Ly8gb3IgYSBkZXN0cnVjdGl2ZSBhY3Rpb24gKGlmIFwic2F2ZVwiIGlzIG5vdCBhdmFpbGFibGUsIG9yIG5vdCBvbiBmaXJzdCBwb3NpdGlvbikuXG5cdFx0XHRpZih0aGlzLnByb3AoXCJ0YXJnZXRcIikgIT0gXCJfYmxhbmtcIikge1xuXHRcdFx0XHRpZihidXR0b24pIHRoaXMuY2xvc2VzdCgnLmNtcy1jb250YWluZXInKS5zdWJtaXRGb3JtKHRoaXMsIGJ1dHRvbik7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRnVuY3Rpb246IHZhbGlkYXRlXG5cdFx0ICpcblx0XHQgKiBIb29rIGluIChvcHRpb25hbCkgdmFsaWRhdGlvbiByb3V0aW5lcy5cblx0XHQgKiBDdXJyZW50bHkgY2xpZW50c2lkZSB2YWxpZGF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgb3V0IG9mIHRoZSBib3ggaW4gdGhlIENNUy5cblx0XHQgKlxuXHRcdCAqIFRvZG86XG5cdFx0ICogIFBsYWNlaG9sZGVyIGltcGxlbWVudGF0aW9uXG5cdFx0ICpcblx0XHQgKiBSZXR1cm5zOlxuXHRcdCAqICB7Ym9vbGVhbn1cblx0XHQgKi9cblx0XHR2YWxpZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaXNWYWxpZCA9IHRydWU7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3ZhbGlkYXRlJywge2lzVmFsaWQ6IGlzVmFsaWR9KTtcblxuXHRcdFx0cmV0dXJuIGlzVmFsaWQ7XG5cdFx0fSxcblx0XHQvKlxuXHRcdCAqIFRyYWNrIGZvY3VzIG9uIGh0bWxlZGl0b3IgZmllbGRzXG5cdFx0ICovXG5cdFx0J2Zyb20gLmh0bWxlZGl0b3InOiB7XG5cdFx0XHRvbmVkaXRvcmluaXQ6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdFx0ZmllbGQgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZmllbGQuaHRtbGVkaXRvcicpLFxuXHRcdFx0XHRcdGVkaXRvciA9IGZpZWxkLmZpbmQoJ3RleHRhcmVhLmh0bWxlZGl0b3InKS5nZXRFZGl0b3IoKS5nZXRJbnN0YW5jZSgpO1xuXG5cdFx0XHRcdC8vIFRpbnlNQ0UgNCB3aWxsIGFkZCBhIGZvY3VzIGV2ZW50LCBidXQgZm9yIG5vdywgdXNlIGNsaWNrXG5cdFx0XHRcdGVkaXRvci5vbkNsaWNrLmFkZChmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRzZWxmLnNhdmVGaWVsZEZvY3VzKGZpZWxkLmF0dHIoJ2lkJykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qXG5cdFx0ICogVHJhY2sgZm9jdXMgb24gaW5wdXRzXG5cdFx0ICovXG5cdFx0J2Zyb20gLmNtcy1lZGl0LWZvcm0gOmlucHV0Om5vdCg6c3VibWl0KSc6IHtcblx0XHRcdG9uY2xpY2s6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR0aGlzLnNhdmVGaWVsZEZvY3VzKCQoZS50YXJnZXQpLmF0dHIoJ2lkJykpO1xuXHRcdFx0fSxcblx0XHRcdG9uZm9jdXM6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR0aGlzLnNhdmVGaWVsZEZvY3VzKCQoZS50YXJnZXQpLmF0dHIoJ2lkJykpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgKiBUcmFjayBmb2N1cyBvbiB0cmVlZHJvcGRvd25maWVsZHMuXG5cdFx0ICovXG5cdFx0J2Zyb20gLmNtcy1lZGl0LWZvcm0gLnRyZWVkcm9wZG93biAqJzoge1xuXHRcdFx0b25mb2N1c2luOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0dmFyIGZpZWxkID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmZpZWxkLnRyZWVkcm9wZG93bicpO1xuXHRcdFx0XHR0aGlzLnNhdmVGaWVsZEZvY3VzKGZpZWxkLmF0dHIoJ2lkJykpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgKiBUcmFjayBmb2N1cyBvbiBjaG9zZW4gc2VsZWN0c1xuXHRcdCAqL1xuXHRcdCdmcm9tIC5jbXMtZWRpdC1mb3JtIC5kcm9wZG93biAuY2h6bi1jb250YWluZXIgYSc6IHtcblx0XHRcdG9uZm9jdXNpbjogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdHZhciBmaWVsZCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5maWVsZC5kcm9wZG93bicpO1xuXHRcdFx0XHR0aGlzLnNhdmVGaWVsZEZvY3VzKGZpZWxkLmF0dHIoJ2lkJykpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgKiBSZXN0b3JlIGZpZWxkcyBhZnRlciB0YWJzIGFyZSByZXN0b3JlZFxuXHRcdCAqL1xuXHRcdCdmcm9tIC5jbXMtY29udGFpbmVyJzoge1xuXHRcdFx0b250YWJzdGF0ZXJlc3RvcmVkOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0dGhpcy5yZXN0b3JlRmllbGRGb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgKiBTYXZlcyBmb2N1cyBpbiBXaW5kb3cgc2Vzc2lvbiBzdG9yYWdlIHNvIGl0IHRoYXQgY2FuIGJlIHJlc3RvcmVkIG9uIHBhZ2UgbG9hZFxuXHRcdCAqL1xuXHRcdHNhdmVGaWVsZEZvY3VzOiBmdW5jdGlvbihzZWxlY3RlZCl7XG5cdFx0XHRpZih0eXBlb2Yod2luZG93LnNlc3Npb25TdG9yYWdlKT09XCJ1bmRlZmluZWRcIiB8fCB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UgPT09IG51bGwpIHJldHVybjtcblxuXHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdpZCcpLFxuXHRcdFx0XHRmb2N1c0VsZW1lbnRzID0gW107XG5cblx0XHRcdGZvY3VzRWxlbWVudHMucHVzaCh7XG5cdFx0XHRcdGlkOmlkLFxuXHRcdFx0XHRzZWxlY3RlZDpzZWxlY3RlZFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmKGZvY3VzRWxlbWVudHMpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShpZCwgSlNPTi5zdHJpbmdpZnkoZm9jdXNFbGVtZW50cykpO1xuXHRcdFx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0XHRcdGlmIChlcnIuY29kZSA9PT0gRE9NRXhjZXB0aW9uLlFVT1RBX0VYQ0VFREVEX0VSUiAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHQvLyBJZiB0aGlzIGZhaWxzIHdlIGlnbm9yZSB0aGUgZXJyb3IgYXMgdGhlIG9ubHkgaXNzdWUgaXMgdGhhdCBpdFxuXHRcdFx0XHRcdFx0Ly8gZG9lcyBub3QgcmVtZW1iZXIgdGhlIGZvY3VzIHN0YXRlLlxuXHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIFNhZmFyaSBidWcgd2hpY2ggaGFwcGVucyB3aGVuIHByaXZhdGUgYnJvd3NpbmcgaXMgZW5hYmxlZC5cblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogU2V0IGZvY3VzIG9yIHdpbmRvdyB0byBwcmV2aW91c2x5IHNhdmVkIGZpZWxkcy5cblx0XHQgKiBSZXF1aXJlcyBIVE1MNSBzZXNzaW9uU3RvcmFnZSBzdXBwb3J0LlxuXHRcdCAqXG5cdFx0ICogTXVzdCBmb2xsb3cgdGFiIHJlc3RvcmF0aW9uLCBhcyByZWxpYW50IG9uIGFjdGl2ZSB0YWJcblx0XHQgKi9cblx0XHRyZXN0b3JlRmllbGRGb2N1czogZnVuY3Rpb24oKXtcblx0XHRcdGlmKHR5cGVvZih3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpPT1cInVuZGVmaW5lZFwiIHx8IHdpbmRvdy5zZXNzaW9uU3RvcmFnZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdGhhc1Nlc3Npb25TdG9yYWdlID0gKHR5cGVvZih3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIT09XCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpLFxuXHRcdFx0XHRzZXNzaW9uRGF0YSA9IGhhc1Nlc3Npb25TdG9yYWdlID8gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5hdHRyKCdpZCcpKSA6IG51bGwsXG5cdFx0XHRcdHNlc3Npb25TdGF0ZXMgPSBzZXNzaW9uRGF0YSA/IEpTT04ucGFyc2Uoc2Vzc2lvbkRhdGEpIDogZmFsc2UsXG5cdFx0XHRcdGVsZW1lbnRJRCxcblx0XHRcdFx0dGFiYmVkID0gKHRoaXMuZmluZCgnLnNzLXRhYnNldCcpLmxlbmd0aCAhPT0gMCksXG5cdFx0XHRcdGFjdGl2ZVRhYixcblx0XHRcdFx0ZWxlbWVudFRhYixcblx0XHRcdFx0dG9nZ2xlQ29tcG9zaXRlLFxuXHRcdFx0XHRzY3JvbGxZO1xuXG5cdFx0XHRpZihoYXNTZXNzaW9uU3RvcmFnZSAmJiBzZXNzaW9uU3RhdGVzLmxlbmd0aCA+IDApe1xuXHRcdFx0XHQkLmVhY2goc2Vzc2lvblN0YXRlcywgZnVuY3Rpb24oaSwgc2Vzc2lvblN0YXRlKSB7XG5cdFx0XHRcdFx0aWYoc2VsZi5pcygnIycgKyBzZXNzaW9uU3RhdGUuaWQpKXtcblx0XHRcdFx0XHRcdGVsZW1lbnRJRCA9ICQoJyMnICsgc2Vzc2lvblN0YXRlLnNlbGVjdGVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50IElEcyBzYXZlZCBpbiBzZXNzaW9uIHN0YXRlcyBkb24ndCBtYXRjaCB1cCB0byBhbnl0aGluZyBpbiB0aGlzIHBhcnRpY3VsYXIgZm9ybVxuXHRcdFx0XHQvLyB0aGF0IHByb2JhYmx5IG1lYW5zIHdlIGhhdmVuJ3QgZW5jb3VudGVyZWQgdGhpcyBmb3JtIHlldCwgc28gZm9jdXMgb24gdGhlIGZpcnN0IGlucHV0XG5cdFx0XHRcdGlmKCQoZWxlbWVudElEKS5sZW5ndGggPCAxKXtcblx0XHRcdFx0XHR0aGlzLmZvY3VzRmlyc3RJbnB1dCgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjdGl2ZVRhYiA9ICQoZWxlbWVudElEKS5jbG9zZXN0KCcuc3MtdGFic2V0JykuZmluZCgnLnVpLXRhYnMtbmF2IC51aS10YWJzLWFjdGl2ZSAudWktdGFicy1hbmNob3InKS5hdHRyKCdpZCcpO1xuXHRcdFx0XHRlbGVtZW50VGFiICA9ICd0YWItJyArICQoZWxlbWVudElEKS5jbG9zZXN0KCcuc3MtdGFic2V0IC51aS10YWJzLXBhbmVsJykuYXR0cignaWQnKTtcblxuXHRcdFx0XHQvLyBMYXN0IGZvY3Vzc2VkIGVsZW1lbnQgZGlmZmVycyB0byBsYXN0IHNlbGVjdGVkIHRhYiwgZG8gbm90aGluZ1xuXHRcdFx0XHRpZih0YWJiZWQgJiYgZWxlbWVudFRhYiAhPT0gYWN0aXZlVGFiKXtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0b2dnbGVDb21wb3NpdGUgPSAkKGVsZW1lbnRJRCkuY2xvc2VzdCgnLnRvZ2dsZWNvbXBvc2l0ZScpO1xuXG5cdFx0XHRcdC8vUmVvcGVuIHRvZ2dsZSBmaWVsZHNcblx0XHRcdFx0aWYodG9nZ2xlQ29tcG9zaXRlLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRcdHRvZ2dsZUNvbXBvc2l0ZS5hY2NvcmRpb24oJ2FjdGl2YXRlJywgdG9nZ2xlQ29tcG9zaXRlLmZpbmQoJy51aS1hY2NvcmRpb24taGVhZGVyJykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9DYWxjdWxhdGUgcG9zaXRpb24gZm9yIHNjcm9sbFxuXHRcdFx0XHRzY3JvbGxZID0gJChlbGVtZW50SUQpLnBvc2l0aW9uKCkudG9wO1xuXG5cdFx0XHRcdC8vRmFsbCBiYWNrIHRvIG5lYXJlc3QgdmlzaWJsZSBlbGVtZW50IGlmIGhpZGRlbiAoZm9yIHNlbGVjdCB0eXBlIGZpZWxkcylcblx0XHRcdFx0aWYoISQoZWxlbWVudElEKS5pcygnOnZpc2libGUnKSl7XG5cdFx0XHRcdFx0ZWxlbWVudElEID0gJyMnICsgJChlbGVtZW50SUQpLmNsb3Nlc3QoJy5maWVsZCcpLmF0dHIoJ2lkJyk7XG5cdFx0XHRcdFx0c2Nyb2xsWSA9ICQoZWxlbWVudElEKS5wb3NpdGlvbigpLnRvcDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vc2V0IGZvY3VzIHRvIGZvY3VzIHZhcmlhYmxlIGlmIGVsZW1lbnQgZm9jdXNhYmxlXG5cdFx0XHRcdCQoZWxlbWVudElEKS5mb2N1cygpO1xuXG5cdFx0XHRcdC8vIFNjcm9sbCBmYWxsYmFjayB3aGVuIGVsZW1lbnQgaXMgbm90IGZvY3VzYWJsZVxuXHRcdFx0XHQvLyBPbmx5IHNjcm9sbCBpZiBlbGVtZW50IGF0IGxlYXN0IGhhbGYgd2F5IGRvd24gd2luZG93XG5cdFx0XHRcdGlmKHNjcm9sbFkgPiAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyKXtcblx0XHRcdFx0XHRzZWxmLmZpbmQoJy5jbXMtY29udGVudC1maWVsZHMnKS5zY3JvbGxUb3Aoc2Nyb2xsWSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgc2Vzc2lvbiBzdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWQgb3IgdGhlcmUgaXMgbm90aGluZyBzdG9yZWQgeWV0LCBmb2N1cyBvbiB0aGUgZmlyc3QgaW5wdXRcblx0XHRcdFx0dGhpcy5mb2N1c0ZpcnN0SW5wdXQoKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIFNraXAgaWYgYW4gZWxlbWVudCBpbiB0aGUgZm9ybSBpcyBhbHJlYWR5IGZvY3VzZWQuIEV4Y2x1ZGUgZWxlbWVudHMgd2hpY2ggc3BlY2lmaWNhbGx5XG5cdFx0ICogb3B0LW91dCBvZiB0aGlzIGJlaGF2aW91ciB2aWEgXCJkYXRhLXNraXAtYXV0b2ZvY3VzXCIuIFRoaXMgb3B0LW91dCBpcyB1c2VmdWwgaWYgdGhlXG5cdFx0ICogZmlyc3QgdmlzaWJsZSBmaWVsZCBpcyBzaG93biBmYXIgZG93biBhIHNjcm9sbGFibGUgYXJlYSwgZm9yIGV4YW1wbGUgZm9yIHRoZSBwYWdpbmF0aW9uXG5cdFx0ICogaW5wdXQgZmllbGQgYWZ0ZXIgYSBsb25nIEdyaWRGaWVsZCBsaXN0aW5nLlxuXHRcdCAqL1xuXHRcdGZvY3VzRmlyc3RJbnB1dDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZpbmQoJzppbnB1dDpub3QoOnN1Ym1pdClbZGF0YS1za2lwLWF1dG9mb2N1cyE9XCJ0cnVlXCJdJykuZmlsdGVyKCc6dmlzaWJsZTpmaXJzdCcpLmZvY3VzKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogQ2xhc3M6IC5jbXMtZWRpdC1mb3JtIC5BY3Rpb25zIDpzdWJtaXRcblx0ICpcblx0ICogQWxsIGJ1dHRvbnMgaW4gdGhlIHJpZ2h0IENNUyBmb3JtIGdvIHRocm91Z2ggaGVyZSBieSBkZWZhdWx0LlxuXHQgKiBXZSBuZWVkIHRoaXMgb25jbGljayBvdmVybG9hZGluZyBiZWNhdXNlIHdlIGNhbid0IGdldCB0byB0aGVcblx0ICogY2xpY2tlZCBidXR0b24gZnJvbSBhIGZvcm0ub25zdWJtaXQgZXZlbnQuXG5cdCAqL1xuXHQkKCcuY21zLWVkaXQtZm9ybSAuQWN0aW9ucyBpbnB1dC5hY3Rpb25bdHlwZT1zdWJtaXRdLCAuY21zLWVkaXQtZm9ybSAuQWN0aW9ucyBidXR0b24uYWN0aW9uJykuZW50d2luZSh7XG5cdFx0LyoqXG5cdFx0ICogRnVuY3Rpb246IG9uY2xpY2tcblx0XHQgKi9cblx0XHRvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHQvLyBDb25maXJtYXRpb24gb24gZGVsZXRlLlxuXHRcdFx0aWYoXG5cdFx0XHRcdHRoaXMuaGFzQ2xhc3MoJ2dyaWRmaWVsZC1idXR0b24tZGVsZXRlJylcblx0XHRcdFx0JiYgIWNvbmZpcm0oaTE4bi5fdCgnVEFCTEVGSUVMRC5ERUxFVEVDT05GSVJNTUVTU0FHRScpKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZighdGhpcy5pcygnOmRpc2FibGVkJykpIHtcblx0XHRcdFx0dGhpcy5wYXJlbnRzKCdmb3JtJykudHJpZ2dlcignc3VibWl0JywgW3RoaXNdKTtcblx0XHRcdH1cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBJZiB3ZSd2ZSBhIGhpc3Rvcnkgc3RhdGUgdG8gZ28gYmFjayB0bywgZ28gYmFjaywgb3RoZXJ3aXNlIGZhbGwgYmFjayB0b1xuXHQgKiBzdWJtaXR0aW5nIHRoZSBmb3JtIHdpdGggdGhlICdkb0NhbmNlbCcgYWN0aW9uLlxuXHQgKi9cblx0JCgnLmNtcy1lZGl0LWZvcm0gLkFjdGlvbnMgaW5wdXQuYWN0aW9uW3R5cGU9c3VibWl0XS5zcy11aS1hY3Rpb24tY2FuY2VsLCAuY21zLWVkaXQtZm9ybSAuQWN0aW9ucyBidXR0b24uYWN0aW9uLnNzLXVpLWFjdGlvbi1jYW5jZWwnKS5lbnR3aW5lKHtcblx0XHRvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZiAoSGlzdG9yeS5nZXRTdGF0ZUJ5SW5kZXgoMSkpIHtcblx0XHRcdFx0SGlzdG9yeS5iYWNrKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnBhcmVudHMoJ2Zvcm0nKS50cmlnZ2VyKCdzdWJtaXQnLCBbdGhpc10pO1xuXHRcdFx0fVxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fSk7XG5cblx0LyoqXG5cdCAqIEhpZGUgdGFicyB3aGVuIG9ubHkgb25lIGlzIGF2YWlsYWJsZS5cblx0ICogU3BlY2lhbCBjYXNlIGlzIGFjdGlvbnRhYnMgLSB0YWJzIGJldHdlZW4gYnV0dG9ucywgd2hlcmUgd2Ugd2FudCB0byBoYXZlXG5cdCAqIGV4dHJhIG9wdGlvbnMgaGlkZGVuIHdpdGhpbiBhIHRhYiAoZXZlbiBpZiBvbmx5IG9uZSkgYnkgZGVmYXVsdC5cblx0ICovXG5cdCQoJy5jbXMtZWRpdC1mb3JtIC5zcy10YWJzZXQnKS5lbnR3aW5lKHtcblx0XHRvbm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5oYXNDbGFzcygnc3MtdWktYWN0aW9uLXRhYnNldCcpKSB7XG5cdFx0XHRcdHZhciB0YWJzID0gdGhpcy5maW5kKFwiPiB1bDpmaXJzdFwiKTtcblxuXHRcdFx0XHRpZih0YWJzLmNoaWxkcmVuKFwibGlcIikubGVuZ3RoID09IDEpIHtcblx0XHRcdFx0XHR0YWJzLmhpZGUoKS5wYXJlbnQoKS5hZGRDbGFzcyhcInNzLXRhYnNldC10YWJzaGlkZGVuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvbnVubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9XG5cdH0pO1xuXG59KTtcbiIsIi8qKlxuICogRW5hYmxlIHRvZ2dsaW5nIChzaG93L2hpZGUpIG9mIHRoZSBmaWVsZCdzIGRlc2NyaXB0aW9uLlxuICovXG5cbmltcG9ydCAkIGZyb20gJ2pRdWVyeSc7XG5cbiQuZW50d2luZSgnc3MnLCBmdW5jdGlvbiAoJCkge1xuXG4gICAgJCgnLmNtcy1kZXNjcmlwdGlvbi10b2dnbGUnKS5lbnR3aW5lKHtcbiAgICAgICAgb25hZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzaG93biA9IGZhbHNlLCAvLyBDdXJyZW50IHN0YXRlIG9mIHRoZSBkZXNjcmlwdGlvbi5cbiAgICAgICAgICAgICAgICBmaWVsZElkID0gdGhpcy5wcm9wKCdpZCcpLnN1YnN0cigwLCB0aGlzLnByb3AoJ2lkJykuaW5kZXhPZignX0hvbGRlcicpKSxcbiAgICAgICAgICAgICAgICAkdHJpZ2dlciA9IHRoaXMuZmluZCgnLmNtcy1kZXNjcmlwdGlvbi10cmlnZ2VyJyksIC8vIENsaWNrIHRhcmdldCBmb3IgdG9nZ2xpbmcgdGhlIGRlc2NyaXB0aW9uLlxuICAgICAgICAgICAgICAgICRkZXNjcmlwdGlvbiA9IHRoaXMuZmluZCgnLmRlc2NyaXB0aW9uJyk7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgZXZlbnRzIGJlaW5nIGFkZGVkLlxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoJ2Rlc2NyaXB0aW9uLXRvZ2dsZS1lbmFibGVkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIGEgY3VzdG9tIHRyaWdnZXIgaGFuJ3QgYmVlbiBzdXBwbGllZCB1c2UgYSBzZW5zaWJsZSBkZWZhdWx0LlxuICAgICAgICAgICAgaWYgKCR0cmlnZ2VyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyID0gdGhpc1xuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLm1pZGRsZUNvbHVtbicpXG4gICAgICAgICAgICAgICAgICAgIC5maXJzdCgpIC8vIEdldCB0aGUgZmlyc3QgbWlkZGxlQ29sdW1uIHNvIHdlIGRvbid0IGFkZCBtdWx0aXBsZSB0cmlnZ2VycyBvbiBjb21wb3NpdGUgZmllbGQgdHlwZXMuXG4gICAgICAgICAgICAgICAgICAgIC5hZnRlcignPGxhYmVsIGNsYXNzPVwicmlnaHRcIiBmb3I9XCInICsgZmllbGRJZCArICdcIj48YSBjbGFzcz1cImNtcy1kZXNjcmlwdGlvbi10cmlnZ2VyXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxzcGFuIGNsYXNzPVwiYnRuLWljb24taW5mb3JtYXRpb25cIj48L3NwYW4+PC9hPjwvbGFiZWw+JylcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnZGVzY3JpcHRpb24tdG9nZ2xlLWVuYWJsZWQnKTtcblxuICAgICAgICAgICAgLy8gVG9nZ2xlIG5leHQgZGVzY3JpcHRpb24gd2hlbiBidXR0b24gaXMgY2xpY2tlZC5cbiAgICAgICAgICAgICR0cmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRkZXNjcmlwdGlvbltzaG93biA/ICdoaWRlJyA6ICdzaG93J10oKTtcbiAgICAgICAgICAgICAgICBzaG93biA9ICFzaG93bjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBIaWRlIG5leHQgZGVzY3JpcHRpb24gYnkgZGVmYXVsdC5cbiAgICAgICAgICAgICRkZXNjcmlwdGlvbi5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7XG4iLCJpbXBvcnQgJCBmcm9tICdqUXVlcnknO1xuXG4kLmVudHdpbmUoJ3NzJywgZnVuY3Rpb24oJCkge1xuXHQvKipcblx0ICogQ29udmVydHMgYW4gaW5saW5lIGZpZWxkIGRlc2NyaXB0aW9uIGludG8gYSB0b29sdGlwXG5cdCAqIHdoaWNoIGlzIHNob3duIG9uIGhvdmVyIG92ZXIgYW55IHBhcnQgb2YgdGhlIGZpZWxkIGNvbnRhaW5lcixcblx0ICogYXMgd2VsbCBhcyB3aGVuIGZvY3VzaW5nIGludG8gYW4gaW5wdXQgZWxlbWVudCB3aXRoaW4gdGhlIGZpZWxkIGNvbnRhaW5lci5cblx0ICpcblx0ICogTm90ZSB0aGF0IHNvbWUgZmllbGRzIGRvbid0IGhhdmUgZGlzdGluY3QgZm9jdXNhYmxlXG5cdCAqIGlucHV0IGZpZWxkcyAoZS5nLiBHcmlkRmllbGQpLCBhbmQgYXJlbid0IGNvbXBhdGlibGVcblx0ICogd2l0aCBzaG93aW5nIHRvb2x0aXBzLlxuXHQgKi9cblx0JChcIi5jbXMgLmZpZWxkLmNtcy1kZXNjcmlwdGlvbi10b29sdGlwXCIpLmVudHdpbmUoe1xuXHRcdG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblxuXHRcdFx0dmFyIGRlc2NyaXB0aW9uRWwgPSB0aGlzLmZpbmQoJy5kZXNjcmlwdGlvbicpLCBpbnB1dEVsLCB0b29sdGlwRWw7XG5cdFx0XHRpZihkZXNjcmlwdGlvbkVsLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzXG5cdFx0XHRcdFx0Ly8gVE9ETyBSZW1vdmUgdGl0bGUgc2V0dGluZywgc2hvdWxkbid0IGJlIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdC5hdHRyKCd0aXRsZScsIGRlc2NyaXB0aW9uRWwudGV4dCgpKVxuXHRcdFx0XHRcdC50b29sdGlwKHtjb250ZW50OiBkZXNjcmlwdGlvbkVsLmh0bWwoKX0pO1xuXHRcdFx0XHRkZXNjcmlwdGlvbkVsLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH0pO1xuXG5cdCQoXCIuY21zIC5maWVsZC5jbXMtZGVzY3JpcHRpb24tdG9vbHRpcCA6aW5wdXRcIikuZW50d2luZSh7XG5cdFx0b25mb2N1c2luOiBmdW5jdGlvbihlKSB7XG5cdFx0XHR0aGlzLmNsb3Nlc3QoJy5maWVsZCcpLnRvb2x0aXAoJ29wZW4nKTtcblx0XHR9LFxuXHRcdG9uZm9jdXNvdXQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHRoaXMuY2xvc2VzdCgnLmZpZWxkJykudG9vbHRpcCgnY2xvc2UnKTtcblx0XHRcdH1cblx0fSk7XG5cbn0pO1xuIiwiLyoqXG4gKiBGaWxlOiBMZWZ0QW5kTWFpbi5MYXlvdXQuanNcbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqUXVlcnknO1xuXG4kLmZuLmxheW91dC5kZWZhdWx0cy5yZXNpemUgPSBmYWxzZTtcblxuLyoqXG4gKiBBY2NjZXNzIHRoZSBnbG9iYWwgdmFyaWFibGUgaW4gdGhlIHNhbWUgd2F5IHRoZSBwbHVnaW4gZG9lcyBpdC5cbiAqL1xuakxheW91dCA9ICh0eXBlb2YgakxheW91dCA9PT0gJ3VuZGVmaW5lZCcpID8ge30gOiBqTGF5b3V0O1xuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGdlbmVyYXRpbmcgbmV3IHR5cGUgb2YgYWxnb3JpdGhtIGZvciBvdXIgQ01TLlxuICpcbiAqIFNwZWMgcmVxdWlyZXMgYSBkZWZpbml0aW9uIG9mIHRocmVlIGNvbHVtbiBlbGVtZW50czpcbiAqIC0gYG1lbnVgIG9uIHRoZSBsZWZ0XG4gKiAtIGBjb250ZW50YCBhcmVhIGluIHRoZSBtaWRkbGUgKGluY2x1ZGVzIHRoZSBFZGl0Rm9ybSwgc2lkZSB0b29sIHBhbmVsLCBhY3Rpb25zLCBicmVhZGNydW1icyBhbmQgdGFicylcbiAqIC0gYHByZXZpZXdgIG9uIHRoZSByaWdodCAod2lsbCBiZSBzaG93biBpZiB0aGVyZSBpcyBlbm91Z2ggc3BhY2UpXG4gKlxuICogUmVxdWlyZWQgb3B0aW9uczpcbiAqIC0gYG1pbkNvbnRlbnRXaWR0aGA6IG1pbmltdW0gc2l6ZSBmb3IgdGhlIGNvbnRlbnQgZGlzcGxheSBhcyBsb25nIGFzIHRoZSBwcmV2aWV3IGlzIHZpc2libGVcbiAqIC0gYG1pblByZXZpZXdXaWR0aGA6IHByZXZpZXcgd2lsbCBub3QgYmUgZGlzcGxheWVkIGJlbG93IHRoaXMgc2l6ZVxuICogLSBgbW9kZWA6IG9uZSBvZiBcInNwbGl0XCIsIFwiY29udGVudFwiIG9yIFwicHJldmlld1wiXG4gKlxuICogVGhlIGFsZ29yaXRobSBmaXJzdCBjaGVja3Mgd2hpY2ggY29sdW1ucyBhcmUgdG8gYmUgdmlzaWJsZSBhbmQgd2hpY2ggaGlkZGVuLlxuICpcbiAqIEluIHRoZSBjYXNlIHdoZXJlIGJvdGggcHJldmlldyBhbmQgY29udGVudCBzaG91bGQgYmUgc2hvd24gaXQgZmlyc3QgdHJpZXMgdG8gYXNzaWduIGhhbGYgb2Ygbm9uLW1lbnUgc3BhY2UgdG9cbiAqIHByZXZpZXcgYW5kIHRoZSBvdGhlciBoYWxmIHRvIGNvbnRlbnQuIFRoZW4gaWYgdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBmb3IgZWl0aGVyIGNvbnRlbnQgb3IgcHJldmlldywgaXQgdHJpZXNcbiAqIHRvIGFsbG9jYXRlIHRoZSBtaW5pbXVtIGFjY2VwdGFibGUgc3BhY2UgdG8gdGhhdCBjb2x1bW4sIGFuZCB0aGUgcmVzdCB0byB0aGUgb3RoZXIgb25lLiBJZiB0aGUgbWluaW11bVxuICogcmVxdWlyZW1lbnRzIGFyZSBzdGlsbCBub3QgbWV0LCBpdCBmYWxscyBiYWNrIHRvIHNob3dpbmcgY29udGVudCBvbmx5LlxuICpcbiAqIEBwYXJhbSBzcGVjIEEgc3RydWN0dXJlIGRlZmluaW5nIGNvbHVtbnMgYW5kIHBhcmFtZXRlcnMgYXMgcGVyIGFib3ZlLlxuICovXG5qTGF5b3V0LnRocmVlQ29sdW1uQ29tcHJlc3NvciA9IGZ1bmN0aW9uIChzcGVjLCBvcHRpb25zKSB7XG5cdC8vIFNwZWMgc2FuaXR5IGNoZWNrcy5cblx0aWYgKHR5cGVvZiBzcGVjLm1lbnU9PT0ndW5kZWZpbmVkJyB8fFxuXHRcdHR5cGVvZiBzcGVjLmNvbnRlbnQ9PT0ndW5kZWZpbmVkJyB8fFxuXHRcdHR5cGVvZiBzcGVjLnByZXZpZXc9PT0ndW5kZWZpbmVkJykge1xuXHRcdHRocm93ICdTcGVjIGlzIGludmFsaWQuIFBsZWFzZSBwcm92aWRlIFwibWVudVwiLCBcImNvbnRlbnRcIiBhbmQgXCJwcmV2aWV3XCIgZWxlbWVudHMuJztcblx0fVxuXHRpZiAodHlwZW9mIG9wdGlvbnMubWluQ29udGVudFdpZHRoPT09J3VuZGVmaW5lZCcgfHxcblx0XHR0eXBlb2Ygb3B0aW9ucy5taW5QcmV2aWV3V2lkdGg9PT0ndW5kZWZpbmVkJyB8fFxuXHRcdHR5cGVvZiBvcHRpb25zLm1vZGU9PT0ndW5kZWZpbmVkJykge1xuXHRcdHRocm93ICdTcGVjIGlzIGludmFsaWQuIFBsZWFzZSBwcm92aWRlIFwibWluQ29udGVudFdpZHRoXCIsIFwibWluUHJldmlld1dpZHRoXCIsIFwibW9kZVwiJztcblx0fVxuXHRpZiAob3B0aW9ucy5tb2RlIT09J3NwbGl0JyAmJiBvcHRpb25zLm1vZGUhPT0nY29udGVudCcgJiYgb3B0aW9ucy5tb2RlIT09J3ByZXZpZXcnKSB7XG5cdFx0dGhyb3cgJ1NwZWMgaXMgaW52YWxpZC4gXCJtb2RlXCIgc2hvdWxkIGJlIGVpdGhlciBcInNwbGl0XCIsIFwiY29udGVudFwiIG9yIFwicHJldmlld1wiJztcblx0fVxuXG5cdC8vIEluc3RhbmNlIG9mIHRoZSBhbGdvcml0aG0gYmVpbmcgcHJvZHVjZWQuXG5cdHZhciBvYmogPSB7XG5cdFx0b3B0aW9uczogb3B0aW9uc1xuXHR9O1xuXG5cdC8vIEludGVybmFsIGNvbHVtbiBoYW5kbGVzLCBhbHNvIGltcGxlbWVudGluZyBsYXlvdXQuXG5cdHZhciBtZW51ID0gJC5qTGF5b3V0V3JhcChzcGVjLm1lbnUpLFxuXHRcdGNvbnRlbnQgPSAkLmpMYXlvdXRXcmFwKHNwZWMuY29udGVudCksXG5cdFx0cHJldmlldyA9ICQuakxheW91dFdyYXAoc3BlYy5wcmV2aWV3KTtcblxuXHQvKipcblx0ICogUmVxdWlyZWQgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9ucyBmb2xsb3cuXG5cdCAqIFJlZmVyIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9icmFtc3RlaW4vamxheW91dCNsYXlvdXQtYWxnb3JpdGhtcyBmb3IgdGhlIGludGVyZmFjZSBzcGVjLlxuXHQgKi9cblx0b2JqLmxheW91dCA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHR2YXIgc2l6ZSA9IGNvbnRhaW5lci5ib3VuZHMoKSxcblx0XHRcdGluc2V0cyA9IGNvbnRhaW5lci5pbnNldHMoKSxcblx0XHRcdHRvcCA9IGluc2V0cy50b3AsXG5cdFx0XHRib3R0b20gPSBzaXplLmhlaWdodCAtIGluc2V0cy5ib3R0b20sXG5cdFx0XHRsZWZ0ID0gaW5zZXRzLmxlZnQsXG5cdFx0XHRyaWdodCA9IHNpemUud2lkdGggLSBpbnNldHMucmlnaHQ7XG5cblx0XHR2YXIgbWVudVdpZHRoID0gc3BlYy5tZW51LndpZHRoKCksIFxuXHRcdFx0Y29udGVudFdpZHRoID0gMCxcblx0XHRcdHByZXZpZXdXaWR0aCA9IDA7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLm1vZGU9PT0ncHJldmlldycpIHtcblx0XHRcdC8vIEFsbCBub24tbWVudSBzcGFjZSBhbGxvY2F0ZWQgdG8gcHJldmlldy5cblx0XHRcdGNvbnRlbnRXaWR0aCA9IDA7XG5cdFx0XHRwcmV2aWV3V2lkdGggPSByaWdodCAtIGxlZnQgLSBtZW51V2lkdGg7XG5cdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMubW9kZT09PSdjb250ZW50Jykge1xuXHRcdFx0Ly8gQWxsIG5vbi1tZW51IHNwYWNlIGFsbG9jYXRlZCB0byBjb250ZW50LlxuXHRcdFx0Y29udGVudFdpZHRoID0gcmlnaHQgLSBsZWZ0IC0gbWVudVdpZHRoO1xuXHRcdFx0cHJldmlld1dpZHRoID0gMDtcblx0XHR9IGVsc2UgeyAvLyA9PT0nc3BsaXQnXG5cdFx0XHQvLyBTcGxpdCB2aWV3IC0gZmlyc3QgdHJ5IDUwLTUwIGRpc3RyaWJ1dGlvbi5cblx0XHRcdGNvbnRlbnRXaWR0aCA9IChyaWdodCAtIGxlZnQgLSBtZW51V2lkdGgpIC8gMjtcblx0XHRcdHByZXZpZXdXaWR0aCA9IHJpZ2h0IC0gbGVmdCAtIChtZW51V2lkdGggKyBjb250ZW50V2lkdGgpO1xuXG5cdFx0XHQvLyBJZiB2aW9sYXRpbmcgb25lIG9mIHRoZSBtaW5pbWEsIHRyeSB0byByZWFkanVzdCB0b3dhcmRzIHNhdGlzZnlpbmcgaXQuXG5cdFx0XHRpZiAoY29udGVudFdpZHRoIDwgdGhpcy5vcHRpb25zLm1pbkNvbnRlbnRXaWR0aCkge1xuXHRcdFx0XHRjb250ZW50V2lkdGggPSB0aGlzLm9wdGlvbnMubWluQ29udGVudFdpZHRoO1xuXHRcdFx0XHRwcmV2aWV3V2lkdGggPSByaWdodCAtIGxlZnQgLSAobWVudVdpZHRoICsgY29udGVudFdpZHRoKTtcblx0XHRcdH0gZWxzZSBpZiAocHJldmlld1dpZHRoIDwgdGhpcy5vcHRpb25zLm1pblByZXZpZXdXaWR0aCkge1xuXHRcdFx0XHRwcmV2aWV3V2lkdGggPSB0aGlzLm9wdGlvbnMubWluUHJldmlld1dpZHRoO1xuXHRcdFx0XHRjb250ZW50V2lkdGggPSByaWdodCAtIGxlZnQgLSAobWVudVdpZHRoICsgcHJldmlld1dpZHRoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgc3RpbGwgdmlvbGF0aW5nIG9uZSBvZiB0aGUgKG90aGVyKSBtaW5pbWEsIHJlbW92ZSB0aGUgcHJldmlldyBhbmQgYWxsb2NhdGUgZXZlcnl0aGluZyB0byBjb250ZW50LlxuXHRcdFx0aWYgKGNvbnRlbnRXaWR0aCA8IHRoaXMub3B0aW9ucy5taW5Db250ZW50V2lkdGggfHwgcHJldmlld1dpZHRoIDwgdGhpcy5vcHRpb25zLm1pblByZXZpZXdXaWR0aCkge1xuXHRcdFx0XHRjb250ZW50V2lkdGggPSByaWdodCAtIGxlZnQgLSBtZW51V2lkdGg7XG5cdFx0XHRcdHByZXZpZXdXaWR0aCA9IDA7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsY3VsYXRlIHdoYXQgY29sdW1ucyBhcmUgYWxyZWFkeSBoaWRkZW4gcHJlLWxheW91dFxuXHRcdHZhciBwcmVoaWRkZW4gPSB7XG5cdFx0XHRjb250ZW50OiBzcGVjLmNvbnRlbnQuaGFzQ2xhc3MoJ2NvbHVtbi1oaWRkZW4nKSxcblx0XHRcdHByZXZpZXc6IHNwZWMucHJldmlldy5oYXNDbGFzcygnY29sdW1uLWhpZGRlbicpXG5cdFx0fTtcblxuXHRcdC8vIENhbGN1bGF0ZSB3aGF0IGNvbHVtbnMgd2lsbCBiZSBoaWRkZW4gKHplcm8gd2lkdGgpIHBvc3QtbGF5b3V0XG5cdFx0dmFyIHBvc3RoaWRkZW4gPSB7XG5cdFx0XHRjb250ZW50OiBjb250ZW50V2lkdGggPT09IDAsXG5cdFx0XHRwcmV2aWV3OiBwcmV2aWV3V2lkdGggPT09IDBcblx0XHR9O1xuXG5cdFx0Ly8gQXBwbHkgY2xhc3NlcyBmb3IgZWxlbWVudHMgdGhhdCBtaWdodCBub3QgYmUgdmlzaWJsZSBhdCBhbGwuXG5cdFx0c3BlYy5jb250ZW50LnRvZ2dsZUNsYXNzKCdjb2x1bW4taGlkZGVuJywgcG9zdGhpZGRlbi5jb250ZW50KTtcblx0XHRzcGVjLnByZXZpZXcudG9nZ2xlQ2xhc3MoJ2NvbHVtbi1oaWRkZW4nLCBwb3N0aGlkZGVuLnByZXZpZXcpO1xuXG5cdFx0Ly8gQXBwbHkgdGhlIHdpZHRocyB0byBjb2x1bW5zLCBhbmQgY2FsbCBzdWJvcmRpbmF0ZSBsYXlvdXRzIHRvIGFycmFuZ2UgdGhlIGNoaWxkcmVuLlxuXHRcdG1lbnUuYm91bmRzKHsneCc6IGxlZnQsICd5JzogdG9wLCAnaGVpZ2h0JzogYm90dG9tIC0gdG9wLCAnd2lkdGgnOiBtZW51V2lkdGh9KTtcblx0XHRtZW51LmRvTGF5b3V0KCk7XG5cblx0XHRsZWZ0ICs9IG1lbnVXaWR0aDtcblxuXHRcdGNvbnRlbnQuYm91bmRzKHsneCc6IGxlZnQsICd5JzogdG9wLCAnaGVpZ2h0JzogYm90dG9tIC0gdG9wLCAnd2lkdGgnOiBjb250ZW50V2lkdGh9KTtcblx0XHRpZiAoIXBvc3RoaWRkZW4uY29udGVudCkgY29udGVudC5kb0xheW91dCgpO1xuXG5cdFx0bGVmdCArPSBjb250ZW50V2lkdGg7XG5cblx0XHRwcmV2aWV3LmJvdW5kcyh7J3gnOiBsZWZ0LCAneSc6IHRvcCwgJ2hlaWdodCc6IGJvdHRvbSAtIHRvcCwgJ3dpZHRoJzogcHJldmlld1dpZHRofSk7XG5cdFx0aWYgKCFwb3N0aGlkZGVuLnByZXZpZXcpIHByZXZpZXcuZG9MYXlvdXQoKTtcblxuXHRcdGlmIChwb3N0aGlkZGVuLmNvbnRlbnQgIT09IHByZWhpZGRlbi5jb250ZW50KSBzcGVjLmNvbnRlbnQudHJpZ2dlcignY29sdW1udmlzaWJpbGl0eWNoYW5nZWQnKTtcblx0XHRpZiAocG9zdGhpZGRlbi5wcmV2aWV3ICE9PSBwcmVoaWRkZW4ucHJldmlldykgc3BlYy5wcmV2aWV3LnRyaWdnZXIoJ2NvbHVtbnZpc2liaWxpdHljaGFuZ2VkJyk7XG5cblx0XHQvLyBDYWxjdWxhdGUgd2hldGhlciBwcmV2aWV3IGlzIHBvc3NpYmxlIGluIHNwbGl0IG1vZGVcblx0XHRpZiAoY29udGVudFdpZHRoICsgcHJldmlld1dpZHRoIDwgb3B0aW9ucy5taW5Db250ZW50V2lkdGggKyBvcHRpb25zLm1pblByZXZpZXdXaWR0aCkge1xuXHRcdFx0c3BlYy5wcmV2aWV3LnRyaWdnZXIoJ2Rpc2FibGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3BlYy5wcmV2aWV3LnRyaWdnZXIoJ2VuYWJsZScpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb250YWluZXI7XG5cdH07XG5cblx0LyoqXG5cdCAqIEhlbHBlciB0byBnZW5lcmF0ZSB0aGUgcmVxdWlyZWQgYHByZWZlcnJlZGAsIGBtaW5pbXVtYCBhbmQgYG1heGltdW1gIGludGVyZmFjZSBmdW5jdGlvbnMuXG5cdCAqL1xuXHRmdW5jdGlvbiB0eXBlTGF5b3V0KHR5cGUpIHtcblx0XHR2YXIgZnVuYyA9IHR5cGUgKyAnU2l6ZSc7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuXHRcdFx0dmFyIG1lbnVTaXplID0gbWVudVtmdW5jXSgpLFxuXHRcdFx0XHRjb250ZW50U2l6ZSA9IGNvbnRlbnRbZnVuY10oKSxcblx0XHRcdFx0cHJldmlld1NpemUgPSBwcmV2aWV3W2Z1bmNdKCksXG5cdFx0XHRcdGluc2V0cyA9IGNvbnRhaW5lci5pbnNldHMoKTtcblxuXHRcdFx0d2lkdGggPSBtZW51U2l6ZS53aWR0aCArIGNvbnRlbnRTaXplLndpZHRoICsgcHJldmlld1NpemUud2lkdGg7XG5cdFx0XHRoZWlnaHQgPSBNYXRoLm1heChtZW51U2l6ZS5oZWlnaHQsIGNvbnRlbnRTaXplLmhlaWdodCwgcHJldmlld1NpemUuaGVpZ2h0KTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0J3dpZHRoJzogaW5zZXRzLmxlZnQgKyBpbnNldHMucmlnaHQgKyB3aWR0aCxcblx0XHRcdFx0J2hlaWdodCc6IGluc2V0cy50b3AgKyBpbnNldHMuYm90dG9tICsgaGVpZ2h0XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cblxuXHQvLyBHZW5lcmF0ZSBpbnRlcmZhY2UgZnVuY3Rpb25zLlxuXHRvYmoucHJlZmVycmVkID0gdHlwZUxheW91dCgncHJlZmVycmVkJyk7XG5cdG9iai5taW5pbXVtID0gdHlwZUxheW91dCgnbWluaW11bScpO1xuXHRvYmoubWF4aW11bSA9IHR5cGVMYXlvdXQoJ21heGltdW0nKTtcblxuXHRyZXR1cm4gb2JqO1xufTtcbiIsImltcG9ydCAkIGZyb20gJ2pRdWVyeSc7XG5cbiQuZW50d2luZSgnc3MnLCBmdW5jdGlvbigkKXtcblxuXHQvKipcblx0ICogVmVydGljYWwgQ01TIG1lbnUgd2l0aCB0d28gbGV2ZWxzLCBidWlsdCBmcm9tIGEgbmVzdGVkIHVub3JkZXJlZCBsaXN0LlxuXHQgKiBUaGUgKG9wdGlvbmFsKSBzZWNvbmQgbGV2ZWwgaXMgY29sbGFwc2libGUsIGhpZGluZyBpdHMgY2hpbGRyZW4uXG5cdCAqIFRoZSB3aG9sZSBtZW51IChpbmNsdWRpbmcgc2Vjb25kIGxldmVscykgaXMgY29sbGFwc2libGUgYXMgd2VsbCxcblx0ICogZXhwb3Npbmcgb25seSBhIHByZXZpZXcgZm9yIGV2ZXJ5IG1lbnUgaXRlbSBpbiBvcmRlciB0byBzYXZlIHNwYWNlLlxuXHQgKiBJbiB0aGlzIFwicHJldmlldy9jb2xsYXBzZWRcIiBtb2RlLCB0aGUgc2Vjb25kYXJ5IG1lbnUgaG92ZXJzIG92ZXIgdGhlIG1lbnUgaXRlbSxcblx0ICogcmF0aGVyIHRoYW4gZXhwYW5kaW5nIGl0LlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKlxuXHQgKiA8dWwgY2xhc3M9XCJjbXMtbWVudS1saXN0XCI+XG5cdCAqICA8bGk+PGEgaHJlZj1cIiNcIj5JdGVtIDE8L2E+PC9saT5cblx0ICogIDxsaSBjbGFzcz1cImN1cnJlbnQgb3BlbmVkXCI+XG5cdCAqICAgIDxhIGhyZWY9XCIjXCI+SXRlbSAyPC9hPlxuXHQgKiAgICA8dWw+XG5cdCAqICAgICAgPGxpIGNsYXNzPVwiY3VycmVudCBvcGVuZWRcIj48YSBocmVmPVwiI1wiPkl0ZW0gMi4xPC9hPjwvbGk+XG5cdCAqICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+SXRlbSAyLjI8L2E+PC9saT5cblx0ICogICAgPC91bD5cblx0ICogIDwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqXG5cdCAqIEN1c3RvbSBFdmVudHM6XG5cdCAqIC0gJ3NlbGVjdCc6IEZpcmVzIHdoZW4gYSBtZW51IGl0ZW0gaXMgc2VsZWN0ZWQgKG9uIGFueSBsZXZlbCkuXG5cdCAqL1xuXHQkKCcuY21zLXBhbmVsLmNtcy1tZW51JykuZW50d2luZSh7XG5cdFx0dG9nZ2xlUGFuZWw6IGZ1bmN0aW9uKGRvRXhwYW5kLCBzaWxlbnQsIGRvU2F2ZVN0YXRlKSB7XG5cdFx0XHQvL2FwcGx5IG9yIHVuYXBwbHkgdGhlIGZseW91dCBmb3JtYXR0aW5nLCBzaG91bGQgb25seSBhcHBseSB0byBjbXMtbWVudS1saXN0IHdoZW4gdGhlIGN1cnJlbnQgY29sbGFwc2VkIHBhbmFsIGlzIHRoZSBjbXMgbWVudS5cblx0XHRcdCQoJy5jbXMtbWVudS1saXN0JykuY2hpbGRyZW4oJ2xpJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoZG9FeHBhbmQpIHsgLy9leHBhbmRcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCd1bCcpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQtZmx5b3V0Jyk7XG5cdFx0XHRcdFx0XHRpZiAoJCh0aGlzKS5kYXRhKCdjb2xsYXBzZScpKSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlRGF0YSgnY29sbGFwc2UnKTtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHsgICAgLy9jb2xsYXBzZVxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oJ3VsJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2NvbGxhcHNlZC1mbHlvdXQnKTtcblx0XHRcdFx0XHRcdCQodGhpcykuaGFzQ2xhc3MoJ2NvbGxhcHNlJyk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdjb2xsYXBzZScsIHRydWUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy50b2dnbGVGbHlvdXRTdGF0ZShkb0V4cGFuZCk7XG5cblx0XHRcdHRoaXMuX3N1cGVyKGRvRXhwYW5kLCBzaWxlbnQsIGRvU2F2ZVN0YXRlKTtcblx0XHR9LFxuXHRcdHRvZ2dsZUZseW91dFN0YXRlOiBmdW5jdGlvbihib29sKSB7XG5cdFx0XHRpZiAoYm9vbCkgeyAvL2V4cGFuZFxuXHRcdFx0XHQvL3Nob3cgdGhlIGZseW91dFxuXHRcdFx0XHQkKCcuY29sbGFwc2VkJykuZmluZCgnbGknKS5zaG93KCk7XG5cblx0XHRcdFx0Ly9oaWRlIGFsbCB0aGUgZmx5b3V0LWluZGljYXRvclxuXHRcdFx0XHQkKCcuY21zLW1lbnUtbGlzdCcpLmZpbmQoJy5jaGlsZC1mbHlvdXQtaW5kaWNhdG9yJykuaGlkZSgpO1xuXHRcdFx0fSBlbHNlIHsgICAgLy9jb2xsYXBzZVxuXHRcdFx0XHQvL2hpZGUgdGhlIGZseW91dCBvbmx5IGlmIGl0IGlzIG5vdCB0aGUgY3VycmVudCBzZWN0aW9uXG5cdFx0XHRcdCQoJy5jb2xsYXBzZWQtZmx5b3V0JykuZmluZCgnbGknKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdjdXJyZW50JykpXG5cdFx0XHRcdFx0JCh0aGlzKS5oaWRlKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vc2hvdyBhbGwgdGhlIGZseW91dC1pbmRpY2F0b3JzXG5cdFx0XHRcdHZhciBwYXIgPSAkKCcuY21zLW1lbnUtbGlzdCB1bC5jb2xsYXBzZWQtZmx5b3V0JykucGFyZW50KCk7XG5cdFx0XHRcdGlmIChwYXIuY2hpbGRyZW4oJy5jaGlsZC1mbHlvdXQtaW5kaWNhdG9yJykubGVuZ3RoID09PSAwKSBwYXIuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImNoaWxkLWZseW91dC1pbmRpY2F0b3JcIj48L3NwYW4+JykuZmFkZUluKCk7XG5cdFx0XHRcdHBhci5jaGlsZHJlbignLmNoaWxkLWZseW91dC1pbmRpY2F0b3InKS5mYWRlSW4oKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHNpdGVUcmVlUHJlc2VudDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuICQoJyNjbXMtY29udGVudC10b29scy1DTVNNYWluJykubGVuZ3RoID4gMDtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgZ2V0UGVyc2lzdGVkU3RpY2t5U3RhdGVcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH0gLSBSZXR1cm5zIHRydWUgaWYgdGhlIG1lbnUgaXMgc3RpY2t5LCBmYWxzZSBpZiB1bnN0aWNreS4gUmV0dXJucyB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm8gY29va2llIHNldC5cblx0XHQgKiBAZGVzYyBHZXQgdGhlIHN0aWNreSBzdGF0ZSBvZiB0aGUgbWVudSBhY2NvcmRpbmcgdG8gdGhlIGNvb2tpZS5cblx0XHQgKi9cblx0XHRnZXRQZXJzaXN0ZWRTdGlja3lTdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHBlcnNpc3RlZFN0YXRlLCBjb29raWVWYWx1ZTtcblxuXHRcdFx0aWYgKCQuY29va2llICE9PSB2b2lkIDApIHtcblx0XHRcdFx0Y29va2llVmFsdWUgPSAkLmNvb2tpZSgnY21zLW1lbnUtc3RpY2t5Jyk7XG5cblx0XHRcdFx0aWYgKGNvb2tpZVZhbHVlICE9PSB2b2lkIDAgJiYgY29va2llVmFsdWUgIT09IG51bGwpIHtcblx0XHRcdFx0XHRwZXJzaXN0ZWRTdGF0ZSA9IGNvb2tpZVZhbHVlID09PSAndHJ1ZSc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHBlcnNpc3RlZFN0YXRlO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBAZnVuYyBzZXRQZXJzaXN0ZWRTdGlja3lTdGF0ZVxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdGlja3kgLSBQYXNzIHRydWUgaWYgeW91IHdhbnQgdGhlIHBhbmVsIHRvIGJlIHN0aWNreSwgZmFsc2UgZm9yIHVuc3RpY2t5LlxuXHRcdCAqIEBkZXNjIFNldCB0aGUgY29sbGFwc2VkIHZhbHVlIG9mIHRoZSBwYW5lbCwgc3RvcmVkIGluIGNvb2tpZXMuXG5cdFx0ICovXG5cdFx0c2V0UGVyc2lzdGVkU3RpY2t5U3RhdGU6IGZ1bmN0aW9uIChpc1N0aWNreSkge1xuXHRcdFx0aWYgKCQuY29va2llICE9PSB2b2lkIDApIHtcblx0XHRcdFx0JC5jb29raWUoJ2Ntcy1tZW51LXN0aWNreScsIGlzU3RpY2t5LCB7IHBhdGg6ICcvJywgZXhwaXJlczogMzEgfSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBmdW5jIGdldEV2YWx1YXRlZENvbGxhcHNlZFN0YXRlXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgdGhlIG1lbnUgc2hvdWxkIGJlIGNvbGxhcHNlZCwgZmFsc2UgaWYgZXhwYW5kZWQuXG5cdFx0ICogQGRlc2MgRXZhbHVhdGUgd2hldGhlciB0aGUgbWVudSBzaG91bGQgYmUgY29sbGFwc2VkLlxuXHRcdCAqICAgICAgIFRoZSBiYXNpYyBydWxlIGlzIFwiSWYgdGhlIFNpdGVUcmVlIChtaWRkbGUgY29sdW1uKSBpcyBwcmVzZW50LCBjb2xsYXBzZSB0aGUgbWVudSwgb3RoZXJ3aXNlIGV4cGFuZCB0aGUgbWVudVwiLlxuXHRcdCAqICAgICAgIFRoaXMgcmVhc29uIGJlaGluZCB0aGlzIGlzIHRvIGdpdmUgdGhlIGNvbnRlbnQgYXJlYSBtb3JlIHJlYWwgZXN0YXRlIHdoZW4gdGhlIFNpdGVUcmVlIGlzIHByZXNlbnQuXG5cdFx0ICogICAgICAgVGhlIHVzZXIgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcyBhdXRvbWF0aWMgYmVoYXZpb3VyIGFuZCBoYXZlIHRoZSBtZW51IGV4cGFuZGVkIG9yIGNvbGxhcHNlZCBhdCBhbGwgdGltZXMuXG5cdFx0ICogICAgICAgU28gdW5saWtlIG1hbnVhbGx5IHRvZ2dsaW5nIHRoZSBtZW51LCB0aGUgYXV0b21hdGljIGJlaGF2aW91ciBuZXZlciB1cGRhdGVzIHRoZSBtZW51J3MgY29va2llIHZhbHVlLlxuXHRcdCAqICAgICAgIEhlcmUgd2UgdXNlIHRoZSBtYW51YWxseSBzZXQgc3RhdGUgYW5kIHRoZSBhdXRvbWF0aWMgYmVoYXZpb3VyIHRvIGV2YWx1YXRlIHdoYXQgdGhlIGNvbGxhcHNlZCBzdGF0ZSBzaG91bGQgYmUuXG5cdFx0ICovXG5cdFx0Z2V0RXZhbHVhdGVkQ29sbGFwc2VkU3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzaG91bGRDb2xsYXBzZSxcblx0XHRcdFx0bWFudWFsU3RhdGUgPSB0aGlzLmdldFBlcnNpc3RlZENvbGxhcHNlZFN0YXRlKCksXG5cdFx0XHRcdG1lbnVJc1N0aWNreSA9ICQoJy5jbXMtbWVudScpLmdldFBlcnNpc3RlZFN0aWNreVN0YXRlKCksXG5cdFx0XHRcdGF1dG9tYXRpY1N0YXRlID0gdGhpcy5zaXRlVHJlZVByZXNlbnQoKTtcblxuXHRcdFx0aWYgKG1hbnVhbFN0YXRlID09PSB2b2lkIDApIHtcblx0XHRcdFx0Ly8gVGhlcmUgaXMgbm8gbWFudWFsIHN0YXRlLCB1c2UgYXV0b21hdGljIHN0YXRlLlxuXHRcdFx0XHRzaG91bGRDb2xsYXBzZSA9IGF1dG9tYXRpY1N0YXRlO1xuXHRcdFx0fSBlbHNlIGlmIChtYW51YWxTdGF0ZSAhPT0gYXV0b21hdGljU3RhdGUgJiYgbWVudUlzU3RpY2t5KSB7XG5cdFx0XHRcdC8vIFRoZSBtYW51YWwgYW5kIGF1dG9tYXRpYyBzdGF0ZWEgY29uZmxpY3QsIHVzZSBtYW51YWwgc3RhdGUuXG5cdFx0XHRcdHNob3VsZENvbGxhcHNlID0gbWFudWFsU3RhdGU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBVc2UgYXV0b21hdGljIHN0YXRlLlxuXHRcdFx0XHRzaG91bGRDb2xsYXBzZSA9IGF1dG9tYXRpY1N0YXRlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2hvdWxkQ29sbGFwc2U7XG5cdFx0fSxcblxuXHRcdG9uYWRkOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvLyBVc2UgYSB0aW1lb3V0IHNvIHRoaXMgaGFwcGVucyBhZnRlciB0aGUgcmVkcmF3LlxuXHRcdFx0XHQvLyBUcmlnZ2VyaW5nIGEgdG9nZ2xlIGJlZm9yZSByZWRyYXcgd2lsbCByZXN1bHQgaW4gYW4gaW5jb3JyZWN0XG5cdFx0XHRcdC8vIG1lbnUgJ2V4cGFuZGVkIHdpZHRoJyBiZWluZyBjYWxjdWxhdGVkIHdoZW4gdGhlbiBtZW51XG5cdFx0XHRcdC8vIGlzIGFkZGVkIGluIGEgY29sbGFwc2VkIHN0YXRlLlxuXHRcdFx0XHRzZWxmLnRvZ2dsZVBhbmVsKCFzZWxmLmdldEV2YWx1YXRlZENvbGxhcHNlZFN0YXRlKCksIGZhbHNlLCBmYWxzZSk7XG5cdFx0XHR9LCAwKTtcblxuXHRcdFx0Ly8gU2V0dXAgYXV0b21hdGljIGV4cGFuZCAvIGNvbGxhcHNlIGJlaGF2aW91ci5cblx0XHRcdCQod2luZG93KS5vbignYWpheENvbXBsZXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IC8vIFVzZSBhIHRpbWVvdXQgc28gdGhpcyBoYXBwZW5zIGFmdGVyIHRoZSByZWRyYXdcblx0XHRcdFx0XHRzZWxmLnRvZ2dsZVBhbmVsKCFzZWxmLmdldEV2YWx1YXRlZENvbGxhcHNlZFN0YXRlKCksIGZhbHNlLCBmYWxzZSk7XG5cdFx0XHRcdH0sIDApO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuY21zLW1lbnUtbGlzdCcpLmVudHdpbmUoe1xuXHRcdG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHQvLyBTZWxlY3QgZGVmYXVsdCBlbGVtZW50ICh3aGljaCBtaWdodCByZXZlYWwgY2hpbGRyZW4gaW4gaGlkZGVuIHBhcmVudHMpXG5cdFx0XHR0aGlzLmZpbmQoJ2xpLmN1cnJlbnQnKS5zZWxlY3QoKTtcblxuXHRcdFx0dGhpcy51cGRhdGVJdGVtcygpO1xuXG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0b251bm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZU1lbnVGcm9tUmVzcG9uc2U6IGZ1bmN0aW9uKHhocikge1xuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtQ29udHJvbGxlcicpO1xuXHRcdFx0aWYoY29udHJvbGxlcikge1xuXHRcdFx0XHR2YXIgaXRlbSA9IHRoaXMuZmluZCgnbGkjTWVudS0nICsgY29udHJvbGxlci5yZXBsYWNlKC9cXFxcL2csICctJykucmVwbGFjZSgvW15hLXpBLVowLTlcXC1fOi5dKy8sICcnKSk7XG5cdFx0XHRcdGlmKCFpdGVtLmhhc0NsYXNzKCdjdXJyZW50JykpIGl0ZW0uc2VsZWN0KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnVwZGF0ZUl0ZW1zKCk7XG5cdFx0fSxcblxuXHRcdCdmcm9tIC5jbXMtY29udGFpbmVyJzoge1xuXHRcdFx0b25hZnRlcnN0YXRlY2hhbmdlOiBmdW5jdGlvbihlLCBkYXRhKXtcblx0XHRcdFx0dGhpcy51cGRhdGVNZW51RnJvbVJlc3BvbnNlKGRhdGEueGhyKTtcblx0XHRcdH0sXG5cdFx0XHRvbmFmdGVyc3VibWl0Zm9ybTogZnVuY3Rpb24oZSwgZGF0YSl7XG5cdFx0XHRcdHRoaXMudXBkYXRlTWVudUZyb21SZXNwb25zZShkYXRhLnhocik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdCdmcm9tIC5jbXMtZWRpdC1mb3JtJzoge1xuXHRcdFx0b25yZWxvZGVkaXRmb3JtOiBmdW5jdGlvbihlLCBkYXRhKXtcblx0XHRcdFx0dGhpcy51cGRhdGVNZW51RnJvbVJlc3BvbnNlKGRhdGEueG1saHR0cCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGdldENvbnRhaW5pbmdQYW5lbDogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiB0aGlzLmNsb3Nlc3QoJy5jbXMtcGFuZWwnKTtcblx0XHR9LFxuXG5cdFx0ZnJvbUNvbnRhaW5pbmdQYW5lbDoge1xuXHRcdFx0b250b2dnbGU6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR0aGlzLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnLCAkKGUudGFyZ2V0KS5oYXNDbGFzcygnY29sbGFwc2VkJykpO1xuXHRcdFx0XHQkKHdpbmRvdykucmVzaXplKCk7IC8vVHJpZ2dlciBqTGF5b3V0XG5cblx0XHRcdFx0Ly9JZiBwYW5lbCBpcyBjbG9zaW5nXG5cdFx0XHRcdGlmICh0aGlzLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSkgdGhpcy5maW5kKCdsaS5jaGlsZHJlbi5vcGVuZWQnKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG5cblx0XHRcdFx0Ly9JZiBwYW5lbCBpcyBvcGVuaW5nXG5cdFx0XHRcdGlmKCF0aGlzLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSkge1xuXHRcdFx0XHRcdCQoJy50b2dnbGUtY2hpbGRyZW4ub3BlbmVkJykuY2xvc2VzdCgnbGknKS5hZGRDbGFzcygnb3BlbmVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gSGlkZSBcImVkaXQgcGFnZVwiIGNvbW1hbmRzIHVubGVzcyB0aGUgc2VjdGlvbiBpcyBhY3RpdmF0ZWRcblx0XHRcdHZhciBlZGl0UGFnZUl0ZW0gPSB0aGlzLmZpbmQoJyNNZW51LUNNU01haW4nKTtcblxuXHRcdFx0ZWRpdFBhZ2VJdGVtW2VkaXRQYWdlSXRlbS5pcygnLmN1cnJlbnQnKSA/ICdzaG93JyA6ICdoaWRlJ10oKTtcblxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBtZW51IGxpbmtzIHRvIHJlZmxlY3QgdGhlIHBhZ2UgSUQgaWYgdGhlIHBhZ2UgaGFzIGNoYW5nZWQgdGhlIFVSTC5cblx0XHRcdHZhciBjdXJyZW50SUQgPSAkKCcuY21zLWNvbnRlbnQgaW5wdXRbbmFtZT1JRF0nKS52YWwoKTtcblx0XHRcdGlmKGN1cnJlbnRJRCkge1xuXHRcdFx0XHR0aGlzLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZigkLmlzRnVuY3Rpb24oJCh0aGlzKS5zZXRSZWNvcmRJRCkpICQodGhpcykuc2V0UmVjb3JkSUQoY3VycmVudElEKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKiogVG9nZ2xlIHRoZSBmbHlvdXQgcGFuZWwgdG8gYXBwZWFyL2Rpc2FwcGVhciB3aGVuIG1vdXNlIG92ZXIgKi9cblx0JCgnLmNtcy1tZW51LWxpc3QgbGknKS5lbnR3aW5lKHtcblx0XHR0b2dnbGVGbHlvdXQ6IGZ1bmN0aW9uKGJvb2wpIHtcblx0XHRcdHZhciBmbHkgPSAkKHRoaXMpO1xuXG5cdFx0XHRpZiAoZmx5LmNoaWxkcmVuKCd1bCcpLmZpcnN0KCkuaGFzQ2xhc3MoJ2NvbGxhcHNlZC1mbHlvdXQnKSkge1xuXHRcdFx0XHRpZiAoYm9vbCkgeyAvL2V4cGFuZFxuXHRcdFx0XHRcdC8vIGNyZWF0ZSB0aGUgY2xvbmUgb2YgdGhlIGxpc3QgaXRlbSB0byBiZSBkaXNwbGF5ZWRcblx0XHRcdFx0XHQvLyBvdmVyIHRoZSBleGlzdGluZyBvbmVcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQhZmx5LmNoaWxkcmVuKCd1bCcpXG5cdFx0XHRcdFx0XHRcdC5maXJzdCgpXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbignbGknKVxuXHRcdFx0XHRcdFx0XHQuZmlyc3QoKVxuXHRcdFx0XHRcdFx0XHQuaGFzQ2xhc3MoJ2Nsb25lJylcblx0XHRcdFx0XHQpIHtcblxuXHRcdFx0XHRcdFx0dmFyIGxpID0gZmx5LmNsb25lKCk7XG5cdFx0XHRcdFx0XHRsaS5hZGRDbGFzcygnY2xvbmUnKS5jc3Moe1xuXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0bGkuY2hpbGRyZW4oJ3VsJykuZmlyc3QoKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRcdFx0bGkuZmluZCgnc3BhbicpLm5vdCgnLnRleHQnKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRcdFx0bGkuZmluZCgnYScpLmZpcnN0KCkudW5iaW5kKCdjbGljaycpO1xuXG5cdFx0XHRcdFx0XHRmbHkuY2hpbGRyZW4oJ3VsJykucHJlcGVuZChsaSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0JCgnLmNvbGxhcHNlZC1mbHlvdXQnKS5zaG93KCk7XG5cdFx0XHRcdFx0Zmx5LmFkZENsYXNzKCdvcGVuZWQnKTtcblx0XHRcdFx0XHRmbHkuY2hpbGRyZW4oJ3VsJykuZmluZCgnbGknKS5mYWRlSW4oJ2Zhc3QnKTtcblx0XHRcdFx0fSBlbHNlIHsgICAgLy9jb2xsYXBzZVxuXHRcdFx0XHRcdGlmKGxpKSB7XG5cdFx0XHRcdFx0XHRsaS5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JCgnLmNvbGxhcHNlZC1mbHlvdXQnKS5oaWRlKCk7XG5cdFx0XHRcdFx0Zmx5LnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcblx0XHRcdFx0XHRmbHkuZmluZCgndG9nZ2xlLWNoaWxkcmVuJykucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuXHRcdFx0XHRcdGZseS5jaGlsZHJlbigndWwnKS5maW5kKCdsaScpLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdC8vc2xpZ2h0IGRlbGF5IHRvIHByZXZlbnQgZmx5b3V0IGNsb3NpbmcgZnJvbSBcInNsb3BweSBtb3VzZSBtb3ZlbWVudFwiXG5cdCQoJy5jbXMtbWVudS1saXN0IGxpJykuaG92ZXJJbnRlbnQoZnVuY3Rpb24oKXskKHRoaXMpLnRvZ2dsZUZseW91dCh0cnVlKTt9LGZ1bmN0aW9uKCl7JCh0aGlzKS50b2dnbGVGbHlvdXQoZmFsc2UpO30pO1xuXG5cdCQoJy5jbXMtbWVudS1saXN0IC50b2dnbGUnKS5lbnR3aW5lKHtcblx0XHRvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKHRoaXMpLnRvb2dsZUZseW91dCh0cnVlKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5jbXMtbWVudS1saXN0IGxpJykuZW50d2luZSh7XG5cdFx0b25tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih0aGlzLmZpbmQoJ3VsJykubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuZmluZCgnYTpmaXJzdCcpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ0b2dnbGUtY2hpbGRyZW5cIj48c3BhbiBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlbi1pY29uXCI+PC9zcGFuPjwvc3Bhbj4nKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvbnVubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXHRcdHRvZ2dsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzW3RoaXMuaGFzQ2xhc3MoJ29wZW5lZCcpID8gJ2Nsb3NlJyA6ICdvcGVuJ10oKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIFwiT3BlblwiIGlzIGp1c3QgYSB2aXN1YWwgc3RhdGUsIGFuZCB1bnJlbGF0ZWQgdG8gXCJjdXJyZW50XCIuXG5cdFx0ICogTW9yZSB0aGFuIG9uZSBpdGVtIGNhbiBiZSBvcGVuIGF0IHRoZSBzYW1lIHRpbWUuXG5cdFx0ICovXG5cdFx0b3BlbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcGFyZW50ID0gdGhpcy5nZXRNZW51SXRlbSgpO1xuXHRcdFx0aWYocGFyZW50KSBwYXJlbnQub3BlbigpO1xuXHRcdFx0aWYoIHRoaXMuZmluZCgnbGkuY2xvbmUnKSApIHtcblx0XHRcdFx0dGhpcy5maW5kKCdsaS5jbG9uZScpLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5hZGRDbGFzcygnb3BlbmVkJykuZmluZCgndWwnKS5zaG93KCk7XG5cdFx0XHR0aGlzLmZpbmQoJy50b2dnbGUtY2hpbGRyZW4nKS5hZGRDbGFzcygnb3BlbmVkJyk7XG5cdFx0fSxcblx0XHRjbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5maW5kKCd1bCcpLmhpZGUoKTtcblx0XHRcdHRoaXMuZmluZCgnLnRvZ2dsZS1jaGlsZHJlbicpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcblx0XHR9LFxuXHRcdHNlbGVjdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcGFyZW50ID0gdGhpcy5nZXRNZW51SXRlbSgpO1xuXHRcdFx0dGhpcy5hZGRDbGFzcygnY3VycmVudCcpLm9wZW4oKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIFwiY3VycmVudFwiIGNsYXNzIGZyb20gYWxsIHNpYmxpbmdzIGFuZCB0aGVpciBjaGlsZHJlblxuXHRcdFx0dGhpcy5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuY2xvc2UoKTtcblx0XHRcdHRoaXMuc2libGluZ3MoKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG5cdFx0XHRpZihwYXJlbnQpIHtcblx0XHRcdFx0dmFyIHBhcmVudFNpYmxpbmdzID0gcGFyZW50LnNpYmxpbmdzKCk7XG5cdFx0XHRcdHBhcmVudC5hZGRDbGFzcygnY3VycmVudCcpO1xuXHRcdFx0XHRwYXJlbnRTaWJsaW5ncy5yZW1vdmVDbGFzcygnY3VycmVudCcpLmNsb3NlKCk7XG5cdFx0XHRcdHBhcmVudFNpYmxpbmdzLmZpbmQoJ2xpJykucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQnKS5jbG9zZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmdldE1lbnUoKS51cGRhdGVJdGVtcygpO1xuXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3NlbGVjdCcpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLmNtcy1tZW51LWxpc3QgKicpLmVudHdpbmUoe1xuXHRcdGdldE1lbnU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50cygnLmNtcy1tZW51LWxpc3Q6Zmlyc3QnKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5jbXMtbWVudS1saXN0IGxpIConKS5lbnR3aW5lKHtcblx0XHRnZXRNZW51SXRlbTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnRzKCdsaTpmaXJzdCcpO1xuXHRcdH1cblx0fSk7XG5cblx0LyoqXG5cdCAqIEJvdGggcHJpbWFyeSBhbmQgc2Vjb25kYXJ5IG5hdi5cblx0ICovXG5cdCQoJy5jbXMtbWVudS1saXN0IGxpIGEnKS5lbnR3aW5lKHtcblx0XHRvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHQvLyBPbmx5IGNhdGNoIGxlZnQgY2xpY2tzLCBpbiBvcmRlciB0byBhbGxvdyBvcGVuaW5nIGluIHRhYnMuXG5cdFx0XHQvLyBJZ25vcmUgZXh0ZXJuYWwgbGlua3MsIGZhbGxiYWNrIHRvIHN0YW5kYXJkIGxpbmsgYmVoYXZpb3VyXG5cdFx0XHR2YXIgaXNFeHRlcm5hbCA9ICQucGF0aC5pc0V4dGVybmFsKHRoaXMuYXR0cignaHJlZicpKTtcblx0XHRcdGlmKGUud2hpY2ggPiAxIHx8IGlzRXh0ZXJuYWwpIHJldHVybjtcblxuXHRcdFx0Ly8gaWYgdGhlIGRldmVsb3BlciBoYXMgdGhpcyB0byBvcGVuIGluIGEgbmV3IHdpbmRvdywgaGFuZGxlXG5cdFx0XHQvLyB0aGF0XG5cdFx0XHRpZih0aGlzLmF0dHIoJ3RhcmdldCcpID09IFwiX2JsYW5rXCIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBpdGVtID0gdGhpcy5nZXRNZW51SXRlbSgpO1xuXG5cdFx0XHR2YXIgdXJsID0gdGhpcy5hdHRyKCdocmVmJyk7XG5cdFx0XHRpZighaXNFeHRlcm5hbCkgdXJsID0gJCgnYmFzZScpLmF0dHIoJ2hyZWYnKSArIHVybDtcblxuXHRcdFx0dmFyIGNoaWxkcmVuID0gaXRlbS5maW5kKCdsaScpO1xuXHRcdFx0aWYoY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGNoaWxkcmVuLmZpcnN0KCkuZmluZCgnYScpLmNsaWNrKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBMb2FkIFVSTCwgYnV0IGdpdmUgdGhlIGxvYWRpbmcgbG9naWMgYW4gb3Bwb3J0dW5pdHkgdG8gdmV0byB0aGUgYWN0aW9uXG5cdFx0XHRcdC8vIChlLmcuIGJlY2F1c2Ugb2YgdW5zYXZlZCBjaGFuZ2VzKVxuXHRcdFx0XHRpZighJCgnLmNtcy1jb250YWluZXInKS5sb2FkUGFuZWwodXJsKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpdGVtLnNlbGVjdCgpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLmNtcy1tZW51LWxpc3QgbGkgLnRvZ2dsZS1jaGlsZHJlbicpLmVudHdpbmUoe1xuXHRcdG9uY2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBsaSA9IHRoaXMuY2xvc2VzdCgnbGknKTtcblx0XHRcdGxpLnRvZ2dsZSgpO1xuXHRcdFx0cmV0dXJuIGZhbHNlOyAvLyBwcmV2ZW50IHdyYXBwaW5nIGxpbmsgZXZlbnQgdG8gZmlyZVxuXHRcdH1cblx0fSk7XG5cblx0JCgnLmNtcyAucHJvZmlsZS1saW5rJykuZW50d2luZSh7XG5cdFx0b25jbGljazogZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcuY21zLWNvbnRhaW5lcicpLmxvYWRQYW5lbCh0aGlzLmF0dHIoJ2hyZWYnKSk7XG5cdFx0XHQkKCcuY21zLW1lbnUtbGlzdCBsaScpLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuY2xvc2UoKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBUb2dnbGVzIHRoZSBtYW51YWwgb3ZlcnJpZGUgb2YgdGhlIGxlZnQgbWVudSdzIGF1dG9tYXRpYyBleHBhbmQgLyBjb2xsYXBzZSBiZWhhdmlvdXIuXG5cdCAqL1xuXHQkKCcuY21zLW1lbnUgLnN0aWNreS10b2dnbGUnKS5lbnR3aW5lKHtcblxuXHRcdG9uYWRkOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaXNTdGlja3kgPSAkKCcuY21zLW1lbnUnKS5nZXRQZXJzaXN0ZWRTdGlja3lTdGF0ZSgpID8gdHJ1ZSA6IGZhbHNlO1xuXG5cdFx0XHR0aGlzLnRvZ2dsZUNTUyhpc1N0aWNreSk7XG5cdFx0XHR0aGlzLnRvZ2dsZUluZGljYXRvcihpc1N0aWNreSk7XG5cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBmdW5jIHRvZ2dsZUNTU1xuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdGlja3kgLSBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgbWVudS5cblx0XHQgKiBAZGVzYyBUb2dnbGVzIHRoZSAnYWN0aXZlJyBDU1MgY2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG5cdFx0ICovXG5cdFx0dG9nZ2xlQ1NTOiBmdW5jdGlvbiAoaXNTdGlja3kpIHtcblx0XHRcdHRoaXNbaXNTdGlja3kgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oJ2FjdGl2ZScpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBAZnVuYyB0b2dnbGVJbmRpY2F0b3Jcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3RpY2t5IC0gVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIG1lbnUuXG5cdFx0ICogQGRlc2MgVXBkYXRlcyB0aGUgaW5kaWNhdG9yJ3MgdGV4dCBiYXNlZCBvbiB0aGUgc3RpY2t5IHN0YXRlIG9mIHRoZSBtZW51LlxuXHRcdCAqL1xuXHRcdHRvZ2dsZUluZGljYXRvcjogZnVuY3Rpb24gKGlzU3RpY2t5KSB7XG5cdFx0XHR0aGlzLm5leHQoJy5zdGlja3ktc3RhdHVzLWluZGljYXRvcicpLnRleHQoaXNTdGlja3kgPyAnZml4ZWQnIDogJ2F1dG8nKTtcblx0XHR9LFxuXG5cdFx0b25jbGljazogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyICRtZW51ID0gdGhpcy5jbG9zZXN0KCcuY21zLW1lbnUnKSxcblx0XHRcdFx0cGVyc2lzdGVkQ29sbGFwc2VkU3RhdGUgPSAkbWVudS5nZXRQZXJzaXN0ZWRDb2xsYXBzZWRTdGF0ZSgpLFxuXHRcdFx0XHRwZXJzaXN0ZWRTdGlja3lTdGF0ZSA9ICRtZW51LmdldFBlcnNpc3RlZFN0aWNreVN0YXRlKCksXG5cdFx0XHRcdG5ld1N0aWNreVN0YXRlID0gcGVyc2lzdGVkU3RpY2t5U3RhdGUgPT09IHZvaWQgMCA/ICF0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKSA6ICFwZXJzaXN0ZWRTdGlja3lTdGF0ZTtcblxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBwZXJzaXN0ZWQgY29sbGFwc2VkIHN0YXRlXG5cdFx0XHRpZiAocGVyc2lzdGVkQ29sbGFwc2VkU3RhdGUgPT09IHZvaWQgMCkge1xuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBubyBwZXJzaXN0ZWQgbWVudSBzdGF0ZSBjdXJyZW50bHkgc2V0LCB0aGVuIHNldCBpdCB0byB0aGUgbWVudSdzIGN1cnJlbnQgc3RhdGUuXG5cdFx0XHRcdC8vIFRoaXMgd2lsbCBiZSB0aGUgY2FzZSBpZiB0aGUgdXNlciBoYXMgbmV2ZXIgbWFudWFsbHkgZXhwYW5kZWQgb3IgY29sbGFwc2VkIHRoZSBtZW51LFxuXHRcdFx0XHQvLyBvciB0aGUgbWVudSBoYXMgcHJldmlvdXNseSBiZWVuIG1hZGUgdW5zdGlja3kuXG5cdFx0XHRcdCRtZW51LnNldFBlcnNpc3RlZENvbGxhcHNlZFN0YXRlKCRtZW51Lmhhc0NsYXNzKCdjb2xsYXBzZWQnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKHBlcnNpc3RlZENvbGxhcHNlZFN0YXRlICE9PSB2b2lkIDAgJiYgbmV3U3RpY2t5U3RhdGUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIGEgcGVyc2lzdGVkIHN0YXRlIGFuZCB0aGUgbWVudSBoYXMgYmVlbiBtYWRlIHVuc3RpY2t5LCByZW1vdmUgdGhlIHBlcnNpc3RlZCBzdGF0ZS5cblx0XHRcdFx0JG1lbnUuY2xlYXJQZXJzaXN0ZWRDb2xsYXBzZWRTdGF0ZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQZXJzaXN0IHRoZSBzdGlja3kgc3RhdGUgb2YgdGhlIG1lbnVcblx0XHRcdCRtZW51LnNldFBlcnNpc3RlZFN0aWNreVN0YXRlKG5ld1N0aWNreVN0YXRlKTtcblxuXHRcdFx0dGhpcy50b2dnbGVDU1MobmV3U3RpY2t5U3RhdGUpO1xuXHRcdFx0dGhpcy50b2dnbGVJbmRpY2F0b3IobmV3U3RpY2t5U3RhdGUpO1xuXG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH1cblx0fSk7XG59KTtcbiIsImltcG9ydCAkIGZyb20gJ2pRdWVyeSc7XG5cbiQuZW50d2luZSgnc3MnLCBmdW5jdGlvbigkKSB7XG5cblx0Ly8gc2V0dXAganF1ZXJ5LmVudHdpbmVcblx0JC5lbnR3aW5lLndhcm5pbmdMZXZlbCA9ICQuZW50d2luZS5XQVJOX0xFVkVMX0JFU1RQUkFDVElTRTtcblxuXHQvKipcblx0ICogSG9yaXpvbnRhbCBjb2xsYXBzaWJsZSBwYW5lbC4gR2VuZXJpYyBlbm91Z2ggdG8gd29yayB3aXRoIENNUyBtZW51IGFzIHdlbGwgYXMgdmFyaW91cyBcImZpbHRlclwiIHBhbmVscy5cblx0ICogXG5cdCAqIEEgcGFuZWwgY29uc2lzdHMgb2YgdGhlIGZvbGxvd2luZyBwYXJ0czpcblx0ICogLSBDb250YWluZXIgZGl2OiBUaGUgb3V0ZXIgZWxlbWVudCwgd2l0aCBjbGFzcyBcIi5jbXMtcGFuZWxcIlxuXHQgKiAtIEhlYWRlciAob3B0aW9uYWwpXG5cdCAqIC0gQ29udGVudFxuXHQgKiAtIEV4cGFuZCBhbmQgY29sbGFwc2UgdG9nZ2xlIGFuY2hvcnMgKG9wdGlvbmFsKVxuXHQgKiBcblx0ICogU2FtcGxlIEhUTUw6XG5cdCAqIDxkaXYgY2xhc3M9XCJjbXMtcGFuZWxcIj5cblx0ICogIDxkaXYgY2xhc3M9XCJjbXMtcGFuZWwtaGVhZGVyXCI+eW91ciBoZWFkZXI8L2Rpdj5cblx0ICogXHQ8ZGl2IGNsYXNzPVwiY21zLXBhbmVsLWNvbnRlbnRcIj55b3VyIGNvbnRlbnQgaGVyZTwvZGl2PlxuXHQgKlx0PGRpdiBjbGFzcz1cImNtcy1wYW5lbC10b2dnbGVcIj5cblx0ICogXHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJ0b2dnbGUtZXhwYW5kZVwiPnlvdXIgdG9nZ2xlIHRleHQ8L2E+XG5cdCAqIFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzPVwidG9nZ2xlLWNvbGxhcHNlXCI+eW91ciB0b2dnbGUgdGV4dDwvYT5cblx0ICpcdDwvZGl2PlxuXHQgKiA8L2Rpdj5cblx0ICovXG5cdCQoJy5jbXMtcGFuZWwnKS5lbnR3aW5lKHtcblx0XHRcblx0XHRXaWR0aEV4cGFuZGVkOiBudWxsLFxuXHRcdFxuXHRcdFdpZHRoQ29sbGFwc2VkOiBudWxsLFxuXG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgY2FuU2V0Q29va2llXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0XHQgKiBAZGVzYyBCZWZvcmUgdHJ5aW5nIHRvIHNldCBhIGNvb2tpZSwgbWFrZSBzdXJlICQuY29va2llIGFuZCB0aGUgZWxlbWVudCdzIGlkIGFyZSBib3RoIGRlZmluZWQuXG5cdFx0ICovXG5cdFx0Y2FuU2V0Q29va2llOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJC5jb29raWUgIT09IHZvaWQgMCAmJiB0aGlzLmF0dHIoJ2lkJykgIT09IHZvaWQgMDtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgZ2V0UGVyc2lzdGVkQ29sbGFwc2VkU3RhdGVcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH0gLSBSZXR1cm5zIHRydWUgaWYgdGhlIHBhbmVsIGlzIGNvbGxhcHNlZCwgZmFsc2UgaWYgZXhwYW5kZWQuIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vIGNvb2tpZSBzZXQuXG5cdFx0ICogQGRlc2MgR2V0IHRoZSBjb2xsYXBzZWQgc3RhdGUgb2YgdGhlIHBhbmVsIGFjY29yZGluZyB0byB0aGUgY29va2llLlxuXHRcdCAqL1xuXHRcdGdldFBlcnNpc3RlZENvbGxhcHNlZFN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaXNDb2xsYXBzZWQsIGNvb2tpZVZhbHVlO1xuXG5cdFx0XHRpZiAodGhpcy5jYW5TZXRDb29raWUoKSkge1xuXHRcdFx0XHRjb29raWVWYWx1ZSA9ICQuY29va2llKCdjbXMtcGFuZWwtY29sbGFwc2VkLScgKyB0aGlzLmF0dHIoJ2lkJykpO1xuXG5cdFx0XHRcdGlmIChjb29raWVWYWx1ZSAhPT0gdm9pZCAwICYmIGNvb2tpZVZhbHVlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0aXNDb2xsYXBzZWQgPSBjb29raWVWYWx1ZSA9PT0gJ3RydWUnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc0NvbGxhcHNlZDtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgc2V0UGVyc2lzdGVkQ29sbGFwc2VkU3RhdGVcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IG5ld1N0YXRlIC0gUGFzcyB0cnVlIGlmIHlvdSB3YW50IHRoZSBwYW5lbCB0byBiZSBjb2xsYXBzZWQsIGZhbHNlIGZvciBleHBhbmRlZC5cblx0XHQgKiBAZGVzYyBTZXQgdGhlIGNvbGxhcHNlZCB2YWx1ZSBvZiB0aGUgcGFuZWwsIHN0b3JlZCBpbiBjb29raWVzLlxuXHRcdCAqL1xuXHRcdHNldFBlcnNpc3RlZENvbGxhcHNlZFN0YXRlOiBmdW5jdGlvbiAobmV3U3RhdGUpIHtcblx0XHRcdGlmICh0aGlzLmNhblNldENvb2tpZSgpKSB7XG5cdFx0XHRcdCQuY29va2llKCdjbXMtcGFuZWwtY29sbGFwc2VkLScgKyB0aGlzLmF0dHIoJ2lkJyksIG5ld1N0YXRlLCB7IHBhdGg6ICcvJywgZXhwaXJlczogMzEgfSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBmdW5jIGNsZWFyUGVyc2lzdGVkU3RhdGVcblx0XHQgKiBAZGVzYyBSZW1vdmUgdGhlIGNvb2tpZSByZXNwb25zaWJsZSBmb3IgbWFpbnRhaW5nIHRoZSBjb2xsYXBzZWQgc3RhdGUuXG5cdFx0ICovXG5cdFx0Y2xlYXJQZXJzaXN0ZWRDb2xsYXBzZWRTdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuY2FuU2V0Q29va2llKCkpIHtcblx0XHRcdFx0JC5jb29raWUoJ2Ntcy1wYW5lbC1jb2xsYXBzZWQtJyArIHRoaXMuYXR0cignaWQnKSwgJycsIHsgcGF0aDogJy8nLCBleHBpcmVzOiAtMSB9KTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgZ2V0SW5pdGlhbENvbGxhcHNlZFN0YXRlXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgdGhlIHRoZSBwYW5lbCBpcyBjb2xsYXBzZWQsIGZhbHNlIGlmIGV4cGFuZGVkLlxuXHRcdCAqIEBkZXNjIEdldCB0aGUgaW5pdGlhbCBjb2xsYXBzZWQgc3RhdGUgb2YgdGhlIHBhbmVsLiBDaGVjayBpZiBhIGNvb2tpZSB2YWx1ZSBpcyBzZXQgdGhlbiBmYWxsIGJhY2sgdG8gY2hlY2tpbmcgQ1NTIGNsYXNzZXMuXG5cdFx0ICovXG5cdFx0Z2V0SW5pdGlhbENvbGxhcHNlZFN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaXNDb2xsYXBzZWQgPSB0aGlzLmdldFBlcnNpc3RlZENvbGxhcHNlZFN0YXRlKCk7XG5cblx0XHRcdC8vIEZhbGxiYWNrIHRvIGdldHRpbmcgdGhlIHN0YXRlIGZyb20gdGhlIGRlZmF1bHQgQ1NTIGNsYXNzXG5cdFx0XHRpZiAoaXNDb2xsYXBzZWQgPT09IHZvaWQgMCkge1xuXHRcdFx0XHRpc0NvbGxhcHNlZCA9IHRoaXMuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNDb2xsYXBzZWQ7XG5cdFx0fSxcblxuXHRcdG9uYWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBjb2xsYXBzZWRDb250ZW50LCBjb250YWluZXI7XG5cblx0XHRcdGlmKCF0aGlzLmZpbmQoJy5jbXMtcGFuZWwtY29udGVudCcpLmxlbmd0aCkgdGhyb3cgbmV3IEV4Y2VwdGlvbignQ29udGVudCBwYW5lbCBmb3IgXCIuY21zLXBhbmVsXCIgbm90IGZvdW5kJyk7XG5cdFx0XHRcblx0XHRcdC8vIENyZWF0ZSBkZWZhdWx0IGNvbnRyb2xzIHVubGVzcyB0aGV5IGFscmVhZHkgZXhpc3QuXG5cdFx0XHRpZighdGhpcy5maW5kKCcuY21zLXBhbmVsLXRvZ2dsZScpLmxlbmd0aCkge1xuXHRcdFx0XHRjb250YWluZXIgPSAkKFwiPGRpdiBjbGFzcz0nY21zLXBhbmVsLXRvZ2dsZSBzb3V0aCc+PC9kaXY+XCIpXG5cdFx0XHRcdFx0LmFwcGVuZCgnPGEgY2xhc3M9XCJ0b2dnbGUtZXhwYW5kXCIgaHJlZj1cIiNcIj48c3Bhbj4mcmFxdW87PC9zcGFuPjwvYT4nKVxuXHRcdFx0XHRcdC5hcHBlbmQoJzxhIGNsYXNzPVwidG9nZ2xlLWNvbGxhcHNlXCIgaHJlZj1cIiNcIj48c3Bhbj4mbGFxdW87PC9zcGFuPjwvYT4nKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0dGhpcy5hcHBlbmQoY29udGFpbmVyKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gU2V0IHBhbmVsIHdpZHRoIHNhbWUgYXMgdGhlIGNvbnRlbnQgcGFuZWwgaXQgY29udGFpbnMuIEFzc3VtZXMgdGhlIHBhbmVsIGhhcyBvdmVyZmxvdzogaGlkZGVuLlxuXHRcdFx0dGhpcy5zZXRXaWR0aEV4cGFuZGVkKHRoaXMuZmluZCgnLmNtcy1wYW5lbC1jb250ZW50JykuaW5uZXJXaWR0aCgpKTtcblx0XHRcdFxuXHRcdFx0Ly8gQXNzdW1lcyB0aGUgY29sbGFwc2VkIHdpZHRoIGlzIGluZGljYXRlZCBieSB0aGUgdG9nZ2xlLCBvciBieSBhbiBvcHRpb25hbGx5IGNvbGxhcHNlZCB2aWV3XG5cdFx0XHRjb2xsYXBzZWRDb250ZW50ID0gdGhpcy5maW5kKCcuY21zLXBhbmVsLWNvbnRlbnQtY29sbGFwc2VkJyk7XG5cdFx0XHR0aGlzLnNldFdpZHRoQ29sbGFwc2VkKGNvbGxhcHNlZENvbnRlbnQubGVuZ3RoID8gY29sbGFwc2VkQ29udGVudC5pbm5lcldpZHRoKCkgOiB0aGlzLmZpbmQoJy50b2dnbGUtZXhwYW5kJykuaW5uZXJXaWR0aCgpKTtcblxuXHRcdFx0Ly8gVG9nZ2xlIHZpc2liaWxpdHlcblx0XHRcdHRoaXMudG9nZ2xlUGFuZWwoIXRoaXMuZ2V0SW5pdGlhbENvbGxhcHNlZFN0YXRlKCksIHRydWUsIGZhbHNlKTtcblx0XHRcdFxuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQGZ1bmMgdG9nZ2xlUGFuZWxcblx0XHQgKiBAcGFyYW0gZG9FeHBhbmQge2Jvb2xlYW59IC0gdHJ1ZSB0byBleHBhbmQsIGZhbHNlIHRvIGNvbGxhcHNlLlxuXHRcdCAqIEBwYXJhbSBzaWxlbnQge2Jvb2xlYW59IC0gdHJ1ZSBtZWFucyB0aGF0IGV2ZW50cyB3b24ndCBiZSBmaXJlZCwgd2hpY2ggaXMgdXNlZnVsIGZvciB0aGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uIHBoYXNlLlxuXHRcdCAqIEBwYXJhbSBkb1NhdmVTdGF0ZSAtIGlmIGZhbHNlLCB0aGUgcGFuZWwncyBzdGF0ZSB3aWxsIG5vdCBiZSBwZXJzaXN0ZWQgdmlhIGNvb2tpZXMuXG5cdFx0ICogQGRlc2MgVG9nZ2xlIHRoZSBleHBhbmRlZCAvIGNvbGxhcHNlZCBzdGF0ZSBvZiB0aGUgcGFuZWwuXG5cdFx0ICovXG5cdFx0dG9nZ2xlUGFuZWw6IGZ1bmN0aW9uKGRvRXhwYW5kLCBzaWxlbnQsIGRvU2F2ZVN0YXRlKSB7XG5cdFx0XHR2YXIgbmV3V2lkdGgsIGNvbGxhcHNlZENvbnRlbnQ7XG5cblx0XHRcdGlmKCFzaWxlbnQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdiZWZvcmV0b2dnbGUuc3NwYW5lbCcsIGRvRXhwYW5kKTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKGRvRXhwYW5kID8gJ2JlZm9yZWV4cGFuZCcgOiAnYmVmb3JlY29sbGFwc2UnKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy50b2dnbGVDbGFzcygnY29sbGFwc2VkJywgIWRvRXhwYW5kKTtcblx0XHRcdG5ld1dpZHRoID0gZG9FeHBhbmQgPyB0aGlzLmdldFdpZHRoRXhwYW5kZWQoKSA6IHRoaXMuZ2V0V2lkdGhDb2xsYXBzZWQoKTtcblx0XHRcdFxuXHRcdFx0dGhpcy53aWR0aChuZXdXaWR0aCk7IC8vIHRoZSBjb250ZW50IHBhbmVsIHdpZHRoIGFsd2F5cyBzdGF5cyBpbiBcImV4cGFuZGVkIHN0YXRlXCIgdG8gYXZvaWQgZmxvYXRpbmcgZWxlbWVudHNcblx0XHRcdFxuXHRcdFx0Ly8gSWYgYW4gYWx0ZXJuYXRpdmUgY29sbGFwc2VkIHZpZXcgZXhpc3RzLCB0b2dnbGUgaXQgYXMgd2VsbFxuXHRcdFx0Y29sbGFwc2VkQ29udGVudCA9IHRoaXMuZmluZCgnLmNtcy1wYW5lbC1jb250ZW50LWNvbGxhcHNlZCcpO1xuXHRcdFx0aWYoY29sbGFwc2VkQ29udGVudC5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5maW5kKCcuY21zLXBhbmVsLWNvbnRlbnQnKVtkb0V4cGFuZCA/ICdzaG93JyA6ICdoaWRlJ10oKTtcblx0XHRcdFx0dGhpcy5maW5kKCcuY21zLXBhbmVsLWNvbnRlbnQtY29sbGFwc2VkJylbZG9FeHBhbmQgPyAnaGlkZScgOiAnc2hvdyddKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb1NhdmVTdGF0ZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5zZXRQZXJzaXN0ZWRDb2xsYXBzZWRTdGF0ZSghZG9FeHBhbmQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUT0RPIEZpeCByZWRyYXcgb3JkZXIgKGlubmVyIHRvIG91dGVyKSwgYW5kIHJlLWVuYWJsZSBzaWxlbnQgZmxhZ1xuXHRcdFx0Ly8gdG8gYXZvaWQgbXVsdGlwbGUgZXhwZW5zaXZlIHJlZHJhd3Mgb24gYSBzaW5nbGUgbG9hZC5cblx0XHRcdC8vIGlmKCFzaWxlbnQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCd0b2dnbGUnLCBkb0V4cGFuZCk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcihkb0V4cGFuZCA/ICdleHBhbmQnIDogJ2NvbGxhcHNlJyk7XG5cdFx0XHQvLyB9XG5cdFx0fSxcblx0XHRcblx0XHRleHBhbmRQYW5lbDogZnVuY3Rpb24oZm9yY2UpIHtcblx0XHRcdGlmKCFmb3JjZSAmJiAhdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJykpIHJldHVybjtcblxuXHRcdFx0dGhpcy50b2dnbGVQYW5lbCh0cnVlKTtcblx0XHR9LFxuXHRcdFxuXHRcdGNvbGxhcHNlUGFuZWw6IGZ1bmN0aW9uKGZvcmNlKSB7XG5cdFx0XHRpZighZm9yY2UgJiYgdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJykpIHJldHVybjtcblxuXHRcdFx0dGhpcy50b2dnbGVQYW5lbChmYWxzZSk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuY21zLXBhbmVsLmNvbGxhcHNlZCAuY21zLXBhbmVsLXRvZ2dsZScpLmVudHdpbmUoe1xuXHRcdG9uY2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHRoaXMuZXhwYW5kUGFuZWwoKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0pO1xuXHRcblx0JCgnLmNtcy1wYW5lbCAqJykuZW50d2luZSh7XG5cdFx0Z2V0UGFuZWw6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50cygnLmNtcy1wYW5lbDpmaXJzdCcpO1xuXHRcdH1cblx0fSk7XG5cdFx0XHRcblx0JCgnLmNtcy1wYW5lbCAudG9nZ2xlLWV4cGFuZCcpLmVudHdpbmUoe1xuXHRcdG9uY2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHRoaXMuZ2V0UGFuZWwoKS5leHBhbmRQYW5lbCgpO1xuXG5cdFx0XHR0aGlzLl9zdXBlcihlKTtcblx0XHR9XG5cdH0pO1xuXHRcblx0JCgnLmNtcy1wYW5lbCAudG9nZ2xlLWNvbGxhcHNlJykuZW50d2luZSh7XG5cdFx0b25jbGljazogZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0dGhpcy5nZXRQYW5lbCgpLmNvbGxhcHNlUGFuZWwoKTtcblxuXHRcdFx0dGhpcy5fc3VwZXIoZSk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuY21zLWNvbnRlbnQtdG9vbHMuY29sbGFwc2VkJykuZW50d2luZSh7XG5cdFx0Ly8gRXhwYW5kIENNUycgY2VudHJlIHBhbmUsIHdoZW4gdGhlIHBhbmUgaXRzZWxmIGlzIGNsaWNrZWQgc29tZXdoZXJlXG5cdFx0b25jbGljazogZnVuY3Rpb24oZSkge1xuXHRcdFx0dGhpcy5leHBhbmRQYW5lbCgpO1xuXHRcdFx0dGhpcy5fc3VwZXIoZSk7XG5cdFx0fVxuXHR9KTtcbn0pO1xuIiwiaW1wb3J0ICQgZnJvbSAnalF1ZXJ5JztcbmltcG9ydCBpMThuIGZyb20gJ2kxOG4nO1xuXG4kLmVudHdpbmUoJ3NzLnByZXZpZXcnLCBmdW5jdGlvbigkKXtcblxuXHQvKipcblx0ICogU2hvd3MgYSBwcmV2aWV3YWJsZSB3ZWJzaXRlIHN0YXRlIGFsb25nc2lkZSBpdHMgZWRpdGFibGUgdmVyc2lvbiBpbiBiYWNrZW5kIFVJLlxuXHQgKlxuXHQgKiBSZWxpZXMgb24gdGhlIHNlcnZlciByZXNwb25zZXMgdG8gaW5kaWNhdGUgaWYgYSBwcmV2aWV3IGlzIGF2YWlsYWJsZSBmb3IgdGhlIFxuXHQgKiBjdXJyZW50bHkgbG9hZGVkIGFkbWluIGludGVyZmFjZSAtIHNpZ25pZmllZCBieSBjbGFzcyBcIi5jbXMtcHJldmlld2FibGVcIiBiZWluZyBwcmVzZW50LlxuXHQgKlxuXHQgKiBUaGUgcHJldmlldyBvcHRpb25zIGF0IHRoZSBib3R0b20gYXJlIGNvbnN0cnVjdHVyZWQgYnkgZ3JhYmJpbmcgYSBTaWx2ZXJTdHJpcGVOYXZpZ2F0b3IgXG5cdCAqIHN0cnVjdHVyZSBhbHNvIHByb3ZpZGVkIGJ5IHRoZSBiYWNrZW5kLlxuXHQgKi9cblx0JCgnLmNtcy1wcmV2aWV3JykuZW50d2luZSh7XG5cblx0XHQvKipcblx0XHQgKiBMaXN0IG9mIFNpbHZlclN0cmlwZU5hdmlnYXRvciBzdGF0ZXMgKFNpbHZlclN0cmlwZU5hdmlnYXRvckl0ZW0gY2xhc3NlcykgdG8gc2VhcmNoIGZvci5cblx0XHQgKiBUaGUgb3JkZXIgaXMgc2lnbmlmaWNhbnQgLSBpZiB0aGUgc3RhdGUgaXMgbm90IGF2YWlsYWJsZSwgcHJldmlldyB3aWxsIHN0YXJ0IHNlYXJjaGluZyB0aGUgbGlzdFxuXHRcdCAqIGZyb20gdGhlIGJlZ2lubmluZy5cblx0XHQgKi9cblx0XHRBbGxvd2VkU3RhdGVzOiBbJ1N0YWdlTGluaycsICdMaXZlTGluaycsJ0FyY2hpdmVMaW5rJ10sXG5cblx0XHQvKipcblx0XHQgKiBBUElcblx0XHQgKiBOYW1lIG9mIHRoZSBjdXJyZW50IHByZXZpZXcgc3RhdGUgLSBvbmUgb2YgdGhlIFwiQWxsb3dlZFN0YXRlc1wiLlxuXHRcdCAqL1xuXHRcdEN1cnJlbnRTdGF0ZU5hbWU6IG51bGwsXG5cblx0XHQvKipcblx0XHQgKiBBUElcblx0XHQgKiBDdXJyZW50IHNpemUgc2VsZWN0aW9uLlxuXHRcdCAqL1xuXHRcdEN1cnJlbnRTaXplTmFtZTogJ2F1dG8nLFxuXG5cdFx0LyoqXG5cdFx0ICogRmxhZ3Mgd2hldGhlciB0aGUgcHJldmlldyBpcyBhdmFpbGFibGUgb24gdGhpcyBDTVMgc2VjdGlvbi5cblx0XHQgKi9cblx0XHRJc1ByZXZpZXdFbmFibGVkOiBmYWxzZSxcblxuXHRcdC8qKlxuXHRcdCAqIE1vZGUgaW4gd2hpY2ggdGhlIHByZXZpZXcgd2lsbCBiZSBlbmFibGVkLlxuXHRcdCAqL1xuXHRcdERlZmF1bHRNb2RlOiAnc3BsaXQnLFxuXG5cdFx0U2l6ZXM6IHtcblx0XHRcdGF1dG86IHtcblx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcblx0XHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdH0sXG5cdFx0XHRtb2JpbGU6IHtcblx0XHRcdFx0d2lkdGg6ICczMzVweCcsIC8vIGFkZCAxNXB4IGZvciBhcHByb3ggZGVza3RvcCBzY3JvbGxiYXIgXG5cdFx0XHRcdGhlaWdodDogJzU2OHB4JyBcblx0XHRcdH0sXG5cdFx0XHRtb2JpbGVMYW5kc2NhcGU6IHtcblx0XHRcdFx0d2lkdGg6ICc1ODNweCcsIC8vIGFkZCAxNXB4IGZvciBhcHByb3ggZGVza3RvcCBzY3JvbGxiYXJcblx0XHRcdFx0aGVpZ2h0OiAnMzIwcHgnXG5cdFx0XHR9LFxuXHRcdFx0dGFibGV0OiB7XG5cdFx0XHRcdHdpZHRoOiAnNzgzcHgnLCAvLyBhZGQgMTVweCBmb3IgYXBwcm94IGRlc2t0b3Agc2Nyb2xsYmFyXG5cdFx0XHRcdGhlaWdodDogJzEwMjRweCdcblx0XHRcdH0sXG5cdFx0XHR0YWJsZXRMYW5kc2NhcGU6IHtcblx0XHRcdFx0d2lkdGg6ICcxMDM5cHgnLCAvLyBhZGQgMTVweCBmb3IgYXBwcm94IGRlc2t0b3Agc2Nyb2xsYmFyXG5cdFx0XHRcdGhlaWdodDogJzc2OHB4J1xuXHRcdFx0fSxcblx0XHRcdGRlc2t0b3A6IHtcblx0XHRcdFx0d2lkdGg6ICcxMDI0cHgnLFxuXHRcdFx0XHRoZWlnaHQ6ICc4MDBweCdcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQVBJXG5cdFx0ICogU3dpdGNoIHRoZSBwcmV2aWV3IHRvIGRpZmZlcmVudCBzdGF0ZS5cblx0XHQgKiBzdGF0ZU5hbWUgY2FuIGJlIG9uZSBvZiB0aGUgXCJBbGxvd2VkU3RhdGVzXCIuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ31cblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IFNldCB0byBGQUxTRSB0byBhdm9pZCBwZXJzaXN0aW5nIHRoZSBzdGF0ZVxuXHRcdCAqL1xuXHRcdGNoYW5nZVN0YXRlOiBmdW5jdGlvbihzdGF0ZU5hbWUsIHNhdmUpIHtcdFx0XHRcdFxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBzdGF0ZXMgPSB0aGlzLl9nZXROYXZpZ2F0b3JTdGF0ZXMoKTtcblx0XHRcdGlmKHNhdmUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdCQuZWFjaChzdGF0ZXMsIGZ1bmN0aW9uKGluZGV4LCBzdGF0ZSkge1xuXHRcdFx0XHRcdHNlbGYuc2F2ZVN0YXRlKCdzdGF0ZScsIHN0YXRlTmFtZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldEN1cnJlbnRTdGF0ZU5hbWUoc3RhdGVOYW1lKTtcblx0XHRcdHRoaXMuX2xvYWRDdXJyZW50U3RhdGUoKTtcblx0XHRcdHRoaXMucmVkcmF3KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBBUElcblx0XHQgKiBDaGFuZ2UgdGhlIHByZXZpZXcgbW9kZS5cblx0XHQgKiBtb2RlTmFtZSBjYW4gYmU6IHNwbGl0LCBjb250ZW50LCBwcmV2aWV3LlxuXHRcdCAqL1xuXHRcdGNoYW5nZU1vZGU6IGZ1bmN0aW9uKG1vZGVOYW1lLCBzYXZlKSB7XHRcdFx0XHRcblx0XHRcdHZhciBjb250YWluZXIgPSAkKCcuY21zLWNvbnRhaW5lcicpO1xuXG5cdFx0XHRpZiAobW9kZU5hbWUgPT0gJ3NwbGl0Jykge1xuXHRcdFx0XHRjb250YWluZXIuZW50d2luZSgnLnNzJykuc3BsaXRWaWV3TW9kZSgpO1xuXHRcdFx0XHR0aGlzLnNldElzUHJldmlld0VuYWJsZWQodHJ1ZSk7XG5cdFx0XHRcdHRoaXMuX2xvYWRDdXJyZW50U3RhdGUoKTtcblx0XHRcdH0gZWxzZSBpZiAobW9kZU5hbWUgPT0gJ2NvbnRlbnQnKSB7XG5cdFx0XHRcdGNvbnRhaW5lci5lbnR3aW5lKCcuc3MnKS5jb250ZW50Vmlld01vZGUoKTtcblx0XHRcdFx0dGhpcy5zZXRJc1ByZXZpZXdFbmFibGVkKGZhbHNlKTtcblx0XHRcdFx0Ly8gRG8gbm90IGxvYWQgY29udGVudCBhcyB0aGUgcHJldmlldyBpcyBub3QgdmlzaWJsZS5cblx0XHRcdH0gZWxzZSBpZiAobW9kZU5hbWUgPT0gJ3ByZXZpZXcnKSB7XG5cdFx0XHRcdGNvbnRhaW5lci5lbnR3aW5lKCcuc3MnKS5wcmV2aWV3TW9kZSgpO1xuXHRcdFx0XHR0aGlzLnNldElzUHJldmlld0VuYWJsZWQodHJ1ZSk7XG5cdFx0XHRcdHRoaXMuX2xvYWRDdXJyZW50U3RhdGUoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93ICdJbnZhbGlkIG1vZGU6ICcgKyBtb2RlTmFtZTtcblx0XHRcdH1cblxuXHRcdFx0aWYoc2F2ZSAhPT0gZmFsc2UpIHRoaXMuc2F2ZVN0YXRlKCdtb2RlJywgbW9kZU5hbWUpO1xuXG5cdFx0XHR0aGlzLnJlZHJhdygpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQVBJXG5cdFx0ICogQ2hhbmdlIHRoZSBwcmV2aWV3IHNpemUuXG5cdFx0ICogc2l6ZU5hbWUgY2FuIGJlOiBhdXRvLCBkZXNrdG9wLCB0YWJsZXQsIG1vYmlsZS5cblx0XHQgKi9cblx0XHRjaGFuZ2VTaXplOiBmdW5jdGlvbihzaXplTmFtZSkge1xuXHRcdFx0dmFyIHNpemVzID0gdGhpcy5nZXRTaXplcygpO1xuXG5cdFx0XHR0aGlzLnNldEN1cnJlbnRTaXplTmFtZShzaXplTmFtZSk7XG5cdFx0XHR0aGlzLnJlbW92ZUNsYXNzKCdhdXRvIGRlc2t0b3AgdGFibGV0IG1vYmlsZScpLmFkZENsYXNzKHNpemVOYW1lKTtcblx0XHRcdHRoaXMuZmluZCgnLnByZXZpZXctZGV2aWNlLW91dGVyJylcblx0XHRcdFx0LndpZHRoKHNpemVzW3NpemVOYW1lXS53aWR0aClcblx0XHRcdFx0LmhlaWdodChzaXplc1tzaXplTmFtZV0uaGVpZ2h0KTtcblx0XHRcdHRoaXMuZmluZCgnLnByZXZpZXctZGV2aWNlLWlubmVyJylcblx0XHRcdFx0LndpZHRoKHNpemVzW3NpemVOYW1lXS53aWR0aCk7XG5cblx0XHRcdHRoaXMuc2F2ZVN0YXRlKCdzaXplJywgc2l6ZU5hbWUpO1xuXG5cdFx0XHR0aGlzLnJlZHJhdygpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQVBJXG5cdFx0ICogVXBkYXRlIHRoZSB2aXN1YWwgYXBwZWFyYW5jZSB0byBtYXRjaCB0aGUgaW50ZXJuYWwgcHJldmlldyBzdGF0ZS5cblx0XHQgKi9cblx0XHRyZWRyYXc6IGZ1bmN0aW9uKCkge1x0XHRcdFxuXG5cdFx0XHRpZih3aW5kb3cuZGVidWcpIGNvbnNvbGUubG9nKCdyZWRyYXcnLCB0aGlzLmF0dHIoJ2NsYXNzJyksIHRoaXMuZ2V0KDApKTtcblxuXHRcdFx0Ly8gVXBkYXRlIHByZXZpZXcgc3RhdGUgc2VsZWN0b3IuXG5cdFx0XHR2YXIgY3VycmVudFN0YXRlTmFtZSA9IHRoaXMuZ2V0Q3VycmVudFN0YXRlTmFtZSgpO1xuXHRcdFx0aWYgKGN1cnJlbnRTdGF0ZU5hbWUpIHtcblx0XHRcdFx0dGhpcy5maW5kKCcuY21zLXByZXZpZXctc3RhdGVzJykuY2hhbmdlVmlzaWJsZVN0YXRlKGN1cnJlbnRTdGF0ZU5hbWUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBVcGRhdGUgcHJldmlldyBtb2RlIHNlbGVjdG9ycy5cblx0XHRcdHZhciBsYXlvdXRPcHRpb25zID0gJCgnLmNtcy1jb250YWluZXInKS5lbnR3aW5lKCcuc3MnKS5nZXRMYXlvdXRPcHRpb25zKCk7XG5cdFx0XHRpZiAobGF5b3V0T3B0aW9ucykge1xuXHRcdFx0XHQvLyBUaGVyZSBhcmUgdHdvIG1vZGUgc2VsZWN0b3JzIHRoYXQgd2UgbmVlZCB0byBrZWVwIGluIHN5bmMuIFJlZHJhdyBib3RoLlxuXHRcdFx0XHQkKCcucHJldmlldy1tb2RlLXNlbGVjdG9yJykuY2hhbmdlVmlzaWJsZU1vZGUobGF5b3V0T3B0aW9ucy5tb2RlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIHByZXZpZXcgc2l6ZSBzZWxlY3Rvci5cblx0XHRcdHZhciBjdXJyZW50U2l6ZU5hbWUgPSB0aGlzLmdldEN1cnJlbnRTaXplTmFtZSgpO1xuXHRcdFx0aWYgKGN1cnJlbnRTaXplTmFtZSkge1xuXHRcdFx0XHR0aGlzLmZpbmQoJy5wcmV2aWV3LXNpemUtc2VsZWN0b3InKS5jaGFuZ2VWaXNpYmxlU2l6ZSh0aGlzLmdldEN1cnJlbnRTaXplTmFtZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFN0b3JlIHRoZSBwcmV2aWV3IG9wdGlvbnMgZm9yIHRoaXMgcGFnZS5cblx0XHQgKi9cblx0XHRzYXZlU3RhdGUgOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYodGhpcy5fc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSkgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbXMtcHJldmlldy1zdGF0ZS0nICsgbmFtZSwgdmFsdWUpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBMb2FkIHByZXZpb3VzbHkgc3RvcmVkIHByZWZlcmVuY2VzXG5cdFx0ICovXG5cdFx0bG9hZFN0YXRlIDogZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0aWYodGhpcy5fc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSkgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY21zLXByZXZpZXctc3RhdGUtJyArIG5hbWUpO1xuXHRcdH0sIFxuXG5cdFx0LyoqXG5cdFx0ICogRGlzYWJsZSB0aGUgYXJlYSAtIGl0IHdpbGwgbm90IGFwcGVhciBpbiB0aGUgR1VJLlxuXHRcdCAqIENhdmVhdDogdGhlIHByZXZpZXcgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGVuYWJsZWQgd2hlbiBcIi5jbXMtcHJldmlld2FibGVcIiBjbGFzcyBpcyBkZXRlY3RlZC5cblx0XHQgKi9cblx0XHRkaXNhYmxlUHJldmlldzogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnNldFBlbmRpbmdVUkwobnVsbCk7XG5cdFx0XHR0aGlzLl9sb2FkVXJsKCdhYm91dDpibGFuaycpO1xuXHRcdFx0dGhpcy5fYmxvY2soKTtcblx0XHRcdHRoaXMuY2hhbmdlTW9kZSgnY29udGVudCcsIGZhbHNlKTtcblx0XHRcdHRoaXMuc2V0SXNQcmV2aWV3RW5hYmxlZChmYWxzZSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRW5hYmxlIHRoZSBhcmVhIGFuZCBzdGFydCB1cGRhdGluZyB0byByZWZsZWN0IHRoZSBjb250ZW50IGVkaXRpbmcuXG5cdFx0ICovXG5cdFx0ZW5hYmxlUHJldmlldzogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIXRoaXMuZ2V0SXNQcmV2aWV3RW5hYmxlZCgpKSB7XG5cdFx0XHRcdHRoaXMuc2V0SXNQcmV2aWV3RW5hYmxlZCh0cnVlKTtcblxuXHRcdFx0XHQvLyBJbml0aWFsaXNlIG1vZGUuXG5cdFx0XHRcdGlmICgkLmJyb3dzZXIubXNpZSAmJiAkLmJyb3dzZXIudmVyc2lvbi5zbGljZSgwLDMpPD03KSB7XG5cdFx0XHRcdFx0Ly8gV2UgZG8gbm90IHN1cHBvcnQgdGhlIHNwbGl0IG1vZGUgaW4gSUUgPCA4LlxuXHRcdFx0XHRcdHRoaXMuY2hhbmdlTW9kZSgnY29udGVudCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuY2hhbmdlTW9kZSh0aGlzLmdldERlZmF1bHRNb2RlKCksIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybiBhIHN0eWxlIGVsZW1lbnQgd2UgY2FuIHVzZSBpbiBJRTggdG8gZml4IGZvbnRzIChzZWUgcmVhZHlzdGF0ZWNoYW5nZSBiaW5kaW5nIGluIG9uYWRkIGJlbG93KVxuXHRcdCAqL1xuXHRcdGdldE9yQXBwZW5kRm9udEZpeFN0eWxlRWxlbWVudDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc3R5bGUgPSAkKCcjRm9udEZpeFN0eWxlRWxlbWVudCcpO1xuXHRcdFx0aWYgKCFzdHlsZS5sZW5ndGgpIHtcblx0XHRcdFx0c3R5bGUgPSAkKFxuXHRcdFx0XHRcdCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCIgaWQ9XCJGb250Rml4U3R5bGVFbGVtZW50XCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiPicrXG5cdFx0XHRcdFx0XHQnOmJlZm9yZSw6YWZ0ZXJ7Y29udGVudDpub25lICFpbXBvcnRhbnR9Jytcblx0XHRcdFx0XHQnPC9zdHlsZT4nXG5cdFx0XHRcdCkuYXBwZW5kVG8oJ2hlYWQnKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHN0eWxlO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbml0aWFsaXNlIHRoZSBwcmV2aWV3IGVsZW1lbnQuXG5cdFx0ICovXG5cdFx0b25hZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBsYXlvdXRDb250YWluZXIgPSB0aGlzLnBhcmVudCgpLCBpZnJhbWUgPSB0aGlzLmZpbmQoJ2lmcmFtZScpO1xuXG5cdFx0XHQvLyBDcmVhdGUgbGF5b3V0IGFuZCBjb250cm9sc1xuXHRcdFx0aWZyYW1lLmFkZENsYXNzKCdjZW50ZXInKTtcblx0XHRcdGlmcmFtZS5iaW5kKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuX2FkanVzdElmcmFtZUZvclByZXZpZXcoKTtcblxuXHRcdFx0XHQvLyBMb2FkIGVkaXQgdmlldyBmb3IgbmV3IHBhZ2UsIGJ1dCBvbmx5IGlmIHRoZSBwcmV2aWV3IGlzIGFjdGl2YXRlZCBhdCB0aGUgbW9tZW50LlxuXHRcdFx0XHQvLyBUaGlzIGF2b2lkcyBlLmcuIGZvcmNlLXJlZGlyZWN0aW9ucyBvZiB0aGUgZWRpdCB2aWV3IG9uIFJlZGlyZWN0b3JQYWdlIGluc3RhbmNlcy5cblx0XHRcdFx0c2VsZi5fbG9hZEN1cnJlbnRQYWdlKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gSWYgdGhlcmUncyBhbnkgd2ViZm9udHMgaW4gdGhlIHByZXZpZXcsIElFOCB3aWxsIHN0YXJ0IGdsaXRjaGluZy4gVGhpcyBmaXhlcyB0aGF0LlxuXHRcdFx0aWYgKCQuYnJvd3Nlci5tc2llICYmIDggPT09IHBhcnNlSW50KCQuYnJvd3Nlci52ZXJzaW9uLCAxMCkpIHtcblx0XHRcdFx0aWZyYW1lLmJpbmQoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0aWYoaWZyYW1lWzBdLnJlYWR5U3RhdGUgPT0gJ2ludGVyYWN0aXZlJykge1xuXHRcdFx0XHRcdFx0c2VsZi5nZXRPckFwcGVuZEZvbnRGaXhTdHlsZUVsZW1lbnQoKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpeyBzZWxmLmdldE9yQXBwZW5kRm9udEZpeFN0eWxlRWxlbWVudCgpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7IH0sIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFByZXZpZXcgbWlnaHQgbm90IGJlIGF2YWlsYWJsZSBpbiBhbGwgYWRtaW4gaW50ZXJmYWNlcyAtIGJsb2NrL2Rpc2FibGUgd2hlbiBuZWNlc3Nhcnlcblx0XHRcdHRoaXMuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY21zLXByZXZpZXctb3ZlcmxheSB1aS13aWRnZXQtb3ZlcmxheS1saWdodFwiPjwvZGl2PicpO1xuXHRcdFx0dGhpcy5maW5kKCcuY21zLXByZXZpZXctb3ZlcmxheScpLmhpZGUoKTtcdFx0XHRcblxuXHRcdFx0dGhpcy5kaXNhYmxlUHJldmlldygpO1xuXG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0KiBEZXRlY3QgYW5kIHVzZSBsb2NhbFN0b3JhZ2UgaWYgYXZhaWxhYmxlLiBJbiBJRTExIHdpbmRvd3MgOC4xIGNhbGwgdG8gd2luZG93LmxvY2FsU3RvcmFnZSB3YXMgdGhyb3dpbmcgb3V0IGFuIGFjY2VzcyBkZW5pZWQgZXJyb3IgaW4gc29tZSBjYXNlcyB3aGljaCB3YXMgY2F1c2luZyB0aGUgcHJldmlldyB3aW5kb3cgbm90IHRvIGRpc3BsYXkgY29ycmVjdGx5IGluIHRoZSBDTVMgYWRtaW4gYXJlYS5cblx0XHQqL1xuXHRcdF9zdXBwb3J0c0xvY2FsU3RvcmFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdWlkID0gbmV3IERhdGU7XG5cdFx0XHR2YXIgc3RvcmFnZTtcblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQoc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UpLnNldEl0ZW0odWlkLCB1aWQpO1xuXHRcdFx0XHRyZXN1bHQgPSBzdG9yYWdlLmdldEl0ZW0odWlkKSA9PSB1aWQ7XG5cdFx0XHRcdHN0b3JhZ2UucmVtb3ZlSXRlbSh1aWQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0ICYmIHN0b3JhZ2U7XG5cdFx0XHR9IGNhdGNoIChleGNlcHRpb24pIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCdsb2NhbFN0b3JnZSBpcyBub3QgYXZhaWxhYmxlIGR1ZSB0byBjdXJyZW50IGJyb3dzZXIgLyBzeXN0ZW0gc2V0dGluZ3MuJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9uZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgJHZpZXdNb2RlU2VsZWN0b3IgPSAkKCcucHJldmlldy1tb2RlLXNlbGVjdG9yJyk7XG5cblx0XHRcdCR2aWV3TW9kZVNlbGVjdG9yLnJlbW92ZUNsYXNzKCdzcGxpdC1kaXNhYmxlZCcpO1xuXHRcdFx0JHZpZXdNb2RlU2VsZWN0b3IuZmluZCgnLmRpc2FibGVkLXRvb2x0aXAnKS5oaWRlKCk7XG5cdFx0fSxcblxuXHRcdG9uZGlzYWJsZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyICR2aWV3TW9kZVNlbGVjdG9yID0gJCgnLnByZXZpZXctbW9kZS1zZWxlY3RvcicpO1xuXG5cdFx0XHQkdmlld01vZGVTZWxlY3Rvci5hZGRDbGFzcygnc3BsaXQtZGlzYWJsZWQnKTtcblx0XHRcdCR2aWV3TW9kZVNlbGVjdG9yLmZpbmQoJy5kaXNhYmxlZC10b29sdGlwJykuc2hvdygpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBTZXQgdGhlIHByZXZpZXcgdG8gdW5hdmFpbGFibGUgLSBjb3VsZCBiZSBzdGlsbCB2aXNpYmxlLiBUaGlzIGlzIHB1cmVseSB2aXN1YWwuXG5cdFx0ICovXG5cdFx0X2Jsb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuYWRkQ2xhc3MoJ2Jsb2NrZWQnKTtcblx0XHRcdHRoaXMuZmluZCgnLmNtcy1wcmV2aWV3LW92ZXJsYXknKS5zaG93KCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogU2V0IHRoZSBwcmV2aWV3IHRvIGF2YWlsYWJsZSAocmVtb3ZlIHRoZSBvdmVybGF5KTtcblx0XHQgKi9cblx0XHRfdW5ibG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnJlbW92ZUNsYXNzKCdibG9ja2VkJyk7XG5cdFx0XHR0aGlzLmZpbmQoJy5jbXMtcHJldmlldy1vdmVybGF5JykuaGlkZSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSB0aGUgcHJldmlldyBhY2NvcmRpbmcgdG8gYnJvd3NlciBhbmQgQ01TIHNlY3Rpb24gY2FwYWJpbGl0aWVzLlxuXHRcdCAqL1xuXHRcdF9pbml0aWFsaXNlRnJvbUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG1vZGUsIHNpemU7XG5cblx0XHRcdGlmICghJCgnLmNtcy1wcmV2aWV3YWJsZScpLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLmRpc2FibGVQcmV2aWV3KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtb2RlID0gdGhpcy5sb2FkU3RhdGUoJ21vZGUnKTtcblx0XHRcdFx0c2l6ZSA9IHRoaXMubG9hZFN0YXRlKCdzaXplJyk7XG5cblx0XHRcdFx0dGhpcy5fbW92ZU5hdmlnYXRvcigpO1xuXHRcdFx0XHRpZighbW9kZSB8fCBtb2RlICE9ICdjb250ZW50Jykge1xuXHRcdFx0XHRcdHRoaXMuZW5hYmxlUHJldmlldygpO1xuXHRcdFx0XHRcdHRoaXMuX2xvYWRDdXJyZW50U3RhdGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXG5cdFx0XHRcdC8vIG5vdyBjaGVjayB0aGUgY29va2llIHRvIHNlZSBpZiB3ZSBoYXZlIGFueSBwcmV2aWV3IHNldHRpbmdzIHRoYXQgaGF2ZSBiZWVuXG5cdFx0XHRcdC8vIHJldGFpbmVkIGZvciB0aGlzIHBhZ2UgZnJvbSB0aGUgbGFzdCB2aXNpdFxuXHRcdFx0XHRpZihtb2RlKSB0aGlzLmNoYW5nZU1vZGUobW9kZSk7XG5cdFx0XHRcdGlmKHNpemUpIHRoaXMuY2hhbmdlU2l6ZShzaXplKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgcHJldmlldyB3aGVuZXZlciBhbnkgcGFuZWxzIGFyZSByZWxvYWRlZC5cblx0XHQgKi9cblx0XHQnZnJvbSAuY21zLWNvbnRhaW5lcic6IHtcblx0XHRcdG9uYWZ0ZXJzdGF0ZWNoYW5nZTogZnVuY3Rpb24oZSwgZGF0YSkge1xuXHRcdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJldmlldyBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBjdXN0b20gcmVkaXJlY3Rcblx0XHRcdFx0aWYoZGF0YS54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtQ29udHJvbGxlclVSTCcpKSByZXR1cm47XG5cblx0XHRcdFx0dGhpcy5faW5pdGlhbGlzZUZyb21Db250ZW50KCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiBAdmFyIHN0cmluZyBBIFVSTCB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhpcyBwcmV2aWV3IHBhbmVsIG9uY2UgaXQgYmVjb21lcyB2aXNpYmxlICovXG5cdFx0UGVuZGluZ1VSTDogbnVsbCxcblxuXHRcdG9uY29sdW1udmlzaWJpbGl0eWNoYW5nZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHVybCA9IHRoaXMuZ2V0UGVuZGluZ1VSTCgpO1xuXHRcdFx0aWYgKHVybCAmJiAhdGhpcy5pcygnLmNvbHVtbi1oaWRkZW4nKSkge1xuXHRcdFx0XHR0aGlzLnNldFBlbmRpbmdVUkwobnVsbCk7XG5cdFx0XHRcdHRoaXMuX2xvYWRVcmwodXJsKTtcblx0XHRcdFx0dGhpcy5fdW5ibG9jaygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgcHJldmlldyB3aGVuZXZlciBhIGZvcm0gaXMgc3VibWl0dGVkLlxuXHRcdCAqIFRoaXMgaXMgYW4gYWx0ZXJuYXRpdmUgdG8gdGhlIExlZnRBbmRtTWFpbjo6bG9hZFBhbmVsIGZ1bmN0aW9uYWxpdHkgd2hpY2ggd2UgYWxyZWFkeVxuXHRcdCAqIGNvdmVyIGluIHRoZSBvbmFmdGVyc3RhdGVjaGFuZ2UgaGFuZGxlci5cblx0XHQgKi9cblx0XHQnZnJvbSAuY21zLWNvbnRhaW5lciAuY21zLWVkaXQtZm9ybSc6IHtcblx0XHRcdG9uYWZ0ZXJzdWJtaXRmb3JtOiBmdW5jdGlvbigpe1xuXHRcdFx0XHR0aGlzLl9pbml0aWFsaXNlRnJvbUNvbnRlbnQoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIHByZXZpZXcgaWZyYW1lIChpZiBpdHMgbm90IGFscmVhZHkgZGlzcGxheWVkKS5cblx0XHQgKi9cblx0XHRfbG9hZFVybDogZnVuY3Rpb24odXJsKSB7XG5cdFx0XHR0aGlzLmZpbmQoJ2lmcmFtZScpLmFkZENsYXNzKCdsb2FkaW5nJykuYXR0cignc3JjJywgdXJsKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBGZXRjaCBhdmFpbGFibGUgc3RhdGVzIGZyb20gdGhlIGN1cnJlbnQgU2lsdmVyU3RyaXBlTmF2aWdhdG9yIChTaWx2ZXJTdHJpcGVOYXZpZ2F0b3JJdGVtcykuXG5cdFx0ICogTmF2aWdhdG9yIGlzIHN1cHBsaWVkIGJ5IHRoZSBiYWNrZW5kIGFuZCBjb250YWlucyBhbGwgc3RhdGUgb3B0aW9ucyBmb3IgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHRcdCAqL1xuXHRcdF9nZXROYXZpZ2F0b3JTdGF0ZXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gV2FsayB0aHJvdWdoIGF2YWlsYWJsZSBzdGF0ZXMgYW5kIGdldCB0aGUgVVJMcy5cblx0XHRcdHZhciB1cmxNYXAgPSAkLm1hcCh0aGlzLmdldEFsbG93ZWRTdGF0ZXMoKSwgZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0XHR2YXIgc3RhdGVMaW5rID0gJCgnLmNtcy1wcmV2aWV3LXN0YXRlcyAuc3RhdGUtbmFtZVtkYXRhLW5hbWU9JyArIG5hbWUgKyAnXScpO1xuXHRcdFx0XHRpZihzdGF0ZUxpbmsubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdG5hbWU6IG5hbWUsIFxuXHRcdFx0XHRcdFx0dXJsOiBzdGF0ZUxpbmsuYXR0cignZGF0YS1saW5rJyksXG5cdFx0XHRcdFx0XHRhY3RpdmU6IHN0YXRlTGluay5pcygnOnJhZGlvJykgPyBzdGF0ZUxpbmsuaXMoJzpjaGVja2VkJykgOiBzdGF0ZUxpbmsuaXMoJzpzZWxlY3RlZCcpXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiB1cmxNYXA7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIExvYWQgY3VycmVudCBzdGF0ZSBpbnRvIHRoZSBwcmV2aWV3IChlLmcuIFN0YWdlTGluayBvciBMaXZlTGluaykuXG5cdFx0ICogV2UgdHJ5IHRvIHJldXNlIHRoZSBzdGF0ZSB3ZSBoYXZlIGJlZW4gcHJldmlvdXNseSBpbi4gT3RoZXJ3aXNlIHdlIGZhbGwgYmFja1xuXHRcdCAqIHRvIHRoZSBmaXJzdCBzdGF0ZSBhdmFpbGFibGUgb24gdGhlIFwiQWxsb3dlZFN0YXRlc1wiIGxpc3QuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyBOZXcgc3RhdGUgbmFtZS5cblx0XHQgKi9cblx0XHRfbG9hZEN1cnJlbnRTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIXRoaXMuZ2V0SXNQcmV2aWV3RW5hYmxlZCgpKSByZXR1cm4gdGhpcztcblxuXHRcdFx0dmFyIHN0YXRlcyA9IHRoaXMuX2dldE5hdmlnYXRvclN0YXRlcygpO1xuXHRcdFx0dmFyIGN1cnJlbnRTdGF0ZU5hbWUgPSB0aGlzLmdldEN1cnJlbnRTdGF0ZU5hbWUoKTtcblx0XHRcdHZhciBjdXJyZW50U3RhdGUgPSBudWxsO1xuXG5cdFx0XHQvLyBGaW5kIGN1cnJlbnQgc3RhdGUgd2l0aGluIGN1cnJlbnRseSBhdmFpbGFibGUgc3RhdGVzLlxuXHRcdFx0aWYgKHN0YXRlcykge1xuXHRcdFx0XHRjdXJyZW50U3RhdGUgPSAkLmdyZXAoc3RhdGVzLCBmdW5jdGlvbihzdGF0ZSwgaW5kZXgpIHtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0Y3VycmVudFN0YXRlTmFtZSA9PT0gc3RhdGUubmFtZSB8fFxuXHRcdFx0XHRcdFx0KCFjdXJyZW50U3RhdGVOYW1lICYmIHN0YXRlLmFjdGl2ZSlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHVybCA9IG51bGw7XG5cblx0XHRcdGlmIChjdXJyZW50U3RhdGVbMF0pIHtcblx0XHRcdFx0Ly8gU3RhdGUgaXMgYXZhaWxhYmxlIG9uIHRoZSBuZXdseSBsb2FkZWQgY29udGVudC4gR2V0IGl0LlxuXHRcdFx0XHR1cmwgPSBjdXJyZW50U3RhdGVbMF0udXJsO1xuXHRcdFx0fSBlbHNlIGlmIChzdGF0ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdC8vIEZhbGwgYmFjayB0byB0aGUgZmlyc3QgYXZhaWxhYmxlIGNvbnRlbnQgc3RhdGUuXG5cdFx0XHRcdHRoaXMuc2V0Q3VycmVudFN0YXRlTmFtZShzdGF0ZXNbMF0ubmFtZSk7XG5cdFx0XHRcdHVybCA9IHN0YXRlc1swXS51cmw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBObyBzdGF0ZSBhdmFpbGFibGUgYXQgYWxsLlxuXHRcdFx0XHR0aGlzLnNldEN1cnJlbnRTdGF0ZU5hbWUobnVsbCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1hcmsgdXJsIGFzIGEgcHJldmlldyB1cmwgc28gaXQgY2FuIGdldCBzcGVjaWFsIHRyZWF0bWVudFxuIFx0XHRcdHVybCArPSAoKHVybC5pbmRleE9mKCc/JykgPT09IC0xKSA/ICc/JyA6ICcmJykgKyAnQ01TUHJldmlldz0xJztcblxuXHRcdFx0Ly8gSWYgdGhpcyBwcmV2aWV3IHBhbmVsIGlzbid0IHZpc2libGUgYXQgdGhlIG1vbWVudCwgZGVsYXkgbG9hZGluZyB0aGUgVVJMIHVudGlsIGl0IChtYXliZSkgaXMgbGF0ZXJcblx0XHRcdGlmICh0aGlzLmlzKCcuY29sdW1uLWhpZGRlbicpKSB7XG5cdFx0XHRcdHRoaXMuc2V0UGVuZGluZ1VSTCh1cmwpO1xuXHRcdFx0XHR0aGlzLl9sb2FkVXJsKCdhYm91dDpibGFuaycpO1xuXHRcdFx0XHR0aGlzLl9ibG9jaygpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2V0UGVuZGluZ1VSTChudWxsKTtcblxuXHRcdFx0XHRpZiAodXJsKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9hZFVybCh1cmwpO1xuXHRcdFx0XHRcdHRoaXMuX3VuYmxvY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9ibG9jaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBNb3ZlIHRoZSBuYXZpZ2F0b3IgZnJvbSB0aGUgY29udGVudCB0byB0aGUgcHJldmlldyBiYXIuXG5cdFx0ICovXG5cdFx0X21vdmVOYXZpZ2F0b3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHByZXZpZXdFbCA9ICQoJy5jbXMtcHJldmlldyAuY21zLXByZXZpZXctY29udHJvbHMnKTtcblx0XHRcdHZhciBuYXZpZ2F0b3JFbCA9ICQoJy5jbXMtZWRpdC1mb3JtIC5jbXMtbmF2aWdhdG9yJyk7XG5cblx0XHRcdGlmIChuYXZpZ2F0b3JFbC5sZW5ndGggJiYgcHJldmlld0VsLmxlbmd0aCkge1xuXHRcdFx0XHQvLyBOYXZpZ2F0b3IgaXMgYXZhaWxhYmxlIC0gaW5zdGFsbCB0aGUgbmF2aWdhdG9yLlxuXHRcdFx0XHRwcmV2aWV3RWwuaHRtbCgkKCcuY21zLWVkaXQtZm9ybSAuY21zLW5hdmlnYXRvcicpLmRldGFjaCgpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE5hdmlnYXRvciBub3QgYXZhaWxhYmxlLlxuXHRcdFx0XHR0aGlzLl9ibG9jaygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBMb2FkcyB0aGUgbWF0Y2hpbmcgZWRpdCBmb3JtIGZvciBhIHBhZ2Ugdmlld2VkIGluIHRoZSBwcmV2aWV3IGlmcmFtZSxcblx0XHQgKiBiYXNlZCBvbiBtZXRhZGF0YSBzZW50IGFsb25nIHdpdGggdGhpcyBkb2N1bWVudC5cblx0XHQgKi9cblx0XHRfbG9hZEN1cnJlbnRQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5nZXRJc1ByZXZpZXdFbmFibGVkKCkpIHJldHVybjtcblxuXHRcdFx0dmFyIGRvYyA9IHRoaXMuZmluZCgnaWZyYW1lJylbMF0uY29udGVudERvY3VtZW50LFxuXHRcdFx0XHRjb250YWluZXJFbCA9ICQoJy5jbXMtY29udGFpbmVyJyk7XG5cblx0XHRcdC8vIExvYWQgdGhpcyBwYWdlIGluIHRoZSBhZG1pbiBpbnRlcmZhY2UgaWYgYXBwcm9wcmlhdGVcblx0XHRcdHZhciBpZCA9ICQoZG9jKS5maW5kKCdtZXRhW25hbWU9eC1wYWdlLWlkXScpLmF0dHIoJ2NvbnRlbnQnKTsgXG5cdFx0XHR2YXIgZWRpdExpbmsgPSAkKGRvYykuZmluZCgnbWV0YVtuYW1lPXgtY21zLWVkaXQtbGlua10nKS5hdHRyKCdjb250ZW50Jyk7XG5cdFx0XHR2YXIgY29udGVudFBhbmVsID0gJCgnLmNtcy1jb250ZW50Jyk7XG5cdFx0XHRcblx0XHRcdGlmKGlkICYmIGNvbnRlbnRQYW5lbC5maW5kKCc6aW5wdXRbbmFtZT1JRF0nKS52YWwoKSAhPSBpZCkge1xuXHRcdFx0XHQvLyBJZ25vcmUgYmVoYXZpb3VyIHdpdGhvdXQgaGlzdG9yeSBzdXBwb3J0IChhcyB3ZSBuZWVkIGFqYXggbG9hZGluZyBcblx0XHRcdFx0Ly8gZm9yIHRoZSBuZXcgZm9ybSB0byBsb2FkIGluIHRoZSBiYWNrZ3JvdW5kKVxuXHRcdFx0XHRpZih3aW5kb3cuSGlzdG9yeS5lbmFibGVkKSBcblx0XHRcdFx0XHQkKCcuY21zLWNvbnRhaW5lcicpLmVudHdpbmUoJy5zcycpLmxvYWRQYW5lbChlZGl0TGluayk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFByZXBhcmUgdGhlIGlmcmFtZSBjb250ZW50IGZvciBwcmV2aWV3LlxuXHRcdCAqL1xuXHRcdF9hZGp1c3RJZnJhbWVGb3JQcmV2aWV3OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpZnJhbWUgPSB0aGlzLmZpbmQoJ2lmcmFtZScpWzBdO1xuXHRcdFx0aWYoaWZyYW1lKXtcblx0XHRcdFx0dmFyIGRvYyA9IGlmcmFtZS5jb250ZW50RG9jdW1lbnQ7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcblx0XHRcdGlmKCFkb2MpIHJldHVybjtcblxuXHRcdFx0Ly8gT3BlbiBleHRlcm5hbCBsaW5rcyBpbiBuZXcgd2luZG93IHRvIGF2b2lkIFwiZXNjYXBpbmdcIiB0aGUgaW50ZXJuYWwgcGFnZSBjb250ZXh0IGluIHRoZSBwcmV2aWV3XG5cdFx0XHQvLyBpZnJhbWUsIHdoaWNoIGlzIGltcG9ydGFudCB0byBzdGF5IGluIGZvciB0aGUgQ01TIGxvZ2ljLlxuXHRcdFx0dmFyIGxpbmtzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdBJyk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBocmVmID0gbGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmKCFocmVmKSBjb250aW51ZTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChocmVmLm1hdGNoKC9eaHR0cDpcXC9cXC8vKSkgbGlua3NbaV0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhpZGUgdGhlIG5hdmlnYXRvciBmcm9tIHRoZSBwcmV2aWV3IGlmcmFtZSBhbmQgdXNlIG9ubHkgdGhlIENNUyBvbmUuXG5cdFx0XHR2YXIgbmF2aSA9IGRvYy5nZXRFbGVtZW50QnlJZCgnU2lsdmVyU3RyaXBlTmF2aWdhdG9yJyk7XG5cdFx0XHRpZihuYXZpKSBuYXZpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR2YXIgbmF2aU1zZyA9IGRvYy5nZXRFbGVtZW50QnlJZCgnU2lsdmVyU3RyaXBlTmF2aWdhdG9yTWVzc2FnZScpO1xuXHRcdFx0aWYobmF2aU1zZykgbmF2aU1zZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5cdFx0XHQvLyBUcmlnZ2VyIGV4dGVuc2lvbnMuXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVySWZyYW1lQWRqdXN0ZWRGb3JQcmV2aWV3JywgWyBkb2MgXSk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuY21zLWVkaXQtZm9ybScpLmVudHdpbmUoe1xuXHRcdG9uYWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0XHQkKCcuY21zLXByZXZpZXcnKS5faW5pdGlhbGlzZUZyb21Db250ZW50KCk7XG5cdFx0fVxuXHR9KTtcblx0XG5cdC8qKlxuXHQgKiBcIlByZXZpZXcgc3RhdGVcIiBmdW5jdGlvbnMuXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cdCQoJy5jbXMtcHJldmlldy1zdGF0ZXMnKS5lbnR3aW5lKHtcblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIHN0YXRlIHNlbGVjdG9yLlxuXHRcdCAqL1xuXHRcdGNoYW5nZVZpc2libGVTdGF0ZTogZnVuY3Rpb24oc3RhdGUpIHtcblx0XHRcdHRoaXMuZmluZCgnaW5wdXRbZGF0YS1uYW1lPVwiJytzdGF0ZSsnXCJdJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLmNtcy1wcmV2aWV3LXN0YXRlcyAuc3RhdGUtbmFtZScpLmVudHdpbmUoe1xuXHRcdC8qKlxuXHRcdCAqIFJlYWN0cyB0byB0aGUgdXNlciBjaGFuZ2luZyB0aGUgc3RhdGUgb2YgdGhlIHByZXZpZXcuXG5cdFx0ICovXG5cdFx0b25jbGljazogZnVuY3Rpb24oZSkge1x0XG5cdFx0XHQvL0FkZCBhbmQgcmVtb3ZlIGNsYXNzZXMgdG8gbWFrZSBzd2l0Y2ggd29yayBvayBpbiBvbGQgSUVcblx0XHRcdHRoaXMucGFyZW50KCkuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdHRoaXMubmV4dCgnbGFiZWwnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdHZhciB0YXJnZXRTdGF0ZU5hbWUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbmFtZScpO1xuXHRcdFx0Ly8gUmVsb2FkIHByZXZpZXcgd2l0aCB0aGUgc2VsZWN0ZWQgc3RhdGUuXG5cdFx0XHQkKCcuY21zLXByZXZpZXcnKS5jaGFuZ2VTdGF0ZSh0YXJnZXRTdGF0ZU5hbWUpO1x0XHRcdFx0XG5cdFx0fVxuXHR9KTtcdFxuXHRcblx0LyoqXG5cdCAqIFwiUHJldmlldyBtb2RlXCIgZnVuY3Rpb25zXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cdCQoJy5wcmV2aWV3LW1vZGUtc2VsZWN0b3InKS5lbnR3aW5lKHtcblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIG1vZGUgc2VsZWN0b3IuXG5cdFx0ICovXG5cdFx0Y2hhbmdlVmlzaWJsZU1vZGU6IGZ1bmN0aW9uKG1vZGUpIHtcblx0XHRcdHRoaXMuZmluZCgnc2VsZWN0Jylcblx0XHRcdFx0LnZhbChtb2RlKVxuXHRcdFx0XHQudHJpZ2dlcignbGlzenQ6dXBkYXRlZCcpXG5cdFx0XHRcdC5fYWRkSWNvbigpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLnByZXZpZXctbW9kZS1zZWxlY3RvciBzZWxlY3QnKS5lbnR3aW5lKHtcblx0XHQvKipcblx0XHQgKiBSZWFjdHMgdG8gdGhlIHVzZXIgY2hhbmdpbmcgdGhlIHByZXZpZXcgbW9kZS5cblx0XHQgKi9cblx0XHRvbmNoYW5nZTogZnVuY3Rpb24oZSkge1x0XHRcdFx0XG5cdFx0XHR0aGlzLl9zdXBlcihlKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dmFyIHRhcmdldFN0YXRlTmFtZSA9ICQodGhpcykudmFsKCk7XG5cdFx0XHQkKCcuY21zLXByZXZpZXcnKS5jaGFuZ2VNb2RlKHRhcmdldFN0YXRlTmFtZSk7XG5cdFx0fVxuXHR9KTtcblxuXHRcblx0JCgnLnByZXZpZXctbW9kZS1zZWxlY3RvciAuY2h6bi1yZXN1bHRzIGxpJykuZW50d2luZSh7XG5cdFx0LyoqXG5cdFx0ICogIElFOCBkb2Vzbid0IHN1cHBvcnQgcHJvZ3JhbWF0aWMgYWNjZXNzIHRvIG9uY2hhbmdlIGV2ZW50IFxuXHRcdCAqXHRzbyByZWFjdCBvbiBjbGlja1xuXHRcdCAqL1xuXHRcdG9uY2xpY2s6ZnVuY3Rpb24oZSl7XG5cdFx0XHRpZiAoJC5icm93c2VyLm1zaWUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1x0XHRcdFx0XHRcblx0XHRcdFx0dmFyIGluZGV4ID0gdGhpcy5pbmRleCgpO1xuXHRcdFx0XHR2YXIgdGFyZ2V0U3RhdGVOYW1lID0gdGhpcy5jbG9zZXN0KCcucHJldmlldy1tb2RlLXNlbGVjdG9yJykuZmluZCgnc2VsZWN0IG9wdGlvbjplcSgnK2luZGV4KycpJykudmFsKCk7XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdC8vdmFyIHRhcmdldFN0YXRlTmFtZSA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdCQoJy5jbXMtcHJldmlldycpLmNoYW5nZU1vZGUodGFyZ2V0U3RhdGVOYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHRcblx0LyoqXG5cdCAqIEFkanVzdCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcHJldmlldy1tb2RlIHNlbGVjdG9yIGluIHRoZSBDTVMgcGFydCAoaGlkZGVuIGlmIHByZXZpZXcgaXMgdmlzaWJsZSkuXG5cdCAqL1xuXHQkKCcuY21zLXByZXZpZXcuY29sdW1uLWhpZGRlbicpLmVudHdpbmUoe1xuXHRcdG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnI3ByZXZpZXctbW9kZS1kcm9wZG93bi1pbi1jb250ZW50Jykuc2hvdygpO1xuXHRcdFx0Ly8gQWxlcnQgdGhlIHVzZXIgYXMgdG8gd2h5IHRoZSBwcmV2aWV3IGlzIGhpZGRlblxuXHRcdFx0aWYgKCQoJy5jbXMtcHJldmlldyAucmVzdWx0LXNlbGVjdGVkJykuaGFzQ2xhc3MoJ2ZvbnQtaWNvbi1jb2x1bW5zJykpIHtcblx0XHRcdFx0c3RhdHVzTWVzc2FnZShpMThuLl90KFxuXHRcdFx0XHRcdCdMZWZ0QW5kTWFpbi5ESVNBQkxFU1BMSVRWSUVXJyxcblx0XHRcdFx0XHRcIlNjcmVlbiB0b28gc21hbGwgdG8gc2hvdyBzaXRlIHByZXZpZXcgaW4gc3BsaXQgbW9kZVwiKSxcblx0XHRcdFx0XCJlcnJvclwiKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblxuXHRcdG9udW5tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcjcHJldmlldy1tb2RlLWRyb3Bkb3duLWluLWNvbnRlbnQnKS5oaWRlKCk7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH1cblx0fSk7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIHByZXZpZXctbW9kZSBzZWxlY3RvciBpbiB0aGUgQ01TIHBhcnQgKGNvdWxkIGJlIGhpZGRlbiBpZiBwcmV2aWV3IGlzIHZpc2libGUpLlxuXHQgKi9cblx0JCgnI3ByZXZpZXctbW9kZS1kcm9wZG93bi1pbi1jb250ZW50JykuZW50d2luZSh7XG5cdFx0b25tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoJCgnLmNtcy1wcmV2aWV3JykuaXMoJy5jb2x1bW4taGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5zaG93KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0b251bm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogXCJQcmV2aWV3IHNpemVcIiBmdW5jdGlvbnNcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblx0JCgnLnByZXZpZXctc2l6ZS1zZWxlY3RvcicpLmVudHdpbmUoe1xuXHRcdC8qKlxuXHRcdCAqIENoYW5nZSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgc2l6ZSBzZWxlY3Rvci5cblx0XHQgKi9cblx0XHRjaGFuZ2VWaXNpYmxlU2l6ZTogZnVuY3Rpb24oc2l6ZSkge1x0XHRcdFx0XG5cdFx0XHR0aGlzLmZpbmQoJ3NlbGVjdCcpXG5cdFx0XHRcdC52YWwoc2l6ZSlcblx0XHRcdFx0LnRyaWdnZXIoJ2xpc3p0OnVwZGF0ZWQnKVxuXHRcdFx0XHQuX2FkZEljb24oKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5wcmV2aWV3LXNpemUtc2VsZWN0b3Igc2VsZWN0JykuZW50d2luZSh7XG5cdFx0LyoqXG5cdFx0ICogVHJpZ2dlciBjaGFuZ2UgaW4gdGhlIHByZXZpZXcgc2l6ZS5cblx0XHQgKi9cblx0XHRvbmNoYW5nZTogZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR2YXIgdGFyZ2V0U2l6ZU5hbWUgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0JCgnLmNtcy1wcmV2aWV3JykuY2hhbmdlU2l6ZSh0YXJnZXRTaXplTmFtZSk7XG5cdFx0fVxuXHR9KTtcblxuXHRcblx0LyoqXG5cdCAqIFwiQ2hvc2VuXCIgcGx1bWJpbmcuXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cblx0Lypcblx0Klx0QWRkIGEgY2xhc3MgdG8gdGhlIGNoem4gc2VsZWN0IHRyaWdnZXIgYmFzZWQgb24gdGhlIGN1cnJlbnRseSBcblx0Klx0c2VsZWN0ZWQgb3B0aW9uLiBVcGRhdGUgYXMgdGhpcyBjaGFuZ2VzXG5cdCovXG5cdCQoJy5wcmV2aWV3LXNlbGVjdG9yIHNlbGVjdC5wcmV2aWV3LWRyb3Bkb3duJykuZW50d2luZSh7XG5cdFx0J29ubGlzenQ6c2hvd2luZ19kcm9wZG93bic6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5zaWJsaW5ncygpLmZpbmQoJy5jaHpuLWRyb3AnKS5hZGRDbGFzcygnb3BlbicpLl9hbGlnblJpZ2h0KCk7XG5cdFx0fSxcblxuXHRcdCdvbmxpc3p0OmhpZGluZ19kcm9wZG93bic6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5zaWJsaW5ncygpLmZpbmQoJy5jaHpuLWRyb3AnKS5yZW1vdmVDbGFzcygnb3BlbicpLl9yZW1vdmVSaWdodEFsaWduKCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRyaWdnZXIgYWRkaXRpb25hbCBpbml0aWFsIGljb24gdXBkYXRlIHdoZW4gdGhlIGNvbnRyb2wgaXMgZnVsbHkgbG9hZGVkLlxuXHRcdCAqIFNvbHZlcyBhbiBJRTggdGltaW5nIGlzc3VlLlxuXHRcdCAqL1xuXHRcdCdvbmxpc3p0OnJlYWR5JzogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdFx0dGhpcy5fYWRkSWNvbigpO1xuXHRcdH0sXG5cblx0XHRfYWRkSWNvbjogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBzZWxlY3RlZCA9IHRoaXMuZmluZCgnOnNlbGVjdGVkJyk7XHRcdFx0XHRcblx0XHRcdHZhciBpY29uQ2xhc3MgPSBzZWxlY3RlZC5hdHRyKCdkYXRhLWljb24nKTtcdFxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdHZhciB0YXJnZXQgPSB0aGlzLnBhcmVudCgpLmZpbmQoJy5jaHpuLWNvbnRhaW5lciBhLmNoem4tc2luZ2xlJyk7XG5cdFx0XHR2YXIgb2xkSWNvbiA9IHRhcmdldC5hdHRyKCdkYXRhLWljb24nKTtcblx0XHRcdGlmKHR5cGVvZiBvbGRJY29uICE9PSAndW5kZWZpbmVkJyl7XG5cdFx0XHRcdHRhcmdldC5yZW1vdmVDbGFzcyhvbGRJY29uKTtcblx0XHRcdH1cblx0XHRcdHRhcmdldC5hZGRDbGFzcyhpY29uQ2xhc3MpO1xuXHRcdFx0dGFyZ2V0LmF0dHIoJ2RhdGEtaWNvbicsIGljb25DbGFzcyk7XHRcdFx0XHRcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcucHJldmlldy1zZWxlY3RvciAuY2h6bi1kcm9wJykuZW50d2luZSh7XG5cdFx0X2FsaWduUmlnaHQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHQkKHRoaXMpLmhpZGUoKTtcblx0XHRcdC8qIERlbGF5IHNvIHN0eWxlcyBhcHBsaWVkIGFmdGVyIGNob3NlbiBhcHBsaWVzIGNzc1x0XG5cdFx0XHQgICAodGhlIGxpbmUgYWZ0ZXIgd2UgZmluZCBvdXQgdGhlIGRyb3Bkb3duIGlzIG9wZW4pXG5cdFx0XHQqL1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpeyBcblx0XHRcdFx0JCh0aGF0KS5jc3Moe2xlZnQ6J2F1dG8nLCByaWdodDowfSk7XG5cdFx0XHRcdCQodGhhdCkuc2hvdygpO1x0XG5cdFx0XHR9LCAxMDApO1x0XHRcdFx0XHRcdFx0XG5cdFx0fSxcblx0XHRfcmVtb3ZlUmlnaHRBbGlnbjpmdW5jdGlvbigpe1xuXHRcdFx0JCh0aGlzKS5jc3Moe3JpZ2h0OidhdXRvJ30pO1xuXHRcdH1cblxuXHR9KTtcblxuXHQvKiBcblx0KiBNZWFucyBvZiBoYXZpbmcgZXh0cmEgc3R5bGVkIGRhdGEgaW4gY2h6biAncHJldmlldy1zZWxlY3Rvcicgc2VsZWN0cyBcblx0KiBXaGVuIGNoem4gdWwgaXMgcmVhZHksIGdyYWIgZGF0YS1kZXNjcmlwdGlvbiBmcm9tIG9yaWdpbmFsIHNlbGVjdC4gXG5cdCogSWYgaXQgZXhpc3RzLCBhcHBlbmQgdG8gb3B0aW9uIGFuZCBhZGQgZGVzY3JpcHRpb24gY2xhc3MgdG8gbGlzdCBpdGVtXG5cdCovXG5cdC8qXG5cblx0Q3VycmVudGx5IGJ1Z2d5IChhZGRzIGRleGNyaXB0aW9uLCB0aGVuIHJlLXJlbmRlcnMpLiBUaGlzIG1heSBuZWVkIHRvIFxuXHRiZSBkb25lIGluc2lkZSBjaG9zZW4uIENob3NlbiByZWNvbW1lbmRzIHRvIGRvIHRoaXMgc3R1ZmYgaW4gdGhlIGNzcywgXG5cdGJ1dCB0aGF0IG9wdGlvbiBpcyBpbmFjY2Vzc2libGUgYW5kIHVudHJhbnNsYXRhYmxlIFxuXHQoaHR0cHM6Ly9naXRodWIuY29tL2hhcnZlc3RocS9jaG9zZW4vaXNzdWVzLzM5OSlcblxuXHQkKCcucHJldmlldy1zZWxlY3RvciAuY2h6bi1kcm9wIHVsJykuZW50d2luZSh7XG5cdFx0b25tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmV4dHJhRGF0YSgpO1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXHRcdG9udW5tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0ZXh0cmFEYXRhOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzLmNsb3Nlc3QoJy5wcmV2aWV3LXNlbGVjdG9yJykuZmluZCgnc2VsZWN0IG9wdGlvbicpO1x0XG5cdFx0XHRcdFxuXHRcdFx0JC5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGluZGV4LCBvcHRpb24pe1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJCh0aGF0KS5maW5kKFwibGk6ZXEoXCIgKyBpbmRleCArIFwiKVwiKTtcblx0XHRcdFx0dmFyIGRlc2NyaXB0aW9uID0gJChvcHRpb24pLmF0dHIoJ2RhdGEtZGVzY3JpcHRpb24nKTtcblx0XHRcdFx0aWYoZGVzY3JpcHRpb24gIT0gdW5kZWZpbmVkICYmICEkKHRhcmdldCkuaGFzQ2xhc3MoJ2Rlc2NyaXB0aW9uJykpe1xuXHRcdFx0XHRcdCQodGFyZ2V0KS5hcHBlbmQoJzxzcGFuPicgKyBkZXNjcmlwdGlvbiArICc8L3NwYW4+Jyk7XG5cdFx0XHRcdFx0JCh0YXJnZXQpLmFkZENsYXNzKCdkZXNjcmlwdGlvbicpO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pOyAqL1xuXG5cdCQoJy5wcmV2aWV3LW1vZGUtc2VsZWN0b3IgLmNoem4tZHJvcCBsaTpsYXN0LWNoaWxkJykuZW50d2luZSh7XG5cdFx0b25tYXRjaDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCQoJy5wcmV2aWV3LW1vZGUtc2VsZWN0b3InKS5oYXNDbGFzcygnc3BsaXQtZGlzYWJsZWQnKSkge1xuXHRcdFx0XHR0aGlzLnBhcmVudCgpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImRpc2FibGVkLXRvb2x0aXBcIj48L2Rpdj4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucGFyZW50KCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZGlzYWJsZWQtdG9vbHRpcFwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L2Rpdj4nKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBSZWNhbGN1bGF0ZSB0aGUgcHJldmlldyBzcGFjZSB0byBhbGxvdyBmb3IgaG9yaXpvbnRhbCBzY3JvbGxiYXIgYW5kIHRoZSBwcmV2aWV3IGFjdGlvbnMgcGFuZWxcblx0ICovXG5cdCQoJy5wcmV2aWV3LXNjcm9sbCcpLmVudHdpbmUoe1xuXHRcdC8qKlxuXHRcdCAqIEhlaWdodCBvZiB0aGUgcHJldmlldyBhY3Rpb25zIHBhbmVsXG5cdFx0ICovXG5cdFx0VG9vbGJhclNpemU6IDUzLFxuXG5cdFx0X3JlZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdG9vbGJhclNpemUgPSB0aGlzLmdldFRvb2xiYXJTaXplKCk7XG5cblx0XHRcdGlmKHdpbmRvdy5kZWJ1ZykgY29uc29sZS5sb2coJ3JlZHJhdycsIHRoaXMuYXR0cignY2xhc3MnKSwgdGhpcy5nZXQoMCkpO1xuXHRcdFx0dmFyIHByZXZpZXdIZWlnaHQgPSAodGhpcy5oZWlnaHQoKSAtIHRvb2xiYXJTaXplKTtcblx0XHRcdHRoaXMuaGVpZ2h0KHByZXZpZXdIZWlnaHQpO1xuXHRcdH0sIFxuXG5cdFx0b25tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLl9yZWRyYXcoKTtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblxuXHRcdG9udW5tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH1cblx0XHQvLyBUT0RPOiBOZWVkIHRvIHJlY2FsY3VsYXRlIG9uIHJlc2l6ZSBvZiBicm93c2VyXG5cblx0fSk7XG5cblx0LyoqXG5cdCAqIFJvdGF0ZSBwcmV2aWV3IHRvIGxhbmRzY2FwZVxuXHQgKi9cblx0JCgnLnByZXZpZXctZGV2aWNlLW91dGVyJykuZW50d2luZSh7XG5cdFx0b25jbGljazogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVDbGFzcygncm90YXRlJyk7XG5cdFx0fVxuXHR9KTtcbn0pO1xuIiwiLyoqXG4gKiBGaWxlOiBMZWZ0QW5kTWFpbi5UcmVlLmpzXG4gKi9cblxuaW1wb3J0ICQgZnJvbSAnalF1ZXJ5JztcblxuJC5lbnR3aW5lKCdzcy50cmVlJywgZnVuY3Rpb24oJCl7XG5cblx0JCgnLmNtcy10cmVlJykuZW50d2luZSh7XG5cdFx0XG5cdFx0SGludHM6IG51bGwsXG5cblx0XHRJc1VwZGF0aW5nVHJlZTogZmFsc2UsXG5cblx0XHRJc0xvYWRlZDogZmFsc2UsXG5cblx0XHRvbmFkZDogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cblx0XHRcdC8vIERvbid0IHJlYXBwbHkgKGV4cGVuc2l2ZSkgdHJlZSBiZWhhdmlvdXIgaWYgYWxyZWFkeSBwcmVzZW50XG5cdFx0XHRpZigkLmlzTnVtZXJpYyh0aGlzLmRhdGEoJ2pzdHJlZV9pbnN0YW5jZV9pZCcpKSkgcmV0dXJuO1xuXHRcdFx0XG5cdFx0XHR2YXIgaGludHMgPSB0aGlzLmF0dHIoJ2RhdGEtaGludHMnKTtcblx0XHRcdGlmKGhpbnRzKSB0aGlzLnNldEhpbnRzKCQucGFyc2VKU09OKGhpbnRzKSk7XG5cdFx0XHRcblx0XHRcdC8qKlxuXHRcdFx0ICogQHRvZG8gSWNvbiBhbmQgcGFnZSB0eXBlIGhvdmVyIHN1cHBvcnRcblx0XHRcdCAqIEB0b2RvIFNvcnRpbmcgb2Ygc3ViIG5vZGVzIChvcmlnaW5hbGx5IHBsYWNlZCBpbiBjb250ZXh0IG1lbnUpXG5cdFx0XHQgKiBAdG9kbyBBdXRvbWF0aWMgbG9hZCBvZiBmdWxsIHN1YnRyZWUgdmlhIGFqYXggb24gbm9kZSBjaGVja2JveCBzZWxlY3Rpb24gKG1pbk5vZGVDb3VudCA9IDApXG5cdFx0XHQgKiAgdG8gYXZvaWQgZG9pbmcgcGFydGlhbCBzZWxlY3Rpb24gd2l0aCBcImhpZGRlbiBub2Rlc1wiICh1bmxvYWRlZCBtYXJrdXApXG5cdFx0XHQgKiBAdG9kbyBEaXNhbGxvdyBkcmFnJ24nZHJvcCB3aGVuIG5vZGUgaGFzIFwibm9DaGlsZHJlblwiIHNldCAoc2VlIHNpdGVUcmVlSGludHMpXG5cdFx0XHQgKiBAdG9kbyBEaXNhbGxvdyBtb3Zpbmcgb2YgcGFnZXMgbWFya2VkIGFzIGRlbGV0ZWQgXG5cdFx0XHQgKiAgbW9zdCBsaWtlbHkgYnkgc2VydmVyIHJlc3BvbnNlIGNvZGVzIHJhdGhlciB0aGFuIGNsaWVudHNpZGVcblx0XHRcdCAqIEB0b2RvIFwiZGVmYXVsdENoaWxkXCIgd2hlbiBjcmVhdGluZyBhIHBhZ2UgKHNpdGV0cmVlSGludHMpXG5cdFx0XHQgKiBAdG9kbyBEdXBsaWNhdGUgcGFnZSAob3JpZ2luYWxseSBsb2NhdGVkIGluIGNvbnRleHQgbWVudSlcblx0XHRcdCAqIEB0b2RvIFVwZGF0ZSB0cmVlIG5vZGUgdGl0bGUgaW5mb3JtYXRpb24gYW5kIG1vZGlmaWVkIHN0YXRlIGFmdGVyIHJlb3JkZXJpbmcgKHJlc3BvbnNlIGlzIGEgSlNPTiBhcnJheSlcblx0XHRcdCAqIFxuXHRcdFx0ICogVGFza3MgbW9zdCBsaWtlbHkgbm90IHJlcXVpcmVkIGFmdGVyIG1vdmluZyB0byBhIHN0YW5kYWxvbmUgdHJlZTpcblx0XHRcdCAqIFxuXHRcdFx0ICogQHRvZG8gQ29udGV4dCBtZW51IC0gdG8gYmUgcmVwbGFjZWQgYnkgYSBiZXplbCBVSVxuXHRcdFx0ICogQHRvZG8gUmVmcmVzaCBmb3JtIGZvciBzZWxlY3RlZCB0cmVlIG5vZGUgaWYgYWZmZWN0ZWQgYnkgcmVvcmRlcmluZyAobmV3IHBhcmVudCByZWxhdGlvbnNoaXApXG5cdFx0XHQgKiBAdG9kbyBDYW5jZWwgY3VycmVudCBmb3JtIGxvYWQgdmlhIGFqYXggd2hlbiBuZXcgbG9hZCBpcyByZXF1ZXN0ZWQgKHN5bmNocm9ub3VzIGxvYWRpbmcpXG5cdFx0XHQgKi9cblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdFx0dGhpc1xuXHRcdFx0XHRcdC5qc3RyZWUodGhpcy5nZXRUcmVlQ29uZmlnKCkpXG5cdFx0XHRcdFx0LmJpbmQoJ2xvYWRlZC5qc3RyZWUnLCBmdW5jdGlvbihlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnNldElzTG9hZGVkKHRydWUpO1xuXG5cdFx0XHRcdFx0XHQvLyBBZGQgYWpheCBzZXR0aW5ncyBhZnRlciBpbml0IHBlcmlvZCB0byBhdm9pZCB1bm5lY2Vzc2FyeSBpbml0aWFsIGFqYXggbG9hZFxuXHRcdFx0XHRcdFx0Ly8gb2YgZXhpc3RpbmcgdHJlZSBpbiBET00gLSBzZWUgbG9hZF9ub2RlX2h0bWwoKVxuXHRcdFx0XHRcdFx0ZGF0YS5pbnN0Ll9zZXRfc2V0dGluZ3MoeydodG1sX2RhdGEnOiB7J2FqYXgnOiB7XG5cdFx0XHRcdFx0XHRcdCd1cmwnOiBzZWxmLmRhdGEoJ3VybFRyZWUnKSxcblx0XHRcdFx0XHRcdFx0J2RhdGEnOiBmdW5jdGlvbihub2RlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBhcmFtcyA9IHNlbGYuZGF0YSgnc2VhcmNocGFyYW1zJykgfHwgW107XG5cdFx0XHRcdFx0XHRcdFx0Ly8gQXZvaWQgZHVwbGljYXRpb24gb2YgcGFyYW1ldGVyc1xuXHRcdFx0XHRcdFx0XHRcdHBhcmFtcyA9ICQuZ3JlcChwYXJhbXMsIGZ1bmN0aW9uKG4sIGkpIHtyZXR1cm4gKG4ubmFtZSAhPSAnSUQnICYmIG4ubmFtZSAhPSAndmFsdWUnKTt9KTtcblx0XHRcdFx0XHRcdFx0XHRwYXJhbXMucHVzaCh7bmFtZTogJ0lEJywgdmFsdWU6ICQobm9kZSkuZGF0YShcImlkXCIpID8gJChub2RlKS5kYXRhKFwiaWRcIikgOiAwfSk7XG5cdFx0XHRcdFx0XHRcdFx0cGFyYW1zLnB1c2goe25hbWU6ICdhamF4JywgdmFsdWU6IDF9KTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyYW1zO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9fX0pO1xuXG5cdFx0XHRcdFx0XHRzZWxmLnVwZGF0ZUZyb21FZGl0Rm9ybSgpO1xuXHRcdFx0XHRcdFx0c2VsZi5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBPbmx5IHNob3cgY2hlY2tib3hlcyB3aXRoIC5tdWx0aXBsZSBjbGFzc1xuXHRcdFx0XHRcdFx0ZGF0YS5pbnN0LmhpZGVfY2hlY2tib3hlcygpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmJpbmQoJ2JlZm9yZS5qc3RyZWUnLCBmdW5jdGlvbihlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRpZihkYXRhLmZ1bmMgPT0gJ3N0YXJ0X2RyYWcnKSB7XG5cdFx0XHRcdFx0XHRcdC8vIERvbid0IGFsbG93IGRyYWcnbidkcm9wIGlmIG11bHRpLXNlbGVjdCBpcyBlbmFibGVkJ1xuXHRcdFx0XHRcdFx0XHRpZighc2VsZi5oYXNDbGFzcygnZHJhZ2dhYmxlJykgfHwgc2VsZi5oYXNDbGFzcygnbXVsdGlzZWxlY3QnKSkge1xuXHRcdFx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGlmKCQuaW5BcnJheShkYXRhLmZ1bmMsIFsnY2hlY2tfbm9kZScsICd1bmNoZWNrX25vZGUnXSkpIHtcblx0XHRcdFx0XHRcdFx0Ly8gZG9uJ3QgYWxsb3cgY2hlY2sgYW5kIHVuY2hlY2sgaWYgcGFyZW50IGlzIGRpc2FibGVkXG5cdFx0XHRcdFx0XHRcdHZhciBub2RlID0gJChkYXRhLmFyZ3NbMF0pLnBhcmVudHMoJ2xpOmZpcnN0Jyk7XG5cdFx0XHRcdFx0XHRcdHZhciBhbGxvd2VkQ2hpbGRyZW4gPSBub2RlLmZpbmQoJ2xpOm5vdCguZGlzYWJsZWQpJyk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gaWYgdGhlcmUgYXJlIGNoaWxkIG5vZGVzIHRoYXQgYXJlbid0IGRpc2FibGVkLCBhbGxvdyBleHBhbmRpbmcgdGhlIHRyZWVcblx0XHRcdFx0XHRcdFx0aWYobm9kZS5oYXNDbGFzcygnZGlzYWJsZWQnKSAmJiBhbGxvd2VkQ2hpbGRyZW4gPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuYmluZCgnbW92ZV9ub2RlLmpzdHJlZScsIGZ1bmN0aW9uKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdGlmKHNlbGYuZ2V0SXNVcGRhdGluZ1RyZWUoKSkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0XHR2YXIgbW92ZWROb2RlID0gZGF0YS5yc2x0Lm8sIG5ld1BhcmVudE5vZGUgPSBkYXRhLnJzbHQubnAsIG9sZFBhcmVudE5vZGUgPSBkYXRhLmluc3QuX2dldF9wYXJlbnQobW92ZWROb2RlKSwgbmV3UGFyZW50SUQgPSAkKG5ld1BhcmVudE5vZGUpLmRhdGEoJ2lkJykgfHwgMCwgbm9kZUlEID0gJChtb3ZlZE5vZGUpLmRhdGEoJ2lkJyk7XG5cdFx0XHRcdFx0XHR2YXIgc2libGluZ0lEcyA9ICQubWFwKCQobW92ZWROb2RlKS5zaWJsaW5ncygpLmFuZFNlbGYoKSwgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICQoZWwpLmRhdGEoJ2lkJyk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdFx0J3VybCc6IHNlbGYuZGF0YSgndXJsU2F2ZXRyZWVub2RlJyksXG5cdFx0XHRcdFx0XHRcdCd0eXBlJzogJ1BPU1QnLFxuXHRcdFx0XHRcdFx0XHQnZGF0YSc6IHtcblx0XHRcdFx0XHRcdFx0XHRJRDogbm9kZUlELCBcblx0XHRcdFx0XHRcdFx0XHRQYXJlbnRJRDogbmV3UGFyZW50SUQsXG5cdFx0XHRcdFx0XHRcdFx0U2libGluZ0lEczogc2libGluZ0lEc1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBXZSBvbmx5IG5lZWQgdG8gdXBkYXRlIHRoZSBQYXJlbnRJRCBpZiB0aGUgY3VycmVudCBwYWdlIHdlJ3JlIG9uIGlzIHRoZSBwYWdlIGJlaW5nIG1vdmVkXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCQoJy5jbXMtZWRpdC1mb3JtIDppbnB1dFtuYW1lPUlEXScpLnZhbCgpID09IG5vZGVJRCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCgnLmNtcy1lZGl0LWZvcm0gOmlucHV0W25hbWU9UGFyZW50SURdJykudmFsKG5ld1BhcmVudElEKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0c2VsZi51cGRhdGVOb2Rlc0Zyb21TZXJ2ZXIoW25vZGVJRF0pO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiB7XG5cdFx0XHRcdFx0XHRcdFx0NDAzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQuanN0cmVlLnJvbGxiYWNrKGRhdGEucmxiayk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIE1ha2Ugc29tZSBqc3RyZWUgZXZlbnRzIGRlbGVnYXRhYmxlXG5cdFx0XHRcdFx0LmJpbmQoJ3NlbGVjdF9ub2RlLmpzdHJlZSBjaGVja19ub2RlLmpzdHJlZSB1bmNoZWNrX25vZGUuanN0cmVlJywgZnVuY3Rpb24oZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlckhhbmRsZXIoZSwgZGF0YSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRvbnJlbW92ZTogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuanN0cmVlKCdkZXN0cm95Jyk7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cblx0XHQnZnJvbSAuY21zLWNvbnRhaW5lcic6IHtcblx0XHRcdG9uYWZ0ZXJzdGF0ZWNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdHRoaXMudXBkYXRlRnJvbUVkaXRGb3JtKCk7XG5cdFx0XHRcdC8vIE5vIG5lZWQgdG8gcmVmcmVzaCB0cmVlIG5vZGVzLCB3ZSBhc3N1bWUgb25seSBmb3JtIHN1Ym1pdHMgY2F1c2Ugc3RhdGUgY2hhbmdlc1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQnZnJvbSAuY21zLWNvbnRhaW5lciBmb3JtJzoge1xuXHRcdFx0b25hZnRlcnN1Ym1pdGZvcm06IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR2YXIgaWQgPSAkKCcuY21zLWVkaXQtZm9ybSA6aW5wdXRbbmFtZT1JRF0nKS52YWwoKTtcblx0XHRcdFx0Ly8gVE9ETyBUcmlnZ2VyIGJ5IGltcGxlbWVudGluZyBhbmQgaW5zcGVjdGluZyBcImNoYW5nZWQgcmVjb3Jkc1wiIG1ldGFkYXRhIFxuXHRcdFx0XHQvLyBzZW50IGJ5IGZvcm0gc3VibWlzc2lvbiByZXNwb25zZSAoYXMgSFRUUCByZXNwb25zZSBoZWFkZXJzKVxuXHRcdFx0XHR0aGlzLnVwZGF0ZU5vZGVzRnJvbVNlcnZlcihbaWRdKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Z2V0VHJlZUNvbmZpZzogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQnY29yZSc6IHtcblx0XHRcdFx0XHQnaW5pdGlhbGx5X29wZW4nOiBbJ3JlY29yZC0wJ10sXG5cdFx0XHRcdFx0J2FuaW1hdGlvbic6IDAsXG5cdFx0XHRcdFx0J2h0bWxfdGl0bGVzJzogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQnaHRtbF9kYXRhJzoge1xuXHRcdFx0XHRcdC8vICdhamF4JyB3aWxsIGJlIHNldCBvbiAnbG9hZGVkLmpzdHJlZScgZXZlbnRcblx0XHRcdFx0fSxcblx0XHRcdFx0J3VpJzoge1xuXHRcdFx0XHRcdFwic2VsZWN0X2xpbWl0XCIgOiAxLFxuXHRcdFx0XHRcdCdpbml0aWFsbHlfc2VsZWN0JzogW3RoaXMuZmluZCgnLmN1cnJlbnQnKS5hdHRyKCdpZCcpXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNycm1cIjoge1xuXHRcdFx0XHRcdCdtb3ZlJzoge1xuXHRcdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgYSBub2RlIGlzIGFsbG93ZWQgdG8gYmUgbW92ZWQuXG5cdFx0XHRcdFx0XHQvLyBDYXV0aW9uOiBSdW5zIG9uIGV2ZXJ5IGRyYWcgb3ZlciBhIG5ldyBub2RlXG5cdFx0XHRcdFx0XHQnY2hlY2tfbW92ZSc6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG1vdmVkTm9kZSA9ICQoZGF0YS5vKSwgbmV3UGFyZW50ID0gJChkYXRhLm5wKSwgXG5cdFx0XHRcdFx0XHRcdFx0aXNNb3ZlZE9udG9Db250YWluZXIgPSBkYXRhLm90LmdldF9jb250YWluZXIoKVswXSA9PSBkYXRhLm5wWzBdLFxuXHRcdFx0XHRcdFx0XHRcdG1vdmVkTm9kZUNsYXNzID0gbW92ZWROb2RlLmdldENsYXNzbmFtZSgpLCBcblx0XHRcdFx0XHRcdFx0XHRuZXdQYXJlbnRDbGFzcyA9IG5ld1BhcmVudC5nZXRDbGFzc25hbWUoKSxcblx0XHRcdFx0XHRcdFx0XHQvLyBDaGVjayBhbGxvd2VkQ2hpbGRyZW4gb2YgbmV3UGFyZW50IG9yIGFnYWluc3Qgcm9vdCBub2RlIHJ1bGVzXG5cdFx0XHRcdFx0XHRcdFx0aGludHMgPSBzZWxmLmdldEhpbnRzKCksXG5cdFx0XHRcdFx0XHRcdFx0ZGlzYWxsb3dlZENoaWxkcmVuID0gW10sXG5cdFx0XHRcdFx0XHRcdFx0aGludEtleSA9IG5ld1BhcmVudENsYXNzID8gbmV3UGFyZW50Q2xhc3MgOiAnUm9vdCcsXG5cdFx0XHRcdFx0XHRcdFx0aGludCA9IChoaW50cyAmJiB0eXBlb2YgaGludHNbaGludEtleV0gIT0gJ3VuZGVmaW5lZCcpID8gaGludHNbaGludEtleV0gOiBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFNwZWNpYWwgY2FzZSBmb3IgVmlydHVhbFBhZ2U6IENoZWNrIHRoYXQgb3JpZ2luYWwgcGFnZSB0eXBlIGlzIGFuIGFsbG93ZWQgY2hpbGRcblx0XHRcdFx0XHRcdFx0aWYoaGludCAmJiBtb3ZlZE5vZGUuYXR0cignY2xhc3MnKS5tYXRjaCgvVmlydHVhbFBhZ2UtKFteXFxzXSopLykpIG1vdmVkTm9kZUNsYXNzID0gUmVnRXhwLiQxO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYoaGludCkgZGlzYWxsb3dlZENoaWxkcmVuID0gKHR5cGVvZiBoaW50LmRpc2FsbG93ZWRDaGlsZHJlbiAhPSAndW5kZWZpbmVkJykgPyBoaW50LmRpc2FsbG93ZWRDaGlsZHJlbiA6IFtdO1xuXHRcdFx0XHRcdFx0XHR2YXIgaXNBbGxvd2VkID0gKFxuXHRcdFx0XHRcdFx0XHRcdC8vIERvbid0IGFsbG93IG1vdmluZyB0aGUgcm9vdCBub2RlXG5cdFx0XHRcdFx0XHRcdFx0bW92ZWROb2RlLmRhdGEoJ2lkJykgIT09IDAgXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQXJjaGl2ZWQgcGFnZXMgY2FuJ3QgYmUgbW92ZWRcblx0XHRcdFx0XHRcdFx0XHQmJiAhbW92ZWROb2RlLmhhc0NsYXNzKCdzdGF0dXMtYXJjaGl2ZWQnKVxuXHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgYWxsb3cgbW92aW5nIG5vZGUgaW5zaWRlIHRoZSByb290IGNvbnRhaW5lciwgbm90IGJlZm9yZS9hZnRlciBpdFxuXHRcdFx0XHRcdFx0XHRcdCYmICghaXNNb3ZlZE9udG9Db250YWluZXIgfHwgZGF0YS5wID09ICdpbnNpZGUnKVxuXHRcdFx0XHRcdFx0XHRcdC8vIENoaWxkcmVuIGFyZSBnZW5lcmFsbHkgYWxsb3dlZCBvbiBwYXJlbnRcblx0XHRcdFx0XHRcdFx0XHQmJiAhbmV3UGFyZW50Lmhhc0NsYXNzKCdub2NoaWxkcmVuJylcblx0XHRcdFx0XHRcdFx0XHQvLyBtb3ZlZE5vZGUgaXMgYWxsb3dlZCBhcyBhIGNoaWxkXG5cdFx0XHRcdFx0XHRcdFx0JiYgKCFkaXNhbGxvd2VkQ2hpbGRyZW4ubGVuZ3RoIHx8ICQuaW5BcnJheShtb3ZlZE5vZGVDbGFzcywgZGlzYWxsb3dlZENoaWxkcmVuKSA9PSAtMSlcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHJldHVybiBpc0FsbG93ZWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQnZG5kJzoge1xuXHRcdFx0XHRcdFwiZHJvcF90YXJnZXRcIiA6IGZhbHNlLFxuXHRcdFx0XHRcdFwiZHJhZ190YXJnZXRcIiA6IGZhbHNlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdjaGVja2JveCc6IHtcblx0XHRcdFx0XHQndHdvX3N0YXRlJzogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQndGhlbWVzJzoge1xuXHRcdFx0XHRcdCd0aGVtZSc6ICdhcHBsZScsXG5cdFx0XHRcdFx0J3VybCc6ICQoJ2JvZHknKS5kYXRhKCdmcmFtZXdvcmtwYXRoJykgKyAnL3RoaXJkcGFydHkvanN0cmVlL3RoZW1lcy9hcHBsZS9zdHlsZS5jc3MnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIENhdXRpb246IFNpbHZlclN0cmlwZSBoYXMgZGlzYWJsZWQgJC52YWthdGEuY3NzLmFkZF9zaGVldCgpIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLFxuXHRcdFx0XHQvLyB3aGljaCBtZWFucyB5b3UgbmVlZCB0byBhZGQgYW55IENTUyBtYW51YWxseSB0byBmcmFtZXdvcmsvYWRtaW4vc2Nzcy9fdHJlZS5jc3Ncblx0XHRcdFx0J3BsdWdpbnMnOiBbXG5cdFx0XHRcdFx0J2h0bWxfZGF0YScsICd1aScsICdkbmQnLCAnY3JybScsICd0aGVtZXMnLCBcblx0XHRcdFx0XHQnY2hlY2tib3gnIC8vIGNoZWNrYm94ZXMgYXJlIGhpZGRlbiB1bmxlc3MgLm11bHRpcGxlIGlzIHNldFxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogRnVuY3Rpb246XG5cdFx0ICogIHNlYXJjaFxuXHRcdCAqIFxuXHRcdCAqIFBhcmFtZXRlcnM6XG5cdFx0ICogIChPYmplY3QpIGRhdGEgUGFzcyBlbXB0eSBkYXRhIHRvIGNhbmNlbCBzZWFyY2hcblx0XHQgKiAgKEZ1bmN0aW9uKSBjYWxsYmFjayBTdWNjZXNzIGNhbGxiYWNrXG5cdFx0ICovXG5cdFx0c2VhcmNoOiBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG5cdFx0XHRpZihwYXJhbXMpIHRoaXMuZGF0YSgnc2VhcmNocGFyYW1zJywgcGFyYW1zKTtcblx0XHRcdGVsc2UgdGhpcy5yZW1vdmVEYXRhKCdzZWFyY2hwYXJhbXMnKTtcblx0XHRcdHRoaXMuanN0cmVlKCdyZWZyZXNoJywgLTEsIGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uOiBnZXROb2RlQnlJRFxuXHRcdCAqIFxuXHRcdCAqIFBhcmFtZXRlcnM6XG5cdFx0ICogIChJbnQpIGlkIFxuXHRcdCAqIFxuXHRcdCAqIFJldHVybnNcblx0XHQgKiAgRE9NRWxlbWVudFxuXHRcdCAqL1xuXHRcdGdldE5vZGVCeUlEOiBmdW5jdGlvbihpZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZmluZCgnKltkYXRhLWlkPScraWQrJ10nKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhIG5ldyBub2RlIGZyb20gdGhlIGdpdmVuIEhUTUwuXG5cdFx0ICogV3JhcHBpbmcgYXJvdW5kIGpzdHJlZSBBUEkgYmVjYXVzZSB3ZSB3YW50IHRoZSBmbGV4aWJpbGl0eSB0byBkZWZpbmVcblx0XHQgKiB0aGUgbm9kZSdzIDxsaT4gb3Vyc2VsdmVzLiBQbGFjZXMgdGhlIG5vZGUgaW4gdGhlIHRyZWVcblx0XHQgKiBhY2NvcmRpbmcgdG8gZGF0YS5QYXJlbnRJRC5cblx0XHQgKlxuXHRcdCAqIFBhcmFtZXRlcnM6XG5cdFx0ICogIChTdHJpbmcpIEhUTUwgTmV3IG5vZGUgY29udGVudCAoPGxpPilcblx0XHQgKiAgKE9iamVjdCkgTWFwIG9mIGFkZGl0aW9uYWwgZGF0YSwgZS5nLiBQYXJlbnRJRFxuXHRcdCAqICAoRnVuY3Rpb24pIFN1Y2Nlc3MgY2FsbGJhY2tcblx0XHQgKi9cblx0XHRjcmVhdGVOb2RlOiBmdW5jdGlvbihodG1sLCBkYXRhLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBcblx0XHRcdFx0cGFyZW50Tm9kZSA9IGRhdGEuUGFyZW50SUQgIT09IHZvaWQgMCA/IHNlbGYuZ2V0Tm9kZUJ5SUQoZGF0YS5QYXJlbnRJRCkgOiBmYWxzZSwgLy8gRXhwbGljaXRseSBjaGVjayBmb3IgdW5kZWZpbmVkIGFzIDAgaXMgYSB2YWxpZCBQYXJlbnRJRFxuXHRcdFx0XHRuZXdOb2RlID0gJChodG1sKTtcblx0XHRcdFxuXHRcdFx0Ly8gRXh0cmFjdCB0aGUgc3RhdGUgZm9yIHRoZSBuZXcgbm9kZSBmcm9tIHRoZSBwcm9wZXJ0aWVzIHRha2VuIGZyb20gdGhlIHByb3ZpZGVkIEhUTUwgdGVtcGxhdGUuXG5cdFx0XHQvLyBUaGlzIHdpbGwgY29ycmVjdGx5IGluaXRpYWxpc2UgdGhlIGJlaGF2aW91ciBvZiB0aGUgbm9kZSBmb3IgYWpheCBsb2FkaW5nIG9mIGNoaWxkcmVuLlxuXHRcdFx0dmFyIHByb3BlcnRpZXMgPSB7ZGF0YTogJyd9O1xuXHRcdFx0aWYobmV3Tm9kZS5oYXNDbGFzcygnanN0cmVlLW9wZW4nKSkge1xuXHRcdFx0XHRwcm9wZXJ0aWVzLnN0YXRlID0gJ29wZW4nO1xuXHRcdFx0fSBlbHNlIGlmKG5ld05vZGUuaGFzQ2xhc3MoJ2pzdHJlZS1jbG9zZWQnKSkge1xuXHRcdFx0XHRwcm9wZXJ0aWVzLnN0YXRlID0gJ2Nsb3NlZCc7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmpzdHJlZShcblx0XHRcdFx0J2NyZWF0ZV9ub2RlJywgXG5cdFx0XHRcdHBhcmVudE5vZGUubGVuZ3RoID8gcGFyZW50Tm9kZSA6IC0xLCBcblx0XHRcdFx0J2xhc3QnLCBcblx0XHRcdFx0cHJvcGVydGllcyxcblx0XHRcdFx0ZnVuY3Rpb24obm9kZSkge1xuXHRcdFx0XHRcdHZhciBvcmlnQ2xhc3NlcyA9IG5vZGUuYXR0cignY2xhc3MnKTtcblx0XHRcdFx0XHQvLyBDb3B5IGF0dHJpYnV0ZXNcblx0XHRcdFx0XHRmb3IodmFyIGk9MDsgaTxuZXdOb2RlWzBdLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdFx0dmFyIGF0dHIgPSBuZXdOb2RlWzBdLmF0dHJpYnV0ZXNbaV07XG5cdFx0XHRcdFx0XHRub2RlLmF0dHIoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gU3Vic3RpdHV0ZSBodG1sIGZyb20gcmVxdWVzdCBmb3IgdGhhdCBnZW5lcmF0ZWQgYnkganN0cmVlXG5cdFx0XHRcdFx0bm9kZS5hZGRDbGFzcyhvcmlnQ2xhc3NlcykuaHRtbChuZXdOb2RlLmh0bWwoKSk7XG5cdFx0XHRcdFx0Y2FsbGJhY2sobm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZXMgYSBub2RlJ3Mgc3RhdGUgaW4gdGhlIHRyZWUsXG5cdFx0ICogaW5jbHVkaW5nIGFsbCBvZiBpdHMgSFRNTCwgYXMgd2VsbCBhcyBpdHMgcG9zaXRpb24uXG5cdFx0ICogXG5cdFx0ICogUGFyYW1ldGVyczpcblx0XHQgKiAgKERPTUVsZW1lbnQpIEV4aXN0aW5nIG5vZGVcblx0XHQgKiAgKFN0cmluZykgSFRNTCBOZXcgbm9kZSBjb250ZW50ICg8bGk+KVxuXHRcdCAqICAoT2JqZWN0KSBNYXAgb2YgYWRkaXRpb25hbCBkYXRhLCBlLmcuIFBhcmVudElEXG5cdFx0ICovXG5cdFx0dXBkYXRlTm9kZTogZnVuY3Rpb24obm9kZSwgaHRtbCwgZGF0YSkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBuZXdOb2RlID0gJChodG1sKSwgb3JpZ0NsYXNzZXMgPSBub2RlLmF0dHIoJ2NsYXNzJyk7XG5cblx0XHRcdHZhciBuZXh0Tm9kZSA9IGRhdGEuTmV4dElEID8gdGhpcy5nZXROb2RlQnlJRChkYXRhLk5leHRJRCkgOiBmYWxzZTtcblx0XHRcdHZhciBwcmV2Tm9kZSA9IGRhdGEuUHJldklEID8gdGhpcy5nZXROb2RlQnlJRChkYXRhLlByZXZJRCkgOiBmYWxzZTtcblx0XHRcdHZhciBwYXJlbnROb2RlID0gZGF0YS5QYXJlbnRJRCA/IHRoaXMuZ2V0Tm9kZUJ5SUQoZGF0YS5QYXJlbnRJRCkgOiBmYWxzZTtcblxuXHRcdFx0Ly8gQ29weSBhdHRyaWJ1dGVzLiBXZSBjYW4ndCByZXBsYWNlIHRoZSBub2RlIGNvbXBsZXRlbHlcblx0XHRcdC8vIHdpdGhvdXQgcmVtb3Zpbmcgb3IgZGV0YWNoaW5nIGl0cyBjaGlsZHJlbiBub2Rlcy5cblx0XHRcdCQuZWFjaChbJ2lkJywgJ3N0eWxlJywgJ2NsYXNzJywgJ2RhdGEtcGFnZXR5cGUnXSwgZnVuY3Rpb24oaSwgYXR0ck5hbWUpIHtcblx0XHRcdFx0bm9kZS5hdHRyKGF0dHJOYW1lLCBuZXdOb2RlLmF0dHIoYXR0ck5hbWUpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBUbyBhdm9pZCBjb25mbGljdGluZyBjbGFzc2VzIHdoZW4gdGhlIG5vZGUgZ2V0cyBpdHMgY29udGVudCByZXBsYWNlZCAoc2VlIGJlbG93KVxuXHRcdFx0Ly8gRmlsdGVyIG91dCBhbGwgcHJldmlvdXMgc3RhdHVzIGZsYWdzIGlmIHRoZXkgYXJlIG5vdCBpbiB0aGUgY2xhc3MgcHJvcGVydHkgb2YgdGhlIG5ldyBub2RlXG5cdFx0XHRvcmlnQ2xhc3NlcyA9IG9yaWdDbGFzc2VzLnJlcGxhY2UoL3N0YXR1cy1bXlxcc10qLywgJycpO1xuXG5cdFx0XHQvLyBSZXBsYWNlIGlubmVyIGNvbnRlbnRcblx0XHRcdHZhciBvcmlnQ2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuKCd1bCcpLmRldGFjaCgpO1xuXHRcdFx0bm9kZS5hZGRDbGFzcyhvcmlnQ2xhc3NlcykuaHRtbChuZXdOb2RlLmh0bWwoKSkuYXBwZW5kKG9yaWdDaGlsZHJlbik7XG5cblx0XHRcdGlmIChuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5qc3RyZWUoJ21vdmVfbm9kZScsIG5vZGUsIG5leHROb2RlLCAnYmVmb3JlJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChwcmV2Tm9kZSAmJiBwcmV2Tm9kZS5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5qc3RyZWUoJ21vdmVfbm9kZScsIG5vZGUsIHByZXZOb2RlLCAnYWZ0ZXInKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmpzdHJlZSgnbW92ZV9ub2RlJywgbm9kZSwgcGFyZW50Tm9kZS5sZW5ndGggPyBwYXJlbnROb2RlIDogLTEpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogU2V0cyB0aGUgY3VycmVudCBzdGF0ZSBiYXNlZCBvbiB0aGUgZm9ybSB0aGUgdHJlZSBpcyBtYW5hZ2luZy5cblx0XHQgKi9cblx0XHR1cGRhdGVGcm9tRWRpdEZvcm06IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5vZGUsIGlkID0gJCgnLmNtcy1lZGl0LWZvcm0gOmlucHV0W25hbWU9SURdJykudmFsKCk7XG5cdFx0XHRpZihpZCkge1xuXHRcdFx0XHRub2RlID0gdGhpcy5nZXROb2RlQnlJRChpZCk7XG5cdFx0XHRcdGlmKG5vZGUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dGhpcy5qc3RyZWUoJ2Rlc2VsZWN0X2FsbCcpO1xuXHRcdFx0XHRcdHRoaXMuanN0cmVlKCdzZWxlY3Rfbm9kZScsIG5vZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIElmIGZvcm0gaXMgc2hvd2luZyBhbiBJRCB0aGF0IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHRyZWUsXG5cdFx0XHRcdFx0Ly8gZ2V0IGl0IGZyb20gdGhlIHNlcnZlclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlTm9kZXNGcm9tU2VydmVyKFtpZF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJZiBubyBJRCBleGlzdHMgaW4gYSBmb3JtIHZpZXcsIHdlJ3JlIGRpc3BsYXlpbmcgdGhlIHRyZWUgb24gaXRzIG93bixcblx0XHRcdFx0Ly8gaGVuY2UgdG8gcGFnZSBzaG91bGQgc2hvdyBhcyBhY3RpdmVcblx0XHRcdFx0dGhpcy5qc3RyZWUoJ2Rlc2VsZWN0X2FsbCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZWxvYWRzIHRoZSB2aWV3IG9mIG9uZSBvciBtb3JlIHRyZWUgbm9kZXNcblx0XHQgKiBmcm9tIHRoZSBzZXJ2ZXIsIGVuc3VyaW5nIHRoYXQgdGhlaXIgc3RhdGUgaXMgdXAgdG8gZGF0ZVxuXHRcdCAqIChpY29uLCB0aXRsZSwgaGllcmFyY2h5LCBiYWRnZXMsIGV0YykuXG5cdFx0ICogVGhpcyBpcyBlYXNpZXIsIG1vcmUgY29uc2lzdGVudCBhbmQgbW9yZSBleHRlbnNpYmxlIFxuXHRcdCAqIHRoYW4gdHJ5aW5nIHRvIGNvcnJlY3QgYWxsIGFzcGVjdHMgdmlhIERPTSBtb2RpZmljYXRpb25zLCBcblx0XHQgKiBiYXNlZCBvbiB0aGUgc3BhcnNlIGRhdGEgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGVkaXQgZm9ybS5cblx0XHQgKlxuXHRcdCAqIFBhcmFtZXRlcnM6XG5cdFx0ICogIChBcnJheSkgTGlzdCBvZiBJRHMgdG8gcmV0cmlldmVcblx0XHQgKi9cblx0XHR1cGRhdGVOb2Rlc0Zyb21TZXJ2ZXI6IGZ1bmN0aW9uKGlkcykge1xuXHRcdFx0aWYodGhpcy5nZXRJc1VwZGF0aW5nVHJlZSgpIHx8ICF0aGlzLmdldElzTG9hZGVkKCkpIHJldHVybjtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBpLCBpbmNsdWRlc05ld05vZGUgPSBmYWxzZTtcblx0XHRcdHRoaXMuc2V0SXNVcGRhdGluZ1RyZWUodHJ1ZSk7XG5cdFx0XHRzZWxmLmpzdHJlZSgnc2F2ZV9zZWxlY3RlZCcpO1xuXG5cdFx0XHR2YXIgY29ycmVjdFN0YXRlRm4gPSBmdW5jdGlvbihub2RlKSB7XG5cdFx0XHRcdC8vIER1cGxpY2F0ZXMgY2FuIGJlIGNhdXNlZCBieSB0aGUgc3VidHJlZSByZWxvYWRpbmcgdGhyb3VnaFxuXHRcdFx0XHQvLyBhIHRyZWUgXCJvcGVuXCIvXCJzZWxlY3RcIiBldmVudCwgd2hpbGUgYXQgdGhlIHNhbWUgdGltZSBjcmVhdGluZyBhIG5ldyBub2RlXG5cdFx0XHRcdHNlbGYuZ2V0Tm9kZUJ5SUQobm9kZS5kYXRhKCdpZCcpKS5ub3Qobm9kZSkucmVtb3ZlKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBTZWxlY3QgdGhpcyBub2RlXG5cdFx0XHRcdHNlbGYuanN0cmVlKCdkZXNlbGVjdF9hbGwnKTtcblx0XHRcdFx0c2VsZi5qc3RyZWUoJ3NlbGVjdF9ub2RlJywgbm9kZSk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBUT0RPICdpbml0aWFsbHlfb3BlbmVkJyBjb25maWcgZG9lc24ndCBhcHBseSBoZXJlXG5cdFx0XHRzZWxmLmpzdHJlZSgnb3Blbl9ub2RlJywgdGhpcy5nZXROb2RlQnlJRCgwKSk7XG5cdFx0XHRzZWxmLmpzdHJlZSgnc2F2ZV9vcGVuZWQnKTtcblx0XHRcdHNlbGYuanN0cmVlKCdzYXZlX3NlbGVjdGVkJyk7XG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogJC5wYXRoLmFkZFNlYXJjaFBhcmFtcyh0aGlzLmRhdGEoJ3VybFVwZGF0ZXRyZWVub2RlcycpLCAnaWRzPScgKyBpZHMuam9pbignLCcpKSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSwgeGhyKSB7XG5cdFx0XHRcdFx0JC5lYWNoKGRhdGEsIGZ1bmN0aW9uKG5vZGVJZCwgbm9kZURhdGEpIHtcblx0XHRcdFx0XHRcdHZhciBub2RlID0gc2VsZi5nZXROb2RlQnlJRChub2RlSWQpO1xuXG5cdFx0XHRcdFx0XHQvLyBJZiBubyBub2RlIGRhdGEgaXMgZ2l2ZW4sIGFzc3VtZSB0aGUgbm9kZSBoYXMgYmVlbiByZW1vdmVkXG5cdFx0XHRcdFx0XHRpZighbm9kZURhdGEpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5qc3RyZWUoJ2RlbGV0ZV9ub2RlJywgbm9kZSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgbm9kZSBleGlzdHMsIGNyZWF0ZSBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRcdGlmKG5vZGUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYudXBkYXRlTm9kZShub2RlLCBub2RlRGF0YS5odG1sLCBub2RlRGF0YSk7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29ycmVjdFN0YXRlRm4obm9kZSk7XG5cdFx0XHRcdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpbmNsdWRlc05ld05vZGUgPSB0cnVlO1xuXG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBwYXJlbnQgbm9kZSBjYW4ndCBiZSBmb3VuZCwgaXQgbWlnaHQgaGF2ZSBub3QgYmVlbiBsb2FkZWQgeWV0LlxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGNhbiBoYXBwZW4gZm9yIGRlZXAgdHJlZXMgd2hpY2ggcmVxdWlyZSBhamF4IGxvYWRpbmcuXG5cdFx0XHRcdFx0XHRcdC8vIEFzc3VtZXMgdGhhdCB0aGUgbmV3IG5vZGUgaGFzIGJlZW4gc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXIgYWxyZWFkeS5cblx0XHRcdFx0XHRcdFx0aWYobm9kZURhdGEuUGFyZW50SUQgJiYgIXNlbGYuZmluZCgnbGlbZGF0YS1pZD0nK25vZGVEYXRhLlBhcmVudElEKyddJykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VsZi5qc3RyZWUoJ2xvYWRfbm9kZScsIC0xLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5ld05vZGUgPSBzZWxmLmZpbmQoJ2xpW2RhdGEtaWQ9Jytub2RlSWQrJ10nKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNvcnJlY3RTdGF0ZUZuKG5ld05vZGUpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHNlbGYuY3JlYXRlTm9kZShub2RlRGF0YS5odG1sLCBub2RlRGF0YSwgZnVuY3Rpb24obmV3Tm9kZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29ycmVjdFN0YXRlRm4obmV3Tm9kZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGlmKCFpbmNsdWRlc05ld05vZGUpIHtcblx0XHRcdFx0XHRcdHNlbGYuanN0cmVlKCdkZXNlbGVjdF9hbGwnKTtcblx0XHRcdFx0XHRcdHNlbGYuanN0cmVlKCdyZXNlbGVjdCcpO1xuXHRcdFx0XHRcdFx0c2VsZi5qc3RyZWUoJ3Jlb3BlbicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHNlbGYuc2V0SXNVcGRhdGluZ1RyZWUoZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cdFxuXHQkKCcuY21zLXRyZWUubXVsdGlwbGUnKS5lbnR3aW5lKHtcblx0XHRvbm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0XHR0aGlzLmpzdHJlZSgnc2hvd19jaGVja2JveGVzJyk7XG5cdFx0fSxcblx0XHRvbnVubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHRcdHRoaXMuanN0cmVlKCd1bmNoZWNrX2FsbCcpO1xuXHRcdFx0dGhpcy5qc3RyZWUoJ2hpZGVfY2hlY2tib3hlcycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogRnVuY3Rpb246IGdldFNlbGVjdGVkSURzXG5cdFx0ICogXG5cdFx0ICogUmV0dXJuczpcblx0XHQgKiBcdChBcnJheSlcblx0XHQgKi9cblx0XHRnZXRTZWxlY3RlZElEczogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gJCh0aGlzKVxuXHRcdFx0XHQuanN0cmVlKCdnZXRfY2hlY2tlZCcpXG5cdFx0XHRcdC5ub3QoJy5kaXNhYmxlZCcpXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuICQodGhpcykuZGF0YSgnaWQnKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmdldCgpO1xuXHRcdH1cblx0fSk7XG5cdFxuXHQkKCcuY21zLXRyZWUgbGknKS5lbnR3aW5lKHtcblx0XHRcblx0XHQvKipcblx0XHQgKiBGdW5jdGlvbjogc2V0RW5hYmxlZFxuXHRcdCAqIFxuXHRcdCAqIFBhcmFtZXRlcnM6XG5cdFx0ICogXHQoYm9vbClcblx0XHQgKi9cblx0XHRzZXRFbmFibGVkOiBmdW5jdGlvbihib29sKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsICEoYm9vbCkpO1xuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogRnVuY3Rpb246IGdldENsYXNzbmFtZVxuXHRcdCAqIFxuXHRcdCAqIFJldHVybnMgUEhQIGNsYXNzIGZvciB0aGlzIGVsZW1lbnQuIFVzZWZ1bCB0byBjaGVjayBidXNpbmVzcyBydWxlcyBsaWtlIHZhbGlkIGRyYWcnbidkcm9wIHRhcmdldHMuXG5cdFx0ICovXG5cdFx0Z2V0Q2xhc3NuYW1lOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBtYXRjaGVzID0gdGhpcy5hdHRyKCdjbGFzcycpLm1hdGNoKC9jbGFzcy0oW15cXHNdKikvaSk7XG5cdFx0XHRyZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiAnJztcblx0XHR9LFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uOiBnZXRJRFxuXHRcdCAqIFxuXHRcdCAqIFJldHVybnM6XG5cdFx0ICogXHQoTnVtYmVyKVxuXHRcdCAqL1xuXHRcdGdldElEOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ2lkJyk7XG5cdFx0fVxuXHR9KTtcbn0pO1xuIiwiaW1wb3J0ICQgZnJvbSAnalF1ZXJ5JztcblxuJC5lbnR3aW5lKCdzcycsIGZ1bmN0aW9uKCQpe1xuXG5cdC8vIEFueSBUcmVlRG93bmRvd25GaWVsZCBuZWVkcyB0byByZWZyZXNoIGl0J3MgY29udGVudHMgYWZ0ZXIgYSBmb3JtIHN1Ym1pc3Npb24sXG5cdC8vIGJlY2F1c2UgdGhlIHRyZWUgb24gdGhlIGJhY2tlbmQgbWlnaHQgaGF2ZSBjaGFuZ2VkXG5cdCQoJy5UcmVlRHJvcGRvd25GaWVsZCcpLmVudHdpbmUoe1xuXHRcdCdmcm9tIC5jbXMtY29udGFpbmVyIGZvcm0nOiB7XG5cdFx0XHRvbmFmdGVyc3VibWl0Zm9ybTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdHRoaXMuZmluZCgnLnRyZWUtaG9sZGVyJykuZW1wdHkoKTtcblx0XHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG59KTtcbiIsIi8qKlxuICogRmlsZTogTGVmdEFuZE1haW4uanNcbiAqL1xuaW1wb3J0ICQgZnJvbSAnalF1ZXJ5JztcblxuJC5ub0NvbmZsaWN0KCk7XG5cbndpbmRvdy5zcyA9IHdpbmRvdy5zcyB8fCB7fTtcblxudmFyIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQ7XG5cbi8qKlxuICogQGZ1bmMgZGVib3VuY2VcbiAqIEBwYXJhbSBmdW5jIHtmdW5jdGlvbn0gLSBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGFmdGVyIGB3YWl0YCBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0gd2FpdCB7bnVtYmVyfSAtIE1pbGxpc2Vjb25kcyB0byB3YWl0LlxuICogQHBhcmFtIGltbWVkaWF0ZSB7Ym9vbGVhbn0gLSBJZiB0cnVlIHRoZSBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgYXQgdGhlIHN0YXJ0IHJhdGhlciB0aGFuIHRoZSBlbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqIEBkZXNjIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgbm90IGJlIGNhbGxlZCB1bnRpbCBpdCBoYXNuJ3QgYmVlbiBpbnZva2VkIGZvciBgd2FpdGAgc2Vjb25kcy5cbiAqL1xud2luZG93LnNzLmRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuXHR2YXIgdGltZW91dCwgY29udGV4dCwgYXJncztcblxuXHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG5cblx0XHRjb250ZXh0ID0gdGhpcztcblx0XHRhcmdzID0gYXJndW1lbnRzO1xuXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblxuXHRcdGlmIChjYWxsTm93KSB7XG5cdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdH1cblx0fTtcbn07XG5cbiQod2luZG93KS5iaW5kKCdyZXNpemUubGVmdGFuZG1haW4nLCBmdW5jdGlvbihlKSB7XG5cdC8vIEVudHdpbmUncyAnZnJvbVdpbmRvdzo6b25yZXNpemUnIGRvZXMgbm90IHRyaWdnZXIgb24gSUU4LiBVc2Ugc3ludGhldGljIGV2ZW50LlxuXHR2YXIgY2IgPSBmdW5jdGlvbigpIHskKCcuY21zLWNvbnRhaW5lcicpLnRyaWdnZXIoJ3dpbmRvd3Jlc2l6ZScpO307XG5cblx0Ly8gV29ya2Fyb3VuZCB0byBhdm9pZCBJRTggaW5maW5pdGUgbG9vcHMgd2hlbiBlbGVtZW50cyBhcmUgcmVzaXplZCBhcyBhIHJlc3VsdCBvZiB0aGlzIGV2ZW50XG5cdGlmKCQuYnJvd3Nlci5tc2llICYmIHBhcnNlSW50KCQuYnJvd3Nlci52ZXJzaW9uLCAxMCkgPCA5KSB7XG5cdFx0dmFyIG5ld1dpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCksIG5ld1dpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcblx0XHRpZihuZXdXaW5kb3dXaWR0aCAhPSB3aW5kb3dXaWR0aCB8fCBuZXdXaW5kb3dIZWlnaHQgIT0gd2luZG93SGVpZ2h0KSB7XG5cdFx0XHR3aW5kb3dXaWR0aCA9IG5ld1dpbmRvd1dpZHRoO1xuXHRcdFx0d2luZG93SGVpZ2h0ID0gbmV3V2luZG93SGVpZ2h0O1xuXHRcdFx0Y2IoKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y2IoKTtcblx0fVxufSk7XG5cbi8vIHNldHVwIGpxdWVyeS5lbnR3aW5lXG4kLmVudHdpbmUud2FybmluZ0xldmVsID0gJC5lbnR3aW5lLldBUk5fTEVWRUxfQkVTVFBSQUNUSVNFO1xuJC5lbnR3aW5lKCdzcycsIGZ1bmN0aW9uKCQpIHtcblxuXHQvKlxuXHQgKiBIYW5kbGUgbWVzc2FnZXMgc2VudCB2aWEgbmVzdGVkIGlmcmFtZXNcblx0ICogTWVzc2FnZXMgc2hvdWxkIGJlIHJhaXNlZCB2aWEgcG9zdE1lc3NhZ2Ugd2l0aCBhbiBvYmplY3Qgd2l0aCB0aGUgJ3R5cGUnIHBhcmFtZXRlciBnaXZlbi5cblx0ICogQW4gb3B0aW9uYWwgJ3RhcmdldCcgYW5kICdkYXRhJyBwYXJhbWV0ZXIgY2FuIGFsc28gYmUgc3BlY2lmaWVkLiBJZiBubyB0YXJnZXQgaXMgc3BlY2lmaWVkXG5cdCAqIGV2ZW50cyB3aWxsIGJlIHNlbnQgdG8gdGhlIHdpbmRvdyBpbnN0ZWFkLlxuXHQgKiB0eXBlIHNob3VsZCBiZSBvbmUgb2Y6XG5cdCAqICAtICdldmVudCcgLSBXaWxsIHRyaWdnZXIgdGhlIGdpdmVuIGV2ZW50IChzcGVjaWZpZWQgYnkgJ2V2ZW50Jykgb24gdGhlIHRhcmdldFxuXHQgKiAgLSAnY2FsbGJhY2snIC0gV2lsbCBjYWxsIHRoZSBnaXZlbiBtZXRob2QgKHNwZWNpZmllZCBieSAnY2FsbGJhY2snKSBvbiB0aGUgdGFyZ2V0XG5cdCAqL1xuXHQkKHdpbmRvdykub24oXCJtZXNzYWdlXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHR2YXIgdGFyZ2V0LFxuXHRcdFx0ZXZlbnQgPSBlLm9yaWdpbmFsRXZlbnQsXG5cdFx0XHRkYXRhID0gdHlwZW9mIGV2ZW50LmRhdGEgPT09ICdvYmplY3QnID8gZXZlbnQuZGF0YSA6IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG5cblx0XHQvLyBSZWplY3QgbWVzc2FnZXMgb3V0c2lkZSBvZiB0aGUgc2FtZSBvcmlnaW5cblx0XHRpZigkLnBhdGgucGFyc2VVcmwod2luZG93LmxvY2F0aW9uLmhyZWYpLmRvbWFpbiAhPT0gJC5wYXRoLnBhcnNlVXJsKGV2ZW50Lm9yaWdpbikuZG9tYWluKSByZXR1cm47XG5cblx0XHQvLyBHZXQgdGFyZ2V0IG9mIHRoaXMgYWN0aW9uXG5cdFx0dGFyZ2V0ID0gdHlwZW9mKGRhdGEudGFyZ2V0KSA9PT0gJ3VuZGVmaW5lZCdcblx0XHRcdD8gJCh3aW5kb3cpXG5cdFx0XHQ6ICQoZGF0YS50YXJnZXQpO1xuXG5cdFx0Ly8gRGV0ZXJtaW5lIGFjdGlvblxuXHRcdHN3aXRjaChkYXRhLnR5cGUpIHtcblx0XHRcdGNhc2UgJ2V2ZW50Jzpcblx0XHRcdFx0dGFyZ2V0LnRyaWdnZXIoZGF0YS5ldmVudCwgZGF0YS5kYXRhKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdjYWxsYmFjayc6XG5cdFx0XHRcdHRhcmdldFtkYXRhLmNhbGxiYWNrXS5jYWxsKHRhcmdldCwgZGF0YS5kYXRhKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogUG9zaXRpb24gdGhlIGxvYWRpbmcgc3Bpbm5lciBhbmltYXRpb24gYmVsb3cgdGhlIHNzIGxvZ29cblx0ICovXG5cdHZhciBwb3NpdGlvbkxvYWRpbmdTcGlubmVyID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9mZnNldCA9IDEyMDsgLy8gb2Zmc2V0IGZyb20gdGhlIHNzIGxvZ29cblx0XHR2YXIgc3Bpbm5lciA9ICQoJy5zcy1sb2FkaW5nLXNjcmVlbiAubG9hZGluZy1hbmltYXRpb24nKTtcblx0XHR2YXIgdG9wID0gKCQod2luZG93KS5oZWlnaHQoKSAtIHNwaW5uZXIuaGVpZ2h0KCkpIC8gMjtcblx0XHRzcGlubmVyLmNzcygndG9wJywgdG9wICsgb2Zmc2V0KTtcblx0XHRzcGlubmVyLnNob3coKTtcblx0fTtcblxuXHQvLyBhcHBseSBhbiBzZWxlY3QgZWxlbWVudCBvbmx5IHdoZW4gaXQgaXMgcmVhZHksIGllLiB3aGVuIGl0IGlzIHJlbmRlcmVkIGludG8gYSB0ZW1wbGF0ZVxuXHQvLyB3aXRoIGNzcyBhcHBsaWVkIGFuZCBnb3QgYSB3aWR0aCB2YWx1ZS5cblx0dmFyIGFwcGx5Q2hvc2VuID0gZnVuY3Rpb24oZWwpIHtcblx0XHRpZihlbC5pcygnOnZpc2libGUnKSkge1xuXHRcdFx0ZWwuYWRkQ2xhc3MoJ2hhcy1jaHpuJykuY2hvc2VuKHtcblx0XHRcdFx0YWxsb3dfc2luZ2xlX2Rlc2VsZWN0OiB0cnVlLFxuXHRcdFx0XHRkaXNhYmxlX3NlYXJjaF90aHJlc2hvbGQ6IDIwXG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHRpdGxlID0gZWwucHJvcCgndGl0bGUnKTtcblxuXHRcdFx0aWYodGl0bGUpIHtcblx0XHRcdFx0ZWwuc2libGluZ3MoJy5jaHpuLWNvbnRhaW5lcicpLnByb3AoJ3RpdGxlJywgdGl0bGUpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBNYWtlIHN1cmUgaXQncyB2aXNpYmxlIGJlZm9yZSBhcHBseWluZyB0aGUgdWlcblx0XHRcdFx0ZWwuc2hvdygpO1xuXHRcdFx0XHRhcHBseUNob3NlbihlbCk7IH0sXG5cdFx0XHQ1MDApO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQ29tcGFyZSBVUkxzLCBidXQgbm9ybWFsaXplIHRyYWlsaW5nIHNsYXNoZXMgaW5cblx0ICogVVJMIHRvIHdvcmsgYXJvdW5kIHJvdXRpbmcgd2VpcmRuZXNzZXMgaW4gU1NfSFRUUFJlcXVlc3QuXG5cdCAqIEFsc28gbm9ybWFsaXplcyByZWxhdGl2ZSBVUkxzIGJ5IHByZWZpeGluZyB0aGVtIHdpdGggdGhlIDxiYXNlPi5cblx0ICovXG5cdHZhciBpc1NhbWVVcmwgPSBmdW5jdGlvbih1cmwxLCB1cmwyKSB7XG5cdFx0dmFyIGJhc2VVcmwgPSAkKCdiYXNlJykuYXR0cignaHJlZicpO1xuXHRcdHVybDEgPSAkLnBhdGguaXNBYnNvbHV0ZVVybCh1cmwxKSA/IHVybDEgOiAkLnBhdGgubWFrZVVybEFic29sdXRlKHVybDEsIGJhc2VVcmwpLFxuXHRcdHVybDIgPSAkLnBhdGguaXNBYnNvbHV0ZVVybCh1cmwyKSA/IHVybDIgOiAkLnBhdGgubWFrZVVybEFic29sdXRlKHVybDIsIGJhc2VVcmwpO1xuXHRcdHZhciB1cmwxcGFydHMgPSAkLnBhdGgucGFyc2VVcmwodXJsMSksIHVybDJwYXJ0cyA9ICQucGF0aC5wYXJzZVVybCh1cmwyKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dXJsMXBhcnRzLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyokLywgJycpID09IHVybDJwYXJ0cy5wYXRobmFtZS5yZXBsYWNlKC9cXC8qJC8sICcnKSAmJlxuXHRcdFx0dXJsMXBhcnRzLnNlYXJjaCA9PSB1cmwycGFydHMuc2VhcmNoXG5cdFx0KTtcblx0fTtcblxuXHR2YXIgYWpheENvbXBsZXRlRXZlbnQgPSB3aW5kb3cuc3MuZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuXHRcdCQod2luZG93KS50cmlnZ2VyKCdhamF4Q29tcGxldGUnKTtcblx0fSwgMTAwMCwgdHJ1ZSk7XG5cblx0JCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIHBvc2l0aW9uTG9hZGluZ1NwaW5uZXIpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuXG5cdC8vIGdsb2JhbCBhamF4IGhhbmRsZXJzXG5cdCQoZG9jdW1lbnQpLmFqYXhDb21wbGV0ZShmdW5jdGlvbihlLCB4aHIsIHNldHRpbmdzKSB7XG5cdFx0Ly8gU2ltdWxhdGVzIGEgcmVkaXJlY3Qgb24gYW4gYWpheCByZXNwb25zZS5cblx0XHRpZih3aW5kb3cuSGlzdG9yeS5lbmFibGVkKSB7XG5cdFx0XHR2YXIgdXJsID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLUNvbnRyb2xsZXJVUkwnKSxcblx0XHRcdFx0Ly8gVE9ETyBSZXBsYWNlcyB0cmFpbGluZyBzbGFzaGVzIGFkZGVkIGJ5IEhpc3RvcnkgYWZ0ZXIgbG9jYWxlIChlLmcuIGFkbWluLz9sb2NhbGU9ZW4vKVxuXHRcdFx0XHRvcmlnVXJsID0gSGlzdG9yeS5nZXRQYWdlVXJsKCkucmVwbGFjZSgvXFwvJC8sICcnKSxcblx0XHRcdFx0ZGVzdFVybCA9IHNldHRpbmdzLnVybCxcblx0XHRcdFx0b3B0cztcblxuXHRcdFx0Ly8gT25seSByZWRpcmVjdCBpZiBjb250cm9sbGVyIHVybCBkaWZmZXJzIHRvIHRoZSByZXF1ZXN0ZWQgb3IgY3VycmVudCBvbmVcblx0XHRcdGlmKHVybCAhPT0gbnVsbCAmJlxuXHRcdFx0XHQoIWlzU2FtZVVybChvcmlnVXJsLCB1cmwpIHx8ICFpc1NhbWVVcmwoZGVzdFVybCwgdXJsKSlcblx0XHRcdCkge1xuXHRcdFx0XHRvcHRzID0ge1xuXHRcdFx0XHRcdC8vIEVuc3VyZSB0aGF0IHJlZGlyZWN0aW9ucyBhcmUgZm9sbG93ZWQgdGhyb3VnaCBieSBoaXN0b3J5IEFQSSBieSBoYW5kaW5nIGl0IGEgdW5pcXVlIElEXG5cdFx0XHRcdFx0aWQ6IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgKyBTdHJpbmcoTWF0aC5yYW5kb20oKSkucmVwbGFjZSgvXFxEL2csJycpLFxuXHRcdFx0XHRcdHBqYXg6IHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1QamF4Jylcblx0XHRcdFx0XHRcdD8geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLVBqYXgnKVxuXHRcdFx0XHRcdFx0OiBzZXR0aW5ncy5oZWFkZXJzWydYLVBqYXgnXVxuXHRcdFx0XHR9O1xuXHRcdFx0XHR3aW5kb3cuSGlzdG9yeS5wdXNoU3RhdGUob3B0cywgJycsIHVybCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIGN1c3RvbSBzdGF0dXMgbWVzc2FnZSBoZWFkZXJzXG5cdFx0dmFyIG1zZyA9ICh4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtU3RhdHVzJykpID8geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLVN0YXR1cycpIDogeGhyLnN0YXR1c1RleHQsXG5cdFx0XHRyZWF0aGVudGljYXRlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlYXV0aGVudGljYXRlJyksXG5cdFx0XHRtc2dUeXBlID0gKHhoci5zdGF0dXMgPCAyMDAgfHwgeGhyLnN0YXR1cyA+IDM5OSkgPyAnYmFkJyA6ICdnb29kJyxcblx0XHRcdGlnbm9yZWRNZXNzYWdlcyA9IFsnT0snXTtcblxuXHRcdC8vIEVuYWJsZSByZWF1dGhlbnRpY2F0ZSBkaWFsb2cgaWYgcmVxdWVzdGVkXG5cdFx0aWYocmVhdGhlbnRpY2F0ZSkge1xuXHRcdFx0JCgnLmNtcy1jb250YWluZXInKS5zaG93TG9naW5EaWFsb2coKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBTaG93IG1lc3NhZ2UgKGJ1dCBpZ25vcmUgYWJvcnRlZCByZXF1ZXN0cylcblx0XHRpZih4aHIuc3RhdHVzICE9PSAwICYmIG1zZyAmJiAkLmluQXJyYXkobXNnLCBpZ25vcmVkTWVzc2FnZXMpKSB7XG5cdFx0XHQvLyBEZWNvZGUgaW50byBVVEYtOCwgSFRUUCBoZWFkZXJzIGRvbid0IGFsbG93IG11bHRpYnl0ZVxuXHRcdFx0c3RhdHVzTWVzc2FnZShkZWNvZGVVUklDb21wb25lbnQobXNnKSwgbXNnVHlwZSk7XG5cdFx0fVxuXG5cdFx0YWpheENvbXBsZXRlRXZlbnQodGhpcyk7XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBNYWluIExlZnRBbmRNYWluIGludGVyZmFjZSB3aXRoIHNvbWUgY29udHJvbCBwYW5lbCBhbmQgYW4gZWRpdCBmb3JtLlxuXHQgKlxuXHQgKiBFdmVudHM6XG5cdCAqICBhamF4c3VibWl0IC0gLi4uXG5cdCAqICB2YWxpZGF0ZSAtIC4uLlxuXHQgKiAgYWZ0ZXJzdWJtaXRmb3JtIC0gLi4uXG5cdCAqL1xuXHQkKCcuY21zLWNvbnRhaW5lcicpLmVudHdpbmUoe1xuXG5cdFx0LyoqXG5cdFx0ICogVHJhY2tzIGN1cnJlbnQgcGFuZWwgcmVxdWVzdC5cblx0XHQgKi9cblx0XHRTdGF0ZUNoYW5nZVhIUjogbnVsbCxcblxuXHRcdC8qKlxuXHRcdCAqIFRyYWNrcyBjdXJyZW50IGZyYWdtZW50LW9ubHkgcGFyYWxsZWwgUEpBWCByZXF1ZXN0cy5cblx0XHQgKi9cblx0XHRGcmFnbWVudFhIUjoge30sXG5cblx0XHRTdGF0ZUNoYW5nZUNvdW50OiAwLFxuXG5cdFx0LyoqXG5cdFx0ICogT3B0aW9ucyBmb3IgdGhlIHRocmVlQ29sdW1uQ29tcHJlc3NvciBsYXlvdXQgYWxnb3JpdGhtLlxuXHRcdCAqXG5cdFx0ICogU2VlIExlZnRBbmRNYWluLkxheW91dC5qcyBmb3IgZGVzY3JpcHRpb24gb2YgdGhlc2Ugb3B0aW9ucy5cblx0XHQgKi9cblx0XHRMYXlvdXRPcHRpb25zOiB7XG5cdFx0XHRtaW5Db250ZW50V2lkdGg6IDk0MCxcblx0XHRcdG1pblByZXZpZXdXaWR0aDogNDAwLFxuXHRcdFx0bW9kZTogJ2NvbnRlbnQnXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIENvbnN0cnVjdG9yOiBvbm1hdGNoXG5cdFx0ICovXG5cdFx0b25hZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHQvLyBCcm93c2VyIGRldGVjdGlvblxuXHRcdFx0aWYoJC5icm93c2VyLm1zaWUgJiYgcGFyc2VJbnQoJC5icm93c2VyLnZlcnNpb24sIDEwKSA8IDgpIHtcblx0XHRcdFx0JCgnLnNzLWxvYWRpbmctc2NyZWVuJykuYXBwZW5kKFxuXHRcdFx0XHRcdCc8cCBjbGFzcz1cInNzLWxvYWRpbmctaW5jb21wYXQtd2FybmluZ1wiPjxzcGFuIGNsYXNzPVwibm90aWNlXCI+JyArXG5cdFx0XHRcdFx0J1lvdXIgYnJvd3NlciBpcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBDTVMgaW50ZXJmYWNlLiBQbGVhc2UgdXNlIEludGVybmV0IEV4cGxvcmVyIDgrLCBHb29nbGUgQ2hyb21lIG9yIE1vemlsbGEgRmlyZWZveC4nICtcblx0XHRcdFx0XHQnPC9zcGFuPjwvcD4nXG5cdFx0XHRcdCkuY3NzKCd6LWluZGV4JywgJCgnLnNzLWxvYWRpbmctc2NyZWVuJykuY3NzKCd6LWluZGV4JykrMSk7XG5cdFx0XHRcdCQoJy5sb2FkaW5nLWFuaW1hdGlvbicpLnJlbW92ZSgpO1xuXG5cdFx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSBsYXlvdXRzXG5cdFx0XHR0aGlzLnJlZHJhdygpO1xuXG5cdFx0XHQvLyBSZW1vdmUgbG9hZGluZyBzY3JlZW5cblx0XHRcdCQoJy5zcy1sb2FkaW5nLXNjcmVlbicpLmhpZGUoKTtcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXHRcdFx0JCh3aW5kb3cpLnVuYmluZCgncmVzaXplJywgcG9zaXRpb25Mb2FkaW5nU3Bpbm5lcik7XG5cdFx0XHR0aGlzLnJlc3RvcmVUYWJTdGF0ZSgpO1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXG5cdFx0ZnJvbVdpbmRvdzoge1xuXHRcdFx0b25zdGF0ZWNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdHRoaXMuaGFuZGxlU3RhdGVDaGFuZ2UoZSk7IFxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQnb253aW5kb3dyZXNpemUnOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0fSxcblxuXHRcdCdmcm9tIC5jbXMtcGFuZWwnOiB7XG5cdFx0XHRvbnRvZ2dsZTogZnVuY3Rpb24oKXsgdGhpcy5yZWRyYXcoKTsgfVxuXHRcdH0sXG5cblx0XHQnZnJvbSAuY21zLWNvbnRhaW5lcic6IHtcblx0XHRcdG9uYWZ0ZXJzdWJtaXRmb3JtOiBmdW5jdGlvbigpeyB0aGlzLnJlZHJhdygpOyB9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEVuc3VyZSB0aGUgdXNlciBjYW4gc2VlIHRoZSByZXF1ZXN0ZWQgc2VjdGlvbiAtIHJlc3RvcmUgdGhlIGRlZmF1bHQgdmlldy5cblx0XHQgKi9cblx0XHQnZnJvbSAuY21zLW1lbnUtbGlzdCBsaSBhJzoge1xuXHRcdFx0b25jbGljazogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR2YXIgaHJlZiA9ICQoZS50YXJnZXQpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdFx0aWYoZS53aGljaCA+IDEgfHwgaHJlZiA9PSB0aGlzLl90YWJTdGF0ZVVybCgpKSByZXR1cm47XG5cdFx0XHRcdHRoaXMuc3BsaXRWaWV3TW9kZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgdGhlIG9wdGlvbnMgb2YgdGhlIHRocmVlQ29sdW1uQ29tcHJlc3NvciBsYXlvdXQsIGFuZCB0cmlnZ2VyIGxheW91dGluZyBpZiBuZWVkZWQuXG5cdFx0ICogWW91IGNhbiBwcm92aWRlIGFueSBvciBhbGwgb3B0aW9ucy4gVGhlIHJlbWFpbmluZyBvcHRpb25zIHdpbGwgbm90IGJlIGNoYW5nZWQuXG5cdFx0ICovXG5cdFx0dXBkYXRlTGF5b3V0T3B0aW9uczogZnVuY3Rpb24obmV3U3BlYykge1xuXHRcdFx0dmFyIHNwZWMgPSB0aGlzLmdldExheW91dE9wdGlvbnMoKTtcblxuXHRcdFx0dmFyIGRpcnR5ID0gZmFsc2U7XG5cblx0XHRcdGZvciAodmFyIGsgaW4gbmV3U3BlYykge1xuXHRcdFx0XHRpZiAoc3BlY1trXSAhPT0gbmV3U3BlY1trXSkge1xuXHRcdFx0XHRcdHNwZWNba10gPSBuZXdTcGVjW2tdO1xuXHRcdFx0XHRcdGRpcnR5ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGlydHkpIHRoaXMucmVkcmF3KCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEVuYWJsZSB0aGUgc3BsaXQgdmlldyAtIHdpdGggY29udGVudCBvbiB0aGUgbGVmdCBhbmQgcHJldmlldyBvbiB0aGUgcmlnaHQuXG5cdFx0ICovXG5cdFx0c3BsaXRWaWV3TW9kZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZUxheW91dE9wdGlvbnMoe1xuXHRcdFx0XHRtb2RlOiAnc3BsaXQnXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ29udGVudCBvbmx5LlxuXHRcdCAqL1xuXHRcdGNvbnRlbnRWaWV3TW9kZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZUxheW91dE9wdGlvbnMoe1xuXHRcdFx0XHRtb2RlOiAnY29udGVudCdcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBQcmV2aWV3IG9ubHkuXG5cdFx0ICovXG5cdFx0cHJldmlld01vZGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy51cGRhdGVMYXlvdXRPcHRpb25zKHtcblx0XHRcdFx0bW9kZTogJ3ByZXZpZXcnXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0UmVkcmF3U3VwcHJlc3Npb246IGZhbHNlLFxuXG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmdldFJlZHJhd1N1cHByZXNzaW9uKCkpIHJldHVybjtcblxuXHRcdFx0aWYod2luZG93LmRlYnVnKSBjb25zb2xlLmxvZygncmVkcmF3JywgdGhpcy5hdHRyKCdjbGFzcycpLCB0aGlzLmdldCgwKSk7XG5cblx0XHRcdC8vIFJlc2V0IHRoZSBhbGdvcml0aG0uXG5cdFx0XHR0aGlzLmRhdGEoJ2psYXlvdXQnLCBqTGF5b3V0LnRocmVlQ29sdW1uQ29tcHJlc3Nvcihcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lbnU6IHRoaXMuY2hpbGRyZW4oJy5jbXMtbWVudScpLFxuXHRcdFx0XHRcdGNvbnRlbnQ6IHRoaXMuY2hpbGRyZW4oJy5jbXMtY29udGVudCcpLFxuXHRcdFx0XHRcdHByZXZpZXc6IHRoaXMuY2hpbGRyZW4oJy5jbXMtcHJldmlldycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRoaXMuZ2V0TGF5b3V0T3B0aW9ucygpXG5cdFx0XHQpKTtcblxuXHRcdFx0Ly8gVHJpZ2dlciBsYXlvdXQgYWxnb3JpdGhtIG9uY2UgYXQgdGhlIHRvcC4gVGhpcyBhbHNvIGxheXMgb3V0IGNoaWxkcmVuIC0gd2UgbW92ZSBmcm9tIG91dHNpZGUgdG9cblx0XHRcdC8vIGluc2lkZSwgcmVzaXppbmcgdG8gZml0IHRoZSBwYXJlbnQuXG5cdFx0XHR0aGlzLmxheW91dCgpO1xuXG5cdFx0XHQvLyBSZWRyYXcgb24gYWxsIHRoZSBjaGlsZHJlbiB0aGF0IG5lZWQgaXRcblx0XHRcdHRoaXMuZmluZCgnLmNtcy1wYW5lbC1sYXlvdXQnKS5yZWRyYXcoKTtcblx0XHRcdHRoaXMuZmluZCgnLmNtcy1jb250ZW50LWZpZWxkc1tkYXRhLWxheW91dC10eXBlXScpLnJlZHJhdygpO1xuXHRcdFx0dGhpcy5maW5kKCcuY21zLWVkaXQtZm9ybVtkYXRhLWxheW91dC10eXBlXScpLnJlZHJhdygpO1xuXHRcdFx0dGhpcy5maW5kKCcuY21zLXByZXZpZXcnKS5yZWRyYXcoKTtcblx0XHRcdHRoaXMuZmluZCgnLmNtcy1jb250ZW50JykucmVkcmF3KCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIENvbmZpcm0gd2hldGhlciB0aGUgY3VycmVudCB1c2VyIGNhbiBuYXZpZ2F0ZSBhd2F5IGZyb20gdGhpcyBwYWdlXG5cdFx0ICogXG5cdFx0ICogQHBhcmFtIHthcnJheX0gc2VsZWN0b3JzIE9wdGlvbmFsIGxpc3Qgb2Ygc2VsZWN0b3JzXG5cdFx0ICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIG5hdmlnYXRpb24gY2FuIHByb2NlZWRcblx0XHQgKi9cblx0XHRjaGVja0Nhbk5hdmlnYXRlOiBmdW5jdGlvbihzZWxlY3RvcnMpIHtcblx0XHRcdC8vIENoZWNrIGNoYW5nZSB0cmFja2luZyAoY2FuJ3QgdXNlIGV2ZW50cyBhcyB3ZSBuZWVkIGEgd2F5IHRvIGNhbmNlbCB0aGUgY3VycmVudCBzdGF0ZSBjaGFuZ2UpXG5cdFx0XHR2YXIgY29udGVudEVscyA9IHRoaXMuX2ZpbmRGcmFnbWVudHMoc2VsZWN0b3JzIHx8IFsnQ29udGVudCddKSxcblx0XHRcdFx0dHJhY2tlZEVscyA9IGNvbnRlbnRFbHNcblx0XHRcdFx0XHQuZmluZCgnOmRhdGEoY2hhbmdldHJhY2tlciknKVxuXHRcdFx0XHRcdC5hZGQoY29udGVudEVscy5maWx0ZXIoJzpkYXRhKGNoYW5nZXRyYWNrZXIpJykpLFxuXHRcdFx0XHRzYWZlID0gdHJ1ZTtcblxuXHRcdFx0aWYoIXRyYWNrZWRFbHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0cmFja2VkRWxzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIFNlZSBMZWZ0QW5kTWFpbi5FZGl0Rm9ybS5qc1xuXHRcdFx0XHRpZighJCh0aGlzKS5jb25maXJtVW5zYXZlZENoYW5nZXMoKSkge1xuXHRcdFx0XHRcdHNhZmUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBzYWZlO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBQcm94eSBhcm91bmQgSGlzdG9yeS5wdXNoU3RhdGUoKSB3aGljaCBoYW5kbGVzIG5vbi1IVE1MNSBmYWxsYmFja3MsXG5cdFx0ICogYXMgd2VsbCBhcyBnbG9iYWwgY2hhbmdlIHRyYWNraW5nLiBDaGFuZ2UgdHJhY2tpbmcgbmVlZHMgdG8gYmUgc3luY2hyb25vdXMgcmF0aGVyIHRoYW4gZXZlbnQvY2FsbGJhY2tcblx0XHQgKiBiYXNlZCBiZWNhdXNlIHRoZSB1c2VyIG5lZWRzIHRvIGJlIGFibGUgdG8gYWJvcnQgdGhlIGFjdGlvbiBjb21wbGV0ZWx5LlxuXHRcdCAqXG5cdFx0ICogU2VlIGhhbmRsZVN0YXRlQ2hhbmdlKCkgZm9yIG1vcmUgZGV0YWlscy5cblx0XHQgKlxuXHRcdCAqIFBhcmFtZXRlcnM6XG5cdFx0ICogIC0ge1N0cmluZ30gdXJsXG5cdFx0ICogIC0ge1N0cmluZ30gdGl0bGUgTmV3IHdpbmRvdyB0aXRsZVxuXHRcdCAqICAtIHtPYmplY3R9IGRhdGEgQW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgdGhyb3VnaCB0byBIaXN0b3J5LnB1c2hTdGF0ZSgpXG5cdFx0ICogIC0ge2Jvb2xlYW59IGZvcmNlUmVsb2FkIEZvcmNlcyB0aGUgcmVwbGFjZW1lbnQgb2YgdGhlIGN1cnJlbnQgaGlzdG9yeSBzdGF0ZSwgZXZlbiBpZiB0aGUgVVJMIGlzIHRoZSBzYW1lLCBpLmUuIGFsbG93cyByZWxvYWRpbmcuXG5cdFx0ICovXG5cdFx0bG9hZFBhbmVsOiBmdW5jdGlvbih1cmwsIHRpdGxlLCBkYXRhLCBmb3JjZVJlbG9hZCwgZm9yY2VSZWZlcmVyKSB7XG5cdFx0XHRpZighZGF0YSkgZGF0YSA9IHt9O1xuXHRcdFx0aWYoIXRpdGxlKSB0aXRsZSA9IFwiXCI7XG5cdFx0XHRpZiAoIWZvcmNlUmVmZXJlcikgZm9yY2VSZWZlcmVyID0gSGlzdG9yeS5nZXRTdGF0ZSgpLnVybDtcblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHVuc2F2ZWQgY2hhbmdlc1xuXHRcdFx0aWYoIXRoaXMuY2hlY2tDYW5OYXZpZ2F0ZShkYXRhLnBqYXggPyBkYXRhLnBqYXguc3BsaXQoJywnKSA6IFsnQ29udGVudCddKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNhdmUgdGFiIHNlbGVjdGlvbnMgc28gd2UgY2FuIHJlc3RvcmUgdGhlbSBsYXRlclxuXHRcdFx0dGhpcy5zYXZlVGFiU3RhdGUoKTtcblxuXHRcdFx0aWYod2luZG93Lkhpc3RvcnkuZW5hYmxlZCkge1xuXHRcdFx0XHQkLmV4dGVuZChkYXRhLCB7X19mb3JjZVJlZmVyZXI6IGZvcmNlUmVmZXJlcn0pO1xuXHRcdFx0XHQvLyBBY3RpdmUgbWVudSBpdGVtIGlzIHNldCBiYXNlZCBvbiBYLUNvbnRyb2xsZXIgYWpheCBoZWFkZXIsXG5cdFx0XHRcdC8vIHdoaWNoIG1hdGNoZXMgb25lIGNsYXNzIG9uIHRoZSBtZW51XG5cdFx0XHRcdGlmKGZvcmNlUmVsb2FkKSB7XG5cdFx0XHRcdFx0Ly8gQWRkIGEgcGFyYW1ldGVyIHRvIG1ha2Ugc3VyZSB0aGUgcGFnZSBnZXRzIHJlbG9hZGVkIGV2ZW4gaWYgdGhlIFVSTCBpcyB0aGUgc2FtZS5cblx0XHRcdFx0XHQkLmV4dGVuZChkYXRhLCB7X19mb3JjZVJlbG9hZDogTWF0aC5yYW5kb20oKX0pO1xuXHRcdFx0XHRcdHdpbmRvdy5IaXN0b3J5LnJlcGxhY2VTdGF0ZShkYXRhLCB0aXRsZSwgdXJsKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR3aW5kb3cuSGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgdGl0bGUsIHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9ICQucGF0aC5tYWtlVXJsQWJzb2x1dGUodXJsLCAkKCdiYXNlJykuYXR0cignaHJlZicpKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTmljZSB3cmFwcGVyIGZvciByZWxvYWRpbmcgY3VycmVudCBoaXN0b3J5IHN0YXRlLlxuXHRcdCAqL1xuXHRcdHJlbG9hZEN1cnJlbnRQYW5lbDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmxvYWRQYW5lbCh3aW5kb3cuSGlzdG9yeS5nZXRTdGF0ZSgpLnVybCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uOiBzdWJtaXRGb3JtXG5cdFx0ICpcblx0XHQgKiBQYXJhbWV0ZXJzOlxuXHRcdCAqICB7RE9NRWxlbWVudH0gZm9ybSAtIFRoZSBmb3JtIHRvIGJlIHN1Ym1pdHRlZC4gTmVlZHMgdG8gYmUgcGFzc2VkXG5cdFx0ICogICBpbiB0byBhdm9pZCBlbnR3aW5lIG1ldGhvZHMvY29udGV4dCBiZWluZyByZW1vdmVkIHRocm91Z2ggcmVwbGFjaW5nIHRoZSBub2RlIGl0c2VsZi5cblx0XHQgKiAge0RPTUVsZW1lbnR9IGJ1dHRvbiAtIFRoZSBwcmVzc2VkIGJ1dHRvbiAob3B0aW9uYWwpXG5cdFx0ICogIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsZWQgaW4gY29tcGxldGUoKSBoYW5kbGVyIG9mIGpRdWVyeS5hamF4KClcblx0XHQgKiAge09iamVjdH0gYWpheE9wdGlvbnMgLSBPYmplY3QgbGl0ZXJhbCB0byBtZXJnZSBpbnRvICQuYWpheCgpIGNhbGxcblx0XHQgKlxuXHRcdCAqIFJldHVybnM6XG5cdFx0ICogIChib29sZWFuKVxuXHRcdCAqL1xuXHRcdHN1Ym1pdEZvcm06IGZ1bmN0aW9uKGZvcm0sIGJ1dHRvbiwgY2FsbGJhY2ssIGFqYXhPcHRpb25zKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdC8vIGxvb2sgZm9yIHNhdmUgYnV0dG9uXG5cdFx0XHRpZighYnV0dG9uKSBidXR0b24gPSB0aGlzLmZpbmQoJy5BY3Rpb25zIDpzdWJtaXRbbmFtZT1hY3Rpb25fc2F2ZV0nKTtcblx0XHRcdC8vIGRlZmF1bHQgdG8gZmlyc3QgYnV0dG9uIGlmIG5vbmUgZ2l2ZW4gLSBzaW11bGF0ZXMgYnJvd3NlciBiZWhhdmlvdXJcblx0XHRcdGlmKCFidXR0b24pIGJ1dHRvbiA9IHRoaXMuZmluZCgnLkFjdGlvbnMgOnN1Ym1pdDpmaXJzdCcpO1xuXG5cdFx0XHRmb3JtLnRyaWdnZXIoJ2JlZm9yZXN1Ym1pdGZvcm0nKTtcblx0XHRcdHRoaXMudHJpZ2dlcignc3VibWl0Zm9ybScsIHtmb3JtOiBmb3JtLCBidXR0b246IGJ1dHRvbn0pO1xuXG5cdFx0XHQvLyBzZXQgYnV0dG9uIHRvIFwic3VibWl0dGluZ1wiIHN0YXRlXG5cdFx0XHQkKGJ1dHRvbikuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblxuXHRcdFx0Ly8gdmFsaWRhdGUgaWYgcmVxdWlyZWRcblx0XHRcdHZhciB2YWxpZGF0aW9uUmVzdWx0ID0gZm9ybS52YWxpZGF0ZSgpO1xuXHRcdFx0aWYodHlwZW9mIHZhbGlkYXRpb25SZXN1bHQhPT0ndW5kZWZpbmVkJyAmJiAhdmFsaWRhdGlvblJlc3VsdCkge1xuXHRcdFx0XHQvLyBUT0RPIEF1dG9tYXRpY2FsbHkgc3dpdGNoIHRvIHRoZSB0YWIvcG9zaXRpb24gb2YgdGhlIGZpcnN0IGVycm9yXG5cdFx0XHRcdHN0YXR1c01lc3NhZ2UoXCJWYWxpZGF0aW9uIGZhaWxlZC5cIiwgXCJiYWRcIik7XG5cblx0XHRcdFx0JChidXR0b24pLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBnZXQgYWxsIGRhdGEgZnJvbSB0aGUgZm9ybVxuXHRcdFx0dmFyIGZvcm1EYXRhID0gZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuXHRcdFx0Ly8gYWRkIGJ1dHRvbiBhY3Rpb25cblx0XHRcdGZvcm1EYXRhLnB1c2goe25hbWU6ICQoYnV0dG9uKS5hdHRyKCduYW1lJyksIHZhbHVlOicxJ30pO1xuXHRcdFx0Ly8gQXJ0aWZpY2lhbCBIVFRQIHJlZmVyZXIsIElFIGRvZXNuJ3Qgc3VibWl0IHRoZW0gdmlhIGFqYXguXG5cdFx0XHQvLyBBbHNvIHJld3JpdGVzIGFuY2hvcnMgdG8gdGhlaXIgcGFnZSBjb3VudGVycGFydHMsIHdoaWNoIGlzIGltcG9ydGFudFxuXHRcdFx0Ly8gYXMgYXV0b21hdGljIGJyb3dzZXIgYWpheCByZXNwb25zZSByZWRpcmVjdHMgc2VlbSB0byBkaXNjYXJkIHRoZSBoYXNoL2ZyYWdtZW50LlxuXHRcdFx0Ly8gVE9ETyBSZXBsYWNlcyB0cmFpbGluZyBzbGFzaGVzIGFkZGVkIGJ5IEhpc3RvcnkgYWZ0ZXIgbG9jYWxlIChlLmcuIGFkbWluLz9sb2NhbGU9ZW4vKVxuXHRcdFx0Zm9ybURhdGEucHVzaCh7bmFtZTogJ0JhY2tVUkwnLCB2YWx1ZTpIaXN0b3J5LmdldFBhZ2VVcmwoKS5yZXBsYWNlKC9cXC8kLywgJycpfSk7XG5cblx0XHRcdC8vIFNhdmUgdGFiIHNlbGVjdGlvbnMgc28gd2UgY2FuIHJlc3RvcmUgdGhlbSBsYXRlclxuXHRcdFx0dGhpcy5zYXZlVGFiU3RhdGUoKTtcblxuXHRcdFx0Ly8gU3RhbmRhcmQgUGpheCBiZWhhdmlvdXIgaXMgdG8gcmVwbGFjZSB0aGUgc3VibWl0dGVkIGZvcm0gd2l0aCBuZXcgY29udGVudC5cblx0XHRcdC8vIFRoZSByZXR1cm5lZCB2aWV3IGlzbid0IGFsd2F5cyBkZWNpZGVkIHVwb24gd2hlbiB0aGUgcmVxdWVzdFxuXHRcdFx0Ly8gaXMgZmlyZWQsIHNvIHRoZSBzZXJ2ZXIgbWlnaHQgZGVjaWRlIHRvIGNoYW5nZSBpdCBiYXNlZCBvbiBpdHMgb3duIGxvZ2ljLFxuXHRcdFx0Ly8gc2VuZGluZyBiYWNrIGRpZmZlcmVudCBgWC1QamF4YCBoZWFkZXJzIGFuZCBjb250ZW50XG5cdFx0XHRqUXVlcnkuYWpheChqUXVlcnkuZXh0ZW5kKHtcblx0XHRcdFx0aGVhZGVyczoge1wiWC1QamF4XCIgOiBcIkN1cnJlbnRGb3JtLEJyZWFkY3J1bWJzXCJ9LFxuXHRcdFx0XHR1cmw6IGZvcm0uYXR0cignYWN0aW9uJyksXG5cdFx0XHRcdGRhdGE6IGZvcm1EYXRhLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKGJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcblx0XHRcdFx0XHRmb3JtLnJlbW92ZUNsYXNzKCdjaGFuZ2VkJyk7IC8vIFRPRE8gVGhpcyBzaG91bGQgYmUgdXNpbmcgdGhlIHBsdWdpbiBBUElcblx0XHRcdFx0XHRpZihjYWxsYmFjaykgY2FsbGJhY2soZGF0YSwgc3RhdHVzLCB4aHIpO1xuXG5cdFx0XHRcdFx0dmFyIG5ld0NvbnRlbnRFbHMgPSBzZWxmLmhhbmRsZUFqYXhSZXNwb25zZShkYXRhLCBzdGF0dXMsIHhocik7XG5cdFx0XHRcdFx0aWYoIW5ld0NvbnRlbnRFbHMpIHJldHVybjtcblxuXHRcdFx0XHRcdG5ld0NvbnRlbnRFbHMuZmlsdGVyKCdmb3JtJykudHJpZ2dlcignYWZ0ZXJzdWJtaXRmb3JtJywge3N0YXR1czogc3RhdHVzLCB4aHI6IHhociwgZm9ybURhdGE6IGZvcm1EYXRhfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGFqYXhPcHRpb25zKSk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTGFzdCBodG1sNSBoaXN0b3J5IHN0YXRlXG5cdFx0ICovXG5cdFx0TGFzdFN0YXRlOiBudWxsLFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEZsYWcgdG8gcGF1c2UgaGFuZGxlU3RhdGVDaGFuZ2Vcblx0XHQgKi9cblx0XHRQYXVzZVN0YXRlOiBmYWxzZSxcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZXMgYWpheCBsb2FkaW5nIG9mIG5ldyBwYW5lbHMgdGhyb3VnaCB0aGUgd2luZG93Lkhpc3Rvcnkgb2JqZWN0LlxuXHRcdCAqIFRvIHRyaWdnZXIgbG9hZGluZywgcGFzcyBhIG5ldyBVUkwgdG8gd2luZG93Lkhpc3RvcnkucHVzaFN0YXRlKCkuXG5cdFx0ICogVXNlIGxvYWRQYW5lbCgpIGFzIGEgcHVzaFN0YXRlKCkgd3JhcHBlciBhcyBpdCBwcm92aWRlcyBzb21lIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0eVxuXHRcdCAqIGxpa2UgZ2xvYmFsIGNoYW5nZXRyYWNraW5nIGFuZCB1c2VyIGFib3J0cy5cblx0XHQgKlxuXHRcdCAqIER1ZSB0byB0aGUgbmF0dXJlIG9mIGhpc3RvcnkgbWFuYWdlbWVudCwgbm8gY2FsbGJhY2tzIGFyZSBhbGxvd2VkLlxuXHRcdCAqIFVzZSB0aGUgJ2JlZm9yZXN0YXRlY2hhbmdlJyBhbmQgJ2FmdGVyc3RhdGVjaGFuZ2UnIGV2ZW50cyBpbnN0ZWFkLFxuXHRcdCAqIG9yIG92ZXJ3cml0ZSB0aGUgYmVmb3JlTG9hZCgpIGFuZCBhZnRlckxvYWQoKSBtZXRob2RzIG9uIHRoZVxuXHRcdCAqIERPTSBlbGVtZW50IHlvdSdyZSBsb2FkaW5nIHRoZSBuZXcgY29udGVudCBpbnRvLlxuXHRcdCAqIEFsdGhvdWdoIHlvdSBjYW4gcGFzcyBkYXRhIGludG8gcHVzaFN0YXRlKCksIGl0IHNob3VsZG4ndCBjb250YWluXG5cdFx0ICogRE9NIGVsZW1lbnRzIG9yIGNhbGxiYWNrIGNsb3N1cmVzLlxuXHRcdCAqXG5cdFx0ICogVGhlIHBhc3NlZCBVUkwgc2hvdWxkIGFsbG93IHJlY29uc3RydWN0aW5nIGltcG9ydGFudCBpbnRlcmZhY2Ugc3RhdGVcblx0XHQgKiB3aXRob3V0IGFkZGl0aW9uYWwgcGFyYW1ldGVycywgaW4gdGhlIGZvbGxvd2luZyB1c2UgY2FzZXM6XG5cdFx0ICogLSBFeHBsaWNpdCBsb2FkaW5nIHRocm91Z2ggSGlzdG9yeS5wdXNoU3RhdGUoKVxuXHRcdCAqIC0gSW1wbGljaXQgbG9hZGluZyB0aHJvdWdoIGJyb3dzZXIgbmF2aWdhdGlvbiBldmVudCB0cmlnZ2VyZWQgYnkgdGhlIHVzZXIgKGZvcndhcmQgb3IgYmFjaylcblx0XHQgKiAtIEZ1bGwgd2luZG93IHJlZnJlc2ggd2l0aG91dCBhamF4XG5cdFx0ICogRm9yIGV4YW1wbGUsIGEgTW9kZWxBZG1pbiBzZWFyY2ggZXZlbnQgc2hvdWxkIGNvbnRhaW4gdGhlIHNlYXJjaCB0ZXJtc1xuXHRcdCAqIGFzIFVSTCBwYXJhbWV0ZXJzLCBhbmQgdGhlIHJlc3VsdCBkaXNwbGF5IHNob3VsZCBhdXRvbWF0aWNhbGx5IGFwcGVhclxuXHRcdCAqIGlmIHRoZSBVUkwgaXMgbG9hZGVkIHdpdGhvdXQgYWpheC5cblx0XHQgKi9cblx0XHRoYW5kbGVTdGF0ZUNoYW5nZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih0aGlzLmdldFBhdXNlU3RhdGUoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIERvbid0IGFsbG93IHBhcmFsbGVsIGxvYWRpbmcgdG8gYXZvaWQgZWRnZSBjYXNlc1xuXHRcdFx0aWYodGhpcy5nZXRTdGF0ZUNoYW5nZVhIUigpKSB0aGlzLmdldFN0YXRlQ2hhbmdlWEhSKCkuYWJvcnQoKTtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBoID0gd2luZG93Lkhpc3RvcnksIHN0YXRlID0gaC5nZXRTdGF0ZSgpLFxuXHRcdFx0XHRmcmFnbWVudHMgPSBzdGF0ZS5kYXRhLnBqYXggfHwgJ0NvbnRlbnQnLCBoZWFkZXJzID0ge30sXG5cdFx0XHRcdGZyYWdtZW50c0FyciA9IGZyYWdtZW50cy5zcGxpdCgnLCcpLFxuXHRcdFx0XHRjb250ZW50RWxzID0gdGhpcy5fZmluZEZyYWdtZW50cyhmcmFnbWVudHNBcnIpO1xuXG5cdFx0XHQvLyBGb3IgbGVnYWN5IElFIHZlcnNpb25zIChJRTcgYW5kIElFOCksIHJlbG9hZCB3aXRob3V0IGFqYXhcblx0XHRcdC8vIGFzIGEgY3J1ZGUgd2F5IHRvIGZpeCBtZW1vcnkgbGVha3MgdGhyb3VnaCB3aG9sZSB3aW5kb3cgcmVmcmVzaGVzLlxuXHRcdFx0dGhpcy5zZXRTdGF0ZUNoYW5nZUNvdW50KHRoaXMuZ2V0U3RhdGVDaGFuZ2VDb3VudCgpICsgMSk7XG5cdFx0XHR2YXIgaXNMZWdhY3lJRSA9ICgkLmJyb3dzZXIubXNpZSAmJiBwYXJzZUludCgkLmJyb3dzZXIudmVyc2lvbiwgMTApIDwgOSk7XG5cdFx0XHRpZihpc0xlZ2FjeUlFICYmIHRoaXMuZ2V0U3RhdGVDaGFuZ2VDb3VudCgpID4gMjApIHtcblx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHN0YXRlLnVybDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZighdGhpcy5jaGVja0Nhbk5hdmlnYXRlKCkpIHtcblx0XHRcdFx0Ly8gSWYgaGlzdG9yeSBpcyBlbXVsYXRlZCAoaWU4IG9yIGJlbG93KSBkaXNhYmxlIGF0dGVtcHRpbmcgdG8gcmVzdG9yZVxuXHRcdFx0XHRpZihoLmVtdWxhdGVkLnB1c2hTdGF0ZSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0dmFyIGxhc3RTdGF0ZSA9IHRoaXMuZ2V0TGFzdFN0YXRlKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBTdXBwcmVzcyBwYW5lbCBsb2FkaW5nIHdoaWxlIHJlc2V0dGluZyBzdGF0ZVxuXHRcdFx0XHR0aGlzLnNldFBhdXNlU3RhdGUodHJ1ZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBSZXN0b3JlIGJlc3QgbGFzdCBzdGF0ZVxuXHRcdFx0XHRpZihsYXN0U3RhdGUpIHtcblx0XHRcdFx0XHRoLnB1c2hTdGF0ZShsYXN0U3RhdGUuaWQsIGxhc3RTdGF0ZS50aXRsZSwgbGFzdFN0YXRlLnVybCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aC5iYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRQYXVzZVN0YXRlKGZhbHNlKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFib3J0IGxvYWRpbmcgb2YgdGhpcyBwYW5lbFxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldExhc3RTdGF0ZShzdGF0ZSk7XG5cblx0XHRcdC8vIElmIGFueSBvZiB0aGUgcmVxdWVzdGVkIFBqYXggZnJhZ21lbnRzIGRvbid0IGV4aXN0IGluIHRoZSBjdXJyZW50IHZpZXcsXG5cdFx0XHQvLyBmZXRjaCB0aGUgXCJDb250ZW50XCIgdmlldyBpbnN0ZWFkLCB3aGljaCBpcyB0aGUgXCJvdXRlcm1vc3RcIiBmcmFnbWVudFxuXHRcdFx0Ly8gdGhhdCBjYW4gYmUgcmVsb2FkZWQgd2l0aG91dCByZWxvYWRpbmcgdGhlIHdob2xlIHdpbmRvdy5cblx0XHRcdGlmKGNvbnRlbnRFbHMubGVuZ3RoIDwgZnJhZ21lbnRzQXJyLmxlbmd0aCkge1xuXHRcdFx0XHRmcmFnbWVudHMgPSAnQ29udGVudCcsIGZyYWdtZW50c0FyciA9IFsnQ29udGVudCddO1xuXHRcdFx0XHRjb250ZW50RWxzID0gdGhpcy5fZmluZEZyYWdtZW50cyhmcmFnbWVudHNBcnIpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2JlZm9yZXN0YXRlY2hhbmdlJywge3N0YXRlOiBzdGF0ZSwgZWxlbWVudDogY29udGVudEVsc30pO1xuXG5cdFx0XHQvLyBTZXQgUGpheCBoZWFkZXJzLCB3aGljaCBjYW4gZGVjbGFyZSBhIHByZWZlcmVuY2UgZm9yIHRoZSByZXR1cm5lZCB2aWV3LlxuXHRcdFx0Ly8gVGhlIGFjdHVhbGx5IHJldHVybmVkIHZpZXcgaXNuJ3QgYWx3YXlzIGRlY2lkZWQgdXBvbiB3aGVuIHRoZSByZXF1ZXN0XG5cdFx0XHQvLyBpcyBmaXJlZCwgc28gdGhlIHNlcnZlciBtaWdodCBkZWNpZGUgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIGl0cyBvd24gbG9naWMuXG5cdFx0XHRoZWFkZXJzWydYLVBqYXgnXSA9IGZyYWdtZW50cztcblxuXHRcdFx0Ly8gU2V0ICdmYWtlJyByZWZlcmVyIC0gd2UgY2FsbCBwdXNoU3RhdGUoKSBiZWZvcmUgbWFraW5nIHRoZSBBSkFYIHJlcXVlc3QsIHNvIHdlIGhhdmUgdG9cblx0XHRcdC8vIHNldCBvdXIgb3duIHJlZmVyZXIgaGVyZVxuXHRcdFx0aWYgKHR5cGVvZiBzdGF0ZS5kYXRhLl9fZm9yY2VSZWZlcmVyICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHQvLyBFbnN1cmUgcXVlcnkgc3RyaW5nIGlzIHByb3Blcmx5IGVuY29kZWQgaWYgcHJlc2VudFxuXHRcdFx0XHR2YXIgdXJsID0gc3RhdGUuZGF0YS5fX2ZvcmNlUmVmZXJlcjtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFByZXZlbnQgZG91YmxlLWVuY29kaW5nIGJ5IGF0dGVtcHRpbmcgdG8gZGVjb2RlXG5cdFx0XHRcdFx0dXJsID0gZGVjb2RlVVJJKHVybCk7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdC8vIFVSTCBub3QgZW5jb2RlZCwgb3Igd2FzIGVuY29kZWQgaW5jb3JyZWN0bHksIHNvIGRvIG5vdGhpbmdcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHQvLyBTZXQgb3VyIHJlZmVyZXIgaGVhZGVyIHRvIHRoZSBlbmNvZGVkIFVSTFxuXHRcdFx0XHRcdGhlYWRlcnNbJ1gtQmFja3VybCddID0gZW5jb2RlVVJJKHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29udGVudEVscy5hZGRDbGFzcygnbG9hZGluZycpO1xuXHRcdFx0dmFyIHhociA9ICQuYWpheCh7XG5cdFx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRcdHVybDogc3RhdGUudXJsLFxuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2VsZi5zZXRTdGF0ZUNoYW5nZVhIUihudWxsKTtcblx0XHRcdFx0XHQvLyBSZW1vdmUgbG9hZGluZyBpbmRpY2F0aW9uIGZyb20gb2xkIGNvbnRlbnQgZWxzIChyZWdhcmRsZXNzIG9mIHdoaWNoIGFyZSByZXBsYWNlZClcblx0XHRcdFx0XHRjb250ZW50RWxzLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgeGhyKSB7XG5cdFx0XHRcdFx0dmFyIGVscyA9IHNlbGYuaGFuZGxlQWpheFJlc3BvbnNlKGRhdGEsIHN0YXR1cywgeGhyLCBzdGF0ZSk7XG5cdFx0XHRcdFx0c2VsZi50cmlnZ2VyKCdhZnRlcnN0YXRlY2hhbmdlJywge2RhdGE6IGRhdGEsIHN0YXR1czogc3RhdHVzLCB4aHI6IHhociwgZWxlbWVudDogZWxzLCBzdGF0ZTogc3RhdGV9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuc2V0U3RhdGVDaGFuZ2VYSFIoeGhyKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQUx0ZXJuYXRpdmUgdG8gbG9hZFBhbmVsL3N1Ym1pdEZvcm0uXG5cdFx0ICpcblx0XHQgKiBUcmlnZ2VycyBhIHBhcmFsbGVsLWZldGNoIG9mIGEgUEpBWCBmcmFnbWVudCwgd2hpY2ggaXMgYSBzZXBhcmF0ZSByZXF1ZXN0IHRvIHRoZVxuXHRcdCAqIHN0YXRlIGNoYW5nZSByZXF1ZXN0cy4gVGhlcmUgY291bGQgYmUgYW55IGFtb3VudCBvZiB0aGVzZSBmZXRjaGVzIGdvaW5nIG9uIGluIHRoZSBiYWNrZ3JvdW5kLFxuXHRcdCAqIGFuZCB0aGV5IGRvbid0IHJlZ2lzdGVyIGFzIGEgSFRNTDUgaGlzdG9yeSBzdGF0ZXMuXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIG1lYW50IGZvciB1cGRhdGluZyBhIFBKQVggYXJlYXMgdGhhdCBhcmUgbm90IGNvbXBsZXRlIHBhbmVsL2Zvcm0gcmVsb2Fkcy4gVGhlc2UgeW91J2Rcblx0XHQgKiBub3JtYWxseSBkbyB2aWEgc3VibWl0Rm9ybSBvciBsb2FkUGFuZWwgd2hpY2ggaGF2ZSBhIGxvdCBvZiBhdXRvbWF0aW9uIGJ1aWx0IGluLlxuXHRcdCAqXG5cdFx0ICogT24gcmVjZWl2aW5nIHN1Y2Nlc3NmdWwgcmVzcG9uc2UsIHRoZSBmcmFtZXdvcmsgd2lsbCB1cGRhdGUgdGhlIGVsZW1lbnQgdGFnZ2VkIHdpdGggYXBwcm9wcmlhdGVcblx0XHQgKiBkYXRhLXBqYXgtZnJhZ21lbnQgYXR0cmlidXRlIChlLmcuIGRhdGEtcGpheC1mcmFnbWVudD1cIjxwamF4LWZyYWdtZW50LW5hbWU+XCIpLiBNYWtlIHN1cmUgdGhpcyBlbGVtZW50XG5cdFx0ICogaXMgYXZhaWxhYmxlLlxuXHRcdCAqXG5cdFx0ICogRXhhbXBsZSB1c2FnZTpcblx0XHQgKiAkKCcuY21zLWNvbnRhaW5lcicpLmxvYWRGcmFnbWVudCgnYWRtaW4vZm9vYmFyLycsICdGcmFnbWVudE5hbWUnKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB1cmwgc3RyaW5nIFJlbGF0aXZlIG9yIGFic29sdXRlIHVybCBvZiB0aGUgY29udHJvbGxlci5cblx0XHQgKiBAcGFyYW0gcGpheEZyYWdtZW50cyBzdHJpbmcgUEpBWCBmcmFnbWVudChzKSwgY29tbWEgc2VwYXJhdGVkLlxuXHRcdCAqL1xuXHRcdGxvYWRGcmFnbWVudDogZnVuY3Rpb24odXJsLCBwamF4RnJhZ21lbnRzKSB7XG5cblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0eGhyLFxuXHRcdFx0XHRoZWFkZXJzID0ge30sXG5cdFx0XHRcdGJhc2VVcmwgPSAkKCdiYXNlJykuYXR0cignaHJlZicpLFxuXHRcdFx0XHRmcmFnbWVudFhIUiA9IHRoaXMuZ2V0RnJhZ21lbnRYSFIoKTtcblxuXHRcdFx0Ly8gTWFrZSBzdXJlIG9ubHkgb25lIFhIUiBmb3IgYSBzcGVjaWZpYyBmcmFnbWVudCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG5cdFx0XHRpZihcblx0XHRcdFx0dHlwZW9mIGZyYWdtZW50WEhSW3BqYXhGcmFnbWVudHNdIT09J3VuZGVmaW5lZCcgJiZcblx0XHRcdFx0ZnJhZ21lbnRYSFJbcGpheEZyYWdtZW50c10hPT1udWxsXG5cdFx0XHQpIHtcblx0XHRcdFx0ZnJhZ21lbnRYSFJbcGpheEZyYWdtZW50c10uYWJvcnQoKTtcblx0XHRcdFx0ZnJhZ21lbnRYSFJbcGpheEZyYWdtZW50c10gPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHR1cmwgPSAkLnBhdGguaXNBYnNvbHV0ZVVybCh1cmwpID8gdXJsIDogJC5wYXRoLm1ha2VVcmxBYnNvbHV0ZSh1cmwsIGJhc2VVcmwpO1xuXHRcdFx0aGVhZGVyc1snWC1QamF4J10gPSBwamF4RnJhZ21lbnRzO1xuXG5cdFx0XHR4aHIgPSAkLmFqYXgoe1xuXHRcdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcblx0XHRcdFx0XHR2YXIgZWxlbWVudHMgPSBzZWxmLmhhbmRsZUFqYXhSZXNwb25zZShkYXRhLCBzdGF0dXMsIHhociwgbnVsbCk7XG5cblx0XHRcdFx0XHQvLyBXZSBhcmUgZnVsbHkgZG9uZSBub3csIG1ha2UgaXQgcG9zc2libGUgZm9yIG90aGVycyB0byBob29rIGluIGhlcmUuXG5cdFx0XHRcdFx0c2VsZi50cmlnZ2VyKCdhZnRlcmxvYWRmcmFnbWVudCcsIHsgZGF0YTogZGF0YSwgc3RhdHVzOiBzdGF0dXMsIHhocjogeGhyLCBlbGVtZW50czogZWxlbWVudHMgfSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyb3IpIHtcblx0XHRcdFx0XHRzZWxmLnRyaWdnZXIoJ2xvYWRmcmFnbWVudGVycm9yJywgeyB4aHI6IHhociwgc3RhdHVzOiBzdGF0dXMsIGVycm9yOiBlcnJvciB9KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIFJlc2V0IHRoZSBjdXJyZW50IFhIUiBpbiB0cmFja2luZyBvYmplY3QuXG5cdFx0XHRcdFx0dmFyIGZyYWdtZW50WEhSID0gc2VsZi5nZXRGcmFnbWVudFhIUigpO1xuXHRcdFx0XHRcdGlmKFxuXHRcdFx0XHRcdFx0dHlwZW9mIGZyYWdtZW50WEhSW3BqYXhGcmFnbWVudHNdIT09J3VuZGVmaW5lZCcgJiZcblx0XHRcdFx0XHRcdGZyYWdtZW50WEhSW3BqYXhGcmFnbWVudHNdIT09bnVsbFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnRYSFJbcGpheEZyYWdtZW50c10gPSBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFN0b3JlIHRoZSBmcmFnbWVudCByZXF1ZXN0IHNvIHdlIGNhbiBhYm9ydCBsYXRlciwgc2hvdWxkIHdlIGdldCBhIGR1cGxpY2F0ZSByZXF1ZXN0LlxuXHRcdFx0ZnJhZ21lbnRYSFJbcGpheEZyYWdtZW50c10gPSB4aHI7XG5cblx0XHRcdHJldHVybiB4aHI7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZXMgYWpheCByZXNwb25zZXMgY29udGFpbmluZyBwbGFpbiBIVE1MLCBvciBtdWxpdHBsZVxuXHRcdCAqIFBKQVggZnJhZ21lbnRzIHdyYXBwZWQgaW4gSlNPTiAoc2VlIFBqYXhSZXNwb25zZU5lZ290aWF0b3IgUEhQIGNsYXNzKS5cblx0XHQgKiBDYW4gYmUgaG9va2VkIGludG8gYW4gYWpheCAnc3VjY2VzcycgY2FsbGJhY2suXG5cdFx0ICpcblx0XHQgKiBQYXJhbWV0ZXJzOlxuXHRcdCAqIFx0KE9iamVjdCkgZGF0YVxuXHRcdCAqIFx0KFN0cmluZykgc3RhdHVzXG5cdFx0ICogXHQoWE1MSFRUUFJlcXVlc3QpIHhoclxuXHRcdCAqIFx0KE9iamVjdCkgc3RhdGUgVGhlIG9yaWdpbmFsIGhpc3Rvcnkgc3RhdGUgd2hpY2ggdGhlIHJlcXVlc3Qgd2FzIGluaXRpYXRlZCB3aXRoXG5cdFx0ICovXG5cdFx0aGFuZGxlQWpheFJlc3BvbnNlOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMsIHhociwgc3RhdGUpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcywgdXJsLCBzZWxlY3RlZFRhYnMsIGd1ZXNzRnJhZ21lbnQsIGZyYWdtZW50LCAkZGF0YTtcblxuXHRcdFx0Ly8gU3VwcG9ydCBhIGZ1bGwgcmVsb2FkXG5cdFx0XHRpZih4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtUmVsb2FkJykgJiYgeGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLUNvbnRyb2xsZXJVUkwnKSkge1xuXHRcdFx0XHR2YXIgYmFzZVVybCA9ICQoJ2Jhc2UnKS5hdHRyKCdocmVmJyksXG5cdFx0XHRcdFx0cmF3VVJMID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLUNvbnRyb2xsZXJVUkwnKSxcblx0XHRcdFx0XHR1cmwgPSAkLnBhdGguaXNBYnNvbHV0ZVVybChyYXdVUkwpID8gcmF3VVJMIDogJC5wYXRoLm1ha2VVcmxBYnNvbHV0ZShyYXdVUkwsIGJhc2VVcmwpO1xuXG5cdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUHNldWRvLXJlZGlyZWN0cyB2aWEgWC1Db250cm9sbGVyVVJMIG1pZ2h0IHJldHVybiBlbXB0eSBkYXRhLCBpbiB3aGljaFxuXHRcdFx0Ly8gY2FzZSB3ZSdsbCBpZ25vcmUgdGhlIHJlc3BvbnNlXG5cdFx0XHRpZighZGF0YSkgcmV0dXJuO1xuXG5cdFx0XHQvLyBVcGRhdGUgdGl0bGVcblx0XHRcdHZhciB0aXRsZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1UaXRsZScpO1xuXHRcdFx0aWYodGl0bGUpIGRvY3VtZW50LnRpdGxlID0gZGVjb2RlVVJJQ29tcG9uZW50KHRpdGxlLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcblxuXHRcdFx0dmFyIG5ld0ZyYWdtZW50cyA9IHt9LCBuZXdDb250ZW50RWxzO1xuXHRcdFx0Ly8gSWYgY29udGVudCB0eXBlIGlzIHRleHQvanNvbiAoaWdub3JpbmcgY2hhcnNldCBhbmQgb3RoZXIgcGFyYW1ldGVycylcblx0XHRcdGlmKHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykubWF0Y2goL14oKHRleHQpfChhcHBsaWNhdGlvbikpXFwvanNvblsgXFx0XSo7Py9pKSkge1xuXHRcdFx0XHRuZXdGcmFnbWVudHMgPSBkYXRhO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBGYWxsIGJhY2sgdG8gcmVwbGFjaW5nIHRoZSBjb250ZW50IGZyYWdtZW50IGlmIEhUTUwgaXMgcmV0dXJuZWRcblx0XHRcdFx0ZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cblx0XHRcdFx0alF1ZXJ5LmNsZWFuKCBbIGRhdGEgXSwgZG9jdW1lbnQsIGZyYWdtZW50LCBbXSApO1xuXHRcdFx0XHQkZGF0YSA9ICQoalF1ZXJ5Lm1lcmdlKCBbXSwgZnJhZ21lbnQuY2hpbGROb2RlcyApKTtcblxuXHRcdFx0XHQvLyBUcnkgYW5kIGd1ZXNzIHRoZSBmcmFnbWVudCBpZiBub25lIGlzIHByb3ZpZGVkXG5cdFx0XHRcdC8vIFRPRE86IGRhdGEtcGpheC1mcmFnbWVudCBtaWdodCBhY3R1YWxseSBnaXZlIHVzIHRoZSBmcmFnbWVudC4gRm9yIG5vdyB3ZSBqdXN0IGNoZWNrIG1vc3QgY29tbW9uIGNhc2Vcblx0XHRcdFx0Z3Vlc3NGcmFnbWVudCA9ICdDb250ZW50Jztcblx0XHRcdFx0aWYgKCRkYXRhLmlzKCdmb3JtJykgJiYgISRkYXRhLmlzKCdbZGF0YS1wamF4LWZyYWdtZW50fj1Db250ZW50XScpKSBndWVzc0ZyYWdtZW50ID0gJ0N1cnJlbnRGb3JtJztcblxuXHRcdFx0XHRuZXdGcmFnbWVudHNbZ3Vlc3NGcmFnbWVudF0gPSAkZGF0YTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZXRSZWRyYXdTdXBwcmVzc2lvbih0cnVlKTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIFJlcGxhY2UgZWFjaCBmcmFnbWVudCBpbmRpdmlkdWFsbHlcblx0XHRcdFx0JC5lYWNoKG5ld0ZyYWdtZW50cywgZnVuY3Rpb24obmV3RnJhZ21lbnQsIGh0bWwpIHtcblx0XHRcdFx0XHR2YXIgY29udGVudEVsID0gJCgnW2RhdGEtcGpheC1mcmFnbWVudF0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJC5pbkFycmF5KG5ld0ZyYWdtZW50LCAkKHRoaXMpLmRhdGEoJ3BqYXhGcmFnbWVudCcpLnNwbGl0KCcgJykpICE9IC0xO1xuXHRcdFx0XHRcdH0pLCBuZXdDb250ZW50RWwgPSAkKGh0bWwpO1xuXG5cdFx0XHRcdFx0Ly8gQWRkIHRvIHJlc3VsdCBjb2xsZWN0aW9uXG5cdFx0XHRcdFx0aWYobmV3Q29udGVudEVscykgbmV3Q29udGVudEVscy5hZGQobmV3Q29udGVudEVsKTtcblx0XHRcdFx0XHRlbHNlIG5ld0NvbnRlbnRFbHMgPSBuZXdDb250ZW50RWw7XG5cblx0XHRcdFx0XHQvLyBVcGRhdGUgcGFuZWxzXG5cdFx0XHRcdFx0aWYobmV3Q29udGVudEVsLmZpbmQoJy5jbXMtY29udGFpbmVyJykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnQ29udGVudCBsb2FkZWQgdmlhIGFqYXggaXMgbm90IGFsbG93ZWQgdG8gY29udGFpbiB0YWdzIG1hdGNoaW5nIHRoZSBcIi5jbXMtY29udGFpbmVyXCIgc2VsZWN0b3IgdG8gYXZvaWQgaW5maW5pdGUgbG9vcHMnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFNldCBsb2FkaW5nIHN0YXRlIGFuZCBzdG9yZSBlbGVtZW50IHN0YXRlXG5cdFx0XHRcdFx0dmFyIG9yaWdTdHlsZSA9IGNvbnRlbnRFbC5hdHRyKCdzdHlsZScpO1xuXHRcdFx0XHRcdHZhciBvcmlnUGFyZW50ID0gY29udGVudEVsLnBhcmVudCgpO1xuXHRcdFx0XHRcdHZhciBvcmlnUGFyZW50TGF5b3V0QXBwbGllZCA9ICh0eXBlb2Ygb3JpZ1BhcmVudC5kYXRhKCdqbGF5b3V0JykhPT0ndW5kZWZpbmVkJyk7XG5cdFx0XHRcdFx0dmFyIGxheW91dENsYXNzZXMgPSBbJ2Vhc3QnLCAnd2VzdCcsICdjZW50ZXInLCAnbm9ydGgnLCAnc291dGgnLCAnY29sdW1uLWhpZGRlbiddO1xuXHRcdFx0XHRcdHZhciBlbGVtQ2xhc3NlcyA9IGNvbnRlbnRFbC5hdHRyKCdjbGFzcycpO1xuXHRcdFx0XHRcdHZhciBvcmlnTGF5b3V0Q2xhc3NlcyA9IFtdO1xuXHRcdFx0XHRcdGlmKGVsZW1DbGFzc2VzKSB7XG5cdFx0XHRcdFx0XHRvcmlnTGF5b3V0Q2xhc3NlcyA9ICQuZ3JlcChcblx0XHRcdFx0XHRcdFx0ZWxlbUNsYXNzZXMuc3BsaXQoJyAnKSxcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24odmFsKSB7IHJldHVybiAoJC5pbkFycmF5KHZhbCwgbGF5b3V0Q2xhc3NlcykgPj0gMCk7fVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRuZXdDb250ZW50RWxcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcyhsYXlvdXRDbGFzc2VzLmpvaW4oJyAnKSlcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyhvcmlnTGF5b3V0Q2xhc3Nlcy5qb2luKCcgJykpO1xuXHRcdFx0XHRcdGlmKG9yaWdTdHlsZSkgbmV3Q29udGVudEVsLmF0dHIoJ3N0eWxlJywgb3JpZ1N0eWxlKTtcblxuXHRcdFx0XHRcdC8vIEFsbG93IGluamVjdGlvbiBvZiBpbmxpbmUgc3R5bGVzLCBhcyB0aGV5J3JlIG5vdCBhbGxvd2VkIGluIHRoZSBkb2N1bWVudCBib2R5LlxuXHRcdFx0XHRcdC8vIE5vdCBoYW5kbGluZyB0aGlzIHRocm91Z2ggalF1ZXJ5Lm9uZGVtYW5kIHRvIGF2b2lkIHBhcnNpbmcgdGhlIERPTSB0d2ljZS5cblx0XHRcdFx0XHR2YXIgc3R5bGVzID0gbmV3Q29udGVudEVsLmZpbmQoJ3N0eWxlJykuZGV0YWNoKCk7XG5cdFx0XHRcdFx0aWYoc3R5bGVzLmxlbmd0aCkgJChkb2N1bWVudCkuZmluZCgnaGVhZCcpLmFwcGVuZChzdHlsZXMpO1xuXG5cdFx0XHRcdFx0Ly8gUmVwbGFjZSBwYW5lbCBjb21wbGV0ZWx5ICh3ZSBuZWVkIHRvIG92ZXJyaWRlIHRoZSBcImxheW91dFwiIGF0dHJpYnV0ZSwgc28gY2FuJ3QgcmVwbGFjZSB0aGUgY2hpbGQgaW5zdGVhZClcblx0XHRcdFx0XHRjb250ZW50RWwucmVwbGFjZVdpdGgobmV3Q29udGVudEVsKTtcblxuXHRcdFx0XHRcdC8vIEZvcmNlIGpsYXlvdXQgdG8gcmVidWlsZCBpbnRlcm5hbCBoaWVyYXJjaHkgdG8gcG9pbnQgdG8gdGhlIG5ldyBlbGVtZW50cy5cblx0XHRcdFx0XHQvLyBUaGlzIGlzIG9ubHkgbmVjZXNzYXJ5IGZvciBlbGVtZW50cyB0aGF0IGFyZSBhdCBsZWFzdCAzIGxldmVscyBkZWVwLiAybmQgbGV2ZWwgZWxlbWVudHMgd2lsbFxuXHRcdFx0XHRcdC8vIGJlIHRha2VuIGNhcmUgb2Ygd2hlbiB3ZSBsYXkgb3V0IHRoZSB0b3AgbGV2ZWwgZWxlbWVudCAoLmNtcy1jb250YWluZXIpLlxuXHRcdFx0XHRcdGlmICghb3JpZ1BhcmVudC5pcygnLmNtcy1jb250YWluZXInKSAmJiBvcmlnUGFyZW50TGF5b3V0QXBwbGllZCkge1xuXHRcdFx0XHRcdFx0b3JpZ1BhcmVudC5sYXlvdXQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIFJlLWluaXQgdGFicyAoaW4gY2FzZSB0aGUgZm9ybSB0YWcgaXRzZWxmIGlzIGEgdGFic2V0KVxuXHRcdFx0XHR2YXIgbmV3Rm9ybSA9IG5ld0NvbnRlbnRFbHMuZmlsdGVyKCdmb3JtJyk7XG5cdFx0XHRcdGlmKG5ld0Zvcm0uaGFzQ2xhc3MoJ2Ntcy10YWJzZXQnKSkgbmV3Rm9ybS5yZW1vdmVDbGFzcygnY21zLXRhYnNldCcpLmFkZENsYXNzKCdjbXMtdGFic2V0Jyk7XG5cdFx0XHR9XG5cdFx0XHRmaW5hbGx5IHtcblx0XHRcdFx0dGhpcy5zZXRSZWRyYXdTdXBwcmVzc2lvbihmYWxzZSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHR0aGlzLnJlc3RvcmVUYWJTdGF0ZSgoc3RhdGUgJiYgdHlwZW9mIHN0YXRlLmRhdGEudGFiU3RhdGUgIT09ICd1bmRlZmluZWQnKSA/IHN0YXRlLmRhdGEudGFiU3RhdGUgOiBudWxsKTtcblxuXHRcdFx0cmV0dXJuIG5ld0NvbnRlbnRFbHM7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqXG5cdFx0ICpcblx0XHQgKiBQYXJhbWV0ZXJzOlxuXHRcdCAqIC0gZnJhZ21lbnRzIHtBcnJheX1cblx0XHQgKiBSZXR1cm5zOiBqUXVlcnkgY29sbGVjdGlvblxuXHRcdCAqL1xuXHRcdF9maW5kRnJhZ21lbnRzOiBmdW5jdGlvbihmcmFnbWVudHMpIHtcblx0XHRcdHJldHVybiAkKCdbZGF0YS1wamF4LWZyYWdtZW50XScpLmZpbHRlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gQWxsb3dzIGZvciBtb3JlIHRoYW4gb25lIGZyYWdtZW50IHBlciBub2RlXG5cdFx0XHRcdHZhciBpLCBub2RlRnJhZ21lbnRzID0gJCh0aGlzKS5kYXRhKCdwamF4RnJhZ21lbnQnKS5zcGxpdCgnICcpO1xuXHRcdFx0XHRmb3IoaSBpbiBmcmFnbWVudHMpIHtcblx0XHRcdFx0XHRpZigkLmluQXJyYXkoZnJhZ21lbnRzW2ldLCBub2RlRnJhZ21lbnRzKSAhPSAtMSkgcmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uOiByZWZyZXNoXG5cdFx0ICpcblx0XHQgKiBVcGRhdGVzIHRoZSBjb250YWluZXIgYmFzZWQgb24gdGhlIGN1cnJlbnQgdXJsXG5cdFx0ICpcblx0XHQgKiBSZXR1cm5zOiB2b2lkXG5cdFx0ICovXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcblxuXHRcdFx0JCh0aGlzKS5yZWRyYXcoKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogU2F2ZSB0YWIgc2VsZWN0aW9ucyBpbiBvcmRlciB0byByZWNvbnN0cnVjdCB0aGVtIGxhdGVyLlxuXHRcdCAqIFJlcXVpcmVzIEhUTUw1IHNlc3Npb25TdG9yYWdlIHN1cHBvcnQuXG5cdFx0ICovXG5cdFx0c2F2ZVRhYlN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHR5cGVvZih3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpPT1cInVuZGVmaW5lZFwiIHx8IHdpbmRvdy5zZXNzaW9uU3RvcmFnZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdFx0XHR2YXIgc2VsZWN0ZWRUYWJzID0gW10sIHVybCA9IHRoaXMuX3RhYlN0YXRlVXJsKCk7XG5cdFx0XHR0aGlzLmZpbmQoJy5jbXMtdGFic2V0LC5zcy10YWJzZXQnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XG5cdFx0XHRcdHZhciBpZCA9ICQoZWwpLmF0dHIoJ2lkJyk7XG5cdFx0XHRcdGlmKCFpZCkgcmV0dXJuOyAvLyB3ZSBuZWVkIGEgdW5pcXVlIHJlZmVyZW5jZVxuXHRcdFx0XHRpZighJChlbCkuZGF0YSgndGFicycpKSByZXR1cm47IC8vIGRvbid0IGFjdCBvbiB1bmluaXQnZWQgY29udHJvbHNcblxuXHRcdFx0XHQvLyBBbGxvdyBvcHQtb3V0IHZpYSBkYXRhIGVsZW1lbnQgb3IgZW50d2luZSBwcm9wZXJ0eS5cblx0XHRcdFx0aWYoJChlbCkuZGF0YSgnaWdub3JlVGFiU3RhdGUnKSB8fCAkKGVsKS5nZXRJZ25vcmVUYWJTdGF0ZSgpKSByZXR1cm47XG5cblx0XHRcdFx0c2VsZWN0ZWRUYWJzLnB1c2goe2lkOmlkLCBzZWxlY3RlZDokKGVsKS50YWJzKCdvcHRpb24nLCAnc2VsZWN0ZWQnKX0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmKHNlbGVjdGVkVGFicykge1xuXHRcdFx0XHR2YXIgdGFic1VybCA9ICd0YWJzLScgKyB1cmw7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0d2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGFic1VybCwgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRUYWJzKSk7XG5cdFx0XHRcdH0gY2F0Y2goZXJyKSB7XG5cdFx0XHRcdFx0aWYgKGVyci5jb2RlID09PSBET01FeGNlcHRpb24uUVVPVEFfRVhDRUVERURfRVJSICYmIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdC8vIElmIHRoaXMgZmFpbHMgd2UgaWdub3JlIHRoZSBlcnJvciBhcyB0aGUgb25seSBpc3N1ZSBpcyB0aGF0IGl0XG5cdFx0XHRcdFx0XHQvLyBkb2VzIG5vdCByZW1lbWJlciB0aGUgdGFiIHN0YXRlLlxuXHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIFNhZmFyaSBidWcgd2hpY2ggaGFwcGVucyB3aGVuIHByaXZhdGUgYnJvd3NpbmcgaXMgZW5hYmxlZC5cblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZS1zZWxlY3QgcHJldmlvdXNseSBzYXZlZCB0YWJzLlxuXHRcdCAqIFJlcXVpcmVzIEhUTUw1IHNlc3Npb25TdG9yYWdlIHN1cHBvcnQuXG5cdFx0ICpcblx0XHQgKiBQYXJhbWV0ZXJzOlxuXHRcdCAqIFx0KE9iamVjdCkgTWFwIG9mIHRhYiBjb250YWluZXIgc2VsZWN0b3JzIHRvIHRhYiBzZWxlY3RvcnMuXG5cdFx0ICogXHRVc2VkIHRvIG1hcmsgYSBzcGVjaWZpYyB0YWIgYXMgYWN0aXZlIHJlZ2FyZGxlc3Mgb2YgdGhlIHByZXZpb3VzbHkgc2F2ZWQgb3B0aW9ucy5cblx0XHQgKi9cblx0XHRyZXN0b3JlVGFiU3RhdGU6IGZ1bmN0aW9uKG92ZXJyaWRlU3RhdGVzKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsIHVybCA9IHRoaXMuX3RhYlN0YXRlVXJsKCksXG5cdFx0XHRcdGhhc1Nlc3Npb25TdG9yYWdlID0gKHR5cGVvZih3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIT09XCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpLFxuXHRcdFx0XHRzZXNzaW9uRGF0YSA9IGhhc1Nlc3Npb25TdG9yYWdlID8gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3RhYnMtJyArIHVybCkgOiBudWxsLFxuXHRcdFx0XHRzZXNzaW9uU3RhdGVzID0gc2Vzc2lvbkRhdGEgPyBKU09OLnBhcnNlKHNlc3Npb25EYXRhKSA6IGZhbHNlO1xuXG5cdFx0XHR0aGlzLmZpbmQoJy5jbXMtdGFic2V0LCAuc3MtdGFic2V0JykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGluZGV4LCB0YWJzZXQgPSAkKHRoaXMpLCB0YWJzZXRJZCA9IHRhYnNldC5hdHRyKCdpZCcpLCB0YWIsXG5cdFx0XHRcdFx0Zm9yY2VkVGFiID0gdGFic2V0LmZpbmQoJy5zcy10YWJzLWZvcmNlLWFjdGl2ZScpO1xuXG5cdFx0XHRcdGlmKCF0YWJzZXQuZGF0YSgndGFicycpKXtcblx0XHRcdFx0XHRyZXR1cm47IC8vIGRvbid0IGFjdCBvbiB1bmluaXQnZWQgY29udHJvbHNcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRoZSB0YWJzIG1heSBoYXZlIGNoYW5nZWQsIG5vdGlmeSB0aGUgd2lkZ2V0IHRoYXQgaXQgc2hvdWxkIHVwZGF0ZSBpdHMgaW50ZXJuYWwgc3RhdGUuXG5cdFx0XHRcdHRhYnNldC50YWJzKCdyZWZyZXNoJyk7XG5cblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSBpbnRlbmRlZCB0YWIgaXMgc2VsZWN0ZWQuXG5cdFx0XHRcdGlmKGZvcmNlZFRhYi5sZW5ndGgpIHtcblx0XHRcdFx0XHRpbmRleCA9IGZvcmNlZFRhYi5pbmRleCgpO1xuXHRcdFx0XHR9IGVsc2UgaWYob3ZlcnJpZGVTdGF0ZXMgJiYgb3ZlcnJpZGVTdGF0ZXNbdGFic2V0SWRdKSB7XG5cdFx0XHRcdFx0dGFiID0gdGFic2V0LmZpbmQob3ZlcnJpZGVTdGF0ZXNbdGFic2V0SWRdLnRhYlNlbGVjdG9yKTtcblx0XHRcdFx0XHRpZih0YWIubGVuZ3RoKXtcblx0XHRcdFx0XHRcdGluZGV4ID0gdGFiLmluZGV4KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYoc2Vzc2lvblN0YXRlcykge1xuXHRcdFx0XHRcdCQuZWFjaChzZXNzaW9uU3RhdGVzLCBmdW5jdGlvbihpLCBzZXNzaW9uU3RhdGUpIHtcblx0XHRcdFx0XHRcdGlmKHRhYnNldC5pcygnIycgKyBzZXNzaW9uU3RhdGUuaWQpKXtcblx0XHRcdFx0XHRcdFx0aW5kZXggPSBzZXNzaW9uU3RhdGUuc2VsZWN0ZWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaW5kZXggIT09IG51bGwpe1xuXHRcdFx0XHRcdHRhYnNldC50YWJzKCdvcHRpb24nLCAnYWN0aXZlJywgaW5kZXgpO1xuXHRcdFx0XHRcdHNlbGYudHJpZ2dlcigndGFic3RhdGVyZXN0b3JlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlIGFueSBwcmV2aW91c2x5IHNhdmVkIHN0YXRlLlxuXHRcdCAqXG5cdFx0ICogUGFyYW1ldGVyczpcblx0XHQgKiAgKFN0cmluZykgdXJsIE9wdGlvbmFsIChzYW5pdGl6ZWQpIFVSTCB0byBjbGVhciBhIHNwZWNpZmljIHN0YXRlLlxuXHRcdCAqL1xuXHRcdGNsZWFyVGFiU3RhdGU6IGZ1bmN0aW9uKHVybCkge1xuXHRcdFx0aWYodHlwZW9mKHdpbmRvdy5zZXNzaW9uU3RvcmFnZSk9PVwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuXHRcdFx0dmFyIHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XG5cdFx0XHRpZih1cmwpIHtcblx0XHRcdFx0cy5yZW1vdmVJdGVtKCd0YWJzLScgKyB1cmwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yKHZhciBpPTA7aTxzLmxlbmd0aDtpKyspIHtcblx0XHRcdFx0XHRpZihzLmtleShpKS5tYXRjaCgvXnRhYnMtLykpIHMucmVtb3ZlSXRlbShzLmtleShpKSk7XG5cdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSB0YWIgc3RhdGUgZm9yIHRoZSBjdXJyZW50IFVSTC5cblx0XHQgKi9cblx0XHRjbGVhckN1cnJlbnRUYWJTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNsZWFyVGFiU3RhdGUodGhpcy5fdGFiU3RhdGVVcmwoKSk7XG5cdFx0fSxcblxuXHRcdF90YWJTdGF0ZVVybDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gSGlzdG9yeS5nZXRTdGF0ZSgpLnVybFxuXHRcdFx0XHQucmVwbGFjZSgvXFw/LiovLCAnJylcblx0XHRcdFx0LnJlcGxhY2UoLyMuKi8sICcnKVxuXHRcdFx0XHQucmVwbGFjZSgkKCdiYXNlJykuYXR0cignaHJlZicpLCAnJyk7XG5cdFx0fSxcblxuXHRcdHNob3dMb2dpbkRpYWxvZzogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGVtcGlkID0gJCgnYm9keScpLmRhdGEoJ21lbWJlci10ZW1waWQnKSxcblx0XHRcdFx0ZGlhbG9nID0gJCgnLmxlZnRhbmRtYWluLWxvZ2luZGlhbG9nJyksXG5cdFx0XHRcdHVybCA9ICdDTVNTZWN1cml0eS9sb2dpbic7XG5cblx0XHRcdC8vIEZvcmNlIHJlZ2VuZXJhdGlvbiBvZiBhbnkgZXhpc3RpbmcgZGlhbG9nXG5cdFx0XHRpZihkaWFsb2cubGVuZ3RoKSBkaWFsb2cucmVtb3ZlKCk7XG5cblx0XHRcdC8vIEpvaW4gdXJsIHBhcmFtc1xuXHRcdFx0dXJsID0gJC5wYXRoLmFkZFNlYXJjaFBhcmFtcyh1cmwsIHtcblx0XHRcdFx0J3RlbXBpZCc6IHRlbXBpZCxcblx0XHRcdFx0J0JhY2tVUkwnOiB3aW5kb3cubG9jYXRpb24uaHJlZlxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFNob3cgYSBwbGFjZWhvbGRlciBmb3IgaW5zdGFudCBmZWVkYmFjay4gV2lsbCBiZSByZXBsYWNlZCB3aXRoIGFjdHVhbFxuXHRcdFx0Ly8gZm9ybSBkaWFsb2cgb25jZSBpdHMgbG9hZGVkLlxuXHRcdFx0ZGlhbG9nID0gJCgnPGRpdiBjbGFzcz1cImxlZnRhbmRtYWluLWxvZ2luZGlhbG9nXCI+PC9kaXY+Jyk7XG5cdFx0XHRkaWFsb2cuYXR0cignaWQnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cdFx0XHRkaWFsb2cuZGF0YSgndXJsJywgdXJsKTtcblx0XHRcdCQoJ2JvZHknKS5hcHBlbmQoZGlhbG9nKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIExvZ2luIGRpYWxvZyBwYWdlXG5cdCQoJy5sZWZ0YW5kbWFpbi1sb2dpbmRpYWxvZycpLmVudHdpbmUoe1xuXHRcdG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGpRdWVyeSBkaWFsb2dcblx0XHRcdHRoaXMuc3NkaWFsb2coe1xuXHRcdFx0XHRpZnJhbWVVcmw6IHRoaXMuZGF0YSgndXJsJyksXG5cdFx0XHRcdGRpYWxvZ0NsYXNzOiBcImxlZnRhbmRtYWluLWxvZ2luZGlhbG9nLWRpYWxvZ1wiLFxuXHRcdFx0XHRhdXRvT3BlbjogdHJ1ZSxcblx0XHRcdFx0bWluV2lkdGg6IDUwMCxcblx0XHRcdFx0bWF4V2lkdGg6IDUwMCxcblx0XHRcdFx0bWluSGVpZ2h0OiAzNzAsXG5cdFx0XHRcdG1heEhlaWdodDogNDAwLFxuXHRcdFx0XHRjbG9zZU9uRXNjYXBlOiBmYWxzZSxcblx0XHRcdFx0b3BlbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCgnLnVpLXdpZGdldC1vdmVybGF5JykuYWRkQ2xhc3MoJ2xlZnRhbmRtYWluLWxvZ2luZGlhbG9nLW92ZXJsYXknKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCQoJy51aS13aWRnZXQtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdsZWZ0YW5kbWFpbi1sb2dpbmRpYWxvZy1vdmVybGF5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0b251bm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvcGVuOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuc3NkaWFsb2coJ29wZW4nKTtcblx0XHR9LFxuXHRcdGNsb3NlOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuc3NkaWFsb2coJ2Nsb3NlJyk7XG5cdFx0fSxcblx0XHR0b2dnbGU6IGZ1bmN0aW9uKGJvb2wpIHtcblx0XHRcdGlmKHRoaXMuaXMoJzp2aXNpYmxlJykpIHRoaXMuY2xvc2UoKTtcblx0XHRcdGVsc2UgdGhpcy5vcGVuKCk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBDYWxsYmFjayBhY3RpdmF0ZWQgYnkgQ01TU2VjdXJpdHlfc3VjY2Vzcy5zc1xuXHRcdCAqL1xuXHRcdHJlYXV0aGVudGljYXRlOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFsbCBTZWN1cml0eUlEIGZpZWxkcyB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdFx0aWYodHlwZW9mKGRhdGEuU2VjdXJpdHlJRCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdCQoJzppbnB1dFtuYW1lPVNlY3VyaXR5SURdJykudmFsKGRhdGEuU2VjdXJpdHlJRCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBVcGRhdGUgVGVtcElEIGZvciBjdXJyZW50IHVzZXJcblx0XHRcdGlmKHR5cGVvZihkYXRhLlRlbXBJRCkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdCQoJ2JvZHknKS5kYXRhKCdtZW1iZXItdGVtcGlkJywgZGF0YS5UZW1wSUQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fSk7XG5cblx0LyoqXG5cdCAqIEFkZCBsb2FkaW5nIG92ZXJsYXkgdG8gc2VsZWN0ZWQgcmVnaW9ucyBpbiB0aGUgQ01TIGF1dG9tYXRpY2FsbHkuXG5cdCAqIE5vdCBhcHBsaWVkIHRvIGFsbCBcIioubG9hZGluZ1wiIGVsZW1lbnRzIHRvIGF2b2lkIHNlY29uZGFyeSByZWdpb25zXG5cdCAqIGxpa2UgdGhlIGJyZWFkY3J1bWJzIHNob3dpbmcgdW5uZWNlc3NhcnkgbG9hZGluZyBzdGF0dXMuXG5cdCAqL1xuXHQkKCdmb3JtLmxvYWRpbmcsLmNtcy1jb250ZW50LmxvYWRpbmcsLmNtcy1jb250ZW50LWZpZWxkcy5sb2FkaW5nLC5jbXMtY29udGVudC12aWV3LmxvYWRpbmcnKS5lbnR3aW5lKHtcblx0XHRvbm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY21zLWNvbnRlbnQtbG9hZGluZy1vdmVybGF5IHVpLXdpZGdldC1vdmVybGF5LWxpZ2h0XCI+PC9kaXY+PGRpdiBjbGFzcz1cImNtcy1jb250ZW50LWxvYWRpbmctc3Bpbm5lclwiPjwvZGl2PicpO1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXHRcdG9udW5tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZpbmQoJy5jbXMtY29udGVudC1sb2FkaW5nLW92ZXJsYXksLmNtcy1jb250ZW50LWxvYWRpbmctc3Bpbm5lcicpLnJlbW92ZSgpO1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKiBNYWtlIGFsbCBidXR0b25zIFwiaG92ZXJhYmxlXCIgd2l0aCBqUXVlcnkgdGhlbWluZy4gKi9cblx0JCgnLmNtcyBpbnB1dFt0eXBlPVwic3VibWl0XCJdLCAuY21zIGJ1dHRvbiwgLmNtcyBpbnB1dFt0eXBlPVwicmVzZXRcIl0sIC5jbXMgLnNzLXVpLWJ1dHRvbicpLmVudHdpbmUoe1xuXHRcdG9uYWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuYWRkQ2xhc3MoJ3NzLXVpLWJ1dHRvbicpO1xuXHRcdFx0aWYoIXRoaXMuZGF0YSgnYnV0dG9uJykpIHRoaXMuYnV0dG9uKCk7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0b25yZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYodGhpcy5kYXRhKCdidXR0b24nKSkgdGhpcy5idXR0b24oJ2Rlc3Ryb3knKTtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogTG9hZHMgdGhlIGxpbmsncyAnaHJlZicgYXR0cmlidXRlIGludG8gYSBwYW5lbCB2aWEgYWpheCxcblx0ICogYXMgb3Bwb3NlZCB0byB0cmlnZ2VyaW5nIGEgZnVsbCBwYWdlIHJlbG9hZC5cblx0ICogTGl0dGxlIGhlbHBlciB0byBhdm9pZCByZXBldGl0aW9uLCBhbmQgbWFrZSBpdCBlYXN5IHRvXG5cdCAqIFwib3B0IGluXCIgdG8gcGFuZWwgbG9hZGluZywgd2hpbGUgYnkgZGVmYXVsdCBsaW5rcyBzdGlsbCBleGhpYml0IHRoZWlyIGRlZmF1bHQgYmVoYXZpb3VyLlxuXHQgKiBUaGUgUEpBWCB0YXJnZXQgY2FuIGJlIHNwZWNpZmllZCB2aWEgYSAnZGF0YS1wamF4LXRhcmdldCcgYXR0cmlidXRlLlxuXHQgKi9cblx0JCgnLmNtcyAuY21zLXBhbmVsLWxpbmsnKS5lbnR3aW5lKHtcblx0XHRvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKCdleHRlcm5hbC1saW5rJykpIHtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBocmVmID0gdGhpcy5hdHRyKCdocmVmJyksXG5cdFx0XHRcdHVybCA9IChocmVmICYmICFocmVmLm1hdGNoKC9eIy8pKSA/IGhyZWYgOiB0aGlzLmRhdGEoJ2hyZWYnKSxcblx0XHRcdFx0ZGF0YSA9IHtwamF4OiB0aGlzLmRhdGEoJ3BqYXhUYXJnZXQnKX07XG5cblx0XHRcdCQoJy5jbXMtY29udGFpbmVyJykubG9hZFBhbmVsKHVybCwgbnVsbCwgZGF0YSk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogRG9lcyBhbiBhamF4IGxvYWRzIG9mIHRoZSBsaW5rJ3MgJ2hyZWYnIGF0dHJpYnV0ZSB2aWEgYWpheCBhbmQgZGlzcGxheXMgYW55IEZvcm1SZXNwb25zZSBtZXNzYWdlcyBmcm9tIHRoZSBDTVMuXG5cdCAqIExpdHRsZSBoZWxwZXIgdG8gYXZvaWQgcmVwZXRpdGlvbiwgYW5kIG1ha2UgaXQgZWFzeSB0byB0cmlnZ2VyIGFjdGlvbnMgdmlhIGEgbGluayxcblx0ICogd2l0aG91dCByZWxvYWRpbmcgdGhlIHBhZ2UsIGNoYW5naW5nIHRoZSBVUkwsIG9yIGxvYWRpbmcgaW4gYW55IG5ldyBwYW5lbCBjb250ZW50LlxuXHQgKi9cblx0JCgnLmNtcyAuc3MtdWktYnV0dG9uLWFqYXgnKS5lbnR3aW5lKHtcblx0XHRvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCd1aS1idXR0b24tdGV4dC1vbmx5Jyk7XG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdzcy11aS1idXR0b24tbG9hZGluZyB1aS1idXR0b24tdGV4dC1pY29ucycpO1xuXG5cdFx0XHR2YXIgbG9hZGluZyA9ICQodGhpcykuZmluZChcIi5zcy11aS1sb2FkaW5nLWljb25cIik7XG5cblx0XHRcdGlmKGxvYWRpbmcubGVuZ3RoIDwgMSkge1xuXHRcdFx0XHRsb2FkaW5nID0gJChcIjxzcGFuPjwvc3Bhbj5cIikuYWRkQ2xhc3MoJ3NzLXVpLWxvYWRpbmctaWNvbiB1aS1idXR0b24taWNvbi1wcmltYXJ5IHVpLWljb24nKTtcblxuXHRcdFx0XHQkKHRoaXMpLnByZXBlbmQobG9hZGluZyk7XG5cdFx0XHR9XG5cblx0XHRcdGxvYWRpbmcuc2hvdygpO1xuXG5cdFx0XHR2YXIgaHJlZiA9IHRoaXMuYXR0cignaHJlZicpLCB1cmwgPSBocmVmID8gaHJlZiA6IHRoaXMuZGF0YSgnaHJlZicpO1xuXG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHQvLyBFbnN1cmUgdGhhdCBmb3JtIHZpZXcgaXMgbG9hZGVkIChyYXRoZXIgdGhhbiB3aG9sZSBcIkNvbnRlbnRcIiB0ZW1wbGF0ZSlcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKHhtbGh0dHAsIHN0YXR1cykge1xuXHRcdFx0XHRcdHZhciBtc2cgPSAoeG1saHR0cC5nZXRSZXNwb25zZUhlYWRlcignWC1TdGF0dXMnKSkgPyB4bWxodHRwLmdldFJlc3BvbnNlSGVhZGVyKCdYLVN0YXR1cycpIDogeG1saHR0cC5yZXNwb25zZVRleHQ7XG5cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBtc2cgIT0gXCJ1bmRlZmluZWRcIiAmJiBtc2cgIT09IG51bGwpIGV2YWwobXNnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2goZSkge31cblxuXHRcdFx0XHRcdGxvYWRpbmcuaGlkZSgpO1xuXG5cdFx0XHRcdFx0JChcIi5jbXMtY29udGFpbmVyXCIpLnJlZnJlc2goKTtcblxuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ3NzLXVpLWJ1dHRvbi1sb2FkaW5nIHVpLWJ1dHRvbi10ZXh0LWljb25zJyk7XG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygndWktYnV0dG9uLXRleHQtb25seScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2h0bWwnXG5cdFx0XHR9KTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBUcmlnZ2VyIGRpYWxvZ3Mgd2l0aCBpZnJhbWUgYmFzZWQgb24gdGhlIGxpbmtzIGhyZWYgYXR0cmlidXRlIChzZWUgc3N1aS1jb3JlLmpzKS5cblx0ICovXG5cdCQoJy5jbXMgLnNzLXVpLWRpYWxvZy1saW5rJykuZW50d2luZSh7XG5cdFx0VVVJRDogbnVsbCxcblx0XHRvbm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0XHR0aGlzLnNldFVVSUQobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuXHRcdH0sXG5cdFx0b251bm1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvbmNsaWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cblx0XHRcdHZhciBzZWxmID0gdGhpcywgaWQgPSAnc3MtdWktZGlhbG9nLScgKyB0aGlzLmdldFVVSUQoKTtcblx0XHRcdHZhciBkaWFsb2cgPSAkKCcjJyArIGlkKTtcblx0XHRcdGlmKCFkaWFsb2cubGVuZ3RoKSB7XG5cdFx0XHRcdGRpYWxvZyA9ICQoJzxkaXYgY2xhc3M9XCJzcy11aS1kaWFsb2dcIiBpZD1cIicgKyBpZCArICdcIiAvPicpO1xuXHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKGRpYWxvZyk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBleHRyYUNsYXNzID0gdGhpcy5kYXRhKCdwb3B1cGNsYXNzJyk/dGhpcy5kYXRhKCdwb3B1cGNsYXNzJyk6Jyc7XG5cblx0XHRcdGRpYWxvZy5zc2RpYWxvZyh7aWZyYW1lVXJsOiB0aGlzLmF0dHIoJ2hyZWYnKSwgYXV0b09wZW46IHRydWUsIGRpYWxvZ0V4dHJhQ2xhc3M6IGV4dHJhQ2xhc3N9KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBBZGQgc3R5bGluZyB0byBhbGwgY29udGFpbmVkIGJ1dHRvbnMsIGFuZCBjcmVhdGUgYnV0dG9uc2V0cyBpZiByZXF1aXJlZC5cblx0ICovXG5cdCQoJy5jbXMtY29udGVudCAuQWN0aW9ucycpLmVudHdpbmUoe1xuXHRcdG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5maW5kKCcuc3MtdWktYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIGZvcm0gPSB0aGlzLmZvcm07XG5cblx0XHRcdFx0XHQvLyBmb3JtcyBkb24ndCBuYXRpdmVseSBzdG9yZSB0aGUgYnV0dG9uIHRoZXkndmUgYmVlbiB0cmlnZ2VyZWQgd2l0aFxuXHRcdFx0XHRcdGlmKGZvcm0pIHtcblx0XHRcdFx0XHRcdGZvcm0uY2xpY2tlZEJ1dHRvbiA9IHRoaXM7XG5cdFx0XHRcdFx0XHQvLyBSZXNldCB0aGUgY2xpY2tlZCBidXR0b24gc2hvcnRseSBhZnRlciB0aGUgb25zdWJtaXQgaGFuZGxlcnNcblx0XHRcdFx0XHRcdC8vIGhhdmUgZmlyZWQgb24gdGhlIGZvcm1cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Zm9ybS5jbGlja2VkQnV0dG9uID0gbnVsbDtcblx0XHRcdFx0XHR9LCAxMCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXHRcdG9udW5tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHdpbmRvdy5kZWJ1ZykgY29uc29sZS5sb2coJ3JlZHJhdycsIHRoaXMuYXR0cignY2xhc3MnKSwgdGhpcy5nZXQoMCkpO1xuXG5cdFx0XHQvLyBSZW1vdmUgd2hpdGVzcGFjZSB0byBhdm9pZCBnYXBzIHdpdGggaW5saW5lIGVsZW1lbnRzXG5cdFx0XHR0aGlzLmNvbnRlbnRzKCkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKHRoaXMubm9kZVR5cGUgPT0gMyAmJiAhL1xcUy8udGVzdCh0aGlzLm5vZGVWYWx1ZSkpO1xuXHRcdFx0fSkucmVtb3ZlKCk7XG5cblx0XHRcdC8vIEluaXQgYnV0dG9ucyBpZiByZXF1aXJlZFxuXHRcdFx0dGhpcy5maW5kKCcuc3MtdWktYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYoISQodGhpcykuZGF0YSgnYnV0dG9uJykpICQodGhpcykuYnV0dG9uKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gTWFyayB1cCBidXR0b25zZXRzXG5cdFx0XHR0aGlzLmZpbmQoJy5zcy11aS1idXR0b25zZXQnKS5idXR0b25zZXQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBEdXBsaWNhdGVzIGZ1bmN0aW9uYWxpdHkgaW4gRGF0ZUZpZWxkLmpzLCBidXQgZHVlIHRvIHVzaW5nIGVudHdpbmUgd2UgY2FuIG1hdGNoXG5cdCAqIHRoZSBET00gZWxlbWVudCBvbiBjcmVhdGlvbiwgcmF0aGVyIHRoYW4gb25jbGljayAtIHdoaWNoIGFsbG93cyB1cyB0byBkZWNvcmF0ZVxuXHQgKiB0aGUgZmllbGQgd2l0aCBhIGNhbGVuZGFyIGljb25cblx0ICovXG5cdCQoJy5jbXMgLmZpZWxkLmRhdGUgaW5wdXQudGV4dCcpLmVudHdpbmUoe1xuXHRcdG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGhvbGRlciA9ICQodGhpcykucGFyZW50cygnLmZpZWxkLmRhdGU6Zmlyc3QnKSwgY29uZmlnID0gaG9sZGVyLmRhdGEoKTtcblx0XHRcdGlmKCFjb25maWcuc2hvd2NhbGVuZGFyKSB7XG5cdFx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uZmlnLnNob3dPbiA9ICdidXR0b24nO1xuXHRcdFx0aWYoY29uZmlnLmxvY2FsZSAmJiAkLmRhdGVwaWNrZXIucmVnaW9uYWxbY29uZmlnLmxvY2FsZV0pIHtcblx0XHRcdFx0Y29uZmlnID0gJC5leHRlbmQoY29uZmlnLCAkLmRhdGVwaWNrZXIucmVnaW9uYWxbY29uZmlnLmxvY2FsZV0sIHt9KTtcblx0XHRcdH1cblxuXHRcdFx0JCh0aGlzKS5kYXRlcGlja2VyKGNvbmZpZyk7XG5cdFx0XHQvLyAvLyBVbmZvcnR1bmF0ZWx5IGpRdWVyeSBVSSBvbmx5IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGljb24gaW1hZ2VzLCBub3Qgc3ByaXRlc1xuXHRcdFx0Ly8gdGhpcy5uZXh0KCdidXR0b24nKS5idXR0b24oJ29wdGlvbicsICdpY29ucycsIHtwcmltYXJ5IDogJ3VpLWljb24tY2FsZW5kYXInfSk7XG5cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRvbnVubWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBTdHlsZWQgZHJvcGRvd24gc2VsZWN0IGZpZWxkcyB2aWEgY2hvc2VuLiBBbGxvd3MgdGhpbmdzIGxpa2Ugc2VhcmNoIGFuZCBvcHRncm91cFxuXHQgKiBzZWxlY3Rpb24gc3VwcG9ydC4gUmF0aGVyIHRoYW4gbWFudWFsbHkgYWRkaW5nIGNsYXNzZXMgdG8gc2VsZWN0cyB3ZSB3YW50XG5cdCAqIHN0eWxlZCwgd2Ugc3R5bGUgZXZlcnl0aGluZyBidXQgdGhlIG9uZXMgd2UgdGVsbCBpdCBub3QgdG8uXG5cdCAqXG5cdCAqIEZvciB0aGUgQ01TIHdlIGFsc28gbmVlZCB0byB0ZWxsIHRoZSBwYXJlbnQgZGl2IHRoYXQgaXQgaGFzIGEgc2VsZWN0IHNvXG5cdCAqIHdlIGNhbiBmaXggdGhlIGhlaWdodCBjcm9wcGluZy5cblx0ICovXG5cblx0JCgnLmNtcyAuZmllbGQuZHJvcGRvd24gc2VsZWN0LCAuY21zIC5maWVsZCBzZWxlY3RbbXVsdGlwbGVdLCAuZmllbGRob2xkZXItc21hbGwgc2VsZWN0LmRyb3Bkb3duJykuZW50d2luZSh7XG5cdFx0b25tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih0aGlzLmlzKCcubm8tY2h6bicpKSB7XG5cdFx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRXhwbGljaXRseSBkaXNhYmxlIGRlZmF1bHQgcGxhY2Vob2xkZXIgaWYgbm8gY3VzdG9tIG9uZSBpcyBkZWZpbmVkXG5cdFx0XHRpZighdGhpcy5kYXRhKCdwbGFjZWhvbGRlcicpKSB0aGlzLmRhdGEoJ3BsYWNlaG9sZGVyJywgJyAnKTtcblxuXHRcdFx0Ly8gV2UgY291bGQndmUgZ290dGVuIHN0YWxlIGNsYXNzZXMgYW5kIERPTSBlbGVtZW50cyBmcm9tIGRlZmVycmVkIGNhY2hlLlxuXHRcdFx0dGhpcy5yZW1vdmVDbGFzcygnaGFzLWNoem4gY2h6bi1kb25lJyk7XG5cdFx0XHR0aGlzLnNpYmxpbmdzKCcuY2h6bi1jb250YWluZXInKS5yZW1vdmUoKTtcblxuXHRcdFx0Ly8gQXBwbHkgQ2hvc2VuXG5cdFx0XHRhcHBseUNob3Nlbih0aGlzKTtcblxuXHRcdFx0dGhpcy5fc3VwZXIoKTtcblx0XHR9LFxuXHRcdG9udW5tYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH1cblx0fSk7XG5cblx0JChcIi5jbXMtcGFuZWwtbGF5b3V0XCIpLmVudHdpbmUoe1xuXHRcdHJlZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih3aW5kb3cuZGVidWcpIGNvbnNvbGUubG9nKCdyZWRyYXcnLCB0aGlzLmF0dHIoJ2NsYXNzJyksIHRoaXMuZ2V0KDApKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBPdmVybG9hZCB0aGUgZGVmYXVsdCBHcmlkRmllbGQgYmVoYXZpb3VyIChvcGVuIGEgbmV3IFVSTCBpbiB0aGUgYnJvd3Nlcilcblx0ICogd2l0aCB0aGUgQ01TLXNwZWNpZmljIGFqYXggbG9hZGluZy5cblx0ICovXG5cdCQoJy5jbXMgLnNzLWdyaWRmaWVsZCcpLmVudHdpbmUoe1xuXHRcdHNob3dEZXRhaWxWaWV3OiBmdW5jdGlvbih1cmwpIHtcblx0XHRcdC8vIEluY2x1ZGUgYW55IEdFVCBwYXJhbWV0ZXJzIGZyb20gdGhlIGN1cnJlbnQgVVJMLCBhcyB0aGUgdmlldyBzdGF0ZSBtaWdodCBkZXBlbmQgb24gaXQuXG5cdFx0XHQvLyBGb3IgZXhhbXBsZSwgYSBsaXN0IHByZWZpbHRlcmVkIHRocm91Z2ggZXh0ZXJuYWwgc2VhcmNoIGNyaXRlcmlhIG1pZ2h0IGJlIHBhc3NlZCB0byBHcmlkRmllbGQuXG5cdFx0XHR2YXIgcGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpO1xuXHRcdFx0aWYocGFyYW1zKSB1cmwgPSAkLnBhdGguYWRkU2VhcmNoUGFyYW1zKHVybCwgcGFyYW1zKTtcblx0XHRcdCQoJy5jbXMtY29udGFpbmVyJykubG9hZFBhbmVsKHVybCk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdC8qKlxuXHQgKiBHZW5lcmljIHNlYXJjaCBmb3JtIGluIHRoZSBDTVMsIG9mdGVuIGhvb2tlZCB1cCB0byBhIEdyaWRGaWVsZCByZXN1bHRzIGRpc3BsYXkuXG5cdCAqL1xuXHQkKCcuY21zLXNlYXJjaC1mb3JtJykuZW50d2luZSh7XG5cdFx0b25zdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdC8vIFJlbW92ZSBlbXB0eSBlbGVtZW50cyBhbmQgbWFrZSB0aGUgVVJMIHByZXR0aWVyXG5cdFx0XHR2YXIgbm9uRW1wdHlJbnB1dHMsXG5cdFx0XHRcdHVybDtcblxuXHRcdFx0bm9uRW1wdHlJbnB1dHMgPSB0aGlzLmZpbmQoJzppbnB1dDpub3QoOnN1Ym1pdCknKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIFVzZSBmaWVsZFZhbHVlKCkgZnJvbSBqUXVlcnkuZm9ybSBwbHVnaW4gcmF0aGVyIHRoYW4galF1ZXJ5LnZhbCgpLFxuXHRcdFx0XHQvLyBhcyBpdCBoYW5kbGVzIGNoZWNrYm94IHZhbHVlcyBtb3JlIGNvbnNpc3RlbnRseVxuXHRcdFx0XHR2YXIgdmFscyA9ICQuZ3JlcCgkKHRoaXMpLmZpZWxkVmFsdWUoKSwgZnVuY3Rpb24odmFsKSB7IHJldHVybiAodmFsKTt9KTtcblx0XHRcdFx0cmV0dXJuICh2YWxzLmxlbmd0aCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dXJsID0gdGhpcy5hdHRyKCdhY3Rpb24nKTtcblxuXHRcdFx0aWYobm9uRW1wdHlJbnB1dHMubGVuZ3RoKSB7XG5cdFx0XHRcdHVybCA9ICQucGF0aC5hZGRTZWFyY2hQYXJhbXModXJsLCBub25FbXB0eUlucHV0cy5zZXJpYWxpemUoKSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjb250YWluZXIgPSB0aGlzLmNsb3Nlc3QoJy5jbXMtY29udGFpbmVyJyk7XG5cdFx0XHRjb250YWluZXIuZmluZCgnLmNtcy1lZGl0LWZvcm0nKS50YWJzKCdzZWxlY3QnLDApOyAgLy9hbHdheXMgc3dpdGNoIHRvIHRoZSBmaXJzdCB0YWIgKGxpc3Qgdmlldykgd2hlbiBzZWFyY2hpbmdcblx0XHRcdGNvbnRhaW5lci5sb2FkUGFuZWwodXJsLCBcIlwiLCB7fSwgdHJ1ZSk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBSZXNldCBidXR0b24gaGFuZGxlci4gSUU4IGRvZXMgbm90IGJ1YmJsZSByZXNldCBldmVudHMgdG9cblx0ICovXG5cdCQoXCIuY21zLXNlYXJjaC1mb3JtIGJ1dHRvblt0eXBlPXJlc2V0XSwgLmNtcy1zZWFyY2gtZm9ybSBpbnB1dFt0eXBlPXJlc2V0XVwiKS5lbnR3aW5lKHtcblx0XHRvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBmb3JtID0gJCh0aGlzKS5wYXJlbnRzKCdmb3JtJyk7XG5cblx0XHRcdGZvcm0uY2xlYXJGb3JtKCk7XG5cdFx0XHRmb3JtLmZpbmQoXCIuZHJvcGRvd24gc2VsZWN0XCIpLnByb3AoJ3NlbGVjdGVkSW5kZXgnLCAwKS50cmlnZ2VyKFwibGlzenQ6dXBkYXRlZFwiKTsgLy8gUmVzZXQgY2hvc2VuLmpzXG5cdFx0XHRmb3JtLnN1Ym1pdCgpO1xuXHRcdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogQWxsb3dzIHRvIGxhenkgbG9hZCBhIHBhbmVsLCBieSBsZWF2aW5nIGl0IGVtcHR5XG5cdCAqIGFuZCBkZWNsYXJpbmcgYSBVUkwgdG8gbG9hZCBpdHMgY29udGVudCB2aWEgYSAndXJsJyBIVE1MNSBkYXRhIGF0dHJpYnV0ZS5cblx0ICogVGhlIGxvYWRlZCBIVE1MIGlzIGNhY2hlZCwgd2l0aCBjYWNoZSBrZXkgYmVpbmcgdGhlICd1cmwnIGF0dHJpYnV0ZS5cblx0ICogSW4gb3JkZXIgZm9yIHRoaXMgdG8gd29yayBjb25zaXN0ZW50bHksIHdlIGFzc3VtZSB0aGF0IHRoZSByZXNwb25zZXMgYXJlIHN0YXRlbGVzcy5cblx0ICogVG8gYXZvaWQgY2FjaGluZywgYWRkIGEgJ2RlZmVycmVkLW5vLWNhY2hlJyB0byB0aGUgbm9kZS5cblx0ICovXG5cdHdpbmRvdy5fcGFuZWxEZWZlcnJlZENhY2hlID0ge307XG5cdCQoJy5jbXMtcGFuZWwtZGVmZXJyZWQnKS5lbnR3aW5lKHtcblx0XHRvbmFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHR9LFxuXHRcdG9ucmVtb3ZlOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHdpbmRvdy5kZWJ1ZykgY29uc29sZS5sb2coJ3NhdmluZycsIHRoaXMuZGF0YSgndXJsJyksIHRoaXMpO1xuXG5cdFx0XHQvLyBTYXZlIHRoZSBIVE1MIHN0YXRlIGF0IHRoZSBsYXN0IHBvc3NpYmxlIG1vbWVudC5cblx0XHRcdC8vIERvbid0IHN0b3JlIHRoZSBET00gdG8gYXZvaWQgbWVtb3J5IGxlYWtzLlxuXHRcdFx0aWYoIXRoaXMuZGF0YSgnZGVmZXJyZWROb0NhY2hlJykpIHdpbmRvdy5fcGFuZWxEZWZlcnJlZENhY2hlW3RoaXMuZGF0YSgndXJsJyldID0gdGhpcy5odG1sKCk7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHdpbmRvdy5kZWJ1ZykgY29uc29sZS5sb2coJ3JlZHJhdycsIHRoaXMuYXR0cignY2xhc3MnKSwgdGhpcy5nZXQoMCkpO1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsIHVybCA9IHRoaXMuZGF0YSgndXJsJyk7XG5cdFx0XHRpZighdXJsKSB0aHJvdyAnRWxlbWVudHMgb2YgY2xhc3MgLmNtcy1wYW5lbC1kZWZlcnJlZCBuZWVkIGEgXCJkYXRhLXVybFwiIGF0dHJpYnV0ZSc7XG5cblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cblx0XHRcdC8vIElmIHRoZSBub2RlIGlzIGVtcHR5LCB0cnkgdG8gZWl0aGVyIGxvYWQgaXQgZnJvbSBjYWNoZSBvciB2aWEgYWpheC5cblx0XHRcdGlmKCF0aGlzLmNoaWxkcmVuKCkubGVuZ3RoKSB7XG5cdFx0XHRcdGlmKCF0aGlzLmRhdGEoJ2RlZmVycmVkTm9DYWNoZScpICYmIHR5cGVvZiB3aW5kb3cuX3BhbmVsRGVmZXJyZWRDYWNoZVt1cmxdICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHRoaXMuaHRtbCh3aW5kb3cuX3BhbmVsRGVmZXJyZWRDYWNoZVt1cmxdKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRzZWxmLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5odG1sKGRhdGEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogTGlnaHR3ZWlnaHQgd3JhcHBlciBhcm91bmQgalF1ZXJ5IFVJIHRhYnMuXG5cdCAqIEVuc3VyZXMgdGhhdCBhbmNob3IgbGlua3MgYXJlIHNldCBwcm9wZXJseSxcblx0ICogYW5kIGFueSBuZXN0ZWQgdGFicyBhcmUgc2Nyb2xsZWQgaWYgdGhleSBoYXZlXG5cdCAqIHRoZWlyIGhlaWdodCBleHBsaWNpdGx5IHNldC4gVGhpcyBpcyBpbXBvcnRhbnRcblx0ICogZm9yIGZvcm1zIGluc2lkZSB0aGUgQ01TIGxheW91dC5cblx0ICovXG5cdCQoJy5jbXMtdGFic2V0JykuZW50d2luZSh7XG5cdFx0b25hZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gQ2FuJ3QgbmFtZSByZWRyYXcoKSBhcyBpdCBjbGFzaGVzIHdpdGggb3RoZXIgQ01TIGVudHdpbmUgY2xhc3Nlc1xuXHRcdFx0dGhpcy5yZWRyYXdUYWJzKCk7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0b25yZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSgndGFicycpKSB0aGlzLnRhYnMoJ2Rlc3Ryb3knKTtcblx0XHRcdHRoaXMuX3N1cGVyKCk7XG5cdFx0fSxcblx0XHRyZWRyYXdUYWJzOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmV3cml0ZUhhc2hsaW5rcygpO1xuXG5cdFx0XHR2YXIgaWQgPSB0aGlzLmF0dHIoJ2lkJyksIGFjdGl2ZVRhYiA9IHRoaXMuZmluZCgndWw6Zmlyc3QgLnVpLXRhYnMtYWN0aXZlJyk7XG5cblx0XHRcdGlmKCF0aGlzLmRhdGEoJ3VpVGFicycpKSB0aGlzLnRhYnMoe1xuXHRcdFx0XHRhY3RpdmU6IChhY3RpdmVUYWIuaW5kZXgoKSAhPSAtMSkgPyBhY3RpdmVUYWIuaW5kZXgoKSA6IDAsXG5cdFx0XHRcdGJlZm9yZUxvYWQ6IGZ1bmN0aW9uKGUsIHVpKSB7XG5cdFx0XHRcdFx0Ly8gRGlzYWJsZSBhdXRvbWF0aWMgYWpheCBsb2FkaW5nIG9mIHRhYnMgd2l0aG91dCBtYXRjaGluZyBET00gZWxlbWVudHMsXG5cdFx0XHRcdFx0Ly8gZGV0ZXJtaW5pbmcgaWYgdGhlIGN1cnJlbnQgVVJMIGRpZmZlcnMgZnJvbSB0aGUgdGFiIFVSTCBpcyB0b28gZXJyb3IgcHJvbmUuXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhY3RpdmF0ZTogZnVuY3Rpb24oZSwgdWkpIHtcblx0XHRcdFx0XHQvLyBBY2Nlc3NpYmlsaXR5OiBTaW11bGF0ZSBjbGljayB0byB0cmlnZ2VyIHBhbmVsIGxvYWQgd2hlbiB0YWIgaXMgZm9jdXNlZFxuXHRcdFx0XHRcdC8vIGJ5IGEga2V5Ym9hcmQgbmF2aWdhdGlvbiBldmVudCByYXRoZXIgdGhhbiBhIGNsaWNrXG5cdFx0XHRcdFx0aWYodWkubmV3VGFiKSB7XG5cdFx0XHRcdFx0XHR1aS5uZXdUYWIuZmluZCgnLmNtcy1wYW5lbC1saW5rJykuY2xpY2soKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBVc2FiaWxpdHk6IEhpZGUgYWN0aW9ucyBmb3IgXCJyZWFkb25seVwiIHRhYnMgKHdoaWNoIGRvbid0IGNvbnRhaW4gYW55IGVkaXRhYmxlIGZpZWxkcylcblx0XHRcdFx0XHR2YXIgYWN0aW9ucyA9ICQodGhpcykuY2xvc2VzdCgnZm9ybScpLmZpbmQoJy5BY3Rpb25zJyk7XG5cdFx0XHRcdFx0aWYoJCh1aS5uZXdUYWIpLmNsb3Nlc3QoJ2xpJykuaGFzQ2xhc3MoJ3JlYWRvbmx5JykpIHtcblx0XHRcdFx0XHRcdGFjdGlvbnMuZmFkZU91dCgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhY3Rpb25zLnNob3coKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBFbnN1cmUgaGFzaCBsaW5rcyBhcmUgcHJlZml4ZWQgd2l0aCB0aGUgY3VycmVudCBwYWdlIFVSTCxcblx0XHQgKiBvdGhlcndpc2UgalF1ZXJ5IGludGVycHJldHMgdGhlbSBhcyBiZWluZyBleHRlcm5hbC5cblx0XHQgKi9cblx0XHRyZXdyaXRlSGFzaGxpbmtzOiBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykuZmluZCgndWwgYScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICghJCh0aGlzKS5hdHRyKCdocmVmJykpIHJldHVybjtcblx0XHRcdFx0dmFyIG1hdGNoZXMgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKS5tYXRjaCgvIy4qLyk7XG5cdFx0XHRcdGlmKCFtYXRjaGVzKSByZXR1cm47XG5cdFx0XHRcdCQodGhpcykuYXR0cignaHJlZicsIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qLywgJycpICsgbWF0Y2hlc1swXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBDTVMgY29udGVudCBmaWx0ZXJzXG5cdCAqL1xuXHQkKCcjZmlsdGVycy1idXR0b24nKS5lbnR3aW5lKHtcblx0XHRvbm1hdGNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXG5cdFx0XHR0aGlzLmRhdGEoJ2NvbGxhcHNlZCcsIHRydWUpOyAvLyBUaGUgY3VycmVudCBjb2xsYXBzZWQgc3RhdGUgb2YgdGhlIGVsZW1lbnQuXG5cdFx0XHR0aGlzLmRhdGEoJ2FuaW1hdGluZycsIGZhbHNlKTsgLy8gVHJ1ZSBpZiB0aGUgZWxlbWVudCBpcyBjdXJyZW50bHkgYW5pbWF0aW5nLlxuXHRcdH0sXG5cdFx0b251bm1hdGNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zdXBlcigpO1xuXHRcdH0sXG5cdFx0c2hvd0hpZGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0JGZpbHRlcnMgPSAkKCcuY21zLWNvbnRlbnQtZmlsdGVycycpLmZpcnN0KCksXG5cdFx0XHRcdGNvbGxhcHNlZCA9IHRoaXMuZGF0YSgnY29sbGFwc2VkJyk7XG5cblx0XHRcdC8vIFByZXZlbnQgdGhlIHVzZXIgZnJvbSBzcGFtbWluZyB0aGUgVUkgd2l0aCBhbmltYXRpb24gcmVxdWVzdHMuXG5cdFx0XHRpZiAodGhpcy5kYXRhKCdhbmltYXRpbmcnKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0dGhpcy5kYXRhKCdhbmltYXRpbmcnLCB0cnVlKTtcblxuXHRcdFx0Ly8gU2xpZGUgdGhlIGVsZW1lbnQgZG93biAvIHVwIGJhc2VkIG9uIGl0J3MgY3VycmVudCBjb2xsYXBzZWQgc3RhdGUuXG5cdFx0XHQkZmlsdGVyc1tjb2xsYXBzZWQgPyAnc2xpZGVEb3duJyA6ICdzbGlkZVVwJ10oe1xuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIFVwZGF0ZSB0aGUgZWxlbWVudCdzIHN0YXRlLlxuXHRcdFx0XHRcdHNlbGYuZGF0YSgnY29sbGFwc2VkJywgIWNvbGxhcHNlZCk7XG5cdFx0XHRcdFx0c2VsZi5kYXRhKCdhbmltYXRpbmcnLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0b25jbGljazogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5zaG93SGlkZSgpO1xuXHRcdH1cblx0fSk7XG59KTtcblxudmFyIHN0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbih0ZXh0LCB0eXBlKSB7XG5cdHRleHQgPSBqUXVlcnkoJzxkaXYvPicpLnRleHQodGV4dCkuaHRtbCgpOyAvLyBFc2NhcGUgSFRNTCBlbnRpdGllcyBpbiB0ZXh0XG5cdGpRdWVyeS5ub3RpY2VBZGQoe3RleHQ6IHRleHQsIHR5cGU6IHR5cGUsIHN0YXlUaW1lOiA1MDAwLCBpbkVmZmVjdDoge2xlZnQ6ICcwJywgb3BhY2l0eTogJ3Nob3cnfX0pO1xufTtcblxudmFyIGVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uKHRleHQpIHtcblx0alF1ZXJ5Lm5vdGljZUFkZCh7dGV4dDogdGV4dCwgdHlwZTogJ2Vycm9yJywgc3RheVRpbWU6IDUwMDAsIGluRWZmZWN0OiB7bGVmdDogJzAnLCBvcGFjaXR5OiAnc2hvdyd9fSk7XG59O1xuIiwicmVxdWlyZSgnLi4vLi4vc3JjL0xlZnRBbmRNYWluLkxheW91dC5qcycpO1xucmVxdWlyZSgnLi4vLi4vc3JjL0xlZnRBbmRNYWluLmpzJyk7XG5yZXF1aXJlKCcuLi8uLi9zcmMvTGVmdEFuZE1haW4uQWN0aW9uVGFiU2V0LmpzJyk7XG5yZXF1aXJlKCcuLi8uLi9zcmMvTGVmdEFuZE1haW4uUGFuZWwuanMnKTtcbnJlcXVpcmUoJy4uLy4uL3NyYy9MZWZ0QW5kTWFpbi5UcmVlLmpzJyk7XG5yZXF1aXJlKCcuLi8uLi9zcmMvTGVmdEFuZE1haW4uQ29udGVudC5qcycpO1xucmVxdWlyZSgnLi4vLi4vc3JjL0xlZnRBbmRNYWluLkVkaXRGb3JtLmpzJyk7XG5yZXF1aXJlKCcuLi8uLi9zcmMvTGVmdEFuZE1haW4uTWVudS5qcycpO1xucmVxdWlyZSgnLi4vLi4vc3JjL0xlZnRBbmRNYWluLlByZXZpZXcuanMnKTtcbnJlcXVpcmUoJy4uLy4uL3NyYy9MZWZ0QW5kTWFpbi5CYXRjaEFjdGlvbnMuanMnKTtcbnJlcXVpcmUoJy4uLy4uL3NyYy9MZWZ0QW5kTWFpbi5GaWVsZEhlbHAuanMnKTtcbnJlcXVpcmUoJy4uLy4uL3NyYy9MZWZ0QW5kTWFpbi5GaWVsZERlc2NyaXB0aW9uVG9nZ2xlLmpzJyk7XG5yZXF1aXJlKCcuLi8uLi9zcmMvTGVmdEFuZE1haW4uVHJlZURyb3Bkb3duRmllbGQuanMnKTtcbiJdfQ==
