import {
    getAllCourses,
    renderCourseBoxInWrapper,
    getPopularCourses,
} from "../../services/courses.js"


const lastcoursesWrapper = document.querySelector('.lastcourses__courses .row')
const swiperWrapper = document.querySelector('.swiper-wrapper')


window.addEventListener('load', async () => {

    // render last courses
    const allCourses = await getAllCourses()
    renderCourseBoxInWrapper(allCourses, lastcoursesWrapper, 'normal', 6)


    // render popular courses
    const popularCourses = await getPopularCourses()
    renderCourseBoxInWrapper(popularCourses, swiperWrapper, 'swiper',)

    
})










// handle swiper
const swiper = new Swiper('.swiper', {
    speed: 800,
    loop: true,
    spaceBetween: 20,


    pagination: {
        el: '.swiper-pagination',
    },

    autoplay: {
        delay: 1000,
        disableOnInteraction: false ,
        reverseDirection: true,
      },


    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    }
})