<template>
  <div>
    <h1>Entities</h1>
    <Row :gutter="30">
      <Col />
      <EntityList />
      </Col>
      <Col />
      <EntityCreate />
      </Col>
    </Row>
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
