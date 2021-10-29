/**
 * localstorage方法提取
 */

export function getLocalStorage(type: string) {
    return JSON.parse(localStorage.getItem(type));
}

export function setLocalStorage(type: string, value: any) {
    return localStorage.setItem(type, JSON.stringify(value));
}