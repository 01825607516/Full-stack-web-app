const API_BASE = "http://localhost:5000"; // or your deployed backend URL

export async function apiRegister(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function apiCreateMood(token: string, data: any) {
  const res = await fetch(`${API_BASE}/api/mood`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiGetUserMoods(token: string, userID: string) {
  const res = await fetch(`${API_BASE}/api/mood/user/${userID}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function apiGetStats(token: string, userID: string) {
  const res = await fetch(`${API_BASE}/api/mood/stats/${userID}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}
