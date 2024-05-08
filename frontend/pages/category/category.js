import { getCagegoryCourses , renderCourseBoxInWrapper } from "../../services/courses.js";
import { getUrlParam } from "../../shared/utils.js";

const coursesWrapper = document.querySelector('.courses__courses-wrapper .row')

window.addEventListener('load', async () => {
    const courseShortName = getUrlParam('cat-name')
    const categoryTitle = getUrlParam('cat-title')
    
    const coursesResponse = await getCagegoryCourses(courseShortName)
    const coursesData = coursesResponse.data
    const coursesSortBox = document.querySelector('.courses__sort-box')

    const categoryTitleElem = document.querySelector('.courses__title')

    const coursesCountElem = document.querySelector('.courses__count')

    console.log(coursesData);

    categoryTitleElem.innerHTML = `دوره های ${categoryTitle}`
    coursesCountElem.innerHTML = `${coursesData.length} عنوان آموزشی`



    if (coursesData.length) {
        renderCourseBoxInWrapper(coursesData, coursesWrapper, 'normal')
    }else{
        coursesSortBox.style.display = 'none'
        coursesWrapper.innerHTML = '<div style="height: 30rem;" class="alert alert-danger text-center fs-1 d-flex align-items-center justify-content-center">هنوز دوره ای برای این دسته بندی منتشر نشده</div>'
    }
})