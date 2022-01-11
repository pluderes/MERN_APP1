import { INIT_STATE } from "../../constant";
import { getType, showModal, hideModal, showUpdateModal } from "../actions";

export default function modalReducers(state = INIT_STATE.modal, action) {
  switch (action.type) {
    case getType(showModal):
      return {
        ...state,
        isShow: true,
      };
    case getType(hideModal):
      return {
        ...state,
        isShow: false,
        isUpdateModalShow: false,
        postDetail: INIT_STATE.modal.postDetail,
      };
    case getType(showUpdateModal):
      return {
        ...state,
        isUpdateModalShow: true,
        postDetail: action.payload,
      };
    default:
      return state;
  }
}
