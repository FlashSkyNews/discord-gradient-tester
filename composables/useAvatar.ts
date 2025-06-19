// composables/useAvatar.ts
import { createAvatar } from '@dicebear/core';
// Corrected: The 'initials' style is now in the '@dicebear/collection' package.
import { initials } from '@dicebear/collection';

/**
 * A composable to generate unique, consistent avatars using DiceBear.
 */
export const useAvatar = () => {
  /**
   * Generates an SVG avatar based on a seed string.
   * This function is now ASYNCHRONOUS.
   * @param seed The string to generate the avatar from (e.g., a username).
   * @param size The width and height of the SVG.
   * @returns A Promise that resolves to a Base64 encoded data URL.
   */
  const generateAvatar = async (seed: string, size: number = 40) => {
    const avatar = createAvatar(initials, {
      seed: seed,
      backgroundColor: ["#5865F2"], // Discord Blurple
      fontWeight: 500,
      size: size,
      // Use only one character for the initials.
      chars: 1,
    });

    // Corrected: toDataUri() is an async method and must be awaited.
    return await avatar.toDataUri();
  };

  return { generateAvatar };
};
