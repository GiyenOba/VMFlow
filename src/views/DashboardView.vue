<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import VMCard from '../components/VMCard.vue'
import { useVMStore } from '../stores/vmStores.js'

const appName = 'VMFlow'

const vmStore = useVMStore()
const { virtualMachines } = storeToRefs(vmStore)

const searchQuery = ref('')
const statusFilter = ref('all')

const totalVMs = computed(() => virtualMachines.value.length)
const availableVMs = computed(() => {
  return virtualMachines.value.filter((vm) => vm.status === 'available').length
})
const maintenanceVMs = computed(() => {
  return virtualMachines.value.filter((vm) => vm.status === 'maintenance').length
})

const filteredVirtualMachine = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return virtualMachines.value.filter((vm) => {
    const matchesSearch =
      vm.name.toLowerCase().includes(query) || vm.os.toLowerCase().includes(query)
    const matchesStatus = vm.status === statusFilter.value || statusFilter.value === 'all'
    return matchesSearch && matchesStatus
  })
})
</script>

<template>
  <section class="dashboard">
    <div class="dashboard-intro">
      <p class="eyebrow">Virtual Machine Resource Management</p>

      <h1>{{ appName }}</h1>

      <p class="intro">
        Manage virtual machines, reservations, and resource availability from one dashboard.
      </p>
    </div>
    <div class="stats-grid">
      <article class="stat-card">
        <p>Total VMs:</p>
        <strong>{{ totalVMs }}</strong>
      </article>
      <article class="stat-card">
        <p>Available VMs:</p>
        <strong>{{ availableVMs }}</strong>
      </article>
      <article class="stat-card">
        <p>Maintenance VMs</p>
        <strong>{{ maintenanceVMs }}</strong>
      </article>
    </div>
    <div class="vm-section">
      <div class="section-header">
        <div>
          <h2>Virtual Machines</h2>
          <p>View the resources currently available to your team.</p>
        </div>
        <div class="search-field">
          <label for="vm-search">Search VMs</label>

          <input
            id="vm-search"
            v-model="searchQuery"
            type="search"
            placeholder="Search by name or OS"
          />
        </div>
        <div class="form-control">
          <label for="statusfilter">Status</label>
          <select name="" id="status-filter" v-model="statusFilter">
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div class="vm-grid">
        <VMCard v-for="vm in filteredVirtualMachine" :key="vm.id" :vm="vm" />
        <p v-if="filteredVirtualMachine.length === 0">No Virtual Machine matches your search.</p>
      </div>
    </div>
  </section>
</template>
