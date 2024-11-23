<template>
  <div class="container">
    <h2>Crear Orden y Detalle de Orden</h2>

    <!-- Formulario de Orden -->
    <div class="card">
      <h3>Datos de la Orden</h3>
      <div class="input-field" v-for="(value, key) in orderData" :key="key">
        <label :for="key">{{ formatLabel(key) }}:</label>
        <input
            v-if="isDateField(key)"
            type="datetime-local"
            :id="key"
            v-model="orderData[key]"
        />
        <input
            v-else
            :id="key"
            v-model="orderData[key]"
            :type="getFieldType(key)"
        />
      </div>
      <button @click="handleCreateOrder" class="button save-button">Crear Orden</button>
    </div>

    <!-- Formulario de Detalle de Orden -->
    <div v-if="orderId" class="card order-detail-form">
      <h3>Datos del Detalle de Orden</h3>
      <div class="input-field" v-for="(value, key) in orderDetailData" :key="key">
        <label :for="key">{{ formatLabel(key) }}:</label>
        <input
            :id="key"
            v-model="orderDetailData[key]"
            :type="getFieldType(key)"
        />
      </div>
      <button @click="handleCreateOrderDetail" class="button save-button">Crear Detalle de Orden</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "CreateCard",
  data() {
    return {
      orderData: {
        CustomerID: '',
        EmployeeID: null,
        OrderDate: '',
        RequiredDate: '',
        ShippedDate: '',
        ShipVia: null,
        Freight: null,
        ShipName: '',
        ShipAddress: '',
        ShipCity: '',
        ShipRegion: '',
        ShipPostalCode: '',
        ShipCountry: '',
      },
      orderId: null, // ID de la orden que se utilizará para crear el detalle
      orderDetailData: {
        ProductID: null,
        UnitPrice: null,
        Quantity: null,
        Discount: null,
      },
    };
  },
  methods: {
    formatLabel(key) {
      // Función para convertir las claves de los campos en etiquetas legibles
      return key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
    },
    isDateField(key) {
      // Identifica si el campo es de tipo fecha
      return key.toLowerCase().includes('date');
    },
    getFieldType(key) {
      // Devuelve el tipo de input según la clave
      return ['Freight', 'UnitPrice', 'Quantity', 'Discount', 'ShipVia', 'EmployeeID', 'ProductID'].includes(key) ? 'number' : 'text';
    },
    formatDate(dateString) {
      // Formatea la fecha para que sea aceptada por SQL Server
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toISOString().replace('T', ' ').split('.')[0];
    },
    async handleCreateOrder() {
      const toast = useToast();

      // Formatear las fechas antes de enviar a la API
      this.orderData.OrderDate = this.formatDate(this.orderData.OrderDate);
      this.orderData.RequiredDate = this.formatDate(this.orderData.RequiredDate);
      this.orderData.ShippedDate = this.formatDate(this.orderData.ShippedDate);

      try {
        const response = await axios.post("http://127.0.0.1:8000/orders/", this.orderData);
        this.orderId = response.data.OrderID; // Guardar el OrderID para usarlo al crear el detalle de orden
        toast.success("Orden creada con éxito.");
      } catch (error) {
        toast.error("Error al crear la orden. Verifique los campos y el formato de las fechas.");
      }
    },
    async handleCreateOrderDetail() {
      const toast = useToast();
      if (!this.orderId) {
        toast.error("No se ha creado una orden aún.");
        return;
      }

      try {
        // Añadir OrderID al detalle de la orden
        this.orderDetailData.OrderID = this.orderId;

        // Enviar los datos del detalle a la API
        await axios.post("http://127.0.0.1:8000/order-details/", this.orderDetailData);
        toast.success("Detalle de orden creado con éxito.");
      } catch (error) {
        toast.error("Error al crear el detalle de la orden. Verifique los campos.");
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles.css"; /* Importa los estilos globales */

.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: translateY(-10px);
}

.input-field {
  margin-bottom: 20px;
  width: 100%;
}

.input-field label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field input {
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.input-field input:focus {
  border: 1px solid #0078d4;
  box-shadow: 0 0 8px rgba(0, 120, 212, 0.6);
}

.button {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: #fff;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
}

.button:hover {
  background: linear-gradient(to right, #3a8cfb, #00d9ff);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 120, 212, 0.4);
}

.button:active {
  transform: translateY(0);
}
</style>