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
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="i in 5">
            <td>
              <img src="/img/svg/ladki.svg" class="rounded-circle header-profile-user" />Robin Raji
            </td>
            <td>
              <div class="details d-flex align-items-center flex-wrap gap-2">
                4500
              </div>
            </td>
            <td>
              FULL
            </td>
            <td>Pending</td>
            <td>
              <div class="btn-group">
                <span class="td-btn">
                  <NuxtLink to="/user/recommendation/view/123">
                    <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available;" />
                  </NuxtLink>
                </span>
                <span class="td-btn">
                  <img src="/img/svg/trash.svg" alt="" />
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
  async mounted() {
    activateSubmenu('b3', "Payments");
  },
}
</script>

<style scoped>
@import url("style.css");
</style>