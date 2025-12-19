import React from "react";
import { CategoryList } from "../components/CategoryList";

export const CategoryPage = () => {
  return (
    <div style={{
      background: '#fcfcfc',
      minHeight: '100vh',
      padding: '100px 40px 40px',
    }}>
      <CategoryList />
    </div>
  );
};