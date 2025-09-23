<template>
    <div class="d-flex flex-wrap gap-5 sm:gap-4 md:gap-6 lg:gap-8 align-items-center">
        <div v-if="data.length == 0" class="nodoc text-muted">
            No document found!
        </div>
        <div v-else class="document-card " v-for="(ele, index) in data">
            <div class="px-2">
                <div class="d-flex gap-2 flex-col">
                    <div class="card-left-heading d-flex align-items-center justify-content-between gap-2">
                        <h5>{{ ele.name }}</h5>
                        <span class="light-cool-grey" v-if="ele.document_type == 'Process Document'">{{
                            ele.document_type }}</span>
                        <span v-else class="light-cool-grey"> {{ ele.document_category }}</span>
                    </div>
                    <p>{{ ele.requested_at }} • <span class="text-[#ff5757]">
                            <b>{{ ele.is_shared ? "SHARED" : "REQUESTED" }}</b>
                        </span></p>
                </div>
                <div class="d-flex items-center justify-content-between gap-2 py-3">
                    <div class="flex flex-wrap gap-2 justify-between w-full">
                        <button icon="pi pi-arrow-left" class="light-grey">
                            <NuxtImg src="/img/svg/editz.svg" />
                            <span class="cursor-pointer">{{ ele.is_shared ? "update" : "upload" }}</span>
                        </button>
                    </div>
                </div>
                <div v-if="ele.document_type !== 'Process Document'"
                    class="d-flex justify-content-between align-items-center gap-2 pt-lg-2">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Array
    }
}
</script>

<style>
@import url('style.css');
</style>