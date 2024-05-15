import { registerNewUser, saveIntoLocalStorage } from "../../services/auth.js";
import { showTimerSwal } from "../../shared/utils.js";


const submitBtn = document.querySelector('.submit-btn')
const logo = document.querySelector('.logo')

window.addEventListener('load', () => {

    submitBtn.addEventListener('click', async event => {
        event.preventDefault()

        let nameInputValue = document.querySelector('#name-input').value
        let userNameInputValue = document.querySelector('#user-name-input').value
        let emailInputValue = document.querySelector('#email-input').value
        let phoneInputValue = document.querySelector('#phone-input').value
        let passwordInputValue = document.querySelector('#password-input').value

        const response = await registerNewUser(
            nameInputValue.trim(),
            userNameInputValue.trim(),
            emailInputValue.trim(),
            phoneInputValue.trim(),
            passwordInputValue.trim(),
            passwordInputValue.trim()
        )


        if (response.res.ok) {
            const userToken = response.data.accessToken
            saveIntoLocalStorage('userToken', userToken)

            nameInputValue = ''
            userNameInputValue = ''
            emailInputValue = ''
            phoneInputValue = ''
            passwordInputValue = ''

            showTimerSwal(
                'success',
                'شما با موفقیت ثبت نام شدید',
                'ورود به پنل',
                () => {
                    location.href = "../home/"
                }
            )

        } else {
            switch (response.data.message[0].name) {
                case 'phone': showTimerSwal('error', 'شماره تماس الزامی است', 'فهمیدم', () => { })
                    break;

                case 'email': showTimerSwal('error', 'ایمیل الزامی است', 'فهمیدم', () => { })
                    break;

                case 'username': showTimerSwal('error', 'نام کاربری الزامی است', 'فهمیدم', () => { })
                    break;

                case 'name': showTimerSwal('error', 'نام و نام خانوادگی الزامی است', 'فهمیدم', () => { })
                    break;

                case 'password': showTimerSwal('error', 'رمز عبور الزامی است', 'فهمیدم', () => { })
                    break;

                default: showTimerSwal('error', 'نام کاربری یا رمز عبور تکراری است', 'فهمیدم', () => { })
            }
        }

    })

    logo.addEventListener('click', () => {
        location.href = "../home/"
    })

})