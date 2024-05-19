import { addClass , removeClass }from "../../shared/utils.js"
import { getUserInfos } from "../../services/auth.js"


// handle dark mode
{
    const changeThemeBtns = document.querySelector('.theme-btn')
    const theme = localStorage.getItem('bluelearn-darkmode')

    console.log(changeThemeBtns);
    const changeToDark = () => {
            changeThemeBtns.innerHTML = '<i class="fa fa-moon theme-btn-icon"></i>'
            localStorage.setItem('bluelearn-darkmode', true)
            addClass('theme-btn--dark', changeThemeBtns)

            addClass('dark', document.documentElement)

    }
    const changeToLight = () => {

            changeThemeBtns.innerHTML = '<i class="fa fa-sun theme-btn-icon"></i>'
            localStorage.setItem('bluelearn-darkmode', false)
            removeClass('theme-btn--dark', changeThemeBtns)

            removeClass('dark', document.documentElement)

    }

    if (theme == 'true') {
        changeToDark()
    } else {
        changeToLight()
    }


        changeThemeBtns.addEventListener('click', () => {
            if (changeThemeBtns.className.includes('theme-btn--dark')) {
                changeToLight()
            } else {
                changeToDark()
            }

        })

}


// handle open mobile menu

{
    const toggleMenuBtn = document.querySelector('.mobile-toggle-btn ')
    const menu = document.querySelector('.account-menu')
    const cover = document.querySelector('.cover')

    toggleMenuBtn.addEventListener('click', () => {
        addClass('account-menu--open', menu)
        addClass('cover--show', cover)
    })

    cover.addEventListener('click', () => {
        removeClass('cover--show', cover)
        removeClass('account-menu--open', menu)
    })
}

// show user name in welcome text
const contentWelcomeText = document.querySelector('.account-content__welcome')
const userInfos = await getUserInfos()
contentWelcomeText.innerHTML = `${userInfos.data.name} عزیز؛ خوش اومدی 🙌`