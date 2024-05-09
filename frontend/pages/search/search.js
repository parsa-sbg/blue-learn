import { getAllCourses, renderCourseBoxInWrapper } from "../../services/courses.js";
import { getUrlParam } from "../../shared/utils.js";


window.addEventListener('load', async () => {
    const coursesWrapper = document.querySelector('.courses__courses-wrapper .row')
    const coursesCountElem = document.querySelector('.courses__count')
    const coursesTitle = document.querySelector('.courses__title')
    const coursesSortBox = document.querySelector('.courses__sort-box')


    const searchValue = getUrlParam('search-value')

    const allCourses = await getAllCourses()

    const filteredcourses = allCourses.filter(course => {
        return course.name.toUpperCase().includes(searchValue.toUpperCase())
    })

    if (filteredcourses.length) {
        renderCourseBoxInWrapper(filteredcourses, coursesWrapper, 'normal')
    }else{
        coursesSortBox.style.display = 'none'
        coursesWrapper.innerHTML = '<div style="height: 30rem;" class="alert alert-danger text-center fs-1 d-flex align-items-center justify-content-center">نتیجه ای پیدا نشد</div>'
    }

    coursesCountElem.innerHTML = `${filteredcourses.length} عنوان آموزشی`

    coursesTitle.innerHTML = `نتایج جستجوی ${searchValue} :`

})