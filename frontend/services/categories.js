import { getUserToken } from "../shared/utils.js"

const getAllCatrgories = async () => {
    const allCategories = await fetch('http://localhost:4000/v1/category')

    const data = await allCategories.json()

    return data
} 

const deleteCategory = async (categoryId) => {
    const res = await fetch (`http://localhost:4000/v1/category/${categoryId}`,{
        method: "DELETE",
        headers: {
            Authorization : `bearer ${getUserToken()}`
        }
    })
    console.log(res);
}

export {
    getAllCatrgories,
    deleteCategory
}