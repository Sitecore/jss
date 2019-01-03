"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseJson = function (jsonString) {
    try {
        var json = JSON.parse(jsonString);
        // handle non-exception-throwing cases
        if (json && typeof json === 'object' && json !== null) {
            return json;
        }
    }
    catch (e) {
        console.error("error parsing json string '" + jsonString + "'", e);
    }
    return null;
};
var traverseAndUpdate = function (instance, oldValue, newValue) {
    for (var i in instance) {
        if (instance[i] !== null && typeof (instance[i]) == "object") {
            //going one step down in the object tree!!
            traverseAndUpdate(instance[i], oldValue, newValue);
        }
        else {
            if (typeof (instance[i]) == 'string' && instance[i].indexOf(oldValue) > -1) {
                instance[i] = instance[i].replace(oldValue, newValue);
            }
        }
    }
};
exports.buildQueryString = function (params) {
    return Object.keys(params)
        .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]); })
        .join('&');
};
exports.updateObject = function (instance, oldValue, newValue) {
    traverseAndUpdate(instance, oldValue, newValue);
};
