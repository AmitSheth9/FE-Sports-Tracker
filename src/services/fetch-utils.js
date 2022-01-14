import request from 'superagent';

//const URL = 'http://localhost:7890';
const URL = 'https://salty-beyond-78599.herokuapp.com';
export async function signUp(obj) {
    const response = await request
    .post(`${URL}/signup`)
    .send(obj);
    return response;
}
export async function logIn(obj) {
    const response = await request
    .post(`${URL}/login`)
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