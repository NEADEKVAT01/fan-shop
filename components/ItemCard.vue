<template>
  <!-- Single product card component -->
  <div class="item-card">
    <!-- Product image -->
    <img 
      :src="props.items.img_url" 
      :alt="items.name" 
      class="item-card__image"
    >
    
    <!-- Product name -->
    <h3 class="item-card__name">{{ items.model_name }}</h3>
    
    <!-- Product description -->
    <p class="item-card__description">{{ props.items.description }}</p>
    
    <!-- Price information -->
    <div class="item-card__prices">
      <p class="item-card__price item-card__price--rub">
        {{ formatNumber(Math.floor(props.items.min_price_eur * euroRate)) }} - 
        {{ formatNumber(Math.floor(props.items.max_price_eur * euroRate)) }} ₽
      </p>
      <p class="item-card__price item-card__price--eur">
        {{ props.items.min_price_eur }} - {{ props.items.max_price_eur }} €
      </p>
    </div>
    
    <!-- Details button -->
    <button 
      class="item-card__button" 
      @click="catalog.itemClicked.item = props.items, catalog.itemClicked.isClicked = true"
    >
      Подробнее
    </button>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/ItemCard.css'
import type { CatalogItem } from '~/stores/catalog.store'

// Props definition
const props = defineProps({
  items: {
    type: Object as PropType<CatalogItem>,
    required: true
  },
  euroRate: {
    type: Number,
    default: 82.5
  }
})

// Store and utilities
const catalog = useCatalogStore()
const { formatNumber } = useFormatNumber()
const isClicked = ref(false)
</script>
