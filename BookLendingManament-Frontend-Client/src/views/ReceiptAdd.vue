<template>
    <div class="page">
      <h4>Đăng ký mượn sách</h4>
      <div class="form-container">
        <ReceiptForm @submit:receipt="addReceipt" />
      </div>
      <p class="message">{{ message }}</p>
    </div>
  </template>
  <script>
  import ReceiptForm from "@/components/ReceiptForm.vue";
  import bookService from "@/services/book.service";
  import ReceiptService from "@/services/receipt.service";
  import ClientService from "@/services/client.service";
  export default {
      components: {
          ReceiptForm,
      },
      data() {
          return {
              message: "",
          };
      },
      methods: {
          async addReceipt(data) {
              try {
                  const info = (await ClientService.getbyCookie()).object;
                  const book = (await bookService.get(this.$route.params.idBook)).object;
                  data._idClient = info._id;
                  data.clientUsername = info.username;
                  data._idBook = book._id;
                  data.bookName = book.name;
                  const addResult = await ReceiptService.create(data);
                  if (addResult.status){
                      this.message = "Đăng ký mượn sách thành công.";
                  }
                  else{
                      this.message = "Đăng ký mượn sách không thành công.";
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
          this.$router.push({path: "/login"});
        }
      }
  };
  </script>
  <style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Dịch chuyển lên trên cùng */
    height: 100vh; /* Cho form căng giữa theo chiều dọc */
  }
  
  .form-container {
    width: 300px; /* Điều chỉnh kích thước của form */
    margin-top: 20px; /* Khoảng cách giữa form và phần trên cùng */
  }
  
  .message {
    margin-top: 10px; /* Khoảng cách giữa form và thông báo */
  }
  </style>