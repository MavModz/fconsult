<!-- <template>
    <div v-for="section in integrationSections" :key="section.title" class="mb-5">
  <div class="crm-details mb-3">
    <div>
      <h3>{{ section.title }}</h3>
      <p class="mb-0">{{ section.description }}</p>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-4" v-for="data in section.items" :key="data.id">
      <div class="card mb-3 border-radius">
        <div class="card-body" :class="{
          'upcoming-card': data.isUpcoming,
          'without-crm': !data.crmIncuded && !data.isUpcoming
        }">
          <div class="upper-section">
            <div class="upper-icon mb-3">
              <img :src="'/img/svg/' + data.image" height="50px" width="50px" alt="Icon" />
            </div>
          </div>
          <div class="card-title-desc">
            <h4 class="card-title-2">{{ data.name }} <br /></h4>
          </div>
          <p class="card-text truncated-text">
            {{ data.description }}
          </p>

          <hr />
          <div class="end-section">
            <a class="btn get-started hover-effect" @click="getStarted(data)" role="button">Get Started</a>
          </div>
        </div>

        <div class="upcoming-strip" v-if="data.isUpcoming">
          <div class="lock-icon">
            <i class="bi bi-person-fill-lock"></i>
            <p>Coming Soon</p>
          </div>
        </div>

        <div class="without-crm-strip" v-if="!data.crmIncuded && !data.isUpcoming">
          <p class="mb-0" @click="redirectToPlans">Included With CRM</p>
        </div>
      </div>
    </div>
  </div>
</div>

<app-settings v-if="!fromIntegration" /> -->

  <!-- <div class="card mb-3 border-radius">
    <div class="card-body" :class="{
      'upcoming-card': data.isUpcoming,
      'without-crm': !data.crmIncuded && !data.isUpcoming
    }">
      <div class="upper-section">
        <div class="upper-icon mb-3">
          <img :src="'/img/svg/' + data.image" height="50px" width="50px" />
        </div>
      </div>
      <div class="card-title-desc">
        <h4 class="card-title-2">{{ data.name }}</h4>
      </div>
      <p class="card-text truncated-text">{{ data.description }}</p>
      <hr />
      <div class="end-section">
        <a class="btn get-started hover-effect" @click="$emit('get-started', data)" role="button">Get Started</a>
      </div>
    </div>
    <div class="upcoming-strip" v-if="data.isUpcoming">
      <div class="lock-icon">
        <i class="bi bi-person-fill-lock"></i>
        <p>Coming Soon</p>
      </div>
    </div>
    <div class="without-crm-strip" v-if="!data.crmIncuded && !data.isUpcoming">
      <p class="mb-0" @click="$emit('redirect-to-plans')">Included With CRM</p>
    </div>
  </div> -->
<!-- </template> -->

<script>
export default {
  props: {
    data: Object
  }
}
</script>
