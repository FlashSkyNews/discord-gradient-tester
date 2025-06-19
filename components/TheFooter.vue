<template>
  <footer class="text-center p-4 mt-8 text-xs text-gray-500">
    <div class="flex justify-center gap-4">
      <NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
      <span>|</span>
      <NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of Use</NuxtLink>
      <span>|</span>
      <NuxtLink to="https://github.com/FlashSkyNews/discord-gradient-tester" class="hover:text-white transition-colors">GitHub</NuxtLink>
    </div>
    <p class="mt-2">© {{ new Date().getFullYear() }} Kayo "FlashSkyNews". This is a personal project.</p>
  </footer>
</template>

<script setup>
// This component doesn't need any complex logic, so the script setup is empty.
</script>