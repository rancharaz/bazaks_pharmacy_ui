<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Pharmacy UI</h1>
    <div class="flex space-x-4">
      <!-- Use the renamed component -->
      <PharmacyMedSelector />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PharmacyMedSelector from './components/PharmacyMedSelector.vue'
</script>
