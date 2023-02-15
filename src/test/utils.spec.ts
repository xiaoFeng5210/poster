import { test, expect, describe, it } from "vitest";
import Util from '~/lib/Utils';

describe('Util', () => {
  it('测试弧度转角度', () => {
    expect(Util.radiansToDegrees(Math.PI / 2)).toBe(90);
  })
  it('测试角度转弧度', () => {
    expect(Util.degressToRadians(90)).toBe(Math.PI / 2);
  })
  it('测试数组溢出', () => {
    const arr = [1, 2, 3, 4, 5];
    Util.removeFromArray(arr, 3);
    expect(arr).toEqual([1, 2, 4, 5]);
  })
})  
