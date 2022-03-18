import { useAuth } from '../components/auth-provider'
import { env } from '../config/env'

export const LoginPage = () => {
  const auth = useAuth()
  // @ts-ignore
  const params = new URLSearchParams({
    expiration: '1day',
    name: 'Trello Clinet App',
    scope: 'read,write',
    response_type: 'token',
    key: env.TRELLO_API_KEY
  }).toString()

  return (
    <div className="flex flex-col justify-center items-center pt-16 text-center">
      <h1 className="text-2xl">Login with your Trello account</h1>

      <div className="w-96 my-4">
        Get your Trello account token and enter it in form below. This data is
        not stored or sent anywhere. When you refresh the page it will be gone.
      </div>

      <a
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://trello.com/1/authorize?${params}`}
      >
        Get your Trello account token
      </a>

      <form
        className="pt-4"
        onSubmit={event => {
          event.preventDefault()
          const token = new FormData(event.currentTarget).get('token') as string
          auth.login(token)
        }}
      >
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="token">
            Your Trello Token
          </label>
          <input
            className="border border-gray-600 px-4 py-2 rounded-md"
            required
            id="token"
            name="token"
            type="text"
            placeholder="Enter your token..."
          />
        </div>
        <div className="my-2">
          <button
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
