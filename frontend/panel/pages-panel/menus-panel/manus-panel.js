import { getAllMenues } from "../../../services/menues.js"
let allMenues;


/////////////////////////// add new menu logic ///////////////////////////




/////////////////////////// show all menus logic ///////////////////////////


const displayMenusInSelectInputAndAllMenus = () => {
    const selectParentWrapper = document.querySelector('#parent')
    selectParentWrapper.innerHTML = '<option class="parent-option" value="null">ندارد</option>'

    const allMenusWrapper = document.querySelector('.menus-wrapper')
    allMenusWrapper.innerHTML = ''
    const allMenusFragment = document.createDocumentFragment()

    allMenues.forEach(menu => {
        console.log(menu);
        const submenus = Array.from(menu.submenus)
        console.log(submenus);

        // dispaly in input
        selectParentWrapper.insertAdjacentHTML('beforeend', `
            <option class="parent-option" value="${menu._id}">${menu.title}</option>
        `)

        // display in all menus
        const accordionWrapper = document.createElement('div')
        accordionWrapper.className = 'accordion-wrapper'
        
        accordionWrapper.insertAdjacentHTML('beforeend',`

            <button class="accordion__btn">
                ${menu.title}
                <div class="accordion__btn-left">
                    <div class="accordion__panel-item__delbtn">حذف منو</div>
                    <i class="fa fa-angle-down"></i>
                </div>
            </button>

            <div class="accordion__panel">

                ${submenus.length ? `

                    ${submenus.map((submenu, index)=> `
                        <div class="accordion__panel-item">
                            <div class="accordion__panel-item__right">
                                <span class="accordion__panel-item__number">${index+1}</span>
                                <p class="accordion__panel-item__title">${submenu.title}</p>
                            </div>
            
                            <div class="accordion__panel-item__left">
                                <button class="accordion__panel-item__delbtn">حذف منو</button>
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




/////////////////////////// events ///////////////////////////

window.addEventListener('load', async () => {
    allMenues = await getAllMenues()
    displayMenusInSelectInputAndAllMenus()

    // handle open accordion panel 
    const accordionBtns = document.querySelectorAll('.accordion__btn')
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.nextElementSibling.classList.toggle('accordion__panel--open')
        })
    })
})