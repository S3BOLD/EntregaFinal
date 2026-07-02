import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, PublicOnlyRoute } from './PrivateRoute';
import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Register/Register';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Categories } from '../pages/Categories/Categories';
import { Expenses } from '../pages/Expenses/Expenses';
import { NotFound } from '../pages/NotFound/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/despesas" element={<Expenses />} />
        <Route path="/categorias" element={<Categories />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
