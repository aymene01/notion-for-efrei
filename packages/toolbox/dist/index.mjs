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
import { invert } from "lodash";
function getEnum(key, values, defaultValue) {
  const value = getString(key, defaultValue);
  const strValues = invert(values);
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
import pino from "pino";
var logger = pino({
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
export {
  getBoolean,
  getEnum,
  getListenAddr,
  getNumber,
  getString,
  logger,
  wait,
  waitForSignal
};
