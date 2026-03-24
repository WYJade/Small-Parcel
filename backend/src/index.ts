import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { INELIGIBLE_STATUSES_FOR_WEATHER_DELAY, WEATHER_DELAY_STATUS, isEligibleForWeatherDelay } from './types/order.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OMS Backend is running' })
})

// Weather Delay 标记 API
app.put('/api/orders/weather-delay', (req, res) => {
  try {
    const { airbillNos } = req.body

    if (!airbillNos || !Array.isArray(airbillNos) || airbillNos.length === 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_REQUEST', message: 'airbillNos array is required and must not be empty' }
      })
    }

    // 模拟：直接返回成功（实际项目中会查询数据库校验）
    res.json({
      success: true,
      data: {
        updatedCount: airbillNos.length,
        orders: airbillNos.map((no: string) => ({
          airbillNo: no,
          status: WEATHER_DELAY_STATUS.status,
          statusCode: WEATHER_DELAY_STATUS.statusCode,
          subStatus: WEATHER_DELAY_STATUS.subStatus,
          scanCode: WEATHER_DELAY_STATUS.scanCode
        }))
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' }
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
