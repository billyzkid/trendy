define(["exports", "./objects"], function (fullscreen, objects) {

    "use strict";

    fullscreen.isEnabled = function () {
        var value = document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.fullscreenEnabled;
        return value || false;
    };

    fullscreen.isFullScreen = function (element) {
        if (objects.isDefined(element)) {
            return getFullScreenElement() === element;
        } else {
            return getFullScreenElement() !== null;
        }
    };

    fullscreen.getFullScreenElement = function () {
        var value = document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement;
        return value || null;
    };

    fullscreen.request = function (element) {
        if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen(); // Element.ALLOW_KEYBOARD_INPUT?
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.requestFullscreen) {
            element.requestFullscreen();
        }
    };

    fullscreen.exit = function () {
        if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    fullscreen.toggle = function (element) {
        if (!fullscreen.isFullScreen(element)) {
            fullscreen.request(element);
            return true;
        } else {
            fullscreen.exit(element);
            return false;
        }
    };

});
