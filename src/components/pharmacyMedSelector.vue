<template>
  <div class="space-y-4">
    <input v-model="currentInput" class="border p-2 rounded w-full" type="text"
      placeholder="Search or add a medicine" />
    <ul>
      <li v-for="medicine in filteredMedicines" :key="medicine.id"
        class="flex items-center justify-between p-2 border-b">
        <span>{{ medicine.name }}</span>
        <button @click="selectMedicine(medicine)" class="text-yellow-500">
          <i :class="getStarClass(medicine)" />
        </button>
      </li>
    </ul>

    <div v-if="chosenMedicines.length" class="mt-4">
      <h2 class="font-bold">Chosen Medicines:</h2>
      <draggable v-model="chosenMedicines" item-key="id" class="space-y-2" @end="onReorder">
        <template #item="{ element }">
          <div class="flex items-center justify-between p-2 border-b">
            <span>{{ element.name }}</span>
            <button @click="toggleFavorite(element)" class="text-yellow-500">
              <i :class="getStarClass(element)" />
            </button>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { usePharmacyMedsStore } from '../stores/pharmacyMed'

interface Medicine {
  id: number
  name: string
}


const store = usePharmacyMedsStore()

const currentInput = ref('')

onMounted(() => {
  store.fetchMedicines()
})

const filteredMedicines = computed(() => {
  return store.existingMedicines.filter((medicine: Medicine) =>
    medicine.name.toLowerCase().includes(currentInput.value.toLowerCase())
  )
})


const selectMedicine = (medicine: Medicine): void => {
  store.addMedicineToChosen(medicine)
}


const toggleFavorite = (medicine: Medicine): void => {
  store.addMedicineToExisting(medicine.name)
}


const getStarClass = (medicine: Medicine): string => {
  return store.existingMedicines.some((item: Medicine) => item.id === medicine.id)
    ? 'fa fa-star'
    : 'fa fa-star-o'
}


const onReorder = (newOrder: Medicine[]): void => {
  store.reorderMedicines(newOrder)
}


const chosenMedicines = computed(() => store.chosenMedicines)
</script>

<style scoped>
.fa {
  font-size: 20px;
}
</style>
