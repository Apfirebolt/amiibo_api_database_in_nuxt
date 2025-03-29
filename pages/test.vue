<template>
  <ClientOnly>
    <!-- <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form> -->
    <swiper-container ref="containerRef" :init="false">

      <swiper-slide>
        <div class="bg-blue-500 text-white max-w-lg p-4 rounded-lg">
          <h2>Header 1</h2>
          <p>Content for slide 1</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-green-500 text-white max-w-lg p-4 rounded-lg">
          <h2>Header 2</h2>
          <p>Content for slide 2</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-orange-500 text-white max-w-lg p-4 rounded-lg">
          <h2>Header 3</h2>
          <p>Content for slide 3</p>
        </div>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
<script setup>
import { ref, onMounted } from "vue";


onMounted(() => {
  console.log(swiper.instance)
})
// definePageMeta
definePageMeta({
  layout: "default",
  title: "test",
  description: "A test page in Nuxt",
});

const containerRef = ref(null)
const slides = ref(Array.from({ length: 5 }))
const swiper = useSwiper(containerRef, {
  effect: 'creative',
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    clickable: true,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
})

const myCookie = useCookie('my-cookie')
myCookie.value = 'cookie-value'
const username = ref('')
const password = ref('')

const userLogin = async () => {
  try {
    console.log('Using custom strategy')
    const response = await $auth.loginWith('customStrategy', {
      data: {
        username: username.value,
        password: password.value
      }
    })
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

</script>

<style lang="css">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>