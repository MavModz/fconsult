<template>
  <!-- Optional fallback -->
  <div>Redirecting...</div>
</template>

<script setup>
import { useCookie } from '#app'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const token = useCookie('token')

onMounted(() => {
  if (token.value) {
    window.location.href = `https://flow.findandconsult.com/flow?token=${token.value}`
    // window.location.href = `http://localhost:3000/flow?token=${token.value}`
  } else {
    console.warn('⚠️ No token found in cookies')
  }
})
</script>