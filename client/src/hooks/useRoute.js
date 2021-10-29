import { useHistory } from 'react-router'

export function useRoute() {
  const history = useHistory();

  const handleRoute = (route) => {
    return history.push(route)
  }

  return handleRoute
}
