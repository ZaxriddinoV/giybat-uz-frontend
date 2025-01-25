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
    postDetailElement.href = `post-detail.html?id=${id}`;

    const postImgBox = document.createElement("div");
    postImgBox.classList = "post_img__box";

    const img = document.createElement("img");
    img.src = photo?.url ?? "/assets/images/book1.png";
    img.alt = "img";

    const postTitle = document.createElement("h3");
    postTitle.classList = "post_title";
    postTitle.innerText = title;

    const postDate = document.createElement("p");
    postDate.classList = "post_text";
    postDate.innerText = createdDate;

    postImgBox.appendChild(img);

    postDetailElement.appendChild(postImgBox);
    postDetailElement.appendChild(postTitle);
    postDetailElement.appendChild(postDate);

    postBoxElement.appendChild(postDetailElement);

    return postBoxElement;
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

  static set userInfo({ name, surname, role, username }) {
    const userData = {
      name,
      username,
      surname,
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
