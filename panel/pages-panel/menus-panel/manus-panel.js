import {
    getAllMenues,
    addNewMenu,
    deleteMenu
} from "../../../services/menues.js"
import { showQuestionSwal, showTimerSwal } from "../../../shared/utils.js";
let allMenues;

const formSubmitBtn = document.querySelector('.form__btn')



/////////////////////////// show all menus logic ///////////////////////////


const displayMenusInSelectInputAndAllMenus = () => {

    const selectParentWrapper = document.querySelector('#parent')
    selectParentWrapper.innerHTML = '<option class="parent-option" value="">ندارد</option>'

    const allMenusWrapper = document.querySelector('.menus-wrapper')
    allMenusWrapper.innerHTML = ''
    const allMenusFragment = document.createDocumentFragment()

    allMenues.forEach(menu => {
        const submenus = Array.from(menu.submenus)

        // dispaly in input
        selectParentWrapper.insertAdjacentHTML('beforeend', `
            <option class="parent-option" value="${menu._id}">${menu.title}</option>
        `)

        // display in all menus
        const accordionWrapper = document.createElement('div')
        accordionWrapper.className = 'accordion-wrapper'

        accordionWrapper.insertAdjacentHTML('beforeend', `

            <button class="accordion__btn">
                ${menu.title}
                <div class="accordion__btn-left">
                    <div onclick="showSwalAndDeleteMenu('${menu._id}')" class="accordion__panel-item__delbtn">حذف منو</div>
                    <i class="fa fa-angle-down"></i>
                </div>
            </button>

            <div class="accordion__panel">

                ${submenus.length ? `

                    ${submenus.map((submenu, index) => `
                        <div class="accordion__panel-item">
                            <div class="accordion__panel-item__right">
                                <span class="accordion__panel-item__number">${index + 1}</span>
                                <p class="accordion__panel-item__title">${submenu.title}</p>
                            </div>
            
                            <div class="accordion__panel-item__left">
                                <button onclick="showSwalAndDeleteMenu('${submenu._id}')" class="accordion__panel-item__delbtn">حذف منو</button>
                            </div>
                        </div>
                    ` ).join('')}
                    
                
                ` : `

                <div class="accordion__panel-item">
                    <div class="accordion__panel-item__right">
                        <p class="accordion__panel-item__title text-danger">هنوز زیر منویی اضافه نشده</p>
                    </div>
                </div>

                `}

            </div>
        `)

        allMenusFragment.appendChild(accordionWrapper)
    })
    allMenusWrapper.appendChild(allMenusFragment)
}

// handle open accordion panel 

const handleOpenAccordion = () => {
    const accordionBtns = document.querySelectorAll('.accordion__btn')
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.nextElementSibling.classList.toggle('accordion__panel--open')
        })
    })
}

const showSwalAndDeleteMenu = (menuId) => {

    showQuestionSwal('warning', 'آیا از حذف این منو اطمینان دارید؟', 'بله', 'منو مورد نظر با موفقیت حذف شد.',
        async () => {

            // delete submenus
            const mainMenu = allMenues.find(menu => {
                return menu._id == menuId
            })

            if (mainMenu?.submenus.length) {
                mainMenu.submenus.forEach(async subMenu => {
                    await deleteMenu(subMenu._id)
                })
            } else {
                await deleteMenu(menuId)
            }

            allMenues = await getAllMenues()
            displayMenusInSelectInputAndAllMenus()
            handleOpenAccordion()
        })
}


/////////////////////////// events ///////////////////////////

window.showSwalAndDeleteMenu = showSwalAndDeleteMenu
window.addEventListener('load', async () => {
    allMenues = await getAllMenues()
    displayMenusInSelectInputAndAllMenus()
    handleOpenAccordion()

})


/// add new menu logic ///
formSubmitBtn.addEventListener('click', async () => {
    const titleElem = document.querySelector('#name')
    const hrefElem = document.querySelector('#href')
    const parentIdElem = document.querySelector('#parent')

    const response = await addNewMenu(titleElem.value, hrefElem.value.toLowerCase(), parentIdElem.value)
    if (response.res.ok) {
        showTimerSwal('success', 'منو اضافه شد', 'باشه', async () => {

            allMenues = await getAllMenues()

            displayMenusInSelectInputAndAllMenus()
            handleOpenAccordion()
            titleElem.value = ''
            hrefElem.value = ''
            parentIdElem.value = null

        })
    }
})