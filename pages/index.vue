<template>
  <main class="max-w-3xl mx-auto p-4 md:p-6 text-white antialiased">
    <GradientControls />
    <ChatLog />
  </main>
</template>

<script setup>
import GradientControls from '~/components/GradientControls.vue';
import ChatLog from '~/components/ChatLog.vue';

// All the script content from app.vue can live here now
const store = useGradientStore();
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

const customFontUrl = computed(() => {
  const { appliedFontName, appliedFontWeight, appliedFontStyle } = store;
  if (!appliedFontName.value?.trim()) {
    return null;
  }
  const fontName = appliedFontName.value.replace(/\s+/g, '+');
  const italicSuffix = appliedFontStyle.value === 'italic' ? 'i' : '';
  return `https://fonts.bunny.net/css?family=${fontName}:${appliedFontWeight.value}${italicSuffix}&display=swap`;
});

useHead({
  title: 'Discord Role Gradient Tester',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { name: 'description', content: 'Test and preview Discord role gradients with custom usernames, messages, and role icons.' },
    { name: 'author', content: 'FlashSkyNews' },
    { name: 'theme-color', content: '#313338' },
    { name: 'keywords', content: 'Discord, Role Gradient, Gradient Tester, Discord Roles, Username Gradient, Discord Font, Discord Role Icon, Discord Message Preview, Discord Customization, Discord Chat Simulator' },
    { property: 'og:title', content: 'Discord Role Gradient Tester' },
    { property: 'og:description', content: 'Test and preview Discord role gradients with custom usernames, messages, and role icons.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: `${siteUrl}/socialcard.webp` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Discord Role Gradient Tester' },
    { name: 'twitter:description', content: 'Test and preview Discord role gradients with custom usernames, messages, and role icons.' },
    { name: 'twitter:image', content: `${siteUrl}/socialcard.webp` }
  ],
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'icon', type: 'image/webp', href: '/kay0-head-dark.webp' },
    {
      key: 'custom-font',
      rel: 'stylesheet',
      href: customFontUrl,
    },
  ],
  bodyAttrs: {
    style: computed(() =>
      store.appliedFontName.value
        ? `font-family: '${store.appliedFontName.value}', 'Inter', sans-serif;`
        : `font-family: 'Inter', sans-serif;`
    )
  }
})
</script>