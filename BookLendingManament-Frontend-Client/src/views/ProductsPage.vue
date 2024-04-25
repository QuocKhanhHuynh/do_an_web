<template>
  <div id="page-wrap">
    <InputSearch @update:modelSelect="filterCategory" v-model="searchText"></InputSearch>
    <ProductsGrid :products="this.filter" />
  </div>
</template>

<script>
import ProductsGrid from '../components/ProductsGrid.vue';
import InputSearch from '../components/InputSearch.vue';
import BookService from '@/services/book.service'

export default {
    name: 'ProductsPage',
    components: {
      ProductsGrid,
      InputSearch
    },
    data() {
      return {
        products: [],
        searchText: '',
        idCategory: ''
      };
    },
    computed: { 
        filter(){
          var productDisplay = this.products;
          if (this.searchText != ''){
            productDisplay = productDisplay.filter(product => {
              // Giả sử bạn muốn lọc sản phẩm dựa trên một thuộc tính như tên
             return product.name.toLowerCase().includes(this.searchText.toLowerCase());
            });
          }
          if (this.idCategory != '' && this.idCategory != 'Thể loại'){
            productDisplay = productDisplay.filter(product => product._idCategory == this.idCategory);
          }
          return productDisplay;
        }
    },
    methods: {
      filterCategory(idCategory){
        this.idCategory = idCategory;
      }
    },
    async created() {
      const result = await BookService.getAll();
      const products = result.object;
      this.products = products;
    }
};
</script>

