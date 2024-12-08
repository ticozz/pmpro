import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface VerifyResult {
  success: boolean
  data?: any
  error?: string
}

export function verify(token: string): VerifyResult {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { success: true, data: decoded }
  } catch (error) {
    return { success: false, error: 'Invalid token' }
  }
}

export function sign(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
} 