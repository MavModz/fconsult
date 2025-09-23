export default defineNuxtRouteMiddleware(async (to, from) => {

    const d=((await useFetch('/api/users/admin')).data).value

    if(d.user.status.status!=='active'){
        return navigateTo('/ExtraPages/unauthorizedAdmin')
    }
    useState('userData', () => d);
    
})