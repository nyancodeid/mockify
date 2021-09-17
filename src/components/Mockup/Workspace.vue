<template>
  <section class="result">
    <div class="result-wrapper">
      <div id="input" v-if="!hasImage">
        <input type="file" id="image" accept="image/*" v-on:change="onImage" />
        <img src="/icons/icon-180x180.png" alt="Mockify Icons">

        <p>Drag and drop your file, paste from clipboard, or</p>
        <button @click="openFile">Browse File</button>
      </div>

      <div v-show="hasImage" id="canvas" :style="canvasStyle" :class="{ 'has-bg-image': (options.useBackgroundImage && options.bgImage), 'has-gradient': options.useGradientColor }" :data-image-type="options.imageType">
        <div class="canvas-mockup has-radius" :class="{ [`with-position--${options.position}`]: true, 'has-border': options.useBorder, 'has-shadow': options.useShadow }">
          <window-header v-if="options.useBorder && options.headerType === 'window'" :dark-mode="options.useDarkMode" :width="options.width" />
          <chrome-header v-if="options.useBorder && options.headerType === 'chrome'" :dark-mode="options.useDarkMode" :width="options.width" />

          <img class="canvas-mockup--content" ref="image" />
        </div>
      </div>

      <div class="result-preload" :class="{ active: isWorking }">
        <span class="emoji">👨‍💻</span>
        <span>Wait a second, we working on it.</span>
      </div>

      <div class="result-action" v-show="hasImage">
        <IconReset class="result-action--reset" @click="resetImage" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import { useMock } from '@src/store/mock';

import ChromeHeader from "@src/components/Headers/Chrome.vue";
import WindowHeader from "@src/components/Headers/Window.vue";
import { ImageIcon, IconReset } from "@src/components/Icons.js";

export default {
  name: "Workspace",
  components: {
    ChromeHeader,
    WindowHeader,
    ImageIcon,
    IconReset
  },
  mounted () {
    document.addEventListener('paste', this.onPaste);

    if (!this.$refs.image.src && this.hasImage) {
      this.hasImage = false;
    }
  },
  computed: {
    ...mapState(useMock, [ "isWorking", "options" ]),
    ...mapWritableState(useMock, [ "hasImage" ]),
    canvasStyle () {
      let background = {
        backgroundColor: this.options.backgroundColor
      }

      if (this.options.useGradientColor && "--gradient-from" in this.options.gradientColor) {
        background = {
          ...background,
          ...this.options.gradientColor
        }
      }
      if (this.options.useBackgroundImage && this.options.bgImage) {
        background.backgroundImage = `url(${this.options.bgImage})`;
      }

      return {
        padding: `${this.getPadding('T')} ${this.getPadding('R')} ${this.getPadding('B')} ${this.getPadding('L')}`,
        ...background
      }
    }
  },
  methods: {
    ...mapActions(useMock, [ "setOptions" ]),
    openFile () {
      document.querySelector("#image").click();
    },
    onImage (event) {
      const file = event.target.files[0];

      this.setImage(file);
    },
    onPaste (event) {
      if (event?.clipboardData?.files && event.clipboardData?.files.length > 0) {
        const file = event.clipboardData.files[0];
        
        this.setImage(file);
      }
    },
    setImage (file) {
      if (!file instanceof File) return false;

      if (this.$refs.image) {
        this.$refs.image.src = URL.createObjectURL(file);
        this.$refs.image.onload = () => {
          const width = this.$refs.image.naturalWidth;
          
          this.$refs.image.onload = null;
          this.setOptions({
            width
          });
          this.hasImage = true;
        }
      }
    },
    resetImage () {
      this.hasImage = false;
      this.$refs.image.src = "";
    },
    getPadding (position) {
      if (position === "L") {
        return (this.options.position === "left") ? 0 : `${this.options.horizontal}px`;
      } else if (position === "R") {
        return (this.options.position === "right") ? 0 : `${this.options.horizontal}px`;
      } else if (position === "B") {
        return (this.options.position === "bottom") ? 0 : `${this.options.vertical}px`;
      } else if (position === "T") {
        return (this.options.position === "top") ? 0 : `${this.options.vertical}px`;
      }
    }
  },
  unmounted () {
    document.removeEventListener('paste', this.onPaste);
  }
}
</script>

<style lang="scss">
section.result {
  position: relative;
  
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;

  width: 82vw;
  height: calc(100% - 60px);

  padding: 30px 0;

  background-image: url('/background.webp');
  background-position: center;
  background-size: contain;

  .result-wrapper {
    max-width: 82%;
    margin: auto;

    #input {
      width: 256px;
      padding: 3em 4em;
      border-radius: .4em;
      box-shadow: var(--box-shadow);

      background-color: #f5f5f5;
      color: #333;
      font-size: .85rem;

      text-align: center;

      input {
        display: none;
      }

      img {
        width: 128px;
      }
    }

    #canvas {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;

      padding: 48px;
      box-sizing: border-box;
      border-radius: 0px;
      opacity: 1;
      width: initial;

      &.has-bg-image {
        background-size: cover;
        background-position: 50% 50%;

        &[data-image-type=type-2],
        &[data-image-type=type-3] {
          background-size: contain;
        }

        &[data-image-type=type-2] {
          background-position: right;
        }
        &[data-image-type=type-3],
        &[data-image-type=type-5],
        &[data-image-type=type-6]  {
          background-position: top;
        }
      }

      .canvas-mockup {
        &.has-radius {
          border-radius: 8px;

          .canvas-mockup--header-window,
          .canvas-mockup--content {
            border-radius: 8px;
          }

          &.with-position--left {
            .canvas-mockup--header-window,
            .canvas-mockup--content {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
          }
          &.with-position--right {
            .canvas-mockup--header-window,
            .canvas-mockup--content {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
          &.with-position--bottom {
            .canvas-mockup--header-window,
            .canvas-mockup--content {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
          &.with-position--top {
            .canvas-mockup--header-window,
            .canvas-mockup--content {
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }
          }
        }
        &.has-border {
          .canvas-mockup--header-window {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .canvas-mockup--content {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
        &.has-shadow {
          &--s-1 {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }
          &--s-2 {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }
          &--s-3 {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          &--s-4 {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          &--s-5 {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          &--s-6 {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          &--s-7 {
            box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
          }
          &--s-8 {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
          }
        }
        .canvas-mockup--header-window,
        .canvas-mockup--content {
          display: block;
          width: 100%;
        }
      }
    }

    .result-preload {
      display: none;

      position: absolute;
      top: 43%;
      left: 50%;
      transform: translate(-50%,-50%);

      background-color: var(--preload-color);

      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 50%;
      border-radius: 1em;

      span {
        &.emoji {
          font-size: 6em;
          margin-bottom: .4em;
        }
      }

      &.active {
        display: flex;
        box-shadow: var(--box-shadow);
      }
    }
    .result-action {
      display: flex;
      position: fixed;
      bottom: 2em;
      left: 2em;

      .result-action--reset {
        font-size: 1.5em;
        cursor: pointer;

        &:hover {
          color: var(--secondary-color);
        }
      }
    }
  }
}
</style>