<template>
  <section id="content">
    <div class="main">
      <section id="about">
        <h1>Mockify</h1>
        <p>Instant Design Mockup for Instantly Shareable Images. Build with <a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue 3</a> and
          <a href="https://vitejs.dev/" target="_blank" rel="noopener">ViteJS</a>. Use Mockify for Creating Professional Share Image Instantly Without Complicated Software.</p>
        <p>Mockify build with Latest Web Technology which allow use to access this app even in offline mode (cache-first). And the other cool thing is PWA (Progressive Web App) makes this app installable on Android devices, allow us to use this app to run native-like on an Android.</p>

        <p>Build with <IconHearth class="icon-love" /> by <a href="https://github.com/nyancodeid" rel="noopener" class="author">NyanCodeID</a></p>
      </section>
    </div>
  </section>
</template>

<script>
import IconHearth from "virtual:vite-icons/ri/heart-2-fill";
export default {
  name: "VAbout",
  components: {
    IconHearth
  }
}
</script>

<style lang="scss">
section#content .main {
  justify-content: center;

  section#about {
    width: 70vw;
    height: auto;
    margin-top: 4em;

    h1 {
      img {
        display: inline-block;
      }
    }
    a {
      color: var(--contrast-color);
      font-weight: bold;
      border-bottom: 1px solid var(--contrast-color);
      text-decoration: none;
      &.author {
        padding: 6px 12px;
        border-radius: 8px;
        background-color: var(--gradient-100);
        color: var(--icon-color);
        font-size: 0.85rem;
        border-bottom: none;
      }
    }

    p {
      line-height: 1.7;
    }

    .icon-love {
      color: #e91e63;
      display: inline;
      vertical-align: middle;
    }
  }
}

body.dark-theme {
  section#content .main section#about .author {
    background-color: var(--gradient-800);
  }
}
</style>