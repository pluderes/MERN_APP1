import { Avatar, Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../../redux/actions";
import { postsState$ } from "../../redux/selectors";
import Post from "./Posts";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(postsState$);

  const [listPost, setListPost] = useState([]);

  const [searchPosts, setSearchPosts] = useState(posts);

  useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);

  useEffect(() => {
    setListPost(posts);
  }, [posts]);

  const fixedOptions = [];

  const handleChangeInputSearch = (event, newValue) => {
    let filter = [
      ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
    ];
    setSearchPosts(filter);
    setListPost(filter);
  };

  const handleFilterPosts = () => {
    searchPosts.length > 0 ? setListPost(searchPosts) : setListPost(posts);
  };

  const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const options = ["LOGIN", "LOGOUT"];

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  const handleSelected = (option) => {
    if (option === "LOGIN") {
      history.push("/login");
    } else if (option === "REGISTER") {
      history.push("/register");
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          value={searchPosts}
          onChange={handleChangeInputSearch}
          onBlur={handleFilterPosts}
          options={posts}
          getOptionLabel={(option) => option.title}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              return (
                <Chip
                  label={option.title}
                  {...getTagProps({ index })}
                  onDelete={() => {
                    let filter = searchPosts.filter(
                      (post) => post._id !== option._id
                    );
                    setSearchPosts(filter);
                    setListPost(filter);
                  }}
                  disabled={fixedOptions.indexOf(option) !== -1}
                />
              );
            })
          }
          style={{ width: "50%" }}
          renderInput={(params) => (
            <TextField {...params} label="Title" variant="outlined" />
          )}
        />
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            className="username"
            style={{
              marginRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <b>HIHIHI</b>
          </div>
          <div
            className="avatar"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt=""
              src={listPost.length && listPost[0].attachment}
              className={classes.large}
              onClick={handleClick}
            />
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {options.map((option) => (
                // <Link to="/">
                <MenuItem key={option} onClick={() => handleSelected(option)}>
                  {option}
                </MenuItem>
                // </Link>
              ))}
            </Menu>
          </div>
        </div>
      </div>
      <br />
      <Grid container spacing={2} alignItems="stretch">
        {listPost.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PostList;
