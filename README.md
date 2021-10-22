# Simple Blog

This is a simple blogging application.

## ✨ Quick Start Guide

```bash
yarn # install dependencies
npm install netlify-cli -g # install netlify dev
yarn dev # Start client and server
```

## 🔗 Linking a database

When you first run the app locally you will get an error message saying `no database found`. This app needs a database to function.

Set up a free database at [ElephantSQL](https://www.elephantsql.com). Once it is created you will get a Database URL. We need to add this URL to your environment so the app knows where to save data. Copy the URL and paste it into the `.env.example` file.

## 💻 The code

Inside the `src` folder you will find two directories: `server` and `client`.

- `server` contains the Node code that runs the server.
- `client` contains the React code that runs the client.

## ✅ The tasks

You are now ready to work on this project. Click the 'Projects' tab on github to get started.
