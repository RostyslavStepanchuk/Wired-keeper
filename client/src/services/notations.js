import http from './httpService';
import {apiUrl} from '../config';

export function getNotations() {
    return http.get('/index').then(response=>response.data);
}