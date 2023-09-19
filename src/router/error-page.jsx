import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();

  return (
    <div id="error-page" style={{ margin: "0 auto" }}>
      <h1>404 - Not Found</h1>
      <p>The requested URL {location.pathname} was not found on this server.</p>
      <p>
        <i>{location.pathname}</i>
      </p>
    </div>
  );
}
