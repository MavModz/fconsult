<template>
  <section v-if="data?.length > 0" class="blog" style="padding-bottom: 170px;">
    <div class="mx-auto w-[95%]">
      <div class="title d-flex justify-content-between align-items-center mb-4">
        <h2 class="me-4 text-[28px] font-bold text-[#1f1b2d]">Important Facts & Information</h2>
        <NuxtLink to="/blogs" class="ms-4">Go to blog <i class="bi bi-arrow-right w-4"></i></NuxtLink>
      </div>
      <div id="container">
        <div :class="[data?.length < 2 ? 'grids' : 'grid']">
          <div v-for="i in data" class="grid-item w-[-webkit-fill-available] text-[18px]">
            <NuxtLink to="" class="w-full">
              <div class="blog-card">
                <div class="">
                  <NuxtLink
                    :to="i.role === 'Superadmin'
                      ? '/blogs/' + i._id
                      : i?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + i?.company_id?.company_name?.replaceAll(' ', '-') + '/' + i?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_id?._id + '/about-us'"
                    class="card-img-top">
                    <div class="blog-size-study-defn">
                      <img :src="i.cover_image" alt="blog-img" />
                    </div>
                  </NuxtLink>
                  <div class="ps-0 pt-2">
                    <NuxtLink
                    :to="i.role === 'Superadmin'
                      ? '/blogs/' + i._id
                      : i?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + i?.company_id?.company_name?.replaceAll(' ', '-') + '/' + i?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_id?._id + '/about-us'">
                      <span class="blog-tag text-[#FF5757] font-normal my-1 text-[75%]">
                        {{ i.category_name }}
                      </span>
                    </NuxtLink>
                    <h5 class="card-title">
                      <NuxtLink
                      :to="i.role === 'Superadmin'
                      ? '/blogs/' + i._id
                      : i?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + i?.company_id?.company_name?.replaceAll(' ', '-') + '/' + i?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_id?._id + '/about-us'"
                        class="font-bold text-[85%] text-[#454056] capitalize">
                        {{ i?.title?.slice(0, 40) }}
                      </NuxtLink>

                    </h5>
                    <div class="flex gap-2 items-center mt-3">
                      <NuxtLink
                      :to="i.role === 'Superadmin'
                      ? '/blogs/' + i._id
                      : i?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + i?.company_id?.company_name?.replaceAll(' ', '-') + '/' + i?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_id?._id + '/about-us'"
                        class="user-profile">
                        <img src="/img/png/user-1.png" />
                      </NuxtLink>
                      <NuxtLink
                      :to="i.role === 'Superadmin'
                      ? '/blogs/' + i._id
                      : i?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + i?.company_id?.company_name?.replaceAll(' ', '-') + '/' + i?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_id?._id + '/about-us'"
                        class="user-details">
                        <p class="m-0 text-[75%] font-bold">
                          {{ i?.user_id?.name }}
                        </p>
                        <ul style="margin-bottom: 0px" class="d-flex list-unstyled align-items-center">
                          <li class="pt-1 font-normal d-flex gap-x-1 text-[14px]">
                            <img src="/img/svg/clean-3.svg" />{{
                              DateFormat(i.date).month
                            }}
                            {{ DateFormat(i.date).day }}
                          </li>
                        </ul>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      loading: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleClick(index) {
      this.isActive = index;
    },
    async init() {
      await homeGet('/home-random-blog/Work Visa').then((response) => {
        if (response.status) {
          this.data = response.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');

#container {
  width: -webkit-fill-available;
  margin: auto;
}

/* The Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(4,
      minmax(250px, 1fr));
  /* Responsive grid layout */
  grid-gap: 20px;
  /* Gap between the grid items */
}

.grids {
  display: grid;
  grid-template-columns: repeat(4,
      minmax(250px, 1fr));
  /* Responsive grid layout */
  grid-gap: 20px;
  /* Gap between the grid items */
}

.grid-item {
  display: grid;
  place-items: center;
  border-radius: 2% / 4%;
}

.card {
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 1830px) {
  .grid {
    grid-template-columns: repeat(auto-fit,
        minmax(350px, 1fr));
    /* Adjust grid for smaller screens */
  }

  .grids {
    grid-template-columns: repeat(3,
        minmax(350px, 1fr));
    /* Adjust grid for smaller screens */
  }
}

@media only screen and (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(auto-fit,
        minmax(350px, 1fr));
    /* Adjust grid for smaller screens */
  }

  .grids {
    grid-template-columns: repeat(2,
        minmax(350px, 1fr));
    /* Adjust grid for smaller screens */
  }
}

@media only screen and (max-width: 600px) {

  .grid,
  .grids {
    grid-template-columns: repeat(auto-fit,
        minmax(250px, 1fr));
    /* Adjust grid for very small screens */
  }
}

.inactive {
  cursor: not-allowed;
  opacity: 0.5;
  /* Reduce opacity to indicate disabled state */
  pointer-events: none;
  /* Prevent clicking on the button */
}

@media only screen and (max-width: 1220px) {
  #slider-container {
    padding: 0px;
  }
}
</style>
