define([
    'jquery',
    'accordionCustom'
], function () {
    'use strict';

    return function (config, element) {
        if (!element.data('use-disclaimer')) {
            element.addClass('ready');

            return;
        }

        var $disclaimer = element.find('.js-disclaimer');
        var $accordionTitle = element.find('.js-accordion-title');
        var $accordionContent = element.find('.js-accordion-content');
        var $children = $disclaimer.children();
        var visibleItemsAmount = element.data('visibleItemsAmount');
        var hasEnoughItems = $children.length > visibleItemsAmount;

        if (!hasEnoughItems) {
            element.addClass('ready');

            return;
        }

        $children.slice(visibleItemsAmount - 1, $children.length - 1).appendTo($accordionContent);

        $accordionTitle.bayan({
            effect: 'opacity',
            contentAfter: false,
            onInit: function () {
                element.addClass('ready');
            }
        });
    };
});
