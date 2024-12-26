import { getCookie } from './cookieManager'

export const postRequest = async (url: string, data: object) => {
    const cookie = getCookie('token')
    const headers = new Headers({
        'Content-Type': 'application/json',
	'Authorization': `Token ${cookie || ''}`,
    });
    const response = await fetch(url, {
	body: JSON.stringify(data),
	method: 'POST',
	headers
    });
    return response;
}

export const postFormData = async (url: string, formData: object) => {
    const cookie = getCookie('token')
    const headers = new Headers({
        'Authorization': `Token ${cookie || ''}`,
    });
    const response = await fetch(url, {
        body: formData,
	method: 'POST',
	headers
    });
    return response;
}

export const putFormData = async (url: string, formData: object) => {
    const cookie = getCookie('token')
    const headers = new Headers({
	'Authorization': `Token ${cookie || ''}`,
    });
    const response = await fetch(url, {
	body: formData,
	method: 'PATCH',
	headers,
    });
    return response;
}
export const getRequest = async (url: string) => {
    const cookie = getCookie('token');
    const headers = new Headers({
        'Authorization': `Token ${cookie || ''}`,
    });
    const response = await fetch(url, {
        method: 'GET',
        headers
    });
    return response;
}

export const getUser = async () => {
    const url = `${import.meta.env.VITE_API_URL}/users/profile/`;
    const cookie = getCookie('token')
    const headers = new Headers({
        'Authorization': `Token ${cookie || ''}`,
    });
    const response = await fetch(url, {
        method: 'GET',
        headers
    });
    return response;
}

export const getAuthors = async (podcastId: string[]) => {
    const url = `${import.meta.env.VITE_API_URL}/authours/${podcastId}`;
    const cookie = getCookie('token')
    const headers = new Headers({
        'Authorization': `Token ${cookie || ''}`,
    });
    const response = await fetch(url, {
	method: 'GET',
	headers
    });
    return response;
}
