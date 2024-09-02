interface CartItem {
    productId: number;
    quantity: number;
  }
  
  export const getCartFromLocalStorage = (): CartItem[] => {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Failed to retrieve cart from localStorage", error);
      return [];
    }
  };
  
  export const saveCartToLocalStorage = (cart: CartItem[]) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  };
  