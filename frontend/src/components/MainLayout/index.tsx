import { ReactNode } from 'react'
import { Layout, Menu, Dropdown, Button } from 'antd'
import { AppstoreOutlined, InboxOutlined, HistoryOutlined, DownOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.css'

const { Sider, Content, Header } = Layout

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // 根据当前路径确定选中的菜单项
  const getSelectedKey = () => {
    if (location.pathname === '/') return 'small-parcel'
    if (location.pathname === '/archived-orders') return 'archived-orders'
    if (location.pathname === '/export-history') return 'export-history'
    return 'small-parcel'
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header style={{ background: '#001529', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* OMS Logo 和标题 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: '#7c3aed', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#fff'
            }}>
              🏢
            </div>
            <span style={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>OMS</span>
          </div>
          
          {/* LSO 下拉选择器 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ color: '#999', fontSize: '14px' }}>LSO</div>
            <Dropdown
              menu={{
                items: [
                  { key: 'lso_001', label: 'lso_001' },
                  { key: 'lso_002', label: 'lso_002' },
                  { key: 'lso_003', label: 'lso_003' }
                ]
              }}
            >
              <Button type="text" style={{ color: '#999', padding: '4px 8px' }}>
                lso_001 <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        
        <div style={{ color: '#fff', fontSize: '16px' }}>
          Logistics
        </div>
      </Header>
      
      <Layout>
        {/* 左侧菜单 */}
        <Sider width={240} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            defaultOpenKeys={['logistics']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: 'logistics',
                icon: <AppstoreOutlined />,
                label: 'Logistics',
                children: [
                  {
                    key: 'small-parcel',
                    label: 'Small Parcel',
                    onClick: () => navigate('/')
                  },
                  {
                    key: 'archived-orders',
                    icon: <InboxOutlined />,
                    label: 'Archived Orders',
                    onClick: () => navigate('/archived-orders')
                  },
                  {
                    key: 'export-history',
                    icon: <HistoryOutlined />,
                    label: 'Export History',
                    onClick: () => navigate('/export-history')
                  }
                ]
              }
            ]}
          />
        </Sider>
        
        {/* 主内容区域 */}
        <Layout>
          <Content style={{ background: '#fff' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
