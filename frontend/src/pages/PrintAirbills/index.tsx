import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'

interface Order {
  airbillNo: string
  status: string
  billToCustomer: string
  weight: number
  length: number
  width: number
  height: number
  from: {
    company?: string
    address1?: string
    address2?: string
    city: string
    state: string
    zipCode: string
  }
  to: {
    company?: string
    attentionName?: string
    address1?: string
    city: string
    state: string
    zipCode: string
  }
  shippingInfo: {
    serviceType: string
    customerAccountNumber: string
  }
}

function PrintAirbillsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const orders = (location.state?.orders || []) as Order[]

  const handlePrint = () => {
    window.print()
  }

  const handleExit = () => {
    navigate('/')
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No orders to print</h2>
        <Button onClick={handleExit}>Return to Orders</Button>
      </div>
    )
  }

  return (
    <div className="print-airbills-page">
      {/* Header - Hidden when printing */}
      <div className="print-header no-print">
        <h1>Print Airbills</h1>
      </div>

      {/* Airbills Container */}
      <div className="airbills-container">
        {orders.map((order, index) => (
          <div key={order.airbillNo} className="airbill-page">
            <div className="airbill-header no-print">
              <h2>Airbill #{index + 1}</h2>
            </div>

            <div className="airbill-content">
              {/* Top Section - Logo, Barcode, Contact Info */}
              <div className="top-section">
                {/* LSO Logo */}
                <div className="lso-logo">
                  <svg width="100" height="50" viewBox="0 0 100 50">
                    <text x="5" y="30" fontSize="28" fontWeight="bold" fill="#1890ff">LSO</text>
                    <text x="5" y="42" fontSize="8" fill="#1890ff">Lone Star Overnight</text>
                  </svg>
                </div>

                {/* Barcode */}
                <div className="barcode-section">
                  <svg width="200" height="60" viewBox="0 0 200 60">
                    <rect x="0" y="0" width="3" height="60" fill="black"/>
                    <rect x="5" y="0" width="2" height="60" fill="black"/>
                    <rect x="9" y="0" width="4" height="60" fill="black"/>
                    <rect x="15" y="0" width="2" height="60" fill="black"/>
                    <rect x="19" y="0" width="3" height="60" fill="black"/>
                    <rect x="24" y="0" width="2" height="60" fill="black"/>
                    <rect x="28" y="0" width="4" height="60" fill="black"/>
                    <rect x="34" y="0" width="3" height="60" fill="black"/>
                    <rect x="39" y="0" width="2" height="60" fill="black"/>
                    <rect x="43" y="0" width="3" height="60" fill="black"/>
                    <rect x="48" y="0" width="4" height="60" fill="black"/>
                    <rect x="54" y="0" width="2" height="60" fill="black"/>
                    <rect x="58" y="0" width="3" height="60" fill="black"/>
                    <rect x="63" y="0" width="2" height="60" fill="black"/>
                    <rect x="67" y="0" width="4" height="60" fill="black"/>
                    <rect x="73" y="0" width="3" height="60" fill="black"/>
                    <rect x="78" y="0" width="2" height="60" fill="black"/>
                    <rect x="82" y="0" width="3" height="60" fill="black"/>
                    <rect x="87" y="0" width="4" height="60" fill="black"/>
                    <rect x="93" y="0" width="2" height="60" fill="black"/>
                    <rect x="97" y="0" width="3" height="60" fill="black"/>
                    <rect x="102" y="0" width="2" height="60" fill="black"/>
                    <rect x="106" y="0" width="4" height="60" fill="black"/>
                    <rect x="112" y="0" width="3" height="60" fill="black"/>
                    <rect x="117" y="0" width="2" height="60" fill="black"/>
                  </svg>
                  <div className="airbill-number">Airbill No: {order.airbillNo}</div>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                  <div className="contact-name">LSO</div>
                  <div className="contact-phone">1-800-800-5504</div>
                  <div className="contact-website">www.lso.com</div>
                </div>
              </div>

              {/* Address Section - Ship To and From */}
              <div className="address-section">
                {/* Ship To */}
                <div className="ship-to-block">
                  <div className="address-label">SHIP TO:</div>
                  <div className="address-name">{order.billToCustomer.split('(')[0].trim()}</div>
                  <div className="address-line">{order.to.company}</div>
                  <div className="address-line">{order.to.address1}</div>
                  <div className="address-line">{order.to.city}, {order.to.state} {order.to.zipCode}</div>
                  <div className="address-line">{order.shippingInfo.customerAccountNumber}</div>
                </div>

                {/* From */}
                <div className="from-block">
                  <div className="from-label">From:</div>
                  <div className="from-line">{order.from.company?.split(' ')[0] || 'ANDY'} {order.from.company?.split(' ')[1] || 'LEE'}</div>
                  <div className="from-line">{order.from.company}</div>
                  <div className="from-line">{order.from.address1}</div>
                  <div className="from-line">{order.from.city}, {order.from.state} {order.from.zipCode}</div>
                  <div className="from-line">{order.shippingInfo.customerAccountNumber}</div>
                </div>
              </div>

              {/* Service Banner */}
              <div className="service-banner">
                <div className="service-code">W AUS</div>
                <div className="service-info">
                  <div className="service-type">LSO GROUND</div>
                  <div className="service-desc">END OF BUSINESS DAY DELIVERY</div>
                </div>
              </div>

              {/* Package Details */}
              <div className="package-details">
                <div className="detail-line">
                  <span>PRINT DATE: {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                  <span>REF#:</span>
                </div>
                <div className="detail-line">
                  <span>PACKAGE: 1 OF 1</span>
                  <span>WEIGHT: {order.weight} LBS</span>
                </div>
                <div className="detail-line-full">
                  REF 2: LOCATION=FORT WORTH INTL PKWY(FTW) REF 2:
                </div>
              </div>

              {/* Fold Line */}
              <div className="fold-line">
                <div className="fold-text">Fold on above line and place shipping label in pouch on package. Please be sure the barcodes and addresses can be read and scanned.</div>
              </div>

              {/* Shipping Instructions */}
              <div className="shipping-instructions">
                <div className="instruction-title">Shipping Instructions:</div>
                <ol>
                  <li>Fold this edge along the horizontal line above.</li>
                  <li>Place this label in the shipping label pouch on the package you are shipping. Please be sure the barcodes and addresses can be read and scanned.</li>
                  <li>To create a drop box near you, click on Find Drop Box from the home page main menu.</li>
                  <li>To schedule a pickup, click on Request Pickup.</li>
                </ol>
              </div>

              {/* Warning Section */}
              <div className="warning-section">
                <p><strong>WARNING:</strong> Use only the printed mailing label for shipping. Using a photocopy of this label for shipping purposes is fraudulent and could result in additional billing charges, along with the cancellation of your Lone Star Overnight account number.</p>
              </div>

              {/* Liability Section */}
              <div className="liability-section">
                <p><strong>LIMIT OF LIABILITY:</strong> We are not responsible for claims in excess of $100.00 for any item unless you: 1) declare a greater value (not to exceed $25,000); 2) pay an additional fee; 3) and document actual loss in a timely manner. We will not pay any claim in excess of the actual loss. We are not liable for any special or consequential damages. Additional limitations of liability are contained in our current Service Guide. If you are to deliver a package without obtaining a delivery signature, you release us of all liability for claims resulting from such service. NO DELIVERY SIGNATURE WILL BE OBTAINED FOR 2-DAY AM DELIVERIES OR RESIDENTIAL DELIVERIES.</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons - Hidden when printing */}
      <div className="print-actions no-print">
        <Button 
          size="large" 
          onClick={handleExit}
          style={{ 
            minWidth: '120px', 
            marginRight: '12px',
            height: '40px',
            fontSize: '14px',
            borderColor: '#0066cc',
            color: '#0066cc'
          }}
        >
          Exit
        </Button>
        <Button 
          type="primary" 
          size="large" 
          onClick={handlePrint}
          style={{ 
            minWidth: '120px',
            height: '40px',
            fontSize: '14px',
            background: '#0066cc',
            borderColor: '#0066cc'
          }}
        >
          Print
        </Button>
      </div>
    </div>
  )
}

export default PrintAirbillsPage
