// Fictional, reproducible campaign data. Spend, clicks, impressions and leads share
// one daily model; the portal creates exactly one sample request per conversion.
let seed = 20261011;
const random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
function poisson(mean: number) {
  const threshold = Math.exp(-mean);
  let product = 1;
  let k = 0;
  do {
    k++;
    product *= random();
  } while (product > threshold);
  return k - 1;
}
export const demoDays = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 6, 14 + i));
  const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
  const budget = (i < 30 ? 23 : i < 60 ? 28 : 34) * (weekend ? 0.78 : 1);
  const uitgaven = Math.round(budget * (0.86 + random() * 0.28) * 100) / 100;
  const costPerClick = 0.39 + random() * 0.22;
  const klikken = Math.round(uitgaven / costPerClick);
  const ctr = 0.019 + random() * 0.014;
  const aanvragen = Math.min(
    klikken,
    poisson(klikken * (i < 30 ? 0.027 : i < 60 ? 0.033 : 0.042)),
  );
  return {
    date: date.toISOString().slice(0, 10),
    aanvragen,
    klikken,
    uitgaven,
    vertoningen: Math.round(klikken / ctr),
  };
});
export const demoMonthLeads = demoDays
  .slice(-30)
  .reduce((sum, day) => sum + day.aanvragen, 0);
