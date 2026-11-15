/** The public address, without a trailing slash. Set SITE_URL once there's a domain. */
export function siteUrl(): string {
  return (process.env.SITE_URL || process.env.URL || "http://localhost:3000").replace(/\/$/, "");
}
