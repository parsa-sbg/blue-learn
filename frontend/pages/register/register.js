import { registerNewUser , saveIntoLocalStorage} from "../../services/auth.js";
import { showTimerSwal } from "../../shared/utils.js";


 const submitBtn = document.querySelector('.submit-btn')

window.addEventListener('load', () => {

    submitBtn.addEventListener('click', async event => {
        event.preventDefault()

        const nameInputValue = document.querySelector('#name-input').value
        const userNameInputValue = document.querySelector('#user-name-input').value
        const emailInputValue = document.querySelector('#email-input').value       
        const phoneInputValue = document.querySelector('#phone-input').value
        const passwordInputValue = document.querySelector('#password-input').value

        const response = await registerNewUser(
            nameInputValue.trim(),
            userNameInputValue.trim(),
            emailInputValue.trim(),
            phoneInputValue.trim(),
            passwordInputValue.trim(),
            passwordInputValue.trim()
        )

        console.log(response)

        if(response.res.ok){
            const userToken = response.data.accessToken
            saveIntoLocalStorage('userToken', userToken)
            showTimerSwal(
                'success',
                'شما با موفقیت ثبت نام شدید',
                'فهمیدم',
                () => {
                    location.href = "../home/"
                }
            )

        }else{
            switch(response.data.message[0].name){
                case 'phone': showTimerSwal('error', 'شماره تماس الزامی است', 'فهمیدم', ()=>{})
                break;
                
                case 'email': showTimerSwal('error', 'ایمیل الزامی است', 'فهمیدم', ()=>{})
                break;

                case 'username': showTimerSwal('error', 'نام کاربری الزامی است', 'فهمیدم', ()=>{})
                break;

                case 'name': showTimerSwal('error', 'نام و نام خانوادگی الزامی است', 'فهمیدم', ()=>{})
                break;

                case 'password': showTimerSwal('error', 'رمز عبور الزامی است', 'فهمیدم', ()=>{})
                break;

                default : showTimerSwal('error', 'نام کاربری یا رمز عبور تکراری است', 'فهمیدم', ()=>{})
            }
        }

    })
    
})