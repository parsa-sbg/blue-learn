import { getAllCourses, renderCourseBoxInWrapper } from "../../services/courses.js";
import { getUrlParam } from "../../shared/utils.js";


window.addEventListener('load', async () => {
    const coursesWrapper = document.querySelector('.courses__courses-wrapper .row')
    const coursesCountElem = document.querySelector('.courses__count')
    const coursesTitle = document.querySelector('.courses__title')

    const searchValue = getUrlParam('search-value')

    const allCourses = await getAllCourses()

    const filteredcourses = allCourses.filter(course => {
        return course.name.toUpperCase().includes(searchValue.toUpperCase())
    })

    renderCourseBoxInWrapper(filteredcourses, coursesWrapper, 'normal')
    coursesCountElem.innerHTML = `${filteredcourses.length} عنوان آموزشی`

    coursesTitle.innerHTML = `نتایج جستجوی ${searchValue} :`

})