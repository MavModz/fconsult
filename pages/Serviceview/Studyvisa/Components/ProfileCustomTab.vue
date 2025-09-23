<template>
  <div class="overview-section">
    <div class="overview-card">
      <!-- <div class="overview-content">
        <h2>Custom Tab</h2> -->

        <div v-for="(ele, index) in displayData" :key="index" class="mb-[46px]">
          <h3 class="mt-[32px]">{{ ele.title }}</h3>
          <p>
            {{ isExpanded[index] || ele.overview.length <= 300 
              ? ele.overview 
              : ele.overview.slice(0, 300) + '...' 
            }}
          </p>
          <a 
            v-if="ele.overview.length > 300" 
            href="#" 
            @click.prevent="toggleReadMore(index)"
            class="read-more"
          >
            {{ isExpanded[index] ? 'Read less' : 'Read more' }}
          </a>
        </div>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: [], 
    };
  },
  computed: {
    displayData() {
      
      if (this.isExpanded.length !== this.data.length) {
        this.isExpanded = this.data.map(() => false);
      }
      return this.data;
    },
  },
  methods: {
  toggleReadMore(index) {
    this.isExpanded[index] = !this.isExpanded[index];
  }
}
};
</script>


<style scoped>
.overview-section {
  margin: 20px 0px 60px;
}

.overview-card {
  background: #fff;
  border-radius: 17px;
  overflow: hidden;
  border: 2px solid #EDEDED;
  padding: 39px 60px 10px;
}
h3{
  font-size:26px;
  font-weight:600;
  margin: 0;
  color: #1F1B2D;
  line-height: 130%;
}
.overview-content {
  margin: auto;
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; */
}
p {
  margin-top: 10px;
  line-height: 150%;
  font-weight: 400;
  font-size: 18px;
  color: #666276;
  margin-bottom: 0px;
}

.read-more {
  color: #ff5757;
  text-decoration: underline !important;
  font-weight: 400;
  font-size: 22px;
  font-weight: 400;
  line-height: 150%;
  display: inline-block;
  margin-top: -2px;
}

@media (max-width: 768px) {
  .overview-card {
    flex-direction: column;
    gap: 20px;
  }

  .overview-content {
    max-width: 100%;
  }
}

@media (max-width: 425px) {
  .overview-section {
    margin-top: 17px;
  }

  .overview-card {
    padding: 24px 18px;
  }

  .overview-content h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 130%;
  }

  p {
    margin-top: 20px;
    line-height: 150%;
    font-size: 16px;
  }

  .read-more {
    font-size: 20px;
    margin-top: 3px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 890px) {
  .overview-card {
    padding: 26px 22px;
  }

  .read-more {
    font-size: 21px;
    margin-top: 4px;
  }

  p {
    margin-top: 20px;
    font-size: 17px;
  }
}
</style>