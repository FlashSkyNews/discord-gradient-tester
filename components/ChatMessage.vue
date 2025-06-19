<template>
  <div class="message-container-wrapper group" :class="{ 'flex flex-col sm:flex-row gap-4': isCompareMode }">
    <!-- Existing Message -->
    <div
      class="flex-1 flex items-start space-x-4 p-2 -mx-2 rounded-md min-w-0"
      :class="{ 'hover:bg-[#2e3035]': !isCompareMode }"
    >
      <NuxtImg :src="message.avatarSrc" alt="User Avatar" class="w-10 h-10 rounded-full mt-1" @error="onAvatarError" width="40" height="40" format="webp" quality="80" sizes="40px" />
      <div class="flex-grow min-w-0">
        <div class="flex items-center space-x-2">
          <div class="username-container">
            <span class="main-username flowing-gradient" :style="{ '--color1': message.color1, '--color2': message.color2 }">{{ message.username }}</span>
          </div>
          <NuxtImg v-if="message.iconSrc" :src="message.iconSrc" alt="Role Icon" class="w-5 h-5" @error="onIconError" width="20" height="20" format="webp" quality="80" sizes="20px" />
          <span class="text-gray-400 text-xs font-medium">{{ message.timestamp }}</span>
        </div>
        <p class="text-gray-200 whitespace-pre-wrap break-words" v-html="renderedMessage"></p>
      </div>
      <button v-if="!isCompareMode" @click="$emit('remove')" class="remove-message-button opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full text-gray-400 hover:text-white hover:bg-red-600/50">
         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
      </button>
    </div>
    <!-- Comparison Message (if applicable) -->
    <div
      v-if="isCompareMode"
      class="flex-1 flex items-start space-x-4 p-2 -mx-2 rounded-md min-w-0"
    >
      <NuxtImg :src="message.avatarSrc" alt="User Avatar" class="w-10 h-10 rounded-full mt-1" @error="onAvatarError" width="40" height="40" format="webp" quality="80" sizes="40px" />
      <div class="flex-grow min-w-0">
        <div class="flex items-center space-x-2">
           <div class="username-container always-glow" :style="{ '--color1': message.color1, '--color2': message.color2 }">
            <span class="main-username flowing-gradient">{{ message.username }}</span>
          </div>
          <NuxtImg v-if="message.iconSrc" :src="message.iconSrc" alt="Role Icon" class="w-5 h-5" @error="onIconError" width="20" height="20" format="webp" quality="80" sizes="20px" />
          <span class="text-gray-400 text-xs font-medium">{{ message.timestamp }}</span>
        </div>
        <p class="text-gray-200 whitespace-pre-wrap break-words" v-html="renderedMessage"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAvatar } from '~/composables/useAvatar';

interface Message {
  id: string;
  username: string;
  message: string;
  color1: string;
  color2: string;
  iconSrc: string | null;
  avatarSrc: string;
  timestamp: string;
}

const props = defineProps<{
  message: Message;
  isCompareMode: boolean;
}>();

defineEmits(['remove']);

const { generateAvatar } = useAvatar();

const onAvatarError = async (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.src = await generateAvatar(props.message.username || 'User');
  }
};

const onIconError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.style.display = 'none';
  }
};

const renderedMessage = computed(() => {
  if (!props.message.message) return '';
  const emojiRegex = /<:(\w+):(\d+)>/g;
  return props.message.message.replace(emojiRegex, (match, name, id) =>
    `<img src="https://cdn.discordapp.com/emojis/${id}.webp" alt="${name}" class="rendered-emote">`
  );
});
</script>