import { getAllCatrgories } from "../../../services/categories.js";

let allCategories



const renderAllCategoriesInTable = async () => {
    allCategories = await getAllCatrgories()

    const tableBody = document.querySelector('.category-table-body')
    tableBody.innerHTML = `
        <tr>
            <th class="category-table__header"></th>
            <th class="category-table__header">نام</th>
            <th class="category-table__header">آدرس</th>
            <th class="category-table__header">حذف</th>
        </tr>
    `

    allCategories.forEach((category, index) => {
        tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="category-table__item category-table__item-number">${index +1}</td>
                <td class="category-table__item">${category.title}</td>
                <td class="category-table__item">${category.name}</td>
                <td class="category-table__delete-btn"><button>حذف</button></td>
            </tr>
        `)
    })
}


// events 


window.addEventListener('load', async () => {
    
    console.log('loaded');
    renderAllCategoriesInTable()
})