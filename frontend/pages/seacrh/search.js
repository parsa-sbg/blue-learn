import { globalSearch } from "../../services/courses.js";
import { getUrlParam } from "../../shared/utils.js";

window.addEventListener('load', () => {
    const searchValue = getUrlParam('search-value')
    globalSearch(searchValue)
})