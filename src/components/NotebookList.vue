<template>
  <div id="notebook-list" class="detail">
    <a href="#" class="btn" @click.prevent="onCreate">新建笔记本 </a>

    <main>
      <div class="layout">
        <h3>笔记本列表{{ notebooks.length }}</h3>
        <div class="book-list">
          <router-link
            v-for="notebook in notebooks"
            v-bind:key="notebook.index"
            :to="`/note?notebookId=${notebook.id}`"
            class="notebook"
          >
            <div>
              <span class="iconfont icon-notebook"></span
              >{{ notebook.title }}&nbsp;&nbsp;<span>{{
                notebook.noteCounts
              }}</span
              ><span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >

              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{ notebook.createdAtFriendly }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notebooks from "@/apis/notebooks";
import { friendlyDate } from "@/helpers/util";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "getNotebooks",
      "addNotebook",
      "updateNotebook",
      "deleteNotebook",
      "checkLogin",
    ]),

    onCreate() {
      this.$prompt("请输入新标题", "新建", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
      }).then(({ value }) => {
        this.addNotebook({ title: value });
      });
    },
    onEdit(notebook) {
      let title = "";
      this.$prompt("请输入新标题", "修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: notebook.title,
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
      }).then(({ value }) => {
        this.updateNotebook({ notebookId: notebook.id, title: value });
      });
    },
    onDelete(notebook) {
      this.$confirm("你确定要删除改笔记本吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteNotebook({ notebookId: notebook.id });
      });
    },
  },
  created() {
    this.checkLogin({ path: "/login" });
    this.getNotebooks();
  },
  computed: {
    ...mapGetters(["notebooks"]),
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>