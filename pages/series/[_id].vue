<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-6 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
          Series Detail
        </h2>
        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
        <div
              v-for="item in series"
              :key="item.id"
              class="bg-white shadow-md rounded-lg p-4"
            >
              <img
                :src="item.image"
                alt="Amiibo Image"
                class="w-64 h-48 object-cover rounded-t-lg"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ item.name }}
                </h3>
                <p class="text-gray-600">Character: {{ item.character }}</p>
                <p class="text-gray-600">Game Series: {{ item.gameSeries }}</p>
                <p class="text-gray-600">Type: {{ item.type }}</p>
                <p class="text-gray-600">
                  Release Date (NA): {{ item.release.na }}
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import useAmiiboSeries from "../composables/useAmiiboSeries";
const { series, fetchSeries, loading } = useAmiiboSeries();

// definePageMeta
definePageMeta({
  layout: "dashboard",
  title: "Series Detail",
  description: "Series detail page of the Amiibo Database App in Nuxt",
});

const route = useRoute();

// onMounted
onMounted(async () => {
  const seriesId = route.params._id;
  await fetchSeries(seriesId);
});
</script>
