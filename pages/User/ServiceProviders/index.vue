<template>

  <section class="user-details">
    <div class="languages">
      <div class="gallery-media-action">
        <div class="gallery-action">
          <div class="search-container">
            <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <section>
        <table>
          <thead>
          <tr>
            <th>Company Name</th>
            <th>Rating</th>
            <th>Applied Date</th>
            <th>Service</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="i in providers">
            <td>
              <span class="user-serviceprovd-admin">
                <img :src="i.company_id.cover_image" class="rounded-circle header-profile-user" />
                {{ i.company_id.company_name }}
              </span>
            </td>
            <td>
              <div class="details d-flex align-items-center flex-wrap gap-2">
                <span><img style="margin-bottom: 5px" src="/img/svg/Star.svg" alt="" /></span>
                <span>{{i.company_id.average_review}}</span>
                <span>({{i.company_id.total_reviews}})</span>
              </div>
            </td>
            <td>
              {{ i.date.split("T")[0] }}
            </td>
            <td>{{ i.service }}</td>
            <td>
              <div class="btn-group">
                <span class="td-btn">
                  <NuxtLink :to="'/user/company-'+i.company_id._id+'/'+i._id">
                    <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available;" />
                  </NuxtLink>
                </span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>

<script>
definePageMeta({
    layout: 'user',
        middleware: ['user'],


})

export default{
  data(){
    return{
      providers:null,
      loading:true,
    }
  },
  async setup(){
    const data = (await useFetch('/api/users/admin')).data.value;
    return {data}
  },
  async mounted() {
    activateMenu('serviceproviders', "My Services");
    await this.init()
  },
  methods:{
    async init(){
      this.loading=true
      await userGet(`/my-services/${this.data.user.user.email}`).then((r)=>{
        if(r.status){this.providers=r.data.data}
      })
      this.loading=false
    },
  },

}
</script>

<style scoped>
@import url("style.css");
</style>