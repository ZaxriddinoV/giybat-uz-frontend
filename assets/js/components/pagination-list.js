import { Loader, Utilities } from "./utilities.js";

export class PaginationList {
  static currentPage = 1;
  static pageSize = 10;
  static totalPages = 1;
  static apiCall;
  static container;

  static drawPostContainer({ container, apiCall }) {
    const postContainer = document.getElementById(container);
    if (!postContainer) throw new Error("Container element mavjud emas!");

    if (!typeof apiCall === "function")
      throw new Error("Request callback mavjud emas!");

    PaginationList.container = postContainer;
    PaginationList.apiCall = apiCall;
    PaginationList.getDataList();
  }

  static getDataList() {
    PaginationList.container.innerHTML = "";
    Loader.button(true);
    PaginationList.apiCall({
      page: PaginationList.currentPage,
      size: PaginationList.pageSize,
      onSuccess: (res) => {
        Loader.button(false);
        if (res?.data.posts?.length > 0) {
          res?.data?.posts.forEach((data) => {
            const postBox = Utilities.postBox(data);
            PaginationList.container.appendChild(postBox);

            PaginationList.totalPages = res?.data?.totalPages;
            PaginationList.currentPage = res?.data?.currentPage;
            PaginationList.pageSize = res?.data?.pageSize;
          });
          PaginationList.updatePagination();
        } else {
          PaginationList.container.classList.remove("post_container");
          PaginationList.container.appendChild(Utilities.notFoundData());
        }
      },
      onError: () => {
        Loader.button(false);
      },
    });
  }

  static updatePagination() {
    const paginationWrapper = document.getElementById("pagination-wrapper");
    const paginationBlock = document.createElement("div");
    paginationBlock.classList.add("pagination_block");
    paginationBlock.id = "pagination-block";

    paginationWrapper.innerHTML = "";

    const backButton = document.createElement("button");
    backButton.classList.add("pagination_btn", "pagination-back");
    backButton.textContent = "Oldingi";
    backButton.disabled = PaginationList.currentPage === 1;
    backButton.addEventListener("click", () => {
      if (PaginationList.currentPage > 1) {
        PaginationList.currentPage--;
        PaginationList.getDataList();
      }
    });
    paginationWrapper.appendChild(backButton);

    const maxPagesToShow = 5;
    let pageButtons = [];

    if (PaginationList.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= PaginationList.totalPages; i++) {
        pageButtons.push(i - 1);
      }
    } else {
      const leftEllipsis = PaginationList.currentPage > 2;
      const rightEllipsis =
        PaginationList.currentPage < PaginationList.totalPages - 3;

      if (PaginationList.currentPage <= 2) {
        pageButtons = [0, 1, 2, 3, 4];
      } else if (PaginationList.currentPage >= PaginationList.totalPages - 3) {
        pageButtons = [
          PaginationList.totalPages - 5,
          PaginationList.totalPages - 4,
          PaginationList.totalPages - 3,
          PaginationList.totalPages - 2,
          PaginationList.totalPages - 1,
        ];
      } else {
        pageButtons = [
          PaginationList.currentPage - 2,
          PaginationList.currentPage - 1,
          PaginationList.currentPage,
          PaginationList.currentPage + 1,
          PaginationList.currentPage + 2,
        ];
        if (leftEllipsis) pageButtons = [0, "...", ...pageButtons];
        if (rightEllipsis)
          pageButtons = [...pageButtons, "...", PaginationList.totalPages - 1];
      }
    }

    pageButtons.forEach((page, index) => {
      const pagination_btn__box = document.createElement("div");
      pagination_btn__box.classList = "pagination_btn__box";

      const pageButton = document.createElement("button");
      pageButton.classList.add("pagination_btn");

      if (page === "...") {
        pageButton.textContent = "...";
        pageButton.disabled = true;
      } else {
        pageButton.textContent = page + 1;
        pageButton.setAttribute("data-page", page + 1);

        if (page + 1 === PaginationList.currentPage) {
          pageButton.classList.add("pagination_active");
        }

        pageButton.addEventListener("click", () => {
          PaginationList.currentPage = page + 1;
          PaginationList.getDataList();
        });
      }

      pagination_btn__box.appendChild(pageButton);
      paginationBlock.appendChild(pagination_btn__box);
    });

    paginationWrapper.appendChild(paginationBlock);

    const nextButton = document.createElement("button");
    nextButton.classList.add("pagination_btn", "pagination-forward");
    nextButton.textContent = "Keyingi";
    nextButton.disabled =
      PaginationList.currentPage === PaginationList.totalPages;
    nextButton.addEventListener("click", () => {
      if (PaginationList.currentPage < PaginationList.totalPages) {
        PaginationList.currentPage++;
        PaginationList.getDataList();
      }
    });
    paginationWrapper.appendChild(nextButton);

    const allPageButtons = paginationBlock.querySelectorAll("[data-page]");
    allPageButtons.forEach((button) =>
      button.classList.remove("pagination_active")
    );

    const activeButton = paginationBlock.querySelector(
      `[data-page="${PaginationList.currentPage}"]`
    );

    if (activeButton) {
      activeButton.classList.add("pagination_active");
    }
  }
}
