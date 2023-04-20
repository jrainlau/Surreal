import { argbFromRgb, rgbaFromArgb, Hct } from '@material/material-color-utilities'

export function hex2rgb(hex) {
  // 将十六进制颜色值转换为RGB格式
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

export function rgbaToHex(r, g, b, a) {
  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? 0 + hex : hex;
  }
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  const hex = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return hex;
}

export function hex2hct(hex) {
  const rgb = hex2rgb(hex)
  const argb = argbFromRgb(...rgb)
  const hct = Hct.fromInt(argb)
  return hct
}

export function hct2hex(h, c, t) {
  const newHct = Hct.from(h, c, t)
  const { argb } = newHct
  const { r, g, b, a } = rgbaFromArgb(argb)
  return rgbaToHex(r, g, b, a)
}

export function generateColors(color1) {
  const oriColorHct = hex2hct(color1)
  const { hue, chroma, tone } = oriColorHct
  const color2 = hct2hex(hue + 30, chroma, tone)
  const color3 = hct2hex(hue + 60, chroma, tone)
  const color4 = hct2hex(hue + 90, chroma, tone)
  return [color1, color2, color3, color4]
}