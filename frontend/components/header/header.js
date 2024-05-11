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

const handleSearchBoxLogic = () => {
    const globalSearchDropdown = document.querySelector('.haeder__global-search-dropdown-wrapper')
    const globalSearchInput = document.querySelector('.header__global-search-dropdown-input')
    const dropDownSearchBtn = document.querySelector('.header__search-dropdown-icon')

    const redirectToSearchPage = (input) => {
        const searchValue = input.value.trim()
        location.href = `../search/search.html?search-value=${searchValue}`
    }


    globalSearchInput.addEventListener('keyup', event => {
        if (event.key == "Enter") {
            redirectToSearchPage(globalSearchInput)
        }
    })
    dropDownSearchBtn.addEventListener('click',() => {
        redirectToSearchPage(globalSearchInput)
    })
    searchBoxBtn.addEventListener('click', () => {
        searchBoxBtn.style.zIndex = "10"
        addClass('haeder__global-search-dropdown-wrapper--show',globalSearchDropdown)
        addClass('cover--show', cover)
    })
    cover.addEventListener('click', () => {
        removeClass('haeder__global-search-dropdown-wrapper--show',globalSearchDropdown)
        closeMobileMenu()
    })

    // mobile manu search logic
    const mobileGlobalSearchInput = document.querySelector('.mobile-menu__search-box-input')
    const mobileGropDownSearchBtn = document.querySelector('.mobile-menu__search-box-icon')

    mobileGlobalSearchInput.addEventListener('keyup', event => {
        if (event.key == "Enter") {
            redirectToSearchPage(mobileGlobalSearchInput)
        }
    })
    mobileGropDownSearchBtn.addEventListener('click',() => {
        redirectToSearchPage(mobileGlobalSearchInput)
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

const handleDarkMode = () => {
    const changeThemeBtns = [document.querySelector('.header__theme-btn'),document.querySelector('.mobile__theme-btn')]
    const theme = localStorage.getItem('bluelearn-darkmode')

    const changeToDark = () => {
        changeThemeBtns.forEach(btn=> {
            btn.innerHTML = '<i class="fa fa-moon header__theme-btn-icon"></i>'
            localStorage.setItem('bluelearn-darkmode', true)
            addClass('header__theme-btn--dark', btn)
    
            document.documentElement.classList.add('dark')
        })

    }
    const changeToLight = () => {
        changeThemeBtns.forEach(btn => {
            btn.innerHTML = '<i class="fa fa-sun header__theme-btn-icon"></i>'
            localStorage.setItem('bluelearn-darkmode', false)
            removeClass('header__theme-btn--dark', btn)
            document.documentElement.classList.remove('dark')
        })

    }

    if(theme == 'true'){
        changeToDark()
    }else{
        changeToLight()
    }

    changeThemeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.className.includes('header__theme-btn--dark')) {
                changeToLight()
            }else{
                changeToDark()
            }
            
        })
    })
}


export {
    handleSearchBoxLogic,
    handleOpenMobileMenu,
    getAndShowUserNameInHeader,
    handleDarkMode,
    closeMobileMenu
}