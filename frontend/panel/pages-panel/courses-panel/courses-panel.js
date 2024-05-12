import { showTimerSwal , showQuestionSwal } from "../../../shared/utils.js";
import { getAllCatrgories } from "../../../services/categories.js";
import { createNewCourse, getAllCourses , deleteCourse} from "../../../services/courses.js";

const createCourseBtn = document.querySelector('.addcourse-form__btn')
const categoryWrapper = document.querySelector('#category')
const newCourseFileInput = document.querySelector('#cover')
const allCatrgories = await getAllCatrgories()
let cover = null 

const  coursesTableBody = document.querySelector('.courses-table-body')


const getAndShowAllCourses = async () => {
    const allCourses = await getAllCourses()
    const coursesFragment = document.createDocumentFragment()


    coursesTableBody.innerHTML = ''
    allCourses.forEach((course, index) => {
        console.log(course);
        const tr = document.createElement('tr')
        tr.insertAdjacentHTML('afterbegin', `
            <td class="courses-table__item courses-table__item-number">${index +1 }</td>
            <td class="courses-table__item">${course.name}</td>
            <td class="courses-table__item courses-table__item-price">${course.price ? course.price : 'رایگان'}</td>
            <td class="courses-table__delete-btn"><button onclick="showSwalAndDeleteCourse('${course._id}','${course.name}')">حذف</button></td>
        `)
        coursesFragment.appendChild(tr)
    })
    console.log('body');
    coursesTableBody.appendChild(coursesFragment)
}
    
const showSwalAndDeleteCourse = (courseId , courseName) => {
    console.log(courseId);
    showQuestionSwal('warning', `آیا از حذف دوره ${courseName} اطمینان دارید؟`, 'بله', 'حذف شد',
        async () => {
            await deleteCourse(courseId)
            getAndShowAllCourses()
        }
    )
}


window.showSwalAndDeleteCourse = showSwalAndDeleteCourse

//// create new course logic ////

// preper categories list
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
    if (!response.res.ok) {
        showTimerSwal('error', response.data.message[0].message, 'فهمیدم', () => {})
    }
})

// save cover file in variable
newCourseFileInput.addEventListener('change', event => {
    cover = event.target.files[0]
})

//// show all courses ////
getAndShowAllCourses()
