<template>
  <!-- Main cart component -->
  <div class="cart">
    <!-- Cart items section -->
    <div class="cart__items">
      <div class="cart__header">
        <h1 class="cart__title">Ваша корзина</h1>
        <span class="cart__count">
          {{ cart.quantity_sum }} {{ getDeclension(cart.quantity_sum) }}
        </span>
        <button class="cart__clear-button" @click="cart.deleteCart()">
          Очистить корзину
        </button>
      </div>
      
      <!-- Empty cart message -->
      <div class="cart__empty" v-if="cart.items.length == 0">
        {{ cart.cartMassage }}
      </div>
      
      <!-- Cart items list -->
      <div 
        v-for="(item, index) in cart.items" 
        :key="index" 
        class="cart__item"
      >
        <div>
          <img :src="item.img_url" class="cart__item-image">
        </div>
        
        <div class="cart__item-info">
          <!-- Item details -->
          <div class="cart__item-details">
            <p class="cart__item-name">{{ item.name }}</p>
            <p class="cart__item-description">{{ item.description }}</p>
            <p class="cart__item-article">Артикул: {{ item.article }}</p>
          </div>
          
          <!-- Quantity controls -->
          <div class="cart__item-quantity">
            <div class="cart__quantity-controls">
              <button 
                class="cart__quantity-btn" 
                @click="cart.updateQuantity(index, -1)"
              >
                <img src="public\minus.svg" alt="Decrease quantity">
              </button>
              <span class="cart__quantity-value">{{ item.quantity }}</span>
              <button 
                class="cart__quantity-btn" 
                @click="cart.updateQuantity(index, 1)"
              >
                <img src="public\plus.svg" alt="Increase quantity">
              </button>
            </div>
            <p class="cart__item-price">{{ formatNumber(item.item_price) }} ₽/шт.</p>
          </div>
          
          <!-- Item total price -->
          <div class="cart__item-total">
            <p>{{ formatNumber(item.item_price * item.quantity)}} ₽</p>
          </div>
          
          <!-- Remove item button -->
          <button 
            class="cart__item-remove" 
            @click="cart.removeItem(index)"
          >
            <img src="public\Group 455.svg" alt="Remove item">
          </button>
        </div>
      </div>
      
      <!-- Installation option -->
      <div class="cart__installment-section">
        <input 
          type="checkbox" 
          id="install" 
          v-model="cart.installment" 
          class="cart__installment-checkbox"
        >
        <img 
          src="public\install.png" 
          class="cart__installment-icon" 
          alt="Installation icon"
        >
        <div class="cart__installment-content">
          <span class="cart__installment-title">Установка</span>
          <span class="cart__installment-description">
            Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.
          </span>
        </div>
      </div>
    </div>
    
    <!-- Order summary -->
    <div class="cart__summary">
      <h2 class="cart__summary-title">Итого</h2>
      
      <!-- Summary rows -->
      <div class="cart__summary-row">
        <span class="cart__summary-label">Сумма заказа</span>
        <span class="cart__summary-value">{{ formatNumber(cart.order_sum) }} ₽</span>
      </div>
      <div class="cart__summary-row">
        <span class="cart__summary-label">Количество</span>
        <span class="cart__summary-value">{{ cart.quantity_sum }} шт</span>
      </div>
      <div class="cart__summary-row">
        <span class="cart__summary-label">Установка</span>
        <span class="cart__summary-value" v-if="cart.installment">Да</span>
        <span class="cart__summary-value" v-else>Нет</span>
      </div>
      
      <!-- Total row -->
      <div class="cart__summary-row-total">
        <span class="cart__summary-label">Стоимость товаров</span>
        <span class="cart__summary-value">{{ formatNumber(cart.order_sum) }} ₽</span>
      </div>
      
      <!-- Action buttons -->
      <button class="cart__checkout-button" @click="cart.sendOrder()">
        Оформить заказ
      </button>
      <button class="cart__quickbuy-button" @click="cart.sendOrder()">
        Купить в 1 клик
      </button>
    </div>
  </div>
</template>

<script setup>
import '~/assets/css/Cart.css'
import { useCartStore } from '~/stores/cart.store'

// Store and utility functions
const cart = useCartStore()
const { formatNumber } = useFormatNumber()
const { getDeclension } = useDeclension()
</script>