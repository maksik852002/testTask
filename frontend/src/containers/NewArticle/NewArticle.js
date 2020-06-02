import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router'
import { createArticle, getArticle } from "../../store/actions/articlesActions";
import { getCategories } from "../../store/actions/categoriesActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ArticleForm from "../../components/ArticleForm/ArticleForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  space: {
    margin: theme.spacing(4, "auto"),
  },
  title: {
    flexGrow: 1,
  },
}));

const NewArticle = ({history, match}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    if(history.location.pathname !== "/adm/articles/new/create") {
      dispatch(getArticle(match.params.id));
    }
  }, [dispatch, history.location.pathname, match.params.id]);

  const categories = useSelector((state) => state.cat.categories);
  const article = useSelector((state) => state.art.article);

  const createArticleHandler = async (data) => {
    await dispatch(createArticle(data));
  };

  return (
    <Card>
      <Box py={4} px={2}>
        <Grid container justify="center">
          <Grid item xs={12} md={11}>
            <Typography variant="h6" color="textPrimary">
              {history.location.pathname === "/adm/articles/new/create" ? 'Create new article' : 'Edit article'}
            </Typography>
            <Divider className={classes.space} />
          </Grid>
          <Grid item xs={12} md={10}>
            <ArticleForm
              create={createArticleHandler}
              article={article}
              categories={categories}
              isAdding={history.location.pathname === "/adm/articles/new/create"}
              match={match}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default withRouter(NewArticle);
