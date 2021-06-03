"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _serializers, _defaultSerializer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
const CustomError = require("./Error");
const utils = require("./utils");
class Serializer {
    constructor() {
        _serializers.set(this, void 0);
        _defaultSerializer.set(this, void 0);
        this.default = {
            "set": (name) => {
                if (typeof name === "undefined" || name === null) {
                    name = Serializer.defaultName;
                }
                if (!name || typeof name !== "string") {
                    throw new CustomError.InvalidParameter("Field name is required and should be of type string");
                }
                if (Object.keys(__classPrivateFieldGet(this, _serializers)).includes(name)) {
                    __classPrivateFieldSet(this, _defaultSerializer, name);
                }
            }
        };
        __classPrivateFieldSet(this, _serializers, {
            [Serializer.defaultName]: {
                "modify": (serialized, original) => (Object.assign({}, original))
            }
        });
        this.default.set();
    }
    add(name, options) {
        if (!name || typeof name !== "string") {
            throw new CustomError.InvalidParameter("Field name is required and should be of type string");
        }
        if (!options || !(Array.isArray(options) || typeof options === "object")) {
            throw new CustomError.InvalidParameter("Field options is required and should be an object or array");
        }
        __classPrivateFieldGet(this, _serializers)[name] = options;
    }
    delete(name) {
        if (!name || typeof name !== "string") {
            throw new CustomError.InvalidParameter("Field name is required and should be of type string");
        }
        if (name === Serializer.defaultName) {
            throw new CustomError.InvalidParameter("Can not delete primary default serializer");
        }
        // Removing serializer
        if (Object.keys(__classPrivateFieldGet(this, _serializers)).includes(name)) {
            delete __classPrivateFieldGet(this, _serializers)[name];
        }
        // Reset defaultSerializer to default if removing default serializer
        if (__classPrivateFieldGet(this, _defaultSerializer) === name) {
            this.default.set();
        }
    }
    _serializeMany(documentsArray, nameOrOptions) {
        if (!documentsArray || !Array.isArray(documentsArray)) {
            throw new CustomError.InvalidParameter("documentsArray must be an array of document objects");
        }
        return documentsArray.map((document) => {
            try {
                return document.serialize(nameOrOptions);
            }
            catch (e) {
                return this._serialize(document, nameOrOptions);
            }
        });
    }
    _serialize(document, nameOrOptions = __classPrivateFieldGet(this, _defaultSerializer)) {
        let options;
        if (typeof nameOrOptions === "string") {
            options = __classPrivateFieldGet(this, _serializers)[nameOrOptions];
        }
        else {
            options = nameOrOptions;
        }
        if (!options || !(Array.isArray(options) || typeof options === "object")) {
            throw new CustomError.InvalidParameter("Field options is required and should be an object or array");
        }
        if (Array.isArray(options)) {
            return utils.object.pick(document, options);
        }
        return [
            {
                "if": Boolean(options.include),
                "function": () => utils.object.pick(document, options.include)
            },
            {
                "if": Boolean(options.exclude),
                "function": (serialized) => utils.object.delete(serialized, options.exclude)
            },
            {
                "if": Boolean(options.modify),
                "function": (serialized) => options.modify(serialized, document)
            }
        ].filter((item) => item.if).reduce((serialized, item) => item.function(serialized), Object.assign({}, document));
    }
}
exports.Serializer = Serializer;
_serializers = new WeakMap(), _defaultSerializer = new WeakMap();
Serializer.defaultName = "_default";
//# sourceMappingURL=Serializer.js.map