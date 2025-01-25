import { BASE_URL } from "../../config/config.js";
import { User } from "./utilities.js";

export const request = {
  async makeRequest({
    method,
    url,
    data = {},
    onSuccess = () => {},
    onError = () => {},
    isMultipart = false,
    customHeaders = {},
  }) {
    try {
      const token = User.token;
      
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      };

      let body;

      if (isMultipart) {
        body = data;
      } else {
        headers["Content-Type"] = headers["Content-Type"] || "application/json";
        body = method !== "GET" ? JSON.stringify(data) : undefined;
      }

      const options = {
        method,
        headers,
        ...(body && { body }),
      };

      const response = await fetch(BASE_URL + url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `${errorData?.message} - ${response.status}` || "HTTP error!"
        );
      }

      const responseData = await response.json();
      onSuccess(responseData);
      return responseData;
    } catch (error) {
      onError(error);
      throw error;
    }
  },
  get({ url, onSuccess, onError, headers = {} }) {
    return request.makeRequest({
      method: "GET",
      url,
      onSuccess,
      onError,
      customHeaders: headers,
    });
  },
  post({ url, data, onSuccess, onError, isMultipart = false, headers = {} }) {
    return request.makeRequest({
      method: "POST",
      url,
      data,
      onSuccess,
      onError,
      isMultipart,
      customHeaders: headers,
    });
  },
  put({ url, data, onSuccess, onError, isMultipart = false, headers = {} }) {
    return request.makeRequest({
      method: "PUT",
      url,
      data,
      onSuccess,
      onError,
      isMultipart,
      customHeaders: headers,
    });
  },
  delete({ url, onSuccess, onError, headers = {} }) {
    return request.makeRequest({
      method: "DELETE",
      url,
      onSuccess,
      onError,
      customHeaders: headers,
    });
  },
};
