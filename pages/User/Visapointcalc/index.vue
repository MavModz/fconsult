<template>
    <div class="row items-center visapoint">
        <div class="col-sm-3">
            <p style="text-align: center;font-size: 23px;">Visa Points Calculator</p>
        </div>
        <div class="col-sm-9">
            <p>Explore these tools to check the eligibility and determine how well the profile meet the immigration criteria for the countries you want to consider. Select any desired destination and assess the profile before taking the next step!</p>
        </div>
    </div>
    <div class="col-xl-12">
        <div class="row">
            <NuxtLink v-for="i in visaPointCountryTable" class="col-sm-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="flex items-center gap-4">
                            <div class="col-sm-2">
                                <NuxtImg :src="i.visaPointCountryImg" style="width: 100%;"></NuxtImg>
                                
                            </div>
                            <div class="col-sm-9">
                                    <a :href="i.visaPointSiteRedirections" class="text-[1.1rem]" target="_blank">{{ i.visaPointCountryNames }}</a>
                                    <p class="text-[0.8rem]">{{ i.visaPointDescription }}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>

    </div>
</template>
<script>
definePageMeta({
  layout: "user",
  middleware: ["user"],
});
export default {
    
    data() {
        return {
            visaPointCountryTable: [
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_australia.svg',
                    visaPointCountryNames: 'Australia Points-Based Immigration System',
                    visaPointDescription: 'Australia evaluates applicants for various skilled visas using a points-based system.',
                    visaPointSiteRedirections:`https://immi.homeaffairs.gov.au/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_canada.svg',
                    visaPointCountryNames: 'Canada Comprehensive Ranking System',
                    visaPointDescription: `Canada's Express Entry system uses the CRS to rank candidates for immigration.`,
                    visaPointSiteRedirections:`https://www.canada.ca/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_austria.svg',
                    visaPointCountryNames: 'Austria Red-White-Red Card',
                    visaPointDescription: `Austria's Red-White-Red Card is a points-based immigration system for qualified third-country workers.`,
                    visaPointSiteRedirections:`https://www.migration.gv.at/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_nz.svg',
                    visaPointCountryNames: 'New Zealand Skilled Migrant Category Resident Visa',
                    visaPointDescription: `New Zealand employs a points-based system for its Skilled Migrant Category Resident Visa.`,
                    visaPointSiteRedirections:`https://www.immigration.govt.nz/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_singapore.svg',
                    visaPointCountryNames: 'Singapore Complementarity Assessment Framework',
                    visaPointDescription: `Singapore has implemented COMPASS, a points-based system for evaluating Employment Pass applicants.`,
                    visaPointSiteRedirections:`https://www.mom.gov.sg/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_uk.svg',
                    visaPointCountryNames: 'United KingdomPoints-Based Immigration System',
                    visaPointDescription: `The UK employs a points-based system for various visa categories, including the Skilled Worker visa.`,
                    visaPointSiteRedirections:`https://www.gov.uk/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_cn-hk.svg',
                    visaPointCountryNames: 'Hong Kong Quality Migrant Admission Scheme',
                    visaPointDescription: `Hong Kong has a points-based system to attract highly skilled individuals.`,
                    visaPointSiteRedirections:`https://www.immd.gov.hk/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_lang-germany.svg',
                    visaPointCountryNames: 'Germany Points-Based Immigration System',
                    visaPointDescription: `Germany has approved a points-based immigration system to attract skilled workers.`,
                    visaPointSiteRedirections:`https://www.bundesregierung.de/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_japan.svg',
                    visaPointCountryNames: 'Japan Points-Based Preferential Immigration Treatment for Highly Skilled Foreign Professionals',
                    visaPointDescription: `Japan has a points-based system to attract highly skilled foreign professionals.`,
                    visaPointSiteRedirections:`https://www.moj.go.jp/ENGLISH/m_hisho06_00043.html`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_lang-koria.svg',
                    visaPointCountryNames: 'South Korea Points-Based System for Skilled Workers',
                    visaPointDescription: `South Korea utilizes a points-based system to evaluate skilled worker visa applicants.`,
                    visaPointSiteRedirections:`https://www.hikorea.go.kr/`

                },
                {
                    visaPointCountryImg: '/img/svg/Visapointcountry/circle-flags_south-africa.svg',
                    visaPointCountryNames: 'South Africa Points-Based System',
                    visaPointDescription: `South Africa is introducing a points-based system for work visas to attract skilled workers.`,
                    visaPointSiteRedirections:`https://www.reuters.com/`

                }
            ],
        }

    }
}
</script>
<style>
@import url('./visapointcalc.css');
</style>