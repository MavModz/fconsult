<template>
  <GoogleSignInButton @success="handleLoginSuccess"/>
</template>

<script lang="ts">
import type { CredentialResponse } from "vue3-google-signin";
import { GoogleSignInButton, decodeCredential } from "vue3-google-signin";
import { ref } from 'vue';


export default {
  methods:{
    async handleLoginSuccess(response:any){
      const { credential } = response;
      const decodedCredential = decodeCredential(credential);
      await this.callback({ ...decodedCredential });
    },
    async callback(userData: { email: string; name: string }) {

      const data = {
        email: userData.email,
        name: userData.name,
        enrolled: {
          type: "Google",
          company_id: "Web",
          password: "null",
        },
      };
      await this.login(data)
    },

    async login(v:any){
      // await axiosInstance.post('/login', v).then(response => {
      //   localStorage.setItem("token", response.data.token);
      //   updateUserData()
      //   if(response.data.user.enrolled[0].role=="Admin"){
      //     updateCompanyData()
      //   }
      //   this.$router.replace('/');
      //   return true
      // }).catch(error => {
      //   this.register(v)
      //   return false
      // });
    },

    async register(v:any){
      // await axiosInstance.post('/register', v).then(response => {
      //   this.login(v)
      // }).catch(error => {
      //   this.login(v)
      // });
    }

  }
}
</script>

