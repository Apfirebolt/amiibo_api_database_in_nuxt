<template>
  <Disclosure
    as="nav"
    class="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-neutral-100 shadow-lg"
    v-slot="{ open }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-roboto">
      <div class="relative flex items-center justify-between h-20">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2.5 rounded-lg text-green-200 hover:text-white hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          >
            <span class="sr-only">Open main menu</span>
            <ViewfinderCircleIcon
              v-if="!open"
              class="block h-7 w-7"
              aria-hidden="true"
            />
            <LockClosedIcon v-else class="block h-7 w-7" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center gap-3">
            <img
              :src="logo"
              alt="Logo"
              class="block w-12 h-12 rounded-full ring-2 ring-white/30 shadow-md hover:ring-white/60 transition-all duration-300"
            />
            <span class="hidden md:block text-xl font-bold text-white"
              >Amiibo Database</span
            >
          </div>
          <div class="hidden sm:flex sm:ml-10 items-center">
            <div class="flex space-x-2">
              <nuxt-link
                v-for="item in navigation"
                :key="item.name"
                :to="{ name: item.name }"
                class="text-base px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                :class="[
                  item.current
                    ? 'bg-white/20 text-white shadow-md backdrop-blur-sm'
                    : 'text-green-100 hover:bg-white/10 hover:text-white hover:shadow-md',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.path }}</nuxt-link
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="bg-green-700 hover:bg-green-600 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white transition-all duration-300 p-2 shadow-md"
              >
                <span class="sr-only">Open user menu</span>
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </MenuButton>
            </div>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden bg-green-900/50 backdrop-blur-md">
      <div class="px-4 pt-3 pb-4 space-y-2">
        <nuxt-link
          v-for="item in navigation"
          :key="item.name"
          :to="{ name: item.name }"
          class="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
          :class="[
            item.current
              ? 'bg-white/20 text-white shadow-md'
              : 'text-green-100 hover:bg-white/10 hover:text-white hover:shadow-md',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.path }}</nuxt-link
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { useRouter } from "vue-router";
import logo from "../assets/1.png";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

import { LockClosedIcon, ViewfinderCircleIcon } from "@heroicons/vue/20/solid";

const navigation = [
  { name: "about", path: "About", current: false },
  { name: "games", path: "Games", current: false },
  { name: "series", path: "Series", current: false },
  { name: "characters", path: "Characters", current: false },
  { name: "index", path: "Home", current: false },
];

const router = useRouter();
</script>
