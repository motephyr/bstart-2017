<template>
  <div class="container">
    <!--<div id="app">-->
    <!--<el-radio class="radio" v-model="radio" label="1">备选项</el-radio>-->
    <!--<el-radio class="radio" v-model="radio" label="2">备选项</el-radio>-->
    <!--</div>-->

    <!--<div id="app">-->
      <!--<el-button>默认按钮</el-button>-->
      <!--<el-button type="primary">主要按钮</el-button>-->
      <!--<el-button type="text">文字按钮</el-button>-->
    <!--</div>-->

    <h1>Please login to see the secret content</h1>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p class="error" v-if="formError">{{ formError }}</p>
      <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
      <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
      <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      Hello {{ $store.state.authUser.username }}!
      <pre>I am the secret content, I am shown only when the use is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">Logout</button>
    </div>
    <p><nuxt-link to="/secret">Super secret page</nuxt-link></p>
  </div>
</template>

<script>

//var Main = {
//    data () {
//        return {
//            radio: '1'
//        };
//    }
//};
//var Ctor = Vue.extend(Main);
//new Ctor().$mount('#app');

export default {
  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.formUsername,
        password: this.formPassword
      }).then(() => {
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      }).catch((e) => {
        this.formError = e.message
      })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  /*background-color: #456;*/
  h1{
    color: #32C9FF;
    /*transform: rotate(30deg);*/
  }
}
.error {
  color: red;
}
</style>
