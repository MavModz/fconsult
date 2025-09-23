<template>

    <div
        class=" bg-white flex flex-col mb-5 py-[50px] border-[#333639] border-y-[3px] px-5 rounded-[16px] overflow-y-auto">
        <!-- Top Section -->
        <div class="flex justify-between items-start mb-6">
            <!-- Logo -->
            <div>
                <img src="/public/img/png/logo.png" alt="Company Logo" class="max-w-[230px] max-h-[120px]" />
            </div>

            <!-- Company Info -->
            <div class="text-right">
                <h2 class="text-[20px] font-semibold">Company Name</h2>
                <p class="text-sm text-gray-600 leading-tight pb-0">
                    Sco 128-129 Second floor, Madhya Marg,<br />
                    Sector 8C, Chandigarh, 160009
                </p>
            </div>
        </div>
        <div class="flex justify-between mb-3 items-center">
            <!-- Document Title -->
            <h1 class="text-[26px] font-semibold ">Document Name</h1>
            <button @click="downloadPDF"
                class="px-6 py-2 rounded-xl bg-[#ff5c5c] text-white font-medium shadow-md hover:bg-[#e14d4d] transition">
                Download
            </button>
        </div>
        <!-- Scrollable Document Body -->
        <div
            class="flex-1 max-h-[50vh] overflow-y-auto border-t border-gray-300 pt-6 space-y-3 text-[#3c3c3c] text-sm leading-relaxed">
            <p  v-html="data">

            </p>
        </div>
    </div>


    <div v-if="status" class="grid grid-cols-2 gap-10 justify-items-between px-4">
        <!-- Sender Signature -->
        <div class="">
            <img :src="sender.signatureUrl" alt="Sender Signature" class="h-[80px] max-w-[200px] py-2" />
            <p class="font-semibold mb-0 text-[20px] text-[#1A1A1A] mt-2">{{ sender.name }}</p>
            <p class="text-[#8E8E8E] text-[17px] mt-1">{{ sender.date }}</p>
        </div>

        <!-- Receiver Signature -->
        <div class="text-right flex justify-end flex-col">
            <img :src="receiver.signatureUrl" alt="Receiver Signature" class="h-[80px] flex justify-end  max-w-[200px] py-2" />
            <p class="font-semibold mb-0 text-[20px] text-[#1A1A1A] mt-2">{{ receiver.name }}</p>
            <p class="text-[#8E8E8E] text-[17px] mt-1">{{ receiver.date }}</p>
        </div>
    </div>

    <div v-else>
        <div class="digital-sign  grid grid-cols-2 gap-4 mb-4">
            <FormKit type="text" name="name" placeholder="Your Name" v-model="form.name" class="w-[45%]"
                validation="required" />

            <FormKit type="text" name="location" placeholder="Your Location" class="mt-3" v-model="form.location"
                validation="required" />
        </div>

        <div class="signature-wrapper mt-3 relative">

            <div class="signature-header flex justify-center">
                ✍️ Draw your signature below
            </div>
            <button @click="clear" class=" absolute right-4 top-3"><i class="bi bi-x-lg"></i></button>
            <div class="canvas-container" @click="focusCanvas">
                <canvas ref="canvas" class="signature-canvas" style="height: 130px; width: 100%;"></canvas>
                <div v-if="signaturePad?.isEmpty()" class="signature-placeholder">
                    <i class="bi bi-pencil text-lg mr-2"></i> Tap or draw here
                </div>
            </div>
            <!-- <div class="actions mt-4">
            <button @click="clear" class="btn clear">Clear</button>
            <button @click="save" class="btn save" :disabled="signaturePad?.isEmpty()">Save</button>
        </div> -->
        </div>
        <div class="modal-footer-section flex justify-end">
            <button type="submit" class="btn btn-success mt-4 btn-btn-cancel">Accept</button>
        </div>
    </div>




</template>

<!-- <script setup>
import { ref, onMounted } from 'vue'
import SignaturePad from 'signature_pad'
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    status: {
        type: Boolean
    }
})

const canvas = ref(null)
let signaturePad

onMounted(() => {
    const canvasEl = canvas.value
    resizeCanvas(canvasEl)
    signaturePad = new SignaturePad(canvasEl)
})

function resizeCanvas(canvas) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d').scale(ratio, ratio)
}

function clear() {
    signaturePad.clear()
}

function save() {
    if (signaturePad.isEmpty()) {
        alert('Please draw your signature first.')
        return
    }
    const dataUrl = signaturePad.toDataURL('image/png')
    console.log('Signature Image:', dataUrl)
}

function focusCanvas() {
    canvas.value.focus()
}
</script> -->

<script setup>
import { ref, onMounted, watch } from 'vue'
import SignaturePad from 'signature_pad'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    status: {
        type: Boolean
    }
})

const canvas = ref(null)
let signaturePad

// Only initialize when modal is visible
watch(() => props.status, (newVal) => {
    if (newVal) {
        // Wait for DOM to render
        setTimeout(() => {
            const canvasEl = canvas.value
            if (canvasEl) {
                resizeCanvas(canvasEl)
                signaturePad = new SignaturePad(canvasEl)
            }
        }, 100) // give a small delay to ensure DOM is fully ready
    }
})

function resizeCanvas(canvas) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d').scale(ratio, ratio)
}

function clear() {
    signaturePad?.clear()
}

function save() {
    if (!signaturePad || signaturePad.isEmpty()) {
        alert('Please draw your signature first.')
        return
    }
    const dataUrl = signaturePad.toDataURL('image/png')
    console.log('Signature Image:', dataUrl)
}

function focusCanvas() {
    canvas.value?.focus()
}

</script>


<script>
export default {
    data() {
        return {
            form: {
                name: "",
                location: ""
            },
            showSignature: false,
            visible: true,
            sender: {
                name: 'CUSTOMER NAME',
                date: '24 December 2024',
                signatureUrl: '/public/img/signature1.png'
            },
            receiver: {
                name: 'Charlie Richard',
                date: '24 December 2024',
                signatureUrl: '/public/img/png/logo.png'
            }
        }
    }
}
</script>

<style scoped>
.signature-wrapper {
    /* border: 2px dashed #d1d5db; */
    padding: 1rem;
    border-radius: 12px;
    /* background-color: #f9fafb; */
    max-width: 100%;
}

.signature-header {
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
}

.canvas-container {
    position: relative;
    width: 100%;
    height: 150px;
    border: 2px dashed #e5e7eb;
    border-radius: 8px;
    background-color: #ffffff;
    cursor: url('https://static.vecteezy.com/system/resources/previews/024/094/943/non_2x/pencil-graphite-supply-free-png.png') 0 32, auto;
}


.signature-canvas {
    width: 100%;
    height: 100%;
    display: block;
}

.signature-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    font-size: 16px;
    color: #9ca3af;
    display: flex;
    align-items: center;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    border: none;
}

.clear {
    background-color: #f87171;
    color: white;
}

.save {
    background-color: #10b981;
    color: white;
}

.save:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
}
</style>
