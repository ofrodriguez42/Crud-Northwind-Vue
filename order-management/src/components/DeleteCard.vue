<template>
  <div class="card">
    <h2>Eliminar Orden</h2>
    <input type="number" v-model="orderId" placeholder="Buscar por OrderID" />
    <button @click="handleDeleteOrder">Eliminar Orden</button>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { deleteOrder } from '../services/apiService';

export default {
  name: 'DeleteCard',
  data() {
    return {
      orderId: null,
    };
  },
  methods: {
    async handleDeleteOrder() {
      const toast = useToast();
      try {
        await deleteOrder(this.orderId);
        toast.success('Orden eliminada con éxito');
        this.orderId = null;
      } catch (error) {
        toast.error('Error al eliminar la orden');
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles.css"; /* Importa los estilos globales */
</style>