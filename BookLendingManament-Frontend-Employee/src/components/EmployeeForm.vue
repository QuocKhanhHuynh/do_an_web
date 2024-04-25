<template>
    <Form :validation-schema="employeeFormSchema">
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="employeeLocal.username"/>
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="text" class="form-control" v-model="employeeLocal.password"/>
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="fullname">Họ tên</label>
            <Field name="fullname" type="text" class="form-control" v-model="employeeLocal.fullname"/>
            <ErrorMessage name="fullname" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="employeeLocal.address"/>
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phoneNumber">Số điện thoại</label>
            <Field name="phoneNumber" type="text" class="form-control" v-model="employeeLocal.phoneNumber"/>
            <ErrorMessage name="phoneNumber" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="possition">Vị trí</label>
            <Field name="possition" type="text" class="form-control" v-model="employeeLocal.position"/>
            <ErrorMessage name="possition" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="submitEmployee">Lưu</button>
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
    emits: ["submit:employee"],
    data() {
        const employeeFormSchema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập phải có giá trị."),
            password: yup.string().required("Mật khẩu phải có giá trị."),
            fullname: yup.string().required("Họ tên phải có giá trị."),
            address: yup.string().max(100, "Địa chỉ phải có giá trị."),
            phoneNumber: yup.string().required("Số điện thoại phải có giá trị."),
            possition: yup.string().required("Vị trí phải có giá trị."),
        });
        return {
            employeeLocal: {
                username: '',
                password: '',
                fullname: '',
                phoneNumber: '',
                address: '',
                position: ''
            },
            employeeFormSchema
        };
    },
    methods: {
        submitEmployee() {
            this.$emit("submit:employee", this.employeeLocal);
        }
    },
};
</script>
<style scoped>
    @import "@/assets/form.css";
</style>