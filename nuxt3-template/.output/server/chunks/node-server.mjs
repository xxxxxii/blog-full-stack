globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"VITE_USER_ID":"2493d451-f326-45cb-aae6-b3b1c167689b","VITE_PACK_ENV":"production","VITE_PACK_URL":"http://139.159.200.153:4000","VITE_API_HOST":"http://localhost:4000","VITE_API_PREFFIX":"/kscm3/"}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _mqccHxmA1I = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _mqccHxmA1I
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"43213-uY/yWaJ7ZZAQXYf7GtNnUhy/A1M\"",
    "mtime": "2022-10-05T10:40:25.926Z",
    "size": 274963,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/autumn20190924.c1d04da4.mp4": {
    "type": "video/mp4",
    "etag": "\"9a8c5a-EzHWoussPZbSXdL6+YxaNRVwETI\"",
    "mtime": "2022-12-28T14:51:09.328Z",
    "size": 10128474,
    "path": "../public/_nuxt/autumn20190924.c1d04da4.mp4"
  },
  "/_nuxt/client-only.b9bd1b5b.js": {
    "type": "application/javascript",
    "etag": "\"54b-SrBoiavC6jyDbhkvZ9Wxkj2fNjg\"",
    "mtime": "2022-12-28T14:51:09.317Z",
    "size": 1355,
    "path": "../public/_nuxt/client-only.b9bd1b5b.js"
  },
  "/_nuxt/comment.12b3b184.js": {
    "type": "application/javascript",
    "etag": "\"17f-SY4mFr3fa9jWIq4lx2FRqVDlVXo\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 383,
    "path": "../public/_nuxt/comment.12b3b184.js"
  },
  "/_nuxt/comment.50ed5908.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5e3-6vgH3TEkbk6UKMNQlPLqjw7dFic\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 1507,
    "path": "../public/_nuxt/comment.50ed5908.css"
  },
  "/_nuxt/comment.vue_vue_type_script_setup_true_lang.bbd6819b.js": {
    "type": "application/javascript",
    "etag": "\"28b9-4VLv+8mrhNkErnUpCCzPAEa6T4k\"",
    "mtime": "2022-12-28T14:51:09.321Z",
    "size": 10425,
    "path": "../public/_nuxt/comment.vue_vue_type_script_setup_true_lang.bbd6819b.js"
  },
  "/_nuxt/composables.7afb6483.js": {
    "type": "application/javascript",
    "etag": "\"61-YlfIr4WdB1kEEzj6hMbqcf1YQUY\"",
    "mtime": "2022-12-28T14:51:09.321Z",
    "size": 97,
    "path": "../public/_nuxt/composables.7afb6483.js"
  },
  "/_nuxt/composables.c59b2609.js": {
    "type": "application/javascript",
    "etag": "\"5a-fJucBiPU5TWOuaF5TIDmTCDSUKM\"",
    "mtime": "2022-12-28T14:51:09.321Z",
    "size": 90,
    "path": "../public/_nuxt/composables.c59b2609.js"
  },
  "/_nuxt/custom.6cf2abb5.js": {
    "type": "application/javascript",
    "etag": "\"111-0hDSr9DFb4Vc0WYU6dJd0OBgR74\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 273,
    "path": "../public/_nuxt/custom.6cf2abb5.js"
  },
  "/_nuxt/default.4195fc52.js": {
    "type": "application/javascript",
    "etag": "\"67c3-qYBbPMU2WR1KcjwUi5QaOHsVbZ8\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 26563,
    "path": "../public/_nuxt/default.4195fc52.js"
  },
  "/_nuxt/default.b078ad4c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1433-bq61B8Z/RBp6DLGRAH4jBUfuL/U\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 5171,
    "path": "../public/_nuxt/default.b078ad4c.css"
  },
  "/_nuxt/entry.4b1d9e49.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55fde-BpCd4jSfz6+u3tQn/QPBrdwg8NA\"",
    "mtime": "2022-12-28T14:51:09.326Z",
    "size": 352222,
    "path": "../public/_nuxt/entry.4b1d9e49.css"
  },
  "/_nuxt/entry.95181df8.js": {
    "type": "application/javascript",
    "etag": "\"ed59b-M9npw3XqpUKRmnvDj70YCJ0tWSU\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 972187,
    "path": "../public/_nuxt/entry.95181df8.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.ed89ec0a.js": {
    "type": "application/javascript",
    "etag": "\"908-H8cnVcupnW0cJ3aDRPKl/JoD43Q\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 2312,
    "path": "../public/_nuxt/error-404.ed89ec0a.js"
  },
  "/_nuxt/error-500.6229cf98.js": {
    "type": "application/javascript",
    "etag": "\"7a9-o/azjisZ03hm+SaZ3baZfbvRtqw\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 1961,
    "path": "../public/_nuxt/error-500.6229cf98.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2022-12-28T14:51:09.326Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-component.634c1a24.js": {
    "type": "application/javascript",
    "etag": "\"50e-/cHo7LntLsm+jBZjtHTU2wh+Z1w\"",
    "mtime": "2022-12-28T14:51:09.317Z",
    "size": 1294,
    "path": "../public/_nuxt/error-component.634c1a24.js"
  },
  "/_nuxt/home.ffe7ae14.js": {
    "type": "application/javascript",
    "etag": "\"dd-0NhS3JjqgaTnf4LucaY5E/wlTj8\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 221,
    "path": "../public/_nuxt/home.ffe7ae14.js"
  },
  "/_nuxt/Icon.294af607.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-5Uom3aokUJYiRMTfQx0OPoBaxqs\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 67,
    "path": "../public/_nuxt/Icon.294af607.css"
  },
  "/_nuxt/Icon.61b4906e.js": {
    "type": "application/javascript",
    "etag": "\"64d1-pstfDiCX7CD0lsN9Iqche3AERAU\"",
    "mtime": "2022-12-28T14:51:09.317Z",
    "size": 25809,
    "path": "../public/_nuxt/Icon.61b4906e.js"
  },
  "/_nuxt/index.1ce0fc8f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"195-9ggi5Ct7n/593EuonGksUg1H64o\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 405,
    "path": "../public/_nuxt/index.1ce0fc8f.css"
  },
  "/_nuxt/index.53f5e2d7.js": {
    "type": "application/javascript",
    "etag": "\"1186e-E6eJjGUYrEnMiUjY5PLwHnDIWDg\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 71790,
    "path": "../public/_nuxt/index.53f5e2d7.js"
  },
  "/_nuxt/index.727444e6.js": {
    "type": "application/javascript",
    "etag": "\"eb-8x5xtC62w84dw98orF0ZCbn5CWs\"",
    "mtime": "2022-12-28T14:51:09.317Z",
    "size": 235,
    "path": "../public/_nuxt/index.727444e6.js"
  },
  "/_nuxt/index.c4be4854.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"683-vSFZahJ7K+6yAKzwb811oCP4eWY\"",
    "mtime": "2022-12-28T14:51:09.325Z",
    "size": 1667,
    "path": "../public/_nuxt/index.c4be4854.css"
  },
  "/_nuxt/index.e52f8d7f.js": {
    "type": "application/javascript",
    "etag": "\"20ec-i6MlYJbkUR8ldvnPXiraouDiv/Q\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 8428,
    "path": "../public/_nuxt/index.e52f8d7f.js"
  },
  "/_nuxt/Table.vue_vue_type_script_setup_true_lang.95fb3d24.js": {
    "type": "application/javascript",
    "etag": "\"157c-NaGaDyjvSoS9+/3IcIDD6bnnEzE\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 5500,
    "path": "../public/_nuxt/Table.vue_vue_type_script_setup_true_lang.95fb3d24.js"
  },
  "/_nuxt/useDialog.1ab77dc3.js": {
    "type": "application/javascript",
    "etag": "\"21f52-pVJXi2w0qadvzH4/xbUnNBSW+7E\"",
    "mtime": "2022-12-28T14:51:09.322Z",
    "size": 139090,
    "path": "../public/_nuxt/useDialog.1ab77dc3.js"
  },
  "/_nuxt/useUtils.1628345e.js": {
    "type": "application/javascript",
    "etag": "\"ff-Sd9uvbZk+fefQSffDKQnWC5X1+Q\"",
    "mtime": "2022-12-28T14:51:09.317Z",
    "size": 255,
    "path": "../public/_nuxt/useUtils.1628345e.js"
  },
  "/_nuxt/_commonjsHelpers.b1246846.js": {
    "type": "application/javascript",
    "etag": "\"211-tvxPKvKNJHX0AI2XMEll4UfyLUA\"",
    "mtime": "2022-12-28T14:51:09.321Z",
    "size": 529,
    "path": "../public/_nuxt/_commonjsHelpers.b1246846.js"
  },
  "/_nuxt/_id_.55e258c6.js": {
    "type": "application/javascript",
    "etag": "\"1d1bd-dyJacJx1R5OGnL307uxjqDa1yuI\"",
    "mtime": "2022-12-28T14:51:09.317Z",
    "size": 119229,
    "path": "../public/_nuxt/_id_.55e258c6.js"
  },
  "/_nuxt/_id_.75c3cdda.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1248a-De8jfeMp13ZxuZJ6/mtivZ96H6g\"",
    "mtime": "2022-12-28T14:51:09.326Z",
    "size": 74890,
    "path": "../public/_nuxt/_id_.75c3cdda.css"
  },
  "/_nuxt/_plugin-vue_export-helper.a1a6add7.js": {
    "type": "application/javascript",
    "etag": "\"5b-SqaToq/MNLald+G/xL4+9aRY3OA\"",
    "mtime": "2022-12-28T14:51:09.317Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.a1a6add7.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_rtn9Rf = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_rtn9Rf, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_rtn9Rf, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
