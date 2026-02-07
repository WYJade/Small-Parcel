// 后端订单类型定义

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
  createTime: Date
  lastOperationTime: Date | null
  archiveFlag: 0 | 1
  createdAt?: Date
  updatedAt?: Date
}

// 数据库行类型
export interface OrderRow {
  id: number
  airbill_no: string
  customer_name: string
  billing_ref: string
  status: string
  service_type: string
  service_center: string
  from_city: string
  to_city: string
  to_attn: string
  to_zip: string
  create_time: Date
  last_operation_time: Date | null
  archive_flag: number
  created_at: Date
  updated_at: Date
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

// 用户上下文
export interface UserContext {
  userId: string
  role: string
  permissions: string[]
}

// 导出参数
export interface ExportParams {
  includeArchived: boolean
  filters?: FilterConfig
  search?: string
  format: 'csv' | 'excel'
}
