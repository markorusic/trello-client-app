import { useQuery } from 'react-query'
import { userService } from '../services/user-service'

export const userQueryKeys = {
  user: 'user'
}

export const useUser = () =>
  useQuery(userQueryKeys.user, userService.fetchMe, {
    staleTime: 5 * 60 * 1000
  })
