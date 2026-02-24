import { useState } from 'react'
import { Layout, Button, Table, Space, Tabs, Modal, Form, Input, Select, Switch, Tag, Dropdown, Drawer, Timeline, Badge, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined, SearchOutlined, FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, SyncOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './index.css'

const { Sider, Content, Header } = Layout

interface WebhookData {
  key: string
  ruleName: string
  businessType: string
  eventType: string
  returnType: string
  status: boolean
  createdAt: string
}

interface LogEntry {
  id: string
  timestamp: string
  status: 'success' | 'failed' | 'pending' | 'processing'
  eventType: string
  requestUrl: string
  requestMethod: string
  requestPayload: string
  responseStatus?: number
  responseBody?: string
  errorMessage?: string
  duration?: number
  retryCount?: number
}

const mockWebhooks: WebhookData[] = [
  {
    key: '1',
    ruleName: 'backoffAPI',
    businessType: 'LSO',
    eventType: 'Order Created',
    returnType: 'JSON',
    status: true,
    createdAt: '07/20/2025 3:47:42 PM'
  }
]

// Mock log data
const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2025-02-18 17:30:45',
    status: 'success',
    eventType: 'Order Created',
    requestUrl: 'https://api.example.com/webhook/tracking',
    requestMethod: 'POST',
    requestPayload: JSON.stringify({
      orderId: 'ORD-2025-001',
      trackingNumber: 'TRK123456789',
      status: 'created',
      timestamp: '2025-02-18T17:30:45Z'
    }, null, 2),
    responseStatus: 200,
    responseBody: JSON.stringify({
      success: true,
      message: 'Webhook received successfully'
    }, null, 2),
    duration: 245,
    retryCount: 0
  },
  {
    id: '2',
    timestamp: '2025-02-18 17:25:12',
    status: 'failed',
    eventType: 'Order Delivered',
    requestUrl: 'https://api.example.com/webhook/tracking',
    requestMethod: 'POST',
    requestPayload: JSON.stringify({
      orderId: 'ORD-2025-002',
      trackingNumber: 'TRK987654321',
      status: 'delivered',
      timestamp: '2025-02-18T17:25:12Z'
    }, null, 2),
    responseStatus: 500,
    errorMessage: 'Internal Server Error: Database connection timeout',
    duration: 5000,
    retryCount: 2
  },
  {
    id: '3',
    timestamp: '2025-02-18 17:20:33',
    status: 'processing',
    eventType: 'Order In Transit',
    requestUrl: 'https://api.example.com/webhook/tracking',
    requestMethod: 'POST',
    requestPayload: JSON.stringify({
      orderId: 'ORD-2025-003',
      trackingNumber: 'TRK456789123',
      status: 'in_transit',
      timestamp: '2025-02-18T17:20:33Z'
    }, null, 2),
    retryCount: 1
  },
  {
    id: '4',
    timestamp: '2025-02-18 17:15:08',
    status: 'success',
    eventType: 'Order Picked Up',
    requestUrl: 'https://api.example.com/webhook/tracking',
    requestMethod: 'POST',
    requestPayload: JSON.stringify({
      orderId: 'ORD-2025-004',
      trackingNumber: 'TRK789123456',
      status: 'picked_up',
      timestamp: '2025-02-18T17:15:08Z'
    }, null, 2),
    responseStatus: 200,
    responseBody: JSON.stringify({
      success: true,
      message: 'Webhook received successfully'
    }, null, 2),
    duration: 189,
    retryCount: 0
  }
]

function WebhookPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('PO')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLogDrawerVisible, setIsLogDrawerVisible] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookData | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [form] = Form.useForm()
  const [transportMethod, setTransportMethod] = useState<string>('webhook_api')
  const [httpProtocol, setHttpProtocol] = useState<string>('https')
  const [authMethod, setAuthMethod] = useState<string>('none')

  const showModal = () => {
    setEditMode(false)
    setIsModalVisible(true)
  }

  const showEditModal = (record: WebhookData) => {
    setEditMode(true)
    setSelectedWebhook(record)
    
    // Populate form with existing data
    form.setFieldsValue({
      ruleName: record.ruleName,
      logisticsType: 'small_parcel',
      eventType: [record.eventType.toLowerCase().replace(/ /g, '_')], // Convert to array for multi-select
      customerCode: '',
      transportMethod: 'webhook_api',
      httpProtocol: 'https',
      webhookUrl: 'https://api.example.com/webhook/tracking',
      httpMethod: 'POST',
      authMethod: 'oauth2',
      // OAuth 2.0 fields
      clientId: 'abc123def456789',
      clientSecret: '••••••••••••••',
      tokenUrl: 'https://api.uberfreight.com/oauth2/accesstoken',
      eventsUrl: 'https://api.uberfreight.com/tp-api/parcel/provider/v3/package-tracking',
      grantType: 'client_credentials',
      scope: 'write:tracking_events read_packages write_webhooks',
      tokenExpiryBuffer: 300,
      returnType: record.returnType.toLowerCase(),
      retryTimes: 3,
      retryInterval: 60,
      enableRetry: false,
      trackingNumber: 'airbill_no',
      deliveryVerification: true,
      status: record.status,
      remark: 'Sample webhook configuration with OAuth 2.0'
    })
    
    setTransportMethod('webhook_api')
    setHttpProtocol('https')
    setAuthMethod('oauth2')
    setIsModalVisible(true)
  }

  const showLogDrawer = (record: WebhookData) => {
    setSelectedWebhook(record)
    setIsLogDrawerVisible(true)
  }

  const closeLogDrawer = () => {
    setIsLogDrawerVisible(false)
    setSelectedWebhook(null)
  }

  const handleDelete = (record: WebhookData) => {
    Modal.confirm({
      title: 'Delete Webhook',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: (
        <div>
          <p>Are you sure you want to delete this webhook?</p>
          <div style={{ marginTop: '12px', padding: '12px', background: '#fafafa', borderRadius: '4px' }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Rule Name:</strong> {record.ruleName}
            </div>
            <div style={{ marginBottom: '8px' }}>
              <strong>Business Type:</strong> {record.businessType}
            </div>
            <div>
              <strong>Event Type:</strong> {record.eventType}
            </div>
          </div>
          <p style={{ marginTop: '12px', color: '#ff4d4f', fontSize: '13px' }}>
            <strong>Warning:</strong> This action cannot be undone. All webhook logs and configurations will be permanently deleted.
          </p>
        </div>
      ),
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      width: 500,
      onOk() {
        // TODO: Call API to delete webhook
        console.log('Deleting webhook:', record.key)
        message.success(`Webhook "${record.ruleName}" has been deleted successfully`)
      },
      onCancel() {
        console.log('Delete cancelled')
      },
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
      case 'failed':
        return <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
      case 'processing':
        return <SyncOutlined spin style={{ color: '#1890ff', fontSize: '16px' }} />
      case 'pending':
        return <ClockCircleOutlined style={{ color: '#faad14', fontSize: '16px' }} />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      success: { status: 'success' as const, text: 'Success' },
      failed: { status: 'error' as const, text: 'Failed' },
      processing: { status: 'processing' as const, text: 'Processing' },
      pending: { status: 'warning' as const, text: 'Pending' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge status={config.status} text={config.text} />
  }

  const columns = [
    {
      title: 'Rule Name',
      dataIndex: 'ruleName',
      key: 'ruleName',
      width: 200,
      render: (text: string, record: WebhookData) => (
        <Space>
          <span>{text}</span>
          <Tag color="purple">{record.businessType}</Tag>
        </Space>
      )
    },
    {
      title: 'Event Type',
      dataIndex: 'eventType',
      key: 'eventType',
      width: 200
    },
    {
      title: 'Return Type',
      dataIndex: 'returnType',
      key: 'returnType',
      width: 150
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: boolean) => (
        <Switch checked={status} size="small" />
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200
    },
    {
      title: 'Operations',
      key: 'operations',
      width: 150,
      render: (_: unknown, record: WebhookData) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => showEditModal(record)}
            title="Edit Webhook"
          />
          <Button 
            type="link" 
            icon={<FileTextOutlined />} 
            size="small" 
            onClick={() => showLogDrawer(record)} 
            title="View Logs" 
          />
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record)}
            title="Delete Webhook"
          />
        </Space>
      )
    }
  ]

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditMode(false)
    setSelectedWebhook(null)
    form.resetFields()
    setTransportMethod('webhook_api')
    setHttpProtocol('https')
    setAuthMethod('none')
  }

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values)
      if (editMode) {
        console.log('Updating webhook:', selectedWebhook?.key)
        // TODO: Call API to update webhook
      } else {
        console.log('Creating new webhook')
        // TODO: Call API to create webhook
      }
      setIsModalVisible(false)
      setEditMode(false)
      setSelectedWebhook(null)
      form.resetFields()
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: '#7c3aed', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>O</div>
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>OMS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ color: '#999', fontSize: '12px' }}>LSO: Sarah Ha...</div>
            <Dropdown menu={{ items: [{ key: 'lso_001', label: 'LSO Sarah Ha...' }, { key: 'lso_002', label: 'LSO John Do...' }, { key: 'lso_003', label: 'LSO Mike Wi...' }] }}>
              <Button type="text" size="small" style={{ color: '#999', padding: '0 4px', minWidth: 'auto' }}><DownOutlined style={{ fontSize: '10px' }} /></Button>
            </Dropdown>
            <div style={{ color: '#999', fontSize: '12px' }}>3820 Auburn Ro...</div>
          </div>
          <Space size="small">
            <Button size="small" style={{ borderRadius: '4px', fontSize: '12px', height: '28px', color: '#fff', background: 'transparent', borderColor: 'transparent' }} onClick={() => navigate('/')}>Logistics</Button>
            <Button type="primary" size="small" style={{ background: '#7c3aed', borderColor: '#7c3aed', borderRadius: '4px', fontSize: '12px', height: '28px' }}>Automation</Button>
          </Space>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Input placeholder="Search" prefix={<SearchOutlined style={{ color: '#999' }} />} style={{ width: 200, height: '28px', fontSize: '12px' }} suffix={<Space size={4}><span style={{ color: '#999', fontSize: '11px' }}>⌘+K</span><span style={{ color: '#999', fontSize: '11px' }}>Y</span></Space>} />
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px 12px' }}><div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>Automation</div></div>
          <div className="automation-menu"><div className="menu-item active"><span className="menu-icon">🔗</span><span>Webhook</span></div></div>
        </Sider>
        <Layout>
          <Content style={{ background: '#fff' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div><h1 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>Webhook</h1><p style={{ color: '#666', margin: 0, fontSize: '13px' }}>Manage webhook callbacks and event routing for external system integrations.</p></div>
              <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>Add New Webhook</Button>
            </div>
            <div style={{ padding: '0 24px' }}><Tabs activeKey={activeTab} onChange={setActiveTab} className="webhook-tabs" items={[{ key: 'PO', label: 'PO' }, { key: 'SO', label: 'SO' }, { key: 'Freight', label: 'Freight' }, { key: 'Inventory', label: 'Inventory' }, { key: 'Product', label: 'Product' }, { key: 'Others', label: 'Others' }]} /></div>
            <div style={{ padding: '0 24px 24px' }}><Table columns={columns} dataSource={mockWebhooks} pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Total: ${total} records`, position: ['bottomLeft'] }} size="small" /></div>
          </Content>
        </Layout>
      </Layout>
      <Modal 
        title={editMode ? "Edit Webhook" : "Add New Webhook"} 
        open={isModalVisible} 
        onCancel={handleCancel} 
        width={900} 
        footer={[
          <Button key="cancel" onClick={handleCancel}>Cancel</Button>, 
          <Button key="save" type="primary" onClick={handleSave} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
            {editMode ? "Update" : "Save"}
          </Button>
        ]} 
        className="webhook-modal"
      >
        <Form form={form} layout="vertical" style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '16px' }}>
          
          {/* Basic Information */}
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            
            <Form.Item 
              label="Rule Name" 
              name="ruleName" 
              rules={[{ required: true, message: 'Please enter rule name' }]}
              required
            >
              <Input placeholder="Enter rule name" />
            </Form.Item>

            <Form.Item 
              label="Logistics Type" 
              name="logisticsType" 
              rules={[{ required: true, message: 'Please select logistics type' }]}
              required
            >
              <Select placeholder="Select logistics type">
                <Select.Option value="small_parcel">Small Parcel</Select.Option>
                <Select.Option value="ltl_ftl">LTL/FTL</Select.Option>
                <Select.Option value="international_freight">International Freight</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label="Event Type" 
              name="eventType" 
              rules={[{ required: true, message: 'Please select at least one event type' }]}
              required
            >
              <Select 
                mode="multiple"
                placeholder="Select event type(s)"
                maxTagCount="responsive"
                allowClear
              >
                <Select.Option value="order_created">Order Created</Select.Option>
                <Select.Option value="order_picked_up">Order Picked Up</Select.Option>
                <Select.Option value="order_in_transit">Order In Transit</Select.Option>
                <Select.Option value="order_delivered">Order Delivered</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label="Customer Code" 
              name="customerCode"
              extra="Enter one or more customer codes, separated by commas"
            >
              <Input placeholder="Enter customer code(s), separated by commas" />
            </Form.Item>
          </div>

          {/* Transport Configuration */}
          <div className="form-section">
            <h3 className="section-title">Transport Configuration</h3>
            
            <Form.Item 
              label="Transport Method" 
              name="transportMethod" 
              initialValue="webhook_api"
              rules={[{ required: true, message: 'Please select transport method' }]}
              required
            >
              <Select 
                placeholder="Select transport method"
                onChange={(value) => setTransportMethod(value)}
              >
                <Select.Option value="webhook_api">Webhook API</Select.Option>
                <Select.Option value="sftp">SFTP</Select.Option>
              </Select>
            </Form.Item>

            {/* Webhook API Configuration */}
            {transportMethod === 'webhook_api' && (
              <>
                <Form.Item 
                  label="HTTP Protocol" 
                  name="httpProtocol" 
                  initialValue="https"
                  rules={[{ required: true, message: 'Please select HTTP protocol' }]}
                  required
                >
                  <Select 
                    placeholder="Select HTTP protocol"
                    onChange={(value) => setHttpProtocol(value)}
                  >
                    <Select.Option value="http">HTTP</Select.Option>
                    <Select.Option value="https">HTTPS</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Webhook URL" 
                  name="webhookUrl" 
                  rules={[
                    { required: true, message: 'Please enter webhook URL' },
                    { type: 'url', message: 'Please enter a valid URL' }
                  ]}
                  required
                  extra={`Enter ${httpProtocol.toUpperCase()} endpoint URL, e.g., ${httpProtocol}://api.example.com/webhook/tracking`}
                >
                  <Input placeholder={`${httpProtocol}://api.example.com/webhook`} />
                </Form.Item>

                <Form.Item 
                  label="HTTP Method" 
                  name="httpMethod" 
                  initialValue="POST"
                  rules={[{ required: true, message: 'Please select HTTP method' }]}
                  required
                >
                  <Select>
                    <Select.Option value="GET">GET</Select.Option>
                    <Select.Option value="POST">POST</Select.Option>
                    <Select.Option value="PUT">PUT</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Data Format" 
                  name="dataFormat" 
                  initialValue="json"
                  rules={[{ required: true, message: 'Please select data format' }]}
                  required
                  extra="Select the format for webhook payload data"
                >
                  <Select>
                    <Select.Option value="json">JSON</Select.Option>
                    <Select.Option value="xml">XML</Select.Option>
                    <Select.Option value="plain_text">Plain Text</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Request Timeout (s)" 
                  name="requestTimeout"
                  initialValue={30}
                  extra="HTTP request timeout in seconds, range: 5-60, default: 30"
                >
                  <Input 
                    type="number" 
                    min={5} 
                    max={60} 
                    placeholder="30" 
                  />
                </Form.Item>

                <Form.Item 
                  label="Connection Pool Size" 
                  name="connectionPoolSize"
                  initialValue={10}
                  extra="HTTP connection pool size, controls concurrent connections, default: 10"
                >
                  <Input 
                    type="number" 
                    min={1} 
                    max={100} 
                    placeholder="10" 
                  />
                </Form.Item>
              </>
            )}

            {/* SFTP Configuration */}
            {transportMethod === 'sftp' && (
              <>
                <Form.Item 
                  label="SFTP Host" 
                  name="sftpHost" 
                  rules={[{ required: true, message: 'Please enter SFTP host' }]}
                  required
                  extra="Enter SFTP server hostname or IP address, e.g., ftp.example.com"
                >
                  <Input placeholder="ftp.example.com" />
                </Form.Item>

                <Form.Item 
                  label="SFTP Port" 
                  name="sftpPort" 
                  initialValue={22}
                  rules={[
                    { required: true, message: 'Please enter SFTP port' },
                    { 
                      validator: (_, value) => {
                        if (value && (value < 1 || value > 65535)) {
                          return Promise.reject('Port must be between 1 and 65535')
                        }
                        return Promise.resolve()
                      }
                    }
                  ]}
                  required
                  extra="Enter SFTP port number, default is 22, range: 1-65535"
                >
                  <Input type="number" placeholder="22" />
                </Form.Item>

                <Form.Item 
                  label="SFTP Username" 
                  name="sftpUsername" 
                  rules={[{ required: true, message: 'Please enter SFTP username' }]}
                  required
                  extra="Enter username for SFTP connection"
                >
                  <Input placeholder="Enter SFTP username" />
                </Form.Item>

                <Form.Item 
                  label="SFTP Auth Method" 
                  name="sftpAuthMethod" 
                  initialValue="password"
                  rules={[{ required: true, message: 'Please select SFTP auth method' }]}
                  required
                  extra="Select authentication method: Password or SSH Key"
                >
                  <Select>
                    <Select.Option value="password">Password</Select.Option>
                    <Select.Option value="ssh_key">SSH Key</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => 
                    prevValues.sftpAuthMethod !== currentValues.sftpAuthMethod
                  }
                >
                  {({ getFieldValue }) => {
                    const sftpAuthMethod = getFieldValue('sftpAuthMethod')
                    
                    if (sftpAuthMethod === 'password') {
                      return (
                        <Form.Item 
                          label="SFTP Password" 
                          name="sftpPassword"
                          rules={[{ required: true, message: 'Please enter SFTP password' }]}
                          required
                          extra="Enter SFTP password for authentication"
                        >
                          <Input.Password placeholder="Enter SFTP password" />
                        </Form.Item>
                      )
                    }
                    
                    if (sftpAuthMethod === 'ssh_key') {
                      return (
                        <>
                          <Form.Item 
                            label="SSH Private Key" 
                            name="sshPrivateKey"
                            rules={[{ required: true, message: 'Please enter SSH private key' }]}
                            required
                            extra="Enter SSH private key content in PEM format for authentication"
                          >
                            <Input.TextArea 
                              rows={4} 
                              placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;...&#10;-----END RSA PRIVATE KEY-----" 
                            />
                          </Form.Item>

                          <Form.Item 
                            label="Passphrase (optional)" 
                            name="sshPassphrase"
                            extra="Enter passphrase if your SSH private key is encrypted (leave blank if not encrypted)"
                          >
                            <Input.Password placeholder="Enter passphrase (optional)" />
                          </Form.Item>
                        </>
                      )
                    }
                    
                    return null
                  }}
                </Form.Item>

                <Form.Item 
                  label="SFTP Upload Directory" 
                  name="sftpDirectory" 
                  rules={[{ required: true, message: 'Please enter SFTP directory' }]}
                  required
                  extra="Enter target directory path on SFTP server, e.g., /upload/webhooks/updates"
                >
                  <Input placeholder="/upload/webhooks/updates" />
                </Form.Item>
              </>
            )}
          </div>

          {/* Authentication Configuration */}
          <div className="form-section">
            <h3 className="section-title">Authentication Configuration</h3>
            
            <Form.Item 
              label="Authentication Method" 
              name="authMethod" 
              initialValue="none"
              rules={[{ required: true, message: 'Please select authentication method' }]}
              required
            >
              <Select 
                placeholder="Select authentication method"
                onChange={(value) => setAuthMethod(value)}
              >
                <Select.Option value="none">None</Select.Option>
                <Select.Option value="basic">Basic Auth</Select.Option>
                <Select.Option value="api_key">API Key</Select.Option>
                <Select.Option value="oauth2">OAuth 2.0</Select.Option>
                <Select.Option value="hmac">HMAC Signature</Select.Option>
              </Select>
            </Form.Item>

            {/* Basic Auth */}
            {authMethod === 'basic' && (
              <>
                <Form.Item 
                  label="User Name" 
                  name="username" 
                  rules={[{ required: true, message: 'Please enter username' }]}
                  required
                  extra="Enter authentication username, e.g., ops@example.com"
                >
                  <Input placeholder="ops@example.com" />
                </Form.Item>

                <Form.Item 
                  label="Password" 
                  name="password" 
                  rules={[{ required: true, message: 'Please enter password' }]}
                  required
                  extra="Enter authentication password, e.g., DSGFP9LxW4DVa"
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </>
            )}

            {/* API Key */}
            {authMethod === 'api_key' && (
              <>
                <Form.Item 
                  label="Header Key" 
                  name="apiKeyHeaderName"
                  rules={[{ required: true, message: 'Please enter header key' }]}
                  required
                  extra="Enter API Key header name, e.g., x-api-key"
                >
                  <Input placeholder="x-api-key" />
                </Form.Item>

                <Form.Item 
                  label="API Key" 
                  name="apiKey" 
                  rules={[{ required: true, message: 'Please enter API key' }]}
                  required
                  extra="Enter API key, e.g., 2343580cdf23432eeer7018e4835538e3b234233c3543234234ce62423423"
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="Enter API key" 
                  />
                </Form.Item>
              </>
            )}

            {/* HMAC Signature */}
            {authMethod === 'hmac' && (
              <>
                <Form.Item 
                  label="Secret Key" 
                  name="hmacSecretKey" 
                  rules={[{ required: true, message: 'Please enter HMAC secret key' }]}
                  required
                  extra="Enter HMAC secret key for signature generation"
                >
                  <Input.Password placeholder="Enter secret key" />
                </Form.Item>

                <Form.Item 
                  label="Algorithm" 
                  name="hmacAlgorithm" 
                  initialValue="sha256"
                  rules={[{ required: true, message: 'Please select HMAC algorithm' }]}
                  required
                  extra="Select HMAC algorithm for signature generation"
                >
                  <Select>
                    <Select.Option value="sha256">HMAC-SHA256</Select.Option>
                    <Select.Option value="sha512">HMAC-SHA512</Select.Option>
                    <Select.Option value="sha1">HMAC-SHA1</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Signature Header" 
                  name="hmacSignatureHeader"
                  initialValue="X-Signature"
                  rules={[{ required: true, message: 'Please enter signature header name' }]}
                  required
                  extra="Enter the header name for HMAC signature, e.g., X-Signature"
                >
                  <Input placeholder="X-Signature" />
                </Form.Item>
              </>
            )}

            {/* OAuth 2.0 */}
            {authMethod === 'oauth2' && (
              <>
                <Form.Item 
                  label="Client ID" 
                  name="clientId" 
                  rules={[{ required: true, message: 'Please enter OAuth 2.0 Client ID' }]}
                  required
                  extra="Enter OAuth 2.0 Client ID, e.g., abc123def456..., obtained from Partner"
                >
                  <Input placeholder="abc123def456..." />
                </Form.Item>

                <Form.Item 
                  label="Client Secret" 
                  name="clientSecret" 
                  rules={[{ required: true, message: 'Please enter Client Secret' }]}
                  required
                  extra="Enter OAuth 2.0 Client Secret (password), must be encrypted for storage, e.g., ••••••••••••••, obtained from Partner"
                >
                  <Input.Password placeholder="Enter client secret" />
                </Form.Item>

                <Form.Item 
                  label="Token URL" 
                  name="tokenUrl" 
                  rules={[
                    { required: true, message: 'Please enter Token URL' },
                    { type: 'url', message: 'Please enter a valid URL' }
                  ]}
                  required
                  extra={
                    <>
                      Enter the endpoint URL to obtain Access Token, e.g., <a href="https://api.uberfreight.com/oauth2/accesstoken" target="_blank" rel="noopener noreferrer">https://api.uberfreight.com/oauth2/accesstoken</a>
                    </>
                  }
                >
                  <Input placeholder="https://api.uberfreight.com/oauth2/accesstoken" />
                </Form.Item>

                <Form.Item 
                  label="Events/Webhook URL" 
                  name="eventsUrl" 
                  rules={[
                    { required: true, message: 'Please enter Events/Webhook URL' },
                    { type: 'url', message: 'Please enter a valid URL' }
                  ]}
                  required
                  extra={
                    <>
                      Enter the Webhook target URL to receive events, e.g., <a href="https://api.uberfreight.com/tp-api/parcel/provider/v3/package-tracking" target="_blank" rel="noopener noreferrer">https://api.uberfreight.com/tp-api/parcel/provider/v3/package-tracking</a>
                    </>
                  }
                >
                  <Input placeholder="https://api.uberfreight.com/tp-api/parcel/provider/v3/package-tracking" />
                </Form.Item>

                <Form.Item 
                  label="Grant Type" 
                  name="grantType" 
                  initialValue="client_credentials"
                  rules={[{ required: true, message: 'Please select Grant Type' }]}
                  required
                  extra="Client credentials mode for service-to-service authentication"
                >
                  <Select disabled>
                    <Select.Option value="client_credentials">client_credentials</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Scope" 
                  name="scope"
                  extra="Enter the requested permission scope (multiple scopes separated by spaces), e.g., write:tracking_events read_packages write_webhooks"
                >
                  <Input placeholder="Enter scope" />
                </Form.Item>

                <Form.Item 
                  label="Token Expiry Buffer (sec)" 
                  name="tokenExpiryBuffer"
                  initialValue={300}
                  extra="Enter token expiry buffer time in seconds, used for automatic token refresh before expiration"
                >
                  <Input type="number" min={1} placeholder="300" />
                </Form.Item>
              </>
            )}
          </div>

          {/* Network Security */}
          <div className="form-section">
            <h3 className="section-title">Network Security</h3>
            
            <Form.Item 
              label="IP Whitelist" 
              name="ipWhitelist"
              extra="Enter allowed IP addresses, separated by commas. Leave blank to allow all IPs"
            >
              <Input.TextArea 
                rows={2} 
                placeholder="e.g., 192.168.1.100, 10.0.0.50" 
              />
            </Form.Item>
          </div>

          {/* Batch Push Configuration */}
          <div className="form-section">
            <h3 className="section-title">Batch Push Configuration</h3>
            
            <Form.Item 
              label="Batch Push" 
              name="batchPush"
              valuePropName="checked"
              initialValue={false}
              extra="Enable batch push mode for SFTP or high-volume scenarios, accumulates events before sending, default: disabled"
            >
              <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
            </Form.Item>

            <Form.Item 
              noStyle
              shouldUpdate={(prevValues, currentValues) => 
                prevValues.batchPush !== currentValues.batchPush
              }
            >
              {({ getFieldValue }) => {
                const batchPush = getFieldValue('batchPush')
                
                if (batchPush) {
                  return (
                    <>
                      <Form.Item 
                        label="Batch Size" 
                        name="batchSize"
                        initialValue={100}
                        rules={[{ required: true, message: 'Please enter batch size' }]}
                        required
                        extra="Number of events per batch, default: 100"
                      >
                        <Input 
                          type="number" 
                          min={1} 
                          max={1000} 
                          placeholder="100" 
                        />
                      </Form.Item>

                      <Form.Item 
                        label="Batch Interval (s)" 
                        name="batchInterval"
                        initialValue={60}
                        rules={[{ required: true, message: 'Please enter batch interval' }]}
                        required
                        extra="Time interval between batches in seconds, default: 60"
                      >
                        <Input 
                          type="number" 
                          min={1} 
                          max={3600} 
                          placeholder="60" 
                        />
                      </Form.Item>
                    </>
                  )
                }
                
                return null
              }}
            </Form.Item>
          </div>

          {/* Retry Configuration */}
          <div className="form-section">
            <h3 className="section-title">Retry Configuration</h3>
            
            <Form.Item 
              label="Retry Times" 
              name="retryTimes" 
              initialValue={3}
              rules={[{ required: true, message: 'Please enter retry times' }]}
              required
              extra="Enter number of retry attempts on failure, default: 3, range: 0-10"
            >
              <Input type="number" min={0} max={10} />
            </Form.Item>

            <Form.Item 
              label="Retry Interval (seconds)" 
              name="retryInterval" 
              initialValue={60}
              rules={[{ required: true, message: 'Please enter retry interval' }]}
              required
              extra="Enter retry interval in seconds, default: 60"
            >
              <Input type="number" min={1} />
            </Form.Item>

            <Form.Item 
              label="Enable Retry" 
              name="enableRetry" 
              valuePropName="checked" 
              initialValue={false}
            >
              <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
            </Form.Item>
          </div>

          {/* Special Configuration */}
          <div className="form-section">
            <h3 className="section-title">Special Configuration</h3>
            
            <Form.Item 
              label="Tracking Number" 
              name="trackingNumber"
              extra="Optional, tracking number field, e.g., Airbill No, Billing Ref"
            >
              <Select placeholder="Select tracking number field">
                <Select.Option value="airbill_no">Airbill No</Select.Option>
                <Select.Option value="billing_ref">Billing Ref</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label="Delivery Verification" 
              name="deliveryVerification"
              valuePropName="checked"
              initialValue={true}
              extra="Used to push delivery photo/signature image links"
            >
              <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
            </Form.Item>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3 className="section-title">Additional Information</h3>
            
            <Form.Item 
              label="Status" 
              name="status" 
              valuePropName="checked" 
              initialValue={true}
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>

            <Form.Item 
              label="Remark" 
              name="remark"
            >
              <Input.TextArea rows={3} maxLength={100} placeholder="Enter remark (max 100 characters)" showCount />
            </Form.Item>
          </div>

        </Form>
      </Modal>

      {/* Log Viewer Drawer */}
      <Drawer
        title={
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
              Webhook Logs
            </div>
            <div style={{ fontSize: '13px', color: '#666', fontWeight: 400 }}>
              Rule: {selectedWebhook?.ruleName} | Business Type: {selectedWebhook?.businessType}
            </div>
          </div>
        }
        placement="right"
        width={800}
        open={isLogDrawerVisible}
        onClose={closeLogDrawer}
        className="webhook-log-drawer"
      >
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Button size="small" icon={<SyncOutlined />}>Refresh</Button>
            <Select defaultValue="all" size="small" style={{ width: 120 }}>
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="success">Success</Select.Option>
              <Select.Option value="failed">Failed</Select.Option>
              <Select.Option value="processing">Processing</Select.Option>
            </Select>
            <Select defaultValue="24h" size="small" style={{ width: 120 }}>
              <Select.Option value="1h">Last 1 Hour</Select.Option>
              <Select.Option value="24h">Last 24 Hours</Select.Option>
              <Select.Option value="7d">Last 7 Days</Select.Option>
              <Select.Option value="30d">Last 30 Days</Select.Option>
            </Select>
          </Space>
        </div>

        <Timeline
          items={mockLogs.map((log) => ({
            dot: getStatusIcon(log.status),
            children: (
              <div className="log-entry">
                <div className="log-header">
                  <Space size="middle">
                    {getStatusBadge(log.status)}
                    <Tag color="blue">{log.eventType}</Tag>
                    <span style={{ color: '#666', fontSize: '12px' }}>{log.timestamp}</span>
                    {log.duration && (
                      <span style={{ color: '#666', fontSize: '12px' }}>
                        Duration: {log.duration}ms
                      </span>
                    )}
                    {log.retryCount !== undefined && log.retryCount > 0 && (
                      <Tag color="orange">Retry: {log.retryCount}</Tag>
                    )}
                  </Space>
                </div>

                <div className="log-details">
                  <div className="log-section">
                    <div className="log-section-title">Request</div>
                    <div className="log-info">
                      <Space>
                        <Tag color="purple">{log.requestMethod}</Tag>
                        <span style={{ fontSize: '12px', color: '#666' }}>{log.requestUrl}</span>
                      </Space>
                    </div>
                    <div className="log-code">
                      <pre>{log.requestPayload}</pre>
                    </div>
                  </div>

                  {log.status === 'success' && log.responseBody && (
                    <div className="log-section">
                      <div className="log-section-title">Response</div>
                      <div className="log-info">
                        <Tag color="green">Status: {log.responseStatus}</Tag>
                      </div>
                      <div className="log-code">
                        <pre>{log.responseBody}</pre>
                      </div>
                    </div>
                  )}

                  {log.status === 'failed' && log.errorMessage && (
                    <div className="log-section">
                      <div className="log-section-title">Error</div>
                      <div className="log-info">
                        <Tag color="red">Status: {log.responseStatus}</Tag>
                      </div>
                      <div className="log-error">
                        {log.errorMessage}
                      </div>
                    </div>
                  )}

                  {log.status === 'processing' && (
                    <div className="log-section">
                      <div className="log-info">
                        <Tag color="blue">Processing</Tag>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          Request is being processed...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          }))}
        />
      </Drawer>
    </Layout>
  )
}

export default WebhookPage
