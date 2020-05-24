class RandomDataFactory<T> {
  constructor(private generatorFn: (...args: any[]) => T) {}

  getOne(...args: any[]): T {
    return this.generatorFn(...args);
  }

  getArray(length = 20, ...args: any[]): T[] {
    return Array.from(new Array(length)).map((_, i) => this.getOne(...args));
  }
}

export const RANDOM_TYPED_ID = new RandomDataFactory<number | any>(
  (min = 0, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
);

export const RANDOM_STRING = new RandomDataFactory<string>((length = 4) => {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(new Array(length))
    .map((_, i) => Math.floor(Math.random() * 62))
    .reduce((word, i) => word + letters[i], "");
});
