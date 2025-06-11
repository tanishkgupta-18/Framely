# 📸 Framely

**Framely** is a modern Next.js 14 application that helps you **edit images for social media**, **remove backgrounds**, and **generate AI-powered scenes** for your uploads. It also supports **video uploads with compression**.

Built using **Next.js 14**, **TailwindCSS**, **Cloudinary**, **Prisma**, and **ShadCN UI**, Framely provides a slick, real-time, cloud-powered experience.

---

## ✨ Features

### 🖼️ Social Media Image Formatter
- Upload an image and convert it into:
  - Instagram Square (1:1)
  - Instagram Portrait (4:5)
  - Twitter Post (16:9)
  - Twitter Header (3:1)
  - Facebook Cover (205:78)
- Instant preview + download support.

### 🧼 Background Remover
- Removes the background from any uploaded image using **Cloudinary Remove Background API**.
- Ideal for clean profile pictures, product photos, etc.

### 🧠 Generative AI Backgrounds
- Upload an image and generate a **new AI background** based on a text prompt (e.g., “futuristic city” or “sunset beach”).
- Combines your subject with a unique, photorealistic or artistic backdrop using **Cloudinary Generative Fill API**.

### 🎥 Video Upload with Compression
- Upload videos (up to 60MB or more).
- Automatically compresses and stores videos on Cloudinary.
- Uses `eager_async=true` for large file support.

---

## 🧑‍💻 Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN UI
- **Backend**: Next.js API Routes
- **Media Handling**: Cloudinary (image/video transformation, background removal, generative fill)
- **Database**: PostgreSQL, Prisma ORM
- **File Handling**: Formidable, Axios

---
## Screenshots
![Landing Page](./public/landing.png)
![Landing Page](./public/landing1.png)
![Landing Page](./public/landing2.png)
![Dashboard Page](./public/dashboard.png)
![social Page](./public/social.png)
![Background Page](./public/background.png)
![Gen Ai Background](./public/ai.png)
![signin](./public/signin.png)


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/framely.git
cd framely
```
### 2. Install Dependencies
```
npm install
# or
yarn install
```
### 3. Create .env file
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL=postgresql://user:password@host:port/dbname
```

### 4. Run the server
```
npm run dev
# or
yarn dev
```