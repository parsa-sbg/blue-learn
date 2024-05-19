import { getUserInfos, loginUser, updataUserInfos } from "../../../services/auth.js";
import { addClass, removeClass, showInputSwal, showTimerSwal } from "../../../shared/utils.js";
import { createLoader } from "../../../shared/loader.js"
const loader = createLoader()
let userInfos = await getUserInfos()
console.log(userInfos.data);

const nameInput = document.querySelector('#name')
const userNameInput = document.querySelector('#username')
const emailInput = document.querySelector('#email')
const phoneInput = document.querySelector('#phone')

const allInputs = document.querySelectorAll('input')
const allLabels = document.querySelectorAll('label')

const saveChangesBtn = document.querySelector('.saveChangesBtn')


nameInput.value = userInfos.data.name
userNameInput.value = userInfos.data.username
emailInput.value = userInfos.data.email
phoneInput.value = userInfos.data.phone


/////////////////// events /////////////////////

saveChangesBtn.addEventListener('click', async () => {

    const pass = await showInputSwal('رمز عبور خود را وارد کنید')

    if (pass) {
        loader.show()
        const isPassCurrect = (await loginUser(userNameInput.value, pass)).res.ok

        if (isPassCurrect) {
            const res = await updataUserInfos(userNameInput.value, nameInput.value, emailInput.value, phoneInput.value, pass)
            if (res.ok) {
                showTimerSwal('success', 'اطلاعات شما با موفقیت آپدیت شد.', 'فهمیدم', () => { })

                // update user infos
                userInfos = await getUserInfos()

                // make all balls green
                allLabels.forEach(label => {
                    label.children[0].classList.remove('ischangelball--red')
                    label.children[0].innerHTML = 'ثبت شده'
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

// input events

allInputs.forEach(input => {
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