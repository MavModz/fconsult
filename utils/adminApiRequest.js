import axios from 'axios';
import { useNuxtApp } from "#app";
import { errorAlert } from "~/utils/allAlerts.js";

export async function adminRegenerateToken() {
    try {
        const r = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/regenerate-token-admin`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        localStorage.setItem('token', r.data.token);
        let date = new Date();
        date.setTime(date.getTime() + 180 * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + date.toUTCString();
        document.cookie = 'token' + '=' + r.data.token + ';' + expires + ';path=/';

        return { status: true}

    } catch (error) {
        if (error?.response?.status === 401) {
            location.replace('/auth/login')
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            errorAlert('No response received from server');
        } else {

            errorAlert(error?.message);
        }
        throw (new Error("Whoops!"));
    }
}

export async function adminPost(url, data) {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: data
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            location.replace('/auth/login')
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            errorAlert('No response received from server');
        } else {

            errorAlert(error?.message);
        }
        throw (new Error("Whoops!"));
    }
}
export async function adminPut(url, data) {
    try {
        const response = await axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: data
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            location.replace('/auth/login')
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
            return { status: false, error: error.response.data, statusCode: error.response.status };
        } else if (error?.request) {
            errorAlert('No response received from server');
        } else {

            errorAlert(error?.message);
        }
        throw (new Error("Whoops!"));
    }
}
export async function adminPatch(url, data) {
    try {
        const response = await axios.request({
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: data
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            location.replace('/auth/login')
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            errorAlert('No response received from server');
        } else {

            errorAlert(error?.message);
        }
        throw (new Error("Whoops!"));
    }
}

export async function adminGet(url) {
    try {
        const response = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            location.replace('/auth/login')
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            errorAlert('No response received from server');
        } else {

            errorAlert(error?.message);
        }
        throw (new Error("Whoops!"));
    }
}

export async function adminDelete(url) {
    try {
        const response = await axios.request({
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            location.replace('/auth/login')
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
            return { status: false, error: error.response.data, statusCode: error.response.status };
        } else if (error?.request) {
            errorAlert('No response received from server');
            return { status: false, error: 'No response received from server' };
        } else {

            errorAlert(error?.message);
            return { status: false, error: error.message };

        }
        // throw (new Error("Whoops!"));
    }
}