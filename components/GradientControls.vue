<template>
  <div class="bg-[#2b2d31] p-4 sm:p-6 rounded-lg shadow-lg mb-8">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h1 class="text-xl font-bold text-white">Discord Role Gradient Tester</h1>
        <p class="text-xs text-gray-400 -mt-1">because there wasn't one</p>
      </div>
      <div class="flex items-center gap-3">
        <a :href="commitUrl" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors" :title="commitTitle">
          {{ commitSha.slice(0, 7) }}
        </a>
        <a href="https://github.com/FlashSkyNews/discord-gradient-tester" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" title="View on GitHub">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-x-6 gap-y-4">
      <!-- Left Column -->
      <div class="flex-1 flex flex-col gap-y-4 min-w-0">
        <div>
          <label for="username" class="block mb-1 text-sm font-medium text-gray-200">Username</label>
          <div class="bg-[#1e1f22] rounded-md p-2 w-full">
            <div
              ref="usernameSpan"
              id="username"
              contenteditable="true"
              class="text-lg focus:outline-none caret-white w-full flowing-gradient"
              style=""
              :style="{ '--color1': store.color1.value, '--color2': store.color2.value }"
              @input="updateUsername"
              @blur="reformatUsernameOnBlur"
            ></div>
          </div>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-200">Avatar (Optional)</label>
          <div class="flex items-center gap-2">
            <NuxtImg :src="displayAvatarSrc" alt="Avatar Preview" class="w-10 h-10 rounded-full object-contain" @error="onAvatarError" width="40" height="40" format="webp" quality="80" sizes="40px"  />
            <div class="flex-grow flex items-center gap-2">
              <input type="url" v-model="store.avatarLink.value" @input="clearUploadedAvatar" placeholder="Paste image link..." class="w-full h-10 bg-[#1e1f22] rounded-md p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5865F2]" aria-label="Avatar Image URL">
              <button @click="triggerAvatarUpload" class="h-10 px-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors">Upload</button>
              <input type="file" ref="avatarInput" @change="handleAvatarUpload" accept="image/*" class="hidden">
            </div>
          </div>
        </div>
        <div class="flex-1 flex flex-col">
          <label for="message" class="block mb-1 text-sm font-medium text-gray-200">Message</label>
          <textarea id="message" v-model="store.messageText.value" @keydown.enter.prevent="onMessageEnter" class="flex-1 w-full bg-[#1e1f22] rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#5865F2] resize-none"></textarea>
        </div>
      </div>

      <!-- Right Column -->
      <div class="flex-1 flex flex-col gap-y-4 min-w-0">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-200">Role Icon (Optional)</label>
          <div class="flex items-center gap-2">
            <NuxtImg v-if="displayIconSrc" :src="displayIconSrc" alt="Icon Preview" class="w-6 h-6 rounded-md object-contain" @error="onIconError" width="24" height="24" format="webp" quality="80" sizes="24px" />
            <div class="flex-grow flex items-center gap-2">
              <input type="url" v-model="store.roleIconLink.value" @input="clearUploadedIcon" placeholder="Paste image link..." class="w-full h-10 bg-[#1e1f22] rounded-md p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5865F2]" aria-label="Role Icon Image URL">
              <button @click="triggerIconUpload" class="h-10 px-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors">Upload</button>
              <input type="file" ref="iconInput" @change="handleIconUpload" accept="image/*" class="hidden">
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="space-y-2 pr-12">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-200">Gradient Color 1</label>
              <div class="flex items-center bg-[#1e1f22] rounded-md p-2 h-12">
                <input type="color" v-model="store.color1.value" class="w-8 h-8 rounded-md border-none bg-transparent cursor-pointer" aria-label="Gradient Color 1">
                <input type="text" v-model="store.color1.value" class="ml-2 w-full bg-transparent text-white focus:outline-none font-mono text-sm" aria-label="Gradient Color 1 Hex Code">
                <button @click="store.randomizeColor1" class="bg-gray-600 hover:bg-gray-700 text-white font-semibold p-1 rounded-md transition-colors duration-200 ml-2" title="Random Color 1">🎲</button>
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-200">Gradient Color 2</label>
              <div class="flex items-center bg-[#1e1f22] rounded-md p-2 h-12">
                <input type="color" v-model="store.color2.value" class="w-8 h-8 rounded-md border-none bg-transparent cursor-pointer" aria-label="Gradient Color 2">
                <input type="text" v-model="store.color2.value" class="ml-2 w-full bg-transparent text-white focus:outline-none font-mono text-sm" aria-label="Gradient Color 2 Hex Code">
                <button @click="store.randomizeColor2" class="bg-gray-600 hover:bg-gray-700 text-white font-semibold p-1 rounded-md transition-colors duration-200 ml-2" title="Random Color 2">🎲</button>
              </div>
            </div>
          </div>
          <button @click="store.randomizeBoth" class="absolute top-6 right-0 bottom-0 w-10 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-md transition-colors duration-200 flex items-center justify-center" title="Randomize Both">
            <span class="text-xl">🎲</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Advanced Settings -->
    <div v-if="store.showAdvanced.value" class="mt-4 pt-4 border-t border-gray-700/50">
       <h3 class="text-md font-semibold text-white mb-2">Font Customization</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-200">Font Name</label>
                <input type="text" v-model="store.fontName.value" @blur="store.applyFontSettings" placeholder="e.g., Roboto" class="w-full h-10 bg-[#1e1f22] rounded-md p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5865F2]">
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-200">Font Weight</label>
                <input type="number" step="100" v-model="store.fontWeight.value" @blur="store.applyFontSettings" placeholder="e.g., 400" class="w-full h-10 bg-[#1e1f22] rounded-md p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5865F2]">
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-200">Font Style</label>
                 <select v-model="store.fontStyle.value" @blur="store.applyFontSettings" class="w-full h-10 bg-[#1e1f22] rounded-md p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5865F2]">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                </select>
            </div>
        </div>
    </div>

    <div class="flex flex-wrap gap-4 mt-6 items-center">
      <button @click="store.sendMessage" class="h-10 flex-grow bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
        Send Message
      </button>
       <button @click="store.showAdvanced.value = !store.showAdvanced.value" class="h-10 w-10 flex items-center justify-center rounded-md transition-colors duration-200" :class="store.showAdvanced.value ? 'bg-[#5865F2] hover:bg-[#4752c4]' : 'bg-gray-600 hover:bg-gray-700'" title="Toggle Advanced Settings">
        <span class="text-2xl" role="img" :aria-label="store.showAdvanced.value ? 'Show Advanced Settings' : 'Hide Advanced Settings'">⚙️</span>
      </button>
      <button @click="store.isCompareMode.value = !store.isCompareMode.value" class="h-10 w-10 flex items-center justify-center rounded-md transition-colors duration-200" :class="store.isCompareMode.value ? 'bg-[#5865F2] hover:bg-[#4752c4]' : 'bg-gray-600 hover:bg-gray-700'" title="Toggle Comparison Mode">
        <span class="text-2xl" role="img" :aria-label="store.isCompareMode.value ? 'Side-To-Side Comparison Mode On' : 'Side-To-Side Comparison Mode Off'">{{ store.isCompareMode.value ? '👤' : '👥' }}</span>
      </button>
      <button @click="store.resetChat" class="h-10 w-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-md transition-colors duration-200" title="Reset Chat">
        <span class="text-lg">🗑️</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useGradientStore } from '~/composables/useGradientStore';
import { useAvatar } from '~/composables/useAvatar';

const store = useGradientStore();
const { generateAvatar } = useAvatar();

const config = useRuntimeConfig();
const commitSha = config.public.commitSha;

// Refs for the hidden file inputs
const usernameSpan = ref<HTMLDivElement | null>(null);
const avatarInput = ref<HTMLInputElement | null>(null);
const iconInput = ref<HTMLInputElement | null>(null);
const generatedAvatarSrc = ref('');


const commitUrl = computed(() => {
  return commitSha === 'N/A'
    ? 'https://github.com/FlashSkyNews/discord-gradient-tester'
    : `https://github.com/FlashSkyNews/discord-gradient-tester/commit/${commitSha}`;
});

const commitTitle = computed(() => {
    return commitSha === 'N/A' ? 'Development Build' : `View commit ${commitSha.slice(0, 7)} on GitHub`;
});

// Watch username to generate a DiceBear avatar as a fallback
watch(() => store.username.value, async (newUsername) => {
  if (usernameSpan.value && usernameSpan.value.textContent !== newUsername) {
    usernameSpan.value.textContent = newUsername;
  }
  generatedAvatarSrc.value = await generateAvatar(newUsername || 'User');
}, { immediate: true });

// Computed property to determine which avatar to display, prioritizing uploaded, then linked, then generated.
const displayAvatarSrc = computed(() => {
  return store.uploadedAvatarUrl.value || store.avatarLink.value || generatedAvatarSrc.value;
});

// Computed property for the role icon, prioritizing uploaded then linked.
const displayIconSrc = computed(() => {
  return store.uploadedRoleIconUrl.value || store.roleIconLink.value;
});


const updateUsername = (event: Event) => {
  store.username.value = (event.target as HTMLElement).textContent || '';
};

const reformatUsernameOnBlur = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target.textContent?.trim() === '') {
        target.textContent = store.username.value;
    }
    target.scrollLeft = 0;
};

// --- File Upload Logic ---
const triggerAvatarUpload = () => avatarInput.value?.click();
const triggerIconUpload = () => iconInput.value?.click();

const handleFileUpload = (event: Event, urlState: Ref<string | null>, linkState: Ref<string>) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    urlState.value = e.target?.result as string;
    linkState.value = ''; // Clear the link input to prioritize the uploaded file
  };
  reader.readAsDataURL(file);
};

const handleAvatarUpload = (event: Event) => handleFileUpload(event, store.uploadedAvatarUrl, store.avatarLink);
const handleIconUpload = (event: Event) => handleFileUpload(event, store.uploadedRoleIconUrl, store.roleIconLink);

// If the user starts typing in a link, clear the uploaded file state.
const clearUploadedAvatar = () => {
  if (store.uploadedAvatarUrl.value) {
    store.uploadedAvatarUrl.value = null;
    if (avatarInput.value) avatarInput.value.value = '';
  }
};
const clearUploadedIcon = () => {
  if (store.uploadedRoleIconUrl.value) {
    store.uploadedRoleIconUrl.value = null;
    if (iconInput.value) iconInput.value.value = '';
  }
}
// --- End File Upload Logic ---

onMounted(() => {
  if (usernameSpan.value) {
    usernameSpan.value.textContent = store.username.value;
  }
});

const onAvatarError = async (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.src = await generateAvatar(store.username.value || 'User');
  }
};

const onIconError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.style.display = 'none';
  }
};

const onMessageEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey) {
    store.sendMessage();
  }
};
</script>
