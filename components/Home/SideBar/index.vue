<template>
  <Sidebar v-model:visible="mobileSidebar" modal :header="false" position="left"
    :style="{ 'width': '300px', 'overflow': 'hidden scroll' }">

    <div class="card flex-grow-1 d-flex flex-column">
      <BootstrapIcon name="x" class="fs-1" @click="mobileSidebar = false" />
    </div>
    <div class="sidebar ml-4">
      <h2>Browse By Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category" :class="{ active: category.label === selectedCategory }"
          @click="selectCategory(category.label)">
          <NuxtLink @click="mobileSidebar = false; goToSearch('business-listing', `${category.search_path}`)">{{ category.label }}</NuxtLink>
        </li>
      </ul>


      <div class="nav-item findandconsult-help-section">
        <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown"><span
            class="text-color help flex gap-1 items-center">Help
            <img src="/img/svg/down.svg" alt="Help" style="width: 14px" /></span></a>
        <div class="sidebar-help-section dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown "
          aria-labelledby="languageDropDown" style="position: absolute; inset: 0px 0px auto auto; margin: 0px">
          <div class="px-3 flex flex-col">
            <NuxtLink to="/about-us" class="py-2 px-2 text-[#7e8299]">About F&amp;C</NuxtLink>
            <NuxtLink to="/immigration-business-growth" class="py-2 px-2 text-[#7e8299]">Grow Your Business</NuxtLink>
            <NuxtLink to="/for-user" class="py-2 px-2 text-[#7e8299]">F&C For Users</NuxtLink>
            <NuxtLink to="/for-consultants" class="py-2 px-2 text-[#7e8299]">F&C For consultants</NuxtLink>
            <NuxtLink to="/Benefit-of-immigration-listing" class="py-2 px-2 text-[#7e8299]">Benefit of Listing
            </NuxtLink>
          </div>
        </div>
      </div>


      <!-- <div class="location-box">
        <p v-if="location">📍 {{ location }}</p>
        <button @click="fetchLocation" class="location-button"> Your Location</button>
        <input class="location-search my-2" type="text" placeholder="search">
      </div> -->

      <button class="add-button" @click="$router.push('/auth/login')">
        + Add Listing
      </button>
    </div>



  </Sidebar>
</template>

<script>
export default {
  data() {
    return {
      mobileSidebar: false,
      categories: [{ label: 'Settle Abroad', search_path: "Permanent Residency" }, { label: 'Study Overseas', search_path: "Study Visa" }, { label: 'Work Abroad', search_path: "Work Visa" }, { label: 'Travel Globally', search_path: "Tourist Visa" }],
      selectedCategory: null,
      location: null,

    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },

    goToSearch(activeButtonValue, categoryValue) {
      location.href=`/search?activeButton=${activeButtonValue}&category=${categoryValue}`
    },


  }

};

</script>

<style scoped>
.dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}


.dropdown-container {
  display: none;
  background-color: #262626;
  padding-left: 8px;
}







.sidebar {
  width: 250px;
  padding: 10px;
  border-radius: 12px;

}

.sidebar h2 {
  margin-bottom: 10px;
  color: #ff5757;
  font-size: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.sidebar li {
  padding: 7px;
  padding-left: 20px;
  cursor: pointer;
  border-radius: 6px;
}

.sidebar li:hover,
.sidebar li.active {
  background-color: #fedbdb;
  color: #000000
}

.location-button {
  color: #ff5757;
  font-size: 20px;
}

.location-box {
  margin-bottom: 20px;
}

.add-button {
  margin-top: 15px;
  background-color: #ff5757;
  color: white;
  padding: 10px 16px;
  border: 1px solid #ff5757;
  border-radius: 8px;
  cursor: pointer;
}

.add-button:hover {
  color: #ff5757;
  background-color: #ffffff;
}

.sidebar-help-section {
  transform: translate3d(-20px, 349px, 0px) !important;
}
</style>