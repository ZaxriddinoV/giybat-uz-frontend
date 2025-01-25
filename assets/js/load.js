import { request } from "./components/request.js";
import { Layouts } from "./layouts.js";
import { Utilities } from "./components/utilities.js";

window["request"] = request;
window["Utilities"] = Utilities;

window.onload = () => {
  Layouts.init();
};