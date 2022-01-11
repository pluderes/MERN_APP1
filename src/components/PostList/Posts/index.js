import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { omit } from "lodash";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deletePost,
  showUpdateModal,
  updatePost
} from "../../../redux/actions";
import UpdatePostModal from "../../UpdatePostModel";
import useStyles from "./styles";

function Post({ post }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const onLikeBtnClick = React.useCallback(() => {
    dispatch(
      updatePost.updatePostRequest({
        postID: post._id,
        likeCount: post.likeCount + 1,
      })
    );
  }, [dispatch, post]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const options = ["EDIT", "DELETE"];

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelected = React.useCallback(
    (option) => {
      if (option === "DELETE") {
        dispatch(
          deletePost.deletePostRequest({
            postID: post._id,
          })
        );
      } else if (option === "EDIT") {
        const payload = {
          ...omit(post, ["attachment"]),
        };
        dispatch(showUpdateModal(payload));
      }
      setAnchorEl(null);
    },
    [dispatch, post]
  );

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>TD</Avatar>}
        title={post.author}
        subheader={moment(post.updateAt).format("HH:MM MM-DD-YYYY")}
        action={
          <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={() => handleSelected(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            {/* <UpdatePostModal isUpdateModalShow={modalShow}/> */}
            <UpdatePostModal />
          </>
        }
      ></CardHeader>
      <CardMedia
        image={post.attachment}
        title="Title IMG"
        className={classes.media}
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary">
          {post.title}
        </Typography>
        <Typography variant="body2" component="p" color="textPrimary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={onLikeBtnClick}>
          <FavoriteIcon />
          <Typography component="span" color="textPrimary">
            {post.likeCount}
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
