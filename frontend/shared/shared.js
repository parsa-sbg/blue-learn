import {
    handleSearchBoxShow,
     handleOpenMobileMenu
} from "../components/header/header.js";

import {
    getAllMenues,
    renderMenuesInWrapper
} from "../services/menues.js";

const menu = document.querySelector('.menu')
const mobileMenu = document.querySelector('.mobile-menu__list')


window.addEventListener('load', async () => {

    const allMenues = await getAllMenues()
    // handle dynamization menues in mobile menu
    renderMenuesInWrapper(allMenues, mobileMenu, 'mobile')

    // handle dynamization menues in desktop menu
    renderMenuesInWrapper(allMenues, menu, 'desktop')

    handleSearchBoxShow()
    handleOpenMobileMenu()
})
