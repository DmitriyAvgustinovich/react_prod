import { Route, Routes } from "react-router-dom";
import { Counter } from "./components/Counter";
import "./styles/index.scss";
import { Link } from "react-router-dom";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { Suspense } from "react";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./helpers/classNames/classNames";

export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {hover: false, select: true}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>

      <Link to="/">Главная</Link>
      <Link to="/about">О сайте</Link>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/about" element={<AboutPageAsync />} />
          <Route path="/" element={<MainPageAsync />} />
        </Routes>
      </Suspense>

      <h1>Hello World</h1>
      <Counter />
    </div>
  );
};
