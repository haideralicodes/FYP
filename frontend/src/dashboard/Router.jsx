import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardApp from "./DashboardApp";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "./scenes";

import Store from './scenes/store/index'
import Posts from "./scenes/posts";
import GeneratedPosts from "./scenes/posts/generatedPosts";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardApp />}>
        <Route index element={<Dashboard />} /> 
        <Route path="team" element={<Team />} />
        <Route path="store" element={<Store />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="posts" element={<Posts />} />
        <Route path="form" element={<Form />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="bar" element={<Bar />} />
        <Route path="pie" element={<Pie />} />
        <Route path="stream" element={<Stream />} />
        <Route path="line" element={<Line />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="geography" element={<Geography />} />
        <Route path="generatedPosts" element={<GeneratedPosts />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
