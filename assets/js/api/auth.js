import { request } from "../components/request.js";
import { Toast } from "../components/utilities.js";

export const AUTH_REQS = {
  login(data, onSuccess, onError) {
    request.post({
      url: "/api/auth/login",
      data,
      onSuccess,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
  register(data, onSuccess, onError) {
    request.post({
      url: "/api/auth/registration",
      data,
      onSuccess,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
};
