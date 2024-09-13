import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./components/Main/index";
import RepairmanPage from "./components/repairman";
import AboutUs from "./components/onas";
import RegistrationForm from "./components/Auth/Register";
import SupportForm from "./components/HelperPage/index";
import AdminLayout from "./components/Admin/Layout";
import LoginForm from "./components/Auth/Login";
import "./App.css";
import { LicenseInfo } from "@mui/x-license";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import ProtectedRoute from "./components/ProtectedRoute"; // Новый компонент

LicenseInfo.setLicenseKey(
  "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
);

// Пример создания кастомной темы
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0,0,0,0.8)", // Основной цвет (заменить голубой цвет)
    },
    secondary: {
      main: "#ff5722", // Вторичный цвет (оранжевый)
    },
    background: {
      default: "#f4f4f4", // Цвет фона
    },
  },
});

function App() {
  // Извлечение данных пользователя и токена из localStorage
  const accessToken = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user")); // Получаем объект пользователя из localStorage
  const loggedIn = Boolean(accessToken && user); // Проверяем, есть ли токен и данные пользователя
  const admin = Boolean(user.role === 0); //

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header loggedIn={loggedIn} user={user} />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* Защищенный маршрут для админа */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute loggedIn={admin}>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          {/* Пример защищенного маршрута для страниц, требующих авторизации */}
          <Route
            path="/repairman-page"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <RepairmanPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/support" element={<SupportForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Если пользователь не авторизован, перенаправляем на страницу входа */}
          {!loggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
