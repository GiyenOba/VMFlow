<script setup>
defineProps({
  vm: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <article class="vm-card">
    <div class="vm-card-header">
      <div>
        <h3>{{ vm.name }}</h3>
        <p>{{ vm.os }}</p>
      </div>
      <span class="status" :class="`status-${vm.status}`">
        {{ vm.status }}
      </span>
    </div>

    <dl class="vm-specs">
      <div>
        <dt>CPU</dt>
        <dd>{{ vm.cpu }} cores</dd>
      </div>

      <div>
        <dt>RAM</dt>
        <dd>{{ vm.ram }} GB</dd>
      </div>

      <div>
        <dt>Storage</dt>
        <dd>{{ vm.storage }}</dd>
      </div>
    </dl>
  </article>
</template>
