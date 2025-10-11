import { api } from "@telesero/frontend-common";
import { getApiUrl, getBackofficeUrl } from "../constants";

const REACT_APP_API = getApiUrl();
const REACT_APP_BACKOFFICE = getBackofficeUrl();

const application = api.createApi(`${REACT_APP_API}/api`);
export default application;
export const backoffice = api.createBackofficeApi();

export const loginRedirect = () =>
  (window.location.href = `${REACT_APP_BACKOFFICE}/login?redirect_url=${encodeURI(
    document.URL
  )}`);

export const logout = () => {
  window.location.replace(`${REACT_APP_BACKOFFICE}/signout`);
};

export const requestErrorHandler = api.requestErrorHandler;
export const normalizeRequestError = api.normalizeRequestError;
export const deleteConflictHandler = api.deleteConflictHandler;
