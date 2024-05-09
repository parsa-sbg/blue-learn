const sort = (array, sortBy) => {
    let sortedArray
    switch(sortBy){
        case 'default' : sortedArray = array
        break;

        case 'more-price': sortedArray = array.sort((a , b) => {
            return b.price - a.price
        })
        break;

        case 'lower-price': sortedArray = array.sort((a , b) => {
            return a.price - b.price
        })
        break;
    }

    return sortedArray
}

const filterBySearchValue = (courses ,searchValue) => {
    const filteredcourses = courses.filter(course => {
        return course.name.toUpperCase().includes(searchValue.toUpperCase())
    })
    return filteredcourses
}

export { sort, filterBySearchValue }