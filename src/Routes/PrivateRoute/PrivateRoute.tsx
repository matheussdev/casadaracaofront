
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../../services/auth'

export function PrivateRoute() {
  const auth = getToken()
  return auth ? <Outlet /> : <Navigate to="/login" />
}
