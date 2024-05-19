import {
    handleOpenMobileMenu,
    handleDarkMode,
    closeMobileMenu
} from "../../components/header/header.js"

import { routeProtection } from "../../services/auth.js"

const cover = document.querySelector('.cover')


window.addEventListener('load', async () => {

    // rout protection
    routeProtection()


    // header logics
    handleDarkMode()
    handleOpenMobileMenu()
    cover.addEventListener('click', () => {
        closeMobileMenu()
    })
})