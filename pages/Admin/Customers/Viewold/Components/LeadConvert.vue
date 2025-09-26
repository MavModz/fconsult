<template>
  <div class="modal fade" id="exampleConvert" tabindex="-1" aria-labelledby="exampleConvert" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-event-stl">
              <span class="event-mdl-del">
                <p>Lead Convert</p>
              </span>
            <span>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </span>
          </div>

          <FormKit type="form" @submit="submitForm" class="leads-form-style">
            <div class="mb-3">
              <label class="leads-label-assign">Choose the Counselor or Team </label>
              <FormKit validation="required" v-model="selectedTab" id="update-events-drpsemi" class="form-select" name="event_type" type="select" :options="['1','2']" />
            </div>

            <span>
                <label class="leads-label-assign">Comment</label>
                <textarea name="" id="leads-textarea-dgn"></textarea>
              </span>
            <div class="modal-footer-section">
              <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go back</button>
              <button @click="deleteEvent()" type="button" class="btn-btn-dle">Convert Lead</button>
            </div>
          </FormKit>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeadConvert'
}
</script>

<style scoped>
@import url('../style.css');
</style>