import { getCourseData } from "../../services/courses.js";
import { getUserToken, getUrlParam } from "../../shared/utils.js";

window.addEventListener('load', async () => {
    const courseShortName = getUrlParam('short-name')
    const userToken = getUserToken()

    const course = await getCourseData(courseShortName, userToken)
    
    if (course.res.ok) {
        const courseData = course.data
        console.log(courseData);

        /////  get elements  /////
        const courseTitle = document.querySelector('.maincontent__title')
        const courseDesc = document.querySelector('.maincontent__desc')
        const courseText = document.querySelector('.maincontent__text')
        const courseBtn = document.querySelector('.maincontent__btn')
        const courseImage = document.querySelector('.maincontent__image')

        const courseTimeElem = document.querySelector('#course-time')
        const courseLastUpdate = document.querySelector('#last-update')
        const courseSupport = document.querySelector('#support')
        const courseRegistersCount = document.querySelector('#registers')


        const courseSessionsCount = document.querySelector('.sessions__count')
        const courseSessionsWrapper = document.querySelector('.sessions__wraper')



        /////  set course data in elements  /////

        // course title 
        courseTitle.innerHTML = courseData.name

        // course desc
        courseDesc.innerHTML = courseData.description

        // price and button
        if(courseData.isUserRegisteredToThisCourse){
            courseText.innerHTML = 'شما دانشجوی دوره هستید'
            
            courseBtn.innerHTML = '<i class="maincontent__btn-icon fas fa-graduation-cap"></i> مشاهده دوره'
            courseBtn.setAttribute('href', '#scroll-point')
        }else{
            courseText.innerHTML = courseData.price ?`${courseData.price.toLocaleString()} تومن`: 'رایگان'

            courseBtn.innerHTML = '<i class="maincontent__btn-icon fas fa-graduation-cap"></i> ثبت نام در دوره'
            courseBtn.setAttribute('href', '#')
        }

        // cover
        courseImage.setAttribute('src', `http://localhost:4000/courses/covers/${courseData.cover}`)

        // course time
        let courseTime = 0
        courseData.sessions.forEach(session => {
          let sessionTime = session.time
          
            sessionTime = sessionTime
            courseTime += +sessionTime / 60
          }
        )
        courseTimeElem.innerHTML = `${Math.ceil(courseTime)} ساعت`

        // course last update
        courseLastUpdate.innerHTML = courseData.updatedAt.slice(0, 10)
        
        // course support
        courseSupport.innerHTML = courseData.support

        // course registers count
        courseRegistersCount.innerHTML = courseData.courseStudentsCount

        // course sessions count
        courseSessionsCount.innerHTML = courseData.sessions.length + ' ویدیو'

        // course sessions
        if(courseData.sessions.length){

            if(courseData.isUserRegisteredToThisCourse){

                courseData.sessions.forEach((session, index) => {
                    console.log(session);
                    courseSessionsWrapper.insertAdjacentHTML('beforeend',`
                        <a href="../episode/episode.html?course-s-n=${courseData.shortName}&session-id=${session._id}&session-num=${index+1}" class="session">
                            <div class="session__right">
                                <span class="session__number">${index+1}</span>
                                <p class="session__title">${session.title}</p>
                            </div>
                            <div class="session__left">
                                <span class="session__time">${session.time}</span>
                                <i class="session__icon fa fa-play"></i>
                            </div>
                        </a>
                    `)
    
                })
    
            }else{
                courseData.sessions.forEach((session, index) => {
                    console.log(session);
                    courseSessionsWrapper.insertAdjacentHTML('beforeend',`
                        <${session.free ? 'a' : 'i'} href="../episode/episode.html?course-s-n=${courseData.shortName}&session-id=${session._id}&session-num=${index+1}" class="session">
                            <div class="session__right">
                                <span class="session__number">${index+1}</span>
                                <p class="session__title">${session.title}</p>
                            </div>
                            <div class="session__left">
                                <span class="session__time">${session.time} دقیقه</span>
                                <i class="session__icon ${session.free? 'fa fa-play' : 'fa fa-lock'}"></i>
                            </div>
                        </>
                    `)
                })
            }
            
        }else{
            // when no video has been uploaded
            courseSessionsWrapper.innerHTML = '<div class="alert alert-danger fs-2">هنوز ویدیویی آپلود نشده</div>'
        }
        
    }else{
        // when course not found
        document.querySelector('main').innerHTML = '<div style="height: 50rem;" class="alert alert-danger text-center fs-1 d-flex align-items-center justify-content-center">دوره مورد نظر یافت نشد</div>'
    }

})