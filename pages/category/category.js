import { getCagegoryCourses , renderCourseBoxInWrapper } from "../../services/courses.js";
import { getUrlParam , addClass , removeClass } from "../../shared/utils.js";
import { sort, filterBySearchValue } from "../../services/sort-filter.js";

const coursesWrapper = document.querySelector('.courses__courses-wrapper .row')

window.addEventListener('load', async () => {
    const courseShortName = getUrlParam('cat-name')
    const categoryTitle = getUrlParam('cat-title')
    const coursesResponse = await getCagegoryCourses(courseShortName)
    const coursesData = coursesResponse.data
    const coursesSortBox = document.querySelector('.courses__sort-box')
    const categoryTitleElem = document.querySelector('.courses__title')
    const coursesCountElem = document.querySelector('.courses__count')


    categoryTitleElem.innerHTML = `دوره های ${categoryTitle}`
    coursesCountElem.innerHTML = `${coursesData.length} عنوان آموزشی`



    if (coursesData.length) {
        renderCourseBoxInWrapper(coursesData, coursesWrapper, 'normal')
    }else{
        coursesSortBox.style.display = 'none'
        coursesWrapper.innerHTML = '<div style="height: 30rem;" class="alert alert-danger text-center fs-1 d-flex align-items-center justify-content-center">هنوز دوره ای برای این دسته بندی منتشر نشده</div>'
    }

        //// sort box logics ////
        const sortBtns = document.querySelectorAll('.coursees__sort-method-list')
        let shownCourses = [...coursesData]
        let sortMethod = 'default'
        
        const searchBoxInput = document.querySelector('.courses__sort-box-search-box-input')
    
    
        // search between courses
        searchBoxInput.addEventListener('keyup', () => {
            coursesWrapper.innerHTML = ''
            const searchValue = searchBoxInput.value.trim()
            shownCourses = filterBySearchValue(coursesData, searchValue)
            shownCourses = sort(shownCourses, sortMethod)
            
            if (shownCourses.length) {
                renderCourseBoxInWrapper(shownCourses, coursesWrapper, 'normal')
            } else {
                shownCourses = [...coursesData]
                coursesWrapper.innerHTML = '<div  class="alert alert-danger text-center fs-1 d-flex align-items-center justify-content-center">نتیجه ای پیدا نشد</div>'
            }
        })
    
        // sort methods
        sortBtns.forEach(btn => {
            btn.addEventListener('click', event => {
                if (event.target.tagName === 'LI') {
                    coursesWrapper.innerHTML = ''
                    sortMethod = event.target.getAttribute('value')
    
                    removeClass('coursees__sort-method-item--active')
                    addClass('coursees__sort-method-item--active', event.target)
            
                    shownCourses = sort(shownCourses, sortMethod)
                    renderCourseBoxInWrapper(shownCourses, coursesWrapper,'normal')
                }
            })
        })
})