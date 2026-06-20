/**
 * Case Studies: projects built end to end with Claude.
 *
 * To add a screenshot: drop a 16:9 image into /public/case-studies/ and set
 * `image: "/case-studies/your-file.jpg"` on the entry. Until then, leave `image`
 * unset and the card shows a clean "Screenshot pending" placeholder.
 * Order in this array = order on the page.
 */

export type CaseStudy = {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  claudeUsage: string;
  result: string;
  tags: string[];
  url?: string;
  isPrivate?: boolean;
  image?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "sabala-mentoring",
    title: "Sabala Mentoring: AI Studio & Academy",
    industry: "AI Studio · own brand",
    challenge:
      "Position a one person AI studio that does three different things (websites, co-development, an AI academy) on a single homepage, without the visitor losing the thread.",
    claudeUsage:
      "Built the entire site with Claude Code: React Three Fiber solar system hero, sales page for the AI academy, lead pipeline into Turso libSQL, scroll choreography with Lenis. Architecture, copy and code reviewed in the same loop.",
    result:
      "Live on sabala-mentoring.com. Launched the KI Akademie sales page with two sold out cohorts and an active leads pipeline through the contact form into a self hosted dashboard.",
    tags: ["Claude Code", "Next.js 16", "React Three Fiber", "Turso"],
    url: "https://sabala-mentoring.com",
    image: "/case-studies/sabala-mentoring.jpg",
  },
  {
    id: "dielommel",
    title: "Stefanie Lommel: Coaching for Family Businesses",
    industry: "Coaching · B2B",
    challenge:
      "Sharpen a broad consulting practice into one clear positioning: change guidance for family run companies before change turns into a crisis. The previous site read like a generic coach, not a specialist.",
    claudeUsage:
      "Worked with Claude on positioning, voice, page structure and Schema.org markup in parallel. Same Claude session went from interview transcript to live page in one continuous flow, with copy iterations grounded in the client's own language.",
    result:
      "Live on dielommel.de with structured Person, Organization and Service schema, clear two step offer (15 min call, 90 min session), indexable from day one. Owner now gets inbound from her actual ideal client profile.",
    tags: ["Claude", "Next.js", "Schema.org", "Editorial design"],
    url: "https://dielommel.de",
    image: "/case-studies/dielommel.jpg",
  },
  {
    id: "connecting-herzkreative",
    title: "Connecting Herzkreative: Curated Maker Network",
    industry: "Community Platform · Curated Network",
    challenge:
      "Launch a curated network where independent makers find each other, not just a landing page. It needed an application flow, member profiles and a way to actually discover one another, built and run by a single founder without renting an off the shelf community SaaS.",
    claudeUsage:
      "Built with Claude Code on Next.js 16: a vetting and application flow, member profiles, an interactive member map with Leaflet, plus events, blog and podcast sections. Claude handled the architecture, the component system and privacy first form handling with Altcha instead of a third party captcha.",
    result:
      "Live on connecting-herzkreative.com. Applicants go through a real vetting flow, approved members get a profile and can find each other on the map, and the podcast and newsletter feed straight into the application funnel.",
    tags: ["Claude Code", "Next.js 16", "Leaflet", "Framer Motion"],
    url: "https://connecting-herzkreative.com",
    image: "/case-studies/connecting-herzkreative.jpg",
  },
  {
    id: "operations-dashboard",
    title: "AI Operations Dashboard",
    industry: "Internal tool · Agentic system",
    challenge:
      "Run a one person studio at agency scale: track leads, content plans, financial KPIs and ongoing agent jobs in one place, without subscribing to ten SaaS tools.",
    claudeUsage:
      "Built with Claude Code over multiple weeks. Next.js 16 dashboard, MOONI voice assistant (Whisper + FastAPI), Pinterest content plan, MCP integrations with Notion, Pinecone and a self hosted LLM stack. Claude both wrote the code and acted as the agent runtime.",
    result:
      "Replaces a stack of separate tools. Leads from the public site flow straight in, voice queries hit a custom Whisper service, content plans and agent jobs live in the same canvas. Currently in daily production use.",
    tags: ["Claude Code", "MCP", "Whisper", "Next.js 16", "FastAPI"],
    isPrivate: true,
    image: "/case-studies/operations-dashboard.jpg",
  },
];
