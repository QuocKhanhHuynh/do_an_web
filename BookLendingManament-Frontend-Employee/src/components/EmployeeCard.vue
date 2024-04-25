<script>
export default {
    props: {
        employee: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên đăng nhập:</strong>
            {{ employee.username }}
        </div>
        <div class="p-1">
            <strong>Họ tên:</strong>
            {{ employee.fullname }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ employee.address }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ employee.phoneNumber }}
        </div>
        <div class="p-1">
            <strong>Vị trí:</strong>
            {{ employee.position }}
        </div>
    </div>
</template>
