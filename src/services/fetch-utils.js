import request from 'superagent';

//const URL = 'http://localhost:7890';
//so can commit
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
    //.withCredentials();
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
