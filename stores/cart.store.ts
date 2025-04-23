import { defineStore } from 'pinia'

interface CartItem {
  id: number;
  name: string;
  model_name: string;
  article: string;
  tech_info: string;
  description: string;
  item_price: number;
  quantity: number;
  img_url: string; 
}

export const useCartStore = defineStore('cart', {
  state: () => {
    return ({
            items: [] as CartItem[],
            installment : false,
            timestamp: "",
            cartMassage: "К сожалению вы еще не добавили товары в корзину :-("
        }
    )
  },
  getters: {
    order_sum(state) {
      return state.items.reduce((total: any, item: any) => {
        return total + (item.item_price * item.quantity)
      }, 0)
    },
    quantity_sum(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  actions: {
    removeItem(id: number) {
      this.items.splice(id, 1)
    },
    updateQuantity(id:number ,amount: number) {
      this.items[id].quantity += amount
      if (this.items[id].quantity <= 0) {
        this.removeItem(id)
      }
    },
    deleteCart() {
      this.items.length = 0
    },
    async sendOrder () {
      if (this.items.length > 0) {
      this.cartMassage = "Спасибо за заказ, в ближайшее время мы с вами свяжемся по поводу деталей заказа"
      this.timestamp = new Date().toISOString()
      const { data, error } = await useFetch('/api/orders', {
        method: 'POST',
        body: {
          items: this.items,
          timestamp: this.timestamp,
          installment: this.installment
        }
      })
    
      if (error.value) {
        console.error('Error saving data:', error.value)
      } else {
        console.log('Data saved successfully:', data.value)
      }
    }
      
      this.items.length=0
    }
}})