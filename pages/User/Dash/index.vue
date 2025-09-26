<template>
  <div class="flex items-start gap-[20px] md:gap-[27px] md:flex-nowrap flex-wrap">
    <div class="md:w-[55%] xl:w-[62%] 2xl:w-[66%] w-[100%]">
      <div
        class=" mb-[20px] md:mb-[28px] xl:p-[35px] md:p-[22px] p-[17px] lg:p-[26px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
        <div class="mb-4 border-b-[2px] border-[#ededed]">
          <h2 class="text-[20px] font-semibold text-[#282823] flex items-center gap-2">
            👋 Hi, {{ userdata?.name }}
          </h2>
          <p class="text-[16px] text-[#807C8D]">Welcome to Find and Consult</p>
        </div>
        <div class="rounded-lg overflow-hidden">
          <div class="relative w-full  h-[240px] sm:h-[300px] lg:h-[400px] xl:h-[500px]">
            <iframe class="absolute top-0 left-0 w-full h-full rounded-lg"
              :src="`https://www.youtube.com/embed/${selectedVideo.id}`" title="Welcome Video" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
      <div class="md:px-[26px] sm:px-[24px] px-[17px] py-[22px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
        <div class="flex items-center justify-between mb-4 pb-3 border-b-[2px] border-[#ededed]">
          <div class="text-[21px] font-semibold text-[#282823]">Section Title</div>
          <a href="#" class="text-[18px] font-medium text-[#6B7280] flex items-center gap-1">
            View All <i class="bi bi-arrow-up-right xl"></i>
          </a>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-[22px]">
          <div v-for="(video, index) in videos" :key="index"
            class="flex items-center gap-3  p-[11px] md:p-[16px] border-[1px] border-[#EDEDED] rounded-[8px] cursor-pointer hover:bg-[#f9f9f9]"
            @click="selectedVideo = video">
            <div class="w-[70px] h-[70px] flex-shrink-0 overflow-hidden rounded-[12px]">
              <iframe :src="`https://www.youtube.com/embed/${video.id}`" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen class="w-full h-full pointer-events-none"></iframe>
            </div>
            <div>
              <span class="font-bold text-[#150A33] text-[16px]">{{ video.title }}</span>
              <p class="text-[14px] text-[#524B6B] mt-1 mb-0">{{ video.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="2xl:w-[31%] xl:w-[35%] md:w-[41%] w-[100%]">
      <div
        class="py-[19px] px-[17px] md:px-[25px] bg-white rounded-[12px]  border-[2px] border-[#ededed]  gap-[20px] mb-[20px] md:mb-[28px]">
        <div class="flex justify-center flex-col items-center mb-3">
          <div class="flex flex-col items-center">
            <img :src="userdata?.profile_image" alt="Avatar" class="w-[58px] h-[58px] mb-3 rounded-full" />
            <div>
              <div class="flex items-center gap-2">
                <i class="bi bi-box-arrow-up-right text-[#ff5757]"></i>
                <h3 class="text-[#150A33] font-semibold text-[18px] mb-0">{{ userdata?.name }}</h3>
              </div>
            </div>
          </div>
          <ul class="text-sm text-gray-700 space-y-2 pl-0">
            <li class="flex flex-wrap gap-2 justify-between border-t border-[#ededed] pt-2">
              <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                <i class="bi bi-calendar4 text-[#838383]"></i> Created On
              </span>
              <span class="text-[14px] text-[#3c3c3c]">{{ userdata?.created_at }}</span>
            </li>
            <li class="flex flex-wrap gap-2 justify-between border-t border-[#ededed] pt-2">
              <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                <i class="bi bi-envelope text-[#838383]"></i> Email ID
              </span>
              <span class="text-[14px] text-[#3c3c3c]">{{ userdata?.email }}</span>
            </li>
            <li class="flex flex-wrap gap-2 justify-between border-t  border-[#ededed] pt-2">
              <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                <i class="bi bi-telephone text-[#838383]"></i> Phone Number
              </span>
              <span class="text-[14px] text-[#3c3c3c]">{{ userdata?.phone }}</span>
            </li>
          </ul>
          <div @click="this.$router.push('/user/profile')"
            class="mt-2 bg-[#3C3C3C1A] rounded-full py-2 px-4 text-center text-[14px] text-[#3C3C3C] ">
            View Profile <i class="bi bi-box-arrow-up-right pl-2"></i>
          </div>
        </div>
        <div
          class=" xl:p-[35px] md:p-[22px] p-[17px] lg:p-[26px] bg-white rounded-[15px]  border-[2px] border-[#ededed]">
          <div
            class="flex items-center gap-2 text-[#282823] font-semibold text-[17px] pb-3 border-b-[2px] border-[#ededed] mb-4">
            <i class="bi bi-stars text-lg text-[#000000]"></i>
            Need Title
          </div>
          <div class="space-y-4  ">
            <label v-for="(item, index) in checklist" :key="index"
              class="flex items-center justify-between  border-b-[2px] border-[#ededed] pb-3"
              :class="{ 'cursor-pointer': item.action }">
              <span class="flex items-center gap-2 text-[#0D062D] font-medium text-[16px]" @click="item.action">

                <i :class="`bi ${item.icon} text-lg text-[#676B6C]`"></i>
                {{ item.label }}
              </span>
              <input type="checkbox" v-model="item.checked" class="hidden peer" />
              <span
                class="w-[22px] h-[22px] rounded-full border border-[#D8DADF] peer-checked:bg-[#00D149] peer-checked:text-white flex items-center justify-center">
                <i class="bi bi-check text-sm" :class="{ 'inline-block': item.checked, hidden: !item.checked }"></i>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="DefineInterest" modal header="Define an Interest" :style="{ width: '420px' }">
    <div class="px-2">
      <div class="mb-4 text-left">
        <label class="block text-[17px] font-medium text-gray-700 mb-1 required">Select Service</label>
        <div class="select-option">
          <select v-model="define_interest.service" class="custom-select">
            <option disabled value="">Select Service</option>
            <option v-for="s in servicesdata" :value="s">
              {{ s }}
            </option>
          </select>
          <div v-if="submitAttempted && !selectedService" class="text-red-500 text-sm mt-1">Service is required.</div>
        </div>
      </div>
      <div class="mb-6 text-left">
        <label class="block text-[17px] font-medium text-gray-700 mb-1 required">Select Country</label>
        <div class="select-option">
          <select v-model="define_interest.country" class="custom-select">
            <option disabled value="">Select Country</option>
            <option v-for="ele in countrydata" :value="ele.country">
              {{ ele.country }}
            </option>
          </select>
          <div v-if="submitAttempted && !selectedCategory" class="text-red-500 text-sm mt-1">Category is required.</div>
        </div>
      </div>
      <div class="flex justify-center gap-4">
        <button class="px-6 py-2 text-[18px] rounded border border-[#e7e7e7] text-[#333333] hover:bg-gray-100"
          @click="DefineInterest = false">Cancel
        </button>
        <button
          class="px-6 py-2 rounded bg-[#FF5757] border border-[#ff5757] text-white hover:bg-[#ff5757] hover:text-[#ffffff]"
          @click="addDefineInterest">
          Submit
        </button>
      </div>
    </div>
  </Dialog>
</template>
<script>


definePageMeta({
  layout: 'user',
  middleware: ['user'],
});
export default {
  data() {

    return {
      userdata: null,
      DefineInterest: false,
      selectedService: '',
      selectedCategory: '',
      submitAttempted: false,
      checklist: [
        { label: 'Complete Profile', icon: 'bi-person-circle', checked: false, action: null },
        { label: 'Define a Interest', icon: 'bi-pencil-square', checked: false, action: this.defineInterest },
        { label: 'Search a Company', icon: 'bi-search', checked: false, action: null },
        { label: 'Bookmark 3 Companies', icon: 'bi-bookmark', checked: false, action: null },
        { label: 'Send Enquiry', icon: 'bi-chat-left-text', checked: false, action: null },
        { label: 'Book An Appointment', icon: 'bi-calendar-event', checked: false, action: null },
      ],
      videos: [
        {
          id: 'dQw4w9WgXcQ',
          title: 'Video Player Title',
          description: 'Lorem ipsum dolor sit amet consectetur. Sed.',

        },
        {
          id: 'M7lc1UVf-VE',
          title: 'Video Player Title',
          description: 'Lorem ipsum dolor sit amet consectetur. Sed.',
        },
        {
          id: 'kXYiU_JCYtU',
          title: 'Video Player Title',
          description: 'Lorem ipsum dolor sit amet consectetur. Sed.',
        },
        {
          id: 'ScMzIvxBSi4',
          title: 'Video Player Title',
          description: 'Lorem ipsum dolor sit amet consectetur. Sed.',

        },
        {
          id: '3fumBcKC6RE',
          title: 'Video Player Title',
          description: 'Lorem ipsum dolor sit amet consectetur. Sed.',
        },
        {
          id: 'FTQbiNvZqaY',
          title: 'Video Player Title',
          description: 'Lorem ipsum dolor sit amet consectetur. Sed.',

        },
      ],
      selectedVideo: null,
      define_interest: {
        service: null,
        country: null,
      },
      servicesdata: [],
      countrydata: [],
      wishlistAppointmentEnquieryCount: [],
    }
  },
  created() {
    this.selectedVideo = this.videos[0];
  },
  async mounted() {
    this.userDetails()
    this.categorylist()
    this.countrylist()
    this.wishlistAppointmentEnquiery()
  },
  methods: {
    submitInterest() {
      this.submitAttempted = true;
      if (!this.selectedService || !this.selectedCategory) {
        return;
      }
      console.log('Submitted:', {
        service: this.selectedService,
        category: this.selectedCategory
      });
      this.DefineInterest = false;
      this.submitAttempted = false;
      this.selectedService = '';
      this.selectedCategory = '';
    },
    async userDetails() {
      try {
        const data = await userGet("/view-user-details")
        if (data.data.status) {
          this.userdata = data.data.user
          console.log("hihihih", this.userdata, this.checklist)
          this.checklist[0].checked = data.data.completeProfile
          console.log(this.userdata.define_interest, this.userdata.define_interest.service, this.userdata.define_interest.country)
          if (this.userdata.define_interest, this.userdata.define_interest.service, this.userdata.define_interest.country) {

            this.checklist[1].checked = true
            this.checklist[2].checked = true

          }
          // this.completeProfile=data.data.completeProfile
        }
      } catch (error) {
        this.data.null
      }

    },
    completeProfile() {
      // this.$router.push("/user/profile")
    },
    defineInterest() {
      this.DefineInterest = true;
    },

    serachCompany() {

    },
    BookmarkCompany() {

    },
    sendEnquiry() {

    },
    bookappintment() {

    },
    async addDefineInterest(v) {
      // return console.log("data",this.define_interest)
      const data = await userPatch(`/add-define-interest/${this.userdata._id}`, {
        define_interest: this.define_interest
      });
      if (data.data.status) {
        successAlert("Add successfully")
        this.userDetails()
        this.defineInterest = false
        this.$router.push({
          path: '/search',
          query: {
            activeButton: 'business-listing',
            category: this.define_interest.service
          }
        })
      }

    },
    async categorylist() {
      try {
        const data = await userGet("/filter-sidebar-category")
        if (data.data.status) {
          console.log("hihihihihihihi", data.data.data)
          this.servicesdata = data.data.data
        }
      } catch (error) {
        this.servicesdata = []
      }
    },
    async countrylist() {
      try {
        const data = await userGet("/filter-country")
        if (data.data.status) {
          console.log("hihihihihihihi", data.data.data)
          this.countrydata = data.data.data
        }
      } catch (error) {
        this.countrydata = []
      }
    },
    async wishlistAppointmentEnquiery() {
      console.log("wishlistAppointmentEnquiery")
      try {
        const data = await userGet("/user-wishlist-aapointment-enquery-count/")
        if (data.data.status) {
          console.log("statustyssutsus")
          this.wishlistAppointmentEnquieryCount = data.data.data
          console.log("statustyssutsus", this.wishlistAppointmentEnquieryCount)
        }
        if (this.wishlistAppointmentEnquieryCount.bookmark > 0) {
          this.checklist[3].checked = true
          console.log("this.checklist1", this.checklist)

        }
        if (this.wishlistAppointmentEnquieryCount.appointment > 0) {
          this.checklist[5].checked = true
          console.log("this.checklist2", this.checklist)

        }
        if (this.wishlistAppointmentEnquieryCount.enquery > 0) {
          this.checklist[4].checked = true
          console.log("this.checklist3", this.checklist)
        }

      } catch (error) {
        this.wishlistAppointmentEnquieryCount = []
      }
    }
  }
}
</script>