const WISHLIST_KEY = 'wishlist';

export const getWishlist = () => {
  const list = localStorage.getItem(WISHLIST_KEY);
  return list ? JSON.parse(list) : [];
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  if (!wishlist.some(item => item._id === product._id)) {
    wishlist.push(product);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const filtered = wishlist.filter(item => item._id !== productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
};

export const isInWishlist = (productId) => {
  return getWishlist().some(item => item._id === productId);
};