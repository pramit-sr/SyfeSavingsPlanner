export const calculateProgress = (saved, target) => {
  return Math.min((saved / target) * 100, 100);
};
