<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="(val) => (notes = val)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span
            class="iconfont icon-fullscreen"
            @click="isShowPreview = !isShowPreview"
          ></span>
        </div>
        <div class="note-title">
          <input
            v-model="curNote.title"
            type="text"
            placeholder="输入标题"
            @input="OnUpdateNote"
          />
        </div>
        <div class="editor">
          <textarea
            @input="OnUpdateNote"
            @keydown="statusText = '正在输入....'"
            v-model:value="curNote.content"
            v-show="isShowPreview"
            placeholder="输入内容,支持markdown 语法"
          ></textarea>
          <div
            @keydown="statusText = '正在输入....'"
            v-html="previewContent"
            class="preview markdown-body"
            v-show="!isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from "./NoteSidebar.vue";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import { mapActions, mapGetters, mapMutations } from "vuex";

let md = new MarkdownIt();

export default {
  components: { NoteSidebar },

  data() {
    return {
      statusText: "笔记未改动",
      isShowPreview: false,
    };
  },
  computed: {
    ...mapGetters(["notes", "curNote"]),
    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },
  methods: {
    ...mapMutations(["setCurNote"]),
    ...mapActions(["updateNote", "deleteNote", "checkLogin"]),
    OnUpdateNote: _.debounce(function () {
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content,
      })
        .then((data) => {
          this.statusText = "已保存";
        })
        .catch((data) => {
          this.statusText = "保存出错";
        });
    }, 300),
    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then((data) => {
        this.$router.replace({ path: "/note" });
      });
    },
  },
  created() {
    //第一步，检测用户是否登录
    this.checkLogin({ path: "/login" });
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId });
    next();
  },
};
</script>

<style lang="less" >
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>