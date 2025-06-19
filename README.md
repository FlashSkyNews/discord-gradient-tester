# Discord Role Gradient Tester
*because there wasn't one*

### About This Thing
I just wanted a simple tool for testing color gradients and couldn't find one, so I asked Gemini to help me make it. I ended up having fun adding random stuff to it, and this is the result.

I'm hosting the [current version](https://rolegradients.kay0.io) on [Cloudflare Pages](https://pages.cloudflare.com/).

### How It Works & External Connections
I've tried to keep this simple and private. On the first load, the site uses only local assets and does not make any requests to outside domains.

There are a couple of optional features (that do connect to external services if used):

* **Custom Avatars/Icons by URL:** If you paste an image link for an avatar or role icon, your browser will fetch it directly from the specified URL.
* **Discord Emotes:** If you include a custom Discord emote (e.g., `<:name:12345>`) in your message, your browser will fetch the emote image directly from Discords CDN (`cdn.discordapp.com`).
* **Custom Fonts:** You can use custom fonts from [Bunny Fonts](https://fonts.bunny.net) by typing a font name into the advanced settings. This is a privacy-friendly font provider.
* **Fallback Avatars:** If an avatar link is invalid or not provided, a fallback avatar is generated locally in your browser using the DiceBear `initials` style.

### Maintenance & Contributing

Just a heads-up, this is a personal project. I'll definitely be using it myself from time to time, but I can't promise I'll be actively maintaining it since I've got enough other stuff to do. That said, I'll try my best to look at any issues :)

Pull requests are always welcome if you have an idea or a fix!

---

## Licensing

I've licensed the source code under the MIT License. You can read the full legal text in the `LICENSE` file.

### Asset Licenses

A couple of things here aren't covered by the MIT license:

* **`public/kay0-head-dark.webp`**: This is my personal favicon. Don't reuse it without asking.
* **`public/avatar.webp`**: Thats me. Don't reuse this image without asking.
* **`public/peepoHappyDank.webp`**: This is a community emote sourced from [7TV.app](https://7tv.app). Copyright belongs to its original creator. Its use in this project is for illustrative/cosmetic purposes and is not covered by the project's MIT License.
