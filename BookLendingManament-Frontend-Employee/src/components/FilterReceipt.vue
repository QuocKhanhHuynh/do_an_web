<template>
    <div class="input-group">
        <select  @change="updateModelSelect">
            <option :value="null">Trạng thái</option>
            <option :value="0">Chờ duyệt</option>
            <option :value="1">Đã duyệt</option>
            <option :value="3">Đã hủy</option>
            <option :value="4">Quá hạn</option>
        </select>
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue" @input="updateModelValue" @keyup.enter="submit"/>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                <i class="fas fa-search"></i> Tìm kiếm
            </button>
        </div>
    </div>
</template>

<script>
import { compile } from 'vue';

export default {
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
};
</script>