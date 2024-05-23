import {
    getAllCourses,
    getAllSessions,
    addNewSession,
    deleteSession
} from "../../../services/courses.js"
import { showQuestionSwal, showTimerSwal } from "../../../shared/utils.js"
import { createLoader } from "../../../shared/loader.js";
const loader = createLoader('در حال آپلود ...')

let video
const videoInpurElem = document.querySelector('#video')
let allCourses

const formBtn = document.querySelector('.form__btn')

// preper courses list
const preperCoursesList = async () => {
    allCourses = await getAllCourses()
    const courseSelectElem = document.querySelector('#course')
    allCourses.forEach(course => {
        courseSelectElem.insertAdjacentHTML('beforeend', `
            <option value="${course._id}">${course.name}</option>
        `)
    })
}

// get and show all courses
const getAndShowAllCourses = async () => {
    const sessionsWrapper = document.querySelector('.sessions-wrapper')
    const coursesFragment = document.createDocumentFragment()

    sessionsWrapper.innerHTML = ''
    allCourses.forEach(course => {
        const accordionWrapper = document.createElement('div')
        accordionWrapper.className = 'accordion-wrapper'
        accordionWrapper.insertAdjacentHTML('beforeend', `

            <button class="accordion__btn">
                ${course.name}
                <i class="fa fa-angle-down"></i>
            </button>

            <div class="accordion__panel" id="${course._id}"></div>
            
        `)
        coursesFragment.appendChild(accordionWrapper)
    })
    sessionsWrapper.appendChild(coursesFragment)
}

// get and show all sessions in their course accordion
const getAndShowAllSessions = async () => {
    const allSessions = await getAllSessions()

    allSessions.forEach(session => {
        document.getElementById(session.course._id).insertAdjacentHTML('beforeend', `

            <div class="accordion__panel-item">
                <div class="accordion__panel-item__right">
                    <span class="accordion__panel-item__number">${document.getElementById(session.course._id).childElementCount + 1}</span>
                    <p class="accordion__panel-item__title">${session.title}</p>
                </div>

                <div class="accordion__panel-item__left">
                    <button onclick =(showSwalAndDeleteSession('${session._id}')) class="accordion__panel-item__delbtn">حذف جلسه</button>
                </div>
            </div>

        `)
    })
}

const fillEmptyAccordionPanels = () => {
    const accordionPanels = document.querySelectorAll('.accordion__panel')
    const emptyPanels = []
    accordionPanels.forEach(panel => {
        if (!panel.innerHTML) {
            emptyPanels.push(panel)
        }
    })
    emptyPanels.forEach(emptyPanel => {
        emptyPanel.insertAdjacentHTML('beforeend', `
            <div class="accordion__panel-item">
                <div class="accordion__panel-item__right">
                    <p class="accordion__panel-item__title text-danger">هنوز جلسه ای برای این دوره اضافه نشده</p>
                </div>
            </div>
        `)
    })
}

const showSwalAndDeleteSession = async (sessionId) => {
    showQuestionSwal('warning', 'آیا از حذف این جلسه اطمینان دارید؟', 'بله', 'جلسه مورد نظر با موفقیت حذف شد',
        async () => {
            const res = await deleteSession(sessionId)
            if (res.ok) {
                // empty all panels and fill again with new data
                document.querySelectorAll('.accordion__panel').forEach(panel => {
                    panel.innerHTML = ''
                })
                await getAndShowAllSessions()
                fillEmptyAccordionPanels()
            }
        })
}

const handleOpenAcacordion = () => {

    const accordionBtns = document.querySelectorAll('.accordion__btn')
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.nextElementSibling.classList.toggle('accordion__panel--open')
        })
    })
}

/////////////////////////////////////// =>  events <= /////////////////////////////////////


// add new session logic
formBtn.addEventListener('click', async event => {
    event.preventDefault()

    loader.show()

    const courseIdElem = document.querySelector('#course')
    const nameElem = document.querySelector('#name')
    const timeElem = document.querySelector('#time')
    const freeElem = document.querySelector('#free').checked ? 1 : 0

    const response = await addNewSession(courseIdElem.value, nameElem.value, video, timeElem.value, freeElem)
    loader.hide()

    if (response.res.ok) {
        showTimerSwal('success', 'جلسه با موفقیت اضافه شد.', 'فهمیدم', async () => {
            await getAndShowAllCourses()
            await getAndShowAllSessions()
            fillEmptyAccordionPanels()
            handleOpenAcacordion()

            courseIdElem.value = null
            nameElem.value = null
            timeElem.value = null
            document.querySelector('#free').checked = false
        })
    } else {
        console.log(response.data.message);

        switch (response.data.message[0].name) {
            case 'title': showTimerSwal('error', 'عنوان جلسه الزامی است.', 'فهمیدم', () => { })
                break;

            case 'video': showTimerSwal('error', 'فایل ویدیوی جلسه الزامی است.', 'فهمیدم', () => { })
                break;

            case 'time': showTimerSwal('error', 'زمان جلسه الزامی است.', 'فهمیدم', () => { })
                break;

            default: showTimerSwal('error', 'مشکلی رخ داد !', 'فهمیدم', () => { })

        }
    }

})

// save video in variable
videoInpurElem.addEventListener('change', event => {
    video = event.target.files[0]
})

window.showSwalAndDeleteSession = showSwalAndDeleteSession
window.addEventListener('load', async () => {
    await preperCoursesList()
    await getAndShowAllCourses()
    await getAndShowAllSessions()


    // fill empty accordion panels
    fillEmptyAccordionPanels()

    handleOpenAcacordion()


})