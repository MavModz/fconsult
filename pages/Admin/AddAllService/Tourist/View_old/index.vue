

<template>
  <div class="tourist-home-container">
    <div class="tourist-home-wrapper">
      <div class="view-services-header-content">
        <router-link to="/admin/services/tourist/add">
          <button class="your-events-btn"><span class="your-event-addsign">+</span> Add New Package</button>
        </router-link>
      </div>
      <div class="tourist-home-content">
        <div class="tourist-home-content-left">
          <div v-for="item in itemStore" :key="index" class="tourist-home-cnt-bxsh-left">
            <div class="tourist-home-content-left-wrap">
              <div class="tourist-home-content-left-wrap-imgde">
                <img src="/img/png/zoo.png" alt="" />
              </div>
              <div class="abs-meda-tourist">
                <div class="dropdown">
                  <button class="action_btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon1"/>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a> <i class="bi bi-pencil-square"></i> View</a>
                    </li>
                    <li>
                      <a><i class="bi bi-trash3"></i> Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="tourist-home-postabs-zoo">
                <div class="tourist-home-postabs-zoo-align">
                  <img src="/img/png/lgoo.png" alt="" />
                  <span class="tourst-hm-tv"> It Pro TV</span>
                </div>
                <div class="tourist-hme-toggle">
                  <div class="tourst-hm-tv-price">From Rs{{ item.price }} </div>
                </div>

              </div>
              <div class="offer-flx-tgla">
                <span data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"
                  class="toggle-form" :class="{ toggle_active: toggleActive }" @click="toggle">
                  <span class="frm-toggle-inside"></span>
                </span>
                <span style="color: #fff">Offer</span>
              </div>
            </div>
            <div class="tourist-hme-belw-cont-padd">
              <div class="tourist-hme-loct-gujrt">
                <span>
                  <i class="bi bi-geo-alt"></i>
                </span>
                <span class="tourist-hme-loct-indi">
                  {{ item.address }}
                </span>
              </div>
              <span class="toueist-hom-3daysa">{{ item.duration }}days tour: Travel’s The World One Place At A
                Time</span>
              <span class="tourist-hm-revwa-sp-gpp">
                <span><i class="bi bi-star"></i></span>
                <span class="tourist-hm-revwa-sp">(35 Reviews)</span>
              </span>
            </div>
            <div class="tourist-hme-pop-night">
              <span class="tourist-hm-revwa-nightt">
                {{ item.days_night }}
              </span>
              <span class="tourist-hme-pop-night-paddjk">
                <i class="bi bi-star"></i>
                <span class="tourist-hom-pop-sstrr">{{ item.popular }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="tourist-home-content-right">
          <div class="tourist-home-content-right-inner">
            <div class="tourist-home-content-right-lion">
              <img src="/img/png/lion.png" alt="" />
            </div>
            <div class="tourist-basic-header">
              <span class="tourist-basic-basdgn">The Land Of Lions</span>
              <div class="nights-5days">
                <span class="tourist-basic-he-4days">4 Nights</span>
                <span class="tourist-basic-he-5days">Or 5 Days</span>
              </div>
            </div>
            <div class="tourist-home-zalotech">
              <div>
                <span class="tourist-home-flx-dgnn-zal">
                  <span><i id="bootstr-edt-icnn" class="bi bi-pencil-square"></i></span>
                  <span class="torst-home-zloo-tecc">Zalo Tech Company</span>
                </span>
                <span class="tourist-home-flx-dgnn-zal">
                  <span><i class="bi bi-geo-alt"></i></span>
                  <span class="torst-home-zloo-tecgujc">Gujrat, India</span>
                </span>
              </div>
              <div>
                <span><img src="/img/png/mn.png" alt="" /></span>
                <span class="tourst-hme-rs34ge"> Rs. 28,456</span>
                <span class="tourst-hme-rs34ge-prsd"> /Person</span>
              </div>
            </div>
            <div class="jblst-brd-cmp"></div>
            <div>
              <span class="tourist-hme-description">Description</span>
              <p class="tourist-hme-description-pargg">
                Lorem ipsum dolor sit amet consectetur. Enim ullamcorper ut congue est enim cursus venenatis pulvinar.
                Arcu pellentesque porttitor amet massa. Maecenas eget auctor mauris tellus aliquam rutrum justo id. Nunc
                in iaculis pellentesque vulputate tortor.
              </p>
            </div>
            <div class="jblst-brd-cmp"></div>
          </div>
          <div class="tourist-hme-dayplan">
            <div class="tourist-min-wdth-dag">
              <span class="tourist-home-daystule">Day Plan</span>
              <div>
                <button class="tourist-home-active-day" :class="{ actived: activeDay === 'day01' }"
                  @click="setActiveDay('day01')"><i class="bi bi-dot"></i>Day 01</button>
                <div class="tourist-home-belowspan-grhght"></div>
                <button class="tourist-home-active-day" :class="{ actived: activeDay === 'day02' }"
                  @click="setActiveDay('day02')"><i class="bi bi-dot"></i>Day 02</button>
                <div class="tourist-home-belowspan-grhght"></div>
                <button class="tourist-home-active-day" :class="{ actived: activeDay === 'day03' }"
                  @click="setActiveDay('day03')"><i class="bi bi-dot"></i>Day 03</button>
                <div class="tourist-home-belowspan-grhght"></div>
                <button class="tourist-home-active-day" :class="{ actived: activeDay === 'day04' }"
                  @click="setActiveDay('day04')"><i class="bi bi-dot"></i>Day 04</button>
                <div class="tourist-home-belowspan-grhght"></div>
                <button class="tourist-home-active-day" :class="{ actived: activeDay === 'day05' }"
                  @click="setActiveDay('day05')"><i class="bi bi-dot"></i>Day 05</button>
              </div>
            </div>
            <div class="jblst-brd-cmp-day"></div>
            <div class="width-flight-tnkc">
              <span class="tourist-hme-arrivalday">Day 1-Arrival in Ahmedabad</span>
              <div class="tourist-hme-flight-from">
                <span class="tourist-home-closestl">
                  <span>Flight from New Delhi to Ahmedabad</span>
                  <span class="tourist-home-cross-back"><i id="cross-btn-clrdf" class="bi bi-x"></i></span>
                </span>
                <div class="tourist-home-flig-time-fe">
                  <span class="used-torot-med">
                    <p class="tourist-home-15strt">00:15</p>
                    <p class="tourist-home-15strt-tut">Tugu station (YK)</p>
                  </span>
                  <span class="trst-mhe-dash"></span>
                  <span class="trst-mhe-aeroplane-dgn">
                    <i id="home-trst-arpl-red" class="bi bi-airplane"></i>
                    <p class="trst-mhe-aeroplane-dgn-3hr50">3h 40m (direct)</p>
                  </span>
                  <span class="trst-mhe-dash"></span>
                  <span class="trst-mhe-dash-lastvd">
                    <p class="tourist-home-15strt">03:15</p>
                    <p class="tourist-home-15strt-tut">pasar senen (YK)</p>
                  </span>
                </div>
                <div class="tourist-home-cabin-7kgs">
                  <span class="span-cabin-ks">
                    Cabin:
                    <p class="tourist-home-cabin-7kgs-pt">7 Kgs (1 piece only)</p>
                  </span>
                  <span class="span-cabin-ks">
                    Check-In
                    <p class="tourist-home-cabin-7kgs-pt">15 Kgs</p>
                  </span>
                </div>
              </div>
              <div class="tourist-day-layovrinlo">
                06h 30m - Layover in LKO, Lucknow
              </div>
              <div class="tourist-hme-flight-from-2nd">
                <span class="tourist-home-closestl">
                  <span> Layover in LKO 6E-279</span>
                  <span class="tourist-home-cross-back"><i id="cross-btn-clrdf" class="bi bi-x"></i></span>
                </span>
                <div class="tourist-home-flig-time-fe">
                  <span class="used-torot-med">
                    <p class="tourist-home-15strt">00:15</p>
                    <p class="tourist-home-15strt-tut">Tugu station (YK)</p>
                  </span>
                  <span class="trst-mhe-dash"></span>
                  <span class="trst-mhe-aeroplane-dgn">
                    <i id="home-trst-arpl-red" class="bi bi-airplane"></i>
                    <p class="trst-mhe-aeroplane-dgn-3hr50">3h 40m (direct)</p>
                  </span>
                  <span class="trst-mhe-dash"></span>
                  <span class="trst-mhe-dash-lastvd">
                    <p class="tourist-home-15strt">03:15</p>
                    <p class="tourist-home-15strt-tut">pasar senen (YK)</p>
                  </span>
                </div>
                <div class="tourist-home-cabin-7kgs">
                  <span class="span-cabin-ks">
                    Cabin:
                    <p class="tourist-home-cabin-7kgs-pt">7 Kgs (1 piece only)</p>
                  </span>
                  <span class="span-cabin-ks">
                    Check-In
                    <p class="tourist-home-cabin-7kgs-pt">15 Kgs</p>
                  </span>
                </div>
              </div>
              <div class="tourist-hme-flight-from-2nd">
                <span class="tourist-home-closestl">
                  <span> Layover in LKO 6E-279</span>
                  <span class="tourist-home-cross-back"><i id="cross-btn-clrdf" class="bi bi-x"></i></span>
                </span>
                <div class="tourist-home-flig-time-fe">
                  <span class="car-dsp-flx-alg">
                    <i id="home-trst-arpl-reds" class="bi bi-car-front-fill"></i>
                    <p class="tourist-home-15strt-tut-prv">Private Transfer</p>
                  </span>
                  <span class="trst-mhe-dash"></span>
                  <span class="trst-mhe-aeroplane-dgn">
                    <p class="trst-mhe-aeroplane-dgn-3hr50">Swift, Etios or similar</p>
                  </span>
                  <span class="trst-mhe-dash"></span>
                  <span class="trst-mhe-dash-lastvd">
                    <img src="/img/png/hmm.png" alt="" />
                  </span>
                </div>
                <div class="tourist-home-cabin-7kgs">
                  <span class="span-cabin-ks">3 Seater</span>
                  <span class="span-cabin-ks">2 Laguage Bag</span>
                </div>
              </div>
              <div class="tourist-hme-flight-from-2nd">
                <span class="tourist-home-closestl">
                  <span> Layover in LKO 6E-279</span>
                  <span class="tourist-home-cross-back"><i id="cross-btn-clrdf" class="bi bi-x"></i></span>
                </span>
                <div class="tourist-home-flig-time-fe-mg">
                  <div class="min-width-trst-rigt-gd">
                    <img src="/img/png/asda.png" alt="" />
                  </div>
                  <div>
                    <span class="home-tourist-resrt">Resort</span>
                    <div class="dsp-flx-restvdfv">
                      <img src="/img/png/hmm.png" alt="" />
                      <p class="dsp-flx-restvdfv-gir">Gir Night Resort</p>
                      <i class="bi bi-info-circle"></i>
                    </div>
                    <span> 4/5 <i class="bi bi-star"></i> </span>
                    <br />
                    <span class="trst-lrm-ipsum-rest">
                      Lorem ipsum dolor sit amet consectetur. Enim ullamcorper ut congue est enim cursus venenatis
                      pulvinar. Arcu pellentesque porttitor amet massa. Maecenas eget auctor mauris tellus aliquam
                      rutrum
                      justo id.Nunc in iaculis pellentesque vulputate tortor.
                    </span>
                    <div class="torst-hm-date-23jan">
                      <i class="bi bi-calendar-event"></i>
                      Thu, 13 Jun 2024 - Sat, 15 Jun 2024
                    </div>
                  </div>
                </div>
                <div class="tourist-home-cabin-7kgs">
                  <span class="span-cabin-ks">3 Seater</span>
                  <span class="span-cabin-ks">2 Laguage Bag</span>
                </div>
              </div>
              <div class="tourist-hme-flight-from-2nd">
                <span class="tourist-home-closestl">
                  <span>Activity in Sasan Gir 2 Hrs</span>
                  <span class="tourist-home-cross-back"><i id="cross-btn-clrdf" class="bi bi-x"></i></span>
                </span>
                <div class="tourist-home-flig-time-fe-mg">
                  <div class="min-width-trst-rigt-gd">
                    <img src="/img/png/asda.png" alt="" />
                  </div>
                  <div>
                    <div class="dsp-flx-restvdfv">
                      <span><i id="home-trst-arpl-reds-jn" class="bi bi-clock"></i></span>
                      <span class="jungle-storylet">Jungle Storytelling Session at Sasan Gir National Park</span>
                    </div>
                    <span> <i class="bi bi-geo-alt"></i> Sasan Gir, India </span>
                    <br />
                    <span class="trst-lrm-ipsum-rest">
                      Lorem ipsum dolor sit amet consectetur. Enim ullamcorper ut congue est enim cursus venenatis
                      pulvinar. Arcu pellentesque porttitor amet massa.
                    </span>
                  </div>
                </div>
              </div>
              <div class="end-day-divstl">
                <p class="end-of-day-trst">End Of Day - Spend time at Leisure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div class="offcanvas offcanvas-end offcanv-strst-filter" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop"
    aria-labelledby="staticBackdropLabel">

    <div class="modal-body-offcan-trst">
      <div class="">
        <img style="cursor: pointer;" src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" @click="closeCanvas"
      </div>
      <div class='job-offcanvs-wrapper'>
        <span>Offer Listing</span>
        <div class="offcan-vastrst-wdth">
          <div v-for="item in itemStore" :key="index" class="tourist-home-cnt-bxsh-left">
            <div class="tourist-home-content-left-wrap">
              <div class="tourist-home-content-left-wrap-canvas">
                <img src="/img/png/zoo.png" alt="" />
              </div>
              <div class="tourist-home-postabs-zoo">
                <div class="tourist-home-postabs-zoo-align">
                  <img src="/img/png/lgoo.png" alt="" />
                  <span class="tourst-hm-tv"> It Pro TV</span>
                </div>
                <div class="tourist-hme-toggle">
                  <div class="tourst-hm-tv-price">From Rs{{ item.price }} </div>
                </div>

              </div>
            </div>
            <div class="tourist-hme-belw-cont-padd">
              <div class="tourist-hme-loct-gujrt">
                <span>
                  <i class="bi bi-geo-alt"></i>
                </span>
                <span class="tourist-hme-loct-indi">
                  {{ item.address }}
                </span>
              </div>
              <span class="toueist-hom-3daysa-canvas">{{ item.duration }}days tour: Travel’s The World One Place At A
                Time</span>
              <span class="tourist-hm-revwa-sp-gpp">
                <span><i class="bi bi-star"></i></span>
                <span class="tourist-hm-revwa-sp">(35 Reviews)</span>
              </span>
            </div>
            <div class="tourist-hme-pop-night">
              <span class="tourist-hm-revwa-nightt">
                {{ item.days_night }}
              </span>
              <span class="tourist-hme-pop-night-paddjk">
                <i class="bi bi-star"></i>
                <span class="tourist-hom-pop-sstrr">{{ item.popular }}</span>
              </span>
            </div>
          </div>
        </div>
        <div >
            <div class="offcanvas-fieldname-container">
              <label class="offcanvs-offrname-labl">Offer Name</label>
              <input type="text" placeholder="Offer Name" class="offcanvs-offrname-inpt">
            </div>

            <div class="offcanvas-fieldname-container">
              <label class="offcanvs-offrname-labl">Description</label>
              <textarea name="" id="descripto-offcnvs-trst" cols="5" rows="5"></textarea>
            </div>

            <div class="offcanvas-fieldname-container">
              <label class="offcanvs-offrname-labl">Start Date</label>
              <input type="datetime-local" placeholder="Offer Name" class="offcanvs-offrname-inpt">
            </div>

            <div class="offcanvas-fieldname-container">
              <label class="offcanvs-offrname-labl">End Date</label>
              <input type="datetime-local" placeholder="Offer Name" class="offcanvs-offrname-inpt">
            </div>

            <button class="promote-btn-offcanvass" data-bs-toggle="modal" data-bs-target="#exampleModal">Promote</button>
            <span class="promote-gobck-offcanvass"  data-bs-dismiss="offcanvas" @click="closeCanvas">Go back</span>

            
        </div>
      </div>
    </div>
  </div>


<!-- modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body-del">
            <div class="modal-event-stl">
                <span class="event-mdl-del">
                  <p >Cancel Promotion?</p>
                </span>
              <span>
                  <button type="button" id="achvr-btn-cross" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </span>
            </div>

            <p class="event-mdl-par">Lorem ipsum dolor sit amet consectetur. Mauris congue eget felis sed a rutrum
              velit. Amet malesuada nisl facilisis.</p>

          </div>
          <div class="modal-footer-section">
            <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">Cancel</button>
            <button type="button" class="btn-btn-dle">Confirm</button>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
  data() {
    return {
      loading: true,
      activeTab: 'All',
      listings: [],
      toggleActive: false,
      itemStore: [
        { price: "28,968.00", address: "Gujrat, India", duration: "3", days_night: "4 Night / 5 Days", popular: "POPULAR" },
      ],
    };
  },
  mounted() {
    activateSubmenu('b3', 'All Services');

    this.init();
  },
  methods: {
    toggle() {
      this.toggleActive = !this.toggleActive;
    },
    closeCanvas(){
      this.toggleActive=false;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    async init() {
      this.loading = true;
      await adminGet(`/view-listing/Study Visa`).then((response) => {
        this.listings = response.data.data;
      })
      this.loading = false;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');;
</style>
