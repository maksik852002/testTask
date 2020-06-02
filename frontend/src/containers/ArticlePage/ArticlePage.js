import React, { useEffect } from "react";
import { getArticle } from "../../store/actions/articlesActions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Card, Typography, Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const Articles = ({ match }) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.art.article);
  useEffect(() => {
    dispatch(getArticle(match.params.id));
  }, [dispatch, match.params.id]);

  const convertFromJSONToHTML = (text) => {
    try {
      return { __html: stateToHTML(convertFromRaw(JSON.parse(text))) };
    } catch (exp) {
      console.log(exp);
      return { __html: "Error" };
    }
  };

  return (
    <>
      {article && (
        <Card>
          <Box p={{ xs: 2, sm: 5 }}>
            <Typography variant="h4" component="h1" style={{marginBottom: '20px'}} align="center">
              {article.title}
            </Typography>
           
            <Divider/>
            <div
              dangerouslySetInnerHTML={convertFromJSONToHTML(
                article.description
              )}
            />
            <Divider style={{margin: '20px 0'}}/>
            <Typography variant="subtitle1" component="p">
             <b>Author:</b> {article.user.username}
            </Typography>
            <Typography variant="subtitle1" component="p">
             <b>Category:</b> {article.category.title}
            </Typography>
          </Box>
        </Card>
      )}
    </>
  );
};

export default withRouter(Articles);
