<template>
  <div class="card">
    <TabView class="card">
      <TabPanel header="Long Cards">
        <div class="mt-3 card-body">
          <div class="flex justify-end pb-4">
            <NuxtLink class="your-events-btn" to="Visitor/addLong">
              <BootstrapIcon name="file-earmark-plus" size="2rem" />&nbsp; Add
            </NuxtLink>
          </div>
          <DataTable :value="long" tableStyle="min-width: 50rem">
            <Column field="title" header="Title"></Column>
            <Column header="Image">
              <template #body="slotProps">
                <img :src="slotProps.data.img" :alt="slotProps.data.image" class="w-6rem border-round img"
                  style="width: 100px" />
              </template>
            </Column>
            <Column field="url" header="URL"></Column>
            <Column header="Action" class="column-gap">
              <template #body="slotProps">
                <NuxtLink :to="'/' + slotProps.index">
                  <BootstrapIcon name="eye" size="2rem" />
                </NuxtLink>
                <div @click="delLong(slotProps.data._id)">
                  <BootstrapIcon name="trash" size="2rem" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </TabPanel>
      <TabPanel header="Short Cards">
        <div class="mt-3 card-body">
          <div class="flex justify-end pb-4">
            <NuxtLink class="your-events-btn" to="Visitor/addShort">
              <BootstrapIcon name="file-earmark-plus" size="2rem" />&nbsp; Add
            </NuxtLink>
          </div>

          <DataTable :value="short" tableStyle="min-width: 50rem">
            <Column field="title" header="Title"></Column>
            <Column header="Image">
              <template #body="slotProps">
                <img :src="slotProps.data.img" :alt="slotProps.data.image" class="w-6rem border-round img"
                  style="width: 100px" />
              </template>
            </Column>
            <Column field="url" header="URL"></Column>
            <Column header="Action" class="column-gap">
              <template #body="slotProps">
                <NuxtLink :to="'/' + slotProps.index">
                  <BootstrapIcon name="eye" size="2rem" />
                </NuxtLink>
                <div @click="delShort(slotProps.data._id)">
                  <BootstrapIcon name="trash" size="2rem" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </TabPanel>

      <TabPanel header="Offers">
        <div class="mt-3 card-body">
          <DataTable :value="offers" tableStyle="min-width: 50rem">
            <Column field="offer_name" header="Name"></Column>
            <Column field="offer_description" header="Description"></Column>
            <Column header="Image">
              <template #body="slotProps">
                <img :src="slotProps?.data?.listing_id?.Visitor?.logo" class="w-6rem border-round img"
                  style="width: 100px" />
              </template>
            </Column>
            <Column header="Start">
              <template #body="slotProps">
                <span>{{ slotProps.data.start_Date.split('T')[0] }}</span>
              </template>
            </Column>
            <Column header="End">
              <template #body="slotProps">
                <span>{{ slotProps.data.end_Date.split('T')[0] }}</span>
              </template>
            </Column>
            <Column header="Applied At">
              <template #body="slotProps">
                <span>{{ slotProps.data.created_at.split('T')[0] }}</span>
              </template>
            </Column>
          </DataTable>
        </div>
      </TabPanel>

      <TabPanel header="Reviews">
        <div class="mt-3 card-body">
          <div class="flex justify-end pb-4">
            <NuxtLink class="your-events-btn" to="Visitor/addReview">
              <BootstrapIcon name="file-earmark-plus" size="2rem" />&nbsp; Add
            </NuxtLink>
          </div>

          <DataTable :value="reviews" tableStyle="min-width: 50rem">
            <Column field="title" header="Title"></Column>
            <Column header="Image">
              <template #body="slotProps">
                <img :src="slotProps.data.cover_image" class="w-6rem border-round img" style="width: 100px" />
              </template>
            </Column>
            <Column field="user_name" header="Name"></Column>
            <Column header="Action" class="column-gap">
              <template #body="slotProps">
                <div @click="delReview(slotProps.data._id)">
                  <BootstrapIcon class="icon2" name="trash" size="2rem" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data() {
    return {
      long: null,
      short: null,
      reviews: null,
      offers: null,
    };
  },
  async mounted() {
    activateSubmenu('h6', 'Visitor');
    await this.init();
  },
  methods: {
    async init() {
      this.long = (await superadminGet(`/superadmin-long-banner/Visitor Visa`)).data.data
      this.short = (await superadminGet(`/superadmin-short-banner/Visitor Visa`)).data.data
      this.reviews = (await superadminGet('/superadmin-reviews/Visitor Visa')).data.data;
      this.offers = (await superadminGet(`/home-offers/Visitor Visa`)).data.data;
    },
    async delLong(i) {
      await superadminDelete(`/superadmin-long-banner/${i}`)
      this.init();
    },
    async delShort(i) {
      await superadminDelete(`/superadmin-short-banner/${i}`)
      this.init();
    },
    async delReview(i) {
      await superadminDelete(`/superadmin-reviews/${i}`)
      this.init();
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
