<script>
import ReceiptService from "@/services/receipts.service";
import EmployeeService from "@/services/employee.service";
export default {
    data() {
      return {
        receipt: null
      };
    },
    methods:{
      async updateStatus(e){
        if (e.target.value != 'Chọn trạng thái'){
          const info = (await EmployeeService.getbyCookie()).object;
          this.receipt.status = e.target.value;
          this.receipt._idEmployee = info._id;
          this.receipt.employeeUsername = info.username;
          const result = await ReceiptService.update(this.$route.params.id, this.receipt);
          if (result.status){
            confirm("Cập nhật trạng thái đơn mượn thành công");
          }
        }
      },
      formatDate(date) {
        var newDate = new Date(Date.parse(date));
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
      }
    },
    async created() {
      const result = await ReceiptService.get(this.$route.params.id);
      const borrowers = result.object;
      this.receipt = borrowers;
    },
    async mounted(){
      //localStorage.removeItem('token');
      const token = await localStorage.getItem("token")
     // confirm(token);
      if (token == null){
        this.$router.push({ path: `/login`});
      }
    }
};
</script>
<template>
    <h4>Chi tiết Đơn mượn <i class="fa-solid fa-receipt"></i></h4>
    <div>
        <div class="p-1">
          <strong>Mã đơn:</strong>
          {{ this.receipt._id }}
        </div>
        <div class="p-1">
            <strong>Đọc giả:</strong>
            {{ this.receipt.clientUsername }}
        </div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ this.receipt.bookName }}
        </div>
        <div class="p-1">
          <strong>Ngày gửi phiếu:</strong>
          {{ formatDate(this.receipt.registerDate) }}
        </div>
        <div class="p-1">
          <strong>Ngày mượn:</strong>
          {{ formatDate(this.receipt.startDate) }}
        </div>
        <div class="p-1">
          <strong>Ngày trả:</strong>
          {{ formatDate(this.receipt.endDate) }}
        </div>
        <div class="p-1">
          <strong>Nhân viên duyệt:</strong>
          {{ this.receipt.employeeUsername }}
        </div>
        <div class="p-1">
          <strong>Trạng thái:</strong>
          {{ this.receipt.status == 0? 'Chờ duyệt' :  this.receipt.status == 1? 'Đã duyệt' : this.receipt.status == 2? 'Đã trả' : this.receipt.status == 3? 'Đã hủy' : 'Quá hạn'}}
        </div>
        <div class="p-1">
          <strong>Cập nhật trạng thái:</strong>
          <select  @change="updateStatus">
            <option :value="null">Chọn trạng thái</option>
            <option :value="0">Chờ duyệt</option>
            <option :value="1">Đã duyệt</option>
            <option :value="2">Đã trả</option>
            <option :value="3">Đã hủy</option>
            <option :value="4">Quá hạn</option>
          </select>
        </div>
    </div>
</template>
