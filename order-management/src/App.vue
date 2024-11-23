<template>
  <div class="container">
    <h1>Gestión de Órdenes y Detalles de Orden</h1>
    <CreateCard />
    <UpdateCard />
    <DeleteCard />
    <ViewCard />
  </div>
</template>

<script>
import CreateCard from './components/CreateCard.vue';
import UpdateCard from './components/UpdateCard.vue';
import DeleteCard from './components/DeleteCard.vue';
import ViewCard from './components/ViewCard.vue';

export default {
  components: {
    CreateCard,
    UpdateCard,
    DeleteCard,
    ViewCard,
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}
</style>
