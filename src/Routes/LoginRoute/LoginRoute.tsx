import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../../services/auth'

export function LoginRoute() {
  const auth = getToken() // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return !auth ? <Outlet /> : <Navigate to="/" />
}
