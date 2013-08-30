define([
    "exports",
    "./core/attributes",
    "./core/classes",
    "./core/collections",
    "./core/controls",
    "./core/data",
    "./core/dom",
    "./core/events",
    "./core/objects",
    "./core/oo",
    "./core/strings",
    "./core/styles",
    "./core/vendors",
    "./controls/Grid"
], function (
    trendy,
    attributes,
    classes,
    collections,
    controls,
    data,
    dom,
    events,
    objects,
    oo,
    strings,
    styles,
    vendors,
    Grid
) {

    "use strict";

    // core
    trendy.attributes = attributes;
    trendy.classes = classes;
    trendy.collections = collections;
    trendy.controls = controls;
    trendy.data = data;
    trendy.dom = dom;
    trendy.events = events;
    trendy.objects = objects;
    trendy.oo = oo;
    trendy.strings = strings;
    trendy.styles = styles;
    trendy.vendors = vendors;

    // controls
    trendy.controls.Grid = Grid;

    // initialize declarative controls
    dom.ready(function () {
        var controls = trendy.collections.map(dom.queryAll(document, "[data-trendy-control]"), function (element) {
            var name = trendy.attributes.get(element, "data-trendy-control");
            var options = trendy.attributes.get(element, "data-trendy-options");
            return new trendy.controls[name](element, trendy.strings.jsonify(options));
        });
    });

});
