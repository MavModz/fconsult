<template>

  <div class="details-card">
    <h3 class="details-title">Additional Details</h3>

    <div class="details-grid">
      <div  class="detail-item">

        <span>• Proof of Funds</span>
        <div>{{ data.proof_of_funds }}</div>
      </div>
      <div class="detail-item">

        <span>• Language Test</span>
        <div>{{ data.language_test }}</div>
      </div>
      <div class="detail-item">

        <span>• Required Job Offer</span>
        <div>{{ data.job_offer }}</div>
      </div>
      <div  class="detail-item">

        <span>• Required Job Offer</span>
        <div>
          {{ data.job_search_assistance }}
        </div>
      </div>
      <div  class="detail-item">

        <span>• Job Search Assistance</span>
        <div>{{ data.settlement_services }}</div>
      </div>
      <div class="detail-item">

        <span>• Processing Time</span>
        <div>{{ data.family_sponsorship }}</div>
      </div>
   

    </div>
    <div>
      <h3 class="details-title">PR Benefit</h3>
      <div>
        <p v-html="data.pr_benefit"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {

    }
  },

}
</script>
<style scoped>
.details-card {
  margin-top: 20px;
  background: #fff;
  border-radius: 17px;
  overflow: hidden;
  border: 2px solid #EDEDED;
  padding: 32px 44px;
}

.details-title {
  color: #1F1B2D;
  line-height: 130%;
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 30px;
}

.details-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 38px;
}

.detail-item {
  flex: 1 1 45%;
  /* display: flex; */
  align-items: center;
  gap: 14px;
}

.detail-item span {
  font-size: 19px;
  line-height: 150%;
  color: #1F1B2D;
}

.detail-item img {
  width: 28.5px;
  height: 27px;
}

@media (max-width: 425px) {
  .details-card {
    margin-top: 17px;
    padding: 24px 18px;
  }

  .details-title {
    font-size: 22px;
    margin-bottom: 15px;
  }

  .details-grid {
    gap: 15px;
    flex-direction: column;
  }

  .detail-item {
    gap: 6px;
  }

  .detail-item img {
    width: 24.5px;
    height: 22px;
  }

  .detail-item span {
    font-size: 17px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 890px) {
  .details-card {
    padding: 26px 22px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 1050px) {
  .details-grid {
    gap: 23px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 720px) {
  .details-grid {
    flex-direction: column;
  }

  .details-title {
    margin-bottom: 20px;
  }
}
</style>