import { api } from "@telesero/frontend-common";
import { getApiUrl, getBackofficeUrl } from "../constants";

// Defer initialization until first use
function initializeApi() {
  const REACT_APP_API = getApiUrl();
  if (!REACT_APP_API) {
    console.warn(
      "REACT_APP_API is not configured. Please set window.__WIDGET_CONFIG__.REACT_APP_API"
    );
    return api.createApi("");
  }
  return api.createApi(`${REACT_APP_API}/api`);
}

function initializeBackoffice() {
  return api.createBackofficeApi();
}

// Create singleton instances with lazy initialization
let _application;
let _backoffice;

const application = {};
const backofficeApi = {};

// Add getter/setter to lazily initialize
Object.defineProperty(application, "_instance", {
  get() {
    if (!_application) {
      _application = initializeApi();
    }
    return _application;
  }
});

Object.defineProperty(backofficeApi, "_instance", {
  get() {
    if (!_backoffice) {
      _backoffice = initializeBackoffice();
    }
    return _backoffice;
  }
});

// Proxy to forward all method calls to the lazily-initialized instance
const handler = {
  get(target, prop) {
    if (prop === "then" || prop === "catch" || prop === "finally") {
      return undefined; // Not a promise
    }
    return target._instance[prop];
  }
};

export default new Proxy(application, handler);
export const backoffice = new Proxy(backofficeApi, handler);

export const loginRedirect = () => {
  const REACT_APP_BACKOFFICE = getBackofficeUrl();
  return (window.location.href = `${REACT_APP_BACKOFFICE}/login?redirect_url=${encodeURI(
    document.URL
  )}`);
};

export const logout = () => {
  const REACT_APP_BACKOFFICE = getBackofficeUrl();
  window.location.replace(`${REACT_APP_BACKOFFICE}/signout`);
};

export const requestErrorHandler = api.requestErrorHandler;
export const normalizeRequestError = api.normalizeRequestError;
export const deleteConflictHandler = api.deleteConflictHandler;
