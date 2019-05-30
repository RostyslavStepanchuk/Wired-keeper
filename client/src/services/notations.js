import http from './httpService';

export function getNotations() {
    return http.get('/index').then(response=>response.data);
}