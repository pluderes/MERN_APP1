import React from "react";
import { Container, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { showModal } from "../redux/actions";

import Header from "../components/Header";
import PostList from "../components/PostList";
import useStyles from "./style";
import CreatePostModal from "../components/CreatePostModel";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openCreateModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <PostList />
        <CreatePostModal />
        <Fab color="primary" className={classes.fab} onClick={openCreateModal}>
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}

export default Home;
