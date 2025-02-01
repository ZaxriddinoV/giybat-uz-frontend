import { User } from "./components/utilities.js";

// function toggleLanguageDropdown() {
//   const dropdownContent = document.getElementById("dropdown-content");
//   const dropdownToggle = document.querySelector(".dropdown_toggle");

//   dropdownContent.classList.toggle("show");
//   dropdownToggle.classList.toggle("active");
// }

// function setSelectedLanguage(lang) {
//   document.getElementById("current-lang").textContent = lang;
//   toggleLanguageDropdown();
// }

// window.onclick = function (event) {
//   if (!event.target.closest(".dropdown_toggle")) {
//     const dropdownContent = document.getElementById("dropdown-content");
//     const dropdownToggle = document.querySelector(".dropdown_toggle");

//     if (dropdownContent.classList.contains("show")) {
//       dropdownContent.classList.remove("show");
//       dropdownToggle.classList.remove("active");
//     }
//   }
// };

function createButton() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList = "header_btn header-create-btn";

  const iconSpan = document.createElement("span");
  iconSpan.classList = "icon user-icon";

  iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M444-288h72v-156h156v-72H516v-156h-72v156H288v72h156v156Zm36.28 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>`;
  btn.appendChild(iconSpan);

  const btnText = document.createElement("span");
  btnText.innerText = "Yaratish";

  btn.appendChild(btnText);

  btn.onclick = () => (window.location.href = "./post-create.html");

  return btn;
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".header_entrance__toggle");
  const menu = document.querySelector(".header_entrance__menu");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("header_entrance__show");
  });

  document.addEventListener("click", (e) => {
    if (!toggleButton.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("header_entrance__show");
    }
  });

  const userDetailStr = User.userInfo;
  if (userDetailStr === null || userDetailStr === undefined) {
    return;
  }

  const userDetail = userDetailStr;

  const createBtn = document.getElementById("create-btn");
  createBtn.innerHTML = "";
  if (userDetail.role === "ROLE_USER") {
    createBtn.appendChild(createButton());
  } else createBtn.innerHTML = "";

  const userName = userDetail.name;

  const loginBtn = document.getElementById("header_btn");
  loginBtn.style.display = "none";
  const menuUserDetailWrapper = document.getElementById("header_entrance");
  menuUserDetailWrapper.style.display = "block";

  const headerUserNameSpan = document.getElementById("header_user_name_id");
  headerUserNameSpan.textContent = userName;
});

document.querySelector("#logout").onclick = () => {
  const loginBtn = document.getElementById("header_btn");
  loginBtn.style.display = "block";

  const menuUserDetailWrapper = document.getElementById("header_entrance");
  menuUserDetailWrapper.style.display = "none";

  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");

  window.location.href = "./index.html";
};
