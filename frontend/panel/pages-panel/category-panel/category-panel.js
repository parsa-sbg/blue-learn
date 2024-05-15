import { getAllCatrgories , deleteCategory , addNewCategory} from "../../../services/categories.js";
import { showQuestionSwal, showTimerSwal } from "../../../shared/utils.js";

let allCategories

const submitBtn = document.querySelector('.form__btn')


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

const validateAndAddNewCat = async (title, name) => {
    const response = await addNewCategory(title, name)

    console.log(response);

    if(response.res.ok){
        showTimerSwal('success', 'دسته بندی جدید با موفقیت اضافه شد.', 'باشه', () => {})
        renderAllCategoriesInTable()
        document.querySelector('#name').value = ''
        document.querySelector('#href').value = ''
    }else{

        if(response.data.message[0].name == 'title'){
            showTimerSwal('warning', 'نام دسته بندی الزامی است!', 'باشه', () => {})
        }else if (response.data.message[0].name == 'name') {
            showTimerSwal('warning', 'آدرس دسته بندی الزامی است!', 'باشه', () => {})
        }

    }
}



// events 

submitBtn.addEventListener('click', () => {
    const titleValue = document.querySelector('#name').value
    const hrefValue = document.querySelector('#href').value

    validateAndAddNewCat(titleValue, hrefValue)
    
})


window.showSwalAndDeleteCategory = showSwalAndDeleteCategory
window.validateAndAddNewCat = validateAndAddNewCat
window.addEventListener('load', async () => {
    
    renderAllCategoriesInTable()
})