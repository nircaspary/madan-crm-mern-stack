export const addFilter = (obj, key, value, setFilters) => {
  if (!key || !value) return;
  if (!obj[key]) {
    obj[key] = obj[key] = [value];
    setFilters(obj);
  }
  if (key === 'page') {
    obj[key] = value;
    setFilters(obj);
    return;
  }
  if (obj[key].includes(value)) return;
  obj[key].push(value);
  setFilters(obj);
};
