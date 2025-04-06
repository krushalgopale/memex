const API_BASE_URL = 'https://memex-nf9k.onrender.com';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  return data;
};

export const registerUser = async ({ username, password }) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
};

export const loginUser = async ({ username, password }) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  return handleResponse(response);
};

export const uploadMeme = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return handleResponse(response);
};

export const getMemes = async (page = 1) => {
  const response = await fetch(`${API_BASE_URL}/memes?page=${page}`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await handleResponse(response);
  return data.map((meme, index) => ({
    id: meme.id || `${page}-${index}`, 
    url: meme.url,
    username: meme.username,
    likes: meme.likes || 0,
  }));
};

export const likeMeme = async (memeId) => {
  const response = await fetch(`${API_BASE_URL}/memes/${memeId}/like`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
};
