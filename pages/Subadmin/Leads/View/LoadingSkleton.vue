<template>
  <section class="gallery-container">

    <div class="table-section">
      <div class="table-container table-wrapper">
        <table class="tables">
          <thead>
          <tr>
            <th>Lead Name</th>
            <th>Phone</th>
            <th>Assigned</th>
            <th>Status</th>
            <th>Source</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="i in 11" :key="i">
            <td v-for="j in 6" :key="j">
              <Skeleton></Skeleton>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LoadingSkleton'
}
</script>

<style scoped>
@import url('style.css');
</style>