<template>
    <Form @submit="submitCategory" :validation-schema="categoryFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="categoryLocal.name"/>
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="categoryLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteCategory">Xóa</button>
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
    emits: ["submit:category", "delete:category"],
    props: {
        category: { type: Object, required: true }
    },
    data() {
        const categoryFormSchema = yup.object().shape({
            name: yup.string().required("Tên phải có giá trị."),
        });
        return {
            categoryLocal: this.category || {
                name: '',
            },
            categoryFormSchema
        };
    },
    methods: {
        submitCategory() {
            this.$emit("submit:category", this.categoryLocal);
        },
        deleteCategory() {
            this.$emit("delete:category", this.categoryLocal.id);
        },
    },
};
</script>
<style scoped>
    @import "@/assets/form.css";
</style>