import { Routes, Route } from 'react-router-dom'
import SmallParcelPage from './pages/SmallParcel'
import ArchivedOrdersPage from './pages/ArchivedOrders'
import ExportHistoryPage from './pages/ExportHistory'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SmallParcelPage />} />
      <Route path="/archived-orders" element={<ArchivedOrdersPage />} />
      <Route path="/export-history" element={<ExportHistoryPage />} />
    </Routes>
  )
}

export default App
