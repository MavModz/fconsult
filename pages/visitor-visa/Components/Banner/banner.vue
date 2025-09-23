<!-- @format -->

<template>
  <div class="app-banner-section mb-20 mt-20">
    <!-- <div class="container"> -->
    <div class="app-banner-section-inner">
      <div class="d-flex align-items-center">
        <div class="col-md-6">
          <div class="app-banner-content-left">
            <h2 class="mb-3  text-[24px] sm:text-[18px] md:text-[26px] lg:text-[32px] cstm-banner-fntsz">You can Have your Own App</h2>
            <p style="color: #666276;" class="mb-5">Download the app and go to travel the world!</p>
            <button class="site-btn-2 bg-[#ff5757!important]">
              Get Your Own App
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="app-banner-content-right">
            <a href="#"
              ><img src="/img/png/adds.png" alt="mobile-app"
            /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'BannerAdvertisement',
};
</script>
<style scoped>
.app-banner-section {
  width: 95%;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 60px;
}

@media screen and (max-width: 767px) {
  .app-banner-section {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .app-banner-section-inner .app-banner-content-left p {
    font-size: 14px !important;
}
.app-banner-section-inner .app-banner-content-left button {
    font-size: 14px !important;
    padding: 8px 11px !important;
}
}
@media screen and (max-width: 639px) {
.cstm-banner-fntsz{
font-size: 18px !important;
}
.app-banner-section-inner .app-banner-content-left {
    padding-inline-start: 16px !important;
}
}
@media screen and (max-width: 543px) {
    .app-banner-section-inner .app-banner-content-left button {
        font-size: 12px !important;
        padding: 7px 9px !important;
    }
    .app-banner-section-inner .app-banner-content-right {
    padding-inline-end: 8px !important;
    width: 208px;
}
}
@media screen and (max-width: 360px) {
    .app-banner-section-inner .app-banner-content-right {
    padding-inline-end: 8px !important;
    width: 180px;
}
.app-banner-section-inner .app-banner-content-left button {
        font-size: 10px !important;
    }
}
@media screen and (max-width: 480px) {
  .app-banner-section {
    padding-top: 25px;
    padding-bottom: 25px;
  }
}

body,
html {
  overflow-x: hidden;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
  line-height: normal;
}

:root {
  --red-tone: #ff5757;
  --gray-clr: #454056;
  --transition: all 0.5s ease-in-out;
  --navy-dark: #1f1b2d;
  --light-grey: #666276;
}

img {
  max-width: 100%;
}

a {
  text-decoration: none;
}

.mb-124 {
  margin-bottom: 124px;
}

.site-btn-1,
.site-btn-2 {
  font-weight: 600;
  border: none;
  font-size: 14px;
  padding: 8px 20px;
  transition: var(--transition);
  border-radius: 25px;
  display: inline-block;
  border: 1px solid transparent;
  position: relative;
  z-index: 0;
  overflow: hidden;
}

.site-btn-1 {
  background-color: transparent;
  color: var(--red-tone);
}

.site-btn-1:hover,
.site-btn-2:hover {
  color: #fff;
  background-color: #f22c15;
}

.site-btn-2 {
  background-color: var(--red-tone);
  color: #fff;
}

.app-banner-section-inner {
  background: linear-gradient(
    81.8deg,
    rgba(242, 60, 60, 0.15) 9.52%,
    rgba(242, 60, 60, 0.1) 67.4%
  );
  border-radius: 12px;
}

.app-banner-section-inner .app-banner-content-left {
  padding-inline-start: 64px;
}

.app-banner-section-inner .app-banner-content-right {
  padding-inline-end: 24px;
}

.app-banner-section-inner .app-banner-content-left h2 {
  color: #f22c15;
  font-weight: 700;
}

.app-banner-section-inner .app-banner-content-left p {
  font-size: 18px;
  color: var(--light-grey);
  font-weight: 400;
}

.app-banner-section-inner .app-banner-content-left button {
  font-size: 18px;
  padding: 10px 26px;
  border-radius: 35px;
  margin-bottom: 10px;
}

.download-app-section-inner {
  max-width: 1093px;
  margin-inline: auto;
}

.download-app-section-inner .download-app-content h2 {
  font-size: 48px;
  font-weight: 700;
  line-height: 57px;
  letter-spacing: 0.5px;
  color: #11142d;
  margin-block-end: 22px;
}

.download-app-section-inner .download-app-content p {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #92929d;
}

@media screen and (max-width:500px){
  .app-banner-section-inner .app-banner-content-left button {
  font-size: 16px;
  padding: 8px 22px;

}
}
</style>
