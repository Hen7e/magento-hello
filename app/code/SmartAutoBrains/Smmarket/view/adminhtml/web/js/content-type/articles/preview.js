define([
    'jquery',
    'Magento_PageBuilder/js/content-type/preview',
    'Magento_PageBuilder/js/content-type-menu/option',
    'mage/translate',
    'Magento_PageBuilder/js/content-type-factory',
    'Magento_PageBuilder/js/config',
    'accordionAdmin',
    'Magento_PageBuilder/js/events',
    'Magento_PageBuilder/js/utils/promise-deferred'
], function ($, PreviewBase, Option, Translate, ContentTypeFactory, Config, accordion, events, promiseDiffered) {
    'use strict';
    var $super;

    function Preview(parent, config, stageId) {
        var self = this;

        this.onArticlesMountAfter = (0, promiseDiffered)();
        this.onAccordionTitleMountAfter = (0, promiseDiffered)();
        this.onAccordionContentMountAfter = (0, promiseDiffered)();

        events.on('articles:mountAfter', function (args) {
            if (args.contentType.id === self.contentType.id) {
                self.createPromisses.call(self);
                self.onArticlesMountAfter.resolve(args);
            }
        });

        PreviewBase.call(this, parent, config, stageId);
    }

    Preview.prototype = Object.create(PreviewBase.prototype);
    $super = PreviewBase.prototype;

    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = $super.retrieveOptions.call(this, arguments);

        options.add = new Option({
            preview: this,
            icon: "<i class='icon-pagebuilder-add'></i>",
            title: Translate("Add"),
            action: this.addArticleItem,
            classes: ["add-child"],
            sort: 10
        });

        return options;
    };

    Preview.prototype.addArticleItem = function addArticleItem() {
        var self = this;

        ContentTypeFactory(Config.getContentTypeConfig('articles_item'), self.contentType, self.contentType.stageId)
        .then(function (articlesItem) {
            self.contentType.addChild(articlesItem, self.contentType.children().length);
        });
    };

    Preview.prototype.initDisclaimer = function(accordion) {
        $(accordion).bayan({
            effect: 'opacity',
            contentAfter: false
        });
    };

    Preview.prototype.accordionTitleMountAfter = function accordionTitleMountAfter(element) {
        this.onAccordionTitleMountAfter.resolve(element);
    };

    Preview.prototype.accordionContentMountAfter = function accordionContentMountAfter(element) {
        this.onAccordionContentMountAfter.resolve(element);
    };

    Preview.prototype.createPromisses = function createPromisses() {
        var self = this;

        Promise.all([
            this.onArticlesMountAfter.promise,
            this.onAccordionTitleMountAfter.promise,
            this.onAccordionContentMountAfter.promise
        ])
        .then(function(refs) {
            self.initDisclaimer(refs[1]);

            self.onAccordionTitleMountAfter = (0, promiseDiffered)();
            self.onAccordionContentMountAfter = (0, promiseDiffered)();

            self.createPromisses.call(self);
        });
    }

    return Preview;
});
