import Home from "./pages/Home";
import "./index.css";
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    document.title = "Local Brands";
  }, []);

  return <Home />;
}