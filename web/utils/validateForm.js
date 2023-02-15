export const validateForm = (values) => {
  let errors = {};
  if (!/^\d+$/.test(values.phone_number)) {
    errors["phone_number"] = ["Phone number must be digits only"];
  }
  if (!values.location.includes(",")) {
    errors["location"] = [
      "Location must be a comma separated list (ex. Toronto, Canada)",
    ];
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
    errors["email"] = ["Invalid email address"];
  }
  if (values.phone_number.length < 9) {
    errors["phone_number"] = ["Phone number must be at least 9 digits"];
  }
  return errors;
};
