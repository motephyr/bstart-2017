<template>
  <div>
    <vue-form :fields="fields"
    mode="edit"
    model="user"
    :api-url="apiUrl"></vue-form>
    <button @click="lock_user(params.id)">啟用/停用</button>
    <button @click="reset_pwdResetToken(params.id)">更新驗證碼</button>

    <button @click="delete_user(params.id)">Delete</button>
  </div>
</template>

<script>
import VueForm from '../../../components/VueForm'
import axios from '~/plugins/axios'

// fields definition
var tableColumns = [
  {
    name: '姓名',
    type: 'string'
  },
  {
    name: '電子郵件',
    type: 'string'
  },
  {
    name: '帳號',
    type: 'string'
  },
  {
    name: '電話',
    type: 'string'
  },
  {
    name: '行動',
    type: 'string'
  },
  {
    name: '縣市',
    type: 'string'
  },
  {
    name: 'pwdResetToken',
    type: 'string'
  }
]

export default {
  name: 'users',
  components: {
    VueForm
  },
  asyncData ({ params, error }) {
    return {
      params: params,
      apiUrl: '/api/users/' + params.id
    }
  },
  data () {
    return {
      fields: tableColumns
    }
  },
  methods: {
    delete_user (id) {
      axios.delete('/api/users/' + id).then((res) => {
        this.$router.replace('/users/list?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    lock_user (id) {
      axios.patch('/api/users/lock/' + id).then((res) => {
        this.$router.replace('/users/list?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    guid () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    reset_pwdResetToken(id) {
      axios.patch('/api/users/' + id, {_id: id, pwdResetToken: this.guid(), pwdResetTokenExpires: (new Date('9999')).toISOString()}).then((res) => {
        this.$router.replace('/users/edit/' + id + '?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
