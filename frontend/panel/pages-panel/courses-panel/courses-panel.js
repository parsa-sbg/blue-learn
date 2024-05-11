import { showTimerSwal } from "../../../shared/utils.js";
import { getAllCatrgories } from "../../../services/categories.js";
import { createNewCourse } from "../../../services/courses.js";

const createCourseBtn = document.querySelector('.addcourse-form__btn')

const categoryWrapper = document.querySelector('#category')

const newCourseFileInput = document.querySelector('#cover')
let cover = null 
    

//// create new course logic ////

// preper categories list
const allCatrgories = await getAllCatrgories()
allCatrgories.forEach(category => {
    categoryWrapper.insertAdjacentHTML('beforeend', `
        <option class="category-option" value="${category._id}">${category.title}</option>
    `)
})

createCourseBtn.addEventListener('click', async event => {
    event.preventDefault()

    const newCourseName = document.querySelector('#name').value
    const newCourseDescrioption = document.querySelector('#desc').value
    const newCourseShortName = document.querySelector('#shortname').value
    const newCoursePrice = document.querySelector('#price').value
    const newCourseCategoryId = document.querySelector('#category').value
    const newCourseSupport = document.querySelector('#support').value

    const response = await createNewCourse(
        newCourseName,
        newCourseDescrioption,
        cover,
        newCourseShortName,
        newCoursePrice,
        newCourseCategoryId,
        newCourseSupport,
    )
    console.log(response);
})

// save cover file in variable
newCourseFileInput.addEventListener('change', event => {
    cover = event.target.files[0]
})