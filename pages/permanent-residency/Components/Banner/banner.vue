<template>
  <div class="app-banner-section mb-20 mt-20  ">
    <div class="app-banner-section-inner h-[396px] w-[95%] m-auto flex bg-[#29292a] rounded-2xl flex-wrap">
      
      <!-- Left Side: Centered Content with Left-Aligned Text -->
      <div class="w-full md:w-1/2 h-[396px] flex items-center justify-center">
        <div class="adds-left-section text-left max-w-[600px] w-full px-6">
          <h2 class="text-[#ff5757] text-[40px] leading-[120%] font-bold font-[Caveat] tracking-[1.223px] mb-[16px]">
            Find The Best
          </h2>
          <p class="text-white text-[51px] leading-[120%] font-bold font-[Jost] tracking-[1.223px] mb-[10px]">
            PR Visa Consultants
          </p>
          <p class="text-white opacity-60 text-[39px] leading-[120%] font-bold font-[Jost] tracking-[1.223px] uppercase">
            Near You <i class="pi pi-arrow-up-right"></i>
          </p>
        </div>
      </div>

      <!-- Right Side: Image (Hidden on small screens) -->
      <div class="hidden md:flex w-full md:w-1/2 h-[396px] items-center justify-center">
        <img src="/img/png/Adds/PR.png" alt="mobile-app" class="h-full object-contain" />
      </div>

    </div>
  </div>
</template>




<script>
export default {
  name: 'BannerAdvertisement',
};
</script>

<style scoped>
@media (max-width:1024px) {
  .adds-left-section {
    margin-left: 25px;
   
  }
}
@media (max-width:500px) {
 
  .adds-left-section {
    margin:auto;

  }
  .adds-left-section p{
    text-align: center;
  }
  .adds-left-section h2{
    text-align: center;
  }

}
</style>
