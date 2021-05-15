export default async function sleep(timeMillis: number) {
  return new Promise(res => {
    setTimeout(() => res(), timeMillis);
  });
}
