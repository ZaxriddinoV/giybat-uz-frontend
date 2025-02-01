import { PROFILE_REQS } from "./api/profile.js";
import { PaginationList } from "./components/pagination-list.js";

window.onload = () => {
  PaginationList.drawPostContainer({
    container: "post-container",
    apiCall: PROFILE_REQS.getAll,
  });
};
