// Stores shared countdowns and returns a short id.
//   POST /api/share        body: JSON countdown  ->  { id }
//   GET  /api/share?id=XXX                       ->  JSON countdown
import { getStore } from "@netlify/blobs";

const MAX_BODY = 700_000;      // characters
const MAX_IMAGE = 600_000;     // characters of base64 data URL
const HEX = /^#[0-9a-fA-F]{6}$/;
const IMG = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;
const ID_RE = /^[A-Za-z0-9]{6,32}$/;
const ID_CHARS = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const json = (obj, status = 200, headers = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });

function newId() {
  const bytes = crypto.getRandomValues(new Uint8Array(9));
  return Array.from(bytes, (b) => ID_CHARS[b % ID_CHARS.length]).join("");
}

// keep only known fields, with limits
function clean(d) {
  if (!d || typeof d !== "object") return null;
  const when = new Date(d.t);
  if (typeof d.t !== "string" || isNaN(when.getTime())) return null;
  const out = {
    t: when.toISOString(),
    a: HEX.test(d.a) ? d.a : "#D62828",
    c: HEX.test(d.c) ? d.c : "#F2F2F2",
  };
  if (typeof d.n === "string" && d.n) out.n = d.n.slice(0, 40);
  if (typeof d.m === "string" && d.m) out.m = d.m.slice(0, 500);
  if (typeof d.i === "string" && d.i.length <= MAX_IMAGE && IMG.test(d.i)) out.i = d.i;
  return out;
}

export async function handle(req, store) {
  const url = new URL(req.url);

  if (req.method === "GET") {
    const id = url.searchParams.get("id") || "";
    if (!ID_RE.test(id)) return json({ error: "bad id" }, 400);
    const data = await store.get(id, { type: "json" });
    if (!data) return json({ error: "not found" }, 404);
    return json(data, 200, { "cache-control": "public, max-age=300" });
  }

  if (req.method === "POST") {
    const text = await req.text();
    if (text.length > MAX_BODY) return json({ error: "too large" }, 413);
    let parsed;
    try { parsed = JSON.parse(text); } catch { return json({ error: "bad json" }, 400); }
    const data = clean(parsed);
    if (!data) return json({ error: "invalid countdown" }, 400);
    const id = newId();
    await store.setJSON(id, data);
    return json({ id });
  }

  return json({ error: "method not allowed" }, 405, { allow: "GET, POST" });
}

export default async (req) => handle(req, getStore("shares"));

export const config = { path: "/api/share" };
