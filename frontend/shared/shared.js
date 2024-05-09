import {
    handleSearchBoxLogic,
    handleOpenMobileMenu,
    getAndShowUserNameInHeader
} from "../components/header/header.js";

import {
    getAllMenues,
    renderMenuesInWrapper
} from "../services/menues.js";

const menu = document.querySelector('.menu')
const mobileMenu = document.querySelector('.mobile-menu__list')
const headerLogo = document.querySelector('.header__logo')

window.addEventListener('load', async () => {

    const allMenues = await getAllMenues()
    // handle dynamization menues in mobile menu
    renderMenuesInWrapper(allMenues, mobileMenu, 'mobile')

    // handle dynamization menues in desktop menu
    renderMenuesInWrapper(allMenues, menu, 'desktop')

    getAndShowUserNameInHeader()

    handleSearchBoxLogic()
    handleOpenMobileMenu()

    headerLogo.addEventListener('click', () => {
        location.href = '../home/'
    })
})
