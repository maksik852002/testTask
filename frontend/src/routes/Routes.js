import React from "react";
import {Route, Switch} from "react-router-dom";
import Users from "../containers/Users/Users";
import Categories from "../containers/Categories/Categories";
import NewArticle from '../containers/NewArticle/NewArticle';
import Articles from "../containers/Articles/Articles";
import ArticlePage from "../containers/ArticlePage/ArticlePage";

const Routes = () => {

  return (
    <Switch>
        <Route path="/adm/users" exact component={Users} />
        <Route path="/adm/categories" exact component={Categories} />
        <Route path="/adm/articles" exact component={Articles} />
        <Route path="/adm/articles/new/create" exact component={NewArticle} />
        <Route path="/adm/articles/:id/edit" exact component={NewArticle} />
        <Route path="/adm/articles/:id/" component={ArticlePage} />
        <Route render={() => <h1>Not found</h1>} />
    </Switch>
  );
};

export default Routes;
