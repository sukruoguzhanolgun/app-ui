<template>
  <div class="box flex-column">
    <div class="display-flex-row">
      <div class="display-flex-column">
        <strong>Contacts</strong>
        <p>A list of contacts in application including their full name, country, city.</p>
      </div>
      <button class="button-primary m-r-10" @click="router.push('/person/create')">Create</button>
    </div>
    <div class="m-t-10">
      <table>
        <thead>
        <tr>
          <th scope="col">Full Name</th>
          <th scope="col">Country</th>
          <th scope="col">City</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="contact in persons" :key="contact.id">
          <td data-label="Full Name">{{ `${contact.firstName} ${contact.lastName}` }}</td>
          <td data-label="Country">{{ contact.country }}</td>
          <td data-label="City">{{ contact.city }}</td>
          <td data-label="Actions">
            <button class="button-primary m-r-10"
                    @click="router.push(`/person/edit/${contact.id}`)">
              Edit
            </button>
            <button class="button-secondary" @click="deletePersonById(contact.id)">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

import router from "@/core/router";
import { onMounted } from "vue";
import { deletePersonById, getPersonList } from "@/person/service/person.service";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storeToRefs } from "pinia";
import { loadingStore, personStore } from "@/core/store";

const store = personStore();

const loading = loadingStore();

const { persons } = storeToRefs(store);

onMounted(async () => {
  loading.setLoading(true);

  if (persons.value.length === 0 || store.updateList !== 0) {
    const response = await getPersonList(undefined, undefined);
    store.setPersons(response || []);
    store.setUpdate(0);
  }

  loading.setLoading(false);
});
</script>
