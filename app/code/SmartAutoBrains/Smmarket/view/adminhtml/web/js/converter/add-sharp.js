/*eslint-disable */
define(["Magento_PageBuilder/js/utils/object"], function (_object) {

    /**
     * @api
     */
    var AddSharp =
        /*#__PURE__*/
        function () {
            "use strict";

            function AddSharp() {}

            var _proto = AddSharp.prototype;

            /**
             * Convert value to internal format
             *
             * @param value string
             * @returns {string | object}
             */
            _proto.fromDom = function fromDom(value) {
                if(!value) return;
                if(value.match(/^#/i)) return value.substr(1);
                return value;
            }
            /**
             * Convert value to knockout format
             *
             * @param name string
             * @param data Object
             * @returns {string | object}
             */
            ;

            _proto.toDom = function toDom(name, data) {
                var value = (0, _object.get)(data, name);

                if (!value) return;
                if (!value.match(/^#/i)) return "#" + value;
                return value;
            };

            return AddSharp;
        }();

    return AddSharp;
});
//# sourceMappingURL=remove-px.js.map
