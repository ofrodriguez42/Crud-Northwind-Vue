import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const createOrder = (orderData) => {
    return axios.post(`${API_BASE_URL}/orders/`, orderData);
};

export const createOrderDetail = (orderDetailData) => {
    return axios.post(`${API_BASE_URL}/order-details/`, orderDetailData);
};

export const getOrderById = (orderId) => {
    return axios.get(`${API_BASE_URL}/orders/${orderId}`);
};

export const getOrderDetailById = (orderId, productId) => {
    return axios.get(`${API_BASE_URL}/order-details/${orderId}/${productId}`);
};

export const updateOrder = (orderId, orderData) => {
    return axios.put(`${API_BASE_URL}/orders/${orderId}`, orderData);
};

export const updateOrderDetail = (orderId, productId, orderDetailData) => {
    return axios.put(`${API_BASE_URL}/order-details/${orderId}/${productId}`, orderDetailData);
};

export const deleteOrder = (orderId) => {
    return axios.delete(`${API_BASE_URL}/orders/${orderId}`);
};

export const deleteOrderDetail = (orderId, productId) => {
    return axios.delete(`${API_BASE_URL}/order-details/${orderId}/${productId}`);
};
