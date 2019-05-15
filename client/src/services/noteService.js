import http from './httpService';
import {apiUrl} from '../config';

const apiEndpoint = apiUrl + "/notes";
// classes doesn't work. React may thinks that this is components
const noteUrl = (id) => `${apiEndpoint}/${id}`;

export function getNotes() {
    return http.get(apiEndpoint).then(response=>response.data);
}

export function getNote(noteId) {
    return http.get(noteUrl(noteId));
}

export function saveNote(note) {
    return http.post(`${apiEndpoint}/create`, note);
}

export function updateNote(note) {
    const noteId = note.id;
    return http.put(`${apiEndpoint}/${noteId}/update`,note);
}

export function deleteNote(noteId) {
    return http.delete(`${apiEndpoint}/${noteId}/delete`)
}

