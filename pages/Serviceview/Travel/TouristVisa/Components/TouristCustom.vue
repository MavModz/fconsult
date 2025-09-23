<template>
  
    <div class="section-p ">
        
        <div class="bg-white main-card relative z-10  p-[15px] sm:p-[20px]" v-for="(ele, index) in data" :key="index">
     
            <div class="flex items-center gap-2">
                <img src="/public/img/png/custom-tab.png">
                <span class="text-[23px] text-[#000000]  font-medium">{{ ele.title }}</span>
            </div>

            <p>
                {{ isExpanded[index] || ele.overview.length <= 300 ? ele.overview : ele.overview.slice(0, 300) + '...'
                }} </p>
                    <a v-if="ele.overview.length > 300" href="#" @click.prevent="toggleReadMore(index)"
                        class="read-more">
                        {{ isExpanded[index] ? 'Read less' : 'Read more' }}
                    </a>

        </div>
    </div>
</template>
<script>
export default {
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
    },
    props: {
        data: Object
    },


};
</script>
<style scoped>
.main-card {
    border:2px solid #E5E5E5EE;
    box-shadow: 0px 1.15px 2.3px 0px #0000000D;
    border-radius: 13px;
    z-index: 1000;
}

.description {
    font-size: 18px;
    color: #666276;
    margin: 12px 0px 14px;
    font-weight: 400;
}

.section-p {
    padding: 30px 72px 0px;
}

.gllry {
    text-decoration: underline !important;
}

@media (max-width: 650px) {
  .section-p {
    padding: 0px 17px;
  }
}
@media  screen and (min-width:890px) and (max-width:1060px) {
  .section-p {
  padding: 24px 52px 0px;
}
}
@media  screen and (min-width:768px) and (max-width:890px) {
   .section-p {
  padding: 24px 42px 0px;
}
}
@media (max-width:768px){
     .section-p {
  padding: 22px 30px 0px;
}
}
@media(max-width:650px){
  .section-p {
  padding: 20px 20px 0px;
}
}
@media(max-width:450px){
  .section-p {
  padding: 16px 16px 0px;
}
}
</style>
