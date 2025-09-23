<template>
    <div class="bg-[#f8f7fc] w-[100%] px-0 py-10 md:px-10 lg:px-20">
    <section class="px-5 py-14 md:px-10 lg:px-20 bg-[#ffffff] w-[90%] m-auto rounded-2xl">
        <div class="text-center mb-[30px] ">
            <h3 class="font-semibold text-[24px] leading-[100%] mb-[12px] text-[#000000]"> Dream Big Move Global</h3>
            <p class="font-normal text-[16px] leading-[130%] opacity-75">Select your Visa Type & Connect with Top Immigration Experts</p>
        </div>
        <div class="containerr mx-auto">
            <div class="herosection-category grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               
                <div v-for="(card, index) in cards" :key="index" @click="goToSearch('business-listing', `${card.search_path}`)"
        
                    class="card relative group rounded-lg overflow-hidden transition-all duration-500 cursor-pointer border border-[#ededed]">
                    <div class="card-content relative z-10 flex flex-col justify-end m-auto pl-[20px] gap-[5px]">
                        <div class="icon-wrapper w-[40px] h-[40px] bg-[#ffefef] rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500 mb-[10px]">
                            <!-- Use dynamic binding for icon -->
                            <img :src="card.icon" class="icon w-[70%] m-auto  transition-all duration-300 group-hover:hidden" />
                            <img :src="card.hover_icon" class="icon-hover w-[70%] m-auto transition-all duration-300 group-hover:block" />
                        </div>
                        <h3 class="herosection-title text-black font-bold text-[29px]  lg:text-xl">{{ card.title }}</h3>
                        <p class="herosection-description text-[#3c3c3c] font-normal text-[15px] opacity-80">{{ card.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<style scoped>
.group {
    height: 180px;
}

.card {
    transition: all 0.3s ease-in-out;
}

.card:hover {
    background-color: #ffefef;
    /* Light red background on hover */
}

.card:hover .herosection-title {
    color: #ff5757 !important;
    /* Red color for the title on hover */
}

.icon-wrapper {
    transition: all 0.3s ease-in-out;
}

.icon {
    display: block;
    transition: all 0.3s ease-in-out;
}

.icon-hover {
    display: none;
    transition: all 0.3s ease-in-out;
}

.group:hover .icon {
    display: none; /* Hide the original icon */
}

.group:hover .icon-hover {
    display: block; /* Show the hover icon */
}

.group:hover .icon-wrapper {
    background-color: #ff5757; /* Set background color to blue on hover */
}
@media (max-width: 1050px) {
    .herosection-title{
        font-size:16px
    }
    .herosection-description{
     font-size: 14px;
    }
    
}
@media (max-width:10px){

    
}
</style>

<script>
export default {
    data() {
        return {
            cards: [
                {
                    path: '/permanent-residency',
                    search_path: "Permanent Residency",
                    title: "SETTLE ABROAD",
                    description: "Connect with trusted immigration consultants to settle abroad.",
                    image: "/img/png/Homepage/image 19.png",
                    activeName: 'Pr',
                    icon: '/img/svg/Homepage/Red/House.svg',
                    hover_icon: '/img/svg/Homepage/White/House.svg'
                },
                {
                    path: '/study-visa',
                    search_path: "Study Visa",
                    title: "STUDY OVERSEAS",
                    description: "Get help from top experts to study in your dream country.",
                    image: "/img/png/Homepage/image 19 (1).png",
                    activeName: 'Study',
                    icon: '/img/svg/Homepage/Red/School.svg',
                    hover_icon: '/img/svg/Homepage/White/School.svg'
                },
                {
                    title: "WORK ABROAD",
                    search_path:"Work Visa",
                    description: "Find the best consultants to land your dream job abroad.",
                    image: "/img/png/Homepage/image 19 (2).png",
                    path: '/work-visa',
                    activeName: 'Work',
                    icon: '/img/svg/Homepage/Red/Work.svg',
                    hover_icon: '/img/svg/Homepage/White/Work.svg'
                },
                {
                    path: '/tourist-visa',
                    search_path:"Tourist Visa",
                    title: "TRAVEL GLOBALLY",
                    description: "Explore top immigration companies for hassle-free relocation.",
                    image: "/img/png/Homepage/image 19 (3).png",
                    activeName: 'Tourist',
                    icon: '/img/svg/Homepage/Red/Explore.svg',
                    hover_icon: '/img/svg/Homepage/White/Explore.svg'
                },
            ],
        };
    },

    methods:{
        goToSearch(activeButtonValue, categoryValue) {
            this.$router.push({
                path: '/search',
                query: {
                    activeButton: activeButtonValue,
                    category: categoryValue
                },
            });
        },
    }
   
};
</script>
