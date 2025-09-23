<template>
  <div class="relative w-100">
    <!-- Display current selection -->
    <div @click="toggleDropdown" class=" p-1 bg-white cursor-pointer">
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
          @click="selectCategory(status.service, status.subcategories || [])"
          class="p-2 hover:bg-gray-100 cursor-pointer">
          {{ status.service }}
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
    const res = await subadminGet('/company-services')
    statuses.value = res.data.data || []
  } catch (err) {
    console.error('Error fetching lead statuses:', err)
  }
}

async function updateStatus(status, subStatus) {
  if (status === props.status && subStatus === props.subStatus) {
    errorAlert('Please choose a different status.');
    return;
  }

  try {
    const confirmed = await askConfirm('Do you want to update the status?', 'Update Status', 'Update', 'Cancel')
    if (!confirmed) return



    await subadminPut(`/update-leads-status/${route.params.id}`, {
      service: status,
      subService: subStatus,
      listing:null
    })
    emit('trigger-init')
    successAlert('Lead updated successfully!')

  } catch (err) {
    console.error('Failed to update status:', err)
  }
}



// Set initial selection from props
function setInitialSelection() {
  if (!props.status) return
  const match = statuses.value.find(s => s.service === props.status)
  console.log("mathches work", match, props.status, statuses.value)
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
