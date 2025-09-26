<template></template>

<script setup lang="ts">
import { useOneTap, type CredentialResponse, decodeCredential } from "vue3-google-signin";

useOneTap({
  disableAutomaticPrompt: false, // Enable automatic One Tap prompt
  onSuccess: (response: CredentialResponse) => {
    handleLoginSuccess(response);
  },
  onError: (error) => {
    console.error("One Tap Login Failed:", error);
  },
});
async function handleLoginSuccess(response: any) {
  const { credential } = response;
  const decodedCredential = decodeCredential(credential);
  await callback({ ...decodedCredential });
};
async function callback(userData: { email: string; name: string }) {

  const data = {
    email: userData.email,
    name: userData.name,
  };
  await homePost('/google-signin', data).then(r => {
    localStorage.setItem("token", r.data.token);
    useNuxtApp().token = r.data.token
    setCookie('token', r.data.token, 180);
    if (r.data.isUser) {
      window.location.href=(`/${r.data.user.role.toLowerCase()}/dashboard`)
    } else {
      window.location.href=(`/${r.data.user.role.toLowerCase()}/profile?newUser=true`)
    }
    // location.replace('/');
  }).catch(error => {
    console.error(error)
  });

};

function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  let expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
</script>
