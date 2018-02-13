import { claimItemsConstants } from '../constants';
import { claimItemsAPI } from '../api'

export const claimItemsActions = {
    addClaimItem,
    removeClaimItem,
    requestAll,
    clearAll
};

function addClaimItem(item) {
  //TODO add claimItem
  //expects an obj like
  // {
  //   claim_id,
  //   description,
  //   amount,
  //   comment,
  //   expense_type,
  //   has_receipt
  //   image_url
  // }
  return dispatch => {
    dispatch(request());
    claimItemsAPI.addClaimItem(item)
      .then(
        res => dispatch(success()),
        error => dispatch(failure(error))
      )
  };
  function request() {return {type: claimItemsConstants.ADD_CLAIM_ITEM} }
  function success() {return {type: claimItemsConstants.ADD_CLAIM_ITEM_SUCCESS} }
  function failure(error) {return {type: claimItemsConstants.ADD_CLAIM_ITEM_FAILURE, error} }
}

function removeClaimItem() {
  //TODO remove claimItem
  //expects object like
  // {
  //   id
  // }
}

function requestAll(claimID) {
  //TODO fetch all with claim id
  return dispatch => {
    dispatch(request());
    claimItemsAPI.requestAll(claimID)
      .then(
          res => {
            dispatch(success(res.claimItems, claimID)) 
          }
          ,
          error => {
            dispatch(failure(error))
          }
      );
  };

  function request() { return { type: claimItemsConstants.REQUEST_CLAIM_ITEMS } }
  function success(claimItems, claimID) { return { type: claimItemsConstants.RECEIVE_CLAIM_ITEMS, claimID, claimItems }}
  function failure(error) { return { type: claimItemsConstants.FAILURE_CLAIM_ITEMS, error }}
}

function clearAll() {
  return dispatch => {
    dispatch({ type: claimItemsConstants.CLEAR_CLAIM_ITEMS });
  }
}