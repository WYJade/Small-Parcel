import { useState } from 'react'
import { Layout, Input, Button, Tag, Table, Space, DatePicker, Select, message, Tabs, Menu, Dropdown } from 'antd'
import { SearchOutlined, ExportOutlined, HistoryOutlined, FileSearchOutlined, DownOutlined, InboxOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { Order, OrderStatus } from '../../types/order'
import './index.css'

const { Sider, Content, Header } = Layout
const { RangePicker } = DatePicker

// 模拟已归档订单数据
const mockArchivedOrders: Order[] = [
  {
    id: 101,
    airbillNo: 'AWB001234501',
    customerName: 'OMEGA HEALTHCARE',
    billingRef: 'REF-2023-101',
    status: OrderStatus.DELIVERED,
    serviceType: 'LTD Ground',
    serviceCenter: 'Columbus',
    fromCity: 'SAN ANTONIO',
    toCity: 'AGUILA O CAMPBELL',
    toAttn: 'KYLE',
    toZip: '76633',
    createTime: '2023-05-15 08:30:00',
    lastOperationTime: '2023-05-20 14:25:00',
    archiveFlag: 1
  },
  {
    id: 102,
    airbillNo: 'AWB001234502',
    customerName: 'OMEGA HEALTHCARE',
    billingRef: 'REF-2023-102',
    status: OrderStatus.DELIVERED,
    serviceType: 'LTD Ground',
    serviceCenter: 'Columbus',
    fromCity: 'SAN ANTONIO',
    toCity: 'SOCKET O GARCIA',
    toAttn: 'KYLE',
    toZip: '76633',
    createTime: '2023-06-10 09:15:00',
    lastOperationTime: '2023-06-15 16:40:00',
    archiveFlag: 1
  }
]

type TabType = 'small-parcel' | 'ltl-ftl' | 'international'

function ArchivedOrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('small-parcel')
  const [searchValue, setSearchValue] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [selectedServiceType, setSelectedServiceType] = useState<string | undefined>(undefined)
  const [dateRange, setDateRange] = useState<any>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    total: 2,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `Total ${total} items`
  })

  // 表格列定义（与 Small Parcel 页面完全一致）
  const columns: ColumnsType<Order> = [
    {
      title: 'AIRBILL NO',
      dataIndex: 'airbillNo',
      key: 'airbillNo',
      width: 150,
      fixed: 'left'
    },
    {
      title: 'CUSTOMER NAME',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 180
    },
    {
      title: 'BILLING REF',
      dataIndex: 'billingRef',
      key: 'billingRef',
      width: 150
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: OrderStatus) => {
        const colorMap: Record<OrderStatus, string> = {
          [OrderStatus.PENDING]: 'orange',
          [OrderStatus.IN_TRANSIT]: 'blue',
          [OrderStatus.DELIVERED]: 'green',
          [OrderStatus.CANCELLED]: 'red',
          [OrderStatus.RETURNED]: 'purple'
        }
        return <Tag color={colorMap[status]}>{status}</Tag>
      }
    },
    {
      title: 'SERVICE TYPE',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: 130
    },
    {
      title: 'SERVICE CENTER',
      dataIndex: 'serviceCenter',
      key: 'serviceCenter',
      width: 150
    },
    {
      title: 'FROM CITY',
      dataIndex: 'fromCity',
      key: 'fromCity',
      width: 130
    },
    {
      title: 'TO CITY',
      dataIndex: 'toCity',
      key: 'toCity',
      width: 130
    },
    {
      title: 'TO ATTN',
      dataIndex: 'toAttn',
      key: 'toAttn',
      width: 150
    },
    {
      title: 'TO ZIP',
      dataIndex: 'toZip',
      key: 'toZip',
      width: 100
    },
    {
      title: 'CREATE TIME',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: 'LAST OPERATION TIME',
      dataIndex: 'lastOperationTime',
      key: 'lastOperationTime',
      width: 180
    }
  ]

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination)
  }

  const handleSearch = () => {
    setHasSearched(true)
    message.info('Searching archived orders...')
  }

  const handleExport = () => {
    message.success('Export task created successfully')
  }

  const handleViewExportHistory = () => {
    navigate('/export-history')
  }

  const handleReset = () => {
    setSearchValue('')
    setSelectedStatus(undefined)
    setSelectedServiceType(undefined)
    setDateRange(null)
    setHasSearched(false)
    message.info('Filters reset')
  }

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabType)
    // 切换标签时重置搜索状态
    if (key !== 'small-parcel') {
      setHasSearched(false)
      setSearchValue('')
      setSelectedStatus(undefined)
      setSelectedServiceType(undefined)
      setDateRange(null)
    }
  }

  const tabItems = [
    {
      key: 'small-parcel',
      label: (
        <span>
          Small Parcel <Tag color="blue" style={{ marginLeft: 8 }}>2</Tag>
        </span>
      )
    },
    {
      key: 'ltl-ftl',
      label: (
        <span>
          LTL / FTL <Tag color="default" style={{ marginLeft: 8 }}>0</Tag>
        </span>
      )
    },
    {
      key: 'international',
      label: (
        <span>
          International Freight <Tag color="default" style={{ marginLeft: 8 }}>0</Tag>
        </span>
      )
    }
  ]

  // 空状态组件
  const EmptyState = () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '400px',
      padding: '60px 20px'
    }}>
      <FileSearchOutlined style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '24px' }} />
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#262626', marginBottom: '12px' }}>
        Ready to Search Archived Orders
      </h3>
      <p style={{ fontSize: '14px', color: '#8c8c8c', textAlign: 'center', maxWidth: '480px', lineHeight: '1.6', marginBottom: '24px' }}>
        Please enter your search criteria above and click the "Search" button to view archived orders. 
        You can search by Airbill Number, Customer, Billing Reference, or use filters to narrow down your results.
      </p>
      <Button type="primary" icon={<SearchOutlined />} size="large" onClick={handleSearch}>
        Start Searching
      </Button>
    </div>
  )

  // 根据标签页决定是否显示数据
  const shouldShowData = activeTab === 'small-parcel' || hasSearched

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header style={{ background: '#001529', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* OMS Logo 和标题 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: '#7c3aed', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#fff',
              fontWeight: 'bold'
            }}>
              O
            </div>
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>OMS</span>
          </div>
          
          {/* LSO 下拉选择器 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ color: '#999', fontSize: '12px' }}>LSO: Sarah Ha...</div>
            <Dropdown
              menu={{
                items: [
                  { key: 'lso_001', label: 'LSO Sarah Ha...' },
                  { key: 'lso_002', label: 'LSO John Do...' },
                  { key: 'lso_003', label: 'LSO Mike Wi...' }
                ]
              }}
            >
              <Button type="text" size="small" style={{ color: '#999', padding: '0 4px', minWidth: 'auto' }}>
                <DownOutlined style={{ fontSize: '10px' }} />
              </Button>
            </Dropdown>
            <div style={{ color: '#999', fontSize: '12px' }}>3820 Auburn Ro...</div>
          </div>
          
          {/* Logistics 按钮 */}
          <Button 
            type="primary" 
            size="small"
            style={{ 
              background: '#7c3aed', 
              borderColor: '#7c3aed',
              borderRadius: '4px',
              fontSize: '12px',
              height: '28px'
            }}
          >
            Logistics
          </Button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined style={{ color: '#999' }} />}
            style={{ width: 200, height: '28px', fontSize: '12px' }}
            suffix={
              <Space size={4}>
                <span style={{ color: '#999', fontSize: '11px' }}>⌘+K</span>
                <span style={{ color: '#999', fontSize: '11px' }}>Y</span>
              </Space>
            }
          />
        </div>
      </Header>
      
      <Layout>
        {/* 左侧菜单 */}
        <Sider width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px 12px' }}>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>Logistics</div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={['archived-orders']}
            style={{ borderRight: 0, fontSize: '13px' }}
            items={[
              {
                key: 'small-parcel',
                icon: <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  background: '#7c3aed', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#fff'
                }}>📦</div>,
                label: 'Small Parcel',
                onClick: () => navigate('/')
              },
              {
                key: 'archived-orders',
                icon: <InboxOutlined />,
                label: 'Archived Orders',
                onClick: () => navigate('/archived-orders')
              }
            ]}
          />
        </Sider>
        
        <Layout>
          <Content style={{ background: '#fff' }}>
            {/* 页面标题和操作按钮 */}
            <div style={{ padding: '20px 24px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>
                    Archived Orders
                  </h1>
                  <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>
                    Query and export archived orders with advanced filtering options.
                  </p>
                </div>
                <Space>
                  <Button 
                    icon={<ExportOutlined />}
                    onClick={handleExport}
                    disabled={!shouldShowData}
                  >
                    Export
                  </Button>
                  <Button 
                    icon={<HistoryOutlined />} 
                    onClick={handleViewExportHistory}
                  >
                    Export History
                  </Button>
                </Space>
              </div>

              {/* 标签页 - 仿照 Sales Orders 样式 */}
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                items={tabItems}
                style={{ marginBottom: 0 }}
              />
            </div>

            {/* 查询条件 - 所有条件放在一行 */}
            <div style={{ padding: '12px 24px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              <Space size="middle" wrap style={{ width: '100%' }}>
                <Input
                  placeholder="Search by Airbill No, Customer, or Billing Ref..."
                  prefix={<SearchOutlined />}
                  style={{ width: 350, fontSize: '13px' }}
                  size="small"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onPressEnter={handleSearch}
                />
                
                <Select
                  placeholder="Status"
                  style={{ width: 150 }}
                  size="small"
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  allowClear
                >
                  <Select.Option value="Pending">Pending</Select.Option>
                  <Select.Option value="In Transit">In Transit</Select.Option>
                  <Select.Option value="Delivered">Delivered</Select.Option>
                  <Select.Option value="Cancelled">Cancelled</Select.Option>
                  <Select.Option value="Returned">Returned</Select.Option>
                </Select>

                <Select
                  placeholder="Service Type"
                  style={{ width: 150 }}
                  size="small"
                  value={selectedServiceType}
                  onChange={setSelectedServiceType}
                  allowClear
                >
                  <Select.Option value="Express">Express</Select.Option>
                  <Select.Option value="Standard">Standard</Select.Option>
                  <Select.Option value="LTD Ground">LTD Ground</Select.Option>
                </Select>

                <RangePicker
                  placeholder={['Archive Start', 'Archive End']}
                  style={{ width: 280 }}
                  size="small"
                  value={dateRange}
                  onChange={setDateRange}
                />

                <Button type="primary" size="small" icon={<SearchOutlined />} onClick={handleSearch}>
                  Search
                </Button>
                <Button size="small" onClick={handleReset}>
                  Reset
                </Button>
              </Space>
            </div>

            {/* 订单表格或空状态 */}
            <div style={{ padding: '0' }}>
              {shouldShowData ? (
                <Table
                  columns={columns}
                  dataSource={mockArchivedOrders}
                  rowKey="id"
                  pagination={pagination}
                  onChange={handleTableChange}
                  scroll={{ x: 1800 }}
                  size="small"
                  bordered={false}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default ArchivedOrdersPage
