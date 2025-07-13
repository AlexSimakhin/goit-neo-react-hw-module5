const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'w780') => {
  return getImageUrl(path, size);
};

export const getPosterUrl = (path, size = 'w300') => {
  return getImageUrl(path, size);
};

export const getProfileUrl = (path, size = 'w200') => {
  return getImageUrl(path, size);
};

export const getPlaceholderImage = (width = 300, height = 450, text = 'No Image') => {
  return `https://placehold.co/${width}x${height}/333/fff?text=${encodeURIComponent(text)}`;
};
