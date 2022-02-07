import { Routes, Route } from "react-router-dom";
import DetailDocument from "../../pages/Docs/DetailDocument";
import Users from "../../pages/Settings/Users";
import AddDocument from "../../pages/Docs/AddDocument";
import Settings from "../../pages/Settings";
import Departments from "../../pages/Settings/Departments";
import Roles from "../../pages/Settings/Roles";
import Documents from "../../pages/Docs";
import InDocuments from "../../pages/Docs/InDocuments";
import General from "../../pages/Settings/General";
import { Suspense } from "react";
import Loading from "../../lib/Loading";
import OutDocuments from "../../pages/Docs/OutDocuments";

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/docs" element={<Documents />}>
          <Route path="in" element={<InDocuments />} />
          <Route path="out" element={<OutDocuments />} />
        </Route>
        <Route path="/docs/add" element={<AddDocument />} />
        <Route path="/docs/:id" element={<DetailDocument />} />

        <Route path="/settings" element={<Settings />}>
          <Route path="users" element={<Users />} />
          <Route path="departments" element={<Departments />} />
          <Route path="roles" element={<Roles />} />
          <Route path="general" element={<General />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
