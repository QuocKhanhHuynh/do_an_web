<template>
    <div class="col-md-6 offset-md-3">
      <div class="card shadow"> <!-- Thêm class shadow để tạo khung viền -->
        <h4 style="margin: auto; margin-top: 10px;">Đăng nhập thư viện</h4>
        <div class="card-body">
          <form @submit.prevent="submit" class="page-login">
            <div class="form-group">
              <label for="exampleInputEmail1">Tên đăng nhập</label>
              <input v-model="username" class="form-control" id="exampleInputEmail1"  placeholder="Nhập tên đăng nhập">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Mật khẩu</label>
              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Nhập mật khẩu">
            </div>
            <div class="form-group form-check">
              <a class="form-check-label" for="exampleCheck1"><router-link :to="{ path: '/forgetpass' }" class="nav-link">
                Quên mật khẩu
            </router-link></a>
            </div>
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
          </form>
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .page-login {
      max-width: 400px;
      margin: auto;
  }
  </style>
  <script>
  import clientService from "@/services/client.service";
  export default {
      data(){
          return {
              username: '',
              password: '',
              message: ''
          };
      },
      methods: {
         async submit(){
              const data = {username: this.username, password: this.password};
              const result = await clientService.login(data);
          //    console.log(result);
          if (result.status == false && result.object == false){
                confirm("Tàu khoản đã bị khóa");
                return;
              }
              if (result.status == false){
                confirm("Thông tin đăng nhập sai");
                return;
              }
               const token = result.object;
               localStorage.setItem("token",token);
               this.$router.push({ path: `/`});
         }
      },
      async mounted(){
        localStorage.removeItem('token');
        await clientService.logout();
      }
  }
  </script>