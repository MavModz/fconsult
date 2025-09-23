import axios from 'axios';
import { errorAlert } from "~/utils/allAlerts.js";

export async function homePost(url, data) {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            data: data
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            
            errorAlert('No response received from server');
        } else {
            
            errorAlert(error?.message);
        }
        return { status: false };
    }
}


export async function homePostAuth(url, data) {
    try {
        const nuxt = useNuxtApp()
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${nuxt.token}`
            },
            data: data
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            return
        }
        if (error?.response) {
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            
            errorAlert('No response received from server');
        } else {
            
            errorAlert(error?.message);
        }
        return { status: false };
    }
}

export async function homeGet(url) {
    try {
        const response = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
        });
        return { status: true, data: response.data }

    } catch (error) {
        if (error?.response?.status === 401) {
            return
        }
        if (error?.response) {
            
            
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            
            errorAlert('No response received from server');
        } else {
            
            errorAlert(error?.message);
        }
        return { status: false };
    }
}

export async function homePut(url,data) {
    try {
        const response = await axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}${url}`,
            data: data
        });
        return {status:true,data:response.data}

    } catch (error) {
        if (error?.response?.status===401){
            return
        }
        if (error?.response) {
            
            
            errorAlert(error?.response?.data.msg || error?.message);
        } else if (error?.request) {
            
            errorAlert('No response received from server');
        } else {
            
            errorAlert(error?.message);
        }
        return { status: false };
    }
}

export async function homeGetSSR(url) {
    try {
        const apiBase = useRuntimeConfig().public.API_URL; 

        const { data, error } = await useFetch(`${apiBase}${url}`, {
            method: "GET",
            key: url,
            server: true,
        });

        if (error.value) {
            console.error("❌ SSR Fetch Error:", error.value);
            throw new Error(error.value?.message || "Unknown error");
        }

        return data.value;
    } catch (err) {
        console.error("❌ homeGetSSR Error:", err);
        throw new Error(err.message || "API request failed");
    }
}
