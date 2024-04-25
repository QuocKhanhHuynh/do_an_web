<template>
    <div class="page">
        <h4>Quên mật khẩu</h4>
        <Form method="post">
            <div class="form-group">
                <label for="username">Tên đăng nhập</label>
                <input name="username" type="text" class="form-control" v-model="username"/>
                <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Số điện thoại</label>
                <input name="phoneNumber" type="text" class="form-control" v-model="phoneNumber"/>
                <ErrorMessage name="phoneNumber" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="newPass">Mật khẩu mới</label>
                <input name="newPass" type="password" class="form-control" v-model="newPass"/>
                <ErrorMessage name="newPass" class="error-feedback" />
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
            username: "",
            phoneNumber: "",
            newPass: "",
            message: ""
        };
    },
    methods: {
        async updatePass() {
            try {
                const resultUpdate = await clientService.forgetPass({username: this.username, phoneNumber: this.phoneNumber, newPass: this.newPass});
                console.log(resultUpdate);
                if (resultUpdate.status){
                    confirm("Mật khẩu được cập nhật thành công.");
                    this.$router.push({path: "/login"});
                }
                else{
                    this.message = "Không thể cập nhật Mật khẩu.";
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>