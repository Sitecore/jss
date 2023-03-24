import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import 'assets/app.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
