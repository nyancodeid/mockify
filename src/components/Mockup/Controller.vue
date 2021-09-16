<template>
  <section class="controller">
    <div class="controller-form--field">
      <label for="use-border">Use header</label>

      <input
        id="use-border"
        type="checkbox"
        name="use-border"
        v-model="options.useBorder"
      />
    </div>
    <div class="controller-form--field">
      <label for="use-shadow">Use shadow</label>

      <input
        id="use-shadow"
        type="checkbox"
        name="use-shadow"
        v-model="options.useShadow"
      />
    </div>
    <div class="controller-form--field">
      <label for="use-dark-mode">Use dark mode</label>

      <input
        id="use-dark-mode"
        type="checkbox"
        name="use-dark-mode"
        v-model="options.useDarkMode"
      />
    </div>
    <div class="controller-form--field">
      <label for="use-bg-image">Use background image</label>

      <input
        id="use-bg-image"
        type="checkbox"
        name="use-bg-image"
        v-model="options.useBackgroundImage"
      />
    </div>

    <div class="controller-form--group">
      <div v-if="options.useBackgroundImage" class="controller-form--field">
        <label for="bg-image-value">Image</label>

        <select
          id="bg-image-value"
          name="bg-image-value"
          v-model="options.imageType"
        >
          <option v-for="(value, name) in images" :key="name" :value="name">
            {{ name.toUpperCase() }}
          </option>
        </select>
      </div>
      <div v-if="options.useBorder" class="controller-form--field">
        <label for="header-type">Header Type</label>

        <select id="header-type" name="header-type" v-model="options.headerType">
          <option value="window">Window</option>
          <option value="chrome">Browser</option>
        </select>
      </div>
      <div class="controller-form--field">
        <label for="shadow-type">Shadow Type</label>

        <select id="shadow-type" name="shadow-type" v-model="options.shadowType">
          <option v-for="index in 8" :key="index" :value="`s-${index}`">
            Shadow {{ index }}
          </option>
        </select>
      </div>
      <div class="controller-form--field">
        <label for="background-color">Background Color</label>

        <input
          type="color"
          id="background-color"
          name="background-color"
          v-model="options.backgroundColor"
        />
      </div>
      <div class="controller-form--field">
      <div
        class="gradient-color--item has-gradient--none"
        :style="{ backgroundColor: options.backgroundColor }"
        @click="useGradient(false)"
      ></div>
      <div
        class="gradient-color--item has-gradient"
        :style="{ '--gradient-from': value[0], '--gradient-to': value[1] }"
        v-for="(value, name) in gradients"
        :key="name"
        @click="useGradient({ value })"
      ></div>
    </div>
    </div>

    <div class="controller-form--group">
      <div class="controller-form--field">
        <label for="use-bg-image">Position</label>

        <div class="field-position">
          <IconALeft
            :class="{ active: options.position === 'left' }"
            @click="options.position = 'left'"
          />
          <IconARight
            :class="{ active: options.position === 'right' }"
            @click="options.position = 'right'"
          />
          <IconABottom
            :class="{ active: options.position === 'bottom' }"
            @click="options.position = 'bottom'"
          />
          <IconACenter
            :class="{ active: options.position === 'center' }"
            @click="options.position = 'center'"
          />
          <IconATop
            :class="{ active: options.position === 'top' }"
            @click="options.position = 'top'"
          />
        </div>
      </div>
      <div class="controller-form--field">
        <label for="vertical-value">Vertical</label>

        <input
          type="number"
          name="vertical"
          id="vertical-value"
          class="field-padding"
          v-model="options.vertical"
        />
      </div>
      <div class="controller-form--field">
      <label for="horizontal-value">Horizontal</label>

      <input
        type="number"
        name="horizontal"
        id="horizontal-value"
        class="field-padding"
        v-model="options.horizontal"
      />
    </div>
    </div>

    <div class="controller-form--group">
      <div class="controller-form--field">
        <button class="export-button" :disabled="!hasImage" @click="exportMockup('png')">
          to PNG
        </button>
        <button class="export-button" :disabled="!hasImage" @click="exportMockup('jpeg')">
          to JPG
        </button>
      </div>
      <div class="controller-form--field">
        <button class="export-button" :disabled="!hasImage" @click="exportAndShare">
          Generate Link (PNG)
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { saveAs } from "file-saver";

import { useMock } from "@src/store/mock";
import { exportTo } from "@src/services/export";
import { uploadBlob } from "@src/services/upload";
import { images, gradients } from "@src/services/list";
import { copyToClipboard } from "@src/services/helpers";
import {
  IconALeft,
  IconARight,
  IconABottom,
  IconACenter,
  IconATop,
  IconReset,
} from "../Icons.js";

export default {
  name: "Controller",
  inject: [ "notyf" ],
  components: {
    IconALeft,
    IconARight,
    IconABottom,
    IconACenter,
    IconATop,
    IconReset,
  },
  data() {
    return {
      images, gradients
    };
  },
  computed: {
    ...mapWritableState(useMock, [ "hasImage", "isWorking", "options" ]),
  },
  methods: {
    ...mapActions(useMock, ["setOptions"]),
    useGradient(gradient) {
      if (!gradient) {
        this.setOptions({
          useGradientColor: false,
          gradientColor: {},
        });

        return;
      }

      const {
        value: [from, to],
      } = gradient;

      this.setOptions({
        useGradientColor: true,
        gradientColor: {
          "--gradient-from": from,
          "--gradient-to": to,
        },
      });
    },
    exportMockup(format, direct_download = true) {
      this.isWorking = true;

      const imgElement = document.querySelector(
        "#canvas .canvas-mockup--content"
      );
      const canvasResultElement = document.querySelector("#canvas");

      canvasResultElement.style.width = `${imgElement.naturalWidth + 48 * 2}px`;
      canvasResultElement.style.opacity = 0;

      exportTo(canvasResultElement, format)
        .then(async ({ blob, filename }) => {
          if (!direct_download) {
            const { error, data } = await uploadBlob(blob);

            if (error) return this.notyf.error("Ops, something wrong when generate shareable link.");

            if (data.cid) {
              copyToClipboard(`https://cloudflare-ipfs.com/ipfs/${data.cid}`);

              this.notyf.success("Your public link was successfully copied to clipboard!");
            }

            return;
          }

          saveAs(blob, filename);
        })
        .finally(() => {
          setTimeout(() => {
            canvasResultElement.style.width = "initial";
            canvasResultElement.style.opacity = 1;

            this.isWorking = false;
          }, 500);
        });
    },
    exportAndShare() {
      this.exportMockup("png", false);
    }
  },
};
</script>

<style lang="scss">
section.controller {
  width: 18vw;
  background-color: rgba(0, 0, 0, .1);

  padding: 1em;

  display: flex;
  flex-direction: column;

  .controller-form--group {
    margin: .6em 0;
  }
  .controller-form--field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .7rem;

    label {
      font-size: 0.8rem;
    }

    .field-padding {
      width: calc(115px - 24px);
    }
    .field-position {
      display: flex;
      justify-content: space-between;
      width: 115px;

      svg {
        cursor: pointer;

        &:not(.active) {
          color: #8f8f8f;
        }
      }
    }
    .gradient-color--item {
      width: 24px;
      height: 24px;

      border-radius: 100%;
      cursor: pointer;
    }
    select {
      width: 115px;
    }
    .export-button {
      flex: 1;

      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
  .controller-button--action {
    display: flex;

    button {
      width: 100%;

      &:first-child {
        margin-right: 8px;
      }
    }
  }
}
</style>
