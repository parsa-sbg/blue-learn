import { getAllCourses, renderCourseBoxInWrapper } from "../../services/courses.js";
import { addClass, removeClass } from "../../shared/utils.js";
import { sort, filterBySearchValue } from "../../services/sort-filter.js";


const coursesWrapper = document.querySelector('.courses__courses-wrapper .row')
const coursesCountElem = document.querySelector('.courses__count')

window.addEventListener('load', async () => {
    const allCourses = await getAllCourses()
    renderCourseBoxInWrapper(allCourses, coursesWrapper, 'normal')

    coursesCountElem.innerHTML = `${allCourses.length} عنوان آموزشی`

    //// sort box logics ////
    const sortBtns = document.querySelectorAll('.coursees__sort-method-list')
    let shownCourses = [...allCourses]
    let sortMethod = 'default'
    const searchBoxInput = document.querySelector('.courses__sort-box-search-box-input')

    // search between courses
    searchBoxInput.addEventListener('keyup', () => {
        coursesWrapper.innerHTML = ''
        const searchValue = searchBoxInput.value.trim()
        shownCourses = filterBySearchValue(allCourses, searchValue)
        shownCourses = sort(shownCourses, sortMethod)

        if (shownCourses.length) {
            renderCourseBoxInWrapper(shownCourses, coursesWrapper, 'normal')
        } else {
            shownCourses = [...allCourses]
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
                renderCourseBoxInWrapper(shownCourses, coursesWrapper, 'normal')
            }
        })
    })
})