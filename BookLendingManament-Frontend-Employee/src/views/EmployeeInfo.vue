<template>
    <div class="page">
        <h4>Thông tin tài khoản</h4>
        <Form method="post">
            <div class="form-group">
                <label for="fullname">Họ tên</label>
                <input name="fullname" type="text" class="form-control" v-model="employee.fullname"/>
                <ErrorMessage name="fullname" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input name="address" type="text" class="form-control" v-model="employee.address"/>
                <ErrorMessage name="address" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Số điện thoại</label>
                <input name="phoneNumber" type="text" class="form-control" v-model="employee.phoneNumber"/>
                <ErrorMessage name="phoneNumber" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="position">Vị trí</label>
                <input name="position" type="text" class="form-control" v-model="employee.position"/>
                <ErrorMessage name="position" class="error-feedback" />
            </div>
            
            <div class="form-group">
                <button class="btn btn-primary mr-2" @click.prevent="updateEmployee">Lưu</button>
                <button class="btn btn-primary" @click.prevent="updatePass">Đổi mật khẩu</button>
              </div>
              
        </Form>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import employeeService from "@/services/employee.service";
import { object } from "yup";
export default {
    data() {
        return {
            employee: null,
            message: "",
        };
    },
    methods: {
        async updateEmployee() {
            try {
                if (!this.employee.fullname || !this.employee.address || !this.employee.phoneNumber || !this.employee.position){
                    this.message = "Vui lòng điền đủ thông tin";
                    return;
                }

                const resultUpdate = await employeeService.update(this.employee._id, this.employee);
                if (resultUpdate.status){
                    this.message = "Tài khoản được cập nhật thành công.";
                    return;
                }
                else{
                    this.message = "Không thể cập nhật tài khoản.";
                }
            } catch (error) {
                console.log(error);
            }
        },
        updatePass(){
            this.$router.push({path: "/updatePass"});
        }
    },
    async created() {
        const result = (await employeeService.getbyCookie());
        this.employee = result.object;
        this.message = "";
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