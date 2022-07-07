/*eslint-disable */

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass; subClass._proto__ = superClass;
}

define([
        "Magento_PageBuilder/js/mass-converter/widget-directive-abstract",
        "Magento_PageBuilder/js/utils/object"
    ],
    function (widgetDirectiveAbstract, obj) {

        /**
         * @api
         */
        var WidgetDirective =
            function (widgetDirectiveAbstr) {
                "use strict";

                _inheritsLoose(WidgetDirective, widgetDirectiveAbstr);

                function WidgetDirective() {
                    return widgetDirectiveAbstr.apply(this, arguments) || this;
                }

                var proto = WidgetDirective.prototype;

                /**
                 * Convert value to internal format
                 *
                 * @param {object} data
                 * @param {object} config
                 * @returns {object}
                 */
                proto.fromDom = function fromDom(data, config) {
                    var attributes = widgetDirectiveAbstr.prototype.fromDom.call(this, data, config);

                    data.conditions_encoded = this.decodeWysiwygCharacters(attributes.conditions_encoded || "");
                    data.products_count = attributes.products_count;
                    data.show_pager = attributes.show_pager;
                    data.title = attributes.title;

                    return data;
                };

                /**
                 * Convert value to knockout format
                 *
                 * @param {object} data
                 * @param {object} config
                 * @returns {object}
                 */
                proto.toDom = function toDom(data, config) {
                    var attributes = {
                        type: "Magento\\CatalogWidget\\Block\\Product\\ProductsList",
                        template: "Magento_CatalogWidget::product/widget/content/grid.phtml",
                        anchor_text: "",
                        id_path: "",
                        show_dots: data.show_dots,
                        show_arrows: data.show_arrows,
                        is_infinite: data.is_infinite,
                        title: data.title,
                        products_count: data.products_count,
                        type_name: "Catalog Products List",
                        conditions_encoded: this.encodeWysiwygCharacters(data.conditions_encoded || "")
                    };

                    if (attributes.conditions_encoded.length === 0) {
                        return data;
                    }

                    obj.set(data, config.html_variable, this.buildDirective(attributes));
                    return data;
                };

                /**
                 * @param {string} content
                 * @returns {string}
                 */
                proto.encodeWysiwygCharacters = function encodeWysiwygCharacters(content) {
                    return content.replace(/\{/g, "^[").replace(/\}/g, "^]").replace(/"/g, "`").replace(/\\/g, "|").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                };

                /**
                 * @param {string} content
                 * @returns {string}
                 */
                proto.decodeWysiwygCharacters = function decodeWysiwygCharacters(content) {
                    return content.replace(/\^\[/g, "{").replace(/\^\]/g, "}").replace(/`/g, "\"").replace(/\|/g, "\\").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                };

                return WidgetDirective;
            }(widgetDirectiveAbstract);

        return WidgetDirective;
    });
