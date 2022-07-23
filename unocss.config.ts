import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['menu-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 active:bg-gray-200 !outline-none'],
    ['fra', 'flex flex-row items-center justify-around'],
    ['frb', 'flex flex-row items-center justify-between'],
    ['frc', 'flex flex-row items-center justify-center'],
    ['fca', 'flex flex-col items-center justify-around'],
    ['fcb', 'flex flex-col items-center justify-between'],
    ['fcc', 'flex flex-col items-center justify-center'],
    ['bgimg', 'w-100% h-100% bg-contain bg-no-repeat bg-center '],
    ['bgimg-top', 'w-100% h-100% bg-contain bg-no-repeat bg-top'],
    ['bgimg-bottom', 'w-100% h-100% bg-contain bg-no-repeat bg-bottom'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
        //   // STYuanti-SC
        // STYuanti: 'https://static.hetaoimg.com/avu7i4/JC6ONNQ74N.TTF',
        // // YouSheBiaoTiHei
        // YouSheBiaoTiHei: 'https://static.hetaoimg.com/avu7i4/J959JNCOH9.ttf',
        YouSheBiaoTiHei: 'YouSheBiaoTiHei',
        // // FZCuYuan-M03S
        // FZCuYuan: 'https://static.hetaoimg.com/avu7i4/2WJZ4YAJ86.ttf',
        // // FZY3JW--GB1
        // FZY3JW: 'https://static.hetaoimg.com/avu7i4/HW6W62H3MO.ttf',
        // // impact-2
        // impact: 'https://static.hetaoimg.com/avu7i4/VJYOS95R6D.ttf',
        // // Alibaba-PuHuiTi-Light
        // phl: 'https://static.hetaoimg.com/avu7i4/22FKNNXIEL.ttf',
        // // Alibaba-PuHuiTi-Regular
        // phr: 'https://static.hetaoimg.com/avu7i4/7CF6EAJBJJ.ttf',
        // // Alibaba-PuHuiTi-Medium
        // phm: 'https://static.hetaoimg.com/avu7i4/6JILIK4EYP.ttf',
        // // Alibaba-PuHuiTi-Bold
        // phb: 'https://static.hetaoimg.com/avu7i4/5DLTJVHMC3.ttf',
        // // Alibaba-PuHuiTi-Heavy
        // phh: 'https://static.hetaoimg.com/avu7i4/IP3X6JIMFL.ttf',
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
