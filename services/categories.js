import { getUserToken } from "../shared/utils.js"

const getAllCatrgories = async () => {
    const allCategories = await fetch('https://bluelearn-bc.liara.run/v1/category')

    const data = await allCategories.json()

    return data
} 

const addNewCategory = async (title, name) => {

    const newCatInfo = {
        title,
        name
    }

    const res = await fetch('https://bluelearn-bc.liara.run/v1/category',{
        method: "POST",
        headers: {
            Authorization : `bearer ${getUserToken()}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newCatInfo)
    })
    const data = await res.json()
    
    
    return {
        data,
        res
    }
}

const deleteCategory = async (categoryId) => {
    const res = await fetch (`https://bluelearn-bc.liara.run/v1/category/${categoryId}`,{
        method: "DELETE",
        headers: {
            Authorization : `bearer ${getUserToken()}`
        }
    })
    console.log(res);
}

export {
    getAllCatrgories,
    deleteCategory,
    addNewCategory
}