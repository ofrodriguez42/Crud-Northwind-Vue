<template>
  <div class="card">
    <h2>Consultar Orden</h2>
    <input type="number" v-model="orderId" placeholder="Buscar por OrderID" />
    <button @click="handleSearchOrder">Buscar Orden</button>
    <div v-if="orderData">
      <h3>Datos de la Orden</h3>
      <pre>{{ orderData }}</pre>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { getOrderById } from '../services/apiService';

export default {
  name: 'ViewCard',
  data() {
    return {
      orderId: null,
      orderData: null,
    };
  },
  methods: {
    async handleSearchOrder() {
      const toast = useToast();
      try {
        const response = await getOrderById(this.orderId);
        this.orderData = response.data;
        toast.success('Orden encontrada');
      } catch (error) {
        toast.error('Orden no encontrada');
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles.css"; /* Importa los estilos globales */
</style>