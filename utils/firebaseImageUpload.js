import axios from 'axios';

export async function uploadImage(id, data, pre = "",) {
//     const nuxtApp = useNuxtApp();
//     const app = nuxtApp.$app;
//     const storage = getStorage(app);
//     const u = (await useFetch('/api/users/admin')).data.value;
//     try {
//         const icon_response = await fetch(data);
//         const icon_blob = await icon_response.blob();

//         const mimeType = icon_blob.type;
//         if (!mimeType.startsWith('image/')) {
//             errorAlert('File is not an image.')
//             throw new Error('File is not an image.');
//         }

//         const icon_imageRef = ref(storage, `${u.user.uid}/${pre}_t_${Date.now()}` + '.jpg');
//         await uploadBytes(icon_imageRef, icon_blob);
//         return await getDownloadURL(icon_imageRef);

//     } catch (error) {

//         return null;
//     }
}

export async function uploadImageAdminE2(data,filename="") {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/admin-image-upload`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { file: `${filename}.png`, d2: data }
        });
        return response.data.url

    } catch (error) {

        return null;
    }
}

export async function uploadImageSuperadminAdminE2(id,data,filename="") {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/admin-image-upload/${id}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { file: `${filename}.png`, d2: data }
        });
        return response.data.url

    } catch (error) {

        return null;
    }
}

export async function uploadImageSuperadminE2(data,filename="") {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/superadmin-image-upload`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { file: `${filename}.png`, d2: data }
        });
        return response.data.url

    } catch (error) {
        return null;
    }
}

export async function uploadImageUserE2(data,filename="") {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/user-image-upload`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { file: `${filename}.png`, d2: data }
        });
        return response.data.url

    } catch (error) {
        return null;
    }
}


export async function adminuseruploadImageUserE2(data,filename="") {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/admin-user-image-upload`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { file: `${filename}.png`, d2: data }
        });
        return response.data.url

    } catch (error) {
        return null;
    }
}






export async function resetFileCode() {
    const randomCode = ((Math.floor(100000 + Math.random() * 900000)).toString()) + `_t_${Date.now()}`;
    localStorage.setItem('filecode', randomCode);
}
