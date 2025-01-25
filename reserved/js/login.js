function login() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    const errorMSGElement = document.getElementById("error-msg");

    fetch(`${Config.baseUrl}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            username, password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("jwtToken", data?.jwtToken);
            localStorage.setItem("userDetail", JSON.stringify(data));
            errorMSGElement.innerText = "";
            errorMSGElement.style.display = "none";
            window.location.href = "index.html"
        })
        .catch(error => {
            console.log(error);
            errorMSGElement.innerText = error
            errorMSGElement.style.display = "block";
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userDetail");
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("jwtToken");
    if (token) window.location.href = "index.html";
})