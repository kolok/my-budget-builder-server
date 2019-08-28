<template>
  <div>
    <div
      v-for="item in entity.offices"
      :key="item.id"
      style="min-width:400px;min-height:150px;float:left;padding:25px;"
    >
      <el-card>
        <div
          slot="header"
          class="Card__Header"
        >
          <span>{{ item.name }}</span>
          <div style="float: right; padding: 3px 0">
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-delete"
              @click="handleDeleteOffice(item)"
            />
          </div>
          <EditOffice :officeForm="item"/>
        </div>
        <div
          class="Card__Body"
        >
          <ul style="list-style: none;">
            <li style="font:14px;font-style:bold;">
              {{ item.name }}
            </li>
            <li>{{ item.address }}</li>
            <li>{{ item.zipcode }}&nbsp;{{ item.town }}</li>
          </ul>
        </div>
      </el-card>
    </div>
    <div
      style="min-width:400px;min-height:150px;float:left;padding:25px;"
    >
      <CreateOffice :entityID="entity.id" :countryID="entity.country_id"/>
    </div>
  </div>
</template>

<script>
  import CreateOffice from '../../components/entity/CreateOffice.vue'
  import EditOffice from '../../components/entity/EditOffice.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: {
      entity: {
        type: Object,
        required: true
      }
    },
    components: {
      CreateOffice,
      EditOffice
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      ...mapActions(['deleteOffice']),
      handleDeleteOffice(office) {
        this.$confirm('Do you really want to delete this Office?', 'Warning', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.deleteOffice(office.id)
        })
      }
    }
  }
</script>
