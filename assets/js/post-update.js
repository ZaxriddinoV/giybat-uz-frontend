import { POSTS_REQS } from "./api/posts.js";
import { Loader, REQUEST } from "./components/utilities.js";

class PostUpdate {
  static PARAMS = {
    initParams() {
      this.id = REQUEST.getParameter("id");
    },
  };

  static initFileInputEvent() {
    document
      .getElementById("fileInput")
      .addEventListener("change", function (event) {
        const files = event.target.files;
        if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            const postBox = document.querySelector(".post_img__box");
            postBox.innerHTML = "";
            postBox.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
  }

  static async setFileFromURL(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    document.getElementById("fileInput").files = dataTransfer.files;
  }

  static getPostDetail() {
    Loader.button(true);
    POSTS_REQS.getById(
      PostUpdate.PARAMS.id,
      (response) => {
        const data = response?.data;
        const title = document.getElementById("title");
        const content = document.getElementById("content");
        const fileInput = document.getElementById("fileInput");

        if (data?.content) content.value = data?.content;
        if (data?.title) title.value = data?.title;
        if (data?.photo?.url) {
          this.setFileFromURL(data?.photo?.url);
        }
        Loader.button(false);
      },
      (error) => {
        Loader.button(false);
      }
    );
  }

  static handleSubmit() {
    const fileInput = document.getElementById("fileInput");
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
      alert("Sarlavha va matnni to‘ldiring!");
      return;
    }

    const formData = new FormData();
    if (fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]);
    }
    const dto = JSON.stringify({ title, content });
    formData.append("dto", new Blob([dto], { type: "application/json" }));

    Loader.button(true);
    POSTS_REQS.edit(
      PostUpdate.PARAMS.id,
      formData,
      () => {
        Loader.button(false);
        alert("Muvaffaqiyatli tahrirlandi!");
        window.location.href = "./profile-post-list.html";
      },
      () => {
        Loader.button(false);
      }
    );
  }
}

window.onload = () => {
  PostUpdate.PARAMS.initParams();
  PostUpdate.initFileInputEvent();
  PostUpdate.getPostDetail();

  document.getElementById("updatePost").onclick = () => {
    PostUpdate.handleSubmit();
  };

  document.getElementById("deletePost").onclick = () => {
    const isConfirmed = window.confirm(
      "Haqiqatan ham ushbu postni o‘chirmoqchimisiz?"
    );
    if (isConfirmed) {
      Loader.button(true);
      POSTS_REQS.delete(
        PostUpdate.PARAMS.id,
        () => {
          Loader.button(false);
          alert("Muvaffaqiyatli o'chirildi!");
          window.location.href = "./profile-post-list.html";
        },
        () => {
          Loader.button(false);
        }
      );
    }
  };
};
