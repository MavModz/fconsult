<!-- @format -->

<template>
  <section class="category-section">
    <div class="container webkit-center">
      <div class="row justify-content-center slider_blog">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-lg-4 col-sm-6"
        >
          <div class="card border border-0 m-3">
            <div class="category-box" @click="navigateTo(item.word)">
              <a href="#">
                <div class="category-box-icon">
                  <img :src="item.icon" />
                </div>
                <div class="category-box-content">
                  <h5>{{ item.name }}</h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel';
import $ from 'jquery';

export default {
  data() {
    return {
      items: [
        {
          name: 'Permanent Residency',
          word: 'Permanent Residency',
          icon: 'img/category-icon-1.svg',
        },
        {
          name: 'Business Visa',
          word: 'Business Visa',
          icon: 'img/category-icon-2.svg',
        },
        {
          name: 'Investment Visa',
          word: 'Investment Visa',
          icon: 'img/category-icon-3.svg',
        },
        {
          name: 'Study Visa',
          word: 'Study Visa',
          icon: 'img/category-icon-4.svg',
        },
        {
          name: 'Tourist Visa',
          word: 'Tourist Visa',
          icon: 'img/category-icon-5.svg',
        },
        {
          name: 'Work Visa',
          word: 'Work Visa',
          icon: 'img/category-icon-5.svg',
        },
        {
          name: 'Employment Visa',
          word: 'Employment Visa',
          icon: 'img/category-icon-5.svg',
        },
      ],
    };
  },
  methods: {
    navigateTo(word) {
      this.$router.push({ name: 'search', params: { word } });
    },
    initCarousel() {
      try {
        $('.slider_blog').slick({
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      } catch (e) {
        
      }
    },
  },
  mounted() {
    this.initCarousel();
  },
};
</script>
