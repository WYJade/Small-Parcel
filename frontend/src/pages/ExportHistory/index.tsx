import { useState } from 'react'
import { Layout, Table, Button, Tag, Space, Tooltip, message, Modal } from 'antd'
import { DownloadOutlined, DeleteOutlined, ReloadOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import './index.css'

const { Content } = Layout

// 导出任务状态类型
type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'expired'

// 导出任务接口
interface ExportTask {
  id: string
  fileName: string
  fileType: 'CSV' | 'Excel'
  status: ExportStatus
  totalRows: number
  createdAt: string
  completedAt: string | null
  downloadUrl: string | null
  createdBy: string
  queryConditions: string
}

// 模拟导出历史数据
const mockExportTasks: ExportTask[] = [
  {
    id: 'EXP-2026-001',
    fileName: 'LSO-SmallParcel(Archived)-20260115 (3).xlsx',
    fileType: 'Excel',
    status: 'completed',
    totalRows: 15234,
    createdAt: '2026-01-15 10:30:00',
    completedAt: '2026-01-15 10:32:15',
    downloadUrl: '/downloads/LSO-SmallParcel(Archived)-20260115 (3).xlsx',
    createdBy: 'Michael Johnson',
    queryConditions: 'Status: Delivered, Date Range: 2023-01-01 to 2023-12-31'
  },
  {
    id: 'EXP-2026-002',
    fileName: 'LSO-SmallParcel(Archived)-20260116 (7).xlsx',
    fileType: 'Excel',
    status: 'completed',
    totalRows: 8567,
    createdAt: '2026-01-16 14:20:00',
    completedAt: '2026-01-16 14:21:30',
    downloadUrl: '/downloads/LSO-SmallParcel(Archived)-20260116 (7).xlsx',
    createdBy: 'Sarah Williams',
    queryConditions: 'Service Type: Express, Service Center: Columbus'
  },
  {
    id: 'EXP-2026-003',
    fileName: 'LSO-SmallParcel(Archived)-20260110 (2).xlsx',
    fileType: 'Excel',
    status: 'expired',
    totalRows: 23456,
    createdAt: '2026-01-10 09:15:00',
    completedAt: '2026-01-10 09:18:45',
    downloadUrl: null,
    createdBy: 'David Brown',
    queryConditions: 'Status: All, Date Range: 2022-01-01 to 2022-12-31'
  },
  {
    id: 'EXP-2026-004',
    fileName: 'LSO-SmallParcel(Archived)-20260117 (5).xlsx',
    fileType: 'Excel',
    status: 'processing',
    totalRows: 125000,
    createdAt: '2026-01-17 16:45:00',
    completedAt: null,
    downloadUrl: null,
    createdBy: 'Jennifer Davis',
    queryConditions: 'All archived orders from 2020-2023'
  },
  {
    id: 'EXP-2026-005',
    fileName: 'LSO-SmallParcel(Archived)-20260117 (1).xlsx',
    fileType: 'Excel',
    status: 'failed',
    totalRows: 0,
    createdAt: '2026-01-17 11:30:00',
    completedAt: null,
    downloadUrl: null,
    createdBy: 'Robert Miller',
    queryConditions: 'Invalid query parameters'
  }
]

function ExportHistoryPage() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<ExportTask[]>(mockExportTasks)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    total: mockExportTasks.length,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `Total ${total} tasks`
  })

  // 状态标签渲染
  const renderStatusTag = (status: ExportStatus) => {
    const statusConfig = {
      pending: { color: 'default', icon: <ClockCircleOutlined />, text: 'Pending' },
      processing: { color: 'processing', icon: <ClockCircleOutlined />, text: 'Processing' },
      completed: { color: 'success', icon: <CheckCircleOutlined />, text: 'Completed' },
      failed: { color: 'error', icon: <CloseCircleOutlined />, text: 'Failed' },
      expired: { color: 'warning', icon: <ExclamationCircleOutlined />, text: 'Expired' }
    }
    const config = statusConfig[status]
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    )
  }

  // 下载文件
  const handleDownload = (task: ExportTask) => {
    if (task.status === 'completed' && task.downloadUrl) {
      message.success(`Downloading ${task.fileName}...`)
      // TODO: 实现实际下载逻辑
      window.open(task.downloadUrl, '_blank')
    } else if (task.status === 'expired') {
      message.warning('This file has expired and is no longer available for download')
    } else {
      message.info('File is not ready for download yet')
    }
  }

  // 删除任务
  const handleDelete = (taskId: string) => {
    Modal.confirm({
      title: 'Delete Export Task',
      content: 'Are you sure you want to delete this export task? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setTasks(tasks.filter(t => t.id !== taskId))
        message.success('Export task deleted successfully')
      }
    })
  }

  // 刷新列表
  const handleRefresh = () => {
    message.info('Refreshing export history...')
    // TODO: 实现刷新逻辑
  }

  // 表格列定义
  const columns: ColumnsType<ExportTask> = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      fixed: 'left'
    },
    {
      title: 'File Name',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 300,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ 
            display: 'inline-block', 
            maxWidth: '280px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {text}
          </span>
        </Tooltip>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: renderStatusTag,
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Processing', value: 'processing' },
        { text: 'Expired', value: 'expired' },
        { text: 'Failed', value: 'failed' },
        { text: 'Pending', value: 'pending' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Total Rows',
      dataIndex: 'totalRows',
      key: 'totalRows',
      width: 120,
      render: (rows) => rows.toLocaleString(),
      sorter: (a, b) => a.totalRows - b.totalRows
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    },
    {
      title: 'Completed At',
      dataIndex: 'completedAt',
      key: 'completedAt',
      width: 180,
      render: (text) => text || '-'
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 180
    },
    {
      title: 'Query Conditions',
      dataIndex: 'queryConditions',
      key: 'queryConditions',
      width: 300,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ 
            display: 'inline-block', 
            maxWidth: '280px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {text}
          </span>
        </Tooltip>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title={record.status === 'completed' ? 'Download' : record.status === 'expired' ? 'File expired' : 'Not ready'}>
            <Button
              type="link"
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(record)}
              disabled={record.status !== 'completed'}
              size="small"
            >
              Download
            </Button>
          </Tooltip>
          <Tooltip title="Delete task">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              size="small"
            />
          </Tooltip>
        </Space>
      )
    }
  ]

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination)
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Content style={{ background: '#fff' }}>
        {/* 页面标题和操作 */}
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px 0' }}>
                Export History
              </h1>
              <p style={{ color: '#666', margin: 0 }}>
                View and manage your export tasks. Download completed files or check task status.
              </p>
            </div>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                Refresh
              </Button>
              <Button type="primary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Space>
          </div>
        </div>

        {/* 统计信息 */}
        <div style={{ padding: '16px 24px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
          <Space size="large">
            <div>
              <span style={{ color: '#666' }}>Total Tasks: </span>
              <strong style={{ fontSize: '18px', color: '#1890ff' }}>{tasks.length}</strong>
            </div>
            <div>
              <span style={{ color: '#666' }}>Completed: </span>
              <strong style={{ fontSize: '18px', color: '#52c41a' }}>
                {tasks.filter(t => t.status === 'completed').length}
              </strong>
            </div>
            <div>
              <span style={{ color: '#666' }}>Processing: </span>
              <strong style={{ fontSize: '18px', color: '#1890ff' }}>
                {tasks.filter(t => t.status === 'processing').length}
              </strong>
            </div>
            <div>
              <span style={{ color: '#666' }}>Expired: </span>
              <strong style={{ fontSize: '18px', color: '#faad14' }}>
                {tasks.filter(t => t.status === 'expired').length}
              </strong>
            </div>
            <div>
              <span style={{ color: '#666' }}>Failed: </span>
              <strong style={{ fontSize: '18px', color: '#ff4d4f' }}>
                {tasks.filter(t => t.status === 'failed').length}
              </strong>
            </div>
          </Space>
        </div>

        {/* 提示信息 */}
        <div style={{ padding: '16px 24px', background: '#e6f7ff', borderBottom: '1px solid #91d5ff' }}>
          <Space>
            <ExclamationCircleOutlined style={{ color: '#1890ff' }} />
            <span style={{ color: '#1890ff' }}>
              Export files are available for download for 7 days after completion. Expired files will be automatically deleted.
            </span>
          </Space>
        </div>

        {/* 导出任务表格 */}
        <div style={{ padding: '24px' }}>
          <Table
            columns={columns}
            dataSource={tasks}
            rowKey="id"
            pagination={pagination}
            onChange={handleTableChange}
            scroll={{ x: 1600 }}
            bordered
          />
        </div>
      </Content>
    </Layout>
  )
}

export default ExportHistoryPage
