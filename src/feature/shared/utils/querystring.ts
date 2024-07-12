const QueryString = {
  toNumber(value: string | undefined): number | undefined {
    if (value === undefined) {
      return undefined;
    }
    const parsedValue = Number.parseInt(value, 10);
    if (Number.isNaN(parsedValue)) {
      return undefined;
    }
    return parsedValue;
  },
} as const;

export default QueryString;
