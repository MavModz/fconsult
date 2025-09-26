<template>
  <div class="pipline-view-container">
    <div class="pipline-view-wrapper">
      <div class="pipline-view-header-container">
        <div class="pipline-view-header-flx">
          <div class="pipline-view-header-inpyt">
            <span>
              <i class="bi bi-search"></i>
              <input type="search" class="pipline-view-header-inpt-none">
            </span>
          </div>
          <div class="pipline-view-header-filter">
            <span><i class="bi bi-filter"></i></span>
            <span class="pipline-view-header-fil-mrgg">
              <p>Filter</p>
            </span>
          </div>
        </div>
        <div class="pipline-view-button-header">
          <div class="pipline-imahe-multple-headercnt">
            <div class="pipline-view-multipleheader">
              <img src="/img/jpg/boyy.jpg" alt="">
            </div>
            <div class="pipline-view-multipleheader">
              <img src="/img/jpg/boyy.jpg" alt="">
            </div>
            <div class="pipline-view-multipleheader">
              <img src="/img/jpg/boyy.jpg" alt="">
            </div>
          </div>
          <div data-bs-toggle="modal" data-bs-target="#exampleModal">
            <button class="pipline-view-vutton-header-design">Add Sub Admin</button>
          </div>
        </div>
      </div>


      <div class="pipline-view-body-container">
        <div id="scrollableDiv" class="pipline-view-body-wrappers" ref="scrollableDiv">

          <div class="pipline-view-header-dynamic-loop">
            <div class="pipline-view-header-maxwdthh" v-for="(item1, index1) in store" :key="index1">
              <div class="pipline-view-body-single-wrapper">
                <div class="pipline-view-body-single-flex">
                  <span class="pipline-view-singlebdi-cold">
                    <p>{{ item1.stage }}</p>
                  </span>
                  <span>
                    <i class="bi bi-pencil-square"></i>
                  </span>
                </div>
                <div class="pipline-view-body-single-bottomdsg">
                </div>
              </div>
              <div class="pipline-view-body-purble-line">
              </div>
            </div>
          </div>

          <div class="pipline-view-change-body-loopas">
            <div v-for="(item2, index) in allstore" :key="index" class="pipline-view-actual-bodyyy style-4">

              <div :draggable="true" @dragstart="dragStart(index)" @dragover.prevent @drop="drop(index)"
                class="pipline-view-2ndfrloop-bdyy" v-for="(card, index3) in item2" :key="index3">

                <div class="pipline-view-actual-bodyc-1stcnt">
                  <div class="pipline-view-act-img-flx">
                    <div class="pipline-view-img-leadfg">
                      <img :src="card.image" alt="">
                    </div>
                    <div>
                      <p class="pipline-view-actbdy-leadnm">{{ card.name }}</p>
                      <p class="pipline-view-actbdy-leadnm-exc">{{ card.assigned_to }} </p>
                    </div>
                  </div>
                  <div class="pipline-single-view-dte-tmedd">
                    <p>{{ card.date.split('T')[0] }}</p>
                  </div>
                </div>
                <div class="pipline-view-actual-emlphn">
                  <span class="pipline-view-actl-eml-flx">
                    <span class="pipline-view-dsgemlbck">
                      <p>{{ card.phone }}</p>
                    </span>
                    <span class="pipline-view-dsgemlbck">
                      <p>{{ card.email }}</p>
                    </span>
                  </span>
                  <span data-bs-toggle="modal" data-bs-target="#exampleDelete">
                    <i class="bi bi-trash3"></i>
                  </span>
                </div>
                <div class="pipline-view-act-src">
                  <span class="pipline-view-last-srcc-ldss" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                    <p>View Lead Profile</p>
                  </span>
                  <span class="pipline-view-last-srcc">
                    <p>{{ card.source }}</p>
                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="store && store.length>=3" class="scroll-abs-ledsaptt">
          <i @click="scrollLeft" id="scroller-leadss" class="fa fa-angle-down"></i>
        </div>
        <div v-if="store && store.length>=3" class="scroll-abs-ledsaptt-left">
          <i @click="scrollRight" id="scroller-leadss" class="fa fa-angle-down"></i>
        </div>
      </div>

    </div>
  </div>

  <!-- Modal view profile -->
  <div class="offcanvas offcanvas-end" data-bs-backdrop="static" data-bs-scroll="true" tabindex="-1"
    id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <span data-bs-dismiss="offcanvas">
        <i class="bi bi-caret-left"></i>
      </span>
    </div>
    <div class="offcanvas-body">

      <div class="single-lead-det-left">
        <div class="single-lead-profile">
          <!-- <div class="single-leads-created">
            <p>Lead Created Date</p>
          </div> -->
          <div class="single-lead-backg-clr">
            <div class="single-lead-abs-image">
            </div>
            <!-- <div class="single-lead-mail">
              <div class="single-lead-mail-icn">
                <img src="/img/png/red.png" alt="">
              </div>
              <div class="single-lead-june">
                <p>12 JUN 2024</p>
              </div>
            </div> -->
          </div>

          <div class="single-lead-inside-name-view">
            <span class="single-lead-actmae">
              <p>Lead Name</p>
            </span>
            <span>
              <div id="single-leads-sdwedk" class="mb-3">
                <FormKit validation="required" id="update-events-drpsemi-leads" :options="['Pending', 'Completed']"
                  name="city" type="select" />

              </div>
            </span>
          </div>

          <div class="single-lead-name">
            <div class="single-lead-recmd-flx">
              <span class="single-leads-appt-dsg-flxq">
                <p class="single-leads-two">2</p>
                <p class="single-leads-apptmnts">Appointments</p>
              </span>
              <span class="single-leads-appt-dsg-flxq">
                <p class="single-leads-two">5</p>
                <p class="single-leads-apptmnts">Recommendations</p>
              </span>
              <!-- <span  class="single-leads-appt-dsg-flxq">
                  <p class="single-leads-two">2</p>
                  <p class="single-leads-apptmnts">Cost Estimation</p>
                </span> -->
            </div>
            <div class="single-lead-inside-name">
              <span class="single-lead-actmae-chat">
                <span>
                  <i class="bi bi-chat-left"></i>
                </span>
                <span>Chat</span>
              </span>
              <span class="single-lead-actmae-chat-calen">
                <span><i class="bi bi-calendar"></i></span>
                <span class="single-lead-acta-chtcal-parg">Book An Appointment</span>
              </span>
            </div>
          </div>
        </div>

        <div class="col-md-12 mt-4">
          <div class="card">
            <div class="card text-center">
              <div class="card-header tabs">
                <ul class="nav nav-underline" id="myTab">
                  <li class="nav-item">
                    <a href="#overview" class="nav-link active" data-bs-toggle="tab">Overview</a>
                  </li>
                  <li class="nav-item">
                    <a href="#Tracking" class="nav-link" data-bs-toggle="tab">Assign Tracking</a>
                  </li>
                  <li class="nav-item">
                    <a href="#documents" class="nav-link" data-bs-toggle="tab">Document</a>
                  </li>
                  <li class="nav-item">
                    <a href="#Recommendation" class="nav-link" data-bs-toggle="tab">Recommendation</a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="whole-tab-padd" class=" mt-4">
              <div class="col-md-12 mt-4">
                <div class="tab-content">
                  <div class="tab-pane card card-body fade show active" id="overview">
                    <div class="single-overview-wrapper">
                      <FormKit type="form" @submit="submitForm">
                        <div class="single-overview-email">
                          <div class="single-eml-wdth">
                            <label class="single-view-nmbr">Phone Number</label>
                            <div class="single-ovr-spn">
                              <i id="single-over-phn-icn" class="bi bi-telephone"></i>
                              <input class="single-lead-nptphn" type="text" placeholder="enter your phone number">
                            </div>

                          </div>
                          <div class="single-eml-wdth">
                            <label class="single-view-nmbr">Email ID</label><br />
                            <div class="single-ovr-spn">
                              <i id="single-over-phn-icn" class="bi bi-envelope"></i>
                              <input class="single-lead-nptphn" type="email" placeholder="enter your email">
                            </div>

                          </div>

                        </div>

                        <div class="single-eml-wdth-lnk">
                          <label class="single-view-nmbr">Lead Source</label>
                          <div class="single-lead-nptphn-lnkk">
                            <span class="">
                              <i id="single-over-phn-lnkicn" class="bi bi-link-45deg"></i>
                            </span>
                            <span class="single-lds-yetnot">
                              <p>facebook.com.user8456/srcli</p>
                            </span>

                          </div>



                        </div>

                        <div class="single-eml-wdth-lnk">
                          <label class="single-view-nmbr">Assigned To</label><br />
                          <div class="single-lead-nptphn-del">
                            <span class="single-lds-yetnot">
                              <p>Lead Not Assigned Yet</p>
                            </span>
                            <span class="single-lead-nptphn-spn">
                              <i class="bi bi-trash3"></i>
                              <i class="bi bi-pencil-square"></i>
                            </span>

                          </div>



                        </div>

                        <div class="single-eml-wdth-lnk">
                          <label class="single-view-nmbr">Service Opted</label><br />
                          <div class="single-lead-nptphn-opted">
                            <span class="single-lds-yetnot-opted">
                              <p class="single-lead-stdyvsa">Study Visa</p>
                            </span>
                            <span class="single-lds-yetnot-opted">
                              <p class="single-lead-stdyvsa">Travel Visa</p>
                            </span>
                            <span class="single-lds-yetnot-opted">
                              <p class="single-lead-stdyvsa">+2</p>
                            </span>

                          </div>


                        </div>

                        <div class="single-leads-teck-container">
                          <div class="mb-3">
                            <label class="leads-label-assign-ovrvw">Add to Pipeline</label>
                            <FormKit validation="required" v-model="selectedTab" id="update-events-drpsemi-drop"
                              :options="['1', '2']" class="form-select" name="event_type" type="select" />
                          </div>
                          <div class="mb-3">
                            <label class="leads-label-assign-ovrvw">Select Stage of Pipeline</label>
                            <FormKit validation="required" v-model="selectedTab" id="update-events-drpsemi-drop"
                              class="form-select" name="event_type" type="select" :options="['1', '2']" />
                          </div>

                          <span class="single-lead-ovre-cmprfle">
                            <p>View Complete Profile</p>
                          </span>
                          <span>
                            <button class="single-lead-ovre-cmprfle-btn">Convert to Customer</button>
                          </span>
                        </div>
                      </FormKit>

                    </div>
                  </div>
                  <div class="tab-pane card card-body fade show" id="Tracking">
                    <div class="single-leads-teck-container">
                      <div class="single-lead-assign-stl">
                        <div class="single-lead-assign-time">
                          <span class="single-lead-assign-time-act">
                            <p>08:42</p>
                          </span>
                          <span class="single-lead-dspl-line">
                            <p class="single-lead-assign-linestl"></p>
                          </span>
                        </div>
                        <div class="single-lead-assigntime-fr">
                          <div class="single-lead-textctr">
                            <div class="single-lead-ass-img-size">
                            </div>
                            <div class="single-lead-assign-nmw">
                              <p>Name</p>
                            </div>
                          </div>
                          <div class="single-leads-ovr-arrdgns">
                          </div>
                          <div class="single-lead-textctr">
                            <div class="single-lead-ass-img-size">
                            </div>
                            <div class="single-lead-assign-nmw">
                              <p>Name</p>
                            </div>
                          </div>
                          <div>
                            <p>Outlines keep you honest. Indulging in poorly driving and keep structure</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane card card-body fade show" id="documents">
                    <div class="single-dcmt-container">
                      <div class="single-dcmt-1stdiv">
                        <div>
                          <p class="single-dcmt-1stfile">File Name</p>
                          <p class="single-dcmt-1stcateg">file category</p>
                        </div>
                        <div class="single-dcmt-icnn">
                          <span><i id="single-dcmt-edit-ics" class="bi bi-pencil-square"></i></span>
                          <span><i id="single-dcmt-edit-ics" class="bi bi-trash3"></i></span>
                        </div>
                      </div>
                      <div class="single-dcmt-1stdiv">
                        <div>
                          <p class="single-dcmt-1stfile">File Name</p>
                          <p class="single-dcmt-1stcateg">file category</p>
                        </div>
                        <div class="single-dcmt-icnn">
                          <span><i id="single-dcmt-edit-ics" class="bi bi-pencil-square"></i></span>
                          <span><i id="single-dcmt-edit-ics" class="bi bi-trash3"></i></span>
                        </div>
                      </div>
                      <div class="single-dcmt-1stdiv">
                        <div>
                          <p class="single-dcmt-1stfile">File Name</p>
                          <p class="single-dcmt-1stcateg">file category</p>
                        </div>
                        <div class="single-dcmt-icnn">
                          <span><i id="single-dcmt-edit-ics" class="bi bi-pencil-square"></i></span>
                          <span><i id="single-dcmt-edit-ics" class="bi bi-trash3"></i></span>
                        </div>
                      </div>
                      <!-- <span>
                          <router-link to=''>
                            <button class="your-events-btn-dcmt">
                              <span id="single-dcmt-pddrigh" class="your-event-addsign"><i
                                  class="bi bi-upload"></i></span> upload new document
                            </button>
                          </router-link>
                        </span> -->
                    </div>
                  </div>
                  <div class="tab-pane card card-body fade show" id="Recommendation">
                    <div class="form-inpt-head">
                      <div class="form-url-frm">
                        <span class="frm-url-wid">

                          <div class="mb-3">
                            <label class="url-form-label">Service</label><br />
                            <FormKit validation="required" v-model="selectedTab" id="form-url-inpt" class="form-select"  :options="['1','2']" name="event_type" type="select"/>
                          </div>
                        </span>
                        <span class="frm-url-wid">
                          <div class="mb-3">
                            <label class="url-form-label">Listing</label><br />
                            <FormKit validation="required" v-model="selectedTab" id="form-url-inpt" class="form-select"  :options="['1','2']"
                              name="event_type" type="select"/>
                          </div>
                        </span>
                      </div>

                      <div class="your-events-addbtn">
                        <router-link to=''>
                          <button class="your-events-btn-rec" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Submit
                          </button>
                        </router-link>
                      </div>
                    </div>
                    <section class="recmd-tbl-sec">
                      <div class="recmd-mrgline-rec">
                        <table class="table-recmd-dsnn">
                          <thead class="thead-tbl-recmd">
                            <tr>
                              <th>Listing</th>
                              <th>Service</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span class="recmd-tbl-dtatim">
                                  <span>
                                  </span>
                                  <span class="red-shtvsa">
                                    <p>SHT Visa</p>
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span class="recmf-std-vistbl">
                                  <p>Study Visa</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-tbl-sttss">
                                  <p>Unselected</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-eye-tkk">
                                  <span class="recms-vw-bckcl">
                                  </span>
                                  <span data-bs-toggle="modal" data-bs-target="#exampleSelect" class="recms-vw-bckcl">
                                  </span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <span class="recmd-tbl-dtatim">
                                  <span>
                                  </span>
                                  <span class="red-shtvsa">
                                    <p>SHT Visa</p>
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span class="recmf-std-vistbl">
                                  <p>Study Visa</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-tbl-sttss-select">
                                  <p>Selected</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-eye-tkk">
                                  <span class="recms-vw-bckcl">
                                  </span>
                                  <span data-bs-toggle="modal" data-bs-target="#exampleSelect" class="recms-vw-bckcl">
                                  </span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <span class="recmd-tbl-dtatim">
                                  <span>
                                  </span>
                                  <span class="red-shtvsa">
                                    <p>SHT Visa</p>
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span class="recmf-std-vistbl">
                                  <p>Study Visa</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-tbl-sttss-fail">
                                  <p>Failed</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-eye-tkk">
                                  <span class="recms-vw-bckcl">
                                  </span>
                                  <span data-bs-toggle="modal" data-bs-target="#exampleSelect" class="recms-vw-bckcl">
                                  </span>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="recmd-tbl-dtatim">
                                  <span>
                                  </span>
                                  <span class="red-shtvsa">
                                    <p>SHT Visa</p>
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span class="recmf-std-vistbl">
                                  <p>Study Visa</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-tbl-sttss-sts">
                                  <p>status</p>
                                </span>
                              </td>
                              <td>
                                <span class="recmd-eye-tkk">
                                  <span class="recms-vw-bckcl">
                                  </span>
                                  <span data-bs-toggle="modal" data-bs-target="#exampleSelect" class="recms-vw-bckcl">
                                  </span>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>


      </div>
    </div>
  </div>

  <!-- Modal add sub admin -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-headery-sbadmin">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="pipline-modal-view-pddd">
            <span class="pipline-modal-addsb">
              <p>Add Sub-Admin</p>
            </span>
            <div>
              <div class="mb-3">
                <FormKit validation="required" id="update-events-drpsemi-addsbb" name="city" type="select"
                  :options="['1', '2']" />
              </div>
              <span class="Establisa-robust">
                <p>Establish a robust hierarchy by assigning managers under sub-admins for effective team management and
                  streamlined operations.</p>
              </span>
              <button class="Establisa-robus-btnn">Add Sub-Admin</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Modal delete -->
  <div class="modal fade" id="exampleDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-event-stl">
            <span class="event-mdl-del">
              <p>Delete Event?</p>
            </span>
            <span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </span>
          </div>

          <p class="event-mdl-par">Lorem ipsum dolor sit amet consectetur. Mauris congue eget felis sed a rutrum
            velit. Amet malesuada nisl facilisis.</p>

        </div>
        <div class="modal-footer-section">
          <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Cancel</button>
          <button @click="deleteEvent()" type="button" class="btn-btn-dle">Delete</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
import { error } from "jquery";
export default {
  data() {
    return {
      draggedItem: null,
      store: [],
      allstore: []

    };
  },

  async mounted() {
    activateMenu('Pipeline', "Pipeline Management");

    if (this.$refs.scrollableDiv) {
      const containerWidth = this.$refs.scrollableDiv?.offsetWidth || 0;
      const scrollWidth = this.$refs.scrollableDiv.scrollWidth;
      this.$refs.scrollableDiv.scrollRight = scrollWidth - containerWidth;
    }
    this.loading = true
    await this.getSingle();
    this.loading = false

  },


  methods: {

    scrollLeft() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft += 200;
      }
    },
    scrollRight() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft -= 200;
      }
    },

    dragStart(index) {
      this.draggedItem = index;
    },
    drop(toIndex) {
      if (this.draggedItem !== null) {
        const draggedItem = this.allstore[this.draggedItem];
        this.allstore.splice(this.draggedItem, 1);
        this.allstore.splice(toIndex, 0, draggedItem);
        this.draggedItem = null;
      }
    },

    async getSingle() {
      await adminGet('/pipeline-lead').then(response => {
        this.store = response.data.data
        this.allstore = response.data.lead
      })
    }
  }



}
</script>

<style scoped>
@import url('./style.css');;

.pipline-view-actual-bodyc {}

.pipline-view-actual-bodyc:active {
  cursor: grabbing;

}
</style>