class Config {
    static get token() {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("token mavjud emas!")
        return token
    }

    static get userInfo() {
        const userInfo = localStorage.getItem("userDetail");
        if (!userInfo) throw new Error("userInfo mavjud emas!");
        return JSON.parse(userInfo);
    }

    static get baseUrl() {
        return "http://localhost:8080"
    }
}

/**
 * {string} method - bunda request turi (PATCH,PUT,GET,DELETE,POST)
 *  body - PUT,PATCH yoki POST da body
 * {function} onSuccess - response
 * {function} onError - errorlarni olish uchun
 * {string} url - entity url
 * */
const request = Object.freeze({
    GET({
            onSuccess,
            onError,
            url
        }) {
        fetch(Config.baseUrl + url, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${Config.token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                onSuccess(data)
            })
            .catch(error => {
                onError(error)
            });
    },
    POST({
             onSuccess,
             onError,
             url,
             body,
         }) {
        fetch(Config.baseUrl + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${Config.token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                onSuccess(data)
            })
            .catch(error => {
                onError(error)
            });
    },
    PUT() {

    },
    DELETE() {

    },
    PATCH() {

    },
})