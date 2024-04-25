<template>
    <div class="page">
        <h4>Cập nhật mật khẩu</h4>
        <Form method="post">
            <div class="form-group">
                <label for="oldPass">Mật khẩu cũ</label>
                <input name="oldPass" type="password" class="form-control" v-model="oldPass"/>
                <ErrorMessage name="oldPass" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="newPass">Mật khẩu mới</label>
                <input name="newPass" type="password" class="form-control" v-model="newPass"/>
                <ErrorMessage name="newPass" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="confirmPass">Số điện thoại</label>
                <input name="confirmPass" type="password" class="form-control" v-model="confirmPass"/>
                <ErrorMessage name="confirmPass" class="error-feedback" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click.prevent="updatePass">Lưu</button>
            </div>
        </Form>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import clientService from "@/services/client.service";
import { object } from "yup";
export default {
    data() {
        return {
            oldPass: "",
            newPass: "",
            confirmPass: "",
            client: null,
            message: "",
        };
    },
    methods: {
        async updatePass() {
            try {
                const result = (await clientService.getbyCookie());
                const id = result.object._id;
                const resultUpdate = await clientService.updatePass(id, {password: this.newPass});
                console.log(resultUpdate);
                if (resultUpdate.status){
                    this.message = "Mật khẩu được cập nhật thành công.";
                }
                else{
                    this.message = "Không thể cập nhật Mật khẩu.";
                }
            } catch (error) {
                console.log(error);
            }
        }
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