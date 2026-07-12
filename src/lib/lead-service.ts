export interface LeadPayload {
  name: string;
  business: string;
  email: string;
  tier?: string;
  message: string;
  locale?: string;
}

// TODO: wire to real endpoint (server function / email API / CRM webhook).
// Destination email: 011107miko@gmail.com
export async function submitLead(payload: LeadPayload): Promise<{ ok: true }> {
  // eslint-disable-next-line no-console
  console.log("[Tapiko] submitLead ->", payload);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}