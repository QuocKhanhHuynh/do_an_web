


<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <a class="navbar-brand" href="/">Thư viện trực tuyến</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <router-link :to="{ path: '/' }" class="nav-link">
                      Sách
                      <i class="fa-solid fa-book"></i>
                  </router-link>
              </li>
                <li class="nav-item">
                    <router-link :to="{ path: '/receipts' }" class="nav-link">
                        Đơn mượn sách
                        <i class="fa-solid fa-receipt"></i>
                    </router-link>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ path: '/account' }" class="nav-link">
                        Tài khoản
                        <i class="fa-solid fa-user"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ path: '/login' }" class="nav-link">
                        Đăng nhập
                        <i class="fa-solid fa-door-open"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ path: '/login' }" class="nav-link">
                        Đăng xuất
                        <i class="fa-sharp fa-solid fa-door-closed"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>
