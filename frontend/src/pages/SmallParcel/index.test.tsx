import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../store'
import SmallParcelPage from './index'

describe('SmallParcelPage', () => {
  const renderPage = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SmallParcelPage />
        </BrowserRouter>
      </Provider>
    )
  }

  it('should render page title and description', () => {
    renderPage()
    
    expect(screen.getByText('Small Parcel')).toBeDefined()
    expect(screen.getByText(/Manage small parcel shipments/)).toBeDefined()
  })

  it('should render search input', () => {
    renderPage()
    
    const searchInput = screen.getByPlaceholderText(/Search by Airbill No/)
    expect(searchInput).toBeDefined()
  })

  it('should render Include Archived Orders checkbox', () => {
    renderPage()
    
    expect(screen.getByText('Include Archived Orders')).toBeDefined()
  })

  it('should render Active Filters section', () => {
    renderPage()
    
    expect(screen.getByText('Active Filters:')).toBeDefined()
  })

  it('should render toolbar buttons', () => {
    renderPage()
    
    expect(screen.getByText('Advanced Search')).toBeDefined()
    expect(screen.getByText('Column Settings')).toBeDefined()
    expect(screen.getByText('Export')).toBeDefined()
  })

  it('should render order table with correct columns', () => {
    renderPage()
    
    expect(screen.getByText('AIRBILL NO')).toBeDefined()
    expect(screen.getByText('CUSTOMER NAME')).toBeDefined()
    expect(screen.getByText('BILLING REF')).toBeDefined()
    expect(screen.getByText('STATUS')).toBeDefined()
    expect(screen.getByText('SERVICE TYPE')).toBeDefined()
    expect(screen.getByText('SERVICE CENTER')).toBeDefined()
    expect(screen.getByText('FROM CITY')).toBeDefined()
    expect(screen.getByText('TO CITY')).toBeDefined()
    expect(screen.getByText('TO ATTN')).toBeDefined()
    expect(screen.getByText('TO ZIP')).toBeDefined()
    expect(screen.getByText('CREATE TIME')).toBeDefined()
    expect(screen.getByText('LAST OPERATION TIME')).toBeDefined()
  })

  it('should display mock order data', () => {
    renderPage()
    
    expect(screen.getByText('AWB001234567')).toBeDefined()
    expect(screen.getByText('ABC Corporation')).toBeDefined()
  })
})
