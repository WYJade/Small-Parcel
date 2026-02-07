import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderState {
  orders: any[]
  loading: boolean
  error: string | null
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setOrders, setLoading, setError } = orderSlice.actions
export default orderSlice.reducer
