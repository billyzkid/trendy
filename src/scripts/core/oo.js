define(["exports", "./objects"], function (oo, objects) {

    "use strict";

    if (objects.isFunction(Object.create)) {

        oo.inherit = function (child, parent) {
            child.__super__ = parent;
            child.prototype = Object.create(parent.prototype, {
                constructor: {
                    value: child,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        };

    } else {

        oo.inherit = function (child, parent) {
            var temp = function () {};
            temp.prototype = parent.prototype;

            child.__super__ = parent;
            child.prototype = new temp;
            child.prototype.constructor = child;
        };

    }

    oo.class = function (parent, prototype) {
        if (objects.isUndefined(prototype)) {
            prototype = parent;
            parent = undefined;
        }

        if (!prototype.hasOwnProperty("constructor")) {
            prototype.constructor = function () {};
        }

        var child = prototype.constructor;

        if (!objects.isUndefined(parent)) {
            oo.inherit(child, parent);
        }

        objects.extend(child.prototype, prototype);

        return child;
    };

    //function test(i, c, p) {
    //    console.assert(i.constructor === c);
    //    console.assert(i.constructor.__super__ === p);
    //    console.assert(Object.getPrototypeOf(i) === c.prototype);
    //    console.assert(Object.getPrototypeOf(Object.getPrototypeOf(i)) === p.prototype);
    //    console.assert(i instanceof c);
    //    console.assert(i instanceof p);
    //}

    //function Child() {
    //    this.constructor.__super__.call(this);
    //}

    //function Parent() {
    //}

    //oo.inherit(Child, Parent);

    //test(new Child(), Child, Parent);

});
