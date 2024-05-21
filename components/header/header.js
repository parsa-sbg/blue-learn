import {
    addClass,
    removeClass,
    toggleClass,
    logOut
} from "../../shared/utils.js"

import { getUserInfos } from "../../services/auth.js"

const cover = document.querySelector('.cover')
const searchBoxBtn = document.querySelector('.header__search-btn')
const mobileMenu = document.querySelector('.mobile-menu')
let headerUsername


const closeMobileMenu = () => {
    removeClass('mobile-menu--open')
    removeClass('cover--show')
}

const handleSearchBoxLogic = () => {
    const globalSearchDropdown = document.querySelector('.haeder__global-search-dropdown-wrapper')
    const globalSearchInput = document.querySelector('.header__global-search-dropdown-input')
    const dropDownSearchBtn = document.querySelector('.header__search-dropdown-icon')

    const redirectToSearchPage = (input) => {
        const searchValue = input.value.trim()
        location.href = `/pages/search/search.html?search-value=${searchValue}`
    }


    globalSearchInput.addEventListener('keyup', event => {
        if (event.key == "Enter") {
            redirectToSearchPage(globalSearchInput)
        }
    })
    dropDownSearchBtn.addEventListener('click', () => {
        redirectToSearchPage(globalSearchInput)
    })
    searchBoxBtn.addEventListener('click', () => {
        searchBoxBtn.style.zIndex = "10"

        addClass('haeder__global-search-dropdown-wrapper--show', globalSearchDropdown)
        addClass('cover--show', cover)
    })


    // mobile manu search logic
    const mobileGlobalSearchInput = document.querySelector('.mobile-menu__search-box-input')
    const mobileGropDownSearchBtn = document.querySelector('.mobile-menu__search-box-icon')

    mobileGlobalSearchInput.addEventListener('keyup', event => {
        if (event.key == "Enter") {
            redirectToSearchPage(mobileGlobalSearchInput)
        }
    })
    mobileGropDownSearchBtn.addEventListener('click', () => {
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
        toggleClass('mobile-menu--open', mobileMenu)
        toggleClass('cover--show', cover)
    })

    menuCloseBtn.addEventListener('click', () => {
        closeMobileMenu()
    })
}

const getAndShowUserNameInHeader = async () => {
    const headerLeft = document.querySelector('.header__left')
    const userInfos = await getUserInfos()
    console.log(userInfos);

    const panelLinks = document.querySelectorAll('.panel-link')

    // when user loged in
    if (userInfos) {

        headerLeft.insertAdjacentHTML('beforeend',`
            <div class="header__username">
                <i class="header__username-icon fa fa-user"></i>
                <div class="header__username-dropdown">
                    <div class="header__username-dropdown-head">
                        <span class="header__username-dropdown-name">${userInfos.data.name}</span>
                    </div>

                    <div class="header__username-dropdown-links">
                        <a href="/account/pages/usercourses/usercourses.html" class="header__username-dropdown-item">
                            <i class="header__username-dropdown-item-icon far fa-folder-open"></i>
                            <span class="header__username-dropdown-item-text">دوره های من</span>
                        </a>
                        <a href="/account/pages/accountdetails/accountdetails.html" class="header__username-dropdown-item">
                            <i class="header__username-dropdown-item-icon far fa-folder-open"></i>
                            <span class="header__username-dropdown-item-text">جزییات حساب</span>
                        </a>
                    </div>

                    <button onclick="logOut()" class="header__username-dropdown-logout">
                        <i class="header__username-dropdown-logout-icon fas fa-power-off"></i>
                        <span class="header__username-dropdown-logout-text">خروج</span>
                    </button>

                </div>
            </div>
        `)

        const headerUsernameDropdown = document.querySelector('.header__username-dropdown')
        headerUsername = document.querySelector('.header__username')


        headerUsername.addEventListener('click', () => {
            headerUsername.style.zIndex = "10"
            addClass('header__username-dropdown--show', headerUsernameDropdown)
            addClass('cover--show', cover)
            
        })



        // show panel link when the user is admin
        if (userInfos.data.role == 'ADMIN') {
            panelLinks.forEach(panelLink => {
                addClass('panel-link--show', panelLink)
            })
        }

    // when user not loged in
    } else {
        console.log('not login');
        headerLeft.insertAdjacentHTML('beforeend',`
            <a class="header__username" href="/pages/login/login.html">ورود/ثبت نام</a>
        `)
        headerUsername = document.querySelector('.header__username')
    }

}

const handleDarkMode = () => {
    const changeThemeBtns = [document.querySelector('.header__theme-btn'), document.querySelector('.mobile__theme-btn')]
    const theme = localStorage.getItem('bluelearn-darkmode')

    const changeToDark = () => {
        changeThemeBtns.forEach(btn => {
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

    if (theme == 'true') {
        changeToDark()
    } else {
        changeToLight()
    }

    changeThemeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.className.includes('header__theme-btn--dark')) {
                changeToLight()
            } else {
                changeToDark()
            }

        })
    })
}

cover.addEventListener('click', () => {
    searchBoxBtn.style.zIndex = "0"
    headerUsername.style.zIndex = "0"
    removeClass('haeder__global-search-dropdown-wrapper--show')
    closeMobileMenu()
    removeClass('header__username-dropdown--show')
})

window.logOut = logOut


export {
    handleSearchBoxLogic,
    handleOpenMobileMenu,
    getAndShowUserNameInHeader,
    handleDarkMode,
    closeMobileMenu
}