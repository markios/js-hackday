
const KEY = "__NAMETHATTUNE__";

export const get = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch(e) {
    return {};
  }
}

export const set = (data) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch(e) {
    console.error('Failed to save to local storage');
  }
}

