<template>
  <div style="padding: 20px; background: #fbfbfb; height: 100%">
    <div class="mt-12 sm:mt-0">
      <div class="md:grid md:grid-cols-6 md:gap-6">

        <div class="md:col-span-3">
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
            <p class="mt-1 text-sm text-gray-600">Use a permanent address where you can receive
              mail.</p>
          </div>
        </div>

        <div class="mt-5 md:col-span-3 md:mt-0">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-12 sm:col-span-12">
                  <label for="first-name"
                         class="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                    <input type="text" v-model="person.firstName" name="first-name" id="first-name"
                           autocomplete="given-name"
                           class="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </label>
                </div>

                <div class="col-span-12 sm:col-span-12">
                  <label for="last-name"
                         class="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                    <input type="text" name="last-name" v-model="person.lastName" id="last-name"
                           autocomplete="family-name"
                           class="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </label>
                </div>

                <div class="col-span-12 sm:col-span-12">
                  <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country
                    <select id="country" name="country" autocomplete="country-name"
                            v-model="person.country"
                            class="mt-2 block w-full rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>Turkey</option>
                      <option>Germany</option>
                    </select>
                  </label>
                </div>

                <div class="col-span-12 sm:col-span-12">
                  <label for="street-address"
                         class="block text-sm font-medium leading-6 text-gray-900">Street
                    address
                    <input type="text" name="street-address" id="street-address"
                           v-model="person.streetAddress"
                           autocomplete="street-address"
                           class="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </label>
                </div>

                <div class="col-span-12 sm:col-span-12">
                  <label for="city"
                         class="block text-sm font-medium leading-6 text-gray-900">City
                    <input type="text" name="city" id="city" autocomplete="address-level2"
                           v-model="person.city"
                           class="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </label>
                </div>

                <div class="col-span-12 sm:col-span-12">
                  <label for="region" class="block text-sm font-medium leading-6 text-gray-900">
                    House Number
                    <input type="text" name="region" id="region" autocomplete="address-level1"
                           v-model="person.houseNumber"
                           class="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </label>
                </div>

                <div class="col-span-12 sm:col-span-12">
                  <label for="#postal-code"
                         class="block text-sm font-medium leading-6 text-gray-900">
                    ZIP
                    <input type="text" name="postal-code" id="postal-code" v-model="person.zip"
                           autocomplete="postal-code"
                           class="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </label>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit" @click="savePerson()"
                      class="button-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onBeforeMount, ref } from "vue";
import { Person } from "@/person";
import { createPerson, getPerson, updatePerson } from "@/person/service/person.service";
import router, { currentRoute } from "@/core/router";
import { loadingStore, personStore } from "@/core/store";

const person = ref({} as Person);

const loading = loadingStore();

const personStoreItem = personStore();

const id = currentRoute.value.params.id as string;

const savePerson = async () => {
  loading.setLoading(true);
  const response = id ? await updatePerson(person.value) : await createPerson(person.value);
  if (response) {
    personStoreItem.setUpdate(1);
    await router.push("/person-list");
  }
  loading.setLoading(false);
};

onBeforeMount(async () => {
  if (id) {
    loading.setLoading(true);
    // eslint-disable-next-line no-undef
    const response = await getPerson(id);
    person.value = response || {};
    loading.setLoading(false);
  }
});

</script>

<style scoped>

</style>
