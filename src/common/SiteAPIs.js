import Config from "./Config";
import axios from 'axios';
let { Toast } = window.bryntum.scheduler;

const axiosAPI = axios.create({
  baseURL: Config.siteUrl,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
});

export function apiPostCall(path, params, token) {
  let headers = {}
  if (process.env.REACT_APP_ENV == 'dev') {
    headers.Authorization = Config.siteToken
  } else {
    headers['X-Frappe-CSRF-Token'] = token
  }
  return axiosAPI.post(path, params, { headers: headers })
    .then((response) => {
      return response?.data?.message ? response.data.message : []
    })
    .catch((error) => {
      let errors = null
      if (error.response) {
        errors = error.response
      } else if (error.request) {
        errors = error.request
      } else {
        errors = error.message
      }
      Toast.show(errors.statusText);
    });
}

export function apiPutCall(path, params, token) {
  let headers = {}
  if (process.env.REACT_APP_ENV == 'dev') {
    headers.Authorization = Config.siteToken
  } else {
    headers['X-Frappe-CSRF-Token'] = token
  }
  return axiosAPI.put(path, params, { headers: headers })
    .then((response) => {
      return response?.data ? response.data : {}
    })
    .catch((error) => {
      let errors = null
      if (error.response) {
        errors = error.response
      } else if (error.request) {
        errors = error.request
      } else {
        errors = error.message
      }
      Toast.show(errors.statusText);
    });
}

export async function getQueryDataApi(query) {
  let headers = { 'Content-Type': 'application/json' }
  let data = await axiosAPI.post('api/method/erp_custom_auth.authentication.getSqlQuery', { query }, { headers })
  return data?.data?.message
}