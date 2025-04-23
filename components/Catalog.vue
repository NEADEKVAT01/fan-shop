<template>
  <div class="product-swiper">
    <div class="product-swiper__header">
      <h2 class="product-swiper__title">Просмотренные товары</h2>
      <div class="product-swiper__nav-buttons">
        <button class="product-swiper__nav-button" @click="swiper.prev(),catalog.changeSwiperPage(-1, totalPages)">
          <img src="public\Vector-1.svg" class="product-swiper__nav-icon">
        </button>
        <div class="product-swiper__counter">{{ catalog.activeSwiperPage }} <span class="product-swiper__counter-total">/ {{ totalPages }}</span></div>
        <button class="product-swiper__nav-button" @click="swiper.next(),catalog.changeSwiperPage(1, totalPages)">
          <img src="public\Vector-2.svg" class="product-swiper__nav-icon">
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
      class="product-swiper__container">
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