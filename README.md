## Getting Started

First add ".env" file

Add env file inside

DATABASE_URL="mongodb+srv://umutincek:gls3wubY3qStuKg8@cluster0.dui3xys.mongodb.net/kanbanboard?retryWrites=true&w=majority&appName=Cluster0"

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Change db source:

Open .env and change "DATABASE_URL"

Prisma db push to mongo db:

npx prisma db push
