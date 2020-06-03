import React, { useEffect, useRef } from "react";
import {
  getArticles,
  deleteArticle,
} from "../../store/actions/articlesActions";
import { getCategories } from "../../store/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import OpenInNew from "@material-ui/icons/OpenInNew";
import { columns } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#fff",
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  fade: {
    opacity: "0.2",
    backgroundColor: "rgba(245, 0, 87, 0.08)",
    transition: "all 300ms ease 0s",
  },
}));

const Articles = () => {
  const tableRaw = useRef(null);
  const classes = useStyles();
  const [confirm, setConfirm] = React.useState(null);
  const [category, setCategory] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.art.articles);
  const categories = useSelector((state) => state.cat.categories);

  useEffect(() => {
    dispatch(getArticles());
    dispatch(getCategories());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandler = (id) => {
    confirm !== null && tableRaw.current.focus()
    const index = articles.findIndex((el) => el._id === id);
    setConfirm(index);
  };

  const saveActionHandler = (id) => {
    dispatch(deleteArticle(id, category));
    setConfirm(null);
  };

  const selectCategoryHandler = (e) => {
    setCategory(e.target.value);
    setConfirm(null);
    dispatch(getArticles(e.target.value))
  }

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Articles
        </Typography>
        <FormControl style={{width: 250}}>
          <InputLabel>Choose category</InputLabel>
          <Select
            value={category}
            onChange={selectCategoryHandler}
          >
              <MenuItem value={''}>All</MenuItem>
            {categories.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title="Add">
          <IconButton
            onClick={() => dispatch(push(`/adm/articles/new/create`))}
          >
            <AddBox />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ width: column.width }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.length > 0 ? (
              articles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((article, i) =>
                  confirm !== i ? (
                    <TableRow
                      ref={tableRaw}
                      className={confirm !== null ? classes.fade : ""}
                      key={article._id}
                    >
                      <TableCell>{article.title}</TableCell>
                      <TableCell>{article.category.title}</TableCell>
                      <TableCell>{article.user.username}</TableCell>
                      <TableCell style={{ padding: "0 5px" }}>
                        <div style={{ width: "144px" }}>
                          <Tooltip title="Open">
                            <IconButton
                              disabled={confirm !== null}
                              onClick={() =>
                                dispatch(push(`/adm/articles/${article._id}`))
                              }
                            >
                              <OpenInNew htmlColor="rgba(33,33,33,1)" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              disabled={confirm !== null}
                              onClick={() =>
                                dispatch(
                                  push(`/adm/articles/${article._id}/edit`)
                                )
                              }
                            >
                              <Edit htmlColor="rgba(33,33,33,1)" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              disabled={confirm !== null}
                              onClick={() => deleteHandler(article._id)}
                            >
                              <DeleteOutline htmlColor="rgba(33,33,33,1)" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={article._id}>
                      <TableCell colSpan={3} style={{padding: '8px 16px'}}>
                        <Typography variant="h6">
                          Are you sure you want to delete this row?
                        </Typography>
                      </TableCell>
                      <TableCell align="right" style={{ padding: "0 5px" }}>
                        <div style={{ width: "144px" }}> 
                          <Tooltip title="Save">
                            <IconButton
                              onClick={() => saveActionHandler(article._id)}
                            >
                              <Check htmlColor="rgba(33,33,33,1)" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton onClick={() => setConfirm(null)}>
                              <Clear htmlColor="rgba(33,33,33,1)" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )
            ) : (
              <TableRow>
                <TableCell colSpan={4} variant="footer" align="center">
                  No records to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={articles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Articles;
