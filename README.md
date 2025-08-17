# odin-book

### App Title: <ins>**_Postly_**</ins>

![Postly App Image](https://imgur.com/iSs3A9H.jpg)

## Live Demo

You can access the website here: https://markpandan-postly.vercel.app/

## Features

This is a social media app that features the following key aspects:

- **Account management** - Allows to sign up, and log in which utilizes [JWT (JSON Web Token)](https://www.jwt.io/introduction) as authentication. It can also allow you personalize your profile!
- **Interact with users** - You can request a follow for them, and interact by sending a like or comment on their posts!
- **Seamless design** - The website was designed with Tailwind CSS, and it can also personlize the user's interest if they prefer dark or light mode.

## Installation

Clone this repository, and install the necessary modules by running this command in your command line that was relative to the file directory you've created:

```
npm install
```

The backend of this app was located at [odin-book-api
](https://github.com/markpandan/odin-book-api). Make sure to run them side-by-side to ensure that it works.

This app utilizes environment variable to secretly store the API URL. Make sure to create an `.env` file, and the place the URL of the configured API of this app to continue:

```
VITE_API_URL = "your_api_url"
```

You can now run the app by executing this command. A URL link will be provided as an output which you need to access:

```
npm run dev
```

## Components

This repository utilizes the following libraries and/or APIs:

- [React](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
