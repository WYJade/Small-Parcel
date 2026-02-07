// 订单数据映射工具

import { Order, OrderRow, OrderStatus } from '../types/order'

/**
 * 将数据库行转换为订单对象
 */
export function mapRowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    airbillNo: row.airbill_no,
    customerName: row.customer_name,
    billingRef: row.billing_ref,
    status: row.status as OrderStatus,
    serviceType: row.service_type,
    serviceCenter: row.service_center,
    fromCity: row.from_city,
    toCity: row.to_city,
    toAttn: row.to_attn,
    toZip: row.to_zip,
    createTime: row.create_time,
    lastOperationTime: row.last_operation_time,
    archiveFlag: row.archive_flag as 0 | 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

/**
 * 将订单对象转换为数据库行
 */
export function mapOrderToRow(order: Partial<Order>): Partial<OrderRow> {
  const row: Partial<OrderRow> = {}
  
  if (order.id !== undefined) row.id = order.id
  if (order.airbillNo) row.airbill_no = order.airbillNo
  if (order.customerName) row.customer_name = order.customerName
  if (order.billingRef) row.billing_ref = order.billingRef
  if (order.status) row.status = order.status
  if (order.serviceType) row.service_type = order.serviceType
  if (order.serviceCenter) row.service_center = order.serviceCenter
  if (order.fromCity) row.from_city = order.fromCity
  if (order.toCity) row.to_city = order.toCity
  if (order.toAttn) row.to_attn = order.toAttn
  if (order.toZip) row.to_zip = order.toZip
  if (order.createTime) row.create_time = order.createTime
  if (order.lastOperationTime !== undefined) row.last_operation_time = order.lastOperationTime
  if (order.archiveFlag !== undefined) row.archive_flag = order.archiveFlag
  
  return row
}

/**
 * 验证订单数据完整性
 */
export function validateOrder(order: Partial<Order>): boolean {
  if (!order.airbillNo || !order.customerName) {
    return false
  }
  return true
}
