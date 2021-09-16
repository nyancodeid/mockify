<template>
  <svg class="canvas-mockup--header-window" :class="{'dark-mode': darkMode}" width="100%" height="100%" :viewBox="`0 0 1200 50`" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>window</title>
      <defs></defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="chrome">
              <path d="M8.39999986,0 L1352.59998,0 C1357.23917,1.17125314e-14 1360.99998,0.358816654 1360.99998,0.801439429 L1360.99998,89.7985591 C1360.99998,90.2411818 1357.23917,90.5999985 1352.59998,90.5999985 L8.39999986,90.5999985 C3.76080804,90.5999985 6.2374588e-14,90.2411818 0,89.7985591 L0,0.801439429 C-5.68137141e-16,0.358816654 3.76080804,8.13084846e-17 8.39999986,0 Z" id="Base" fill="#F0F1F2" fill-rule="nonzero"></path>
              <g id="Window-Controls" transform="translate(14.000000, 18.200000)" fill-rule="nonzero">
                  <circle id="Shape" stroke="#E14942" fill="#FF6058" cx="6.99999988" cy="6.99999988" r="6.64999989"></circle>
                  <circle id="Shape" stroke="#E1A325" fill="#FFC130" cx="29.3999995" cy="6.99999988" r="6.64999989"></circle>
                  <circle id="Shape" stroke="#3EAF3F" fill="#27CA40" cx="51.7999991" cy="6.99999988" r="6.64999989"></circle>
              </g>
          </g>
      </g>
  </svg>
</template>

<script>
export default {
  name: "Chrome",
  props: {
    width: Number,
    darkMode: Boolean,
  }
}
</script>

<style lang="scss">
svg.dark-mode #chrome {
  #Base {
    fill: #0c0c17;
  }

  #Bar-Base,
  #Tab #Shape,
  #Address #Rectangle {
    fill: #313543;
  }

  #Address #Address-Base {
    fill: #191b21;
  }

  #Navigation-Items #Arrow-Back, 
  #Navigation-Items #Refresh,
  #New-Tab {
    fill: #FFFFFF;
  }
}
</style>