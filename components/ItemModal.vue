<template>
  <!-- Modal overlay - closes modal when clicked -->
  <div 
    class="modal__overlay" 
    @click="catalog.itemClicked.isClicked = false" 
    v-if="catalog.itemClicked.isClicked"
  >
    <!-- Modal container - stops click propagation -->
    <div class="modal__container" @click.stop>
      <!-- Product image -->
      <div class="modal__image-container">
        <img :src="catalog.itemClicked.item.img_url" alt="Product image">
      </div>
      
      <!-- Product information -->
      <div class="modal__info-container">
        <p>{{ catalog.itemClicked.item.name }}</p>
        <p>{{ catalog.itemClicked.item.description }}</p>
        <p>{{ catalog.itemClicked.item.tech_info }}</p>
        <p>Артикул: {{ catalog.itemClicked.item.article }}</p>
        
        <!-- Price information -->
        <p>
          {{ formatNumber(Math.floor(catalog.itemClicked.item.min_price_eur * catalog.euro_ex_rate)) }} - 
          {{ formatNumber(Math.floor(catalog.itemClicked.item.max_price_eur * catalog.euro_ex_rate)) }} ₽
        </p>
        <p>{{ catalog.itemClicked.item.min_price_eur }} - {{ catalog.itemClicked.item.max_price_eur }} €</p>
        
        <!-- Add to cart buttons -->
        <button 
          class="modal__button modal__button--base"
          @click="addToCart('min')"
        >
          <p>Добавить в корзину</p>
          <p>Базовая комлектация</p>
          <p>{{ formatNumber(Math.floor(catalog.itemClicked.item.min_price_eur * catalog.euro_ex_rate)) }} ₽</p>
        </button>
        
        <button 
          class="modal__button modal__button--premium" 
          @click="addToCart('max')"
        >
          <p>Добавить в корзину</p>
          <p>Полная комлектация</p>
          <p>{{ formatNumber(Math.floor(catalog.itemClicked.item.max_price_eur * catalog.euro_ex_rate)) }} ₽</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CatalogItem } from '~/stores/catalog.store'
import '~/assets/css/ItemModal.css'

// Store and utilities
const catalog = useCatalogStore()
const { formatNumber } = useFormatNumber()

/**
 * Adds item to cart with specified price configuration
 * @param priceType - 'min' for base configuration, 'max' for premium
 */
const addToCart = (priceType: 'min' | 'max') => {
  const price = priceType === 'min' 
    ? Math.floor(catalog.itemClicked.item.min_price_eur * catalog.euro_ex_rate)
    : Math.floor(catalog.itemClicked.item.max_price_eur * catalog.euro_ex_rate)
  
  catalog.addToCart(catalog.itemClicked.item, price)
  catalog.itemClicked.isClicked = false
}
</script>