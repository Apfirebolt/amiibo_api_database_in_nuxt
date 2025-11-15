<template>
  <footer>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 px-4 bg-gray-800 text-white">
      <div class="text-center md:text-left">
        <h3 class="font-bold text-lg mb-2">Amiibo Database</h3>
        <p class="text-sm text-gray-300">
          Explore the complete collection of Nintendo Amiibo figures. Browse, search, and discover detailed information about all your favorite characters.
        </p>
      </div>
      <div class="text-center">
        <h3 class="font-bold text-lg mb-2">Powered By</h3>
        <p class="text-sm text-gray-300">
          Built with Nuxt.js and the AmiiboAPI, providing up-to-date information on all Amiibo releases, series, and game compatibility.
        </p>
      </div>
      <div class="text-center md:text-right">
        <p class="text-sm text-gray-300 mb-2">
          &copy; {{ CURRENT_YEAR }} Amiibo Database
        </p>
        <p class="text-xs text-gray-400">
          All Amiibo characters and trademarks are property of Nintendo.
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="bg-gray-900 text-white text-center py-2">
        <a href="https://amiiboapi.com/" target="_blank" rel="noopener noreferrer" class="text-sm hover:underline">
          AmiiboAPI
        </a>
      </div>
      <div class="bg-gray-900 text-white text-center py-2">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="text-sm hover:underline">
          Nuxt.js
        </a>
      </div>

    </div>
  </footer>
</template>
<script setup>
//props
const CURRENT_YEAR = new Date().getFullYear();
</script>
