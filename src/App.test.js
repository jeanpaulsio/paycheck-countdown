import { daysUntilPaycheck } from "./App";

describe("daysUntilPaycheck", () => {
  it("returns 0 on actual pay day!", () => {
    const today = new Date(2019, 9, 15);
    const actual = daysUntilPaycheck(today);
    expect(actual).toEqual(0);
  });

  it("calculates correctly on the day after the fist paycheck", () => {
    const today = new Date(2019, 9, 16);
    const actual = daysUntilPaycheck(today);
    expect(actual).toEqual(15);
  });

  it("calculates from Friday when payday lands on Saturday", () => {
    const today = new Date(2020, 1, 10);
    const actual = daysUntilPaycheck(today);
    expect(actual).toEqual(4);
  });

  it("returns 0 on the Friday before payday when payday is on the weekend", () => {
    const today = new Date(2020, 1, 14);
    const actual = daysUntilPaycheck(today);
    expect(actual).toEqual(0);
  });

  it("calculates from Friday when payday lands on Sunday", () => {
    const today = new Date(2020, 2, 2);
    const actual = daysUntilPaycheck(today);
    expect(actual).toEqual(11);
  });
});
