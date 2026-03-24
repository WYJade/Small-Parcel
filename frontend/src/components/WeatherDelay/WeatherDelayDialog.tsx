import { Modal, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './WeatherDelayDialog.css'

interface WeatherDelayDialogProps {
  visible: boolean
  selectedCount: number
  onCancel: () => void
  onConfirm: () => void
  loading: boolean
}

const WeatherDelayDialog: React.FC<WeatherDelayDialogProps> = ({
  visible,
  selectedCount,
  onCancel,
  onConfirm,
  loading,
}) => {
  return (
    <Modal
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#262626' }}>Mark as Weather Delay</span>
          <CloseOutlined
            onClick={onCancel}
            style={{ fontSize: '16px', color: '#8c8c8c', cursor: 'pointer' }}
          />
        </div>
      }
      open={visible}
      onCancel={onCancel}
      closeIcon={null}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 0' }}>
          <Button onClick={onCancel} size="large" style={{ minWidth: '100px' }}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={onConfirm}
            loading={loading}
            size="large"
            style={{ minWidth: '200px', background: '#7c3aed', borderColor: '#7c3aed' }}
          >
            Mark as Weather Delay
          </Button>
        </div>
      }
      className="weather-delay-dialog"
      styles={{ body: { padding: '24px 32px' } }}
    >
      <p style={{ fontSize: '15px', color: '#262626', marginBottom: '8px' }}>
        Are you sure you want to set the order status to Weather Delay?
      </p>
      <p style={{ fontSize: '13px', color: '#8c8c8c' }}>
        {selectedCount} order{selectedCount > 1 ? 's' : ''} selected.
      </p>
    </Modal>
  )
}

export default WeatherDelayDialog
