<template>
    <div class="page">
      <h4>Thêm Sách</h4>
      <BookForm :publishers="this.publishers" :categories="this.categories" @submit:book="addBook" />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import BookForm from "@/components/BookForm.vue";
  import BookService from "@/services/book.service";
  import PublisherService from "@/services/publisher.service";
  import CategoryService from "@/services/category.service";
  export default {
      components: {
          BookForm,
      },
       data() {
          return {
              message: "",
              publishers: [],
              categories: []
          };
      },
      methods: {
          async addBook(data) {
              try {
                    data.publisherName = (await PublisherService.get(data._idPublisher)).object.name; 
                    data.categoryName = (await CategoryService.get(data._idCategory)).object.name; 
                  const addResult = await BookService.create(data);
                  if (addResult.status){
                      this.message = "Sách được thêm thành công.";
                  }
                  else{
                      this.message = "Sách được thêm thất bại.";
                  }
              } catch (error) {
                  console.log(error);
              }
          },
          async initData(){
            this.publishers = (await PublisherService.getAll()).object;
            this.categories = (await CategoryService.getAll()).object;
          }
      },
        async mounted(){
            //localStorage.removeItem('token');
        const token = await localStorage.getItem("token")
        // confirm(token);
        if (token == null){
            this.$router.push({ path: `/login`});
        }
        this.initData();
      }
  };
  </script>