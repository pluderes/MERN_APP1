export const INIT_STATE = {
  post: {
    isLoading: false,
    data: [],
  },
  modal: {
    isShow: false,
    isUpdateModalShow: false,
    postDetail: {
      _id: "",
      title: "",
      content: "",
      author: "",
      likeCount: 0,
      createdAt: "",
      updatedAt: "",
    },
  },
};
