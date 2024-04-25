<script>
export default {
    props: {
        client: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên đăng nhập:</strong>
            {{ client.username }}
        </div>
        <div class="p-1">
            <strong>Họ tên:</strong>
            {{ client.fullname }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ client.address }}
        </div>
        <div class="p-1">
            <strong>Giới tính:</strong>
            {{ client.gender }}
        </div>
        <div class="p-1">
            <strong>Ngày sinh:</strong>
            {{ client.dOB }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ client.phoneNumber }}
        </div>
        <div class="p-1">
            <strong>Trạng thái:</strong>
            {{ client.status === false? "Đã bị khóa" : "Đang hoạt động" }}
        </div>
    </div>
</template>
