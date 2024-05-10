const getAllMenues = async () => {
    const res = await fetch ('http://localhost:4000/v1/menus')
    const allMenues = await res.json()
    return allMenues
}

const renderMenuesInWrapper = (menues, wrapper, wrapperType) => {
    const menuesFragment = document.createDocumentFragment();

    if (wrapperType == 'mobile') {

        menues.forEach(menu => {
            const menuElem = document.createElement('li')
            menuElem.className = 'mobile-menu__list-item'

            menuElem.insertAdjacentHTML('beforeend', `
                    <div class="mobile-menu__item-wrapper">
                        <a class="mobile-menu__item-link" href="../category/category.html?cat-name=${menu.href}&cat-title=${menu.title}">
                        ${menu.title}
                        </a>
                        ${menu.submenus.length ? '<i class="fas fa-angle-left mobile-menu__item-angle-left"></i>' : ''}
                    </div>

                    ${menu.submenus.length ? `
                        <ul class="mobile-menu__dropdown-list">

                            ${menu.submenus.map( subMenu => `
                            
                                <li class="mobile-menu__dropdown-item">
                                    <a href="../course/course.html?short-name=${subMenu.href}" class="mobile-menu__dropdown-link">${subMenu.title}</a>
                                </li>
                            ` ).join("")}
                        </ul>
                    ` : `
                    
                    `}

            `)
            menuesFragment.appendChild(menuElem)
        })
        wrapper.appendChild(menuesFragment)
        
    }else{

        menues.forEach(menu => {
         
            const menuElem = document.createElement('li')
            menuElem.className = 'menu-item'

            menuElem.insertAdjacentHTML('beforeend', `

                    <a class="menu-link" href="../category/category.html?cat-name=${menu.href}&cat-title=${menu.title}">
                        ${menu.title}
                        ${menu.submenus.length ? `<i class="fas fa-angle-down menu-item-angle-down"></i>` : ``}

                        ${menu.submenus.length ? `
                                    <ul class="menu-item-dropdown-list">
                                    ${menu.submenus.map( subMenu => `

                                    <li class="menu-dropdown-item">
                                        <a href="../course/course.html?short-name=${subMenu.href}" class="menu-dropdown-link">${subMenu.title}</a>
                                    </li>
                                    
                                ` ).join("")}
                                </ul>
                        ` : `
                        
                        `}
                    </a>
            `)
            menuesFragment.appendChild(menuElem)
        })
        wrapper.appendChild(menuesFragment)

    }


}


export {
    getAllMenues,
    renderMenuesInWrapper
}