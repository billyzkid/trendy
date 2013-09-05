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
    "./controls/Grid",
    "./controls/GridSelector",
    "./controls/Modal",
    "./controls/ModalTrigger"
], function (trendy, attributes, classes, collections, controls, data, dom, events, objects, oo, strings, styles, vendors, Grid, GridSelector, Modal, ModalTrigger) {

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
    trendy.controls.GridSelector = GridSelector;
    trendy.controls.Modal = Modal;
    trendy.controls.ModalTrigger = ModalTrigger;

});
