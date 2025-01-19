document.addEventListener("DOMContentLoaded", () => {
    request.GET({
        url: `/api/post/${1}`,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
})