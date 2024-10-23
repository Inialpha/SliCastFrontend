import { getCookie } from './cookieManager'

export const postRequest = async (url: string, data: object) => {
    const cookie = getCookie('login_token')
    const headers = new Headers({
        'Content-Type': 'application/json',
	'Authorization': cookie || '',
    });
    const response = await fetch(url, {
	body: JSON.stringify(data),
	method: 'POST',
	headers
    });
    return response;
}
