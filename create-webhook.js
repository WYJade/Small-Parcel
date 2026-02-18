const fs = require('fs');

const content = `import { useState } from 'react'
import { Layout, Button, Table, Space, Tabs, Modal, Form, Input, Select, Switch, Tag, Dropdown } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './index.css'

const { Sider, Content, Header } = Layout

interface WebhookData {
  key: string
  ruleName: string
  businessType: string
  warehouse: string
  eventType: string
  returnType: string
  status: boolean
  createdAt: string
}

const mockWebhooks: WebhookData[] = [
  {
    key: '1',
    ruleName: 'backoffAPI',
    businessType: 'LSO',
    warehouse: '-',
    eventType: 'Order Created',
    returnType: 'Webhook',
    status: true,
    createdAt: '07/20/2025 3:47:42 PM'
  }
]

function WebhookPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('PO')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

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
      title: 'Warehouse',
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: 150
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
      width: 120,
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small" />
          <Button type="link" danger icon={<DeleteOutlined />} size="small" />
        </Space>
      )
    }
  ]

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values)
      setIsModalVisible(false)
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
            <div style={{ padding: '0 24px 24px' }}><Table columns={columns} dataSource={mockWebhooks} pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => \`Total: \${total} records\`, position: ['bottomLeft'] }} size="small" /></div>
          </Content>
        </Layout>
      </Layout>
      <Modal title="Add New Webhook" open={isModalVisible} onCancel={handleCancel} width={800} footer={[<Button key="cancel" onClick={handleCancel}>Cancel</Button>, <Button key="save" type="primary" onClick={handleSave} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>Save</Button>]} className="webhook-modal">
        <Form form={form} layout="vertical" style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '16px' }}>
          <div className="form-section"><h3 className="section-title">Basic Information</h3><Form.Item label="Rule Name" name="ruleName" rules={[{ required: true, message: 'Please enter rule name' }]}><Input placeholder="Rule Name" /></Form.Item><Form.Item label="Warehouse" name="warehouse"><Select placeholder="Warehouse"><Select.Option value="warehouse1">Warehouse 1</Select.Option><Select.Option value="warehouse2">Warehouse 2</Select.Option></Select></Form.Item><Form.Item label="Event Type" name="eventType" rules={[{ required: true, message: 'Please select event type' }]}><Select placeholder="Event Type"><Select.Option value="order_created">Order Created</Select.Option><Select.Option value="order_updated">Order Updated</Select.Option><Select.Option value="order_shipped">Order Shipped</Select.Option><Select.Option value="order_delivered">Order Delivered</Select.Option></Select></Form.Item></div>
          <div className="form-section"><h3 className="section-title">Webhook Configuration</h3><Form.Item label="Webhook URL" name="webhookUrl" rules={[{ required: true, message: 'Please enter webhook URL' }, { type: 'url', message: 'Please enter a valid URL' }]}><Input placeholder="https://example.com/webhook" /></Form.Item><Form.Item label="HTTP Method" name="httpMethod" initialValue="POST"><Select><Select.Option value="POST">POST</Select.Option><Select.Option value="GET">GET</Select.Option><Select.Option value="PUT">PUT</Select.Option></Select></Form.Item><Form.Item label="Authentication Method" name="authMethod"><Select placeholder="Select authentication method"><Select.Option value="none">None</Select.Option><Select.Option value="basic">Basic Auth (Username/Password)</Select.Option><Select.Option value="bearer">Bearer Token</Select.Option><Select.Option value="apikey">API Key</Select.Option><Select.Option value="oauth2">OAuth 2.0</Select.Option><Select.Option value="jwt">JWT</Select.Option></Select></Form.Item><Form.Item label="Username" name="username"><Input placeholder="Username" /></Form.Item><Form.Item label="Password" name="password"><Input.Password placeholder="Password" /></Form.Item><Form.Item label="Custom Headers" name="headers"><Input.TextArea placeholder="Enter custom headers in JSON format" rows={4} /></Form.Item><Form.Item label="Data Format" name="dataFormat" initialValue="json"><Select><Select.Option value="json">JSON</Select.Option><Select.Option value="xml">XML</Select.Option><Select.Option value="form">Form Data</Select.Option></Select></Form.Item></div>
          <div className="form-section"><h3 className="section-title">Return Configuration</h3><Form.Item label="Return Type" name="returnType" rules={[{ required: true, message: 'Please select return type' }]}><Select placeholder="Return Type"><Select.Option value="webhook">Webhook</Select.Option><Select.Option value="callback">Callback</Select.Option><Select.Option value="polling">Polling</Select.Option></Select></Form.Item></div>
          <div className="form-section"><h3 className="section-title">Retry Configuration</h3><Form.Item label="Retry Times" name="retryTimes" initialValue={3} extra="Maximum number of retry attempts if the event delivery fails"><Input type="number" placeholder="Retry Times" min={0} max={10} /></Form.Item><Form.Item label="Retry Interval (seconds)" name="retryInterval" initialValue={60}><Input type="number" placeholder="Retry Interval" min={1} /></Form.Item><Form.Item label="Enable Retry" name="enableRetry" valuePropName="checked" initialValue={false}><Switch /></Form.Item></div>
          <div className="form-section"><h3 className="section-title">Test Configuration</h3><Form.Item label="Test Payload" name="testPayload"><Input.TextArea placeholder="Enter test payload in JSON format" rows={4} /></Form.Item><Form.Item><Button type="default">Test Webhook</Button></Form.Item></div>
          <div className="form-section"><h3 className="section-title">Additional Information</h3><Form.Item label="Status" name="status" valuePropName="checked" initialValue={true}><Switch checkedChildren="Active" unCheckedChildren="Inactive" /></Form.Item><Form.Item label="Remark" name="remark"><Input.TextArea placeholder="Remark" rows={3} /></Form.Item></div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default WebhookPage
`;

fs.writeFileSync('frontend/src/pages/Webhook/index.tsx', content, 'utf8');
console.log('File created successfully');
