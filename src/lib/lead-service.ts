// ⚠️  Replace with your real Formspree endpoint ID before launch.
// Get it at https://formspree.io → your form → Integration → Endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqvzedg";

export interface LeadPayload {
  name: string;
  business: string;
  email: string;
  tier?: string;
  message: string;
  locale?: string;
}

// Submissions are forwarded by Formspree to 011107.com@gmail.com.
// View all submissions at: https://formspree.io → Dashboard → your form.
export async function submitLead(payload: LeadPayload): Promise<{ ok: true }> {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? `Formspree error ${res.status}`);
  }

  return { ok: true };
}
