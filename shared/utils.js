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

const showQuestionSwal = (icon, title, confirmButtonText, secondTitle , callback) => {
    Swal.fire({
        title: title,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'نه'
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: secondTitle,
            icon: "success"
          }).then(callback());
        }
      });
}

const getUserToken = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    return userToken ? userToken : null;
};

const getUrlParam = key => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
};

export {
    addClass,
    removeClass,
    toggleClass,
    showTimerSwal,
    getUserToken,
    getUrlParam,
    showQuestionSwal
}