import http from './httpService';
import {apiUrl} from '../config';

export function getNotations() {
    return http.get(apiUrl).then(response=>response.data);
}