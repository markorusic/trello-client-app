# Trello App Clone

## Project setup

Setup local env file:
```sh
touch .env.local
cat .env > .env.local
```

Now edit `.env.local`, and set your tokens:
```sh
REACT_APP_TRELLO_API_BASE_URL=https://api.trello.com/1
REACT_APP_TRELLO_API_KEY=********
REACT_APP_TRELLO_SERVER_TOKEN=********
```

Install node modules:
```sh
npm i
```

Start dev server:
```sh
npm start
```

Build for production:
```
npm run build
```
