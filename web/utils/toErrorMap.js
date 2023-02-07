export const toErrorMap = (errors) => {
  const errorMap = {};
  for (const field in errors) {
    errorMap[field] = errors[field][0];
  }
  return errorMap;
};
