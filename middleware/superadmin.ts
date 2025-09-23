export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!useCookie('token').value) {
        return navigateTo('/auth/login')
    }
    const data = (await useFetch('/api/users/admin')).data.value;
    if (data.user.role != 'Superadmin') {
        return navigateTo('/ExtraPages/unauthorizedSuperadmin')
    }
})