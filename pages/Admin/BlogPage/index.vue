<template>
  <div>
    <!-- Header box -->
    <div class="bg-white rounded-xl shadow ">
      <div class="flex items-center gap-[25px] pl-[10px]">
        <div class="w-[58%] p-[32px]">
          <div class="bg-[#F7f7f7] px-[32px] py-[30px] rounded-xl">
          <h2 class="text-[24px] mt-3 font-semibold text-gray-800 mb-4">How Can We Help You?</h2>
          <div class="flex items-center border border-gray-300 rounded-lg px-3 py-1 bg-white mb-3">
            <i class="bi bi-search text-[#ff5757] text-lg"></i>
            <input type="text" v-model="query" placeholder="Ask a question"
              class="ml-2  w-full outline-none text-lg border-0 text-gray-700  placeholder-text-[17px] placeholder-gray-400 bg-transparent" />
          </div>
          </div>
          <div
            class="bg-[#F9f9f9] rounded-xl mt-[30px] flex flex-col md:flex-row justify-between items-center px-4  py-3">
            <div class="flex flex-wrap gap-4">
              <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                class="text-[17px] font-semibold px-3 py-1.5 rounded-lg"
                :class="activeTab === tab ? 'text-[#ff5757] bg-[#f1f1f4]' : 'text-gray-600 hover:[#ff5757]'">
                {{ tab }}
              </button>
            </div>
          </div>
        </div>
        <div class="w-[41%]">
          <img src="/public/img/png/imgi_29_focused-office-lady-glasses-using-tablet-while-two.jpg"
            alt="Help Illustration" class="rounded-xl" />
        </div>
      </div>
    </div>
  </div>


  <div class="p-[34px]  rounded-xl shadow-sm mt-4 bg-white">
    <h2 class="text-[22px] font-semibold text-gray-800 mb-6 border-b pb-3">
      Latest Articles, News & Updates
    </h2>

    <div class="flex flex-col gap-6">
      <!-- Featured Article -->
      <div class="mt-4 rounded-lg overflow-hidden  flex flex-col md:flex-row">
        <img src="/public/img/png/Aboutuspage/Abt Sec Img.png" alt="Featured"
          class="w-full md:w-1/2 max-h-[300px] object-cover rounded-lg" />
        <div class="px-5 w-[55%] flex flex-col justify-between">
          <div>
            <div class="flex justify-between">
              <p class="text-md text-gray-400 mb-2">Apr 27, 2022</p>
              <p class="py-0 px-2 rounded-xl bg-[#f8f5ff] text-[#7239EA]">Blog</p>
            </div>
            <h3 class="text-[38px] leading-[52px] font-bold text-gray-900 leading-tight">
              Bootstrap Admin - How To Get Started Tutorial.
            </h3>
            <p class="mt-2 text-gray-600 text-[17px]">
              We’ve been focused on making the from v4 to v5 a but we’ve also not been afraid to step away been focused
              on from v4 to v5 speaker approachable making focused
            </p>
          </div>
          <div class="mt-3 flex items-center text-[18px] text-gray-600">
            <img src="/public/img/png/Aboutuspage/location-frame.png" class="w-[40px] h-[40px] rounded-lg mr-2" />
            <span><strong>Jane Miller</strong> <span class="text-gray-400">Creative Dept</span></span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[55px] mt-[37px]">
        <div v-for="(article, index) in articles" :key="index" class="overflow-hidden">
          <img :src="article.image" class="w-full rounded-lg h-[200px] object-cover" :alt="article.title" />
          <div class="pt-4">
            <h4 class="font-semibold text-gray-800 text-[19px] leading-[27px]">
              {{ article.title }}
            </h4>
            <p class="text-[17px] text-gray-600 mt-1">
              {{ article.description }}
            </p>
            <div class="mt-3 flex justify-between items-center text-gray-400">
              <p>{{ article.date }}</p>
              <p class="py-0 px-2 rounded-xl" :style="{ backgroundColor: article.badgeBg, color: article.badgeText }">
                {{ article.badge }}
              </p>
            </div>
          </div>
        </div>
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
  name: 'HelpCenter',
  data() {
    return {
      query: '',
      imageUrl: 'https://i.imgur.com/3mL3A1g.png',
      tabs: ['OVERVIEW', 'TICKETS', 'TUTORIALS', 'FAQ', 'LICENSES', 'CONTACT US'],
      activeTab: 'OVERVIEW',
      articles: [
        {
          title: "Bootstrap Admin - How To Started the Dashboard Tutorial",
          description:
            "We’ve been focused on making the a from also not been afraid to and step away",
          date: "Apr 27, 2022",
          badge: "TUTORIALS",
          badgeBg: "#F1FAFF",
          badgeText: "#2C9AFF",
          image: "/_nuxt/public/img/png/Aboutuspage/Abt Sec Img.png",
        },
        {
          title: "React Admin - How To Started the Dashboard Tutorial",
          description:
            "We’ve been focused on making the a from also not been afraid to and step",
          date: "Feb 02, 2022",
          badge: "Blog",
          badgeBg: "#f8f5ff",
          badgeText: "#7239EA",
          image: "/_nuxt/public/img/png/Aboutuspage/Abt Sec Img.png",
        },
        {
          title: "Angular Admin - How To Started the Dashboard Tutorial",
          description:
            "We’ve been focused on making the a from great amnd amazing",
          date: "Dec 27, 2021",
          badge: "NEWS",
          badgeBg: "#FCF2E8",
          badgeText: "#E78B2F",
          image: "/_nuxt/public/img/png/Aboutuspage/Abt Sec Img.png",
        },
      ],
    };
  }
};
</script>

<style scoped></style>
