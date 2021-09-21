(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jspdf')) :
    typeof define === 'function' && define.amd ? define(['jspdf'], factory) :
    (global = global || self, factory(global.jspdf));
}(this, (function (jspdf) { 'use strict';
var jsPDF = jspdf.jsPDF;
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('mysel-normal.ttf', font);
this.addFont('mysel-normal.ttf', 'mysel', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
})));