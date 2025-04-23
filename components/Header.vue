<template>
  <!-- Main header component -->
  <div class="header">
    <div class="header__info"></div> <!-- Reserved for future header info -->
    
    <!-- Navigation section -->
    <div class="header__nav">
      <div class="header__buttons"></div> <!-- Reserved for navigation buttons -->
      
      <!-- Cart section -->
      <div class="header__cart">
        <img class="header__cart-icon" src="public\Cart.svg" alt="Cart icon"/>
        
        <div class="header__cart-text">
          <span class="header__cart-title">Ваша корзина</span>
          
          <!-- Show cart info if items exist -->
          <div class="header__cart-info" v-if="cart.items.length > 0">
            <p class="header__cart-quantity">
              {{ cart.quantity_sum }} {{ getDeclension(cart.quantity_sum) }}
            </p>
            <p class="header__cart-sum">{{ formatNumber(cart.order_sum) }} ₽</p>
          </div>
          
          <!-- Show empty message if no items -->
          <span class="header__cart-empty" v-if="cart.items.length == 0">
            Нет товаров
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '~/assets/css/Header.css'
import { useCartStore } from '~/stores/cart.store'

// Store and utility functions
const cart = useCartStore()
const { formatNumber } = useFormatNumber()
const { getDeclension } = useDeclension()
</script>

