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
    name: 'name',
    type: 'string'
  },
  {
    name: 'email',
    type: 'string'
  },
  {
    name: 'account',
    type: 'string'
  },
  {
    name: 'phone',
    type: 'string'
  },
  {
    name: 'mobile',
    type: 'string'
  },
  {
    name: 'area',
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
