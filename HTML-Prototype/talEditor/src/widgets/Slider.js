/**
 * Created by Raoh on 2014/10/10.
 */
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin"
], function (declare, _WidgetBase, _TemplatedMixin) {
    return declare([_WidgetBase, _TemplatedMixin], {
        baseClass: "kb-slider",
        templateString: '<div class="${baseClass}"><a class="ui-slider-handle"><span class="value" data-dojo-attach-point="tipNode"></span><span class="dot"></span></a></div>',
        min: 0,
        max: 10,
        step: 1,
        value: 0,
        tipNode: null,
        orientation: "horizontal",//"horizontal" or "vertical"
        range: "min",
        constructor: function (params) {
            declare.safeMixin(this, params);
        },
        buildRendering: function () {
            this.inherited(arguments);
            var self = this;
            $(this.domNode).slider({
                min: this.min,
                max: this.max,
                step: this.step,
                value: this.value,
                orientation: this.orientation,
                range: this.range,
                change: function (evt, ui) {
                    if (self.value != ui.value) {
                        self._set("value", ui.value);
                        self.tipNode.textContent=self.value;
                        self.onChange(self.value);
                    }
                },
                slide: function (evt, ui) {
                    self.tipNode.textContent=ui.value;
                }
            });
        },
        _setValueAttr: function (value) {
            $(this.domNode).slider("value", value);
        },
        onChange: function (newValue) {
        },
        destroy: function () {
            $(this.domNode).slider("destroy");
            this.inherited(arguments);
            delete this.tipNode;
        }
    });
});
