export function formatPrintSize(size: number) {
  const percision = size - parseInt(size as any);
  return size - (percision === 0.75 || percision === 0.25 ? 0.25 : 0);
}
