import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';
import '../../styles/fonts.css';
import '@fontsource/roboto'; // mặc định: 400
import '@fontsource/playfair-display'; // mặc định: 400
import '@fontsource/inter';
import '@fontsource/satisfy';
import { CartProvider } from '@/context/CartContext';
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>
        <CartProvider>
          <nav className="sticky top-0 z-50">
            <Header />
          </nav>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}