import { Routes, Route } from "react-router-dom";
import DetailDocument from "../pages/Docs/DetailDocument";
import AddDocument from "../pages/Docs/AddDocument";
import InDocuments from "../pages/Docs/InDocuments";
import React, { Suspense } from "react";
import Loading from "../components/Loading";
import OutDocuments from "../pages/Docs/OutDocuments";
const Documents = React.lazy(() => import("../pages/Docs"));
const Settings = React.lazy(() => import("../pages/Settings"));
const Senders = React.lazy(() => import("../pages/Senders"));

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
        <Route path="/settings" element={<Settings />} />
        <Route path="/senders" element={<Senders />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
