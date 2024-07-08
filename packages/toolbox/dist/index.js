"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var toolbox_exports = {};
__export(toolbox_exports, {
  getBoolean: () => getBoolean,
  getEnum: () => getEnum,
  getListenAddr: () => getListenAddr,
  getNumber: () => getNumber,
  getString: () => getString,
  logger: () => logger,
  wait: () => wait,
  waitForSignal: () => waitForSignal
});
module.exports = __toCommonJS(toolbox_exports);

// env/getString.ts
function getString(key, defaultValue) {
  const value = process.env[key] !== void 0 ? process.env[key] : defaultValue;
  return value;
}

// env/getListenAddr.ts
function getListenAddr(key, defaultValue) {
  const value = getString(key, defaultValue);
  const [host, portStr] = value == null ? void 0 : value.split(":");
  const port = parseInt(portStr);
  if (isNaN(port)) {
    throw new Error(`Cannot parseInt(${portStr}) for environment variable "${key}"`);
  }
  return { host, port };
}

// env/getEnum.ts
var import_lodash = require("lodash");
function getEnum(key, values, defaultValue) {
  const value = getString(key, defaultValue);
  const strValues = (0, import_lodash.invert)(values);
  if (strValues[value] === void 0) {
    throw new Error(`value ${value} for variable ${key} is not valid, valid values are ${Object.keys(strValues)}`);
  }
  return value;
}

// env/getBoolean.ts
function getBoolean(key, defaultValue) {
  const value = getEnum(key, ["true", "false"], `${defaultValue}`);
  return value === "true";
}

// env/getNumber.ts
function getNumber(key, defaultValue) {
  const value = getString(key, `${defaultValue}`);
  const number = parseInt(value);
  if (isNaN(number)) {
    throw new Error(`Cannot parseInt("${value}") for environment variable "${key}"`);
  }
  return number;
}

// logger/logger.ts
var import_pino = __toESM(require("pino"));
var logger = (0, import_pino.default)({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
});

// os/signal.ts
function waitForSignal(signals) {
  return new Promise((resolve) => {
    signals.forEach((signal) => {
      process.on(signal, () => resolve(signal));
    });
  });
}

// time/wait.ts
var wait = (d) => new Promise((r) => setTimeout(r, d));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBoolean,
  getEnum,
  getListenAddr,
  getNumber,
  getString,
  logger,
  wait,
  waitForSignal
});
