define([
    'jquery',
    'jquery/ui'
], function($) {
    'use strict';

    $.widget('astound.bayan', {
        options: {
            view: 'all', // {all, mobile-tablet, mobile}
            effect: 'slide', // {slide, opacity}
            speed: 400,
            activeClass: 'active',
            uniqueAttr: 'data-unique',
            isInitialized: false,
            isTriggerVisible: true,
            isContentOpened: false,
            contentAfter: true,
            onInit: function() {},
            onDestroy: function() {}
        },
        _create: function() {
            this.props = {
                isClosed: true
            };
            this.nodes = {
                trigger: {},
                content: {}
            };
            this._defineNodes();
            this._defineEvents();
            this._startUp();
        },
        _defineNodes: function() {
            this.nodes.trigger = this.element;

            if(this.options.contentAfter) this.nodes.content = this.element.next();
            else this.nodes.content = this.element.prev();
        },
        _defineEvents: function() {
            if (this.options.view === 'mobile-tablet') {
                $(window).on('mediaMT', this._initBayan.bind(this));
                $(window).on('mediaD', this._destroyBayan.bind(this));
            } else if (this.options.view === 'mobile') {
                $(window).on('mediaM', this._initBayan.bind(this));
                $(window).on('mediaTD', this._destroyBayan.bind(this));
            }
        },
        _startUp: function() {
            if (this.options.view === 'mobile-tablet') {
                if (!$.mediaD) {
                    this._initBayan();
                } else {
                    this._destroyBayan();
                }
            } else if (this.options.view === 'mobile') {
                if ($.mediaM) {
                    this._initBayan();
                } else {
                    this._destroyBayan();
                }
            } else {
                this._initBayan();
            }
        },
        _initBayan: function() {
            var $trigger = this.nodes.trigger,
                $content = this.nodes.content;

            if (this.props.isInitialized) {
                return;
            }

            if (!this.options.isTriggerVisible) {
                $trigger.show();
            }

            if (this.options.isContentOpened) {
                this.props.isClosed = false;
            } else {
                $content.hide();
                this.props.isClosed = true;
            }
            this.props.isInitialized = true;

            $trigger.on('click.bayan', this._toggleContent.bind(this));
            this.options.onInit();
        },
        _destroyBayan: function() {
            var $trigger = this.nodes.trigger,
                $content = this.nodes.content;

            if (!this.options.isTriggerVisible) {
                $trigger.hide();
            }
            $trigger.removeClass(this.options.activeClass);
            $content.show();
            $trigger.off('click.bayan');
            this.props.isClosed = false;
            this.props.isInitialized = false;

            this.options.onDestroy();
        },
        _toggleContent: function() {
            if (this.props.isClosed) {
                var uniqueVal = this.element.attr(this.options.uniqueAttr);

                if(uniqueVal && uniqueVal.length > 0) {
                    this.options.uniqueAttrValue = uniqueVal;
                    this._hideOtherContents();
                }
                this._showContent();
            } else {
                this._hideContent();
            }
        },
        _showContent: function() {
            var $trigger = this.nodes.trigger,
                $content = this.nodes.content;

            if ($content.is(':hidden')) {
                if (this.options.effect === 'opacity') {
                    $content.animate({height: 'show', opacity: 'show'}, this.options.speed);
                } else {
                    $content.slideDown(this.options.speed);
                }
                $trigger.addClass(this.options.activeClass);
                this.props.isClosed = false;
            }
        },
        _hideContent: function() {
            var $content = this.nodes.content;

            if (this.options.effect === 'opacity') {
                $content.animate({height: 'hide', opacity: 'hide'}, this.options.speed, this._updateTrigger.bind(this));
            } else {
                $content.slideUp(this.options.speed, this._updateTrigger.bind(this));
            }
            this.props.isClosed = true;
        },
        _updateTrigger: function() {
            this.nodes.trigger.removeClass(this.options.activeClass);
        },
        _hideOtherContents: function() {
            var self = this,
                uniqueElements = $('[' + this.options.uniqueAttr + '="' + this.options.uniqueAttrValue +'"]');

            $.each(uniqueElements, function(key, value) {
                if($(value).hasClass(self.options.activeClass)) {
                    $(value).trigger('click')
                }
            });
        }
    });

    return $.astound.bayan;

});
