# Vidya Setu (CampusAsk)

**Vidya Setu** (CampusAsk) is a comprehensive, modern academic collaboration portal designed for educational institutions. It serves as a digital bridge between students, faculty, and administrators, allowing students to clear their academic doubts, schedule direct meetings with faculty, and allowing administrators to moderate content and manage users.

---

## 🌟 Key Features

### 🎓 For Students
- **Inquiry Hub (Q&A)**: Post doubts for specific subjects and chapters with Markdown description and LaTeX formulas (via KaTeX).
- **Browse & Filter**: Easy search/filtering of doubts by subject, chapter, status (Open, Answered, Resolved), and tags.
- **Answer Discussion**: View faculty answers, upvote helpful answers, and track doubt resolution status.
- **Meeting Scheduler**: Book 1-on-1 virtual or in-person sessions using faculty's predefined availability slots.
- **Bookmarks**: Bookmark/save doubts to refer back to later.

### 🏫 For Faculty
- **Doubt Resolution**: Review, search, and answer student questions using a rich editor supporting Markdown and KaTeX math formulas.
- **Availability Management**: Set up weekly/custom calendar time slots.
- **Meeting Coordinator**: Accept, reject, or reschedule student meeting requests.
- **Personal Library/Subjects**: Access subjects and engagement analytics.

### 🛡️ For Administrators
- **User Management**: Add, update, and manage student, faculty, and administrator accounts.
- **Subject & Chapter Setup**: Add new subjects and organize chapters.
- **Content Moderation**: Monitor flagged doubts and answers, with the capability to hide/delete inappropriate content.
- **Platform Analytics**: Campus-wide metrics on engagement, doubts posted, and resolution rate.

---

## 💻 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Database ORM**: [Prisma](https://www.prisma.io/) with PostgreSQL provider
- **Styling**: Tailwind CSS v4, Vanilla CSS, Lucide React icons
- **Security & Auth**: Role-based access control, Cookie-based custom JWT authentication (`jose` / `bcryptjs`)
- **Rich Rendering**: KaTeX support (`katex`) for rendering mathematical and scientific formulas

---

## 🛠️ Getting Started

### 📋 Prerequisites
- Node.js (v18+)
- PostgreSQL database instance running locally or hosted

### ⚙️ Environment Configuration
Create a `.env` file in the root directory and configure the environment variables:
```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<db_name>?schema=public"
JWT_SECRET="your_secure_jwt_secret_key"
```

### 🚀 Running the Project

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Schema Setup**
   Push the Prisma schema to your PostgreSQL database:
   ```bash
   npx prisma db push
   ```

3. **Seed Initial Data**
   Populate subjects, chapters, and the default system administrator:
   ```bash
   npx prisma db seed
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the portal.

---

## 🔑 Default Credentials

Once the seed script runs successfully, you can sign in to the platform with these default credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@campusask.edu` | `Admin@123` |

> [!NOTE]
> Students and Faculty can register via the registration page or can be created and managed directly through the Administrator Dashboard.
