<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.name"/>
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="_idCategory">Loại sách</label>
            <select name="_idCategory" class="form-control" v-model="bookLocal._idCategory">
                <option v-for="category in categories" :value="category._id">{{ category.name }}</option>
              </select>
            <ErrorMessage name="_idCategory" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Đơn giá</label>
            <Field name="price" type="text" class="form-control" v-model="bookLocal.price"/>
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quanlity">Số lượng</label>
            <Field name="quanlity" type="text" class="form-control" v-model="bookLocal.quanlity"/>
            <ErrorMessage name="quanlity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publicationYear">Năm xuất bản</label>
            <Field name="publicationYear" type="text" class="form-control" v-model="bookLocal.publicationYear"/>
            <ErrorMessage name="publicationYear" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="_idPublisher">Nhà xuất bản</label>
            <select name="_idPublisher" class="form-control" v-model="bookLocal._idPublisher">
                <option v-for="publisher in publishers" :value="publisher._id">{{ publisher.name }}</option>
              </select>
            <ErrorMessage name="_idPublisher" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="stock">Tồn kho</label>
            <Field name="stock" type="text" class="form-control" v-model="bookLocal.stock"/>
            <ErrorMessage name="stock" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả</label>
            <Field name="description" type="text" class="form-control" v-model="bookLocal.description"/>
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Ảnh</label>
            <Field ty name="image" type="file" @change="handleFileChange" class="form-control" v-model="this.image"/>
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">Xóa</button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true },
        publishers: {type: Array, required: true},
        categories: {type: Array, required: true}
    },
    data() {
        const bookFormSchema = yup.object().shape({
            name: yup.string().required("Tên phải có giá trị."),
            //_idCategory: yup.string().required("Loại sách phải có giá trị."),
            price: yup.string().required("Dơn giá phải có giá trị."),
            quanlity: yup.string().required("số lượng phải có giá trị."),
            publicationYear: yup.string().required("Năm xuất bản phải có giá trị."),
            //_idPublisher: yup.string().required("Nhà xuất bản phải có giá trị."),
            stock: yup.string().required("Số lượng tồn kho phải có giá trị."),
            description: yup.string().required("Mô tả phải có giá trị."),
            image: yup.string().required("Ảnh phải có giá trị."),
        });
        return {
            bookLocal: this.book || {
                name: '',
                _idCategory: '',
                categoryName: '',
                price: '',
                quanlity: '',
                publicationYear: '',
                _idPublisher: '',
                publisherName: '',
                stock: '',
                urlImage: '',
                description: ''
            },
            bookFormSchema,
            image: null
        };
    },
    methods: {
        async submitBook() {
            const presetName = 'image-book';
            const folderName = 'books';
            const api = 'https://api.cloudinary.com/v1_1/dnaykveil/image/upload';
            const formData = new FormData();
            formData.append('upload_preset', presetName);
            formData.append('folder', folderName);
            formData.append('file', this.image);
            const resultPost = await axios.post(api, formData, {
                headers: {
                "Content-Type": "multipart/form-data"
                }
            });
            this.bookLocal.urlImage = "https://res.cloudinary.com/dnaykveil/image/upload/" + resultPost.data.public_id + ".jpg";
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0]; // Lấy tập tin đầu tiên từ sự kiện upload
            this.image = selectedFile; // Gán tập tin được chọn vào thuộc tính file
        },
    },
};
</script>
<style scoped>
    @import "@/assets/form.css";
</style>