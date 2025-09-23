<template>
    <div  class="program-section">
        <div v-if="data.program.length == 1" class="program-1-location">
            <div class="program-headerr">
                <h3>{{ data.program[0].purpose_of_visit }}</h3>
                <div class="company d-flex  align-items-center">
                    <div class="company-info">
                        <span class="company-info-head"><i class="bi bi-clock "></i>
                            Processing Time
                        </span>
                        <p class="company-info-text">
                            13 months
                        </p>
                    </div>
                    <div class="company-info">
                        <span class="company-info-head"><i class="bi bi-grid "></i>
                            Visa Type
                        </span>
                        <p class="company-info-text">
                            {{ data.program[0].visa_type_offered }}
                        </p>
                    </div>
                    <div class="company-info">
                        <span class="company-info-head"> <i class="bi bi-cash-stack "></i>
                            Proof Of Funds
                        </span>
                        <p class="company-info-text">


                            {{ data.program[0].proof_of_fund ? "Required" : "Not Required" }}
                        </p>
                    </div>
                    <div class="company-info">
                        <span class="company-info-head"> <i class="bi bi-info-circle "></i>
                            More infoModals
                        </span>
                        <p class="company-info-text underline">
                            <a v-if="data.program[0].upload_broucher" :href="data.program[0].upload_broucher" download
                                target="_blank" class="brochure-btn company-info-text"> Download Brochure</a>


                        </p>




                    </div>
                </div>
                <div class="program-header">
                    <p class="p-label">Province</p>
                    <span v-if="data.program[0].program_province?.length > 0"
                        v-for="(item, index) in data.program[0].program_province">{{ item }}</span>
                </div>
                <div class="program-content">
                    <h4>Eligibility Criteria</h4>
                    <div v-if="!showFull">
                        <p class="mt-3  mb-0 text-[16px] sm:text-[18px] text-[#666276]"
                            v-html="truncateHtml(selectedProgram.service_description, 300)"></p>
                        <button class="text-[#ff5757]  text-[18px] underline mt-1" @click="showFull = true">Read
                            More</button>
                    </div>
                    <div v-else>
                        <p v-html="selectedProgram.service_description"></p>
                        <button class="text-[#ff5757]  text-[18px] underline mt-1" @click="showFull = false">Read
                            Less</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="program-multiple-location">
            <div class="flex divide">
                <div class="w-1/3 program-left-bar ">
                    <div class="header-info mb-3">
                        <h3>Purpose Of Visit</h3>
                    </div>
                    <div v-for="(program, index) in data.program" :key="program._id" :class="[
                        'mt-[18px] cursor-pointer  select-program ',
                        selectedProgram?._id === program._id ? 'bg-[#FF57571A] text-[#ff5757] selected-program border-red-500  border border-[#ff5757]' : 'hover:bg-gray-100 '
                    ]" @click="selectProgram(program)">
                        {{ program.purpose_of_visit }}
                    </div>
                </div>
                <div class="w-2/3 program-right-bar">
                    <div v-if="selectedProgram">
                        <h2 class="text-[#1F1B2D] font-bold">{{ selectedProgram.purpose_of_visit }}</h2>
                        <div class="company mt-3 d-flex align-items-center flex-wrap">
                            <div class="company-info">
                                <span class="company-info-head"><i class="bi bi-clock "></i>
                                    Processing Time
                                </span>
                                <p class="company-info-text">
                                    13 months
                                </p>
                            </div>
                            <div class="company-info">
                                <span class="company-info-head"><i class="bi bi-grid "></i>
                                    Visa Type
                                </span>
                                <p class="company-info-text">
                                    {{ selectedProgram.visa_type_offered }}
                                </p>
                            </div>
                            <div class="company-info">
                                <span class="company-info-head"> <i class="bi bi-cash-stack "></i>
                                    Proof Of Funds
                                </span>
                                <p class="company-info-text">
                                    {{ selectedProgram.proof_of_fund ? "Required" : "Not Required" }}


                                </p>
                            </div>
                            <div v-if="selectedProgram.upload_broucher" class="company-info">
                                <span class="company-info-head"> <i class="bi bi-info-circle "></i>
                                    More infoModals
                                </span>
                                <p class="company-info-text underline">

                                    <a v-if="selectedProgram.upload_broucher" :href="selectedProgram.upload_broucher"
                                        download target="_blank" class="brochure-btn company-info-text"> Download
                                        Brochure</a>
                                </p>
                            </div>
                        </div>
                        <div v-if="!showFull">
                            <p class="selected-p-text mb-0"
                                v-html="truncateHtml(selectedProgram.service_description, 300)"></p>
                            <button class="text-[#ff5757] text-[18px]  mt-2" @click="showFull = true">Read
                                More</button>
                        </div>
                        <div v-else>
                            <p v-html="selectedProgram.service_description" class="mb-0"></p>
                            <button class="text-[#ff5757] text-[18px]  mt-0" @click="showFull = false">Read
                                Less</button>
                        </div>
                        <div>
                            <h3 class="province-head">Provinces</h3>
                            <div class="province-grid">
                                <p class="cell mb-0" v-if="selectedProgram.program_province.length > 0"
                                    v-for="(item, index) in visibleProvinces" :key="index">{{ item }}</p>
                            </div>
                            <div class="load-more my-3 d-flex gap-2 align-items-center text-[#838383] text-[18px]"
                                v-if="visibleCount < selectedProgram.program_province.length" @click="loadMore"><i
                                    class="bi bi-arrow-clockwise"></i>Load More</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




</template>
<script>
export default {
    data() {
        return {
            program_details: null,
            selectedProgram: null,
            showFull: false,
            visibleCount: 6,
        }
    },
    props: {
        data: Object
    },
    watch: {
        'data.program': {
            immediate: true,
            handler(newPrograms) {
                if (newPrograms && newPrograms.length > 0) {
                    this.selectedProgram = newPrograms[0]; // Set first as default
                }
            }
        }
    },
    computed: {
        visibleProvinces() {
            return this.selectedProgram.program_province.slice(0, this.visibleCount);

        }
    }
    ,
    methods: {
        loadMore() {
            this.visibleCount += 6;
        },
        selectProgram(program) {
            this.selectedProgram = program;
        },
        selectProgram(program) {
            this.selectedProgram = program;
            this.showFull = false; // reset on program change
            this.visibleCount = 6;
        },
        truncateHtml(html, limit) {
            const div = document.createElement('div');
            div.innerHTML = html;
            const text = div.innerText;
            return text.length > limit ? text.slice(0, limit) + '...' : text;
        }
    }
}
</script>


<style scoped>
.program-section {
    background: #fff;
    margin-top: 20px;
    border-radius: 17px;
    overflow: hidden;
    border: 2px solid #EDEDED;
    padding: 32px 44px;
}


.select-program {
    box-shadow: 0px 1.34px 12.04px 0px #18191C08;
    border: 0.67px solid #E4E5E8;
    padding: 16px;
    font-weight: 500;
    border-radius: 6px;
}


.selected-program {
    border: 1px solid #FF5757 !important;
    font-weight: 600;
}

.program-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 27px;
    border-bottom: 2px solid #EDEDED;
}


.program-header span {
    border: 1.07px solid #3C3C3C1A;
    border-radius: 100px;
    padding: 8px 18px;
}


.program-headerr h3 {
    color: #1F1B2D;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 18px;
}


.program-content h4 {
    padding-top: 29px;
    color: #1F1B2D;
    font-size: 20px;
    font-weight: 400;
}


.p-label {
    font-size: 21px;
    font-weight: 700;
    color: #909090;
    margin-bottom: 0px;
}


.header-info h3 {
    color: #1F1B2D;
    font-size: 23px;
    font-weight: 700;
    line-height: 130%;
}


.program-left-bar {
    padding: 5px 43px 5px 5px;
    border-right: 2px solid #EDEDED;
}


.program-right-bar {
    padding: 5px 5px 5px 43px;
}


.province-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid #ddd;
    border-radius: 6px;
}


.cell {
    border: 1px solid #ddd;
    padding: 12px;
    min-height: 40px;
}


.selected-p-text {
    color: #666276;
    font-size: 18px;
    line-height: 150%;
}

 button{
text-decoration: underline !important;
}
.province-head {
    margin-top: 19px;
    font-size: 21px;
    font-weight: 700;
    color: #3c3c3c;
}


.company-info-head i {
    color: #838383;
    font-size: 14px;
}


.company-info-text {
    color: #18191C;
    font-weight: 500;
    font-size: 19px;
    margin: 4px 0px 25px;
}


.company-info {
    margin-right: 34px;
}


.company-info-head {
    font-size: 17px;
    list-style: 20px;
    color: #767F8C;
}


@media (max-width: 425px) {
    .program-section {
        margin-top: 17px;
        padding: 24px 18px;
    }


    .header-info h3 {
        font-size: 22px;
        font-weight: 600;
    }


    .selected-p-text {
        font-size: 16px;
    }


    .company-info-text {
        font-size: 18px;
        margin: 4px 0px 18px;
    }


    .program-header {
        gap: 10px;
    }


    .province-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}


@media only screen and (min-width: 650px) and (max-width: 890px) {
    .program-section {
        padding: 25px 22px;
    }
}


@media only screen and (min-width: 425px) and (max-width: 650px) {
    .program-section {
        padding: 25px 22px;
    }
}


@media (max-width : 950px) {
    .company {
        flex-wrap: wrap;
    }
}


@media (max-width : 370px) {
    .company-info {
        margin-right: 8px;
    }
}


@media (max-width : 850px) {
    .divide {
        flex-direction: column;
    }


    .program-left-bar {
        width: 100%;
        border: none;
        padding: 0px;
    }


    .program-right-bar {
        padding: 15px 0px 0px 0px;
        width: 100%;
    }
}


@media only screen and (min-width: 850px) and (max-width: 1024px) {
    .program-left-bar {
        padding: 5px 28px 5px 5px;
    }


    .program-right-bar {
        padding: 5px 5px 5px 28px;
    }
}
</style>
