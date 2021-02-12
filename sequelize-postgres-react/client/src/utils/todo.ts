import attribute from "../const/attributes";

export const statusToBoolean = (status) => {
  if (status === attribute.STATUS.COMPLETED) {
    return true;
  }
  return false;
}

export const booleanToStatus = (boolean) => {
  if (boolean) {
    return attribute.STATUS.COMPLETED;
  }
  return attribute.STATUS.PENDING;
}