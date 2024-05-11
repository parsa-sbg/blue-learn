import {
    handleOpenMobileMenu,
    getAndShowUserNameInHeader,
    handleDarkMode,
    closeMobileMenu
} from "../../components/header/header.js"

const cover = document.querySelector('.cover')


window.addEventListener('load', async () => {


    // header logics
    handleDarkMode()
    getAndShowUserNameInHeader()
    handleOpenMobileMenu()
    cover.addEventListener('click', () => {
        closeMobileMenu()
    })
})