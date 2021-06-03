"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentToJSON = void 0;
// import object from "../object";
// TODO optimize this in the future after we add performance tests. Doing `JSON.parse(JSON.stringify()) can be kinda slow.
function documentToJSON() {
    return JSON.parse(JSON.stringify(Array.isArray(this) ? [...this] : Object.assign({}, this)));
}
exports.documentToJSON = documentToJSON;
//# sourceMappingURL=documentToJSON.js.map