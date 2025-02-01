import { POSTS_REQS } from "./api/posts.js";
import { Loader, REQUEST } from "./components/utilities.js";

class PostDetail {
  static PARAMS = {
    initParams() {
      this.id = REQUEST.getParameter("id");
    },
  };

  static getPostDetail() {
    Loader.button(true);
    POSTS_REQS.getById(
      PostDetail.PARAMS.id,
      (response) => {
        this.#setPostDetail(response?.data);
      },
      (error) => {
        console.log(error);
        Loader.button(false);
      }
    );
  }

  static #setPostDetail(data) {
    const {
      content,
      title,
      photo: { url },
      createdDate,
      user: { name },
    } = data;
    const postDetailContainer = document.getElementById("post-detail");
    postDetailContainer.innerHTML = "";

    postDetailContainer.innerHTML = `
      <p class="post-detail_data">${createdDate}</p>
                <h2 class="post-detail_title">${title}</h2>
                <div class="post-detail_img__box">
                    <img src="${url}" alt="deposito" class="post-detail_deposito" />
                </div>
                <p class="post-detail_description">${content}</p>
    `;
    Loader.button(false);
  }
}

window.onload = () => {
  PostDetail.PARAMS.initParams();
  PostDetail.getPostDetail();
};