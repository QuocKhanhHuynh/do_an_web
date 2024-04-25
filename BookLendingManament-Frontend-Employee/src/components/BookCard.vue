<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
           <img width="130px" :src="book.urlImage">
        </div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ book._id }}
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ book.name }}
        </div>
        <div class="p-1">
            <strong>Loại sách:</strong>
            {{ book.categoryName }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong>
            {{ book.price }}
        </div>
        <div class="p-1">
            <strong>Số lượng:</strong>
            {{ book.quanlity }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.publicationYear }}
        </div>
        <div class="p-1">
            <strong>Nhà xuất bản:</strong>
            {{ book.publisherName }}
        </div>
        <div class="p-1">
            <strong>Tồn kho:</strong>
            {{ book.stock }}
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ book.description }}
        </div>
    </div>
</template>
