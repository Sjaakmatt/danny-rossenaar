import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Pages are prerendered at build time and never revalidate (only /contact
// renders per request), so prerendered output is served from static assets.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
