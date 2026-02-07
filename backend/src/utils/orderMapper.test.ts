import { describe, it, expect } from 'vitest'
import { mapRowToOrder, mapOrderToRow, validateOrder } from './orderMapper'
import { Order, OrderRow, OrderStatus } from '../types/order'

describe('orderMapper', () => {
  describe('mapRowToOrder', () => {
    it('should correctly map database row to order object', () => {
      const row: OrderRow = {
        id: 1,
        airbill_no: 'SFF7JY0P',
        customer_name: 'SHIELD HEALTH',
        billing_ref: '01997636',
        status: 'Delivered',
        service_type: 'LSO Ground®',
        service_center: 'SAT',
        from_city: 'Carrollton',
        to_city: 'CONVERSE',
        to_attn: 'JALITZA RAMOS',
        to_zip: '78109',
        create_time: new Date('2024-02-05T10:00:00Z'),
        last_operation_time: new Date('2024-03-05T09:00:00Z'),
        archive_flag: 0,
        created_at: new Date('2024-02-05T10:00:00Z'),
        updated_at: new Date('2024-02-05T10:00:00Z')
      }

      const order = mapRowToOrder(row)

      expect(order.id).toBe(1)
      expect(order.airbillNo).toBe('SFF7JY0P')
      expect(order.customerName).toBe('SHIELD HEALTH')
      expect(order.billingRef).toBe('01997636')
      expect(order.status).toBe(OrderStatus.DELIVERED)
      expect(order.archiveFlag).toBe(0)
    })

    it('should handle null last_operation_time', () => {
      const row: OrderRow = {
        id: 1,
        airbill_no: 'TEST001',
        customer_name: 'Test Customer',
        billing_ref: '12345',
        status: 'Pending',
        service_type: 'Standard',
        service_center: 'NYC',
        from_city: 'New York',
        to_city: 'Boston',
        to_attn: 'John Doe',
        to_zip: '02101',
        create_time: new Date(),
        last_operation_time: null,
        archive_flag: 0,
        created_at: new Date(),
        updated_at: new Date()
      }

      const order = mapRowToOrder(row)

      expect(order.lastOperationTime).toBeNull()
    })
  })

  describe('mapOrderToRow', () => {
    it('should correctly map order object to database row', () => {
      const order: Partial<Order> = {
        id: 1,
        airbillNo: 'SFF7JY0P',
        customerName: 'SHIELD HEALTH',
        billingRef: '01997636',
        status: OrderStatus.DELIVERED,
        archiveFlag: 0
      }

      const row = mapOrderToRow(order)

      expect(row.id).toBe(1)
      expect(row.airbill_no).toBe('SFF7JY0P')
      expect(row.customer_name).toBe('SHIELD HEALTH')
      expect(row.billing_ref).toBe('01997636')
      expect(row.status).toBe('Delivered')
      expect(row.archive_flag).toBe(0)
    })

    it('should handle partial order data', () => {
      const order: Partial<Order> = {
        airbillNo: 'TEST001',
        customerName: 'Test Customer'
      }

      const row = mapOrderToRow(order)

      expect(row.airbill_no).toBe('TEST001')
      expect(row.customer_name).toBe('Test Customer')
      expect(row.id).toBeUndefined()
    })
  })

  describe('validateOrder', () => {
    it('should return true for valid order with required fields', () => {
      const order: Partial<Order> = {
        airbillNo: 'SFF7JY0P',
        customerName: 'SHIELD HEALTH'
      }

      expect(validateOrder(order)).toBe(true)
    })

    it('should return false when airbillNo is missing', () => {
      const order: Partial<Order> = {
        customerName: 'SHIELD HEALTH'
      }

      expect(validateOrder(order)).toBe(false)
    })

    it('should return false when customerName is missing', () => {
      const order: Partial<Order> = {
        airbillNo: 'SFF7JY0P'
      }

      expect(validateOrder(order)).toBe(false)
    })

    it('should return false when both required fields are missing', () => {
      const order: Partial<Order> = {
        status: OrderStatus.PENDING
      }

      expect(validateOrder(order)).toBe(false)
    })
  })
})
