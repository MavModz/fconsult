<template>

  <div class=" bg-[#ffffff]  blog-first-container">

    <div v-if="blogdata && blogdata?.length > 0" class="homepage-blog-container pt-1  m-auto w-[90%]">
      <div class="text-center my-3 pt-3 ">
        <span class="text-[#ff5757] uppercase mt-[5px] text-[14px]">Expert Insights</span>
        <h3 class="text-[24px] font-[600]">Explore Our Latest Articles</h3>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 mb-4" v-if="blogdata?.length > 0">
          <div class="p-4 border border-[#d7dce7] bg-white" style="border-radius: 30px;">
            <div class="d-flex align-items-center justify-content-center" style="border-radius: 30px;">
              <img :src="blogdata[0].cover_image" class="w-100 h-100 object-cover " style="border-radius: 30px;" />
            </div>
            <div>
              <span class="text-[#ff5757] font-normal text-[15px] leading-[19px] pt-[10px]">{{
                formatDateinString(blogdata[0].date) }}</span><br />
              <br />
              <span class="text-[#000000] font-semibold text-[18px] leading-[25px] mt-2"> {{
                getSlicedContent(blogdata[0].title,50) }}</span><br />
              <span class="text-[#44525e] font-normal text-[16px] leading-[25px] pt-[8px]">
                {{ getSlicedContent(blogdata[0].html_content, 80) }}</span><br />
              <span class="pt-[11px] cursor-pointer font-[600]">
                <NuxtLink
                  :to="blogdata[0].role === 'Superadmin'
                    ? '/blogs/' + blogdata[0].title + '-' + blogdata[0]._id
                    : blogdata[0]?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + blogdata[0]?.company_id?.company_name?.replaceAll(' ', '-') + '/' + blogdata[0]?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + blogdata[0]?.company_id?._id + '/Blog/' + blogdata[0]?.title + '/' + blogdata[0]._id"
                  class="card-img-top cursor-pointer">
                  Read More →
                </NuxtLink>
                <!-- <a href="#" class="text-[#000000] text-[16px] font-semibold">Read More →</a> -->
              </span>
            </div>
          </div>
        </div>


        <div class="col-12 col-md-6">
          <div v-for="(blog, index) in blogdata.slice(1, 4)" :key="index"
            class="mb-4 sm:m-3 flex flex-col sm:flex-row p-3 border border-[#d7dce7] bg-white gap-3"
            style="border-radius: 25px; margin-top: 0 !important;">
            <div class="w-full md:w-1/3 content-center" style="border-radius: 20px;">
              <div class=" text-white d-flex align-items-center justify-content-center h-[120px]"
                style="padding-left:0px !important ; border-radius: 20px;">
                <img :src="blog.cover_image" class="w-100 h-100 object-cover" style="border-radius: 20px;" />
              </div>
            </div>
            <div class="w-full md:w-2/3">
              <span class="text-[#ff5757] font-normal text-[15px] leading-[19px]">{{ formatDateinString(blog.date)
                }}</span><br />
              <span class="text-[#000000] font-semibold text-[18px] leading-[25px] mt-2"> {{
                getSlicedContent(blog.title,50) }}</span><br />
              <span class="pt-[35px] cursor-pointer">
                <NuxtLink
                  :to="blog.role === 'Superadmin'
                    ? '/blogs/'+ blogdata[0].title +'-' + blogdata[0]._id
                    : blog?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + blog?.company_id?.company_name?.replaceAll(' ', '-') + '/' + blog?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + blog?.company_id?._id + '/about-us'"
                  class="card-img-top cursor-pointer">
                  Read More →
                </NuxtLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import url("./style.css");
</style>

<script>
export default {
  data() {
    return {
      // data: [],
    };
  },

  props: {
    blogdata: Array
  },
  methods: {

  },
};
</script>