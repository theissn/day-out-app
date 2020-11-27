<template>
  <div class="flex flex-col h-screen">
    <div
      class="bg-1 flex-1 bg-cover relative"
      :style="{ backgroundImage: `url(${activity.image})` }"
    >
      <div class="p-4">
        <div class="text-white font-hand text-4xl">{{ activity.title }}</div>
        <div class="text-white font-hand text-2xl">
          {{ activity.price !== 'Free' ? '£' : '' }} {{ activity.price }}
        </div>
      </div>
      <a
        :href="activity.link"
        target="_blank"
        class="rounded-full uppercase bg-red-400 h-16 w-16 flex items-center justify-center font-hand text-white text-lg absolute right-0 bottom-0 mr-4 mb-4"
      >
        Book
      </a>
    </div>
    <div
      class="flex-1 bg-cover relative"
      :style="{ backgroundImage: `url(${restaurantImage})` }"
    >
      <div class="p-4">
        <div class="text-white font-hand text-4xl">
          {{ restaurant.name }}
        </div>
        <div class="text-white font-hand text-2xl">
          £ {{ restaurant.average_cost_for_two }} (avg for 2 ppl)
        </div>
        <a
          :href="restaurant.menu_url"
          target="_blank"
          class="rounded-full uppercase bg-red-400 h-16 w-16 flex items-center justify-center font-hand text-white text-lg absolute right-0 bottom-0 mr-4 mb-4"
        >
          Book
        </a>
      </div>
    </div>
    <div class="bg-3 flex-1 bg-cover relative">
      <div class="p-4">
        <div class="text-white font-hand text-4xl">{{ show.name }}</div>
        <div class="text-white font-hand text-2xl">
          From £{{ show.offers.price * 2 }} (for 2 ppl)
        </div>
        <a
          :href="show.offers.url"
          target="_blank"
          class="rounded-full uppercase bg-red-400 h-16 w-16 flex items-center justify-center font-hand text-white text-lg absolute right-0 bottom-0 mr-4 mb-4"
        >
          Book
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ $axios, route }) {
    return $axios
      .get(`http://localhost:8888/api/index?budget=${route.query.budget}`)
      .then((res) => res.data)
  },
  computed: {
    restaurantImage() {
      return this.restaurant.featured_image
        ? this.restaurant.featured_image
        : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
  },
}
</script>

<style>
.bg-1 {
  background-image: url('https://images.unsplash.com/photo-1514729797186-944d57303199?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
}
.bg-2 {
  background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
}
.bg-3 {
  background-image: url('https://images.unsplash.com/photo-1545129139-1beb780cf337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80');
}
</style>
