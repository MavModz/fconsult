<template>
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PL2DGBLK" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript>

  <NuxtLoadingIndicator />
  <NuxtLayout>
    <Toast />
    <ConfirmDialog :draggable="false" style="width: 330px !important;"></ConfirmDialog>
    <NuxtPage />
  </NuxtLayout>

  <!-- Button trigger modal -->
  <button id="someoneelselogout" type="button" class="btn btn-primary" data-bs-toggle="modal"
    data-bs-target="#exampleModal" hidden>
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title fs-5" id="exampleModalLabel">Log Out</p>
        </div>
        <div class="modal-body">
          Someone else logged in!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="logout">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import 'primeicons/primeicons.css';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

const router = useRouter();

useHead({
  link: [
    { rel: 'stylesheet', href: '/css/bootstrap/style.css' }
  ],
  script: [
    { src: '/js/bootstrap/script.js', body: true }
  ]
});

watch(
  () => router.currentRoute.value,
  async () => {
    await nextTick();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

);


</script>

<script>
export default {
  async mounted() {
    this.checkRefresh();
    window.addEventListener("storage", (event) => {
      if (event.key === "refreshed") {
        this.logout(); // Trigger logout in all tabs
      }
    });
  },
  methods: {
    // async logout() {
    //   localStorage.clear();
    //   document.cookie.split(";").forEach((cookie) => {
    //     document.cookie = cookie.replace(
    //       /=.*/,
    //       "=;expires=" + new Date().toUTCString() + ";path=/"
    //     );
    //   });
    //   location.replace("/");
    // },
    async logout() {
      const keepKeys = ["la", "lo", "city"];

      // ✅ --- LocalStorage ---
      const keepLocal = {}; // plain object
      keepKeys.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value !== null) {
          keepLocal[key] = value;
        }
      });

      localStorage.clear();

      Object.entries(keepLocal).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      // ✅ --- Cookies ---
      const cookies = document.cookie.split(";");

      cookies.forEach((cookie) => {
        const [rawName] = cookie.split("=");
        const name = rawName.trim();

        if (!keepKeys.includes(name)) {
          document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
        }
      });

      // ✅ Redirect to homepage
      location.replace("/");
    },



    checkRefresh() {
      const refreshed = localStorage.getItem("refreshed");
      if (refreshed) {
        localStorage.removeItem("refreshed");
        this.logout(); // Only logs out if the "someone else login" happened
      }
    }
  },


};
</script>

<style>
@import url('./public/css/primevue/style.css');
@import url('./public/css/AppCss/cropper.css');
@import url('./public/css/AppCss/formkitCustom.css');
@import url('./public/css/AppCss/icon.css');
@import url('./public/css/AppCss/primeVueCustom.css');
@import url('./public/css/AppCss/font.css');
@import url('./public/css/AppCss/style.css');
</style>
