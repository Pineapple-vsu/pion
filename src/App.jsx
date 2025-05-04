// import styles from "./app.module.css";
import { Route, Routes } from "react-router";
import { Header, Footer, MainPage, CatalogPage } from "./components";
import ScrollToHash from "./components/scroll-to-hash/ScrollToHash";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        {/* <Route path="/" element={<div>Главная</div>} /> */}
        <Route path="/" element={<MainPage></MainPage>} />
        {/* <Route path="/catalog" element={<div>Каталог</div>} /> */}
        <Route path="/catalog" element={<CatalogPage></CatalogPage>} />
        <Route path="/flower/:id" element={<div>цветок</div>} />
      </Routes>
      <ScrollToHash></ScrollToHash>
      <Footer></Footer>
    </>
  );
}

export default App;
