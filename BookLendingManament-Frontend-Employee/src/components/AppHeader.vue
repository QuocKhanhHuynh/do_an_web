

<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-info">
        <a class="navbar-brand" href="/">Quản lý mượn sách</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="{ name: 'receipt' }" class="nav-link">
                        Đơn mượn sách
                        <i class="fa-solid fa-receipt"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'publisher' }" class="nav-link">
                        Nhà xuất bản
                        <i class="fa-solid fa-house"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'category' }" class="nav-link">
                        Loại sách
                        <i class="fa-sharp fa-solid fa-layer-group"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'book' }" class="nav-link">
                        Sách
                        <i class="fa-solid fa-book"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'employee' }" class="nav-link">
                        Nhân viên
                        <i class="fa-solid fa-circle-user"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'client' }" class="nav-link">
                        Đọc giả
                        <i class="fa-solid fa-book-open-reader"></i>
                    </router-link>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'employee.info' }" class="nav-link">
                        Tài khoản
                        <i class="fa-solid fa-user"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'Login' }" class="nav-link">
                        Đăng xuất
                        <i class="fa-solid fa-door-open"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>