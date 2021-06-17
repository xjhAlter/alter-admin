<template>
  <div class="nav-bar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSidebar"
    ></hamburger>
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="right-menu">
        <span class="el-dropdown-link">
          <span class="nickname">{{ userInfo.username }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import breadcrumb from "@/components/breadcrumb/index.vue";
import hamburger from "@/components/hamburger/index.vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: { breadcrumb, hamburger },
  setup() {
    const router = useRouter();

    const userInfo = computed(() => {
      return store.getters.userInfo || {};
    });

    const sidebar = computed(() => {
      return store.getters.sidebar;
    });

    const logout = async () => {
      await store
        .dispatch("user/logout")
        .then(() => {
          // 跳转到登录页面
          router.replace("/login");
        })
        .catch(() => {
          ElMessage.error("出错了");
        });
    };

    const toggleSidebar = () => {
      store.dispatch("app/toggleSidebar");
    };

    return {
      userInfo,
      sidebar,
      logout,
      toggleSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .nickname {
        color: #409eff;
        font: bold 16px "微软雅黑";
      }
    }
  }
}
</style>