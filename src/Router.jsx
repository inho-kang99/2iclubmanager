import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderView, FooterView } from './components/layout';
import { Test } from './pages/output';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderView />
        <Routes>
          <Route path="/" element={<Test />}></Route>
        </Routes>
        <FooterView />
      </BrowserRouter>
    </div>
  );
};

export default Router;
