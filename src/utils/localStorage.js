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
    return JSON.parse(localStorage.getItem(key)) ?? null;
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