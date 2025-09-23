<!-- @format -->

<template>
  <!-- This is Single Blog Page {{ $route.params.id }} -->
  <div class="wrapper">
    <div class="banner1">
      <img alt="Default Image" loading="lazy" width="260" height="249" decoding="async" data-nimg="1"
        :src="blog.cover_image" />
    </div>
    <div class="content-blg mt-3">
      <div class="contentarea ml-5">
        <div class="mb-2 blg-ttiles">
          <p>{{ blog.title }}</p>
        </div>
        <div class=" mt-3 blog-user flex ">
          <p class="d-flex">by <span class="horizontal-bar divider w-25 mx-2"></span> {{ blog.user_id.name }}</p>
        </div>
        <div class="blog-p-content">
          <div class="blog-paragraph-html-editor-content" v-html="blog.html_content"></div>
        </div>
      </div>
      <div class="second-blog-cont gap-[25px]">
        <!-- <div class="h-[100px] flex flex-col justify-between">
          <span class="text-[#121416] font-semibold">Follow Us</span>
          <div class="flex justify-between w-[270px]">
            <span class="flex flex-col gap-2"><img src="/img/svg/facebooks.svg
              " alt="" class="w-[22px]" /></span>
            <span class="flex flex-col gap-2"><img src="/img/svg/twitters.svg" alt="" /></span>
            <span class="flex flex-col gap-2"><img src="/img/svg/instagram.svg" alt="" class="w-[22px]" /></span>
            <span class="flex flex-col gap-2"><img src="/img/svg/pinintrest.svg" alt="" class="w-[22px]" /></span>
            <span class="flex flex-col gap-2"><img src="/img/svg/youtube.svg" alt="" /></span>
          </div>
        </div> -->
        <div class="bg-[#3C3C3C] p-[20px] rounded-lg w-[320px]">
          <div class="text-center py-3">
            <span class="text-[#F5FFF7] font-bold">The Latest</span>
          </div>
          <div v-for="(i, index) in latestblog" :key="index" class="bg-white text-black p-[15px] rounded-sm mb-4">
            <NuxtLink class="text-[#121416] font-semibold text-[12px]" :to="'/blogs/' + i._id">
              {{ i.title }}
            </NuxtLink>
            <div class="flex mt-3 justify-between">
              <span class="text-[#121416CF] font-normal text-[12px]">{{ new Date(i.date).toLocaleString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric' }) }}
              </span><span></span><span class="horizontal-bar divider"></span><span
                class="text-[#121416CF] font-normal text-[12px] flex"><img src="/img/svg/halfclock.svg"
                  alt="" />&nbsp;{{ i.date.split('T')[1].substring(0, 5) }}
                read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-blg-down py-lg-5 py-2">
    <div class="title-3 mb-[10px] text-[30px]">
      <h1 clas="blogs-detyouma">You May Like this too</h1>
    </div>
    <div class="recent-blogs ">
      <div class="blg">
        <NuxtLink :to="'/blogs/'+ i.title+ '-' + i._id" v-for="i in data" class="semi-blog rounded-xl flex flex-col gap-1">
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
      latestblog: null,
    };
  },
  async setup() {
    const route = useRoute();
   const id= route.params.id.split("-")
    let blog = (await homeGet(`/home-view-blogs/${id[1]}`)).data.data;

    return { blog };
  },
  async mounted() {
    const route = useRoute();
    await this.latestBlgs();
     const id= route.params.id.split("-")
    await homeGet(`/home-random-blog/${this.blog.service_name
      }/${id[1]}`).then((response) => {
        if (response.status) {
          this.data = response.data.data;
        }
      });
  },
  methods: {
    async latestBlgs() {
      const res = await homeGet(`/home-latest-blog`)
      this.latestblog = res.data.data
    }
  }
};
</script>

<style scoped>
@import url('./id.css');

.horizontal-bar {
  border: 1px solid;
  height: fit-content;
  width: 10%;
  margin: auto;
}

.blogs-detyouma {
  font-size: 25px;
  font-weight: bold;
  padding-block-end: 15px;
}
</style>
