<template>
  <div>
    <ClientOnly>
      <p class="text-red-500 my-3">
        This text is only rendered on the client side.
      </p>
    </ClientOnly>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("This function runs only on the client side.");
});
</script>
