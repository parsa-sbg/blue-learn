
const getAllCourses = async () => {
    const res = await fetch('http://localhost:4000/v1/courses')
    const allCourses = await res.json()
    return allCourses
}

const renderCourseBoxInWrapper = (courses, wrapper, wrapperType, count) => {
    const coursesFragment = document.createDocumentFragment();
    courses.slice(0, count).forEach(course => {
    
        const coursebox = document.createElement('div')
        coursebox.className = wrapperType == 'swiper' ? 'swiper-slide' : 'col-12 col-md-6 col-lg-4'
        coursebox.insertAdjacentHTML('beforeend', `

                <div class="coursebox">
                    <a href="../course/course.html?short-name=${course.shortName}" class="coursebox__banner">
                        <img class="coursebox__image" src="http://localhost:4000/courses/covers/${course.cover}" alt="">
                    </a>
                    <div class="coursebox__content">
                        <a href="../course/course.html?short-name=${course.shortName}" class="coursebox__title">${course.name}</a>
                        <p class="coursebox__desc">${course.description}</p>
                        <div class="coursebox__teacher-star-wrapper">
                            <div class="coursebox__teacher-wrapper">
                                <i class="fa fa-user coursebox__teacher-icon"></i>
                                <a class="coursebox__teacher-link" href="#">${course.creator}</a>
                            </div>
                            <div class="coursebox__star-wrapper">
                                <span class="coursebox__socor">${course.courseAverageScore}.0</span>
                                <i class="fa fa-star coursebox__socor-icon"></i>
                            </div> 
                        </div>
                        <div class="coursebox__registers-price-wrapper">
                            <div class="coursebox__registers-wrapper">
                                <i class="fa fa-users coursebox__registers-icon"></i>
                                <span class="coursebox__registers-count">${course.registers}</span>
                            </div>
                            <div class="coursebox__price-wrapper">
                                ${course.price? `
                                    <span class="coursebox__price">${course.price}</span>
                                    <span class="coursebox__unit">تومان</span>
                                ` : `
                                    <span class="coursebox__price">رایگان</span>
                                `}

                            </div>
                        </div>
                    </div>
                </div>

        `)
        coursesFragment.append(coursebox)
    })
    wrapper.append(coursesFragment)
    
    
}

const getPopularCourses = async () => {
    const res = await fetch('http://localhost:4000/v1/courses/popular')
    const popularCourses = await res.json()
    return popularCourses
}


export { 
    getAllCourses,
    renderCourseBoxInWrapper,
    getPopularCourses,
}