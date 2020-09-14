/**
 * 
 * @param {String} key 
 * @param {any} value 
 */
const storeData = (key , value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 
 * @param {String} key 
 */
const getData = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? null;
    } catch (error) {
        return null;
    }
}

/**
 * 
 * @param {String} key 
 */
const removeData = (key) => {
    localStorage.removeItem(key);
}

export {
    storeData,
    getData,
    removeData
}