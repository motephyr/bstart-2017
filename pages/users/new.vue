<template>
  <div>
    <vue-form :fields="fields"
    mode="new"
    model="user"
    api-url="/api/users/"></vue-form>
  </div>
</template>

<script>
import VueForm from '../../components/VueForm'
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
  }
]

export default {
  name: 'users',
  components: {
    VueForm
  },
  data () {
    return {
      fields: tableColumns
    }
  }
}
</script>
