import { useState } from 'react'
import { Layout, Input, Button, Table, Space, Dropdown, Menu, Tag, Radio, message } from 'antd'
import { SearchOutlined, FilterOutlined, SettingOutlined, DownOutlined, InboxOutlined, DownloadOutlined, FileSearchOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import RTSDialog from '../../components/RTS/RTSDialog'
import WeatherDelayDialog from '../../components/WeatherDelay/WeatherDelayDialog'
import { isEligibleForWeatherDelay, findIneligibleOrders } from '../../types/order'
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
  // RTS 对话框需要的额外字段
  billToCustomer: string
  length: number
  width: number
  height: number
  weight: number
  from: {
    terminal?: string
    company?: string
    phone?: string
    address1?: string
    address2?: string
    city: string
    state: string
    zipCode: string
  }
  to: {
    company?: string
    attentionName?: string
    phone?: string
    address1?: string
    address2?: string
    city: string
    state: string
    zipCode: string
  }
  shippingInfo: {
    serviceType: string
    declaredValue: number
    customerAccountNumber: string
    length: number
    width: number
    height: number
  }
}

// 模拟数据
const initialMockOrders: SmallParcelOrder[] = [
  {
    airbillNo: 'WD00CRT1',
    customerName: 'ABC Logistics',
    billingRef: 'CH54001100',
    status: 'Created',
    serviceType: 'LSO Ground*',
    serviceCenter: 'DFW',
    fromCity: 'Dallas',
    toCity: 'Plano',
    toAttn: 'Sarah Kim',
    toZip: '75024',
    createTime: '03/22/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'ABC LOGISTICS (1030400)',
    length: 12, width: 8, height: 5, weight: 3.2,
    from: { company: 'ABC Logistics', phone: '2145559999', address1: '100 Main St', city: 'Dallas', state: 'TX', zipCode: '75201' },
    to: { company: 'Plano Office', attentionName: 'Sarah Kim', phone: '9725551234', address1: '200 Legacy Dr', city: 'Plano', state: 'TX', zipCode: '75024' },
    shippingInfo: { serviceType: 'LSO Ground™', declaredValue: 0, customerAccountNumber: '130400', length: 12, width: 8, height: 5 }
  },
  {
    airbillNo: 'WD00DLV2',
    customerName: 'XYZ Corp',
    billingRef: 'CH54002200',
    status: 'Delivered',
    serviceType: 'LSO Ground*',
    serviceCenter: 'AUS',
    fromCity: 'Austin',
    toCity: 'Round Rock',
    toAttn: 'Mike Chen',
    toZip: '78664',
    createTime: '03/20/2026 ...',
    lastOperationTime: '03/21/2026 ...',
    billToCustomer: 'XYZ CORP (1030500)',
    length: 10, width: 6, height: 4, weight: 2.5,
    from: { company: 'XYZ Corp', phone: '5125558888', address1: '300 Congress Ave', city: 'Austin', state: 'TX', zipCode: '78701' },
    to: { company: 'Round Rock Branch', attentionName: 'Mike Chen', phone: '5125557777', address1: '400 Palm Valley Blvd', city: 'Round Rock', state: 'TX', zipCode: '78664' },
    shippingInfo: { serviceType: 'LSO Ground™', declaredValue: 0, customerAccountNumber: '130500', length: 10, width: 6, height: 4 }
  },
  {
    airbillNo: 'ZYG8FT4R',
    customerName: 'Carperts.co...',
    billingRef: '',
    status: 'Possession Scan at Terminal',
    serviceType: 'eCommerce...',
    serviceCenter: 'FTW',
    fromCity: 'GRAND PRA...',
    toCity: 'ARLINGTON',
    toAttn: 'Cory Ros...',
    toZip: '76002',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'ESTHER GUTIERREZ (1030300)',
    length: 14,
    width: 10,
    height: 4,
    weight: 4.38,
    from: {
      terminal: 'Select Terminal',
      company: 'Baylor College of Medicine',
      phone: '8329047102',
      address1: '1804 EMSST RD',
      city: 'PEARLEY',
      state: 'TX',
      zipCode: '77417'
    },
    to: {
      company: 'Baylor College of Medicine',
      attentionName: 'Lorena Diaz',
      phone: '3404582022',
      address1: '1919 S Braeswood Blvd',
      city: 'Houston',
      state: 'TX',
      zipCode: '77030'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 14,
      width: 10,
      height: 4
    }
  },
  {
    airbillNo: 'ZYQGFT4G',
    customerName: 'Carperts.co...',
    billingRef: '',
    status: 'Out For Delivery',
    serviceType: 'LSO Ground*',
    serviceCenter: 'FTW',
    fromCity: 'GRAND PRA...',
    toCity: 'DENTON',
    toAttn: 'CORY HER...',
    toZip: '76210',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'ESTHER GUTIERREZ (1030300)',
    length: 12,
    width: 8,
    height: 6,
    weight: 3.5,
    from: {
      terminal: 'Select Terminal',
      company: 'Carperts Company',
      phone: '8329047102',
      address1: '1804 EMSST RD',
      city: 'GRAND PRAIRIE',
      state: 'TX',
      zipCode: '75050'
    },
    to: {
      company: 'Denton Corp',
      attentionName: 'Cory Herman',
      phone: '9405551234',
      address1: '123 Main Street',
      city: 'DENTON',
      state: 'TX',
      zipCode: '76210'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 12,
      width: 8,
      height: 6
    }
  },
  {
    airbillNo: 'GL00SGFC',
    customerName: 'GLS USP07...',
    billingRef: 'CH53189600',
    status: 'Inbound scan at destination',
    serviceType: 'LSO Ground*',
    serviceCenter: 'AUS',
    fromCity: 'Dallas',
    toCity: 'Austin',
    toAttn: 'David LaPaul',
    toZip: '78765',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 16,
    width: 12,
    height: 8,
    weight: 5.2,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'Austin Business',
      attentionName: 'David LaPaul',
      phone: '5125551234',
      address1: '789 Congress Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78765'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 16,
      width: 12,
      height: 8
    }
  },
  {
    airbillNo: 'GL00SGFB',
    customerName: 'GLS USP07...',
    billingRef: 'CH53876482',
    status: 'Possession Scan at Terminal',
    serviceType: 'LSO Ground*',
    serviceCenter: 'SAT',
    fromCity: 'Dallas',
    toCity: 'San Antonio',
    toAttn: 'Lyda Consu...',
    toZip: '78240',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 14,
    width: 10,
    height: 6,
    weight: 4.1,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'SA Corporation',
      attentionName: 'Lyda Consuela',
      phone: '2105551234',
      address1: '321 Market St',
      city: 'San Antonio',
      state: 'TX',
      zipCode: '78240'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 14,
      width: 10,
      height: 6
    }
  },
  {
    airbillNo: 'GL00SGFA',
    customerName: 'GLS USP07...',
    billingRef: 'CH53162554',
    status: 'Out For Delivery',
    serviceType: 'LSO Ground*',
    serviceCenter: 'AUS',
    fromCity: 'Dallas',
    toCity: 'Austin',
    toAttn: 'Kevin Wede...',
    toZip: '78723',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 18,
    width: 14,
    height: 10,
    weight: 6.5,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'Austin Tech',
      attentionName: 'Kevin Wedel',
      phone: '5125551234',
      address1: '555 Tech Blvd',
      city: 'Austin',
      state: 'TX',
      zipCode: '78723'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 18,
      width: 14,
      height: 10
    }
  },
  {
    airbillNo: 'GL00SGF6',
    customerName: 'GLS USP07...',
    billingRef: 'CH53969980',
    status: 'Inbound scan at destination',
    serviceType: 'LSO Ground*',
    serviceCenter: 'AUS',
    fromCity: 'Dallas',
    toCity: 'Georgetown',
    toAttn: 'Tony Reyes',
    toZip: '78633',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 15,
    width: 11,
    height: 7,
    weight: 4.8,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'Georgetown LLC',
      attentionName: 'Tony Reyes',
      phone: '5125551234',
      address1: '888 Main St',
      city: 'Georgetown',
      state: 'TX',
      zipCode: '78633'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 15,
      width: 11,
      height: 7
    }
  },
  {
    airbillNo: 'GL00SGF9',
    customerName: 'GLS USP07...',
    billingRef: 'CH53911196',
    status: 'Possession Scan at Terminal',
    serviceType: 'LSO Ground*',
    serviceCenter: 'AUS',
    fromCity: 'Dallas',
    toCity: 'Georgetown',
    toAttn: 'Tony Reyes',
    toZip: '78633',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 13,
    width: 9,
    height: 5,
    weight: 3.9,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'Georgetown LLC',
      attentionName: 'Tony Reyes',
      phone: '5125551234',
      address1: '888 Main St',
      city: 'Georgetown',
      state: 'TX',
      zipCode: '78633'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 13,
      width: 9,
      height: 5
    }
  },
  {
    airbillNo: 'GL00SGF7',
    customerName: 'GLS USP07...',
    billingRef: 'CH53710102',
    status: 'Out For Delivery',
    serviceType: 'LSO Ground*',
    serviceCenter: 'AUS',
    fromCity: 'Dallas',
    toCity: 'Austin',
    toAttn: 'Thomas Mo...',
    toZip: '78749',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 17,
    width: 13,
    height: 9,
    weight: 5.7,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'Austin Services',
      attentionName: 'Thomas Moore',
      phone: '5125551234',
      address1: '999 Service Dr',
      city: 'Austin',
      state: 'TX',
      zipCode: '78749'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 17,
      width: 13,
      height: 9
    }
  },
  {
    airbillNo: 'GL00SGF5',
    customerName: 'GLS USP07...',
    billingRef: 'CH53699843',
    status: 'Inbound scan at destination',
    serviceType: 'LSO Ground*',
    serviceCenter: 'AUS',
    fromCity: 'Dallas',
    toCity: 'Manor',
    toAttn: 'Brittney Mann',
    toZip: '78653',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 16,
    width: 12,
    height: 8,
    weight: 5.1,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'Manor Business',
      attentionName: 'Brittney Mann',
      phone: '5125551234',
      address1: '777 Business Pkwy',
      city: 'Manor',
      state: 'TX',
      zipCode: '78653'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 16,
      width: 12,
      height: 8
    }
  },
  {
    airbillNo: 'GL00SGF8',
    customerName: 'GLS USP07...',
    billingRef: 'CH53786662',
    status: 'Possession Scan at Terminal',
    serviceType: 'LSO Ground*',
    serviceCenter: 'SHB',
    fromCity: 'Dallas',
    toCity: 'LEAGUE CITY',
    toAttn: 'Greg fogg',
    toZip: '77573',
    createTime: '02/27/2026 ...',
    lastOperationTime: '-',
    billToCustomer: 'GLS USPO7 (1030300)',
    length: 14,
    width: 10,
    height: 6,
    weight: 4.3,
    from: {
      terminal: 'Select Terminal',
      company: 'GLS Company',
      phone: '2145551234',
      address1: '456 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    to: {
      company: 'League City Corp',
      attentionName: 'Greg Fogg',
      phone: '2815551234',
      address1: '111 League Dr',
      city: 'LEAGUE CITY',
      state: 'TX',
      zipCode: '77573'
    },
    shippingInfo: {
      serviceType: 'LSO Ground™',
      declaredValue: 0,
      customerAccountNumber: '121500',
      length: 14,
      width: 10,
      height: 6
    }
  }
]

function SmallParcelPage() {
  const navigate = useNavigate()
  const [orderType, setOrderType] = useState<'active' | 'archived'>('active')
  const [hasSearched] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [rtsDialogVisible, setRtsDialogVisible] = useState(false)
  const [weatherDelayDialogVisible, setWeatherDelayDialogVisible] = useState(false)
  const [weatherDelayLoading, setWeatherDelayLoading] = useState(false)
  const [orders, setOrders] = useState<SmallParcelOrder[]>(initialMockOrders)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 38049,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `Total: ${total.toLocaleString()} records`,
    position: ['bottomRight']
  })

  // 处理选择变化
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  // 获取选中的订单
  const selectedOrders = orders.filter(order => 
    selectedRowKeys.includes(order.airbillNo)
  )

  // 处理 Actions 菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    console.log('Menu clicked:', key, 'Selected orders:', selectedRowKeys.length)
    if (key === 'return') {
      console.log('Opening RTS dialog for orders:', selectedOrders)
      setRtsDialogVisible(true)
    }
    if (key === 'weatherDelay') {
      const ineligible = findIneligibleOrders(selectedOrders)
      if (ineligible.length > 0) {
        message.warning("One or more of the selected orders cannot be marked as 'Weather Delay' due to their current status.")
        return
      }
      setWeatherDelayDialogVisible(true)
    }
  }

  // 处理 Weather Delay 确认
  const handleConfirmWeatherDelay = async () => {
    setWeatherDelayLoading(true)
    try {
      const response = await fetch('/api/orders/weather-delay', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          airbillNos: selectedOrders.map(o => o.airbillNo)
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'Failed to mark as Weather Delay')
      }

      const result = await response.json()
      // 更新本地订单状态
      const markedAirbills = new Set(selectedOrders.map(o => o.airbillNo))
      setOrders(prev => prev.map(order => 
        markedAirbills.has(order.airbillNo) 
          ? { ...order, status: 'Delay Exception' }
          : order
      ))
      message.success(`${result.data.updatedCount} order(s) have been successfully marked as Weather Delay.`)
      setWeatherDelayDialogVisible(false)
      setSelectedRowKeys([])
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setWeatherDelayLoading(false)
    }
  }

  // 处理创建退货标签
  const handleCreateReturnLabel = () => {
    console.log('Creating return labels for:', selectedOrders)
    // 关闭对话框
    setRtsDialogVisible(false)
    // 导航到打印页面，传递选中的订单数据
    navigate('/print-airbills', { state: { orders: selectedOrders } })
    // 清空选中状态
    setSelectedRowKeys([])
  }

  // 行选择配置
  const rowSelection = orderType === 'active' ? {
    selectedRowKeys,
    onChange: onSelectChange,
  } : undefined

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
      render: (status: string) => {
        let color = 'default'
        if (status === 'Delivered') color = 'green'
        else if (status === 'Created') color = 'blue'
        else if (status === 'Delay Exception') color = 'orange'
        return <Tag color={color}>{status}</Tag>
      }
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
              <p style={{ color: '#666', margin: '0 0 16px 0', fontSize: '13px' }}>
                Manage small parcel shipments, optimize carrier selection, and track individual package movements.
              </p>
              
              {/* 订单类型切换和操作按钮 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Radio.Group 
                  value={orderType} 
                  onChange={(e) => setOrderType(e.target.value)}
                  buttonStyle="solid"
                  size="small"
                >
                  <Radio.Button value="active">Active Orders</Radio.Button>
                  <Radio.Button value="archived">Archived Orders</Radio.Button>
                </Radio.Group>
                
                <Space size="middle">
                  <Button icon={<DownloadOutlined />} size="small">
                    Export
                  </Button>
                  {orderType === 'active' && (
                    <Dropdown
                      menu={{
                        items: [
                          { key: 'discarded', label: 'Mark as Discarded' },
                          { key: 'lost', label: 'Mark as Lost' },
                          { key: 'iqa', label: 'Mark as IQA' },
                          { 
                            key: 'weatherDelay', 
                            label: 'Mark as Weather Delay',
                            disabled: selectedRowKeys.length === 0
                          },
                          { 
                            key: 'return', 
                            label: 'Return to Shipper',
                            disabled: selectedRowKeys.length === 0
                          },
                          { key: 'delivered', label: 'Mark as Delivered' }
                        ],
                        onClick: handleMenuClick
                      }}
                    >
                      <Button 
                        type="primary" 
                        size="small"
                        style={{ background: '#1890ff', borderColor: '#1890ff' }}
                      >
                        Actions <DownOutlined />
                      </Button>
                    </Dropdown>
                  )}
                  {orderType === 'active' && selectedRowKeys.length > 0 && (
                    <span style={{ fontSize: '13px', color: '#666' }}>
                      {selectedRowKeys.length} order{selectedRowKeys.length > 1 ? 's' : ''} selected
                    </span>
                  )}
                </Space>
              </div>
            </div>

            {/* 搜索和过滤栏 - 根据订单类型显示不同的查询条件 */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
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
                
                {orderType === 'archived' ? (
                  <>
                    <Input
                      placeholder="CUSTOMER NAME"
                      style={{ width: 180, fontSize: '13px' }}
                      size="small"
                    />
                    <Input
                      placeholder="DELIVERY TIME"
                      style={{ width: 180, fontSize: '13px' }}
                      size="small"
                    />
                  </>
                ) : (
                  <Button 
                    icon={<FilterOutlined />} 
                    size="small"
                    style={{ fontSize: '13px' }}
                  >
                    More <span style={{ 
                      background: '#1890ff', 
                      color: '#fff', 
                      borderRadius: '10px', 
                      padding: '0 6px', 
                      fontSize: '11px',
                      marginLeft: '4px'
                    }}>4</span>
                  </Button>
                )}
                
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
            </div>

            {/* 订单表格或提示页面 */}
            <div style={{ padding: '0' }}>
              {orderType === 'archived' && !hasSearched ? (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  minHeight: '400px',
                  padding: '60px 20px'
                }}>
                  <FileSearchOutlined style={{ fontSize: '80px', color: '#d9d9d9', marginBottom: '24px' }} />
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#262626', marginBottom: '12px' }}>
                    Ready to Search Archived Orders
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#8c8c8c', 
                    textAlign: 'center', 
                    maxWidth: '600px',
                    lineHeight: '1.6'
                  }}>
                    Please enter your search criteria above and click the "Search" button to view archived orders. 
                    You can search by Airbill Number, Customer, Billing Reference, or use filters to narrow down your results.
                  </p>
                </div>
              ) : (
                <Table
                  columns={columns}
                  dataSource={orders}
                  rowKey="airbillNo"
                  rowSelection={rowSelection}
                  pagination={pagination}
                  onChange={handleTableChange}
                  scroll={{ x: 1600 }}
                  size="small"
                  bordered={false}
                  style={{ fontSize: '12px' }}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* RTS Dialog */}
      <RTSDialog
        visible={rtsDialogVisible}
        selectedOrders={selectedOrders}
        onCancel={() => setRtsDialogVisible(false)}
        onCreateReturnLabel={handleCreateReturnLabel}
      />

      {/* Weather Delay Dialog */}
      <WeatherDelayDialog
        visible={weatherDelayDialogVisible}
        selectedCount={selectedOrders.length}
        onCancel={() => setWeatherDelayDialogVisible(false)}
        onConfirm={handleConfirmWeatherDelay}
        loading={weatherDelayLoading}
      />
    </Layout>
  )
}

export default SmallParcelPage
