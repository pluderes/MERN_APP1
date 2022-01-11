import { Button, Modal, TextareaAutosize, TextField } from "@material-ui/core";
import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, updatePost } from "../../redux/actions";
import { modalState$ } from "../../redux/selectors";
import useStyle from "./styles";

function UpdatePostModal() {
  const { isUpdateModalShow, postDetail } = useSelector(modalState$);

  const dispatch = useDispatch();

  const [data, setdata] = useState({
    postID: "",
    title: "",
    content: "",
    attachment: "",
  });

  const classes = useStyle();

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setdata({
      postID: "",
      title: "",
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  useEffect(() => {
    const { _id, title, content } = postDetail;
    setdata({
      ...data,
      postID: _id,
      title,
      content,
    });
  }, [postDetail]);

  const onSubmit = React.useCallback(() => {
    let updateData;
    if (!data.attachment) {
      updateData = omit(data, "attachment");
    } else {
      updateData = data;
    }
    dispatch(updatePost.updatePostRequest(updateData));
    onClose();
  }, [data, dispatch, onClose]);

  const body = (
    <div className={classes.paper} id="simple-modal-title">
      <h2>Update post</h2>
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Modal open={isUpdateModalShow} onClose={onClose} className={classes}>
        {body}
      </Modal>
    </div>
  );
}

export default UpdatePostModal;
