const BASE_URL = 'https://frontend-take-home-service.fetch.com';

async function checkStatus(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status} – ${errorText}`);
  }
  return response;
}

//Login
export async function login(name, email) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });
  await checkStatus(res);
  return res;
}

//Logout
export async function logout() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  await checkStatus(res);
  return res;
}

//Dog-breeds
export async function getBreeds() {
  const res = await fetch(`${BASE_URL}/dogs/breeds`, {
    credentials: 'include',
  });
  await checkStatus(res);
  return res.json(); 
}

//Searching Dogs
export async function searchDogs({
  breeds,
  zipCodes,
  ageMin,
  ageMax,
  size,
  from,
  sort,
} = {}) {
  let url;

  // If the server gave us back a full “next” or “prev” path, use that directly:
  if (typeof from === 'string' && from.startsWith('/dogs/search')) {
    url = `${BASE_URL}${from}`;
  } else {
    const params = new URLSearchParams();
    if (breeds?.length)   breeds.forEach(b => params.append('breeds', b));
    if (zipCodes?.length) zipCodes.forEach(z => params.append('zipCodes', z));
    if (ageMin != null)   params.append('ageMin', ageMin);
    if (ageMax != null)   params.append('ageMax', ageMax);
    if (size != null)     params.append('size', size);
    if (from)             params.append('from', from);
    if (sort)             params.append('sort', sort);

    url = `${BASE_URL}/dogs/search?${params.toString()}`;
  }

  const res = await fetch(url, { credentials: 'include' });
  await checkStatus(res);
  return res.json();
}

//GET dogs by ID
export async function getDogsByIds(dogIds = []) {
  const ids = Array.isArray(dogIds) ? dogIds.slice(0, 100) : [];

  const res = await fetch(`${BASE_URL}/dogs`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ids),
  });
  await checkStatus(res);
  return res.json();
}

