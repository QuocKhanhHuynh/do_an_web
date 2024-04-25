<template>
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img v-bind:src="product.urlImage" />
    </div>
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <p>Thể loại: {{ product.categoryName }}</p>
      <p>Số lượng: {{ product.quanlity }}</p>
      <p>Nhà xuất bản: {{ product.publisherName }}</p>
      <p>Năm xuất bản: {{ product.publicationYear }}</p>
      <p>Đơn giá: {{ product.price }}</p>
      <p>Số lượng còn lại: {{ product.stock }}</p>
      <hr>
      <h4>Mô tả</h4>
      <p>{{ product.description }}</p>
      <router-link :to="'/receipts/' + product._id">
        <button class="btn btn-outline-primary btn-block">Mượn sách</button>
      </router-link>
    </div>
  </div>
  <NotFoundPage v-else/>
</template>


<script>
import axios from 'axios';
import NotFoundPage from "@/views/NotFoundPage.vue";
import BookService from "@/services/book.service";

export default {
    name: 'ProductDetailPage',
    components: {
      NotFoundPage,
    },
    data() {
      return {
        product: {},
      };
    },
    async created() {
      this.product = (await BookService.get(this.$route.params.id)).object;
    }
};
</script>

<style scoped>
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 300px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }

  .green-button {
    background-color: green;
  }

  .grey-button {
    background-color: #888;
  }
</style>
