import { Modal, Button, Select, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './RTSDialog.css'

interface Address {
  terminal?: string
  company?: string
  attentionName?: string
  phone?: string
  address1?: string
  address2?: string
  city: string
  state: string
  zipCode: string
}

interface Order {
  airbillNo: string
  status: string
  billingRef?: string
  serviceType: string
  billToCustomer: string
  length: number
  width: number
  height: number
  weight: number
  from: Address
  to: Address
  shippingInfo: {
    serviceType: string
    declaredValue: number
    customerAccountNumber: string
    length: number
    width: number
    height: number
  }
}

interface RTSDialogProps {
  visible: boolean
  selectedOrders: Order[]
  onCancel: () => void
  onCreateReturnLabel: () => void
}

const RTSDialog: React.FC<RTSDialogProps> = ({
  visible,
  selectedOrders,
  onCancel,
  onCreateReturnLabel
}) => {
  if (selectedOrders.length === 0) return null
  
  const order = selectedOrders[0] // 显示第一个选中的订单

  return (
    <Modal
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#262626' }}>RTS Order</span>
          <CloseOutlined 
            onClick={onCancel} 
            style={{ fontSize: '16px', color: '#8c8c8c', cursor: 'pointer' }}
          />
        </div>
      }
      open={visible}
      onCancel={onCancel}
      width={1000}
      closeIcon={null}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 0' }}>
          <Button onClick={onCancel} size="large" style={{ minWidth: '100px' }}>
            Cancel
          </Button>
          <Button 
            type="primary" 
            onClick={onCreateReturnLabel}
            size="large"
            style={{ 
              minWidth: '180px',
              background: '#7c3aed',
              borderColor: '#7c3aed'
            }}
          >
            Create Return Label
          </Button>
        </div>
      }
      className="rts-dialog-modern"
      styles={{
        body: { padding: '24px 32px' }
      }}
    >
      {/* Original Package Information */}
      <div className="section-header">ORIGINAL PACKAGE INFORMATION</div>
      
      <div className="info-row">
        <div className="info-col">
          <div className="field-label">AIRBILLNO:</div>
          <div className="field-value">{order.airbillNo}</div>
        </div>
        <div className="info-col">
          <div className="field-label">STATUS:</div>
          <div className="field-value">{order.status}</div>
        </div>
        <div className="info-col">
          <div className="field-label">BILLING REF:</div>
          <div className="field-value">{order.billingRef || ''}</div>
        </div>
        <div className="info-col">
          <div className="field-label">SERVICE TYPE:</div>
          <div className="field-value">{order.serviceType}</div>
        </div>
      </div>

      <div className="info-row">
        <div className="info-col">
          <div className="field-label">BILL TO CUSTOMER:</div>
          <div className="field-value">{order.billToCustomer}</div>
        </div>
        <div className="info-col">
          <div className="field-label">LENGTH (L):</div>
          <div className="field-value">{order.length} in</div>
        </div>
        <div className="info-col">
          <div className="field-label">WIDTH (W):</div>
          <div className="field-value">{order.width} in</div>
        </div>
        <div className="info-col">
          <div className="field-label">HEIGHT (H):</div>
          <div className="field-value">{order.height} in</div>
        </div>
      </div>

      <div className="info-row">
        <div className="info-col">
          <div className="field-label">WEIGHT (LBS):</div>
          <div className="field-value">{order.weight} lbs</div>
        </div>
      </div>

      {/* From and To Sections */}
      <div className="address-grid">
        <div className="address-panel">
          <div className="section-header">FROM</div>
          
          <div className="form-field">
            <label>TERMINAL <span className="required">*</span></label>
            <Select 
              value={order.from.terminal || 'Select Terminal'}
              disabled
              style={{ width: '100%' }}
              size="large"
            />
          </div>

          <div className="form-field">
            <label>COMPANY <span className="required">*</span></label>
            <Input 
              value={order.from.company || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>PHONE <span className="required">*</span></label>
            <Input 
              value={order.from.phone || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>ADDRESS1 <span className="required">*</span></label>
            <Input 
              value={order.from.address1 || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>ADDRESS2</label>
            <Input 
              value={order.from.address2 || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>CITY <span className="required">*</span></label>
            <Input 
              value={order.from.city} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>STATE <span className="required">*</span></label>
            <Input 
              value={order.from.state} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>ZIP CODE <span className="required">*</span></label>
            <Input 
              value={order.from.zipCode} 
              readOnly 
              size="large"
            />
          </div>
        </div>

        <div className="address-panel">
          <div className="section-header">TO</div>
          
          <div className="form-field">
            <label>COMPANY <span className="required">*</span></label>
            <Input 
              value={order.to.company || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>ATTENTION NAME</label>
            <Input 
              value={order.to.attentionName || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>PHONE <span className="required">*</span></label>
            <Input 
              value={order.to.phone || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>ADDRESS1 <span className="required">*</span></label>
            <Input 
              value={order.to.address1 || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>ADDRESS2</label>
            <Input 
              value={order.to.address2 || ''} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>CITY <span className="required">*</span></label>
            <Input 
              value={order.to.city} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>STATE <span className="required">*</span></label>
            <Input 
              value={order.to.state} 
              readOnly 
              size="large"
            />
          </div>

          <div className="form-field">
            <label>ZIP CODE <span className="required">*</span></label>
            <Input 
              value={order.to.zipCode} 
              readOnly 
              size="large"
            />
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="section-header" style={{ marginTop: '32px' }}>SHIPPING INFORMATION</div>
      
      <div className="info-row">
        <div className="info-col">
          <div className="form-field">
            <label>SERVICE TYPE <span className="required">*</span></label>
            <Select 
              value={order.shippingInfo.serviceType}
              disabled
              style={{ width: '100%' }}
              size="large"
            />
          </div>
        </div>
        <div className="info-col">
          <div className="form-field">
            <label>DECLARED VALUE</label>
            <Input 
              value={order.shippingInfo.declaredValue} 
              readOnly 
              size="large"
            />
          </div>
        </div>
      </div>

      <div className="info-row">
        <div className="info-col">
          <div className="form-field">
            <label>CUSTOMER ACCOUNT NUMBER <span className="required">*</span></label>
            <Input 
              value={order.shippingInfo.customerAccountNumber} 
              readOnly 
              size="large"
            />
          </div>
        </div>
        <div className="info-col">
          <div className="form-field">
            <label>LENGTH (L) <span className="required">*</span></label>
            <Input 
              value={order.shippingInfo.length} 
              readOnly 
              size="large"
            />
          </div>
        </div>
      </div>

      <div className="info-row">
        <div className="info-col">
          <div className="form-field">
            <label>WIDTH (W) <span className="required">*</span></label>
            <Input 
              value={order.shippingInfo.width} 
              readOnly 
              size="large"
            />
          </div>
        </div>
        <div className="info-col">
          <div className="form-field">
            <label>HEIGHT (H) <span className="required">*</span></label>
            <Input 
              value={order.shippingInfo.height} 
              readOnly 
              size="large"
            />
          </div>
        </div>
      </div>

      <div className="info-row">
        <div className="info-col">
          <div className="form-field">
            <label>WEIGHT (LBS) <span className="required">*</span></label>
            <Input 
              value={order.weight} 
              readOnly 
              size="large"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default RTSDialog
