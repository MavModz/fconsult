<template>
  <div class="w-full">
    <div class="w-[80%] m-auto">
      <div class="w-full flex justify-between mt-[50px]">
        <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
          <i class="bi bi-chevron-left"></i> Back
        </a>
        <div>
          <p class="text-gray-500">Step 03/07</p>
          <p class="text-gray-500">Business Info</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-[100px]">

        <div v-for="(card, index) in cards" :key="card.title"
          class="card-category-onboarding group flex items-center gap-[90px] transition justify-between cursor-pointer h-[130px]">
          <div class="flex gap-3">
            <div
              class="icon-wrapper w-12 h-12 flex-shrink-0 rounded-md flex items-center justify-center transition-all duration-300">
              <img :src="card.icon" alt="icon" class="icon group-hover:hidden w-6 h-6 object-contain" />
              <img :src="card.hover_icon" alt="hover icon"
                class="icon-hover hidden group-hover:block w-6 h-6 object-contain" />
            </div>

            <div>
              <p class="text-lg font-semibold text-gray-800">{{ card.title }}</p>
              <p v-if="card.selectedSubcategories.length === 0" :class="{
                'text-sm text-[#000000] underline cursor-pointer': isCardSelected(card),
                'text-sm text-[#bdbdbd] cursor-not-allowed': !isCardSelected(card)
              }" @click="isCardSelected(card) && openSubCategory(card)">
                +Sub Categories
              </p>
              <div v-if="card.selectedSubcategories.length" class="flex mt-2 items-center gap-2">
                <span v-for="(sub, i) in card.selectedSubcategories.slice(0, 2)" :key="i"
                  class="truncate-text bg-[#f0f1f5] text-[#5d6898] text-xs px-2 py-1 rounded-full">
                  {{ sub }}
                </span>

                <!-- Show "+X more" if more than 2 -->
                <span v-if="card.selectedSubcategories.length > 2" @click="openSubCategory(card)"
                  class="text-xs text-blue-600 cursor-pointer">
                  + {{ card.selectedSubcategories.length - 2 }} more
                </span>
                <span v-if="card.selectedSubcategories.length <= 2" @click="openSubCategory(card)"
                  class="text-xs text-blue-600 cursor-pointer underline">
                  +Sub Categories
                </span>
              </div>

            </div>
          </div>

          <div>
            <label class="containers">

              <input type="checkbox" :checked="isCardSelected(card)" @change="toggleCard(card.title)" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

      </div>

      <div class="mt-[100px]">
        <div class="text-center ">
          <button class="onboarding-step3-subcategory bg-[#ff5757] text-white px-[120px] py-2 rounded cursor"
            @click="handleSubmit">PROCEED</button>
        </div>
        <div class="text-center mt-[10px]">
          <span class="text-[13px] text-[#8692a6]">Your info is safety secured</span>

        </div>
      </div>
    </div>
  </div>

  <AllModals ref="allModal" @subCategorySelected="updateSubcategories" />
</template>


<script>
import AllModals from '../Step3_new/Components/AllModals.vue';
export default {
  components: { AllModals },
  props: {
    company: {},
    user: {}
  },
  data() {
    return {
      selectedCards: [], 
      activeCardForSubCategory: null,
      cards: [
        {
          value: 'residency',
          title: "Settle Abroad",
          icon: '/img/svg/Homepage/Red/House.svg',
          hover_icon: '/img/svg/Homepage/White/House.svg',
          subcategories: ['Permanent Residency', 'Citizenship Programs', 'Family Sponsorship Visa', 'Investor Visa', 'Startup Visa'],
          selectedSubcategories: [],
          countries:[],

        },
        {
          value: 'study',
          title: "Study Visa",
          icon: '/img/svg/Homepage/Red/School.svg',
          hover_icon: '/img/svg/Homepage/White/School.svg',
          subcategories: ['College Study Visa', 'School Visa', 'Student Exchange Visa', 'Vocational Training Visa'],
          selectedSubcategories: [],
          countries:[],
        },
        {
          value: 'work',
          title: "Work",
          icon: '/img/svg/Homepage/Red/Work.svg',
          hover_icon: '/img/svg/Homepage/White/Work.svg',
          subcategories: ['Employment Visa', 'Work Visa', 'Business Visa', 'Freelancer Visa', 'Internship Visa'],
          selectedSubcategories: [],
          countries:[],
        },
        {
          value: 'travel',
          title: "Travel",
          icon: '/img/svg/Homepage/Red/Explore.svg',
          hover_icon: '/img/svg/Homepage/White/Explore.svg',
          subcategories: ['Tourist Visa', 'Visitor Visa', 'Business Visit Visa', 'Medical Visa', 'Religious Pilgrimage Visa'],
          selectedSubcategories: [],
          countries:[],
        },
      ],
    };
  },
  mounted() {
    
    if (this.company && this.company.services && this.company.services.length) {
      console.log("this.company.services",this.company.services)
      this.company.services.forEach(service => {
        this.selectedCards.push({ title: service.service, flag: service.flag,countries:service.countries });
        console.log("this.selectedCards",this.selectedCards)
        const card = this.cards.find(c => c.title === service.service);
        if (card) {
          card.selectedSubcategories = service.subcategories || [];
        }
      });
    }
  },
  methods: {

    preparePayload() {
      const finalServices = this.cards
        .filter(card => this.selectedCards.includes(card.value)) // only selected cards
        .map(card => ({
          countries:card.countries || [],
          service: card.value,
          subcategories: card.selectedSubcategories // may be empty
        }));

      return {
        services: finalServices
      };
    },

    async handleSubmit() {
      const invalidCard = this.cards.find(card => {
        const selected = this.selectedCards.find(c => c.title === card.title);
        return selected?.flag && card.selectedSubcategories.length === 0;
      });

      if (invalidCard) {
        errorAlert(`Please select at least one subcategory for "${invalidCard.title}".`)

        return;
      }
      if (this.company.category_update === true) {
        await this.category_update();
        return
      }

      const payload = this.cards
        .filter(card => {
          const match = this.selectedCards.find(c => c.title === card.title);
          return match?.flag;
        })
        .map(card => {
          const match = this.selectedCards.find(c => c.title === card.title);
          return {
            service: card.title,
            flag: match.flag,
            subcategories: card.selectedSubcategories || [],
            countries:card.countries||[],
          };
        });

      const finalPayload = {
        services: payload,
        step: 3
      };

      try {
        await userPost(`/company-reapply/${this.user.company_id}`, finalPayload);
        this.$emit('nextPage'); // always emit nextPage
      } catch (error) {
        this.loading = false;
        await serverErrorMessage(() => this.submitForm());
        return;
      }

      console.log("Final Payload:", finalPayload);
    },



    isCardSelected(card) {
      const found = this.selectedCards.find(c => c.title === card.title);
      return found ? found.flag : false;
    },

    toggleCard(title) {
      const index = this.selectedCards.findIndex(c => c.title === title);
      const card = this.cards.find(c => c.title === title);

      if (index > -1) {
        // Toggle the flag value
        this.selectedCards[index].flag = !this.selectedCards[index].flag;

        // If it's now selected and has no subcategories, open the modal
        if (this.selectedCards[index].flag && card && card.selectedSubcategories.length === 0) {
          this.activeCardForSubCategory = card;
          this.$nextTick(() => {
            this.$refs.allModal.open(card);
          });
        }

      } else {

        this.selectedCards.push({ title, flag: true });

        if (card && card.selectedSubcategories.length === 0) {
          this.activeCardForSubCategory = card;
          this.$nextTick(() => {
            this.$refs.allModal.open(card);
          });
        }
      }
    }
    ,


    openSubCategory(card) {
      console.log("card", card)
      this.activeCardForSubCategory = card;
      this.$refs.allModal.open(card); // call method in modal and pass card
    },

    updateSubcategories(cardValue, selectedSubs) {
      const card = this.cards.find(c => c.value === cardValue);
      if (card) {
        card.selectedSubcategories = selectedSubs;
       
      }
    },
    async category_update() {
      console.log("selectedCards",this.selectedCards)
        const services = this.cards.filter(card => {
          const match = this.selectedCards.find(c => c.title === card.title);
         
          return match?.flag; 
        })
        .map(card => {
          const match = this.selectedCards.find(c => c.title === card.title);
          
          return {
            service: card.title,
            flag: true,
            subcategories: card.selectedSubcategories || [],
            countries:match?.countries,
          };
        });

      const payload = {
        category_update: false,
        services,
      };
   
      try {
        await adminPatch(`/company-update/${this.company._id}`, payload);
       if(this.$route.query.category){
        return this.$router.push({
          path: `/admin/Categories`,
          state: { fromForm: true },
        });
       }
        this.$router.push({
          path: `/admin/business-profile`,
          state: { fromForm: true },
        });
      } catch (error) {
        console.error("Update error:", error);
      }
    },


    async back() {
      this.$emit("prevPage")
    },
  }
}

</script>
<style scoped>
@import url('./style.css');

.onboarding-step3-subcategory:hover {
  color: #ff5757 !important;
  border: 1px solid #ff5757;
  background-color: #ffffff;

}

.onboarding-step3-subcategory {
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.truncate-text {
  max-width: 100px;
  /* Adjust width as per your design */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-category-onboarding {
  padding: 40px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  border: 1px solid #d5d2dc;
  transition: all 0.3s ease;
}

.card-category-onboarding:hover {
  background-color: #ffefef;
  border-color: #ff5757;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffefef;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.group:hover .icon-wrapper {
  background-color: #ff5757;
}

/* Icon sizes should stay consistent */
.icon,
.icon-hover {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Only show one icon at a time */
.icon-hover {
  display: none;
}

.group:hover .icon {
  display: none;
}

.group:hover .icon-hover {
  display: block;
}
</style>
