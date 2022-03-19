import { trelloPopupLogin, useAuth } from '../components/auth-provider'
import { Button } from '../shared/components/button'

export const LoginPage = () => {
  const auth = useAuth()

  return (
    <div className="flex flex-col justify-center items-center pt-16 text-center">
      <div>
        <h1 className="text-2xl">Login with your Trello account</h1>

        <div className="my-4">
          <p className="mb-2">
            Your data is will not be stored or sent anywhere. When you refresh
            the page it will be gone and you will be logged out.
          </p>
          <p>
            Keep in mind that every change that you make here will reflect on
            your data on Trello.
          </p>
        </div>

        <div className="py-2">
          <Button onClick={() => trelloPopupLogin().then(auth.login)}>
            Login with Trello
          </Button>
        </div>

        <div className="py-8 absolute bottom-0 right-2 md:top-0">
          <a
            className="text-gray-500 border border-gray-200 px-4 py-2 rounded-md"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/markorusic/trello-client-app"
          >
            GitHub - Source Code
          </a>
        </div>
      </div>
    </div>
  )
}
