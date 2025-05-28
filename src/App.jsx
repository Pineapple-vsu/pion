import { Route, Routes } from "react-router";
import {
  Header,
  Footer,
  MainPage,
  CatalogPage,
  FlowerPage,
  OrderPage,
  Personal,
} from "./components";
import ScrollToHash from "./components/scroll-to-hash/ScrollToHash";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/flower/:id" element={<FlowerPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/personal" element={<Personal />} />
      </Routes>
      <ScrollToHash></ScrollToHash>
      <Footer></Footer>
    </>
  );
}

export default App;
