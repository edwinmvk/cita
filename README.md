<h1 align="center">Conversational Interview and Training Assistant - CITA</h1>
<p>
    <a href="#" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
</p>

✨ Live demo : [https://cita-official.vercel.app](https://cita-official.vercel.app)

## Introduction

This is a web application designed for practicing interviews, built using Next.js and TypeScript. The client-side interface is styled with Tailwind CSS and Shadcn UI. Authentication is managed through Kinde Auth. Each user has a personalized dashboard where they can upload their resume and job description for the interview. The interview process is conducted by a human avatar created using Three.js, featuring lip-sync capabilities, Text-to-Speech (TTS), and Speech-to-Text (STT) functionalities. The application integrates the Gemini API for chatbot interactions and utilizes Hugging Face models for personality evaluation and sentence similarity assessment. Prisma is used as the ORM, interfacing with a PostgreSQL database. This repository contains the source code for the entire application.

## Prerequisites

Before running this project, make sure you have the following software installed on your system:

- Node.js (v22.12.0 or higher)
- pnpm (v9.15 or higher)

## Get Started

**NB**: All the mentioned steps must be done within the `main` branch only.
To get started with the app, you will need to clone this repository and install the dependencies. You can do this by running the following commands in your terminal:

```sh
git clone https://github.com/edwinmoncy/cita.git
cd cita
```

## Setting Environment Variables

In `cita` (root) directory, create a file `.env`

Add the following in the file.

```sh
DATABASE_URL = YOUR_TRANSACTION_POOLER_URL?pgbouncer=true&connection_limit=1
DIRECT_URL = YOUR_SESSION_POOLER_URL

TOKEN=*******************
API_KEY = *******************

KINDE_CLIENT_ID = *******************
KINDE_CLIENT_SECRET = *******************
KINDE_ISSUER_URL = *******************
KINDE_SITE_URL = http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL = http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL = http://localhost:3000/dashboard
```

## Installation

**To install pnpm globally on your device**:

```sh
npm install -g pnpm@latest
```

1. Install the dependencies by running the following commands in your terminal:

```sh
pnpm install
```

2. Set up the Prisma ORM

```
npx prisma generate
npx prisma db push
```

## Usage

Once you have installed the dependencies and set the environment variables, you can run the program by running the following command from the `cita` (root) directory:

```sh
pnpm run dev
```

This will start the project and open the app in your default browser at localhost:3000 .

## License

This project is licensed under the MIT License. See the LICENSE file for details.
