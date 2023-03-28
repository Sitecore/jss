import 'bootstrap/dist/css/bootstrap.css';

export default function NotFound() {
  return (
    <>
      <div style={{ padding: 10 }}>
        <h1>Page not found</h1>
        <p>This page does not exist.</p>
        <a href="/">Go to the Home page</a>
      </div>
    </>
  );
}
