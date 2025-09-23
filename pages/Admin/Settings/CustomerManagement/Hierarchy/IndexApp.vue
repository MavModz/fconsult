<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Hierarchy Management</span><span id="add-btn"
        @click="$router.push('/admin/hierarchyChart')">+
        Manage</span>
    </div>
    <div class="break-line"></div>
    <section>
      <table v-if="settings">
        <thead>
          <tr>
            <th class="td1">Sub - Admins</th>
          <th class="td2">Managers</th>
          <th class="td3">Executives</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in settings[0].children">
            <td class="td1"><span class="subadmin">{{ i.user_id.name }}</span></td>
            <td class="td2"><span class="manager" v-for="j in i.children">{{ j.user_id.name }}</span></td>
            <td class="td3"><span v-for="j in i.children"> <span class="execuitive" v-for="k in j.children">{{ k.user_id.name }}</span> </span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>


<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admincrm'],
})
export default {
  data() {
    return {
      settings: null,
    };
  },
  async mounted() {
    await adminGet(`/company-hierarchy`).then(async (response) => {
      this.settings = response.data.data.hierarchy;
    });
  },
};

</script>

<style scoped>
@import url('style.css');
</style>
