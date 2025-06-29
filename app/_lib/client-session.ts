export interface SessionData {
  userId?: string;
  username?: string;
  isLoggedIn: boolean;
  friends?: string[];
  score?: number;
  streak?: number;
  languages?: { [key: string]: string };
}

export async function getClientSession(): Promise<SessionData> {
  const res = await fetch('/api/session');
  return res.json();
}
