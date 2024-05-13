import { getAllCourses, getAllSessions, addNewSession } from "../../../services/courses.js"

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
                    <span class="accordion__panel-item__number">1</span>
                    <p class="accordion__panel-item__title">${session.title}</p>
                </div>

                <div class="accordion__panel-item__left">
                    <button class="accordion__panel-item__delbtn">حذف جلسه</button>
                </div>
            </div>

        `)
    })
}

const fillEmptyAccordionPanels = () => {
    const accordionPanels = document.querySelectorAll('.accordion__panel')
    const emptyPanels = []
    accordionPanels.forEach(panel => {
        console.log(panel.innerHTML);
        if (!panel.innerHTML) {
            emptyPanels.push(panel)
        }
    })
    console.log(emptyPanels);
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

/////////////////////////////////////// =>  events <= /////////////////////////////////////


// add new session logic
formBtn.addEventListener('click', async event => {
    event.preventDefault()
    const courseId = document.querySelector('#course').value
    const name = document.querySelector('#name').value
    const time = document.querySelector('#time').value
    const free = document.querySelector('#free').checked ? 1 : 0

    addNewSession(courseId, name, video, time, free)
    getAndShowAllCourses()
    getAndShowAllSessions()
    fillEmptyAccordionPanels()
})

// save video in variable
videoInpurElem.addEventListener('change', event => {
    video = event.target.files[0]
})


window.addEventListener('load', async () => {
    await preperCoursesList()
    await getAndShowAllCourses()
    await getAndShowAllSessions()


    // fill empty accordion panels
    fillEmptyAccordionPanels()

    // handle open accordion panel 
    const accordionBtns = document.querySelectorAll('.accordion__btn')
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.nextElementSibling.classList.toggle('accordion__panel--open')
        })
    })

})