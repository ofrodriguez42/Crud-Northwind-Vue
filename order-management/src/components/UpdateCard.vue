<template>
  <div class="container">
    <h2>Buscar y Actualizar Orden o Detalle de Orden</h2>

    <!-- Buscar Orden -->
    <div class="input-field">
      <label for="orderId">Buscar Orden por OrderID:</label>
      <input type="number" v-model="orderId" placeholder="OrderID" />
      <button @click="handleSearchOrder">Buscar Orden</button>
    </div>

    <!-- Actualizar Orden -->
    <div v-if="orderData" class="order-form">
      <h3>Actualizar Orden</h3>
      <div class="input-field" v-for="(value, key) in orderData" :key="key">
        <label :for="key">{{ key }}:</label>
        <input :id="key" v-model="orderData[key]" />
      </div>
      <button @click="handleUpdateOrder">Actualizar Orden</button>
    </div>

    <!-- Buscar Detalle de Orden -->
    <div class="input-field">
      <label for="productId">Buscar Detalle de Orden por ProductID:</label>
      <input type="number" v-model="productId" placeholder="ProductID" />
      <button @click="handleSearchOrderDetail">Buscar Detalle de Orden</button>
    </div>

    <!-- Actualizar Detalle de Orden -->
    <div v-if="orderDetailData" class="order-detail-form">
      <h3>Actualizar Detalle de Orden</h3>
      <div class="input-field" v-for="(value, key) in orderDetailData" :key="key">
        <label :for="key">{{ key }}:</label>
        <input :id="key" v-model="orderDetailData[key]" />
      </div>
      <button @click="handleUpdateOrderDetail">Actualizar Detalle de Orden</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "UpdateCard",
  data() {
    return {
      orderId: null,
      productId: null,
      orderData: null,
      orderDetailData: null,
    };
  },
  methods: {
    async handleSearchOrder() {
      const toast = useToast();
      if (!this.orderId) {
        toast.error("Por favor ingrese un OrderID válido.");
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/orders/${this.orderId}`);
        this.orderData = response.data;
        toast.success("Orden encontrada.");
      } catch (error) {
        toast.error("Error al buscar la orden.");
      }
    },
    async handleSearchOrderDetail() {
      const toast = useToast();
      if (!this.productId || !this.orderId) {
        toast.error("Por favor ingrese un OrderID y un ProductID válidos.");
        return;
      }

      try {
        const response = await axios.get(
            `http://127.0.0.1:8000/order-details/${this.orderId}/${this.productId}`
        );
        this.orderDetailData = response.data;
        toast.success("Detalle de orden encontrado.");
      } catch (error) {
        toast.error("Error al buscar el detalle de la orden.");
      }
    },
    async handleUpdateOrder() {
      const toast = useToast();
      if (!this.orderData) {
        toast.error("No hay datos para actualizar.");
        return;
      }

      try {
        await axios.put(`http://127.0.0.1:8000/orders/${this.orderId}`, this.orderData);
        toast.success("Orden actualizada con éxito.");
      } catch (error) {
        toast.error("Error al actualizar la orden.");
      }
    },
    async handleUpdateOrderDetail() {
      const toast = useToast();
      if (!this.orderDetailData) {
        toast.error("No hay datos para actualizar.");
        return;
      }

      try {
        await axios.put(
            `http://127.0.0.1:8000/order-details/${this.orderId}/${this.productId}`,
            this.orderDetailData
        );
        toast.success("Detalle de orden actualizado con éxito.");
      } catch (error) {
        toast.error("Error al actualizar el detalle de la orden.");
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles.css"; /* Importa los estilos globales */
</style>