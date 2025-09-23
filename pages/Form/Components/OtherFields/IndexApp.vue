<!-- @format -->

<template>
  <div class="gallery-container">

    <div class="lead-setting">
      <span class="fs-4 fw-semibold">Basic Details</span>
    </div>
    <div class="lead-detail row">
      <div class="col-12 d-lg-flex flex-lg-column">

        <div class="row otherfld-laled">
          <div id="other-fldids" class="form-group col-4 d-lg-flex flex-lg-column pt-4 pt-lg-0"
            v-for="i in lead.other_fields">

            <div v-if="i.field_type == 'input'">
              <label for="exampleInputPassword1">{{ i.field_name }} <span v-if="i.required">*</span></label>
              <input type="text" v-model="i.field_value" class="form-control" />
            </div>

            <div v-if="i.field_type == 'textarea'">
              <label for="exampleInputPassword1">{{ i.field_name }} <span v-if="i.required">*</span></label>
              <textarea v-model="i.field_value" class="form-control"></textarea>
            </div>

            <div v-if="i.field_type == 'dropdown'">
              <label for="exampleInputPassword1">{{ i.field_name }} <span v-if="i.required">*</span></label>
              <select v-model="i.field_value">
                <option v-for="option in i.dropdownOptions">{{ option }}</option>/
              </select>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from "vue-advanced-cropper";

export default {
  props: {
    lead: {},
    form: {}
  },
  components: {
    Cropper,
  },
  data() {
    return {
      fields: null,
    };
  },
  mounted() {
    if (typeof this.lead.other_fields == null || typeof this.lead.other_fields == 'undefined') { this.lead.other_fields = [] }
    this.init();
  },
  methods: {
    async init() {
      await homeGet(`/form-custom-field/${this.form.company_id._id}`).then(async (response) => {
        this.fields = response.data.customFields;
        for (let i in this.fields) {
          this.lead.other_fields[i] = ({
            field_id: this.fields[i].field_name,
            field_name: this.fields[i].field_name,
            field_type: this.fields[i].field_type,
            required: this.fields[i].required,
            field_value: null,
            dropdownOptions: this.fields[i].dropdownOptions
          })
        }

      })
    },


  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
