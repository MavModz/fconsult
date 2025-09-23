<template>
  <main class="bg-[#f8fcff] p-[5%]">
    <OverviewSection :company="company" :active="'events'" />

    <div class="tab-content">
      <div id="info" class="tab-pane fade in active show">
        <section class="over_view_section">
          <div class="container">
            <div class="flex gap-5 max-[1024px]:flex-col">
              <div class="seminarcontainter w-[55%] max-[1024px]:w-full">
                <div v-if="listingData?.event_type === 'Webinar'">
                  <Webinar :singleId="route.params.event" />
                </div>

                <div v-if="listingData?.event_type === 'Seminar'">
          
                    <!-- dynamic component to avoid importing Seminar during SSR -->
                    <component
                      v-if="SeminarComponent"
                      :is="SeminarComponent"
                      :singleId="route.params.event"
                    />
               
                </div>
              </div>

              <!-- RIGHT SIDE DESIGN -->
              <div class="w-[45%] max-[1024px]:w-full">
                <div class="overview-right">
                  <SocialMedia :company="company" />
                  <ContactCard :company="company" />
                  <AwardsCompany />
                  <PromotionImage />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <RecentView :recentStore="recentStore" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import ContactCard from '../../../NewComponents/ContactCard.vue'
import CompanyWishlists from '../../../NewComponents/CompanyWishlists.vue'
import RecentView from '../../../NewComponents/RecentView.vue'
import OverviewSection from '../../../NewComponents/OverviewSection.vue'
import Webinar from './Components/Webinar/index.vue' // keep static if safe
// DON'T import Seminar statically here
import AwardsCompany from '../../../NewComponents/AwardsCompany.vue'
import PromotionImage from '../../../NewComponents/PromotionImage.vue'
import CompanyDetailtab from '../../../NewComponents/CompanyDetailtab.vue'
import BreadCrumb from '../../../NewComponents/BreadCrumb.vue'
import SocialMedia from '../../../NewComponents/SocialMedia.vue'

definePageMeta({ layout: 'home' })

const config = useRuntimeConfig()
const route = useRoute()
const storeId = route.params.id || ''
const [companyName, CompanyId] = storeId.split('-') // guard if storeId missing

// reactive state
const company = ref({
  symbol: '/img/png/150-13 5.png',
  cover_image: '/img/png/150-13 5.png',
  sign: '/img/png/150-13 5.png',
})
const c = ref([])
const recentStore = ref(null)
const listingData = ref(null)
const awards = ref(null)

// this will hold the client-only Seminar component
const SeminarComponent = ref(null)

/* -------------------------
   Fetch data during SSR
   (top-level await so useHead has real values server-side)
   ------------------------- */
try {
  const compRes = await homeGet(`/company/${CompanyId}`)
  company.value = compRes?.data?.data ?? company.value

  // build 'c' (countries) safely
  const svcs = company.value?.services || []
  for (const s of svcs) {
    if (Array.isArray(s.countries)) c.value.push(...s.countries)
  }
} catch (err) {
  console.error('company fetch error', err)
}

try {
  const evRes = await homeGet(`/home-event/${route.params.event}`)
  listingData.value = evRes?.data?.data ?? null
} catch (err) {
  console.error('event fetch error', err)
}

/* Utility slug (safe replace) */
const slug = (s) => (s ? String(s).trim().replace(/\s+/g, '-') : '')

/* Build canonical/og URL safely */
const headUrlVal =
  c.value[0] && listingData.value
    ? `${config.public.baseURL}/${company.value.state}/immigration-company/${
        company.value.company_name
      }/${company.value.landmark}/f&c-${company.value._id}/Event/${
        company.value.company_name
      }/${listingData.value._id}`
    : ''

  const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()
}

/* Set the head using already-fetched values (SSR friendly) */
useHead({
  title: `${stripHtml(listingData.value?.title)} | Find and Consult` || 'Default Event Title',
  meta: [
    { name: 'description', content: stripHtml(listingData.value?.description) || '' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: `${stripHtml(listingData.value?.title) || ''} | Find and Consult` },
    { property: 'og:description', content: stripHtml(listingData.value?.description) || '' },
    { property: 'og:image', content: listingData.value?.image || '' },
    { property: 'og:url', content: headUrlVal },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Find and Consult' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${stripHtml(listingData.value?.title) || ''} | Find and Consult` },
    { name: 'twitter:description', content: `${stripHtml(listingData.value?.description) || ''} Find and Consult` },
    { name: 'twitter:image', content: listingData.value?.image || '' },
  ],
  link: [{ rel: 'canonical', href: headUrlVal }],
})

/* -------------------------
  Client-only logic
  ------------------------- */
onMounted(async () => {
  // 1) dynamically import Seminar only in browser (avoids SSR Leaflet crash)
  try {
    const mod = await import('./Components/Seminar/index.vue')
    SeminarComponent.value = mod?.default ?? mod
  } catch (err) {
    console.error('Failed to load Seminar component (client-only):', err)
  }

  // 2) fetch client-only data (recent view, awards)
  try {
    recentStore.value = (await homeGet(`/company-recent-view`)).data.data
  } catch (e) {
    console.error('recent view fetch error', e)
  }

  try {
    // use CompanyId (or your storePermMount if different)
    awards.value = (await homeGet(`/home-company-awards/${CompanyId}`)).data.data
  } catch (e) {
    console.error('awards fetch error', e)
  }
})

/* helper functions used in template (if any) can go under here */
</script>

<style scoped>
@import url('./style.css');

.dropdown-toggle::after {
  display: none;
}

.border-line {
  border: 1px solid #efecf3;
  margin: 15px 0px;
}
</style>
