import { getUserInfos } from "../../../services/auth.js";
import { getUserCourses } from "../../../services/courses.js";




window.addEventListener('load', async () => {

    // show user courses
    const coursesWrapper = document.querySelector('.account-content__courses-wrapper .row')
    const userCourses = await getUserCourses()

    if (userCourses.length) {
        userCourses.forEach(course => {
            console.log(course);
            coursesWrapper.insertAdjacentHTML('beforeend', `

                <div class="col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4">
                    <div class="coursebox">
                        <a href="/pages/course/course.html?short-name=${course.course.shortName}" class="coursebox__banner">
                            <img class="coursebox__image" src="https://bluelearn-bc.liara.run/courses/covers/${course.course.cover}" alt="">
                        </a>
                        <div class="coursebox__content">
                            <a href="/pages/course/course.html?short-name=${course.course.shortName}" class="coursebox__title">${course.course.name}</a>
                            <a class="course-box__btn" href="/pages/course/course.html?short-name=${course.course.shortName}">مشاهده دوره</a>
                        </div>
                    </div>
                </div>

            `)
        })
    }else{
        coursesWrapper.innerHTML = '<div class="alert alert-danger text-center fs-1 d-flex align-items-center justify-content-center">شما در هیچ دوره ای ثبت نام نکرده اید.</div>'
    }
    
})