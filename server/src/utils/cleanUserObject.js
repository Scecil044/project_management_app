export const cleaneUserObject = (userObject) => {
  // convert to js object
  const jsObject = userObject.toObject();
  delete jsObject.password;

  return jsObject;
};
