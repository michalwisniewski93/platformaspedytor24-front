import http, { setAccessToken } from './http';

export async function login(loginStr, password) {
    const { data } = await http.post('/login', { login: loginStr, password });
    if (data && data.accessToken) setAccessToken(data.accessToken);
    return data && data.user ? data.user : null;
}

export async function logout() {
    await http.post('/logout');
    setAccessToken(null);
}