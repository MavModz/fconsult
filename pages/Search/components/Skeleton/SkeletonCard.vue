<template>
    <div class="skeleton-container flex flex-col gap-2">
        <Skeleton width="438px" height="200px"></Skeleton>
        <div class="flex justify-between">
            <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                <Skeleton width="5rem" borderRadius="16px"></Skeleton>
            </div>
            <div>
                <Skeleton width="5rem" borderRadius="16px"></Skeleton>
            </div>
        </div>
    </div>
</template>

<script>
import Skeleton from 'primevue/skeleton';

export default {
    components: {
        Skeleton
    }
}

</script>

<style>
.skeleton-container {
    width: 438px;
    height: 270px
}
</style>