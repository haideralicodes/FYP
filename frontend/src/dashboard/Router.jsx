import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardApp from "./DashboardApp";
import {
  Dashboard,
  Team,
  Contacts,
  Form,
  FAQ,
  Calendar,
  Stream,
} from "./scenes";

import DashboardDefault from "./scenes/dashboarddefault/index"

import Store from './scenes/store/index'
import Posts from "./scenes/posts";
import GeneratedPosts from "./scenes/posts/generatedPosts";
import UserProfile from '../pages/UpdateUserProfile/UpdateProfile'
import GeneratedPostSchedular from "./scenes/posts/GeneratedPostSchedular";
import Posters from "./scenes/posts/Posters";
import LinkSocialAccounts from "./scenes/socialAccount/LinkSocialAccounts";
import SavedPosts from "./scenes/posts/SavedPosts";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardApp />}>
        <Route index element={<DashboardDefault />} /> 
        <Route path="team" element={<Team />} />
        <Route path="store" element={<Store />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="posts" element={<Posts />} />
        <Route path="form" element={<Form />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="stream" element={<Stream />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="generatedPosts" element={<GeneratedPosts />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="GeneratedPostScheduler" element={<GeneratedPostSchedular />} />
        <Route path="GeneratePosters" element={<Posters />} />
        <Route path="LinkSocialAccounts" element={<LinkSocialAccounts />} />
        <Route path="ViewSavedPosts" element={<SavedPosts />} />

      </Route>
    </Routes>
  );
};

export default AppRouter;
