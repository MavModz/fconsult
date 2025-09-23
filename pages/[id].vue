<template>
    <div>
       <component :is="currentComponent" />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'home',
});
</script>

<script>
import AboutUs from './about-us/index.vue'
import Benefitpage from './Benefit-of-immigration-listing/index.vue'
import businessHome from './immigration-business-growth/index.vue'
import contactus from './contact-us/index.vue'
import crm from './crm/index.vue'
import forconsultants from './for-consultants/index.vue'
import foruser from './for-user/index.vue'
import getapp from './whitelabel-app/index.vue'
import PrivacyPolicy from './PrivacyPolicy/index.vue'
import TermCondition from './TermsCondition/index.vue'
import TermofUse from './TermofUse/index.vue'
import Terms from './Terms/index.vue'
// import Works from './Works/index.vue'
import NotFound from './NotFound/index.vue'
import CommingSoon from './CommingSoon/index.vue'


export default {
    components: { NotFound, AboutUs, Benefitpage, businessHome, contactus, crm, forconsultants, foruser, getapp, PrivacyPolicy, TermCondition,TermofUse, Terms, CommingSoon },
    computed: {
        currentComponent() {
            const id = this.$route.params.id?.toLowerCase();
            switch (id) {
                case 'about-us':
                    return 'AboutUs';
                case 'benefit-of-immigration-listing':
                    return 'Benefitpage';
                case 'immigration-business-growth':
                    return 'businessHome';
                case 'contact-us':
                    return 'contactus';
                case 'crm':
                    return 'crm';
                case 'for-consultants':
                    return 'forconsultants';
                case 'for-user':
                    return 'foruser';
                case 'whitelabel-app':
                    return 'getapp';
                case 'privacypolicy':
                    return 'PrivacyPolicy';
                case 'terms-&-condition':
                    return 'TermCondition';
                case 'termofuse':
                    return 'TermofUse';
                case 'terms':
                    return 'Terms';
                // case 'works':
                //     return 'Works';
                case 'commingsoon':
                    return 'CommingSoon';
                default:
                    return 'NotFound';
            }
        },
    }
}
</script>