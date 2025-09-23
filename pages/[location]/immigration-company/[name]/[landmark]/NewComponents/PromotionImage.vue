<template>
    <main>
        <div class="visa-banner-section-box sponsored-ads" data-nosnippet>
            <img src="/img/svg/visa-banner-inside.svg" alt="Visa Banner" />
        </div>
    </main>

</template>



<script>

export default {
    components: {
    },
    data() {
        return {
       
        };
    },

};
</script>

<style scoped>
.visa-banner-section-box{
    margin-block-start: 25px;
    width: 100%;
    height: 500px;
}
.visa-banner-section-box img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
@media (max-width: 1199px) {
.visa-banner-section-box{
  height: 400px;
}
}
@media (max-width: 1024px) {
.visa-banner-section-box{
  height: 400px;
}
}
@media (max-width: 374px) {
.visa-banner-section-box{
  height: 330px;
}
}
</style>