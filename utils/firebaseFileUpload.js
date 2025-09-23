import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

export async function uploadFile(id, data, pre = "") {
    const nuxtApp = useNuxtApp();
    const app = nuxtApp.$app;
    const storage = getStorage(app);
    const u = (await useFetch('/api/users/admin')).data.value;

    try {
        const icon_imageRef = ref(storage, `${u.user.uid}/${pre}_t` + Date.now());
        const icon_response = await fetch(data);
        const icon_blob = await icon_response.blob();
        await uploadBytes(icon_imageRef, icon_blob);
        return await getDownloadURL(icon_imageRef)
    } catch (error) {
        return null
    }
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);  // Get base64 data only (without "data:image/png;base64,")
        reader.onerror = reject;
        reader.readAsDataURL(file);  // Read the file as a data URL
    });
}

export async function uploadFileAdminE2(data, filename = "") {
    try {
        const base64Data = await convertToBase64(data);
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/admin-file-upload`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { file: `${filename}`, d2: base64Data }
        });
        return response.data.url

    } catch (error) {
        return null;
    }
}

export async function uploadFileUserLeadE2(data, filename = "") {
    try {
        const base64Data = await convertToBase64(data);
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${useRuntimeConfig().public.API_URL}/userlead-file-upload`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { file: `${filename}`, d2: base64Data }
        });
        return response.data.url

    } catch (error) {
        return null;
    }
}

export async function uploadCsvToFirebase(file) {
    try {
        // ✅ Define storage first
        const storage = getStorage();  // If you initialized Firebase using `initializeApp(...)` globally

        const storageRef = ref(storage, `csv-uploads/${file.name}`);

        // Upload file
        const result = await uploadBytes(storageRef, file);
   
        console.log('storageRef', storageRef)
        const a = await uploadBytes(storageRef, file);
   
        // Get downloadable URL
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;
    } catch (error) {
        console.error("CSV upload failed:", error);
        return null;
    }
}




