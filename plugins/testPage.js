import AdminGuide from '~/content/AdminGuide.json'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        if(useRoute().fullPath.split("/")[1]=='admin'){
            useNuxtApp().guide=AdminGuide[useRoute().fullPath.split("/")[2]]
        }
    });
});
