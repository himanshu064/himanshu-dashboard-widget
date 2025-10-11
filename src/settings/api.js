import { api } from "@telesero/frontend-common";
import { getApiUrl, getBackofficeUrl } from "../constants";

// Lazy initialization to allow environment config to be set before API creation
let application;
let backofficeApi;

const getApplication = () => {
  if (!application) {
    const REACT_APP_API = getApiUrl();
    if (!REACT_APP_API) {
      console.warn(
        "REACT_APP_API is not configured. Please set window.__WIDGET_CONFIG__.REACT_APP_API"
      );
      return api.createApi(""); // Return a placeholder
    }
    application = api.createApi(`${REACT_APP_API}/api`);
  }
  return application;
};

const getBackofficeApi = () => {
  if (!backofficeApi) {
    backofficeApi = api.createBackofficeApi();
  }
  return backofficeApi;
};

// Use a Proxy to lazily initialize the application when accessed
export default new Proxy(
  {},
  {
    get(target, prop) {
      return getApplication()[prop];
    }
  }
);

export const backoffice = new Proxy(
  {},
  {
    get(target, prop) {
      return getBackofficeApi()[prop];
    }
  }
);

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
