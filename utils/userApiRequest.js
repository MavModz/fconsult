import axios from 'axios';
import { useNuxtApp } from "#app";
import { errorAlert } from "~/utils/allAlerts.js";
// const nuxt=useNuxtApp()

export async function userPost(url, data) {
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


export async function userGet(url) {
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

export async function userDelete(url) {
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
        } else if (error?.request) {
            errorAlert('No response received from server');
        } else {

            errorAlert(error?.message);
        }
        throw (new Error("Whoops!"));
    }
}

export async function userPut(url, data) {
    try {
        const response = await axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json' 
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

export async function userPatch(url, data) {
    try {
        const response = await axios.request({
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
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