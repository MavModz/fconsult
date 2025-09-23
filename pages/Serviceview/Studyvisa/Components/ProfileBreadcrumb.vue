<template>
    <div>

        <div class="card">

            <img class="hero" :src="data.cover_image" alt="Building" />
            <div class="content">
                <div class="top-row">
                    <div class="top-row-left">
                        <img class="logo" :src="data.logo" alt="Logo" />

                    </div>
                    <div>
                        <p class="title ">{{ data.title }}</p>
                        <div class="stats-container">
                            <div class="stat-card">
                                <div class="icon-box">
                                    <img src="/public/img/png/Icon Frame.png" alt="Icon 1" />
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value">{{ data.location }}</div>
                                    <div class="stat-title">Location</div>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="icon-box">
                                    <img src="/public/img/png/Icon Frame-2.png" alt="Icon 2" />
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value">{{ data.program_field }}</div>
                                    <div class="stat-title">Field Of Study</div>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="icon-box">
                                    <img src="/public/img/png/Icon Frame-3.png" alt="Icon 2" />
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value">{{ data.program }}</div>
                                    <div class="stat-title">Programs</div>
                                </div>



                            </div>

                           
                            <div class="stat-card">
                                <div class="icon-box">
                                    <img src="/public/img/png/Icon Frame-4.png" alt="Icon 2" />
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value">{{ data.program }}</div>
                                    <div class="stat-title">Achievers</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 d-flex align-items-center gap-2  flex-wrap sm:flex-nowrap">
                            <img src="/public/img/png/globe-vector.png"><span>College Website</span><b> {{ data.website }}</b>
                        </div>
                    </div>
                </div>
                <div class="tabs">

                    <!-- <div class="tab active">Overview</div>
                    <div class="tab">More Details</div>
                    <div class="tab">Program</div>
                    <div class="tab">Media</div>
                    <div class="tab">Testimonials</div>
                    <div class="tab">Custom Tab</div> -->
                    <div v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeTab === tab }]"
                        @click="selectTab(tab)">
                        {{ tab }}
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
            tabs: ['Overview', 'Program', 'Media', 'Testimonials', 'Custom Tab']
        }
    },
    props: {
        data: Object,
        activeTab: String,
    },
    mounted() {
        const lengthFromQuery = this.$route.query.length;
        if (lengthFromQuery) {
            this.achieversLength = parseInt(lengthFromQuery);
            console.log("Achievers Length:", this.achieversLength);
        }
    },

    methods: {
        selectTab(tab) {
            this.$emit('tab-selected', tab);
        }
    }
}
</script>
<style scoped>
.card {
    background: #fff;
    border-radius: 17px;
    overflow: hidden;
    border: 2px solid #EDEDED;
    padding: 39px 60px 0px 60px;
}

.content {
    margin-top: 26px;
}

.card img.hero {
    width: 100%;
    display: block;
    max-height: 260px;
    border-radius: 16px;
}

.top-row {
    display: flex;
    align-items: center;
    gap: 40px;
    /* flex-wrap: wrap; */
}

.logo {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    /* background: #fff; */
    object-fit: contain;
    border: 3.66px solid #8383831A;
}

.title {
    font-size: 24px;
    font-weight: 700;
    line-height: 150%;
    color: #454056;
    margin-bottom: 15px;
}


.stats-container {
    display: flex;
    gap: 40px;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}

.stat-card {
    max-width: 220px;
    width: 200px;
    display: flex;
    align-items: center;
    gap: 15px;
}

.stat-info {
    line-height: 1.3;
}

.stat-title {
    font-size: 16px;
    color: #3A3A3C;
    font-weight: 400;
    line-height: 150%;
}

.stat-value {
    font-size: 16px;
    font-weight: 700;
    color: #3A3A3C;
    line-height: 150%;
    margin-top: 4px;
}

.tabs {
    display: flex;
    gap: 36px;
    padding-top: 26px;
    margin-top: 20px;
    flex-wrap: wrap;
    align-items: center;
}

.tab {
    font-size: 19px;
    color: #A1A5B7;
    font-weight: 500;
    line-height: 280%;
    cursor: pointer;
    padding: 8px;
    border-bottom: 2px solid transparent;
}

.tab.active {
    color: #ff5757;
    border-bottom: 3px solid #ff5757;
}

.tab.active::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 3px;
    background-color: #ff4d4f;
    border-radius: 10px;
}

@media (max-width: 425px) {
    .card {
        padding: 24px 20px 0px 20px;
    }

    .logo {
        width: 80px;
        height: 80px;
        margin-bottom: 22px;
    }

    .content {
        margin-top: 12px;
    }

    .top-row {
        gap: 0px;
         flex-wrap: wrap;
    }

    .title {
        font-size: 20px;
        font-weight: 600;
        line-height: 120%;
    }

    .stats-container {
        gap: 18px;
    }

    .stat-title {
        line-height: 100%;
    }

    .tabs {
        gap: 8px;
        padding-top: 0px;
        margin-top: 10px;
        flex-wrap: wrap;
        align-items: center;
    }

    .tab {
        line-height: 130%;
        font-size: 18px;
        padding: 6px;
    }
}

@media (max-width: 550px) {
    .stat-card {
        width: 160px;
        gap: 15px;
    }
}

@media only screen and (min-width: 425px) and (max-width: 890px) {
    .card {
        padding: 26px 22px;
    }

    .stat-card {
        width: 180px;
        gap: 15px;
    }

    .stats-container {
        gap: 22px;
    }

    .logo {
        width: 95px;
        height: 95px;
    }

    .top-row {
        gap: 18px;
    }

    .tabs {
        gap: 18px;
        padding-top: 9px;
        margin-top: 10px;
        flex-wrap: wrap;
        align-items: center;
    }

    .tab {
        line-height: 130%;
        padding: 6px;
    }
}

@media only screen and (min-width: 890px) and (max-width: 1257px) {
    .stat-card {
        width: 190px;
        gap: 15px;
    }

    .top-row {
        gap: 29px;
    }

    .logo {
        width: 115px;
        height: 115px;
    }

    .stats-container {
        gap: 25px;
    }
}

@media only screen and (min-width: 890px) and (max-width: 1022px) {
    .tabs {
        gap: 22px;
        padding-top: 9px;
        margin-top: 10px;
        flex-wrap: wrap;
        align-items: center;
    }
}

@media only screen and (min-width: 890px) and (max-width: 953px) {
    .tab {
        line-height: 140%;
        padding: 6px;
    }

    .stat-card {
        width: 170px;
    }
}
</style>