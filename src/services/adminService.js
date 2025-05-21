import { API_BASE_URL } from '../config';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }
  return response.json();
};

export const fetchAdminData = async (pagination) => {
  const { page, limit } = pagination;
  const response = await fetch(
    `${API_BASE_URL}/api/links?page=${page}&limit=${limit}`
  );
  return handleResponse(response);
};

export const saveCategory = async (categoryData) => {
  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    method: categoryData.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(categoryData)
  });
  return handleResponse(response);
};

export const deleteLink = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/links/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return handleResponse(response);
};