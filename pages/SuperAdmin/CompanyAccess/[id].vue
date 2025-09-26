<template>
    <iframe :src="`/admin/settoken?token=${$route.params.id}`" width="100%" style="height:100vh" credentialless></iframe>
</template>