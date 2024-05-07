const removeClass = (className) => {
    if (document.querySelector('.'+ className))
     {
        document.querySelector('.'+ className).classList.remove(className)
    }
}

const toggleClass = (className, element) => {
    element.classList.toggle(className)
}

const addClass = (className, element) => {
    element.classList.add(className)
}

const showTimerSwal = (icon, title, confirmButtonText, callback) => {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon,
        title,
        confirmButtonText
      }).then(()=> {
        callback()
      });

}

const getUserToken = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    return userToken ? userToken : null;
};

export {
    addClass,
    removeClass,
    toggleClass,
    showTimerSwal,
    getUserToken
}