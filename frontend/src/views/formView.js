export const formVisible = () => {
  document
    .querySelectorAll(".form-element")
    .forEach((field) => field.classList.add("visible"));
};
export const formInvisible = () => {
  document
    .querySelectorAll(".form-element")
    .forEach((field) => field.classList.remove("visible"));
};
export const clearForm = () => {
  document
    .querySelectorAll(".form-element > input")
    .forEach((field) => (field.value = ""));
};
