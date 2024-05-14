import { getUserToken } from "../shared/utils.js"

const registerNewUser = async (name, username, email, phone, password, confirmPassword) => {
    const newUserInfoes = {
        name,
        username,
        email,
        phone,
        password,
        confirmPassword
    }

    const res = await fetch('http://localhost:4000/v1/auth/register',{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfoes)
    })
    const data = await res.json()
    
    return {
        data,
        res
    }

}

const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};

const loginUser = async (identifier, password) => {
    const res = await fetch('http://localhost:4000/v1/auth/login',{
        method : "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })
    const data = await res.json()

    return {
        res,
        data
    }
}

const getUserInfos = async () => {
    const userToken = getUserToken()
    if (!userToken) {
        return null
    }

    const res = await fetch ('http://localhost:4000/v1/auth/me', {
        headers: {
            "Authorization" : `bearer ${userToken}`
        }
    })
    const data = await res.json()
    
    return {
        res,
        data
    }
}

const routeProtection = async () => {
    const userToken = getUserToken()
    const userInfos = await getUserInfos(userToken)

    if (userInfos.data.role !== 'ADMIN') {
        console.log('no admin');
        location.replace('../../../pages/home/index.html')
    }
}

const getAllUsers = async () => {
    const res = await fetch('http://localhost:4000/v1/users',{
        headers: {
            Authorization : `bearer ${getUserToken()}`
        }
    })
    const data = await res.json()

    return data
}

const deleteUser = async (userId) => {
    console.log(`http://localhost:4000/v1/users/${userId}`);
    const res = await fetch (`http://localhost:4000/v1/users/${userId}` ,{
        method: "DELETE",
        headers: {
            Authorization: `bearer ${getUserToken()}`
        }
    })
    console.log(res);
    console.log(await res.json());
    return res
}

export {
    registerNewUser,
    saveIntoLocalStorage,
    loginUser,
    getUserInfos,
    routeProtection,
    getAllUsers,
    deleteUser
}