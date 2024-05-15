import {
    handleSearchBoxLogic,
    handleOpenMobileMenu,
    getAndShowUserNameInHeader,
    handleDarkMode
} from "../components/header/header.js";
handleDarkMode()
import {
    getAllMenues,
    renderMenuesInWrapper
} from "../services/menues.js";

const menu = document.querySelector('.menu')
const mobileMenu = document.querySelector('.mobile-menu__list')
const logos = [document.querySelector('.header__logo-wrapper'), document.querySelector('.mobile-menu__logo-wrapper')]


window.addEventListener('load', async () => {

    

    const allMenues = await getAllMenues()
    console.log(allMenues);


    // handle dynamization menues in mobile menu
    renderMenuesInWrapper(allMenues, mobileMenu, 'mobile')

    // handle dynamization menues in desktop menu
    renderMenuesInWrapper(allMenues, menu, 'desktop')



    getAndShowUserNameInHeader()

    handleSearchBoxLogic()
    handleOpenMobileMenu()

    logos.forEach(logo => {
        logo.addEventListener('click', () => {
            location.href = '../../index.html'
        })
    })

})
