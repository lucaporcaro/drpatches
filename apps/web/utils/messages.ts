export async function getLocalMessages(locale: string) {
  return (await import(`../messages/${locale}`)).default;
}
