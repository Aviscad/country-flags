<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
//import MainContent from './components/MainContent.vue'
</script>

<template>
  <HeaderComponent />
  <!-- <MainContent /> -->
  <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
  <RouterView />
</template>

<style scoped>
</style>
