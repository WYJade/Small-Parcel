import { useState } from 'react'
import { Layout, Input, Button, Table, Space, Dropdown, Menu, Tag } from 'antd'
import { SearchOutlined, FilterOutlined, SettingOutlined, DownOutlined, InboxOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import './index.css'

const { Sider, Content, Header } = Layout

// 订单数据接口
interface SmallParcelOrder {
  airbillNo: string
  customerName: string
  billingRef: string
  status: string
  serviceType: string
  serviceCenter: string
  fromCity: string
  toCity: string
  toAttn: string
  toZip: string
  createTime: string
  lastOperationTime: string
}

// 模拟数据 - 与图片完全一致
const mockOrders: SmallParcelOrder[] = [
  {
    airbillNo: 'ZYG8E1SY',
    customerName: 'ClarperLeon2...',
    billingRef: '',
    status: 'Created',
    serviceType: 'LSD Ground*',
    serviceCenter: 'SAT',
    fromCity: 'GRAND PRAIRIE',
    toCity: 'SAN ANTONIO',
    toAttn: 'GUENELA MARI...',
    toZip: '78233',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFSX',
    customerName: 'Maersk ECLOO...',
    billingRef: '',
    status: 'Created',
    serviceType: 'eCommerce de...',
    serviceCenter: 'AUS',
    fromCity: 'DALLAS',
    toCity: 'ROUND ROCK',
    toAttn: 'SERGIO BIDEN',
    toZip: '78665',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFTW',
    customerName: 'Maersk ECLOO...',
    billingRef: '',
    status: 'Created',
    serviceType: 'eCommerce de...',
    serviceCenter: 'SHE',
    fromCity: 'DALLAS',
    toCity: 'PEARLAND',
    toAttn: 'YOSEF ALSIM...',
    toZip: '77584',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFRY',
    customerName: 'ClarperLeon2...',
    billingRef: '',
    status: 'Created',
    serviceType: 'LSD Ground*',
    serviceCenter: 'IAH',
    fromCity: 'GRAND PRAIRIE',
    toCity: 'TOMBALL',
    toAttn: 'NICHOLAS PAD...',
    toZip: '77375',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFGU',
    customerName: 'ClarperLeon C...',
    billingRef: '',
    status: 'Created',
    serviceType: 'eCommerce de...',
    serviceCenter: 'FTW',
    fromCity: 'GRAND PRAIRIE',
    toCity: 'GRAND PRAIRIE',
    toAttn: 'MAREEM ALAU...',
    toZip: '75052',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFGT',
    customerName: 'Maersk ECLOO...',
    billingRef: '',
    status: 'Created',
    serviceType: 'eCommerce de...',
    serviceCenter: 'REZ',
    fromCity: 'DALLAS',
    toCity: 'DALLAS',
    toAttn: 'SERGIO BIDEN',
    toZip: '75248',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFFS',
    customerName: 'ClarperLeon2...',
    billingRef: '',
    status: 'Created',
    serviceType: 'LSD Ground*',
    serviceCenter: 'TUL',
    fromCity: 'GRAND PRAIRIE',
    toCity: 'TULSA',
    toAttn: 'DANIEL LEON',
    toZip: '74128',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EF6R',
    customerName: 'Maersk ECLOO...',
    billingRef: '',
    status: 'Created',
    serviceType: 'eCommerce de...',
    serviceCenter: 'IAH',
    fromCity: 'DALLAS',
    toCity: 'HOUSTON',
    toAttn: 'ENHANSI HADL...',
    toZip: '77036',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFGQ',
    customerName: 'Maersk ECLOO...',
    billingRef: '',
    status: 'Created',
    serviceType: 'eCommerce de...',
    serviceCenter: 'SAT',
    fromCity: 'DALLAS',
    toCity: 'SAN ANTONIO',
    toAttn: 'ERIKA MARTENS',
    toZip: '78230',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  },
  {
    airbillNo: 'ZYG8EFFN',
    customerName: 'Maersk ECLOO...',
    billingRef: '',
    status: 'Created',
    serviceType: 'eCommerce de...',
    serviceCenter: 'AUS',
    fromCity: 'DALLAS',
    toCity: 'AUSTIN',
    toAttn: 'KAYLA CARPEN...',
    toZip: '78757',
    createTime: '02/06/2026 08...',
    lastOperationTime: '-'
  }
]

function SmallParcelPage() {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 40267,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `Total: ${total.toLocaleString()} records`,
    position: ['bottomRight']
  })

  // 表格列定义 - 完全按照图片
  const columns: ColumnsType<SmallParcelOrder> = [
    {
      title: 'AIRBILL NO',
      dataIndex: 'airbillNo',
      key: 'airbillNo',
      width: 120,
      fixed: 'left'
    },
    {
      title: 'CUSTOMER NAME',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 150
    },
    {
      title: 'BILLING REF',
      dataIndex: 'billingRef',
      key: 'billingRef',
      width: 120
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color="default">{status}</Tag>
      )
    },
    {
      title: 'SERVICE TYPE',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: 150
    },
    {
      title: 'SERVICE CENTER',
      dataIndex: 'serviceCenter',
      key: 'serviceCenter',
      width: 120
    },
    {
      title: 'FROM CITY',
      dataIndex: 'fromCity',
      key: 'fromCity',
      width: 140
    },
    {
      title: 'TO CITY',
      dataIndex: 'toCity',
      key: 'toCity',
      width: 140
    },
    {
      title: 'TO ATTN',
      dataIndex: 'toAttn',
      key: 'toAttn',
      width: 140
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
      width: 150
    },
    {
      title: 'LAST OPERATION TIME',
      dataIndex: 'lastOperationTime',
      key: 'lastOperationTime',
      width: 150
    }
  ]

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination)
  }

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
          
          {/* Logistics 和 Automation 按钮 */}
          <Space size="small">
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
            <Button 
              size="small"
              style={{ 
                borderRadius: '4px',
                fontSize: '12px',
                height: '28px',
                color: '#fff',
                background: 'transparent',
                borderColor: 'transparent'
              }}
              onClick={() => navigate('/webhook')}
            >
              Automation
            </Button>
          </Space>
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
            selectedKeys={['small-parcel']}
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
            {/* 页面标题和描述 */}
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f0f0f0' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>Small Parcel</h1>
              <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>
                Manage small parcel shipments, optimize carrier selection, and track individual package movements.
              </p>
            </div>

            {/* 搜索和过滤栏 */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
              <Space size="middle" style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space size="middle">
                  <Input
                    placeholder="AIRBILL NO"
                    style={{ width: 150, fontSize: '13px' }}
                    size="small"
                  />
                  <Input
                    placeholder="BILLING REF"
                    style={{ width: 150, fontSize: '13px' }}
                    size="small"
                  />
                  <Input
                    placeholder="CUSTOMER NAME"
                    style={{ width: 200, fontSize: '13px' }}
                    size="small"
                  />
                  <Button 
                    icon={<FilterOutlined />} 
                    size="small"
                    style={{ fontSize: '13px' }}
                  >
                    More
                  </Button>
                  <Button 
                    icon={<SearchOutlined />} 
                    size="small"
                    style={{ fontSize: '13px' }}
                  >
                    Advanced Search
                  </Button>
                  <Button 
                    icon={<SettingOutlined />} 
                    size="small"
                    style={{ fontSize: '13px' }}
                  >
                    Columns
                  </Button>
                </Space>
                <Button 
                  icon={<DownloadOutlined />} 
                  size="small"
                  style={{ fontSize: '13px' }}
                >
                  Export
                </Button>
              </Space>
            </div>

            {/* 订单表格 */}
            <div style={{ padding: '0' }}>
              <Table
                columns={columns}
                dataSource={mockOrders}
                rowKey="airbillNo"
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ x: 1600 }}
                size="small"
                bordered={false}
                style={{ fontSize: '12px' }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default SmallParcelPage
