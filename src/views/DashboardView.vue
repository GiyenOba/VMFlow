<script setup>
import { ref, computed } from 'vue'
import VMCard from '../components/VMCard.vue'

const appName = 'VMFlow'

const virtualMachines = [
  {
    id: 1,
    name: 'Development VM 01',
    os: 'Ubuntu 24.04',
    cpu: 4,
    ram: 8,
    storage: 120,
    status: 'available',
  },
  {
    id: 2,
    name: 'Windows QA',
    os: 'Windows 11',
    cpu: 8,
    ram: 16,
    storage: 250,
    status: 'available',
  },
  {
    id: 3,
    name: 'Legacy Testing',
    os: 'Ubuntu 22.04',
    cpu: 2,
    ram: 4,
    storage: 80,
    status: 'maintenance',
  },
]
const searchQuery = ref('')
const statusFilter = ref('all')
const filteredVirtualMachine = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return virtualMachines
  }
  return virtualMachines.filter((vm) => {
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
