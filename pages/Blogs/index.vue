<template>

  <div class="">
    <div class="wrapper">
      <div class="banner">
        <div class="center" v-if="data && data.length">
          <div class="lft-banner">
            <div class="subtitle">
              <p>Top Immigration Insight</p>
            </div>
            <div class="title-blg">

              <span>{{ data[0].title }}</span>
            </div>
            <div class=" mt-3 blog-user flex ">
              <p class="d-flex">By <span class="horizontal-bar divider w-25 mx-2"></span> {{ data[0].user_id.name }} |
                {{ data[0].date.split('T')[0] }}</p>
            </div>
            <div class="description">{{ getSlicedContent(data[0].html_content, 200) }}
            </div>
            <div class="btn1">
              <NuxtLink class="cursor-pointer" :to="'/blogs/' + data[0].title +'-'+ data[0]._id">
                Read More
              </NuxtLink>
            </div>
          </div>
          <div class="rgt-banner">
            <div class="img">
              <img :src="data[0].cover_image" loading="lazy" width="515" height="359" decoding="async" data-nimg="1"
                style="color: transparent; border-radius: 15px;" />
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="loader-container">
        <div class="loader"></div>
      </div>

      <!-- Display Blogs after loading -->
      <div v-if="!loading && data?.slice(1).length > 0" class="blog">
        <div class="blg-title-2">
          <h1 class="p">Popular Topic</h1>
        </div>
        <div class="ctg">
          <div class="lft-blog">
            <div class="btn-container">
              <span @click="current = 'all'" :class="{ active: current === 'all' }">&nbsp;&nbsp;&nbsp;&nbsp;<span>All
                  Blogs</span></span>
              <span @click="current = i.label" v-for="i in category"
                :class="{ active: current === i.label }">&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ i.label }}</span></span>
            </div>
          </div>
        </div>

        <div class="blg">
          <NuxtLink :to="'/blogs/'+ i.title + '-' + i._id" v-for="i in data.slice(1)" class="semi-blog rounded-xl flex flex-col gap-1"
            v-show="i.category_name == current || current == 'all'">
            <div class="blg-img" :style="`background-image: url(${i.cover_image})`">
              <div class="category">
                <p>{{ i.category_name }}</p>
              </div>
            </div>
            <div class="dt">
              <p>{{ i.date.split('T')[0] }}</p>
            </div>
            <div class="blg-title mt-1">
              <p>{{ getSlicedContent(i.title, 40) }}</p>
            </div>
            <div class="blg-description mt-1">
              <p>{{ getSlicedContent(i.html_content, 75) }}</p>
            </div>
          </NuxtLink>
        </div>

      </div>
      <div v-else>
        <p>No other blogs found!</p>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: 'home',
});
export default {
  data() {
    return {
      data: null,
      category: null,
      current: 'all',
      loading: true, // Initial state is true (loading)
    };
  },
  async mounted() {
    this.loading = true; // Show loader at the start of data fetch

    try {
      // Fetching the blog data
      const responseBlogs = await homeGet('/home-all-blog');
      if (responseBlogs.status) {
        this.data = responseBlogs.data.data;
      }

      // console.log('blog Latest', this.data)

      // Fetching the categories data
      const responseCategories = await homeGet('/home-blog-categories');
      this.category = responseCategories.data.data.map(i => ({ label: i.category_name, value: i._id }));

      // After both requests, hide the loader
      this.loading = false;

    } catch (error) {
      console.error("Error fetching data:", error);
      this.loading = false; // Stop loader even if there's an error
    }
  },

  methods: {

  }
};
</script>

<style scoped>
@import url('./style.css');

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #fc5c7d;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>