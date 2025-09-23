<template>

</template>
<script>
export default {
    mounted() {
        if (this.$route.query.token) {
            localStorage.setItem('token', this.$route.query.token);
            this.setCookie('token', this.$route.query.token, 180);
            this.$router.push('/admin/dashboard')
        }
    },
    methods: {
        setCookie(name, value, days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            let expires = 'expires=' + date.toUTCString();
            document.cookie = name + '=' + value + ';' + expires + ';path=/';
        },
    }
}
</script>