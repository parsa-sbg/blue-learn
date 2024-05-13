import { getAllCourses , getAllSessions } from "../../../services/courses.js"



// get and show all courses
const getAndShowAllCourses = async () => {
    const sessionsWrapper = document.querySelector('.sessions-wrapper')
    const allCourses = await getAllCourses()
    const coursesFragment = document.createDocumentFragment()

    allCourses.forEach(course => {
        console.log(course);
        const accordionWrapper = document.createElement('div')
        accordionWrapper.className = 'accordion-wrapper'
        accordionWrapper.insertAdjacentHTML('beforeend', `

            <button class="accordion__btn">
                ${course.name}
                <i class="fa fa-angle-down"></i>
            </button>

            <div class="accordion__panel" id="${course._id}">

            </div>

            
        `)
        coursesFragment.appendChild(accordionWrapper)
    })
    sessionsWrapper.appendChild(coursesFragment)
}

// get and show all sessions in their course accordion
const getAndShowAllSessions = async () => {
    const allSessions = await getAllSessions()

    allSessions.forEach(session => {
        console.log(session.course._id);
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


window.addEventListener('load', async () => {
    await getAndShowAllCourses()
    await getAndShowAllSessions()

    // handle open accordion panel 
    const accordionBtns = document.querySelectorAll('.accordion__btn')
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.nextElementSibling.classList.toggle('accordion__panel--open')
        })
    })

})