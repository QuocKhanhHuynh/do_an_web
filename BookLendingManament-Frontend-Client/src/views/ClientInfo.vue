<template>
    <div class="page">
        <h4>Thông tin tài khoản</h4>
        <Form method="post">
            <div class="form-group">
                <label for="fullname">Họ tên</label>
                <input name="fullname" type="text" class="form-control" v-model="client.fullname"/>
                <ErrorMessage name="fullname" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="gender">Giới tính</label>
                <input name="gender" type="text" class="form-control" v-model="client.gender"/>
                <ErrorMessage name="gender" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="dOB">Ngày sinh</label>
                <input name="dOB" type="text" class="form-control" v-model="client.dOB"/>
                <ErrorMessage name="dOB" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input name="address" type="text" class="form-control" v-model="client.address"/>
                <ErrorMessage name="address" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Số điện thoại</label>
                <input name="phoneNumber" type="text" class="form-control" v-model="client.phoneNumber"/>
                <ErrorMessage name="phoneNumber" class="error-feedback" />
            </div>
            
            <div class="form-group">
                <button class="btn btn-primary mr-2" @click.prevent="updateClient">Lưu</button>
                <button class="btn btn-primary" @click.prevent="updatePass">Đổi mật khẩu</button>
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
            client: null,
            message: "",
        };
    },
    methods: {
        async updateClient() {
            try {
                const resultUpdate = await clientService.update(this.client._id, this.client);
                console.log(resultUpdate.status);
                if (resultUpdate.status){
                    this.message = "Tài khoản được cập nhật thành công.";
                }
                else{
                    this.message = "Không thể cập nhật tài khoản.";
                }
            } catch (error) {
                console.log(error);
            }
        },
        updatePass(){
            this.$router.push({path: "/updatepass"});
        }
    },
    async created() {
        const token = await localStorage.getItem("token")
        if (token == null){
            this.$router.push({path: "/login"});
        }
        else{
            const result = (await clientService.getbyCookie());
            this.client = result.object;
            this.message = "";
        }
    },
};
</script>