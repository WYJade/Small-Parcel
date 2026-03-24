// 订单类型定义

// 订单状态枚举
export enum OrderStatus {
  PENDING = 'Pending',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  RETURNED = 'Returned'
}

// 订单接口
export interface Order {
  id: number
  airbillNo: string
  customerName: string
  billingRef: string
  status: OrderStatus
  serviceType: string
  serviceCenter: string
  fromCity: string
  toCity: string
  toAttn: string
  toZip: string
  createTime: string
  lastOperationTime: string
  archiveFlag: 0 | 1
}

// 过滤器配置
export interface FilterConfig {
  status?: OrderStatus[]
  serviceType?: string[]
  serviceCenter?: string[]
  dateRange?: {
    start: string
    end: string
  }
}

// 分页配置
export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
}

// 用户权限
export interface UserPermissions {
  role: string
  canViewArchivedOrders: boolean
  canExportData: boolean
}

// 导出任务
export interface ExportTask {
  taskId: string
  estimatedRows: number
  requiresConfirmation: boolean
  status: 'pending' | 'processing' | 'completed' | 'failed'
  downloadUrl?: string
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

// 订单列表响应
export interface OrderListResponse {
  orders: Order[]
  total: number
  page: number
  pageSize: number
}

// 查询参数
export interface OrderQueryParams {
  page?: number
  pageSize?: number
  includeArchived?: boolean
  search?: string
  filters?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// ===== Weather Delay 相关类型和常量 =====

// 不可标记 Weather Delay 的状态列表
export const INELIGIBLE_STATUSES_FOR_WEATHER_DELAY = [
  'Delivered',
  'Discarded',
  'Lost',
  'Return to Sender',
  'Created',
] as const;

// Weather Delay 状态常量
export const WEATHER_DELAY_STATUS = {
  status: 'Delay Exception',
  statusCode: 'Z',
  subStatus: 'Weather Delay',
  scanCode: 'WX1',
} as const;

/**
 * 校验订单是否符合 Weather Delay 标记条件
 */
export function isEligibleForWeatherDelay(status: string): boolean {
  return !(INELIGIBLE_STATUSES_FOR_WEATHER_DELAY as readonly string[]).includes(status);
}

/**
 * 批量校验，返回不符合条件的订单
 */
export function findIneligibleOrders<T extends { status: string }>(orders: T[]): T[] {
  return orders.filter(order => !isEligibleForWeatherDelay(order.status));
}
