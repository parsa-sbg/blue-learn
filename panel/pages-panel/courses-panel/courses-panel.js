import { showTimerSwal, showQuestionSwal, getUserToken } from "../../../shared/utils.js";
import { getAllCatrgories } from "../../../services/categories.js";
import { createNewCourse, getAllCourses, deleteCourse, getCourseData, deleteSession } from "../../../services/courses.js";
import { createLoader } from "../../../shared/loader.js";
const loader = createLoader('در حال آپلود ...')

const createCourseBtn = document.querySelector('.form__btn')
const categoryWrapper = document.querySelector('#category')
const newCourseFileInput = document.querySelector('#cover')
const allCatrgories = await getAllCatrgories()
let cover = null

const coursesTableBody = document.querySelector('.courses-table-body')


const getAndShowAllCourses = async () => {
    const allCourses = await getAllCourses()
    const coursesFragment = document.createDocumentFragment()


    coursesTableBody.innerHTML = ''
    coursesTableBody.insertAdjacentHTML('beforeend', `
                    <tr>
                        <th></th>
                        <th class="courses-table__header">نام دوره</th>
                        <th class="courses-table__header">آدرس</th>
                        <th class="courses-table__header">حذف</th>
                    </tr>
    `)
    allCourses.forEach((course, index) => {
        const tr = document.createElement('tr')
        tr.insertAdjacentHTML('afterbegin', `
            <td class="courses-table__item courses-table__item-number">${index + 1}</td>
            <td class="courses-table__item">${course.name}</td>
            <td class="courses-table__item courses-table__item-price">${course.shortName}</td>
            <td class="courses-table__delete-btn"><button onclick="showSwalAndDeleteCourse('${course._id}','${course.name}','${course.shortName}')">حذف</button></td>
        `)
        coursesFragment.appendChild(tr)
    })
    coursesTableBody.appendChild(coursesFragment)
}

const showSwalAndDeleteCourse = (courseId, courseName, courseShortName) => {
    showQuestionSwal('warning', `آیا از حذف دوره ${courseName} اطمینان دارید؟`, 'بله', 'حذف شد',
        async () => {
            // delete course sessions 
            const courseData = await getCourseData(courseShortName, getUserToken())
            if (courseData.data.sessions) {
                courseData.data.sessions.forEach(async session => {
                    const res = await deleteSession(session._id)
                })
            }

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

    loader.show()

    const newCourseName = document.querySelector('#name')
    const newCourseDescrioption = document.querySelector('#desc')
    const newCourseShortName = document.querySelector('#shortname')
    const newCoursePrice = document.querySelector('#price')
    const newCourseCategoryId = document.querySelector('#category')
    const newCourseSupport = document.querySelector('#support')

    const response = await createNewCourse(
        newCourseName.value,
        newCourseDescrioption.value,
        cover,
        newCourseShortName.value,
        newCoursePrice.value,
        newCourseCategoryId.value,
        newCourseSupport.value,
    )

    loader.hide()
    if (response.res.ok) {
        getAndShowAllCourses()
        showTimerSwal('success', 'دوره با موفقیت اضافه شد', 'فهمیدم', () => {
        })
        newCourseName.value = null
        newCourseDescrioption.value = null
        newCourseShortName.value = null
        newCoursePrice.value = null
        newCourseCategoryId.value = null
        newCourseSupport.value = null
        cover = null
    } else {
        showTimerSwal('error', response.data.message[0].message, 'فهمیدم', () => { })
    }
})

// save cover file in variable
newCourseFileInput.addEventListener('change', event => {
    cover = event.target.files[0]
})

//// show all courses ////
getAndShowAllCourses()
