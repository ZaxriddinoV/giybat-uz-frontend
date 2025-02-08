import { POSTS_REQS } from "../api/posts.js";
import { Toastify } from "../lib/toastify/toastify.js";

export class Utilities {
  static getFormValues(formId) {
    const form = document.getElementById(formId);

    if (!(form instanceof HTMLElement)) {
      console.error("FORM: element topilmadi!");
    }

    const formData = new FormData(form);
    const formValues = {};

    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    return formValues;
  }

  static postBox(data) {
    const {
      id,
      photo,
      user: { name, photoId },
      content,
      createdDate,
      title,
    } = data;

    const postBoxElement = document.createElement("div");
    postBoxElement.classList = "post_box";

    const postDetailElement = document.createElement("a");
    // postDetailElement.href = `post-detail.html?id=${id}`;
    postDetailElement.onclick = () => {
      window.location.href = `post-detail.html?id=${id}`;
    };

    const postImgBox = document.createElement("div");
    postImgBox.classList = "post_img__box";

    const img = document.createElement("img");
    img.src = photo?.url ?? "/assets/images/book1.png";
    img.alt = "img";

    const postTitle = document.createElement("h3");
    postTitle.classList = "post_title";
    postTitle.innerText = title;

    const postFooter = document.createElement("div");
    postFooter.className = "post-card-footer";

    const postDate = document.createElement("p");
    postDate.classList = "post_text";
    postDate.innerText = createdDate;

    const postAction = document.createElement("div");
    postAction.className = "post-card-action";

    if (String(User.userInfo?.id) === String(data?.user?.id)) {
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "edit-btn";
      editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
    `;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
    `;

      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `post-update.html?id=${id}`;
      });

      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const isConfirmed = window.confirm(
          "Haqiqatan ham ushbu postni o‘chirmoqchimisiz?"
        );

        if (isConfirmed) {
          Loader.button(true);
          POSTS_REQS.delete(
            id,
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
      });

      postAction.appendChild(editBtn);
      postAction.appendChild(deleteBtn);
    }
    postFooter.appendChild(postDate);
    postFooter.appendChild(postAction);

    postImgBox.appendChild(img);

    postDetailElement.appendChild(postImgBox);
    postDetailElement.appendChild(postTitle);
    postDetailElement.appendChild(postFooter);

    postBoxElement.appendChild(postDetailElement);

    return postBoxElement;
  }

  static notFoundData() {
    const notFoundElement = document.createElement("div");
    notFoundElement.classList.add("not-found-data")
    notFoundElement.innerHTML = `
     <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em"
                    fill="#255cd2" aria-hidden="true">
                    <path
                        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z">
                    </path>
                </svg>
                <p>Ma'lumot mavjud emas!</p>
    `;

    return notFoundElement;
  }
}

export class Toast {
  static successToast(message) {
    Toastify({
      text: message,
      duration: 2000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#4caf50",
      className: "toast-success",
    }).showToast();
  }

  static errorToast(message) {
    Toastify({
      text: message,
      duration: 2000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#f44336",
      className: "toast-error",
    }).showToast();
  }
}

export class User {
  static get token() {
    return localStorage.getItem("token");
  }

  static set token(jwtToken) {
    if (!jwtToken) {
      console.error("Token mavjud emas");
      return;
    }

    localStorage.setItem("token", jwtToken);
  }

  static set userInfo({ name, surname, role, username, id }) {
    const userData = {
      name,
      username,
      surname,
      role,
      id,
    };
    localStorage.setItem("userInfo", JSON.stringify(userData));
  }

  static get userInfo() {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  }
}

export class Loader {
  static button(show) {
    let loader = document.getElementById("loader");
    if (!loader) {
      loader = document.createElement("div");
      loader.id = "loader";
      loader.classList.add("loader");

      const spinner = document.createElement("div");
      spinner.classList.add("spinner");
      loader.appendChild(spinner);

      document.body.appendChild(loader);
    }

    if (show) {
      loader.classList.add("active");
      document.body.classList.add("overlay");
    } else {
      loader.classList.remove("active");
      document.body.classList.remove("overlay");
    }
  }
}

export const REQUEST = {
  getParameter(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || undefined;
  },
};
