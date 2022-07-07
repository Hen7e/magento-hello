define([
    'jquery',
    'Magento_PageBuilder/js/content-type/preview',
    'Magento_PageBuilder/js/events',
    'Magento_PageBuilder/js/utils/promise-deferred'
], function ($, PreviewBase, events, promiseDeferred) {
    'use strict';
    var $super;

    function Preview(parent, config, stageId) {
        PreviewBase.call(this, parent, config, stageId);
    }

    Preview.prototype = Object.create(PreviewBase.prototype);
    $super = PreviewBase.prototype;

    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = $super.retrieveOptions.call(this, arguments);

        return options;
    };

    return Preview;
});
