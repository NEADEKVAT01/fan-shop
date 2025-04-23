<template>
  <!-- Product swiper section showing viewed items -->
  <div class="product-swiper">
    <!-- Header with title and navigation controls -->
    <div class="product-swiper__header">
      <h2 class="product-swiper__title">Просмотренные товары</h2>
      <div class="product-swiper__nav-buttons">
        <!-- Previous button -->
        <button 
          class="product-swiper__nav-button" 
          @click="swiper.prev(), catalog.changeSwiperPage(-1, totalPages)"
        >
          <img src="public\Vector-1.svg" class="product-swiper__nav-icon">
        </button>
        
        <!-- Page counter -->
        <div class="product-swiper__counter">
          {{ catalog.activeSwiperPage }} 
          <span class="product-swiper__counter-total">/ {{ totalPages }}</span>
        </div>
        
        <!-- Next button -->
        <button 
          class="product-swiper__nav-button" 
          @click="swiper.next(), catalog.changeSwiperPage(1, totalPages)"
        >
          <img src="public\Vector-2.svg" class="product-swiper__nav-icon">
        </button>
      </div>
    </div>

    <!-- Swiper container with items -->
    <ClientOnly>
      <swiper-container
        ref="containerRef"
        :slides-per-view="slidesPerGroup"
        :slides-per-group="slidesPerView"
        :space-between="0"
        :allow-touch-move="false"
        class="product-swiper__container"
      >
        <swiper-slide v-for="item in catalog.items" :key="item.id">
          <ItemCard :items="item" :euroRate="catalog.euro_ex_rate"/>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/Catalog.css'

// Store and component references
const catalog = useCatalogStore()
const containerRef = ref(null)
const swiper = useSwiper(containerRef, {})

// Swiper configuration
const slidesPerGroup = 4
const slidesPerView = 4
const totalPages = computed(() => Math.ceil(catalog.items.length / slidesPerGroup))

// Fetch items on component mount
catalog.fetchItems()
</script>