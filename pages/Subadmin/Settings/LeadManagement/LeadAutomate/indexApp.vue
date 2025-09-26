<template>
    <div class="bg-white p-[30px] rounded-[27px] languages">
        <div class="flex items-center justify-between">
            <h2 id="languages-heading">Lead Automation</h2>
            <div class="flex items-center gap-2">
                <span class="text-[17px] font-medium" v-if="permission?.setting?.lead_mangement?.add">{{ settings.leadAutomation ? 'On' : 'Off' }}</span>
                <label class="relative inline-flex items-center cursor-pointer" v-if="permission?.setting?.lead_mangement?.add">
                    <input type="checkbox" v-model="settings.leadAutomation" @change="changeAutomation"
                        class="sr-only peer" />
                    <div
                        class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white">
                    </div>
                </label>
            </div>
        </div>

        <div class="break-line"></div>
        <div v-if="settings.leadAutomation" class="overflow-auto" style="max-height: 410px">
            <div class="grid grid-cols-4 gap-[30px]">
                <div class="border col-span-1 border-[#E4E4EF] ">
                    <div class="flex items-center border-b border-[#E4E4EF] px-6 py-4">
                        <span class="text-[20px] font-semibold text-[#2E2E2E]">Automation Method</span>
                    </div>
                    <div class="flex items-center gap-3 border-b border-[#E4E4EF] px-6 py-4">
                        <input type="radio" id="roundRobin" value="Round_Robin" v-model="method"
                            class="accent-[#FF5757] w-[18px] h-[18px]" />
                        <label for="roundRobin" class="text-[19px] font-medium text-[#2E2E2E] cursor-pointer">
                            Round Robin
                        </label>
                    </div>
                    <div class="flex items-center gap-3 px-6 py-4">
                        <input type="radio" id="serviceBased" value="Service_Based" v-model="method"
                            class="accent-[#FF5757] w-[18px] h-[18px]" />
                        <label for="serviceBased" class="text-[19px] font-medium text-[#2E2E2E] cursor-pointer">
                            Service Based
                        </label>
                    </div>
                </div>
                <!-- Round Robin Table -->
                <template v-if="method === 'Round_Robin'">
                    <div class="bg-[#707EAE1A]">
                        <div class="border-b px-[17px] py-[19px] text-[18px] font-semibold text-[#1A1A1A]">Name</div>
                        <div v-for="emp in employees" :key="emp.user_id._id"
                            class="flex items-center gap-3 px-[17px] py-[19px] border-b last:border-none">
                            <Checkbox :value="emp.user_id._id" v-model="selectedNames" :inputId="emp.user_id._id" />
                            <span class="text-[18px] text-[#1a1a1a]">
                                {{ emp.user_id.name }}
                                <!-- <span v-if="emp.role === 'admin'" class="text-[#9E9E9E] text-[15px]"> - admin</span> -->
                            </span>
                        </div>
                    </div>
                    <div>
                        <div class="text-[18px] py-[19px] px-[18px] text-[#1a1a1a] font-semibold border-b">
                            Selected Names
                        </div>

                        <div v-for="id in selectedNames" :key="id"
                            class="py-[19px] px-[17px] text-[18px] text-[#1A1A1A] border-b last:border-none">
                            {{ getName(id) }}
                        </div>
                    </div>
                </template>
                <!-- Service Based UI -->
                <template v-if="method === 'Service_Based'">
                    <div>
                        <div  class="bg-[#AE70701A] text-[#FF5757] text-[18px] font-semibold px-[17px] py-[19px] border-b border-[#E4E4EF]"> Services
                        </div>
                        <div v-for="(serviceObj, serviceName) in serviceBased" :key="serviceName"
                            class="px-[17px] py-[19px] border-b border-[#E4E4EF]">
                            <div class="flex justify-between items-center cursor-pointer"
                                :class="selectedService === serviceName ? 'bg-[#707EAE1A] text-[#FF5757]' : 'text-[#1A1A1A]'"
                                @click="selectService(serviceName)">
                                <!-- <div class="flex items-center gap-3">
                                    <input type="checkbox" :checked="serviceBased[serviceName].checked"
                                        @change="toggleselectService(serviceName)" @click.stop />
                                    {{ serviceName }}
                                </div> -->
                                <div class="flex items-center gap-3">
                                    <Checkbox :inputId="`checkbox-${serviceName}`" :binary="true"
                                        :modelValue="serviceBased[serviceName].checked"
                                        @update:modelValue="toggleselectService(serviceName)" @click.stop />
                                    <label :for="`checkbox-${serviceName}`">{{ serviceName }}</label>
                                </div>
                                <i class="bi bi-chevron-down" v-if="selectedService === serviceName"></i>
                                <i class="bi bi-chevron-right" v-else></i>
                            </div>
                            <!-- SUBSERVICES -->
                            <div v-if="selectedService === serviceName" class="mt-2 ml-6">
                                <!-- <div v-for="(subObj, subName) in serviceObj.subservices" :key="subName"
                                    class="flex items-center gap-2 py-1 cursor-pointer"
                                    @click="selectSubService(serviceName, subName)">
                                    <input type="checkbox" :checked="subObj.checked"
                                        @change="toggleselectSubService(serviceName, subName)" @click.stop />
                                    <span>{{ subName }}</span>
                                    <span class="text-xs text-gray-500">({{ subObj.data.length }})</span>
                                </div> -->

                                <div v-for="(subObj, subName) in serviceObj.subservices" :key="subName"
                                    class="flex items-center gap-2 py-1 cursor-pointer"
                                    @click="selectSubService(serviceName, subName)">
                                    <Checkbox :inputId="`checkbox-${serviceName}-${subName}`" :binary="true"
                                        :modelValue="subObj.checked"
                                        @update:modelValue="toggleselectSubService(serviceName, subName)" @click.stop />
                                    <label :for="`checkbox-${serviceName}-${subName}`">{{ subName }}</label>
                                    <span class="text-xs text-gray-500">({{ subObj.data.length }})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedService && selectedSubService">
                        <div class="bg-[#AE70701A] text-[#FF5757] text-[18px] font-semibold px-[17px] py-[19px] border-b border-[#E4E4EF]">
                            Country
                        </div>
                        <div v-if="currentSubserviceData.length">
                            <div v-for="entry in currentSubserviceData" :key="entry.country"
                                class="px-[17px] py-[19px] flex justify-between items-center text-[16px] border-b border-[#E4E4EF] cursor-pointer"
                                :class="selectedCountry === entry.country ? 'bg-[#707EAE1A] text-[#FF5757]' : 'bg-[#707EAE1A] text-[#1A1A1A]'"
                                @click="selectCountry(entry.country)">
                                <div class="flex items-center gap-3">
                                    <!-- <input type="checkbox"
                                        :checked="isCountryChecked(selectedService, selectedSubService, entry.country)"
                                        @change="onCountryCheckChange($event, entry.country, selectedService, selectedSubService)" /> -->

                                      <Checkbox
  :inputId="`checkbox-${entry.country}`"
  :binary="true"
  :modelValue="getCountryChecked(entry.country)"
  @update:modelValue="(val) => setCountryChecked(val, entry.country)"
  @click.stop
/>
                                    {{ entry.country }}
                                   
                                </div>
                                <i class="bi bi-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedCountry">
                        <div
                            class="bg-[#A3AED01A] text-[#1A1A1A] text-[18px] font-semibold px-[17px] py-[19px] border-b border-[#E4E4EF]">
                            Users
                        </div>
                        <div v-if="employees.length && getEmployeesForCurrentCountry().length">
                            <ul>
                                <li v-for="emp in getEmployeesForCurrentCountry()" :key="emp._id"
                                    class="flex items-center gap-2">
                                    <!-- <input type="checkbox" :value="emp.user_id._id"
                                        :checked="isUserSelected(emp.user_id._id)"
                                        @change="toggleUserSelection(emp.user_id._id)" /> -->
                                        <Checkbox :inputId="`user-checkbox-${emp.user_id._id}`"
  :binary="true"
  :modelValue="isUserSelected(emp.user_id._id)"
  @update:modelValue="() => toggleUserSelection(emp.user_id._id)" />
                                    {{ emp.user_id?.name || 'Unknown' }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <button @click="submitForm" class="bg-[#ff5757] px-[20px] py-[10px] text-[white] mt-[10px] rounded-lg " v-if="permission?.setting?.lead_mangement?.add">
            Save</button>
    </div>
</template>
<script>
export default {
    props: {
        settings: Object
    },
    data() {
        return {
            method: '',
            employees: [],
            selectedNames: [],
            selectedUsers: [],
            selectedService: null,
            selectedSubService: null,
            selectedCountry: '',
            serviceBased: {},    
            subadminMap: {},
        }
    },
    watch: {
        'serviceBased': {
            deep: true,
            handler() {
            }
        },
        method(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.init();
            }
        }
    },
    async mounted() {
        await this.getSubadmin()
        this.init()
    },
    computed: {
        selectedSubServices() {
            const selected = this.services.find(s => s.name === this.selectedService);
            return selected ? selected.subs : [];
        },
        currentSubServiceUsers() {
            const selectedService = this.services.find(s => s.name === this.selectedService);
            const sub = selectedService?.subs.find(s => s.name === this.selectedSubService);
            return sub ? sub.users : [];
        },
        currentSubserviceData() {
            if (
                this.selectedService &&
                this.selectedSubService &&
                this.serviceBased[this.selectedService]?.subservices?.[this.selectedSubService]?.data
            ) {
                return this.serviceBased[this.selectedService].subservices[this.selectedSubService].data;
            }
            return [];
        },
        employeeList() {
            return this.getUsersForSelectedSubService();
        },
        filteredEmployees() {
            if (!this.selectedCountry) return [];
            return this.employees.filter(emp => emp.country === this.selectedCountry);
        },
        mergedCountryData() {
            const sub = this.serviceBased[this.selectedService]?.subservices?.[this.selectedSubService];
            return sub?.data || [];
        },
    },
    methods: {
        async changeAutomation() {
            this.settings.loading = true;
            await subadminPut(`/setting-update`, {
                leadAutomation: this.settings.leadAutomation,
            }).then((response) => { });
            this.settings.loading = false;
        },
        async getSubadmin() {
            const response = await subadminGet(`/all-employe`);
            this.employees = response.data.emp || [];
            this.subadminMap = {};
            this.employees.forEach(emp => {
                const id = emp.user_id._id;
                const name = emp.user_id?.name || 'Unknown';
                this.subadminMap[id] = name;
            });
            console.log(this.employees)
            console.log("Employees map:", this.subadminMap);
        },
        async submitForm() {
            this.loading = true;
            console.log(this.method)
            if (this.method == "Round_Robin") {
                if (this.selectedNames.length <= 0) {
                    return errorAlert("Atleast select one subadmin")
                }
                console.log("hjhd", this.selectedNames)
                let d = { current_type: this.method, subadmin_id: this.selectedNames };
                try {
                    const response = await subadminPost(`/update-lead-settings`, d);
                    successAlert("Lead Automation Updated");
                    this.init();
                } catch (err) {
                    errorAlert("Failed to update Round Robin settings");
                }
            }
            if (this.method == "Service_Based") {
                console.log("test", this.serviceBased)
                const data = {
                    current_type: this.method, Service_Based: this.buildPayloadFromUI(this.serviceBased)
                }
                let atLeastOneSelected = false;
                const sb = data.Service_Based;
                for (const service in sb) {
                    if (service === "current_type") continue; // skip
                    const subservices = sb[service];
                    for (const sub in subservices) {
                        const entries = subservices[sub];
                        if (Array.isArray(entries) && entries.length > 0) {
                            for (const entry of entries) {
                                if (Array.isArray(entry.subadmin_id) && entry.subadmin_id.length > 0) {
                                    atLeastOneSelected = true;
                                    break;
                                }
                            }
                        }
                        if (atLeastOneSelected) break;
                    }
                    if (atLeastOneSelected) break;
                }
                if (!atLeastOneSelected) {
                    errorAlert("At least select one subadmin");
                    this.loading = false;
                    return;
                }
                try {
                    const response = await subadminPost(`/update-lead-settings`, data);
                    successAlert("Lead Automation Updated");
                    this.init();
                } catch (err) {
                    errorAlert("Failed to update Service Based settings");
                }
                const service = this.selectedService[0].service; // e.g., "Study_Visa"
                const subservice = this.selectedSubService;      // e.g., "CollegeStudyVisa"
                const country = this.selectedCountry;            // e.g., "India"
                const subadmin_id = this.selectedUsers;
                this.init()
            }
            this.method = ""
            this.selectedNames = []
            this.loading = false;
            this.selectedUsers = []
            this.selectedService = []
            this.selectedCountry = ""
        },
        cleanServiceBasedObject() {
            for (const service in this.serviceBased) {
                for (const subservice in this.serviceBased[service]) {
                    const validEntries = this.serviceBased[service][subservice].filter(entry =>
                        Array.isArray(entry.subadmin_id) && entry.subadmin_id.length > 0 &&
                        entry.country && entry.country !== ''
                    );
                    if (validEntries.length > 0) {
                        this.serviceBased[service][subservice] = validEntries;
                    } else {
                        delete this.serviceBased[service][subservice];
                    }
                }
                if (Object.keys(this.serviceBased[service]).length === 0) {
                    delete this.serviceBased[service];
                }
            }
        },
        buildPayloadFromUI(serviceBased) {
            const cleaned = {};
            for (const service in serviceBased) {
                const serviceObj = serviceBased[service];
                const subservicesObj = serviceObj?.subservices || {};
                const cleanSubservices = {};
                if (!serviceObj?.checked) {
                    for (const sub in subservicesObj) {
                        cleanSubservices[sub] = [];
                    }
                    cleaned[service] = cleanSubservices;
                    continue;
                }
                for (const sub in subservicesObj) {
                    const subservice = subservicesObj[sub];
                    if (!subservice?.checked || !Array.isArray(subservice.data)) {
                        cleanSubservices[sub] = [];
                        continue;
                    }
                    const validEntries = subservice.data.filter(entry =>
                        entry?.checked === true &&
                        Array.isArray(entry.subadmin_id) &&
                        entry.subadmin_id.length > 0
                    );
                    cleanSubservices[sub] = validEntries.map(entry => ({
                        country: entry.country,
                        subadmin_id: entry.subadmin_id,
                        pos: entry.pos ?? 0
                    }));
                }
                cleaned[service] = cleanSubservices;
            }
            return {
                current_type: 'Service_Based',
                ...cleaned
            };
        },
        async init() {
            const res = await subadminGet('/lead-settings');
            const rawMethod = res.data.method;
            const companyData = res.data.company;
            this.method = this.method || rawMethod.current_type;
            if (this.method === 'Service_Based') {
                console.log("this.method", this.method)
                const serviceBased = rawMethod.Service_Based;
                const tempStructure = {};
                for (const serviceKey in serviceBased) {
                    const subservicesRaw = serviceBased[serviceKey];
                    const subservices = {};
                    let serviceChecked = false;
                    for (const subKey in subservicesRaw) {
                        const assignedData = subservicesRaw[subKey];
                        const formattedService = serviceKey.replace(/_/g, ' ');
                        const formattedSub = subKey.replace(/([a-z])([A-Z])/g, '$1 $2');
                        const companyEntry = companyData.find(
                            item => item.service === formattedService && item.subcategories.includes(formattedSub)
                        );
                        const fullCountries = companyEntry?.countries || [];
                        const mergedCountryData = fullCountries.map(country => {
                            const matched = assignedData.find(d => d.country === country);
                            const subadmin_id = matched?.subadmin_id || [];
                            const countryChecked = subadmin_id.length > 0;
                            return {
                                country,
                                subadmin_id,
                                subadmin_names: this.employees
                                    .filter(e => subadmin_id.includes(e._id))
                                    .map(e => e.user_id?.name || 'Unknown'),
                                pos: matched?.pos ?? 0,
                                checked: countryChecked // ✅ Add this line
                            };
                        });
                        const subChecked = mergedCountryData.some(entry => entry.checked);
                        subservices[subKey] = {
                            checked: subChecked,
                            data: mergedCountryData
                        };
                        if (subChecked) serviceChecked = true;
                    }
                    tempStructure[serviceKey] = {
                        checked: serviceChecked,
                        subservices
                    };
                }
                this.serviceBased = tempStructure;
                console.log("serviceBased with country checkboxes:", this.serviceBased);
            }
            if (this.method === 'Round_Robin') {
                this.selectedNames = rawMethod.Round_Robin?.subadmin_id || [];
            }
        },
        selectService(serviceName) {
            this.selectedService = this.selectedService === serviceName ? null : serviceName;
            const service = this.serviceBased[serviceName];
        },
        toggleselectService(serviceName) {
            this.selectedService = this.selectedService === serviceName ? null : serviceName;
            const service = this.serviceBased[serviceName];
            service.checked = !service.checked;
        },
        selectSubService(service, sub) {
            this.selectedService = service;
            this.selectedSubService = sub;
            this.selectedCountry = '';
            const subs = this.serviceBased[service].subservices[sub];
        },
        toggleselectSubService(service, sub) {
            this.selectedService = service;
            this.selectedSubService = sub;
            this.selectedCountry = '';
            const subs = this.serviceBased[service].subservices[sub];
            subs.checked = !subs.checked;
        },
        selectCountry(country) {
            this.selectedCountry = country;
        },
        getUsersForSelectedSubService() {
            console.log("this.selectedService", this.selectedService)
            const service = this.serviceBased[this.selectedService];
            if (!service) return [];
            console.log("service.subservices?.[this.selectedSubService]", service.subservices?.[this.selectedSubService])
            const subservice = service.subservices?.[this.selectedSubService];
            if (!subservice || !Array.isArray(subservice.data)) return [];
            const entries = subservice.data;
            if (this.selectedCountry) {
                const found = entries.find(entry => entry.country === this.selectedCountry);
                return found && Array.isArray(found.subadmin_names) ? found.subadmin_names : [];
            }
            return [...new Set(entries.flatMap(entry => entry.subadmin_names || []))];
        },
        getName(id) {
            const emp = this.employees.find(e => e.user_id._id === id);
            return emp ? emp.user_id.name : '';
        },
        getEmployeesForCurrentCountry() {
            return this.employees;
        },
        isUserSelected(empId) {
            if (!this.selectedService || !this.selectedSubService || !this.selectedCountry) return false;

            const subData = this.serviceBased[this.selectedService]?.subservices?.[this.selectedSubService]?.data;
            if (!Array.isArray(subData)) return false;

            const entry = subData.find(item => item.country === this.selectedCountry);
            return entry?.subadmin_id?.includes(empId) || false;
        },
        toggleUserSelection(id) {
            const subData = this.serviceBased[this.selectedService].subservices[this.selectedSubService].data;
            const entry = subData.find(item => item.country === this.selectedCountry);
            if (!entry) return;

            const index = entry.subadmin_id.indexOf(id);
            if (index === -1) {
                entry.subadmin_id.push(id);
            } else {
                entry.subadmin_id.splice(index, 1);
            }
            const emp = this.employees.find(e => e.user_id._id === id);
            if (index === -1) {
                entry.subadmin_names.push(emp?.user_id?.name || 'Unknown');
            } else {
                entry.subadmin_names = entry.subadmin_names.filter(name => name !== (emp?.user_id?.name || 'Unknown'));
            }
        },
        onCountryCheckChange(event, country, serviceName, subServiceName) {
            if (!this.serviceBased[serviceName]) {
                this.$set(this.serviceBased, serviceName, {
                    subservices: {}
                });
            }

            if (!this.serviceBased[serviceName].subservices[subServiceName]) {
                this.$set(this.serviceBased[serviceName].subservices, subServiceName, {
                    data: []
                });
            }
            const countryList = this.serviceBased[serviceName].subservices[subServiceName].data;
            if (event.target.checked) {
                const existing = countryList.find((item) => item.country === country);
                if (!existing) {
                    countryList.push({
                        country,
                        subadmin_id: this.selectedUsers || [],
                        pos: 0,
                        checked: true
                    });
                } else {
                    existing.checked = true;
                }
            } else {
                const existing = countryList.find((item) => item.country === country);
                if (existing) {
                    existing.checked = false;
                }
            }
            console.log('Updated serviceBased:', JSON.stringify(this.serviceBased, null, 2));
        },

        onCountryCheckboxChange(checked, country, serviceName, subServiceName) {
    if (!this.serviceBased[serviceName]) {
      this.$set(this.serviceBased, serviceName, {
        subservices: {}
      });
    }
    if (!this.serviceBased[serviceName].subservices[subServiceName]) {
      this.$set(this.serviceBased[serviceName].subservices, subServiceName, {
        data: []
      });
    }

    const countryList = this.serviceBased[serviceName].subservices[subServiceName].data;
    const existing = countryList.find(item => item.country === country);

    if (checked) {
      if (!existing) {
        countryList.push({
          country,
          subadmin_id: this.selectedUsers || [],
          pos: 0,
          checked: true
        });
      } else {
        existing.checked = true;
      }
    } else {
      if (existing) {
        existing.checked = false;
      }
    }

    console.log('Updated serviceBased:', JSON.stringify(this.serviceBased, null, 2));
  },

getCountryChecked(country) {
  const data =
    this.serviceBased?.[this.selectedService]?.subservices?.[this.selectedSubService]?.data || [];
  const entry = data.find((item) => item.country === country);
  return entry?.checked || false;
},

setCountryChecked(val, country) {
  const data =
    this.serviceBased?.[this.selectedService]?.subservices?.[this.selectedSubService]?.data || [];
  const entry = data.find((item) => item.country === country);
  if (entry) {
    entry.checked = val;
  }
},
        isCountryChecked(service, subService, country) {
            console.log("test test", service, subService, country)
            console.log("dff", this.serviceBased)
            const entries = this.serviceBased?.[service]?.subservices?.[subService]?.data || [];
            console.log("entries", entries)
            const countryObj = entries.find((e) => e.country === country);
            return countryObj && countryObj.subadmin_id?.length > 0;
        }
    }
};
</script>
<style scoped>
#languages-heading {
    color: #404040;
    font-size: 25.38px;
    font-weight: 700;
    line-height: 6vw;
    word-wrap: break-word;
}

.languages {
    box-shadow: 0px 10.759952545166016px 166.7792510986328px rgba(153.16, 170.95, 197.62, 0.18);
}

.break-line {
    width: -webkit-fill-available;
    height: 2px;
    background: #000000;
    opacity: 0.1;
    margin: 10px 0px 30px 0px;
}
</style>