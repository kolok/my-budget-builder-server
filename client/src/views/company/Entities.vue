<template>
  <div>
    <h1>Entities 1</h1>
    <Row :gutter="30">
      <Col />
        <EntityList/>
      </Col>
    </Row>
  </div>
</template>

<script>
import EntityList from '../../components/Entity/List.vue'

export default {
  components: {
    EntityList
  }
}
</script>
