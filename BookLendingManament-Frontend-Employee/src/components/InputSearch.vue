<script>
export default {
    props: {
        modelValue: { type: String, default: "" }, // đã được định nghĩa và nhận từ cha
    },
    emits: ["submit", "update:modelValue"], // các sự kiện truyền dữ liệu từ con lên cha mà cha đã định nghĩa
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);// gửi dữ liệu lên cha
        },  
        submit() {
            this.$emit("submit"); // gửi dữ liệu lên cha
        },
    },
};
</script>
<template>
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue" @input="updateModelValue" @keyup.enter="submit"/>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                <i class="fas fa-search"></i> Tìm kiếm
            </button>
        </div>
    </div>
</template>