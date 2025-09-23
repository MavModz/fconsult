<template>

    <div class="program-section">
        <div v-if="data.location.length == 1" class="program-1-location">
            <div class="program-header">
                <div class="info">
                    <h3>Programs @{{ data.title }}</h3>
                    <div class="location">
                        <img src="/public/img/png/location-lightgrey.png">
                        <p>{{ data.location[0] }}</p>
                    </div>
                </div>
                <div class="dropdown">
                    <select class="custom-select" v-model="selectedProgramType" required>
                        <option value="">AllField Of Study</option>
                        <option v-for="(ele, inx) in data.program_category">{{ ele }}</option>
                    </select>
                </div>
            </div>
            <div class="program-list">
                <div v-for="(ele, inx) in filteredPrograms" class="program-card">
                    <div class="program-card-1">
                        <div class="card-header">
                            <h4>{{ ele.program_name }}</h4>
                            <div @click="programdetails(ele)"><img src="/public/img/png/redirect-red.png"></div>
                        </div>
                        <p class="fee">FEE <span> ₹ <span class="fee-black">{{ ele.application_fee }}</span>
                                <!-- <span class="fee-black">25K - </span> ₹<span
                                    class="fee-black">45K</span> -->
                            </span></p>
                    </div>
                    <div class="card-details">
                        <div class="detail">
                            <div class="d-flex align-items-center gap-[3px] card-detail-head"><span><img
                                        src="/public/img/png/Study-icon.png"></span> Study Level</div>
                            <div class="card-detail-text">{{ ele.study_level }}</div>
                        </div>
                        <div class="detail">
                            <div class="d-flex align-items-center gap-[3px] card-detail-head">
                                <span><img src="/public/img/png/Duration-icon.png"></span> Duration
                            </div>
                            <div class="card-detail-text">{{ ele.duration_of_study }}</div>
                        </div>
                        <div class="detail">
                            <div class="d-flex align-items-center gap-[3px] card-detail-head">
                                <span><img src="/public/img/png/Calender-icon.png"></span> Starting from
                            </div>
                            <div class="card-detail-text">{{ formatMonthYear(ele.course_start_date) }}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div v-else class="program-multiple-location">
            <div class="program-header">
                <div class="header-info">
                    <h3>Programs</h3>
                </div>
                <div class="dropdown-1 dropdown">
                    <select class="custom-select" v-model="selectedProgramType" required>
                        <option value="">All Field Of Study</option>
                        <option v-for="(ele, inx) in data.program_category">{{ ele }}</option>
                    </select>
                </div>
            </div>
            <div class="program-layout">

                <div class="locations">
                    <h2>Location-Based Courses</h2>

                    <div v-for="(ele, i) in sortedLocations" :key="i"
                        :class="['location-card', selectedLocation === ele ? 'selected' : '']"
                        @click="selectLocation(ele)">

                        <p class="title">{{ data.title }}</p>
                        <div class="address">
                            <img src="/public/img/png/location-lightgrey.png">
                            <p>{{ ele }}</p>
                        </div>
                    </div>


                </div>

                <div class="program-grid" v-if="filteredPrograms.length>0">
                    <div  class="program-cards">
                        <div class="program-card" v-for="(ele, ind) in filteredPrograms" :key="ind">
                            <div class="program-card-1">
                                <div class="card-header">
                                    <h4>{{ ele.program_name }}</h4>
                                    <div @click="programdetails(ele)"><img src="/public/img/png/redirect-red.png"></div>
                                </div>
                                <p class="fee">FEE <span> ₹<span class="fee-black">{{ ele.application_fee
                                }}</span></span></p>
                            </div>
                            <div class="card-details">
                                <div class="detail">
                                    <div class="d-flex align-items-center gap-[3px] card-detail-head"><span><img
                                                src="/public/img/png/Study-icon.png"></span> Study Level</div>
                                    <div class="card-detail-text">{{ ele.study_level }}</div>
                                </div>
                                <div class="detail">
                                    <div class="d-flex align-items-center gap-[3px] card-detail-head">
                                        <span><img src="/public/img/png/Duration-icon.png"></span> Duration
                                    </div>
                                    <div class="card-detail-text">{{ ele.duration_of_study }}</div>
                                </div>
                                <div class="detail">
                                    <div class="d-flex align-items-center gap-[3px] card-detail-head">
                                        <span><img src="/public/img/png/Calender-icon.png"></span> Starting from
                                    </div>
                                    <div class="card-detail-text">{{ formatMonthYear(ele.course_start_date) }}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                     <div  class="w-3/5  d-flex align-items-center justify-content-center" v-else>
                        <p class="text-center">No Program Found !</p>
                     </div>
                
            </div>

        </div>
    </div>

    <Dialog v-model:visible="infoModals" modal header="Program Details"
        class="popup-container admin-studyvisa-programform" :style="{ padding: '2rem 0rem' }"
        :breakpoints="{ '1199px': '90vw', '575px': '98vw' }">
    
        <div class="modal-header">
            <h1>{{ program_details.program_name }}</h1>

        </div>
        <p class="tuition-fee">
            <span class="label">Tuition Fees</span> Rs <span class="amount"> {{ program_details.annual_tution_fee }} /
                yr</span>
        </p>
        <div>
            <p v-html="displayedDescription" class="description"> </p>
            <br>
            <button v-if="isLongDescription" @click="toggleReadMore" class="read-more">
                {{ showFullDescription ? 'Read Less' : 'Read More' }}
            </button>

        </div>
        <div class="info-grid">
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span> Study Level</div>
                <div class="card-detail-text">{{ program_details.study_level }}</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span> Duration
                </div>
                <div class="card-detail-text">{{ program_details.duration_of_study }}</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span> Mode of Study
                </div>
                <div class="card-detail-text">{{ program_details.mode_of_study }}</div>
            </div>
            <!-- <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span>Total Intake
                </div>
                <div class="card-detail-text">2,245</div>
            </div> -->
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span> Starting from
                </div>
                <div class="card-detail-text">{{ formatMonthYear(program_details.course_start_date) }}</div>
            </div>
            <!-- <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span>Language Proficiency</div>
                <div class="card-detail-text">IELTS, PTE, TOEFL</div>
            </div> -->
            <!-- <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span>Living Expenses</div>
                <div class="card-detail-text">USD 38K / yr</div>
            </div> -->
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span>Post-Study Work Permit</div>
                <div class="card-detail-text">{{ program_details.permit_eligibility ? "Allowed" : "False" }}</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span> Ending On
                </div>
                <div class="card-detail-text">{{ formatMonthYear(program_details.course_end_date) }}</div>
            </div>
            <!-- <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span>Minimum Score
                </div>
                <div class="card-detail-text">7.8 GPA</div>
            </div> -->
            <!-- <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span> Minimum Language Score
                </div>
                <div class="card-detail-text">7.8 GPA</div>
            </div> -->
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span>Internship Opportunities
                </div>
                <div class="card-detail-text">{{ program_details.internship_include ? "Allowed" : "False" }}</div>
            </div>
        </div>
        <div class="footer-row">
            <button class="app-fee">Application Fee <strong>Rs {{ program_details.application_fee }}</strong></button>
            <div class="d-flex align-items-center gap-[5.5px]">
                <img src="/public/img/png/Duration-icon-big.png" class="deadline-img">
                <div class="deadline"> Deadline <span>{{ formatDate(program_details.application_deadline) }}</span>
                </div>
            </div>
        </div>


    </Dialog>

</template>
<script>
export default {
    data() {
        return {
            selectedLocation: '',
            selectedProgramType: '',
            infoModals: false,
            program_details: null,
            showFullDescription: false
        }
    },
    props: {
        data: Object
    },
    mounted() {
        if (this.data.location.length > 4) {
            if (this.sortedLocations.length > 0) {
                this.selectedLocation = this.sortedLocations[0];
            }
        }



    },
    watch: {

        selectedProgramType(newVal) {
            if (newVal) {
                this.selectedLocation = ''; // Disable location filter when program type is selected
            }
        }
    },
    computed: {
        sortedLocations() {
            if (!this.data.location || !this.data.program) return [];

            const locationCounts = this.data.location.map(loc => {
                const count = this.data.program.filter(
                    p => p.campus_location === loc
                ).length;
                return { location: loc, count };
            });

            locationCounts.sort((a, b) => b.count - a.count);
            return locationCounts.map(item => item.location);
        },

        filteredPrograms() {
            let programs = this.data.program;

            if (this.selectedProgramType) {
                return programs.filter(
                    (ele) => ele.program_type === this.selectedProgramType
                );
            }


            if (this.selectedLocation) {
                return programs.filter(
                    (ele) => ele.campus_location === this.selectedLocation
                );
            }

            // Default: return all
            return programs;
        },

        isLongDescription() {
            return this.program_details.program_description.length > 300;
        },
        displayedDescription() {
            if (this.showFullDescription || !this.isLongDescription) {
                return this.program_details.program_description;
            }
            return this.program_details.program_description.substring(0, 300) + '...';
        }


    },
    methods: {
        formatMonthYear(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric'
            });
        },
        selectLocation(location) {
            this.selectedProgramType = '';
            this.selectedLocation = location;
        },
        programdetails(ele) {
            this.program_details = ele
            this.infoModals = true
        },
        toggleReadMore() {
            this.showFullDescription = !this.showFullDescription;
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }



    }
}
</script>

<style scoped>
.program-modal {
    max-width: 1160px;
    margin: auto;
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h1 {
    font-size: 1.75rem;
    font-weight: bold;
    margin: 0;
}
p{
    margin-bottom: 0px;
}
.close-btn {
    font-size: 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
}

.tuition-fee .label,
.tuition-fee .amount,
.tuition-fee {
    color: #909090;
    line-height: 100%;
    font-weight: 700;
    font-size: 30px;
    letter-spacing: 4%;
    margin-top: 1.2rem;
}

.tuition-fee .amount {
    color: #000000 !important;
}

.tuition-fee {
    color: #ff5757 !important;
}

.description {
    margin-top: 32px;
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
    font-weight: 400;
    line-height: 150%;
    display: inline-block;
    margin-top: 6px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-top: 2rem;
}

.card-detail-head {
    color: #767F8C;
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
    margin-bottom: 3px;
    margin-top: 10px;
}


.card-detail-text {
    color: #18191C;
    font-weight: 500;
    font-size: 20px;
    line-height: 33px;
}

.footer-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    border-top: 0.78px solid #CFDFE2;
    padding-top: 28px;
}

.app-fee {
    border: 1.33px solid var(--lighter-shade, #64748B);
    color: var(--lighter-shade, #64748B);
    padding: 21px 30px;
    border-radius: 16px;
    font-size: 22px;
    cursor: pointer;
    letter-spacing: 1%;
}

.deadline {
    font-size: 21px;
    color: #909090;
    letter-spacing: 1%;
    line-height: 150%;
}

.deadline span {
    color: #3C3C3C;
}

@media (max-width: 450px) {
    .program-modal {
        padding: 1.6rem 1.3rem;
    }

    .modal-header h1 {
        font-size: 1.3rem;
    }

    .tuition-fee .label,
    .tuition-fee .amount,
    .tuition-fee {
        font-weight: 600;
        font-size: 22px;
        letter-spacing: 2%;
    }

    .description {
        margin-top: 16px;
    }

    .read-more {
        font-size: 20px;
        margin-top: 3px;
    }

    .info-grid {
        gap: 10px;
        margin-top: 1rem;
    }

    .card-detail-text {
        font-size: 19px;
        line-height: 30px;
    }

    .card-detail-head {
        font-size: 17px;
        line-height: 25px;
        margin-bottom: 3px;
    }

    .footer-row {
        gap: 20px;
    }

    .app-fee {
        padding: 17px 15px;
        font-size: 20px;
    }
}

@media only screen and (min-width: 425px) and (max-width: 890px) {
    .program-modal {
        padding: 1.7rem 1.5rem;
    }

    .tuition-fee .label,
    .tuition-fee .amount,
    .tuition-fee {
        font-weight: 600;
        font-size: 26px;
    }

    .description {
        margin-top: 21px;
    }

    .info-grid {
        gap: 15px;
        margin-top: 1rem;
    }

    .footer-row {
        margin-top: 1.5rem;
        padding-top: 22px;
        gap: 22px;
    }

    .app-fee {
        padding: 20px 18px;
        font-size: 20px;
    }
}




/* upper this popup css */
.program-section {
    background: #fff;
    margin-top: 20px;
    border-radius: 17px;
    overflow: hidden;
    border: 2px solid #EDEDED;
    padding: 32px 44px;
}

.program-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.info h3 {
    font-size: 18px;
    line-height: 25px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #18191C;
}

.location,
.address {
    display: flex;
    align-items: center;
    gap: 4px;
}

.location p,
address p {
    color: #767F8C;
    font-size: 15px;
    line-height: 21px;
    font-weight: 400;
}

.header-info h3 {
    color: #1F1B2D;
    font-size: 23px;
    font-weight: 700;
    line-height: 130%;
}

.dropdown {
    padding: 8px 17px;
    border: none;
    width: 160px;
    background-color: #3C3C3C1A;
    border-radius: 118px;
}

.dropdown-1 {
    width: 200px;
}

.dropdown select {
    background-color: #fff7f71a;
    padding: 0px;
    color: #3C3C3C;
}

select {
    appearance: auto;
    -webkit-appearance: auto;
    -moz-appearance: auto;
}

.custom-select {
    border: none !important;
    outline: none !important;
}

.program-list {
    display: flex;
    gap: 22px;
    margin-top: 31px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.program-card {
    background: #fff;
    border: 0.73px solid #E4E5E8;
    border-radius: 6px;
    padding: 18px;
    height: fit-content;
    box-shadow: 0px 1.45px 13.08px 0px #18191C08;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h4 {
    margin: 0;
    font-size: 17px;
    line-height: 20px;
    font-weight: 700;
    color: #18191C;
}

.fee,
.fee span {
    margin: 9px 0;
    color: #ff5757;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 8%;
}

.fee-black {
    color: #18191C !important;
}

.card-details {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    gap: 38px;
    flex-wrap: wrap;
    border-top: 0.85px solid #EDEDED;
    border-bottom: 0.85px solid #EDEDED;
    padding: 10px 0px 10px;
    margin-top: 20px;
}

.card-detail-head {
    color: #767F8C;
    font-size: 13px;
    line-height: 15px;
    font-weight: 400;
    margin-bottom: 3px;
}

.card-detail-text {
    color: #18191C;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
}


.program-layout {
    display: flex;
    margin-top: 24px;
    gap: 28px;
    width: 100%;
    flex-wrap: wrap;
}

.locations {
    width: 34%;
    border-right: 2px solid #EDEDED;
    min-width: 250px;
    padding-right: 20px;
}

.locations h2 {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: #18191C;
    margin-bottom: 20px;
}

.location-card {
    background: #fff;
    padding: 16px;
    border-radius: 6px;
    border: 0.67px solid #E4E5E8;
    box-shadow: 0px 1.34px 12.04px 0px #18191C08;
    margin-bottom: 15px;
}

.location-card.selected {
    background-color: #FF57571A;
    border: 1px solid #FF5757;
}

.location-card .title {
    font-weight: 500;
    color: #18191C;
    font-size: 17px;
    margin-bottom: 7px;
}

.location-card.selected .title {
    color: #ff5757;
}

.location-card .address {
    font-size: 14px;
    color: #777;
}

.program-grid {
    width: 63.5%;

}

.program-cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;
    justify-content: start;
}

@media (max-width: 425px) {
    .program-section {
        margin-top: 17px;
        padding: 24px 18px;
    }

    .dropdown {
        margin-top: 16px;
    }

    .program-list {
        gap: 22px;
        margin-top: 31px;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    .card-details {
        justify-content: space-between;
        font-size: 13px;
        gap: 18px;
    }

    .locations {
        width: 100%;
        border-right: 0px;
        min-width: 250px;
        padding-right: 0px;
    }

    .program-grid {
        width: 100%;
    }

    .program-layout {
        margin-top: 18px;
        gap: 20px;
    }

    .header-info h3 {
        font-size: 22px;
        font-weight: 600;
    }
}

@media only screen and (min-width: 1287px) and (max-width: 1440px) {
    .card-details {
        gap: 24px;
    }

    .locations {
        width: 30%;
    }

    .program-grid {
        width: 67%;
    }
}

@media only screen and (min-width: 890px) and (max-width: 1287px) {
    .card-details {
        gap: 34px;
    }

    .locations {
        width: 42%;
    }

    .program-grid {
        width: 53%;
    }
}

@media only screen and (min-width: 650px) and (max-width: 890px) {
    .card-details {
        gap: 20px;
    }

    .locations {
        width: 46%;
        padding-right: 10px;
        min-width: 220px;
    }

    .program-grid {
        width: 50%;
    }

    .program-section {
        padding: 25px 22px;
    }

    .program-layout {
        gap: 14px
    }

}

@media only screen and (min-width: 425px) and (max-width: 650px) {
    .locations {
        width: 100%;
        padding-right: 0px;
        min-width: 240px;
        max-width: 400px;
        border-right: 0px;
    }

    .program-section {
        padding: 25px 22px;
    }

    .program-grid {
        width: 100%;
    }
}
</style>