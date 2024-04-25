<template>
    <Form :validation-schema="clientFormSchema">
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="clientLocal.username"/>
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="text" class="form-control" v-model="clientLocal.password"/>
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="fullname">Họ tên</label>
            <Field name="fullname" type="text" class="form-control" v-model="clientLocal.fullname"/>
            <ErrorMessage name="fullname" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="gender">Giới tính</label>
            <select class="form-control" id="gender" v-model="clientLocal.gender">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
            <ErrorMessage name="gender" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dOB">Ngày sinh</label>
            <Field name="dOB" type="text" class="form-control" v-model="clientLocal.dOB"/>
            <ErrorMessage name="dOB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phoneNumber">Số điện thoại</label>
            <Field name="phoneNumber" type="text" class="form-control" v-model="clientLocal.phoneNumber"/>
            <ErrorMessage name="phoneNumber" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="clientLocal.address"/>
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="submitClient">Lưu</button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:client"],
    data() {
        const clientFormSchema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập phải có giá trị."),
            password: yup.string().required("Mật khẩu phải có giá trị."),
            fullname: yup.string().required("Họ tên phải có giá trị."),
            address: yup.string().max(100, "Địa chỉ phải có giá trị."),
           // gender: yup.string().required("Giới tính phải có giá trị."),
            dOB: yup.string().required("Ngày sinh phải có giá trị."),
            phoneNumber: yup.string().required("Số điện thoại phải có giá trị."),
        });
        return {
            clientLocal: {
                username: '',
                password: '',
                fullname: '',
                gender: '',
                dOB: '',
                phoneNumber: '',
                address: '',
            },
            clientFormSchema
        };
    },
    methods: {
        submitClient() {
            this.$emit("submit:client", this.clientLocal);
        }
    },
};
</script>
<style scoped>
    @import "@/assets/form.css";
</style>