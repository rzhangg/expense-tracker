import { apiHelpers } from '../helpers'

export const claimItemsAPI = {
  addClaimItem,
  deleteClaimItem,
  requestAll,
  editReceipt,
  editClaimItem
};

function addClaimItem(item) {
  return fetch(`/claim_items/add_item`, apiHelpers.postFormOptions(item))
  .then(apiHelpers.handleResponse);
}

function editClaimItem(item, id) {
  return fetch(`/claim_items/edit_item`, apiHelpers.postOptions({item: item, id: id}))
  .then(apiHelpers.handleResponse);
}

function editReceipt(item, id) {
  item.id = id;
  return fetch(`/claim_items/edit_receipt`, apiHelpers.postFormOptions(item))
  .then(apiHelpers.handleResponse);
}


function deleteClaimItem(claim_item_id) {
  return fetch('/claim_items/delete_item', apiHelpers.postOptions({claim_item_id: claim_item_id}))
   .then(apiHelpers.handleResponse);
}

function requestAll(claim_id) {
  return fetch(`/claim_items?claim_id=${claim_id}`, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}