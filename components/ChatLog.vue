<template>
    <div class="bg-[#313338] p-4 rounded-lg space-y-1 min-h-[200px]">
      <ChatMessage 
        v-for="msg in store.messages.value"
        :key="msg.id"
        :message="msg"
        :is-compare-mode="store.isCompareMode.value"
        @remove="store.removeMessage(msg.id)"
      />
    </div>
  </template>
  
  <script setup>
  import ChatMessage from './ChatMessage.vue';
  const store = useGradientStore();
  </script>
  