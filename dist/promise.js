(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.promise = factory());
}(this, function () { 'use strict';

    var MPromise = function MPromise(){
        this.name = 123;
    };

    return MPromise;

}));
