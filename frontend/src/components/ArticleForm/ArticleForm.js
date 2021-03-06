import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { makeStyles } from "@material-ui/core";
import { editArticle } from "../../store/actions/articlesActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormElement from "../UI/Form/FormElement";
import axiosApi from "../../axiosApi";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  wysiwyg: {
    borderRadius: theme.shape.borderRadius,
    minHeight: "400px",
    padding: "20px",
  },
  wrapper: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: theme.shape.borderRadius,
  },
  errorWrapper: {
    border: "1px solid #f44336",
    borderRadius: theme.shape.borderRadius,
  },
  helper: {
    fontSize: '0.75rem',
    textAlign: 'left',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    color: '#f44336',
    margin: '3px 14px 0'
  }
}));

const ArticleForm = ({ create, article, categories, isAdding, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.art.error)
  const [values, setValues] = useState({
    category: "",
    title: "",
  });
  const [description, setDescription] = useState(EditorState.createEmpty());
 
  useEffect(() => {
     if (categories && categories[0]) {
      setValues({...values, category: categories[0]._id });
    }
    if (article) {
      const parsed = EditorState.createWithContent(
        convertFromRaw(JSON.parse(article.description))
      );
      setDescription(parsed);
      setValues({...values, category: article.category._id, title: article.title});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, categories]);

  const checkDescription = (data) => {
    let isEmpty = true;
    data.blocks.forEach(el => (el.text !== '' && (isEmpty=false)))
    return isEmpty;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    const data = {}
    Object.keys(values).forEach((key) => {
      data[key] = values[key]
    });
    const descriptionData = convertToRaw(description.getCurrentContent())
    if (checkDescription(descriptionData)) {
      data.description = '';
    } else {
      data.description = JSON.stringify(convertToRaw(description.getCurrentContent()))
    }
    if (isAdding) {
      create(data);
    } else {
      dispatch(editArticle(data, match.params.id));
    }
  };

  const inputChangeHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const editorImageUploadHandler = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axiosApi.post("articles/upload", formData);
    return { data: { link: response.data } };
  };

  const categoriesOptions = categories.map((el) => ({
    title: el.title,
    id: el._id,
  }));

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].properties.message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid item container direction="column" spacing={2}>
        <Grid item xs>
          <FormElement
            type="select"
            propertyName="category"
            title="Category"
            onChange={inputChangeHandler}
            options={categoriesOptions}
            value ={values.category}
            error={getFieldError('category')}
          />
        </Grid>
        <Grid item xs>
          <FormElement
            type="text"
            propertyName="title"
            title="Title"
            placeholder="Enter product title"
            onChange={inputChangeHandler}
            value={values.title}
            error={getFieldError('title')}
          />
        </Grid>
        <Grid item xs>
          <Editor
            toolbarClassName="toolbarClassName"
            editorState={description}
            onEditorStateChange={(editorState) => setDescription(editorState)}
            editorClassName={classes.wysiwyg}
            wrapperClassName={getFieldError('description') ? classes.errorWrapper : classes.wrapper}
            localization={{
              locale: "ru",
            }}
            toolbar={{
              image: {
                uploadEnabled: true,
                uploadCallback: editorImageUploadHandler,
                previewImage: true,
                alt: { present: true, mandatory: false },
              },
            }}
          />
          {error&&error.errors.description&&<p className={classes.helper}>{getFieldError('description')}</p>}
        </Grid>
        <Grid item container justify='flex-end' xs >
          <Button type="submit" color='primary' variant='contained'>{isAdding ? "Create" : "Edit Article"}</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArticleForm;
