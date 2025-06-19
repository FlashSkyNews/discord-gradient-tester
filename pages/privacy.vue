<template>
  <div class="prose">
    <h1>Privacy Policy</h1>
    <p><strong>Effective Date:</strong> June 19, 2025</p>

    <div class="tldr">
      <h3>The Short Version (tl;dr)</h3>
      <ul>
        <li>We <strong>do not</strong> store or save any of your personal data on our servers. Everything you create stays in your browser for the current session.</li>
        <li>For optional features like custom emotes or fonts, your browser directly contacts third-party services (like Discord and Bunny Fonts). They will see your IP address.</li>
        <li>Our website is hosted on Cloudflare Pages, which also processes your IP address to deliver the website to you.</li>
      </ul>
    </div>
    <h2>Introduction</h2>
    <p>
      This Privacy Policy describes the policies of Discord Role Gradient Tester ("the Service", "we", "us", "our") regarding the processing of information when you use our website.
    </p>

    <h2>Information We Process</h2>
    <p>
      Our application is designed with privacy as a priority. All processing of user-provided content happens exclusively on the client-side (in your web browser).
    </p>
    <ul>
      <li>
        <strong>User-Generated Content:</strong> This includes any text you enter for usernames and messages, colors you select, and font settings you choose. When you upload an image for an avatar or role icon, the file is read by your browser and handled as a local data URL.
      </li>
      <li>
        <strong>No Server-Side Storage:</strong> We do not have a database or server-side logging for user-generated content. The messages and settings you create exist only in your current browser session and are not saved by us.
      </li>
    </ul>

    <h2>Third-Party Services</h2>
    <p>
      Certain optional features in our application will cause your browser to connect directly with third-party services. We do not share your data with them, but these services may collect data (such as your IP address) according to their own privacy policies.
    </p>
    <ul>
      <li>
        <strong>Discord CDN:</strong> If your message contains a custom Discord emote (e.g., <code>&lt;:name:id&gt;</code>), your browser will fetch the emote image directly from Discord's Content Delivery Network (<code>cdn.discordapp.com</code>).
      </li>
      <li>
        <strong>Bunny Fonts:</strong> If you use the advanced feature to apply a custom font, your browser will fetch the font files from Bunny Fonts (<code>fonts.bunny.net</code>).
      </li>
      <li>
        <strong>User-Linked Images:</strong> If you paste a URL for an avatar or role icon, your browser will fetch that image directly from the provided URL.
      </li>
    </ul>

    <h2>Hosting and Service Providers</h2>
    <p>
      This website is hosted on Cloudflare Pages. As our hosting provider, Cloudflare may collect data from visitors to this site, such as IP addresses and other request metadata, as part of their service delivery and security monitoring. For more information, please refer to <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare's Privacy Policy</a>.
    </p>

    <h2>Changes to This Policy</h2>
    <p>
      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
    </p>

    <h2>Contact Us</h2>
    <p>
      If you have any questions about this Privacy Policy, you can find our contact information on our GitHub repository.
    </p>
  </div>
</template>

<style scoped>
.prose {
  color: #dcddde;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #313338;
  border-radius: 8px;
  line-height: 1.6;
}
.prose h1, .prose h2, .prose h3 {
  color: #ffffff;
  border-bottom: 1px solid #4f545c;
  padding-bottom: 0.3em;
}
.prose p, .prose li {
  color: #b9bbbe;
}
.prose a {
  color: #5865f2;
  text-decoration: none;
}
.prose a:hover {
  text-decoration: underline;
}
.prose code {
  background-color: #2b2d31;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
}
.tldr {
  background-color: #2b2d31;
  border: 1px solid #4f545c;
  border-radius: 8px;
  padding: 0.5rem 1.5rem 1rem;
  margin-bottom: 2rem;
}
.tldr h3 {
  border-bottom: none;
}
</style>