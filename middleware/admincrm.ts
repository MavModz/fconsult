export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!useCookie('token').value) {
        return navigateTo('/auth/login')
    }
    const data = (await useFetch('/api/users/admin')).data.value;
    if (data.user.role != 'Admin') {
        return navigateTo('/ExtraPages/unauthorizedAdmin')
    }

    function isDateExpired(end: string | number | Date) {
        const now = new Date();
        const endTime = new Date(end);
        return now >= endTime;
    }
    if (!data.user.plan.crm && isDateExpired(data.user.plan.crm.end)) {
        return navigateTo('/admin/explorePlan')
    }
    useState('userData', () => data);
})