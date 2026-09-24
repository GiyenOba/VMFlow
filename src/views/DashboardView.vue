<script setup>
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
      </div>

      <div class="vm-grid">
        <VMCard v-for="vm in virtualMachines" :key="vm.id" :vm="vm" />
      </div>
    </div>
  </section>
</template>
