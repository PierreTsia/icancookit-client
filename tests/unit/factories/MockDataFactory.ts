export class MockDataFactory<T> {
  constructor(private generatorFn: (options: any) => T) {}

  getSingleRecord(options: any = {}, override: any = {}): T {
    return {
      ...this.generatorFn(options),
      ...override
    };
  }

  getArrayRecord(length = 20, overrides: any[] = [], options: any = {}): T[] {
    return Array.from(new Array(length)).map((_, i) =>
      this.getSingleRecord(options, overrides[i])
    );
  }
}
