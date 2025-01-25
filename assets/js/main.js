import { POSTS_REQS } from "./api/posts.js";
import { Loader, Utilities } from "./components/utilities.js";

class Main {
  static currentPage = 1;
  static pageSize = 5;
  static totalPages = 1;

  static drawPostContainer() {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";
    Loader.button(true);
    POSTS_REQS.getAll({
      page: Main.currentPage,
      size: Main.pageSize,
      onSuccess: (res) => {
        res?.data?.posts.forEach((data) => {
          const postBox = Utilities.postBox(data);
          postContainer.appendChild(postBox);

          Main.totalPages = res?.data?.totalPages;
          Main.currentPage = res?.data?.currentPage;
          Main.pageSize = res?.data?.pageSize;
        });
        Loader.button(false);
        Main.updatePagination();
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
    backButton.disabled = Main.currentPage === 1;
    backButton.addEventListener("click", () => {
      if (Main.currentPage > 1) {
        Main.currentPage--;
        Main.drawPostContainer();
      }
    });
    paginationWrapper.appendChild(backButton);

    const maxPagesToShow = 5;
    let pageButtons = [];

    if (Main.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= Main.totalPages; i++) {
        pageButtons.push(i - 1);
      }
    } else {
      const leftEllipsis = Main.currentPage > 2;
      const rightEllipsis = Main.currentPage < Main.totalPages - 3;

      if (Main.currentPage <= 2) {
        pageButtons = [0, 1, 2, 3, 4];
      } else if (Main.currentPage >= Main.totalPages - 3) {
        pageButtons = [
          Main.totalPages - 5,
          Main.totalPages - 4,
          Main.totalPages - 3,
          Main.totalPages - 2,
          Main.totalPages - 1,
        ];
      } else {
        pageButtons = [
          Main.currentPage - 2,
          Main.currentPage - 1,
          Main.currentPage,
          Main.currentPage + 1,
          Main.currentPage + 2,
        ];
        if (leftEllipsis) pageButtons = [0, "...", ...pageButtons];
        if (rightEllipsis)
          pageButtons = [...pageButtons, "...", Main.totalPages - 1];
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

        if (page + 1 === Main.currentPage) {
          pageButton.classList.add("pagination_active");
        }

        pageButton.addEventListener("click", () => {
          Main.currentPage = page + 1;
          Main.drawPostContainer();
        });
      }

      pagination_btn__box.appendChild(pageButton);
      paginationBlock.appendChild(pagination_btn__box);
    });

    paginationWrapper.appendChild(paginationBlock);

    const nextButton = document.createElement("button");
    nextButton.classList.add("pagination_btn", "pagination-forward");
    nextButton.textContent = "Keyingi";
    nextButton.disabled = Main.currentPage === Main.totalPages;
    nextButton.addEventListener("click", () => {
      if (Main.currentPage < Main.totalPages) {
        Main.currentPage++;
        Main.drawPostContainer();
      }
    });
    paginationWrapper.appendChild(nextButton);

    const allPageButtons = paginationBlock.querySelectorAll("[data-page]");
    allPageButtons.forEach((button) =>
      button.classList.remove("pagination_active")
    );

    const activeButton = paginationBlock.querySelector(
      `[data-page="${Main.currentPage}"]`
    );

    if (activeButton) {
      activeButton.classList.add("pagination_active");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Main.drawPostContainer();
});
