<template>
    <div class="product-item">
        <img v-bind:src="product.urlImage" />
        <h4 class="product-name">{{ product.name }}</h4>
        <p class="product-price">{{ product.categoryName }}</p>
        <router-link v-bind:to="'/products/' + product._id">
            <button class="btn btn-outline-primary">Xem chi tiết</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ProductsGridItem',
    props: ['product'],
}
</script>

<style scoped>
.product-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
  }

  .product-name {
    margin-bottom: 0;
  }

  img {
    height: 200px;
    width: 200px;
  }

  a {
    width: 100%;
  }

  button {
    width: 100%;
  }
</style>