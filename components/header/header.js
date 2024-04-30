import { addClass, removeClass, toggleClass } from "../../shared/utils.js"

const handleSearchBoxShow = () => {
    const searchBoxBtn = document.querySelector('.header__search-btn')
    const globalSearchDropdown = document.querySelector('.haeder__global-search-dropdown-wrapper')
    const cover = document.querySelector('.cover')


    searchBoxBtn.addEventListener('click', () => {
        addClass('haeder__global-search-dropdown-wrapper--show',globalSearchDropdown)
        addClass('cover--show', cover)
    })
    cover.addEventListener('click', () => {
        toggleClass('haeder__global-search-dropdown-wrapper--show',globalSearchDropdown)
        toggleClass('cover--show', cover)
    })
}

const handleOpenMobileMenu = () => {
    const toggleBtn = document.querySelector('.header__mobile-toggle-btn')

    toggleBtn.addEventListener('click', () => {
        toggleClass('toggle-icon--open', toggleBtn)
    })
}

export { handleSearchBoxShow , handleOpenMobileMenu}