<template>
    <Form @submit="submitReceipt" :validation-schema="receiptFormSchema">
        <div class="form-group">
            <label for="dateStart">Ngày mượn</label>
            <Field name="dateStart" type="date" class="form-control" v-model="receiptLocal.startDate"/>
            <ErrorMessage name="dateStart" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="endDate">Ngày trả</label>
            <Field name="endDate" type="date" class="form-control" v-model="receiptLocal.endDate"/>
            <ErrorMessage name="endDate" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Gửi</button>
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
    emits: ["submit:receipt", "delete:receipt"],
    props: {
        receipt: { type: Object, required: true }
    },
    data() {
        const receiptFormSchema = yup.object().shape({
            
        });
        return {
            receiptLocal: this.receipt || {
                _idClient: '',
                clientUsername: '',
                _idEmployee: '',
                employeeUsername: '',
                _idBook: '',
                bookName: '',
                startDate: '',
                endDate: '',
            },
            receiptFormSchema
        };
    },
    methods: {
        submitReceipt() {
            this.$emit("submit:receipt", this.receiptLocal);
        }
    },
};
</script>
<style scoped>
    @import "@/assets/form.css";
</style>