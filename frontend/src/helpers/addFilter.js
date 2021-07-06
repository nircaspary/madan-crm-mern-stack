export const addFilter = (obj, key, value, setFilters) => {
  if (!key || !value) return;
  if (!obj[key]) {
    obj[key] = obj[key] = [value];
    setFilters(obj);
  }
  if (obj[key].includes(value)) return;
  if (key === 'page') {
    obj[key] = value;
    setFilters(obj);
    return;
  }

  obj[key].push(value);
  setFilters(obj);
};
