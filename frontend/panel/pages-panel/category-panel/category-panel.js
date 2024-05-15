import { getAllCatrgories , deleteCategory} from "../../../services/categories.js";
import { showQuestionSwal } from "../../../shared/utils.js";

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
                <td onclick="showSwalAndDeleteCategory('${category._id}')" class="category-table__delete-btn"><button>حذف</button></td>
            </tr>
        `)
    })
}

const showSwalAndDeleteCategory = (categoryId) => {
    showQuestionSwal('warning', 'آیا از حذف این دسته بندی اطمینان دارید؟', 'بله' , 'دسته بندی مورد نظر با موفقیت حذف شد.',
        async () => {
            await deleteCategory(categoryId)
            renderAllCategoriesInTable()
        }
    )
}

// events 


window.showSwalAndDeleteCategory = showSwalAndDeleteCategory
window.addEventListener('load', async () => {
    
    console.log('loaded');
    renderAllCategoriesInTable()
})