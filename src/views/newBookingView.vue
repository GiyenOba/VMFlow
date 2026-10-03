<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useVMStore } from '@/stores/vmStores'
import { useBookingStore } from '@/stores/bookingStores'

const vmStore = useVMStore()
const bookingStore = useBookingStore()

const { virtualMachines } = storeToRefs(vmStore)

const requester = ref('')
const selectedVMId = ref('')
const startAt = ref('')
const endAt = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const resultStatus = ref('')

function validateForm() {
  if (!requester.value.trim()) {
    return 'Requester name is required'
  }
  if (!selectedVMId.value) {
    return 'Please select a Virtual Machine'
  }
  if (!startAt.value || !endAt.value) {
    return 'Start time and End times are required'
  }

  const start = new Date(startAt.value)
  const end = new Date(endAt.value)

  if (start.value > end.value) {
    return 'End time must be after the Start Time'
  }
}

function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  resultStatus.value = ''

  const validationError = validateForm()

  if (validationError) {
    errorMessage.value = validationError
    return
  }
  const selectedVM = selectedVMId.value.find((vm) => vm.id === Number(selectedVMId.value))
  if (selectedVM.status === 'maintenance') {
    errorMessage.value = 'This virtual machine is currently under maintenance'
    return
  }
  const booking = bookingStore.createBooking({
    requester: requester.value,
    vmId: selectedVMId.value,
    startAt: startAt.value,
    endAt: endAt.value,
  })

  resultStatus.value = booking.status

  if (booking.status === 'confirmed') {
    successMessage.value = `Booking confirmed for ${selectedVM.name}.`
  } else {
    successMessage.value =
      `${selectedVM.name} is already reserved during that time. ` +
      `Your request has been to its waiting list.`
  }
  requester.value = ''
  selectedVMId.value = ''
  startAt.value = ''
  endAt.value = ''
}
</script>

<template>
  <section class="booking-page">
    <div class="page-heading">
      <p class="eyebrow">VM Reservation</p>
      <h1>New Booking</h1>
      <p class="intro">
        Reserve a virtual machine for a specific date and time. If the requested slot is already
        booked, your request will automatically be added to that machine's waiting list.
      </p>
    </div>

    <form class="booking-form" @submint.prevent="handleSubmit">
      <div class="form-control">
        <label for="request">Requesters Name</label>
        <input id="requester" v-model="requester" type="text" placeholder="Enter your name" />
      </div>
      <div class="form-control">
        <label for="virtual-machine">Virtual Machine</label>
        <select id="virtual-machine" v-model="selectedVMId">
          <option value="">Select a Virtual Machine</option>
          <option
            v-for="vm in virtualMachines"
            :key="vm.id"
            :value="vm.id"
            :disabled="vm.status === 'maintenance'"
          >
            {{ vm.name }} — {{ vm.os }}
            {{ vm.status === 'maintenance' ? '(Maintenance)' : '' }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <label for="start-at">Start date and time</label>
        <input id="start-at" v-model="startAt" type="datetime-local" />
      </div>
      <div class="form-control">
        <label for="end-at">End date and time</label>
        <input id="end-at" v-model="endAt" type="datetime-local" />
      </div>
      <p v-if="errorMessage" class="form-message error-message" role="alert">
        {{ errorMessage }}
      </p>
      <p
        v-if="successMessage"
        class="form-message"
        :class="resultStatus === 'waitlisted' ? 'waitlist-message' : 'success-message'"
        aria-live="polite"
      >
        {{ successMessage }}
      </p>
      <button type="submit">Submit Booking</button>
    </form>
  </section>
</template>
