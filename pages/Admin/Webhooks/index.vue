<!-- @format -->

<template>
    <div class="achievers-screen">

        <div class="row m-3">
            <div class="col-sm-3 mb-sm-0 ">

                <NuxtLink to="/admin/Webhooks/Facebook">
                    <div class="card mb-4 shadow shadow-xs divhover">
                        <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png"
                        alt="image" />
                        <div class="card-img-overlay">
                            <div class="achiever_details">
                                <h4>Facebook</h4>
                            </div>
                        </div>
                    </div>
                </NuxtLink>

            </div>
        </div>
    </div>
</template>

<script>
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});

export default {
    data() {
        return {
        };
    },
    async mounted() {
        activateSubmenu('l4', 'All Webhooks');
    },
    methods: {


    },
};
</script>

<style scoped>
@import url('./style.css');
</style>