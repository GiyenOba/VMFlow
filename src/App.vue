<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header>
      <RouterLink to="/">VMFlow</RouterLink>
      <nav aria-label="Main Navigation">
        <RouterLink to="/">Dashboard</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
