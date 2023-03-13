<template>
  <div class="wh-100 flex-fill">
    <AppHeader></AppHeader>
    <div class="wh-100">
      <router-view/>
    </div>
    <div class="loader-position" v-if="loading">
      <span class="loader">
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/core/layout/AppHeader.vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storeToRefs } from "pinia";
import { loadingStore } from "@/core/store";

const store = loadingStore();

const { loading } = storeToRefs(store);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
