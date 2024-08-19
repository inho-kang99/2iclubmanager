import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderView, FooterView } from './components/layout';
import { Test } from './pages/output';
import TestComponent from './components/test/TestComponent';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderView />
        <Routes>
          <Route path="/" element={<Test />}></Route>
          <Route path="/test" element={<TestComponent />}></Route>
        </Routes>
        <FooterView />
      </BrowserRouter>
    </div>
  );
};

export default Router;
