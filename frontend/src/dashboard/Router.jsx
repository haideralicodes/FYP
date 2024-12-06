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
import SocialAnalytics from "./scenes/socialAccount/SocialAnalytics";
import SavedPosts from "./scenes/posts/SavedPosts";
import FindDomain from "./scenes/searchDomain/FindDomain";
import Products from "./scenes/webSuite/Products";
import Orders from "./scenes/webSuite/Orders";
import Categories from "./scenes/webSuite/Categories";
import Customers from "./scenes/webSuite/Customers";

import NewCategoryPage from "./scenes/webSuite/NewCategoryForm";
import CategoryDetail from "./scenes/webSuite/CategoryDetail";


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
        <Route path="SocialAnalytics" element={<SocialAnalytics />} />
        <Route path="ViewSavedPosts" element={<SavedPosts />} />
        <Route path="SearchDomain" element={<FindDomain />} />
        <Route path="Websuite/Products" element={<Products />} />
        <Route path="Websuite/Orders" element={<Orders />} />
        <Route path="Websuite/Categories" element={<Categories />} />
        <Route path="Websuite/Customers" element={<Customers />} />
        <Route path="Websuite/NewCategory" element={<NewCategoryPage />} />
        <Route path="Websuite/CategoryDetail" element={<CategoryDetail />} />

      </Route>
    </Routes>
  );
};

export default AppRouter;
