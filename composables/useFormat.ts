// composables/useFormat.ts
export const useFormatNumber = () => {
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  return { formatNumber };
};
// composables/useDeclension.ts
export const useDeclension = () => {
  const getDeclension = (count: number): string => {
    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 19) {
      return 'товаров';
    }

    if (lastOne === 1) {
      return 'товар';
    }

    if (lastOne >= 2 && lastOne <= 4) {
      return 'товара';
    }

    return 'товаров';
  };

  return { getDeclension };
}
