import { getAllCourses, renderCourseBoxInWrapper } from "../../services/courses.js";
import { getUrlParam , addClass , removeClass } from "../../shared/utils.js";
import { sort, filterBySearchValue } from "../../services/sort-filter.js";



window.addEventListener('load', async () => {
    const coursesWrapper = document.querySelector('.courses__courses-wrapper .row')
    const coursesCountElem = document.querySelector('.courses__count')
    const coursesTitle = document.querySelector('.courses__title')
    const coursesSortBox = document.querySelector('.courses__sort-box')
    const searchValue = getUrlParam('search-value')
    const allCourses = await getAllCourses()
    const mainCourses = filterBySearchValue(allCourses, searchValue)

    if (mainCourses.length) {
        renderCourseBoxInWrapper(mainCourses, coursesWrapper, 'normal')
    } else {
        coursesSortBox.style.display = 'none'
        coursesWrapper.innerHTML = '<div style="height: 30rem;" class="alert alert-danger text-center fs-1 d-flex align-items-center justify-content-center">نتیجه ای پیدا نشد</div>'
    }

    coursesCountElem.innerHTML = `${mainCourses.length} عنوان آموزشی`

    coursesTitle.innerHTML = `نتایج جستجوی ${searchValue} :`

    //// sort box logics ////
    const sortBtns = document.querySelectorAll('.coursees__sort-method-list')
    let shownCourses = [...mainCourses]
    let sortMethod = 'default'
    
    const searchBoxInput = document.querySelector('.courses__sort-box-search-box-input')


    // search between courses
    searchBoxInput.addEventListener('keyup', () => {
        coursesWrapper.innerHTML = ''
        const searchValue = searchBoxInput.value.trim()
        shownCourses = filterBySearchValue(mainCourses, searchValue)
        shownCourses = sort(shownCourses, sortMethod)
        
        if (shownCourses.length) {
            renderCourseBoxInWrapper(shownCourses, coursesWrapper, 'normal')
        } else {
            shownCourses = [...mainCourses]
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