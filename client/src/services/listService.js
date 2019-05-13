import http from './httpService';
import {apiUrl} from '../config';

const apiEndpoint = apiUrl + "/lists";

const listUrl = (id) => `${apiEndpoint}/${id}`;

export function getLists() {
    return http.get(apiEndpoint);
}

export function getList(listId) {
    return http.get(listUrl(listId));
}

export function saveList(list) {
    return http.post(`${apiEndpoint}/create`, list);
}

export function updateList(listId) {
    return http.put(`${apiEndpoint}/update/${listId}`)
}

export function deleteList(listId) {
    return http.delete(`${apiEndpoint}/delete/${listId}`)
}

