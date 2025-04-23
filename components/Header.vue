<script setup>
import '~/assets/css/Header.css'
const cart = useCartStore()
const { formatNumber } = useFormatNumber()
const { getDeclension } = useDeclension();
</script>

<template>
  <div class="header">
    <div class="header__info"></div>
    <div class="header__nav">
      <div class="header_nav-buttons"></div>
      <div class="header__nav-cart">
        <img class="header__cart-icon" src="public\Cart.svg"/>
        <div class="header__nav-cart-text">
          <span class="header__cart-title">Ваша корзина</span>
          <div class="header__cart-info" v-if="cart.items.length > 0">
            <p class="header__cart-quantity">{{ cart.quantity_sum }} {{ getDeclension(cart.quantity_sum) }}</p>
            <p class="header__cart-sum">{{ formatNumber(cart.order_sum) }} ₽</p>
          </div>
          <span class="header__cart-empty" v-if="cart.items.length == 0">Нет товаров</span>
        </div>
      </div>
    </div>
  </div>
</template>

