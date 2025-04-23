<template>
  <div class="modal__overlay" @click="catalog.itemClicked.isClicked=false" v-if="catalog.itemClicked.isClicked">
    <div class="modal__container" @click.stop>
      <div class="modal__image-container"><img :src="catalog.itemClicked.item.img_url" alt=""></div>
      <div class="modal__info-container">
        <p>{{catalog.itemClicked.item.name}}</p>
        <p>{{catalog.itemClicked.item.description}}</p>
        <p>{{catalog.itemClicked.item.tech_info}}</p>
        <p>Артикул: {{catalog.itemClicked.item.article}}</p>
        <p>{{ formatNumber(Math.floor(catalog.itemClicked.item.min_price_eur * catalog.euro_ex_rate)) }} 
          - 
          {{ formatNumber(Math.floor(catalog.itemClicked.item.max_price_eur * catalog.euro_ex_rate)) }} ₽
        </p>
        <p>{{ catalog.itemClicked.item.min_price_eur }} - {{ catalog.itemClicked.item.max_price_eur }} €</p>
        <button class="modal__button modal__button--base"
        @click="catalog.addToCart(catalog.itemClicked.item, Math.floor(catalog.itemClicked.item.min_price_eur * catalog.euro_ex_rate)), 
        catalog.itemClicked.isClicked=false">
          <p>Добавить в корзину</p>
          <p>Базовая комлектация</p>
          <p>{{ formatNumber(Math.floor(catalog.itemClicked.item.min_price_eur * catalog.euro_ex_rate)) }} ₽</p>
        </button>
        <button class="modal__button modal__button--premium" @click="catalog.addToCart(catalog.itemClicked.item, Math.floor(catalog.itemClicked.item.max_price_eur * catalog.euro_ex_rate)), 
        catalog.itemClicked.isClicked=false">
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
const catalog = useCatalogStore()
const { formatNumber } = useFormatNumber()
</script>