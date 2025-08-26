export interface Data {
  user: User
  accessToken: string
  refreshToken: string
}

export interface User {
  id: number
  fullname: string
  username: string
  email: string
  phone: string
  gender: any
  birthDate: string
  avatar: string
  role: string
  isVerified: boolean
  address: any
  latitude: any
  longitude: any
  isActive: boolean
  specialStatus: any
  emailVerified: boolean
  phoneVerified: boolean
  provider: any
  providerId: any
  createdAt: string
  updatedAt: string
  deletedAt: any
}