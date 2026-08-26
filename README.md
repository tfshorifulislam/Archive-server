# StoryHub Server

Backend API for **StoryHub**, a modern social publishing platform where users can create, publish, discover, like, comment on, save, and interact with posts and stories.

## 🔗 Project Links

- Frontend: https://storyhub-iota.vercel.app/
- Frontend Repository: https://github.com/tfshorifulislam/StoryHub
- Backend Repository: https://github.com/tfshorifulislam/StoryHub-server

## 🚀 Features

- User authentication with Better Auth
- Google OAuth authentication
- Email & password authentication
- User profile management
- Create and manage posts
- Image and video upload support
- Cloudinary media storage
- Like and unlike posts
- Save and unsave posts
- Nested comments and replies
- Comment likes
- Instagram-style stories
- Story view tracking
- User-specific post feeds
- Profile-based post retrieval
- PostgreSQL database with Prisma ORM
- RESTful API architecture
- CORS configuration
- Error handling and API validation

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Better Auth
- Cloudinary
- REST API

## 📁 Project Structure


StoryHub-server/

src/
  controllers/
  routes/
  middleware/
  services/
  lib/
  types/
  server.ts

prisma/
  schema.prisma

package.json
tsconfig.json
README.md

****
git clone https://github.com/tfshorifulislam/StoryHub-server.git

cd StoryHub-server

npm install

npx prisma generate

npx prisma migrate dev

npm run dev

.env

DATABASE_URL="your_postgresql_database_url"

FRONTEND_URL="http://localhost:3000"

BETTER_AUTH_SECRET="your_better_auth_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

🗄️ Database

StoryHub uses PostgreSQL with Prisma ORM.

The database contains models for:

Users
Sessions
Accounts
Posts
Saved Posts
Comments
Comment Likes
Stories
Story Views
