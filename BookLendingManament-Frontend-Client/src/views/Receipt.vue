<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-13">
        <div class="borrow-table">
          <table class="table">
            <thead>
              <tr>
                <th>Mã phiếu mượn</th>
                <th>Ngày gửi phiếu mượn</th>
                <th>Ngày mượn</th>
                <th>Ngày trả</th>
                <th>Tên sách</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(receipt, index) in receipts" :key="index">
                <td>{{ receipt._id }}</td>
                <td>{{ formatDate(receipt.registerDate) }}</td>
                <td>{{ formatDate(receipt.startDate) }}</td>
                <td>{{ formatDate(receipt.endDate) }}</td>
                <td class="wrap-content">{{ receipt.bookName }}</td>
                <td>{{ receipt.status == 0 ? 'Chờ duyệt' : receipt.status == 1 ? 'Đã duyệt' : receipt.status == 2 ? 'Đã trả' : receipt.status == 3 ? 'Đã hủy' : 'Quá hạn' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: none; /* Không giới hạn chiều rộng */
}

.borrow-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Chia đều độ rộng cho từng cột */
}

.borrow-table th,
.borrow-table td {
  border: 1px solid #ddd;
  padding: 8px;
  white-space: nowrap; /* Ngăn chặn quá trình xuống dòng */
}

.borrow-table th {
  background-color: #f2f2f2;
}

.wrap-content {
  white-space: normal; /* Cho phép nội dung nở ra */
}
</style>




<script>
import ReceiptService from "@/services/receipt.service";
import ClientService from "@/services/client.service";
export default {
    name: 'ReceiptsPage',
    methods: {
      formatDate(date) {
        var newDate = new Date(Date.parse(date));
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
      }
    },
    data() {
      return {
        receipts: [],
      };
    },
    async mounted(){
      const token = await localStorage.getItem("token")
      if (token == null){
        this.$router.push({ path: `/login`});
      }
      else{
        const result = (await ReceiptService.getAll()).object;
        const info = (await ClientService.getbyCookie()).object;
        this.receipts = result.sort(function(a, b) { 
          if (a.registerDate > b.registerDate)
            return 1;
          if (a.registerDate < b.registerDate)
            return -1;
          return 0;
        }).filter(receipt => receipt._idClient === info._id);
      }
    }
};
</script>
