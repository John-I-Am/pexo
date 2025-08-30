## Getting Started

npm install; cd src/lib/prisma && npx prisma generate; npm run build;

## Environment Variables

| Variable             | Description                           | Example                                  |
| -------------------- | ------------------------------------- | ---------------------------------------- |
| `TARGET`             | Environment target (e.g., dev, prod)  | `dev`                                    |
| `DATABASE_URL`       | PostgreSQL database address           | `postgres://user:pass@localhost:5432/db` |
| `EMAIL_SERVER`       | SMTP server used for sending emails   | `smtp.mailserver.com`                    |
| `EMAIL_FROM`         | Default "from" email address          | `noreply@pexo.com`                       |
| `EMAIL_USER`         | Email username/login                  | `your-email@example.com`                 |
| `EMAIL_PASS`         | Email password                        | `your-email-password`                    |
| `BETTER_AUTH_SECRET` | Secret key for Better Auth encryption | `your-secret-key`                        |
