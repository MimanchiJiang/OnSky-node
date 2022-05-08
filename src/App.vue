<template>
  <div id="app">
    <sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from "./components/sidebar.vue";
export default {
  components: { sidebar },
  name: "App",
};
</script>

<style>
@import "//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eee;
  font-size: 14px;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}

a {
  text-decoration: none;
  color: #444;
}
ul,
li {
  list-style: none;
}
.btn {
  color: #666;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
}

#app {
  display: flex;
  align-items: stretch;
}
</style>
