import { POSTS_REQS } from "./api/posts.js";
import { Loader, Toast, User } from "./components/utilities.js";

class PostCreate {
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
    POSTS_REQS.create(
      formData,
      () => {
        Loader.button(false);
        window.location.href = "./profile-post-list.html";
        Toast.successToast("Muvaffaqiyatli yaratildi!");
      },
      () => {
        Loader.button(false);
      }
    );
  }
}

window.onload = () => {
  PostCreate.initFileInputEvent();
  document.getElementById("createPost").onclick = () => {
    PostCreate.handleSubmit();
  };
};
