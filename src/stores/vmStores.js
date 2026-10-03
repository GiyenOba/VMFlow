import { defineStore } from 'pinia'

export const useVMStore = defineStore('vm', {
  state: () => ({
    virtualMachines: [
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
    ],
  }),
})
