import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import dataProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { BlogPostAnalyticsList } from "./blogPostAnalytics/BlogPostAnalyticsList";
import { BlogPostAnalyticsCreate } from "./blogPostAnalytics/BlogPostAnalyticsCreate";
import { BlogPostAnalyticsEdit } from "./blogPostAnalytics/BlogPostAnalyticsEdit";
import { BlogPostAnalyticsShow } from "./blogPostAnalytics/BlogPostAnalyticsShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Admin
        title={"AnalyticsService"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="BlogPostAnalytics"
          list={BlogPostAnalyticsList}
          edit={BlogPostAnalyticsEdit}
          create={BlogPostAnalyticsCreate}
          show={BlogPostAnalyticsShow}
        />
      </Admin>
    </div>
  );
};

export default App;
