// composables/useGradientStore.ts
import { useState, useRuntimeConfig } from '#app';
import { useAvatar } from './useAvatar';

export interface Message {
  id: string;
  username: string;
  message: string;
  color1: string;
  color2: string;
  iconSrc: string | null;
  avatarSrc: string;
  timestamp: string;
}

const useSharedState = () => {
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl;

  return {
    username: useState('username', () => 'kayo'),
    avatarLink: useState('avatarLink', () => `${siteUrl}/avatar.webp`),
    roleIconLink: useState('roleIconLink', () => `${siteUrl}/peepoHappyDank.webp`),
    // NEW: State to hold URLs from user-uploaded images
    uploadedAvatarUrl: useState<string | null>('uploadedAvatarUrl', () => null),
    uploadedRoleIconUrl: useState<string | null>('uploadedRoleIconUrl', () => null),
    messageText: useState('messageText', () => 'this is an example message <:sapphire:908755206068650004>'),
    color1: useState('color1', () => '#0056aa'),
    color2: useState('color2', () => '#2fbdff'),
    messages: useState<Message[]>('messages', () => []),
    isCompareMode: useState('isCompareMode', () => true),
    showAdvanced: useState('showAdvanced', () => false),
    
    // State for live input fields
    fontName: useState('fontName', () => ''),
    fontWeight: useState('fontWeight', () => '400'),
    fontStyle: useState('fontStyle', () => 'normal'),

    // State for the applied font (only updated on blur)
    appliedFontName: useState('appliedFontName', () => ''),
    appliedFontWeight: useState('appliedFontWeight', () => '400'),
    appliedFontStyle: useState('appliedFontStyle', () => 'normal'),
  }
};

export const useGradientStore = () => {
  const { 
    username, avatarLink, roleIconLink, uploadedAvatarUrl, uploadedRoleIconUrl, messageText, 
    color1, color2, messages, isCompareMode,
    showAdvanced, fontName, fontWeight, fontStyle,
    appliedFontName, appliedFontWeight, appliedFontStyle
  } = useSharedState();

  const { generateAvatar } = useAvatar();

  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  const randomizeColor1 = () => { color1.value = generateRandomColor(); };
  const randomizeColor2 = () => { color2.value = generateRandomColor(); };
  const randomizeBoth = () => { randomizeColor1(); randomizeColor2(); };

  const applyFontSettings = () => {
    appliedFontName.value = fontName.value;
    appliedFontWeight.value = fontWeight.value;
    appliedFontStyle.value = fontStyle.value;
  };
  
  const sendMessage = async () => {
    if (!messageText.value.trim()) return;

    // MODIFIED: Prioritize the image source: uploaded file > pasted link > generated avatar.
    let finalAvatarSrc = uploadedAvatarUrl.value;
    if (!finalAvatarSrc) {
      finalAvatarSrc = avatarLink.value || await generateAvatar(username.value || 'User');
    }
    
    // MODIFIED: Prioritize icon source: uploaded file > pasted link
    const finalIconSrc = uploadedRoleIconUrl.value || roleIconLink.value || null;

    messages.value.push({
      id: `msg-${Date.now()}-${Math.random()}`,
      username: username.value || 'User',
      message: messageText.value,
      color1: color1.value,
      color2: color2.value,
      iconSrc: finalIconSrc,
      avatarSrc: finalAvatarSrc,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const removeMessage = (id: string) => { messages.value = messages.value.filter((m: Message) => m.id !== id); };
  const resetChat = () => { messages.value = []; };

  return {
    username, avatarLink, roleIconLink, uploadedAvatarUrl, uploadedRoleIconUrl, messageText, 
    color1, color2, messages, isCompareMode, showAdvanced,
    fontName, fontWeight, fontStyle,
    appliedFontName, appliedFontWeight, appliedFontStyle,
    applyFontSettings,
    randomizeColor1, randomizeColor2, randomizeBoth,
    sendMessage, removeMessage, resetChat,
  };
};
