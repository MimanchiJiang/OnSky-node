<template>
  <div id="sidebar">
    <avatar />
    <div class="icons">
      <router-link to="/notebooks" title="笔记本"
        ><i class="iconfont icon-notebook"></i
      ></router-link>
      <router-link to="/note" title="笔记"
        ><i class="iconfont icon-note"></i
      ></router-link>

      <router-link to="/trash" title="回收站"
        ><i class="iconfont icon-trash"></i
      ></router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" @click="onLogout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import { mapActions } from "vuex";
export default {
  components: { Avatar },
  methods: {
    ...mapActions(["logout"]),

    onLogout() {
      this.logout({ path: "/login" });
    },
  },
};
</script>

<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #4f735a;

  .icons {
    margin-top: 15px;

    a {
      padding: 6px 0;
      display: block;
    }

    .router-link-active {
      background-color: rgb(83, 118, 150);
    }
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
  }
}
</style>