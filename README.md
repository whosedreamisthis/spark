# ✨ Spark

**Spark** is a high-performance, mobile-first social discovery and messaging platform. It features real-time chat, profile management, and an intuitive inbox/outbox system designed for seamless user interaction on the go.

## 🚀 Key Features

-   **Real-Time Messaging**: Instant chat powered by **Pusher**, featuring live message bubbles and global toast notifications.
-   **Mobile-First UI**: A sleek, responsive design using **Tailwind CSS** and **Shadcn/UI**, optimized for touch interactions and bottom-bar navigation.
-   **Secure Authentication**: User management and identity handled by **Clerk**.
-   **Relational Database**: Robust data modeling with **Prisma ORM** and **Neon (Serverless PostgreSQL)**.
-   **Media Management**: Image uploads and profile photo handling integrated with **Cloudinary**.
-   **Activity Tracking**: Live "Online/Offline" status indicators based on user activity heartbeats.

## 🛠️ Tech Stack

| Layer         | Technology                                                                     |
| :------------ | :----------------------------------------------------------------------------- |
| **Framework** | [Next.js 15+](https://nextjs.org/) (App Router)                                |
| **Database**  | [Neon](https://neon.tech/) (PostgreSQL)                                        |
| **ORM**       | [Prisma](https://www.prisma.io/)                                               |
| **Auth**      | [Clerk](https://clerk.com/)                                                    |
| **Real-time** | [Pusher](https://pusher.com/)                                                  |
| **Styling**   | [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) |
| **Storage**   | [Cloudinary](https://cloudinary.com/)                                          |

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/spark.git](https://github.com/your-username/spark.git)
    cd spark
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    npm install ws
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:

    ```env
    # Database
    DATABASE_URL="postgres://user:pass@host/neondb?sslmode=require"

    # Clerk Auth
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...

    # Pusher (Real-time)
    PUSHER_APP_ID=...
    NEXT_PUBLIC_PUSHER_APP_KEY=...
    PUSHER_SECRET=...
    NEXT_PUBLIC_PUSHER_CLUSTER=...

    # Cloudinary
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    ```

4.  **Database Sync:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🏗️ Project Structure

```text
├── app/
│   ├── actions/          # Server Actions (Messages, Members, Photos)
│   ├── members/          # Member profiles and Real-time Chat UI
│   ├── messages/         # Inbox/Outbox management with Bottom Bar
│   └── profile/          # User profile editing & photo management
├── components/           # Reusable UI components (MessageList, ChatForm, etc.)
├── lib/
│   ├── prisma.ts         # Neon/Prisma client with WebSocket fallback
│   ├── pusher.ts         # Pusher client/server initialization
│   └── utils.ts          # Helper functions (isOnline, cn, etc.)
└── prisma/
    └── schema.prisma     # Database models & relationships
```
