<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <vue-form :fields="fields"
        mode="new"
        model="user"
        api-url="/api/users/"></vue-form>
      </div>
    </div>
    <div id="footerBar">
      <nuxt-link class="ftBt" to="/users/list"><i class="icon-reply"></i> 返回</nuxt-link>
      <div class="ftBt"  @click="addYear()"><i class="icon-loupe"></i> 新增年度計畫</div>
    </div>
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
      pagetitle: "tableColumns",
      fields: tableColumns
    }
  }
}
</script>
