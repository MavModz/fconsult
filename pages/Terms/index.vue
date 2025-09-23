<script setup>

definePageMeta({
  layout: 'home',
})

</script>

<!-- <template>
  <div class="foruser-page-question">
    <div class="foruser-page-question-col1">
      <div class="foruser-first">
        <h1>Frequently asked questions</h1>
      </div>
      <div class="foruser-second">
        <p>Contact us for more info</p>
      </div>
    </div>

    <div class="foruser-container">

      <div class="accordion">
        <div class="accordion-item">
          <button id="accordion-button-1" aria-expanded="false">
            <span class="Faq-sr">01</span>
            <span class="accordion-title">What is Find & Consult?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Find & Consult is a trusted immigration consultation platform that helps you connect with immigration
              companies and consultants for visa services across India.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-2" aria-expanded="false">
            <span class="Faq-sr">02</span>
            <span class="accordion-title">How does Find & Consult help with the immigration process?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Find & Consult can help you in the visa process by providing you the access to immigration companies listed on the platform based on your location.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-3" aria-expanded="false">
            <span class="Faq-sr">03</span>
            <span class="accordion-title">Is Find & Consult available in my location?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Yes, Just choose your location and get a list of various immigration companies in your area.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-4" aria-expanded="false">
            <span class="Faq-sr">04</span>
            <span class="accordion-title">How do I choose the right immigration agent on Find & Consult?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              You can use the filter feature to find immigration agents based on the visa type, location, budget, and
              others.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-5" aria-expanded="false">
            <span class="Faq-sr">05</span>
            <span class="accordion-title">How can I connect with the visa agents listed on Find & Consult?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Simply browse the list of agents on our platform and use the contact options such as through direct call,
              chat, and enquiry form features to connect with them anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->


<template>
  <div class="foruser-page-question">
    <div class="foruser-page-question-col1">
      <div class="foruser-first">
        <h3>Frequently Asked Questions</h3>
      </div>
      <div class="foruser-second">
        <p @click="$router.push('contact-us')">Contact us for more info</p>
      </div>
    </div>

    <div class="foruser-container">
      <div class="accordion">
        <div v-for="(item, index) in faq" :key="index" class="accordion-item">
          <button @click="toggleAccordion(index)" :aria-expanded="activeIndex === index">
            <span class="Faq-sr">0{{ index + 1 }}</span>
            <span class="accordion-title mr-5">{{ item.question }}</span>
            <span class="icon ml-3" :class="{ active: activeIndex === index }" aria-hidden="true"></span>
          </button>
          <div class="accordion-content" v-show="activeIndex === index">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    faq: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: null, // Tracks the open accordion item
    };
  },
  methods: {
    toggleAccordion(index) {
      // Toggle the clicked accordion item
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>




<style scoped>
* {
  box-sizing: border-box;
}

*::before,
*::after {
  box-sizing: border-box;
}

.foruser-page-question {
  margin-top: 60px !important;
  margin-bottom: 60px !important;
}

.container-consult {
  margin: 0 auto;
  padding: 0rem;
  width: 90%;
}

.accordion .accordion-item {
  border-bottom: 1px solid #ececf1;
  border-right: none;
  border-left: none;
}

.accordion .accordion-item button[aria-expanded='true'] {
  border-bottom: 1px solid #ececf1;
}

.accordion button {
  position: relative;
  display: block;
  text-align: left;
  width: 100%;
  padding: 1em 0;
  color: black;
  font-size: 1.15rem;
  font-weight: 400;
  border: none;
  background: none;
  outline: none;
}

.accordion button:hover,
.accordion button:focus {
  cursor: pointer;
  color: black;
}

.accordion button:hover::after,
.accordion button:focus::after {
  cursor: pointer;
  color: #03b5d2;
  border: 1px solid #03b5d2;
}

.accordion button .accordion-title {
  padding: 1em 1.5em 1em 0;
  font-size: 21px;
  font-weight: 400;
  color: #282938;
  line-height: 26px;
}

.accordion button .icon {
  display: inline-block;
  position: absolute;
  top: 18px;
  right: 0;
  width: 22px;
  height: 22px;
  border: 1px solid;
  border-radius: 22px;
}

.accordion button .icon::before {
  display: block;
  position: absolute;
  content: '';
  top: 9px;
  left: 5px;
  width: 10px;
  height: 2px;
  background: currentColor;
}

.accordion button .icon::after {
  display: block;
  position: absolute;
  content: '';
  top: 5px;
  left: 9px;
  width: 2px;
  height: 10px;
  background: currentColor;
}

.accordion button[aria-expanded='true'] {
  color: black;
}

.accordion button[aria-expanded='true'] .icon::after {
  width: 0;
}

.accordion button[aria-expanded='true']+.accordion-content {
  opacity: 1;
  max-height: fit-content;
  transition: all 200ms linear;
  will-change: opacity, max-height;

}

.accordion .accordion-content {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 200ms linear, max-height 200ms linear;
  will-change: opacity, max-height;
}

.accordion .accordion-content p {
  font-size: 18px;
  font-weight: 300;
  margin: 1em 0;
  color: #282938;
  font-weight: 400;
  padding-left: 40px;
  line-height: 36px;
}

.foruser-page-question {
  width: 80%;
  margin: auto;
  display: flex;
}

.foruser-page-question-col1 {
  width: 50%;
}

.foruser-container {
  width: 90%;
}

.foruser-first {
  font-weight: 600;
  font-size: 38px;
  line-height: 56px;
  color: #282938;
  margin-bottom: 16px;
}

.foruser-second {
  font-size: 18px;
  font-weight: 500;
  color: #ff5757;
  cursor: pointer;
  line-height: 32px;
  align-items: center;
}

.accordion-item {
  border-top: none;
}

.Faq-sr {
  padding-right: 20px;
  font-size: 18px;
  color: #ff5757;
}
@media (min-width: 300px) and (max-width: 565px){
.accordion .accordion-content p {
  font-size: 17px;
  font-weight: 300;
  margin: 0.75em 0;
  color: #282938;
  font-weight: 400;
  padding-left: 20px;
  line-height: 26px;
}
.accordion-title {
  padding: 0.5em 1.5em 0.5em 1em;
  font-size: 19px;
  line-height: 25px;
}
}
@media (min-width: 425px) and (max-width: 1194px) {
  .foruser-page-question {
    flex-direction: column;
    width: 95%;
  }

  .foruser-first {
    width: 95%;
    margin: auto;
    text-align: center;
  }

  .foruser-page-question-col1 {
    width: 80%;
    margin: auto;
    margin-bottom: 10px;
  }

  .foruser-second {
    text-align: center;
  }

  .foruser-container {
    width: 90%;
    margin: auto;
  }

  .faqanswe {
    overflow: scroll;
    color: red
  }

}
@media (min-width: 300px) and (max-width: 835px) {
.foruser-first {
    font-size: 31px;
  }
}
@media (min-width: 300px) and (max-width: 424px) {
  .foruser-container {
    width: 95%;
    margin: auto;
  }

  .foruser-page-question {
    flex-direction: column;
    width: 88%;
  }

  .foruser-first {
    width: 93%;
    margin: auto;
    text-align: center;
    font-size: 27px;
  }

  .foruser-page-question-col1 {
    width: 80%;
    margin: auto;
  }

  .foruser-second {
    text-align: center;
  }

  .accordion-content {
    overflow: scroll;
  }

  @media (min-width: 768px) and (max-width: 980px) {
    .foruser-page-question {
      flex-direction: column;
    }

    .foruser-page-question-col1 {
      width: 100%;
      text-align: center;
    }

    .foruser-first {
      width: 100%;
      text-align: center;
    }

    .foruser-container {
      width: 99%;
      margin: auto;
    }
  }
}
</style>