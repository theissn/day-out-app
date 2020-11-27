<template>
  <div class="max-w-lg mx-auto">
    <div class="bg-image h-screen bg-cover">
      <div class="pt-16 text-center uppercase">
        <div class="text-3xl text-white pb-8 font-hand">
          Build the perfect day out!
        </div>

        <div class="text-3xl text-white -mb-2">Set your budget</div>
        <div class="font-hand text-3xl text-white">Let the button decide</div>
        <div class="mt-8">
          <div class="text-center text-xl font-light text-white font-money">
            £ {{ price }}
          </div>
          <div class="mx-auto w-56">
            <vue-slider
              v-model="price"
              :min="50"
              :max="350"
              :interval="10"
              :dot-style="{
                border: 'none',
              }"
              :process-style="{
                backgroundColor: 'rgba(252, 129, 129, var(--bg-opacity))',
              }"
              tooltip="none"
            ></vue-slider>
          </div>
        </div>
        <nuxt-link
          :to="{ path: 'search', query: { budget: price } }"
          class="rounded-full bg-red-400 h-24 w-24 flex items-center justify-center font-hand text-white text-3xl mx-auto mt-8"
        >
          Go
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      price: 200,
    }
  },
}
</script>

<style scoped>
.bg-image {
  background-image: url('https://images.unsplash.com/photo-1531012451721-432c0ae74527?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80');
}
</style>
