export function useFormatterPrice() {
  const formatter = new Intl.NumberFormat();

  const amount = (amount: any) => {

    return formatter.format(amount)
  }

  return {
    amount,
    formatter
  };
}
