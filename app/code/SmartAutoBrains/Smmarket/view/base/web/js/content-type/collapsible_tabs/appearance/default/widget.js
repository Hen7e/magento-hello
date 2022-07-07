define([
    'jquery',
    'Magento_PageBuilder/js/events',
    'tabsCustom'
], function ($) {
    'use strict';

    return function (config, element) {
        var pointerDirection;

        switch (element.data('appearance')) {
            case 'default':
                pointerDirection = 'vertical';

                break;
            case 'horizontal':
                pointerDirection = 'horizontal';

                break;
        }

        element.tabs({
            titleClass: ".js-ctab-title-" + element.data('id'),
            triggerClass: ".js-ctab-trigger-" + element.data('id'),
            pointerClass: ".js-ctab-pointer-" + element.data('id'),
            useHashNavigation: element.data('use-hash-navigation'),
            isScrollToTab: element.data('scroll-to-tab'),
            isScrollToTabAnimated: element.data('scroll-to-tab-animated'),
            speed: element.data('animation-speed'),
            showTabOnInitialization: element.data('show-tab-on-init'),
            accordionCollapsed: false,
            accordionOpenFirst: element.data('accordion-open-on-init') ? element.data('accordion-open-on-init') : false,
            pointerDirection: pointerDirection
        });

        var $samePageLinks = $('a[href^="' + location.href + '#"], a[href^="' + location.pathname + '#"]');

        if ($samePageLinks.length) {
            $samePageLinks.on('click', function (e) {
                e.preventDefault();

                var $header = $('.header'),
                    string = $(this).attr('href').split(/(#.+)/)[1],
                    $sameTabTitle = element.find('.collapsible-tab-title[data-section="' + string + '"]'),
                    $sameTabContent = element.find('.collapsible-tabs-container [data-section="' + string + '"]'),
                    scrollOffsetContent = 0,
                    headerHeight = $header.length ? $header.height() : 0,
                    stickyTabsNav = $('.product-tabs-titles-wrapper.fixed');

                if (string && $sameTabTitle.length && $sameTabContent.length) {
                    $sameTabTitle.trigger('click');
                    scrollOffsetContent = $sameTabContent.offset().top - headerHeight;
                }

                if (stickyTabsNav.length > 0) {
                    scrollOffsetContent -= stickyTabsNav.outerHeight();
                }

                $('body, html').animate({ scrollTop: scrollOffsetContent }, 300);
            });
        }
    };
});
