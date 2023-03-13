<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden"
                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                 alt="Your Company"/>
            <img class="hidden h-8 w-auto lg:block"
                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                 alt="Your Company"/>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navItems" :key="item.name" @keydown.esc="router.push('/')"
                 @click="goToPage(item.to)"
                 :class="[currentRoute.name === item.routeName ? 'bg-gray-900 text-white'
                 : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                 :aria-current="currentRoute.name === item.name ? 'page' : undefined">
                {{
                  item.name
                }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton v-for="item in navItems" :key="item.name" as="a"
                          @keydown.esc="router.push('/')"
                          @click="goToPage(item.to)"
                          :class="[currentRoute.name === item.routeName ?
                          'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                           'block rounded-md px-3 py-2 text-base font-medium']"
                          :aria-current="currentRoute.name === item.routeName ? 'page' : undefined">
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { navItems } from "@/core/layout/navigation";
import router, { currentRoute } from "@/core/router";

async function goToPage(to: string) {
  await router.push(to);
}

</script>
