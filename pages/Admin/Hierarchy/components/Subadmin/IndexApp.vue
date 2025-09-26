<template>
        <div class="languages">
            <div class="btn-container"><span id="languages-heading">Sub Admin</span></div>
            <div class="break-line"></div>
            <div class="card-row">
                <div class="card-col"><span>{{ subadmin.sub_name }}</span>
                    <div class="btn-group">
                        <span><img src="/img/svg/red-eye.svg" alt=""></span>
                        <span><img src="/img/svg/add-admin.svg" alt=""></span>
                        <span><img src="/img/svg/refresh.svg" alt=""></span>
                        <span> <img src="/img/svg/trash.svg" alt=""></span>
                    </div>
                </div>
            </div>
        </div>


</template>

<script>
export default{
    props:{
        subadmin:{}
    }
}
</script>

<style scoped>
@import url('./style.css');
</style>