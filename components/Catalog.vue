<template>
  <div class="product-swiper">
    <div class="header">
      <h2>Просмотренные товары</h2>
      <div class="navigation">
        
        <button @click="swiper.prev(),catalog.changeSwiperPage(-1, totalPages)">
          <img src="public\Vector-1.svg" class="nav-icon">
        </button>
        <div class="counter">{{ catalog.activeSwiperPage }} <span class="counter-total">/ {{ totalPages }}</span></div>
        <button @click="swiper.next(),catalog.changeSwiperPage(1, totalPages)">
          <img src="public\Vector-2.svg" class="nav-icon">
        </button>
      </div>
    </div>
    <ClientOnly>
      <swiper-container
      ref="containerRef"
      :slides-per-view="slidesPerGroup"
      :slides-per-group="slidesPerView"
      :space-between="0"
      :allow-touch-move="false"
      class="swiper-container">
        <swiper-slide v-for="item in catalog.items" :key="item.id">
          <ItemCard :items="item" :euroRate="catalog.euro_ex_rate"/>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/Catalog.css'
const catalog = useCatalogStore()
catalog.fetchItems()
const containerRef = ref(null)
const swiper = useSwiper(containerRef, {
  
})
const slidesPerGroup = 4
const slidesPerView = 4
const totalPages = computed(() => Math.ceil(catalog.items.length / slidesPerGroup))


</script>