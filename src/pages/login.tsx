import React from 'react'
import cx from 'classnames'
import { useAuth } from '../components/auth-provider'
import { env } from '../config/env'
import {
  Button,
  buttonSizes,
  buttonVariants
} from '../shared/components/button'

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
      <div className="w-96">
        <h1 className="text-2xl">Login with your Trello account</h1>

        <div className="my-4">
          Get your Trello account token and enter it in form below. This data is
          not stored or sent anywhere. When you refresh the page it will be
          gone.
        </div>

        <a
          className={cx(buttonVariants.primary, buttonSizes.sm)}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://trello.com/1/authorize?${params}`}
        >
          Get your Trello account token
        </a>

        <form
          className="pt-8"
          onSubmit={event => {
            event.preventDefault()
            const token = new FormData(event.currentTarget).get(
              'token'
            ) as string
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
            <Button
              type="submit"
              className="w-full"
              variant="success"
              size="md"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="py-8 absolute top-2 right-2">
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
