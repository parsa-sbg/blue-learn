const getAllCatrgories = async () => {
    const allCategories = await fetch('http://localhost:4000/v1/category')

    const data = await allCategories.json()

    return data
} 

export { getAllCatrgories }