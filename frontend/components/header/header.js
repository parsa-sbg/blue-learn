import {
    addClass,
    removeClass,
    toggleClass,
    getUserToken
} from "../../shared/utils.js"

import { getUserInfos } from "../../services/auth.js"

const cover = document.querySelector('.cover')
const searchBoxBtn = document.querySelector('.header__search-btn')
const mobileMenu = document.querySelector('.mobile-menu')

const headerUsername = document.querySelector('.header__username')

const closeMobileMenu = () => {
    removeClass('mobile-menu--open', mobileMenu)
    removeClass('cover--show', cover)
}

const handleSearchBoxShow = () => {
    const globalSearchDropdown = document.querySelector('.haeder__global-search-dropdown-wrapper')


    searchBoxBtn.addEventListener('click', () => {
        searchBoxBtn.style.zIndex = "10"
        addClass('haeder__global-search-dropdown-wrapper--show',globalSearchDropdown)
        addClass('cover--show', cover)
    })
    cover.addEventListener('click', () => {
        removeClass('haeder__global-search-dropdown-wrapper--show',globalSearchDropdown)
        closeMobileMenu()
    })
}

const handleOpenMobileMenu = () => {
    const mobileMenuItems = document.querySelectorAll('.mobile-menu__list-item')
    const cover = document.querySelector('.cover')
    const mobileToggleBtn = document.querySelector('.header__mobile-toggle-btn')
    const menuCloseBtn = document.querySelector('.mobile-menu__close-btn')


    mobileMenuItems.forEach(mobileMenu => {
        mobileMenu.addEventListener('click', () => {
            if (mobileMenu.firstChild.nextElementSibling.lastElementChild.tagName == 'svg') {
                toggleClass('mobile-menu__dropdown-list--open', mobileMenu.lastChild.previousElementSibling)
                toggleClass('mobile-menu__item-angle-left--open', mobileMenu.firstChild.nextElementSibling.lastElementChild)
            }

        })
    })

    mobileToggleBtn.addEventListener('click', () => {
        searchBoxBtn.style.zIndex = "0"
        toggleClass('mobile-menu--open', mobileMenu)
        toggleClass('cover--show', cover)
    })

    menuCloseBtn.addEventListener('click', () => {
        closeMobileMenu()
    })
}

const getAndShowUserNameInHeader = async () => {
    const userToken = getUserToken()
    const userInfos = await getUserInfos(userToken)

    if(userToken){
        headerUsername.setAttribute('href', '#')
        headerUsername.innerHTML = userInfos.data.name + '<i class="header__username-icon fa fa-user"></i>'
    }else{
        headerUsername.setAttribute('href', '../login/login.html')
        headerUsername.innerHTML = 'ورود/ثبت نام'
    }
}
export { handleSearchBoxShow , handleOpenMobileMenu, getAndShowUserNameInHeader}