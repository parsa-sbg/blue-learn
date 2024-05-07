import { getAllCourses , renderCourseBoxInWrapper} from "../../services/courses.js";

const coursesWrapper = document.querySelector('.courses__courses-wrapper .row')
const coursesCountElem = document.querySelector('.courses__count')

window.addEventListener('load', async () => {
    const allCourses = await getAllCourses()
    renderCourseBoxInWrapper(allCourses, coursesWrapper, 'normal')

    console.log(allCourses);
    
    coursesCountElem.innerHTML = `${ allCourses.length } عنوان آموزشی`
})