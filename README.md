# LysLan Chocolate - Premium Chocolate E-commerce

A premium chocolate e-commerce website built with Next.js 15 and PostgreSQL.

## 🚀 Features

- 🌐 Multi-language support (Vietnamese/English)
- 🛍️ Product catalog with detailed pages
- 📱 Responsive design
- 🔍 Product search and filtering
- 🎨 Premium UI/UX design
- 📊 Product management system

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Deployment:** Vercel
- **Languages:** JavaScript/JSX

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd lyslan-next-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit .env.local with your database credentials
   ```

4. **Database setup**
   - Create a Supabase project or PostgreSQL database
   - Import the provided SQL schema
   - Update connection details in `.env.local`

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌍 Environment Variables

```env
# Database
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=postgres
DB_USER=your-username
DB_PASSWORD=your-password

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📱 API Endpoints

- `GET /api/products` - Get products list
- `GET /api/products/[slug]` - Get product details
- `GET /api/categories` - Get categories

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   vercel --prod
   ```

2. **Set environment variables in Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add your production database credentials

3. **Deploy**
   ```bash
   git push origin main
   ```

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── products/
│   │   │   └── page.jsx
│   │   └── api/
│   ├── components/
│   └── lib/
├── public/
│   └── images/
├── .env.example
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📧 Contact

For questions or support, please contact the development team.