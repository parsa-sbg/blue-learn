import { getUserInfos, loginUser, updataUserInfos } from "../../../services/auth.js";
import { addClass, removeClass, showInputSwal, showTimerSwal } from "../../../shared/utils.js";
import { createLoader } from "../../../shared/loader.js"
const loader = createLoader()
const nameInput = document.querySelector('#name')
const userNameInput = document.querySelector('#username')
const emailInput = document.querySelector('#email')
const phoneInput = document.querySelector('#phone')
const allAccountInfoInputs = document.querySelectorAll('.accountinfo-input')
const allIsChangeBalls = document.querySelectorAll('.ischangelball')
const saveChangesBtn = document.querySelector('.saveChangesBtn')
let userInfos = await getUserInfos()
const changePassBtn = document.querySelector('#changepassbtn')


// fill account detail inputs
nameInput.value = userInfos.data.name
userNameInput.value = userInfos.data.username
emailInput.value = userInfos.data.email
phoneInput.value = userInfos.data.phone


/////////////////// events /////////////////////

saveChangesBtn.addEventListener('click', async () => {

    const pass = await showInputSwal('رمز عبور خود را وارد کنید')

    if (pass) {
        loader.show()
        const isPassCurrect = (await loginUser(userInfos.data.username, pass)).res.ok

        if (isPassCurrect) {
            const res = await updataUserInfos(userNameInput.value, nameInput.value, emailInput.value, phoneInput.value, pass)
            if (res.ok) {
                showTimerSwal('success', 'اطلاعات شما با موفقیت آپدیت شد.', 'فهمیدم', () => { })

                // update user infos
                userInfos = await getUserInfos()

                // make all balls green
                allIsChangeBalls.forEach(ball => {
                    ball.classList.remove('ischangelball--red')
                    ball.innerHTML = 'ثبت شده'
                })

            } else {
                showTimerSwal('error', 'مشکلی پیش آمد !', 'فهمیدم', () => { })
            }
            loader.hide()
        } else {
            loader.hide()
            showTimerSwal('error', 'رمز عبور صحیح نیست!', 'فهمیدم', () => { })
        }

    }

})


allAccountInfoInputs.forEach(input => {
    console.log(input.name);
    input.addEventListener('keyup', event => {
        if (input.value !== userInfos.data[input.name]) {
            addClass('ischangelball--red', event.target.labels[0].children[0])
            event.target.labels[0].children[0].innerHTML = 'ثبت نشده'
        } else {
            event.target.labels[0].children[0].classList.remove('ischangelball--red')
            event.target.labels[0].children[0].innerHTML = 'ثبت شده'
        }
    })
})

// update pass
changePassBtn.addEventListener('click', async () => {
    const lastPassElem = document.querySelector('#lastpass')
    const newPassElem = document.querySelector('#newpass')

    loader.show()

    const isPassCurrect = (await loginUser(userInfos.data.username, lastPassElem.value)).res.ok


    if(isPassCurrect){
        const res = await updataUserInfos(userInfos.data.username, userInfos.data.name,userInfos.data.email, userInfos.data.phone,
            newPassElem.value
        )
        if (res.ok) {
            showTimerSwal('success', 'رمز عبور با موفقیت تغییر کرد', 'فهمیدم',
            async () => {
                userInfos = await getUserInfos()
            })
        }else{
            showTimerSwal('error', 'مشکلی پیش آمد !  رمز عبور باید حداقل هشت رقم باشد.', 'فهمیدم', () => { })
        }
        loader.hide()
    }else{
        showTimerSwal('error', 'رمز عبور صحیح نیست!', 'فهمیدم', () => { })
        loader.hide()
    }
    lastPassElem.value = ''
    newPassElem.value = ''
})