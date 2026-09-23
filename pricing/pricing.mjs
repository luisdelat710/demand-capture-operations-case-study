/** Pure pricing rules used by the demo and its tests. */
export function calculatePricing({ cost, targetMargin, vatRate = 16, squareMetersPerBox }) {
  const c = Number(cost);
  const margin = Number(targetMargin);
  const vat = Number(vatRate);
  const area = squareMetersPerBox === '' || squareMetersPerBox == null
    ? null : Number(squareMetersPerBox);

  if (!Number.isFinite(c) || c <= 0) throw new RangeError('Cost must be greater than zero.');
  if (!Number.isFinite(margin) || margin < 0 || margin >= 100) {
    throw new RangeError('Target margin must be at least 0% and below 100%.');
  }
  if (!Number.isFinite(vat) || vat < 0 || vat > 100) {
    throw new RangeError('Tax rate must be between 0% and 100%.');
  }
  if (area !== null && (!Number.isFinite(area) || area <= 0)) {
    throw new RangeError('Square meters per box must be greater than zero.');
  }

  const priceBeforeTax = c / (1 - margin / 100);
  const taxAmount = priceBeforeTax * vat / 100;
  const finalPrice = priceBeforeTax + taxAmount;
  const grossProfit = priceBeforeTax - c;
  const markupPrice = c * (1 + margin / 100);

  return {
    cost: c,
    targetMargin: margin,
    vatRate: vat,
    squareMetersPerBox: area,
    priceBeforeTax,
    taxAmount,
    finalPrice,
    grossProfit,
    achievedMargin: grossProfit / priceBeforeTax * 100,
    pricePerSquareMeter: area === null ? null : finalPrice / area,
    costPerSquareMeter: area === null ? null : c / area,
    markupPrice,
    marginIfMarkupUsed: (markupPrice - c) / markupPrice * 100,
  };
}
