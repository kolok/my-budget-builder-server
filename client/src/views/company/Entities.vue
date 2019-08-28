<template>
  <div>
    <h1 class="Content__Head1">Entities</h1>
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
