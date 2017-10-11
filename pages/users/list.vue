<template>
  <div>
    <!--<h1>reading_activities</h1>-->
    <!--<p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>-->
    <!--<div id="headerBar">-->
      <!--<div id="newUser" @click="new_user">+</div>-->
    <!--</div>-->
    <table class="usersTb">
      <thead>
      <tr>
        <th v-for="(value, key) in users[0]">{{(key != 'created_at' && key != 'updated_at') ? key : ''}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" @click="edit_user(user._id)" title="編輯帳號">
        <td>{{user._id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.accountLocked}}</td>
        <td>{{user.account}}</td>
        <td>{{user.phone}}</td>
        <td>{{user.mobile}}</td>
        <td>{{user.area}}</td>
        <!--<td><button>編輯</button></td>-->
      </tr>
      </tbody>
    </table>
    <!--<button @click="new_user">New User</button>-->
    <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
    <div id="footerBar">
      <nuxt-link class="ftBt" to="/"><i class="icon-reply"></i> 返回</nuxt-link>
      <div class="ftBt" @click="new_user"><i class="icon-user-plus"></i> 新曾帳號</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {

  async asyncData ({ params, error }) {
    try {
      let users = await axios.get('/api/users')
      return {users: users.data}
    } catch (e) {
      error({ statusCode: 404, message: 'User not found' })
    }
  },
  data () {
    return {
      reading_activities_1: {
        xaxio: [],
        yaxio: [],
        value: []
      }
    }
  },
  methods: {
    new_user () {
      this.$router.replace('/users/new?' + Math.random())
    },
    edit_user (id) {
      this.$router.replace('/users/edit/'+ id +'?' + Math.random())
    }
  }
}
</script>

<style>
  .usersTb{
    border-collapse: collapse;
    width: 100%;
    box-shadow: 0 0 2px rgba(79, 97, 102, 0.6);
    margin-bottom: 64px;
    border-radius: 8px;
    overflow: hidden;
    tr{
      th,td{
        padding: 3px 6px;
        height: 33px;
        vertical-align:middle;
        color: #A1A1A1;
      }
      border-bottom: 1px solid #DBDFE4;
    }
    thead{}
    tbody{
      tr{
        background-color: #FFF;
        cursor: pointer;
        &:hover{
          background-color: #E2F2F9;
        }
        th,td{
          padding: 3px 6px;
          height: 33px;
          vertical-align:middle;
          color: #0070D2;
        }
        th{}
        td{}
      }
    }
  }
  #footerBar{
    .ftBt{
      position: relative;
      background-color: #326EAB;
      /*border: 1px solid #1B99DD;*/
      color: #F4F6F9;
      height: 36px;
      margin:11px;
      padding: 0 12px;
      border-radius: 6px;
      line-height: 36px;
      font-size: 18px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      &:hover{
        background-color: #1E8F8B;
      }
    }
  }
  @media (max-width: 800px) {
    #footerBar{
      left: 0;
    }
  }
  @media (min-width: 800px) {
    #footerBar{
      left: 256px;
    }
  }
</style>
