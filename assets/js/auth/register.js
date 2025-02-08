import { AUTH_REQS } from "../api/auth.js";
import { Loader, Utilities } from "../components/utilities.js";

class Register {
  static getRequestJson() {
    const data = Utilities.getFormValues("registrationForm");
    Loader.button(true);
    AUTH_REQS.register(
      data,
      (response) => {
        Loader.button(false);
        window.location.href = "/check-registration.html";
      },
      () => {
        Loader.button(false);
      }
    );
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("registerBtn").addEventListener("click", (event) => {
    event.preventDefault();
    Register.getRequestJson();
  });
});
