<template>
  <div>
    <!-- Conditionally render Google Sign-In button -->
    <div v-if="!isLoggedIn" id="google-signin-button"></div>

    <!-- Display logout button once logged in -->
    <button v-if="isLoggedIn" @click="handleLogout">Logout</button>
  </div>

  <GoogleSignInButton @success="handleLoginSuccess" />
  <div class="card flex justify-content-center">
    <Dialog v-model:visible="visible" modal :closable="false">
      <div class="card flex justify-content-center">
        <ProgressSpinner />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from "vue3-google-signin";
import { GoogleSignInButton, decodeCredential } from "vue3-google-signin";
import { onMounted, ref } from 'vue';
</script>


<script lang="ts">
import type { CredentialResponse } from "vue3-google-signin";
import { GoogleSignInButton, decodeCredential } from "vue3-google-signin";
import { ref } from 'vue';

export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    async handleLoginSuccess(response: any) {
      const { credential } = response;
      const decodedCredential = decodeCredential(credential);
      await this.callback({ ...decodedCredential });
    },
    async callback(userData: { email: string; name: string }) {

      const data = {
        email: userData.email,
        name: userData.name,
      };
      // await this.login(data)

      this.visible = true
      await homePost('/google-signin', data).then(r => {
        localStorage.setItem("token", r.data.token);
        useNuxtApp().token = r.data.token
        this.setCookie('token', r.data.token, 180);


        if (this.$route.query.fromaddlisting) {
          const role = r.data.user.role || '';
          if (role === 'Admin') {
            // Redirect Admin to Categories
            this.$router.replace('/admin/categories');
          } else {
            // Redirect other users to their profile
            if(r?.data?.isUser) {
              this.$router.replace('/user/profile');
            } else {
              this.$router.replace(`/${role.toLowerCase()}/profile?newUser=true`);
            }
          }
        } else {
          // Handle default redirection for new and existing users
          if (r.data.isUser) {
            this.$router.replace(`/${r.data.user.role.toLowerCase()}/dashboard`);
          } else {
            this.$router.replace(`/${r.data.user.role.toLowerCase()}/profile?newUser=true`);
          }
        }

        // if (r.data.isUser) {
        //   this.$router.replace(`/${r.data.user.role.toLowerCase()}/dashboard`)
        // } else {
        //   this.$router.replace(`/${r.data.user.role.toLowerCase()}/profile?newUser=true`)
        // }
        // location.replace('/');
      }).catch(error => {
        console.error(error)
      });
      this.visible = false

    },

    setCookie(name, value, days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      let expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },

  }
}
</script>
