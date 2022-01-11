import { Button, Modal, TextareaAutosize, TextField } from "@material-ui/core";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, hideModal } from "../../redux/actions";
import { modalState$ } from "../../redux/selectors";
import useStyle from "./styles";

function CreatePostModal() {
  const [data, setdata] = useState({
    title: "",
    content: "",
    attachment: "",
  });

  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const classes = useStyle();

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setdata({
      title: "",
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createPost.createPostRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

  const body = (
    <div className={classes.paper} id="simple-modal-title">
      <h2>Create new post</h2>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.title}
          required
          label="Title"
          value={data.title}
          onChange={(e) => setdata({ ...data, title: e.target.value })}
        />
        <TextareaAutosize
          className={classes.textarea}
          minRows="10"
          maxRows="15"
          placeholder="Content..."
          value={data.content}
          onChange={(e) => setdata({ ...data, content: e.target.value })}
        />
        <FileBase64
          accept="image/*"
          multiple={false}
          type="file"
          value={data.attachment}
          onDone={({ base64 }) => setdata({ ...data, attachment: base64 })}
        />
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            onClick={onSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <Modal open={isShow} onClose={onClose} className={classes}>
        {body}
      </Modal>
    </div>
  );
}

export default CreatePostModal;
