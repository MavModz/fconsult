<template>

  <div class="overview-section" id="overview">
    <div class="overview-card">
      <div class="overview-content">
        <h2>Overview</h2>
        <div>
          <p v-html="visibleContent"></p>  
          <button v-if="isLong" class="read-more" @click="toggleReadMore">
            {{ isExpanded ? 'Read Less' : 'Read More' }}
          </button>
        </div>
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
      isExpanded: false
    };
  },
  computed: {
    plainText() {
      const div = document.createElement('div');
      div.innerHTML = this.data?.overview || '';
      return div.innerText || div.textContent || '';
    },
    isLong() {
      return this.plainText.length > 300;
    },
    visibleContent() {
      if (this.isExpanded || !this.isLong) {
        return this.data?.overview || '';
      } else {
        const div = document.createElement('div');
        div.innerHTML = this.data?.overview || '';
        const text = div.innerText || div.textContent || '';
        return text.slice(0, 300) + '...';
      }
    }
  },
  methods: {
    toggleReadMore() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style scoped>
.overview-section {
  margin-top: 20px;
}

.overview-card {
  background: #fff;
  border-radius: 17px;
  overflow: hidden;
  border: 2px solid #EDEDED;
  padding: 39px 60px;
}

.overview-content {
  margin: auto;
}

.overview-content h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1F1B2D;
  line-height: 130%;
}

p {
  margin-top: 12px;
  line-height: 150%;
  font-weight: 400;
  font-size: 18px;
  color: #666276;

}

.read-more {
  color: #ff5757;
  text-decoration: underline !important;
  font-weight: 400;
  font-size: 22px;
  line-height: 150%;
  display: inline-block;
  margin-top: 8px;
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

@media (max-width: 450px) {
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

  .brochure-btn {
    margin-top: 0px;
    padding: 4px 10px;
    font-size: 14px;
    line-height: 34px;
    gap: 7px;
  }

  p {
    margin-top: 3px;
    line-height: 150%;
    font-size: 16px;
  }

  .read-more {
    font-size: 20px;
    margin-top: 3px;
  }
}

@media only screen and (min-width: 450px) and (max-width: 890px) {
  .overview-card {
    padding: 26px 22px;
  }

  p {
    margin-top: 0px;
    font-size: 17px;
  }

  .read-more {
    font-size: 20px;
    margin-top: 4px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 640px) {
  .overview-content h2 {
    font-size: 26px;
    font-weight: 700;
    line-height: 130%;
  }

  .brochure-btn {
    padding: 4px 10px;
    font-size: 14px;
    line-height: 34px;
    gap: 7px;
  }
}
</style>