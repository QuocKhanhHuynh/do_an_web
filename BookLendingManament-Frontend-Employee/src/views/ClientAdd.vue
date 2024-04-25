<template>
    <div class="page">
      <h4>Thêm Đọc giả</h4>
      <ClientForm @submit:client="addClient" />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import ClientForm from "@/components/ClientForm.vue";
  import ClientService from "@/services/client.service";
  export default {
      components: {
        ClientForm,
      },
      data() {
          return {
              message: "",
          };
      },
      methods: {
          async addClient(data) {
              try {
                  const addResult = await ClientService.create(data);
                  if (addResult.status){
                      this.message = "Đọc giả được thêm thành công.";
                  }
                  else{
                      this.message = "Đọc giả được thêm thất bại.";
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