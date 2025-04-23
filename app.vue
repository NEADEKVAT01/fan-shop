<script setup>
  import '~/assets/css/App.css'
  const catalog = useCatalogStore()
</script>

<template>
  <div class="App">
    <Header/>
    <div class="App__main-content">
      <NavBar/>
      <Cart/>
      <Catalog/>
      <ItemModal :isClicked="true"/>
    </div>
    
  </div>
  
</template>
