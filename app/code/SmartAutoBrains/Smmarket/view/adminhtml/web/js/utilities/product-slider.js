define([
    'jquery',
    'matchMedia',
    'jquery/ui',
    'bxSlider'
], function($, mediaCheck) {
    'use strict';

    $.widget('astound.productSlider', {
        options: {
            slider: {},
            isEnoughSlides: false,
            isInitialized: false,
            mediaM: '(max-width: 767px)',
            gridClassName: 'products-widget-grid',
            baseParams: {
                slideWidth: 265,
                infiniteLoop: true,
                hideControlOnEnd: true,
                slideMargin: 20,
                minSlides: 4,
                maxSlides: 4,
                moveSlides: 1,
                pager: false,
                adaptiveHeight: true
            }
        },
        _create: function() {
            this.options.isEnoughSlides = this.element.find('li').length > 4;
            this._defineEvents();
        },
        _defineEvents: function() {
            var self = this;

            if (!this.options.isEnoughSlides) {
                return;
            }
            mediaCheck({
                media: self.options.mediaM,
                entry: function() {
                    self._removeCarousel();
                },
                exit: function() {
                    self._createCarousel();
                }
            });
        },
        _createCarousel: function() {
            this.element.removeClass(this.options.gridClassName);
            this.options.slider = this.element.bxSlider(this.options.baseParams);
            this.isInitialized = true;
        },
        _removeCarousel: function() {
            if (!this.isInitialized) {
                return;
            }
            this.element.addClass(this.options.gridClassName);
            this.options.slider.destroySlider();
            this.isInitialized = false;
        }
    });

    return $.astound.productSlider;
});
