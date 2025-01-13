import { defineStore } from 'pinia'
import axios from 'axios'

interface Medicine {
  id: number
  name: string
}

export const usePharmacyMedsStore = defineStore('pharmacyMeds', {
  state: () => ({
    existingMedicines: [] as Medicine[],
    chosenMedicines: [] as Medicine[],
  }),
  actions: {
    // Fetch medicines from the API
    async fetchMedicines() {
      try {
        const response = await axios.get<Medicine[]>('http://localhost:5000/existingMedicines')
        this.existingMedicines = response.data
        console.log('Medicines fetched:', this.existingMedicines) // Log response data
      } catch (error) {
        console.error('Error fetching medicines:', error)
      }
    },

    // Add medicine to chosenMedicines if not already there
    addMedicineToChosen(medicine: Medicine) {
      if (!this.chosenMedicines.some((item) => item.id === medicine.id)) {
        this.chosenMedicines.push(medicine)
      }
    },

    // Add a new medicine to existingMedicines and the backend
    async addMedicineToExisting(medicineName: string) {
      try {
        const newMedicine: Medicine = { id: Date.now(), name: medicineName }
        const response = await axios.post<Medicine>('http://localhost:5000/existingMedicines', newMedicine)
        this.existingMedicines.push(response.data)
      } catch (error) {
        console.error('Error adding medicine:', error)
      }
    },

    // Reorder the chosenMedicines list
    reorderMedicines(newOrder: Medicine[]) {
      this.chosenMedicines = newOrder
    },
  }
})
