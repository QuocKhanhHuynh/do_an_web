<template>
    <div class="page">
      <h4>Thêm Loại sách</h4>
      <CategoryForm @submit:category="addCategory" />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import CategoryForm from "@/components/CategoryForm.vue";
  import CategoryService from "@/services/category.service";
  export default {
      components: {
        CategoryForm,
      },
      data() {
          return {
              message: "",
          };
      },
      methods: {
          async addCategory(data) {
              try {
                  const addResult = await CategoryService.create(data);
                  if (addResult.status){
                      this.message = "Loại sách được thêm thành công.";
                  }
                  else{
                      this.message = "Loại sách được thêm thất bại.";
                  }
              } catch (error) {
                  console.log(error);
              }
          },
      },
      async mounted(){
      //localStorage.removeItem('token');
      const token = await localStorage.getItem("token")
     // confirm(token);
      if (token == null){
        this.$router.push({ path: `/login`});
      }
    }
  };
  </script>