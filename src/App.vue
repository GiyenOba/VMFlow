<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header>
      <RouterLink to="/">VMFlow</RouterLink>
      <nav aria-label="Main navigation">
        <nav aria-label="Main navigation">
          <RouterLink to="/">Dashboard</RouterLink>
          <RouterLink to="/bookings">Bookings</RouterLink>
          <RouterLink to="/bookings/new">New Booking</RouterLink>
        </nav>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
