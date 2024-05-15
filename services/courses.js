import { getUserToken } from "../shared/utils.js"

const getAllCourses = async () => {
    const res = await fetch('https://bluelearn-bc.liara.run/v1/courses')
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
                    <a href="./pages/course/course.html?short-name=${course.shortName}" class="coursebox__banner">
                        <img class="coursebox__image" src="https://bluelearn-bc.liara.run/courses/covers/${course.cover}" alt="">
                    </a>
                    <div class="coursebox__content">
                        <a href="./pages/course/course.html?short-name=${course.shortName}" class="coursebox__title">${course.name}</a>
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
                                    <span class="coursebox__price">${course.price.toLocaleString()}</span>
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
    const res = await fetch('https://bluelearn-bc.liara.run/v1/courses/popular')
    const popularCourses = await res.json()
    return popularCourses
}

const getCourseData = async (courseShortname, userToken) => {
    const res = await fetch(`https://bluelearn-bc.liara.run/v1/courses/${courseShortname}`,{
        method: "GET",
        headers: {
            "Authorization" : `bearer ${userToken}`
        }
    })
    const data = await res.json()

    return {
        res,
        data
    }
}

const getSessionInfos = async (courseShortName, sessionId, userToken) => {
    const res = await fetch(`https://bluelearn-bc.liara.run/v1/courses/${courseShortName}/${sessionId}`,{
        headers : {
            Authorization : `bearer ${userToken}`
        }
    })
    const data = await res.json()
    return {
        res,
        data
    }
}

const getCagegoryCourses = async (courseShortName) => {
    const res = await fetch(`https://bluelearn-bc.liara.run/v1/courses/category/${courseShortName}`)
    const data = await res.json()

    return {
        res,
        data
    }
}

const createNewCourse = async (name, description, cover , shortName, price, categoryID ,support) => {
    
    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
    formData.append('cover', cover)
    formData.append('shortName', shortName)
    formData.append('price', price)
    formData.append('categoryID', categoryID)
    formData.append('support', support)
    formData.append('status', 'start')

    const res = await fetch ('https://bluelearn-bc.liara.run/v1/courses',{
        method: "POST",
        headers: {
            Authorization : `bearer ${getUserToken()}`,
        },
        body : formData
    })
    
    const data = await res.json()
    return {
        res,
        data
    }
    
}

const deleteCourse = async courseId => {
    const res = await fetch(`https://bluelearn-bc.liara.run/v1/courses/${courseId}`,{
        method: "DELETE",
        headers:{
            Authorization : `bearer ${getUserToken()}`
        }
    })
    console.log(res);
}

const getAllSessions = async () => {
    const res = await fetch('https://bluelearn-bc.liara.run/v1/courses/sessions')
    const data = await res.json()

    return data
}

const addNewSession = async (courseId ,title, video, time, free) => {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('video', video)
    formData.append('time', time)
    formData.append('free', free)

    const res = await fetch (`https://bluelearn-bc.liara.run/v1/courses/${courseId}/sessions`,{
        method: "POST",
        headers: {
           Authorization : `bearer ${getUserToken()}`
        },
        body : formData
    })
    const data = await res.json()

    console.log(data);
}

const deleteSession = async (sessionId) => {
    const res = await fetch(`https://bluelearn-bc.liara.run/v1/courses/sessions/${sessionId}`,{
        method: "DELETE",
        headers:{
            Authorization : `bearer ${getUserToken()}`
        }
    })

    return res
}

export { 
    getAllCourses,
    renderCourseBoxInWrapper,
    getPopularCourses,
    getCourseData,
    getSessionInfos,
    getCagegoryCourses,
    createNewCourse,
    deleteCourse,
    getAllSessions,
    addNewSession,
    deleteSession
}