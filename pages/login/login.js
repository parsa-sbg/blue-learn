import { loginUser , saveIntoLocalStorage } from "../../services/auth.js";
import { showTimerSwal } from "../../shared/utils.js";

const submitBtn = document.querySelector('.submit-btn')

const nameInput = document.querySelector('#name-input')
const passwordInput = document.querySelector('#password-input')

const logo = document.querySelector('.logo')



window.addEventListener('load', () => {

    submitBtn.addEventListener('click', async event => {
        event.preventDefault()

        const response = await loginUser(nameInput.value, passwordInput.value)

        console.log(response);
        
        if (response.res.ok) {
            const userToken = response.data.accessToken
            saveIntoLocalStorage('userToken', userToken)

            nameInput.value = ''
            passwordInput.value = ''

            showTimerSwal(
                'success',
                'شما با موفقیت وارد شدید',
                'ورود به پنل',
                () => {
                    location.href = "/index.html"
                }
            )
        }else {
            if(response.res.status == 401){
                showTimerSwal('error', 'کاربری با این مشخصات یافت نشد', 'فهمیدم', () => {})
            }else{
                switch(response.data.message[0].name) {

                    case 'identifier': showTimerSwal('error', 'نام کاربری یا ایمیل الزامی است', 'فهمیدم', () => { })
                    break;
    
                    case 'password': showTimerSwal('error', 'رمز عبور الزامی است', 'فهمیدم', () => { })
                    break;
                }
            }

        }
    })

    logo.addEventListener('click', () => {
        location.href = "/index.html"
    })
})