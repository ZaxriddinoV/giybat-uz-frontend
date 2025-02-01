import { request } from "../components/request.js";
import { Toast } from "../components/utilities.js";

export const PROFILE_REQS = {
  getAll({ page = 1, size = 10, onSuccess, onError }) {
    request.get({
      url: `/api/post/my?size=${size}&page=${page}`,
      onSuccess: onSuccess,
      onError: (error) => {
        if (typeof onError === "function") onError(error);
        Toast.errorToast(error);
      },
    });
  },
};
