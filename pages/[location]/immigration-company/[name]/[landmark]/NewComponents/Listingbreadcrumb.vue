<template>
    <div class="flex items-center gap-[12px] pb-[40px]">
        <NuxtLink to="/" class="text-[#9691A4] font-normal">Home</NuxtLink>
        <img class="w-[5px]" src="/public/img/svg/right_arrow.svg" alt="Arrow" />
        <NuxtLink v-if="storePermMount"
            :to="`/${$route.params.location.replaceAll(' ','-')}/immigration-company/${$route.params.name?.replaceAll(' ', '-')}/${$route.params.landmark?.replaceAll(' ', '-')}/f&c-${this.storePermMount}/${activeTab}`"
            class="text-[#FF5757] font-normal underline breadcrumb-arrow-image"> <span @click="aboutroute()">{{ $route.params.name }}</span><span> <img class="w-[5px]" src="/public/img/svg/right_arrow.svg" alt="Arrow" /></span>{{activeTab}} </NuxtLink>
    </div>
</template>
<script>
export default {
    data() {
        return {
            storeIdMount: null,
            storePermMount: null,
            activeTab: null,
        }
    },
    mounted() {
    const urlSegments = this.$route.fullPath.split('/');
    this.activeTab = urlSegments[urlSegments.length - 2];
        this.storeIdMount = this.$route.params.id;
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
        this.storePermMount = CompanyIdMount;
    },
    methods: {
  aboutroute() {
    const targetPath = `/${this.$route.params.location.replaceAll(' ', '-')}/immigration-company/${this.$route.params.name?.replaceAll(' ', '-')}/${this.$route.params.landmark?.replaceAll(' ', '-')}/f&c-${this.storePermMount}/about-us`;
    this.$router.push(targetPath).then(() => {
      window.location.href = targetPath;
    }).catch(err => {
      console.error("Navigation error:", err);
    });
  }
}

}
</script>
<style>
.breadcrumb-arrow-image{
    display: flex;
    align-items: center;
    column-gap: 10px;
}
</style>