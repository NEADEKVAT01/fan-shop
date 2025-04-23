import { defineStore } from 'pinia'
import { useCartStore } from './cart.store'

export interface CatalogItem {
  id: number;
  name: string;
  model_name: string;
  article: string;
  tech_info: string;
  description: string;
  min_price_eur: number;
  max_price_eur: number;
  img_url: string;
}

export const useCatalogStore = defineStore('catalog', {
  state: () => {
    return ({
            items: [] as CatalogItem[],
            loading: false,
            error: null,
            euro_ex_rate: 82.5,
            activeSwiperPage: 1,
            itemClicked: {
              item: {} as CatalogItem,
              isClicked: false
            },
        }
         
    )
  },
  actions: {
    async fetchItems() {
        this.loading = true
        try {
            const response = await fetch('http://localhost:3000/api/catalog')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            this.items = data
            this.loading = false
        } catch (error) {
            this.loading = false
        }
    },
    addToCart(item: any, sellPrice: number) {
      
      const cart = useCartStore()
      cart.cartMassage = "К сожалению вы еще не добавили товары в корзину :-("
      const clickedItem = {
        id: item.id,
        name: item.name,
        model_name: item.model_name,
        article: item.article,
        tech_info: item.tech_info,
        description: item.description,
        item_price: sellPrice,
        quantity: 1,
        img_url: item.img_url, 
      }
      const existingItemId = cart.items.findIndex(item => item.id == clickedItem.id && item.item_price == sellPrice)
      if (existingItemId > -1 ) {
        cart.items[existingItemId].quantity += 1
      } else {
        cart.items.push(clickedItem)
      }
    },
    changeSwiperPage(index:number,maxIndex: number) {
      if (this.activeSwiperPage == 1 && index < 0 || this.activeSwiperPage == maxIndex && index > 0) {
        return  this.activeSwiperPage
      }
      return this.activeSwiperPage += index
    }
  },
})
