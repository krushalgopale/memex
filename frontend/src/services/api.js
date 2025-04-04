const api_Url = "http://localhost:8080"

export const register = async (registerCredentials) => {
  const response = await fetch(`${api_Url}/register`,{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify(registerCredentials)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Registration failed");
  return data;
};

export const login = async () => {
  const response = await fetch(`${api_Url}/login`);
  const data = await response.json();
  return data.results;
};

export const upload = async () => {
  const response = await fetch(`${api_Url}/upload`)
  const data = await response.json();
  return data.results;
};
