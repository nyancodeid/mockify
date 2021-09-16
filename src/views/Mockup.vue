<template>
  <section id="content">
    <div class="main">
      <Workspace />
      <Controller />
    </div>
  </section>
</template>

<script>
import { ref, watch, nextTick } from "vue";

import Workspace from "@src/components/Mockup/Workspace.vue";
import Controller from "@src/components/Mockup/Controller.vue";
import Modal from "@src/components/Mockup/Modal.vue";

import { useMock } from "@src/store/mock";
import { images, shadows } from "@src/services/list";

import { NotfyProvider } from "@src/services/helpers";

export default {
  name: "MockupView",
  components: {
    Workspace,
    Controller
  },
  provide: {
    notyf: NotfyProvider()
  },
  setup() {
    const modal = ref(false);
    const store = useMock();

    watch(() => store.options.imageType, () => {
      if (store.options.imageType === "none") return;

      if (store.options.imageType === "type-5") {
        store.setOptions({
          backgroundColor: "#E6E7EF"
        })
      }

      store.setOptions({
        bgImage: images[store.options.imageType],
      });
    });

    nextTick(() => {
      watch(() => store.options.shadowType, () => {
        const element = document.querySelector("#canvas > .canvas-mockup");

        element.classList.remove(...shadows);
        element.classList.add(`has-shadow--${store.options.shadowType}`);
      }, { immediate: true });
    });

    const setModalState = (state) => {
      modal.value = state;
    }

    const color = ref("#FFFFFF");

    return {
      color,
      modal,
      setModalState
    };
  },
};
</script>

<style lang="scss">
section#content {
  position: relative;
  height: calc(100% - 112px);

  .main {
    display: flex;
    height: 100%;
  }

  .has-gradient {
    background-image: linear-gradient(to right top, var(--gradient-from), var(--gradient-to, rgba(236,72,149,0)));

    &--none {
      background-color: #FDFDFD;
    }
  }
}

.share-link--content {
  margin-top: 16px;

  textarea {
    outline: none;
    border: none;
    padding: 8px;
    background: var(--gradient-700);
    border-radius: 8px;
    width: calc(100% - 16px);
    height: 64px;

    font-size: .9rem;
    color: var(--contrast-color);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from,
.modal-leave-to {
  transform: scale(0);
}
.modal-enter-to,
.modal-leave-from {
  transform: scale(1);
}
</style>
