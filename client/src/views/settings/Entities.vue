<template>
  <div>
    <EntityList />
    <EntityCreate />
  </div>
</template>

<script>
  import EntityList from '../../components/entity/List.vue'
  import EntityCreate from '../../components/entity/Create.vue'

  export default {
    components: {
      EntityList,
      EntityCreate
    }
  }
</script>
