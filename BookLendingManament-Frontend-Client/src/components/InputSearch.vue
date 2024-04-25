<script>
import categoryService from '@/services/category.service';
export default {
    data(){
        return {
            categories: []
        }
    },
    props: {
        modelValue: { type: String, default: "" }, // đã được định nghĩa và nhận từ cha
    },
    emits: ["submit", "update:modelValue", "update:modelSelect"], // các sự kiện truyền dữ liệu từ con lên cha mà cha đã định nghĩa
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);// gửi dữ liệu lên cha
        },
        updateModelSelect(e){
            this.$emit("update:modelSelect", e.target.value);
        },
        submit() {
            this.$emit("submit"); // gửi dữ liệu lên cha
        },
    },
    async created(){
        this.categories = (await categoryService.getAll()).object;
    }
};
</script>
<template>
    <div class="input-group">
        <select  @change="updateModelSelect">
            <option :value="null">Thể loại</option>
            <option v-for="category in this.categories" :value="category._id">{{ category.name }}</option>
        </select>
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue" @input="updateModelValue" @keyup.enter="submit"/>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                <i class="fas fa-search"></i> Tìm kiếm
            </button>
        </div>
    </div>
</template>

<style scoped>
.input-group {
    margin-top: 3%;
  }
</style>