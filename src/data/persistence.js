import { artists as staticArtists } from './artists';

const STORAGE_KEYS = {
  ARTISTS: 'lf_archive_artists',
  CORPORATE: 'lf_archive_corporate',
  BRANDS: 'lf_archive_brands',
  FESTS: 'lf_archive_fests'
};

export const getLocalData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveLocalData = (key, newItem) => {
  const existing = getLocalData(key);
  const updated = [newItem, ...existing];
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
};

export const deleteLocalData = (key, id) => {
  const existing = getLocalData(key);
  const updated = existing.filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
};

export const getAllArtists = () => {
  const local = getLocalData(STORAGE_KEYS.ARTISTS);
  return [...local, ...staticArtists];
};

export const getCorporateItems = (staticItems) => {
  const local = getLocalData(STORAGE_KEYS.CORPORATE);
  return [...local, ...staticItems];
};

export const getBrandItems = (staticItems) => {
  const local = getLocalData(STORAGE_KEYS.BRANDS);
  return [...local, ...staticItems];
};

export const getFestItems = (staticItems) => {
  const local = getLocalData(STORAGE_KEYS.FESTS);
  return [...local, ...staticItems];
};

export const getSelectedWork = (staticItems) => {
  const allLocal = [
    ...getLocalData(STORAGE_KEYS.ARTISTS),
    ...getLocalData(STORAGE_KEYS.CORPORATE),
    ...getLocalData(STORAGE_KEYS.BRANDS),
    ...getLocalData(STORAGE_KEYS.FESTS)
  ];
  // Show 3 most recent local items + static items
  return [...allLocal.slice(0, 3), ...staticItems];
};

export { STORAGE_KEYS };
