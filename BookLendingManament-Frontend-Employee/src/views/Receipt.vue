<template>
    <div class="page row">
        <div class="col-md-13">
          <FilterReceipt @update:modelSelect="filterStatus" v-model="searchText"></FilterReceipt>
        </div>
        <div class="borrow-table">
            <table class="table">
                <thead>
                    <tr>
                      <th>Đọc giả</th>
                      <th>Ngày gửi phiếu</th>
                      <th>Ngày mượn</th>
                      <th>Ngày trả</th>
                      <th>Tên sách</th>
                      <th>Trạng thái</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(borrower, index) in this.filter" :key="index">
                      <td>{{ borrower.clientUsername }}</td>
                      <td>{{ formatDate(borrower.registerDate) }}</td>
                      <td>{{ formatDate(borrower.startDate) }}</td>
                      <td>{{ formatDate(borrower.endDate) }}</td>
                      <td>{{ borrower.bookName }}</td>
                      <td>{{ borrower.status == 0? 'Chờ duyệt' :  borrower.status == 1? 'Đã duyệt' : borrower.status == 2? 'Đã trả' :  borrower.status == 3? 'Đã hủy' : 'Quá hạn'}}</td>
                      <td>
                        <button :value="borrower._id" @click="detail" type="button" class="btn btn-primary">Chi tiết</button>
                    </td>
                    </tr>
                  </tbody>
              </table>
          </div>
    </div>
</template>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
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
    width: calc(100% / 5); /* Chia đều độ rộng cho 5 cột */
}

.borrow-table th {
    background-color: #f2f2f2;
}
</style>


<script>
import ReceiptService from "@/services/receipts.service";
import FilterReceipt from "@/components/FilterReceipt.vue";
import Cookies from 'js-cookie';
export default {
    name: 'ReceiptsPage',
    components: {
      FilterReceipt
    },
    data() {
      return {
        
        borrowers: [],
        searchText: '',
        status: '',
        jwt: ''
      };
    },
    computed: { 
        filter(){
          var receiptDisplay = this.borrowers;
          if (this.searchText != ''){
            receiptDisplay = receiptDisplay.filter(borrower => {
             return borrower.clientUsername.toLowerCase().includes(this.searchText.toLowerCase());
            });
          }
          //confirm(this.status);
          if (this.status != 'Trạng thái' && this.status == 4){
            var dateNow = new Date();
            receiptDisplay = receiptDisplay.filter(borrower => dateNow > this.endDate);
          }
          else if (this.status != 'Trạng thái'){
            receiptDisplay = receiptDisplay.filter(borrower => borrower.status == this.status);
          }
          return receiptDisplay;
        }
    },
    methods: {
      filterStatus(status){
        this.status = status;
      },
      detail(e){
        this.$router.push({ path: `/receipts/${e.target.value}`});
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
      const result = await ReceiptService.getAll();
      var borrowers = result.object;
      borrowers = borrowers.sort(function(a, b) { 
          if (a.registerDate > b.registerDate)
            return 1;
          if (a.registerDate < b.registerDate)
            return -1;
          return 0;
        });
      this.borrowers = borrowers;
      ///localStorage.removeItem('token');
    },
    async mounted(){
     // localStorage.removeItem('token');
      const token = await localStorage.getItem("token")
     // confirm(token);
      if (token == null){
        this.$router.push({ path: `/login`});
      }
    }
};
</script>
