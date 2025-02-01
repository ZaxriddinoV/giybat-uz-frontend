import { request } from "../components/request.js";
import { Toast } from "../components/utilities.js";

export const POSTS_REQS = {
  getAll({ page = 1, size = 10, onSuccess, onError }) {
    request.get({
      url: `/api/post/all?page=${page}&size=${size}`,
      onSuccess: onSuccess,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
  getById(id, onSuccess, onError) {
    request.get({
      url: `/api/post/${id}`,
      onSuccess: onSuccess,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
  create(data, onSuccess, onError) {
    request.post({
      url: `/api/post/`,
      data: data,
      onSuccess: onSuccess,
      isMultipart: true,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
  edit(id, data, onSuccess, onError) {
    request.put({
      url: `/api/post/${id}`,
      data: data,
      onSuccess: onSuccess,
      isMultipart: true,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
  delete(id, onSuccess, onError) {
    request.delete({
      url: `/api/post/${id}`,
      onSuccess: onSuccess,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
  filter(id, page, size, onSuccess, onError) {
    request.delete({
      url: `/api/post/${id}?page=${page}&size=${size}`,
      onSuccess: onSuccess,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
};
