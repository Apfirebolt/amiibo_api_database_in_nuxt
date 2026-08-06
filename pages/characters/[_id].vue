<template>
  <NuxtLayout name="default">
    <div class="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        
        <!-- Back Navigation Button -->
        <div class="mb-6">
          <NuxtLink 
            to="/characters" 
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-primary transition-colors"
          >
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Characters
          </NuxtLink>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
          <Loader />
          <p class="mt-4 text-sm text-slate-500 font-medium">Fetching character details...</p>
        </div>

        <!-- Character Details Card -->
        <div v-else-if="character && character.length" class="space-y-8">
          <div 
            v-for="item in character" 
            :key="item.head"
            class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0"
            data-aos="fade-up"
          >
            <!-- Hero Image Preview Container -->
            <div class="md:col-span-5 bg-gradient-to-br from-slate-100 to-slate-200/50 p-8 flex items-center justify-center min-h-[320px] relative">
              <span 
                v-if="item.type" 
                class="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm border border-slate-200/50 capitalize"
              >
                {{ item.type }}
              </span>
              <img
                :src="item.image"
                :alt="item.name"
                class="w-auto h-64 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Content Details Container -->
            <div class="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <!-- Header & Name -->
                <div class="border-b border-slate-100 pb-4 mb-6">
                  <h1 class="text-3xl font-extrabold text-secondary tracking-tight">
                    {{ item.name }}
                  </h1>
                  <p class="text-sm font-medium text-slate-500 mt-1">
                    Game Series: <span class="text-slate-800 font-semibold">{{ item.gameSeries || 'N/A' }}</span>
                  </p>
                </div>

                <!-- Meta Badges / Info Grid -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="block text-xs font-medium text-slate-400 uppercase tracking-wider">Amiibo Series</span>
                    <span class="block mt-1 text-sm font-semibold text-slate-800">{{ item.amiiboSeries || 'N/A' }}</span>
                  </div>
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="block text-xs font-medium text-slate-400 uppercase tracking-wider">Item Type</span>
                    <span class="block mt-1 text-sm font-semibold text-slate-800 capitalize">{{ item.type || 'N/A' }}</span>
                  </div>
                </div>

                <!-- Regional Release Dates -->
                <div>
                  <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Regional Release Dates
                  </h3>
                  
                  <div v-if="item.release" class="grid grid-cols-2 gap-2 text-sm">
                    <div v-if="item.release.jp" class="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                      <span class="text-slate-600 font-medium">🇯🇵 Japan</span>
                      <span class="font-mono text-xs font-semibold text-slate-800">{{ item.release.jp }}</span>
                    </div>
                    <div v-if="item.release.na" class="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                      <span class="text-slate-600 font-medium">🇺🇸 N. America</span>
                      <span class="font-mono text-xs font-semibold text-slate-800">{{ item.release.na }}</span>
                    </div>
                    <div v-if="item.release.eu" class="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                      <span class="text-slate-600 font-medium">🇪🇺 Europe</span>
                      <span class="font-mono text-xs font-semibold text-slate-800">{{ item.release.eu }}</span>
                    </div>
                    <div v-if="item.release.au" class="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                      <span class="text-slate-600 font-medium">🇦🇺 Australia</span>
                      <span class="font-mono text-xs font-semibold text-slate-800">{{ item.release.au }}</span>
                    </div>
                  </div>
                  <p v-else class="text-sm text-slate-400 italic">No release date information available.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p class="text-slate-500 font-medium">Character details could not be found.</p>
          <NuxtLink to="/characters" class="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90 transition-opacity">
            Return to Directory
          </NuxtLink>
        </div>

      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import useAmiiboCharacters from "@/composables/useAmiiboCharacter";


const { character, fetchCharacter, loading } = useAmiiboCharacters();

definePageMeta({
  layout: "dashboard",
  title: "Character Detail",
  description: "Character detail page of the Amiibo Database App in Nuxt",
});

const route = useRoute();

onMounted(async () => {
  const characterId = route.params._id;
  await fetchCharacter(characterId);
});
</script>