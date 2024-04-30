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

export { addClass , removeClass, toggleClass }