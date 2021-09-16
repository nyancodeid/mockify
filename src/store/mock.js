import { defineStore } from "pinia";

export const useMock = defineStore({
  id: "mock",
  state () {
    return {
      hasImage: false,
      isWorking: false,
      options: {
        width: 0,
        vertical: 64,
        horizontal: 64,
        useShadow: true,
        useDarkMode: false,
        useBorder: false,
        useBackgroundImage: false,
        useGradientColor: false,
        position: "center",
        backgroundColor: "#D1D1D1",
        gradientColor: {},
        headerType: "window",
        shadowType: "s-1",
        imageType: "none",
        bgImage: null
      }
    }
  },
  actions: {
    setOptions (options) {
      this.options = {
        ...this.options,
        ...options
      }
    }
  }
})