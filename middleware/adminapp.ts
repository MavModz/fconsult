export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!useCookie('token').value) {
        return navigateTo('/auth/login')
    }
    const data = (await useFetch('/api/users/admin')).data.value;
    if (data.user.role != 'Admin') {
        return navigateTo('/ExtraPages/unauthorizedAdmin')
    }
    if (!data.user.plan.app) {
        return navigateTo('/admin/explorePlan')
    }
    useState('userData', () => data);
})