import request from 'superagent';

const URL = 'http://localhost:7890';

export async function signUp(obj) {
    await request
    .post(`${URL}/signup`)
    .send(obj)
}
export async function logIn(obj) {
    await request
    .post(`${URL}/login`)
    .send(obj)
}