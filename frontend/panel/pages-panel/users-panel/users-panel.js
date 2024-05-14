import { getAllUsers } from "../../../services/auth.js";

let allUsers


const desplayAllUsers = async () => {
    allUsers = await getAllUsers()
    allUsers.reverse()
    const usersWrapper = document.querySelector('.users-wrapper .row')
    const adminsWrapper = document.querySelector('.admins-wrapper .row')

    usersWrapper.innerHTML = ''
    adminsWrapper.innerHTML = ''

    const userssFragment = document.createDocumentFragment()
    const adminsFragment = document.createDocumentFragment()

    allUsers.forEach(user => {
        console.log(user);

        if (user.role == 'USER') {
            const courseBoxCol = document.createElement('div')
            courseBoxCol.className = 'col-12 col-sm-6 col-md-4 col-xl-3'
            courseBoxCol.insertAdjacentHTML('beforeend', `

                <div class="user-box">

                    <div class="user-box__header">
                        <span class="user-box__name">${user.name}</span>
                        <div class="user-box__btns">
                            <button class="user-box__removebtn">حذف</button>
                            <button class="user-box__promotbtn">ارتقا</button>
                        </div>
                    </div>

                    <div class="user-box__infos">
                        <div class="user-box__info-wrapper">
                            <span class="user-box__info-label">شماره تماس :</span>
                            <span class="user-box__info">${user.phone}</span>
                        </div>
                        <div class="user-box__info-wrapper">
                            <span class="user-box__info-label">ایمیل :</span>
                            <span class="user-box__info">${user.email}</span>
                        </div>
                        <div class="user-box__info-wrapper">
                            <span class="user-box__info-label">نام کاربری :</span>
                            <span class="user-box__info">${user.username}</span>
                        </div>
                    </div>

                </div>
            `)
            userssFragment.appendChild(courseBoxCol)
        } else if (user.role == 'ADMIN') {
            const courseBoxCol = document.createElement('div')
            courseBoxCol.className = 'col-12 col-sm-6 col-md-4 col-xl-3'

            courseBoxCol.insertAdjacentHTML('beforeend', `
                    <div class="user-box">

                        <div class="user-box__header">
                            <span class="user-box__name">${user.name}</span>
                            <div class="user-box__btns">
                                <button class="user-box__removebtn">حذف</button>
                            </div>
                        </div>

                        <div class="user-box__infos">
                            <div class="user-box__info-wrapper">
                                <span class="user-box__info-label">شماره تماس :</span>
                                <span class="user-box__info">${user.phone}</span>
                            </div>
                            <div class="user-box__info-wrapper">
                                <span class="user-box__info-label">ایمیل :</span>
                                <span class="user-box__info">${user.email}</span>
                            </div>
                            <div class="user-box__info-wrapper">
                                <span class="user-box__info-label">نام کاربری :</span>
                                <span class="user-box__info">${user.username}</span>
                            </div>
                        </div>

                    </div>
            `)
            adminsFragment.appendChild(courseBoxCol)
        }
    })
    adminsWrapper.appendChild(adminsFragment)
    usersWrapper.append(userssFragment)

}

// events 

window.addEventListener('load', () => {
    desplayAllUsers()
})