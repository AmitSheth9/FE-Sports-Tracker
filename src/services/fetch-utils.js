/* eslint-disable no-unused-vars */
import request, { listenerCount } from 'superagent';

const URL = 'https://ec2-3-83-46-185.compute-1.amazonaws.com:443';
//this is aws be ip
//const URL = 'http://localhost:7890';
//const URL = 'https://salty-beyond-78599.herokuapp.com';
export async function signUp(obj) {
    const response = await request
    .post(`${URL}/signup`)
    .withCredentials()
    .send(obj);
    return response;
}
export async function logIn(obj) {
    const response = await request
    .post(`${URL}/login`)
    .withCredentials()
    .send(obj);
    return response;
}
export async function logOut() {
    const response = await request
    .get(`${URL}/logout`)
    .withCredentials()

    return response;
}
export async function changePW(obj) {
    const response = await request
    .post(`${URL}/change-password`)
    .send(obj);
    return response;
}

export async function postBetForm(obj) {
    const response = await request
    .post(`${URL}/betform`)
    .send(obj);
    return response;
}
export async function getBetData(username) {
    const response = await request
    .get(`${URL}/betdata/${username}`);
    return response;
}
export async function deleteBet(id) {
    const response = await request
    .delete(`${URL}/betdata/${id}`);
    return response;
}
