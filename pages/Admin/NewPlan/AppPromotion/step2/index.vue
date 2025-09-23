<template>
  <FormKit type="form" @submit="submitForm">
    <div class="buildetheme-container">
      <div class="btheme-wrapper">
        <div class="btheme-section1">
          <div class="btheme-section1-wrapper">
            <div class="btheme-row1-logo">
              <img src="/img/png/logo F&C.png" alt="f&c logo" />
            </div>
            <div class="btheme-section1-row2">
              <img src="/img/png/iphonescreen.png" alt="phoneimge" />
            </div>
          </div>
        </div>
        <div class="btheme-section2-container">
          <div class="btheme-section2">
            <div class="btheme-row1">
              <div class="btheme-back">
                <NuxtLink to="/admin/Builder">
                  <i class="bi bi-chevron-left" id="back-logo"></i>
                  <p class="btn-row1">Back</p>
                </NuxtLink>
              </div>
              <div class="builder-section2-row1-col2">
                <p>Step01/04</p>
                <p>Business Info.</p>
              </div>
            </div>
            <div class="builder-section2-row2">
              <h2>Let's start with your</h2>
              <h3>App name first!</h3>
            </div>
            <div class="btheme-row3">
              <p>Choose a color theme</p>
            </div>
            <div class="btheme-row4">
              <FormKit validation="required" name="color" type="color"/>
              <!-- <div class="btheme-row4-circle1" v-for="(color, index) in colors " :key="index">
                <div class="btheme-row4-inner" :style="{ backgroundColor: color.colorcode }"></div>
              </div> -->
              <!-- <div class="btheme-row4-circle2">
                <i class="bi bi-plus-lg" id="plus-icon" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                <div class="modal fade" id="exampleModal" tabindex="1003" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" :style="{ marginRight: '150px' }">
                    <div class="modal-content">

                      <div class="modal-body">
                        <section class="addcolor">
                          <div class="coloradd-container">
                            <div class="coloradd-row1">
                              <i class="bi bi-chevron-left" id="back-logo" data-bs-dismiss="modal"></i>
                              <p>Add Your Custom Color</p>
                            </div>
                            <div class="coloradd-row2">
                              <p>Choose Your Color</p>
                              <div class="coloradd-row3">
                                <div class="colorpicker">
                                  <input type="color" v-model="selectedColor" @input="updateHexCode" />
                                </div>
                                <input type="text" v-model="hexColorCode" id="hexacode" />
                              </div>
                              <div class="coloradd-row4">
                                <i class="bi bi-eyedropper"></i>
                                <p> or color pick</p>
                              </div>
                              <div class="coloradd-row5">
                                <h3>Descriptions</h3>
                                <textarea type="textArea" />
                              </div>
                              <div class="coloradd-row6">
                                <button data-bs-dismiss="modal" @click="addColor">Design Preview</button>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>





                    </div>
                  </div>
                </div>
                <div v-if="showColorSelector" class="color-selector">
                  <div class="color-option" v-for="( color, index ) in colors " :key="index"
                    :style="{ backgroundColor: selectedColor }"></div>
                </div>

              </div> -->
            </div>
            <div class="btheme-row5">
              <div class="btheme-row5-col1">
                <label>Website Link</label>
                <div class="btheme-row5-input1">
                  <FormKit validation="required" name="websitelink" type="text" placeholder="----------" />
                </div>
              </div>
              <div class="btheme-row5-col2">
                <label>Privancy policy Link</label>
                <div class="btheme-row5-input2">
                  <FormKit validation="required" name="privacy_policy_link" type="text" placeholder="----------" />
                </div>
              </div>
            </div>
            <div class="btheme-row6">
              <button type="submit">LAUNCH MY APP!<img src="/img/png/hbdd.png" /></button>
            </div>
            <div class="btheme-row7">
              <div class="Admen-section2-checkbox">
                <input type="checkbox" class="custom-checkbox2" id="myCheckbox2" v-model="checkbox">
                <label for="myCheckbox2" class="checkbox-label2"></label>
              </div>
              <p>I agree to <span>terms & conditions</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FormKit>


</template>

<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
  name: 'Buildetheme',
  data() {
    return {
      data: null,
      isChecked: false,
      selectedColors: [],
      selectedColor: '#000000', // Default color
      hexColorCode: '#000000',
      checkbox: false,
      colors: [
        {
          colorcode: '#20B42B',
        },
        {
          colorcode: '#961992',
        }

      ],
    };
  },
  mounted() {
    activateMenu('plans', "Explore New Plan"); const encodedData = sessionStorage.getItem('tempData');
    this.data = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;
  },
  methods: {
    async submitForm(v) {
      v.app_name=this.data.app_name
      v.logo=this.data.logo
      const encodedData = encodeURIComponent(JSON.stringify(v));
      sessionStorage.setItem('tempData', encodedData);
      if (this.checkbox) {
        this.$router.push('/admin/NewPlan/AppPromotion/step3');
      }
    },
    updateHexCode() {
      // Convert the selected color to its hexadecimal representation
      this.hexColorCode = this.selectedColor;
    },
    toggleColorSelector() {
      this.showColorSelector = !this.showColorSelector;
    },
    selectColor(color) {
      // Handle the selected color here
      // You can add further actions here, such as updating a data property or emitting an event
    },
    request() {
      if (this.checkbox) {
      }
    },
    addColor() {
      // Generate a random color
      // const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      // Add the color to the array

      this.colors.push({ "colorcode": this.hexColorCode })
    },

  }
}


</script>

<style scoped>
@import url('./style.css');
</style>
