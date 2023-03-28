export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) {
  return (
    <html lang={params.lang}>
      <head />
      <body>{children}</body>
    </html>
  );
}
