import { AUTH_REQS } from "../api/auth.js";
import { Loader, Toast, User, Utilities } from "../components/utilities.js";
import { Layouts } from "../layouts.js";

class Login {
  static getRequestJson() {
    const data = Utilities.getFormValues("loginForm");
    Loader.button(true);
    AUTH_REQS.login(
      data,
      (response) => {
        Toast.successToast("Muvaffaqiyatli kirdingiz!");
        User.token = response?.data?.jwtToken;
        User.userInfo = response?.data;
        Loader.button(false);
        window.location.href = "/index.html";
      },
      () => {
        Loader.button(false);
      }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Layouts.init();
  document.getElementById("loginBtn").addEventListener("click", (event) => {
    event.preventDefault();
    Login.getRequestJson();
  });
});
