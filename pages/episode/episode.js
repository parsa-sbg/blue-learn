import { getUrlParam, getUserToken } from "../../shared/utils.js";
import { getSessionInfos, getCourseData } from "../../services/courses.js";


window.addEventListener('load', async () => {
    const courseShortName = getUrlParam('course-s-n')
    const sessionId = getUrlParam('session-id')
    const userToken = getUserToken()

    const sessionNumber = getUrlParam('session-num')
    
    const sessionResponse = await getSessionInfos(courseShortName, sessionId, userToken)

    const sessionInfos = sessionResponse.data.session
    const sessionsInfos = sessionResponse.data.sessions

    console.log(sessionResponse);


    // to find out if user is registered or not
    const isUserRegistered = await (await getCourseData(courseShortName, userToken)).data.isUserRegisteredToThisCourse

    console.log(isUserRegistered);

    /////  get elements  /////
    const sessionVideoElem = document.querySelector('.session-video')
    const sessionNumberElem = document.querySelector('.session__number')
    const sessionTitleElem = document.querySelector('.session__title')
    const sessionTimeElem = document.querySelector('.session__time')
    const courseSessionsWrapper = document.querySelector('.sessions__wraper')


    ////  set course data in elements  /////

    // session video
    sessionVideoElem.setAttribute('src',`https://bluelearn-bc.liara.run/courses/covers/${sessionInfos.video}`)
    
    // session number
    sessionNumberElem.innerHTML = sessionNumber

    // session title
    sessionTitleElem.innerHTML = sessionInfos.title

    // session time 
    sessionTimeElem.innerHTML = sessionInfos.time + ' دقیقه' 

    // all sessions
    if(isUserRegistered){

        sessionsInfos.forEach((session, index) => {
            console.log(session);
            courseSessionsWrapper.insertAdjacentHTML('beforeend',`
                <a href="../episode/episode.html?course-s-n=${courseShortName}&session-id=${session._id}&session-num=${index+1}" class="session">
                    <div class="session__right">
                        <span class="session__number">${index+1}</span>
                        <p class="session__title">${session.title}</p>
                    </div>
                    <div class="session__left">
                        <span class="session__time">${session.time} دقیقه</span>
                        <i class="session__icon fa fa-play"></i>
                    </div>
                </a>
            `)

        })

    }else{
        sessionsInfos.forEach((session, index) => {
            console.log(session);
            courseSessionsWrapper.insertAdjacentHTML('beforeend',`
                <${session.free ? 'a' : 'i'} href="../episode/episode.html?course-s-n=${courseShortName}&session-id=${session._id}&session-num=${index+1}" class="session">
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
})