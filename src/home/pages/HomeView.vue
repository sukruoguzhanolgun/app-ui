<template>
  <div class="home">
    <strong class="font-48">Person App</strong>
    <h4 class="m-t-10">Create your persons and start giving orders.</h4>
    <button class="button-primary m-t-10" @click="router.push('/person/create')">Get started</button>
  </div>
</template>

<script lang="ts" setup>
import router from "@/core/router"; </script>
