<template>

    <div
        class=" bg-white flex flex-col mb-5 py-[50px] border-[#333639] border-y-[3px] px-5 rounded-[16px] overflow-y-auto">
        <!-- Top Section -->
        <div class="flex justify-between items-start mb-6">
            <!-- Logo -->
            <div>
                <img :src="agreement?.company_id?.symbol" alt="Company Logo" class="max-w-[120px] max-h-[120px]" />
            </div>

            <!-- Company Info -->
            <div class="text-right">
                <h2 class="text-[20px] font-semibold">{{ agreement?.company_id?.company_name }}</h2>
                <p class="text-sm text-gray-600 leading-tight pb-0">
                    {{ agreement?.company_id?.address }}
                </p>
            </div>
        </div>
        <div class="flex justify-between mb-3 items-center">
            <!-- Document Title -->
            <h1 class="text-[26px] font-semibold ">{{ agreement?.agreement_id?.document_title }}</h1>
            <!-- <button @click="downloadPDF"
                class="px-6 py-2 rounded-xl bg-[#ff5c5c] text-white font-medium shadow-md hover:bg-[#e14d4d] transition">
                Download
            </button> -->
        </div>
        <!-- Scrollable Document Body -->
        <div
            class="flex-1 max-h-[50vh] overflow-y-auto border-t border-gray-300 pt-6 space-y-3 text-[#3c3c3c] text-sm leading-relaxed">
            <p  v-html="agreement?.agreement_id?.
                html_content
                ">

            </p>
        </div>

         <div v-if="agreement?.accepted" class="flex  mt-3 justify-content-between px-4">
        <!-- Sender Signature -->
        <div class="">
              <img :src="agreement.agreement_id.admin_sign" alt="Sender Signature" class="h-[90px] max-w-[200px] py-2" />
            <p class="font-semibold mb-0 text-[20px] text-[#1A1A1A] mt-2">{{ agreement?.agreement_id?.uploaded_by?.name}}</p>
            <p class="text-[#8E8E8E] text-[17px] mt-1">{{ agreement?.company_id.city }}</p>
           
        </div>

        <!-- Receiver Signature -->
     
        <div class="text-right flex justify-end flex-col">
            <img :src="agreement.user_signature" alt="Reciever Signature" class="h-[90px] max-w-[200px] py-2" />
            <p class="font-semibold mb-0 text-[20px] text-[#1A1A1A] mt-2">{{ agreement?.name }}</p>
            <p class="text-[#8E8E8E] text-[17px] mt-1">{{ agreement?.location }}</p>
        </div>
    </div>

    <div v-else>
        <div class="digital-sign  grid grid-cols-2 gap-4 mt-4 mb-3">
            <FormKit type="text" name="name" placeholder="Your Name" v-model="form.name" class="w-[45%]"
                validation="required" />

            <FormKit type="text" name="location" placeholder="Your Location" class="mt-3" v-model="form.location"
                validation="required" />
        </div>

        <div class="signature-wrapper mt-2 relative">

            <div class="signature-header flex justify-center">
                ✍️ Draw your signature below
            </div>
            <button @click="clear" class=" absolute right-4 top-3"><i class="bi bi-x-lg"></i></button>
            <div class="canvas-container" @click="focusCanvas">
                <canvas ref="canvas" class="signature-canvas" width="600" height="160"
                    style="width: 100%; height: 130px;"></canvas>
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
            <button @click="handleAccept" type="submit" class="btn btn-success mt-4 btn-btn-cancel">Accept</button>
        </div>
    </div>
    </div>


   




</template>



<script>
import SignaturePad from 'signature_pad';
import { acceptAgreement } from '~/utils/libs/services/api';
definePageMeta({
    layout: 'user',
    middleware: ['user'],
});

export default {
    data() {
        return {
            form: {
                name: "",
                location: ""
            },
            status: false,
            agreement: {},
            showSignature: false,
            visible: true,
            signaturePad: null,
            sender: { /* ... */ },
            receiver: { /* ... */ }
        }
    },

    mounted() {
        this.AgreementData();

        this.$nextTick(() => {
            if (!this.status) {
                const canvasEl = this.$refs.canvas;
                if (canvasEl) {
                    this.resizeCanvas(canvasEl);
                    this.signaturePad = new SignaturePad(canvasEl);
                }
            }
        });


    },


    methods: {
        async AgreementData() {
            try {
                const response = await userGet(`/view-user-agreement/${this.$route.params.id}`);
                if (response.status) {
                    this.agreement = response.data.data;
                }
            } catch (error) {
                console.error("Failed to fetch agreement:", error);
            }
        },
        resizeCanvas(canvas) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext('2d').scale(ratio, ratio);
        },
        clear() {
            this.signaturePad?.clear();
        },
        async handleAccept() {
            if (!this.form.name || !this.form.location) {
                errorAlert("Please enter your name and location.");
                return;
            }

            if (!this.signaturePad || this.signaturePad.isEmpty()) {
                errorAlert("Please draw your signature first.");
                return;
            }

            const signatureDataUrl = this.signaturePad.toDataURL('image/png');
            const timestamp = Date.now();
            const fileName = `user_agreement_sign${timestamp}`;
            const x = await uploadImageAdminE2(signatureDataUrl, fileName);
            const payload = {
                name: this.form.name,
                location: this.form.location,
                user_signature: x,
                agreementId: this.agreement?._id || null,
            };

            console.log(payload);

            const response = await acceptAgreement(this.agreement?._id, payload); // Call the API with the agreement ID
            if (response?.status) {
                successAlert("Agreement accepted successfully!");
               this.AgreementData()
            } else {
                console.error("Failed to accept agreement:", response?.msg || "Unknown error");
                errorAlert(response?.msg || "Failed to accept agreement.");
            }
        },
        focusCanvas() {
            this.$refs.canvas?.focus();
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
