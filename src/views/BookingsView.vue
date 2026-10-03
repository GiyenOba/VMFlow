<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useVMStore } from '../stores/vmStores'
import { useBookingStore } from '../stores/bookingStores'

const vmStore = useVMStore()
const bookingStore = useBookingStore()

const { virtualMachines } = storeToRefs(vmStore)
const { bookings } = storeToRefs(bookingStore)

const bookingsWithVM = computed(() => {
  return bookings.value.map((booking) => {
    const vm = virtualMachines.value.find((machine) => machine.id === booking.vmId)

    return {
      ...booking,
      vmName: vm?.name ?? 'Unknown VM',
    }
  })
})
</script>

<template>
  <section class="bookings-page">
    <div class="page-heading">
      <p class="eyebrow">Reservations</p>
      <h1>Bookings</h1>

      <p class="intro">View confirmed reservations and waiting-list requests.</p>
    </div>

    <p v-if="bookingsWithVM.length === 0" class="empty-state">No bookings have been created yet.</p>

    <div v-else class="booking-list">
      <article v-for="booking in bookingsWithVM" :key="booking.id" class="booking-card">
        <div>
          <h2>{{ booking.vmName }}</h2>
          <p>{{ booking.requester }}</p>
        </div>

        <span class="status" :class="`status-${booking.status}`">
          {{ booking.status }}
        </span>

        <dl>
          <div>
            <dt>Start</dt>
            <dd>{{ booking.startAt }}</dd>
          </div>

          <div>
            <dt>End</dt>
            <dd>{{ booking.endAt }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>
