<template>
  <!-- Optional fallback -->
  <div>Redirecting...</div>
</template>

<script setup>
import { useCookie } from '#app'

definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin']
})

const token = useCookie('token')

onMounted(() => {
  if (token.value) {
    window.location.href = `https://flow.findandconsult.com/flow?token=${token.value}`
  } else {
    console.warn('⚠️ No token found in cookies')
  }
})
</script>

