<template>
  <div class="gallery-container p-5">


    <div v-if="loading" class="row">
      <div class="col-lg-4 mb-lg-0" v-for="i in 6">
        <div class="card mb-4 shadow shadow-xs">
          <div class="card-body">
            <div class="card">
              <div class="border-round border-1 surface-border p-4 surface-card">
                <div class="flex mb-3">
                  <div>
                    <Skeleton width="10rem" class="mb-2"></Skeleton>
                  </div>
                </div>
                <Skeleton width="100%" height="180px"></Skeleton>
                <div class="row justify-content-between mt-3">
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="d-flex flex-wrap gap-5 py-5 row">
      <div v-if="wishlists && wishlists.length > 0" class="cards" v-for="i in wishlists">
        <div class="dropdown">
          <span class="dot" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/img/svg/three-dot.svg" alt="" />
          </span>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="deleteWish(i._id)">Delete</a></li>
          </ul>
        </div>
        <img class="image" :src="i.company_id.cover_image" alt="" />
        <div class="d-flex justify-content-between align-items-center py-3 px-3">
          <div class="name">
            <h4>{{ i.company_id.company_name }}</h4>
            <p>{{ i.company_id.state }}</p>
          </div>
          <div class="details d-flex align-items-center flex-wrap gap-2">
            <span><img style="margin-bottom: 5px" src="/img/svg/Star.svg" alt="" /></span>
            <span>{{ i.company_id.average_review }}</span>
            <span>({{ i.company_id.total_reviews }})</span>
          </div>
        </div>
      </div>

      <div v-else>
        <center>
          <h1>No Wishlists Found</h1>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6275834-5210416.png" alt="">
          <NuxtLink class="btn btn-primary" to="/">Explore Companies</NuxtLink>
        </center>
      </div>
    </div>


  </div>
</template>

<script>

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

export default {
  data() {
    return {
      wishlists: null,
      loading: true,
    }
  },
  async mounted() {
    activateMenu('dashboard', "Wishlists");
    await this.init()
  },
  methods: {
    async init() {
      this.loading = true
      await userGet(`/user-wishlist`).then((response) => {
        if (response.status) {
          this.wishlists = response.data.data
        }
      })
      this.loading = false
    },
    async deleteWish(id) {
      this.loading = true
      await userDelete(`/remove-user-wishlist/${id}`).then((response) => {
        if (response.status) {
          this.wishlists = response.data.data
        }
      })
      this.loading = false
      await this.init()
    }
  },
}
</script>

<style scoped>
@import url("style.css");
</style>