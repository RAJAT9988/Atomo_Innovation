function isApproved(status) {
  return status === "approved";
}

function filterApproved(items) {
  return items.filter((item) => isApproved(item.verificationStatus));
}

function getApprovedValue(field) {
  return isApproved(field.verificationStatus) ? field.value : null;
}

function getApprovedValues(fields) {
  return fields.filter((f) => isApproved(f.verificationStatus)).map((f) => f.value);
}

module.exports = { isApproved, filterApproved, getApprovedValue, getApprovedValues };
