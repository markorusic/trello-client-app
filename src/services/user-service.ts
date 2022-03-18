import { trelloClient } from '../components/auth-provider'

export interface UserDto {
  id: string
  avatarUrl: string
  fullName: string
  username: string
  email: string
}

const fields = ['avatarUrl', 'username', 'email', 'fullName'].join(',')

export const userService = {
  fetchMe: async (): Promise<UserDto> => {
    const { data } = await trelloClient.get<UserDto>('/members/me', {
      params: { fields }
    })
    return {
      ...data,
      avatarUrl: `${data.avatarUrl}/60.png`
    }
  }
}
