<template>
  <div class="relative w-auto">
    <!-- Display current selection -->
    <div @click="toggleDropdown" class="border p-2 bg-white cursor-pointer">
      <template v-if="finalSelection">
        <strong>{{ finalSelection.category }}</strong>
        <span v-if="finalSelection.subcategory"> / {{ finalSelection.subcategory }}</span>
      </template>
      <template v-else>
        Select Status
      </template>
    </div>

    <!-- Dropdown -->
    <div v-if="dropdownOpen && permission?.leads?.edit" class="absolute border bg-white mt-1 w-full z-10 max-h-60 overflow-auto">
      <!-- Status list -->
      <div v-if="!selectedCategory">
        <div v-for="status in statuses" :key="status._id"
          @click="selectCategory(status.statusname, status.subStatus || [])"
          class="p-2 hover:bg-gray-100 cursor-pointer">
          {{ status.statusname }}
        </div>
      </div>

      <!-- Substatus list -->
      <div v-else>
        <div v-for="sub in subcategories" :key="sub" @click="selectSubcategory(sub)"
          class="p-2 hover:bg-gray-100 cursor-pointer">
          <strong>{{ selectedCategory }}</strong> / {{ sub }}
        </div>
        <!-- If no substatus, confirm directly -->
        <div v-if="subcategories.length === 0" class="p-2 text-gray-500 italic">No substatus available</div>
      </div>
    </div>
  </div>


  <Dialog v-model:visible="counsellorModal" modal header="Convert To Customer"
    class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
    <FormKit type="form" @submit="convertCustomer" class="leads-form-style">
      <div v-if="!leadAutomation">
        <label class="single-lead-cmttitls mb-1 ">Assign Counsellor</label><br />
        <FormKit validation="required" type="select" name="assigned_to" class="single-lead-cmt-mdlo"
          placeholder="Task title" validation-label="Counsellor" @change="getSubCouncellor" :options="items"
          v-model="selectedOption" />
      </div>
      <span>
        <label class="leads-label-assign-add mt-3 mb-1">Assign Description</label>
        <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn"
          validation-label="Description" />
      </span>
      <div class="modal-footer-section">
        <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close" @click="counsellorModal = false">Go back</button> -->
        <button type="submit"
          class="  mt-4 bg-[#ff5757] text-[#ffffff] rounded px-4 py-2 btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
// replace with your actual API import
import { useRoute } from 'vue-router'

const route = useRoute()
// Props
const props = defineProps({
  status: { type: String, required: true },
  subStatus: { type: String, default: null }
})
const emit = defineEmits(['trigger-init'])
// States
const dropdownOpen = ref(false)
const selectedCategory = ref(null)
const subcategories = ref([])
const finalSelection = ref(null)
const statuses = ref([])
//covert customer
const counsellorModal = ref(false)
const items = ref([])
const loading = ref(false)
const selectedOption = ref(null)
//for lead automation
const leadAutomation = ref(false);

async function companySetting( service, subService, country) {
  const settingcheck = await subadminGet('/company-settings');
  const lead_setting = await subadminGet('/lead-settings/true');

  if (settingcheck.data.data.leadAutomation) {
    
    return checkLeadAutomationEligibility(service, subService, country, lead_setting);
  }

  return false;
}

function checkLeadAutomationEligibility(service, subService, country, lead_setting) {
  const subserviceKeyMap = {
    "College Study Visa": "CollegeStudyVisa",
    "Tourist Visa": "TouristVisa",
    "Visitor Visa": "VisitorVisa",
    "Work Visa": "WorkVisa",
    "Permanent Residency": "PermanentResidency",
  };

  const type = lead_setting.data.method.current_type;
console.log("setting back lead sutomation on",service,subService,country)
  if (type === "Service_Based") {
    if (service === "Study Visa") service = "Study_Visa";
    if (service === "Settle Abroad") service = "Settle_Abroad";

    const key = subserviceKeyMap[subService];
    if (!key) return false;

    const matched = lead_setting.data.method.Service_Based?.[service]?.[key]?.find(
      (ele) => ele.country === country && ele.subadmin_id.length > 0
    );

    return !!matched;
  }

  if (type === "Round_Robin") {
    return (
      Array.isArray(lead_setting.data.method.Round_Robin?.subadmin_id) &&
      lead_setting.data.method.Round_Robin.subadmin_id.length > 0
    );
  }

  return false;
}

// Toggle dropdown
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
  if (!dropdownOpen.value) {
    selectedCategory.value = null
    subcategories.value = []
  }
}


function selectCategory(name, subs) {
  selectedCategory.value = name
  subcategories.value = subs

  if (subs.length === 0) {
    finalSelection.value = {
      category: selectedCategory.value,
      subcategory: null
    }
    dropdownOpen.value = false
    selectedCategory.value = null

    updateStatus(finalSelection.value.category, finalSelection.value.subcategory)
  }
}
function selectSubcategory(sub) {
  finalSelection.value = {
    category: selectedCategory.value,
    subcategory: sub
  }
  dropdownOpen.value = false
  selectedCategory.value = null
  subcategories.value = []

  updateStatus(finalSelection.value.category, finalSelection.value.subcategory)
}


// Load from API
async function loadStatuses() {
  try {
    const res = await subadminGet('/leadstatus')
    statuses.value = res.data.leadstatus || []
  } catch (err) {
    console.error('Error fetching lead statuses:', err)
  }
}

async function updateStatus(status, subStatus) {
  try {
    const confirmed = await askConfirm('Do you want to update the status?', 'Update Status', 'Update', 'Cancel')
    if (!confirmed) return

    if (status === "Converted Lead") {
      handleConvertedLead()
    } else {

      await subadminPut(`/update-leads-status/${route.params.id}`, {
        lead_status: status,
        lead_sub_status: subStatus
      })
      emit('trigger-init')
      successAlert('Lead updated successfully!')
    }
  } catch (err) {
    console.error('Failed to update status:', err)
  }
}
async function handleConvertedLead() {
  console.log("Converted status");

  try {
    const leadDetails = await subadminGet(`/leads/${route.params.id}`);
    const lead = leadDetails.data.data;
console.log("LEAD")
    if (!lead.service || !lead.subService || !lead.listing || !lead.listing.country) {
      errorAlert("Please make sure Service, SubService and Listing are selected before converting.");
      return;
    }

    // Determine automation eligibility
    leadAutomation.value = await companySetting(
      lead.service,
      lead.subService,
      lead.listing.country
    );

    await getSubCouncellor();
    counsellorModal.value = true;
  } catch (err) {
    console.error("Error fetching lead data or automation check:", err);
  }
}

async function getSubCouncellor() {
  loading.value = true
  const res = await subadminGet(`/select-employes-list`)
  items.value = res.data.employe_list.map(i => ({ label: i.name, value: i._id }))
  loading.value = false
}

async function convertCustomer(v) {
  loading.value = true
  try {
    await subadminPut(`/assign-leads/${route.params.id}?auto=${leadAutomation.value}`, v)
    await subadminPut(`/convert-customer/${route.params.id}`)
    emit('trigger-init')
    successAlert("Counsellor assigned and customer converted successfully!")
    counsellorModal.value = false
  } catch (err) {
    console.error("Error assigning counsellor or converting customer:", err)
  }
  loading.value = false
}



// Set initial selection from props
function setInitialSelection() {
  if (!props.status) return
  const match = statuses.value.find(s => s.statusname === props.status)
  if (match) {
    finalSelection.value = {
      category: props.status,
      subcategory: props.subStatus || null
    }
  }
}

// Lifecycle
onMounted(async () => {
  await loadStatuses()
  setInitialSelection()
})

// Update on props change
watch(
  () => [props.status, props.subStatus],
  () => {
    setInitialSelection()
  }
)
</script>

<style scoped>
/* Optional but makes it nicer */
.scroll {
  max-height: 200px;
  overflow-y: auto;
}
</style>







