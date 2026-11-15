import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { sanityConfigured } from "@/sanity/env";
import "./studio.css";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function EditPage() {
  if (!sanityConfigured) {
    return (
      <main className="studio-missing">
        <h1>No Sanity project connected</h1>
        <p>
          The site is showing its sample content. To edit it here, add a Sanity project ID to{" "}
          <code>.env.local</code> as <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and restart. The README has the steps.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
