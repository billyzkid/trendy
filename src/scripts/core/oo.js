define(["exports"], function (oo) {

    "use strict";

    oo.extend = function (derived, base) {
        for (var property in base) {
            if (base.hasOwnProperty(property)) {
                derived[base] = base[property];
            }
        }

        var ctor = function () { this.constructor = derived; };
        ctor.prototype = base.prototype;

        derived.prototype = new ctor();

        return base;
    };

});
