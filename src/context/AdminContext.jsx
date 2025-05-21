import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchAdminData, saveCategory, saveLink } from '../services/adminService';

const AdminContext = createContext();

const initialState = {
  categories: [],
  subCategories: [],
  links: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
        subCategories: action.payload.subCategories,
        links: action.payload.links,
        pagination: action.payload.pagination || state.pagination
      };

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SET_PAGE':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload
        }
      };

    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };

    default:
      return state;
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await fetchAdminData(state.pagination);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  useEffect(() => {
    loadData();
  }, [state.pagination.page]);

  const value = {
    state,
    dispatch,
    actions: {
      loadData,
      handlePageChange,
      saveCategory: async (categoryData) => {
        dispatch({ type: 'FETCH_START' });
        try {
          const savedCategory = await saveCategory(categoryData);
          dispatch({ type: 'ADD_CATEGORY', payload: savedCategory });
          return savedCategory;
        } catch (error) {
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
          throw error;
        }
      },
      // Outras ações...
    }
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);