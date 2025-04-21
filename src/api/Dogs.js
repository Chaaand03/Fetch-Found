// const BASE_URL = 'https://frontend-take-home-service.fetch.com';

import { ENDPOINTS, API_BASE_URL } from "./APIConstants";

async function checkStatus(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status} – ${errorText}`);
  }
  return response;
}

//Login
export async function login(name, email) {
  const res = await fetch(ENDPOINTS.LOGIN, {
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
  const res = await fetch(ENDPOINTS.LOGOUT, {
    method: 'POST',
    credentials: 'include'
  });
  await checkStatus(res);
  return res;
}

//Dog-breeds
export async function getBreeds() {
  const res = await fetch(ENDPOINTS.GET_DOG_BREEDS, {
    credentials: 'include',
  });
  await checkStatus(res);
  return res.json(); 
}

export async function getZipCodes() {
  const res = await fetch(ENDPOINTS.GET_LOCATIONS, {
    credentials: 'include',
    method: 'POST',
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
    url = `${API_BASE_URL}${from}`;
  } else {
    const params = new URLSearchParams();
    if (breeds?.length)   breeds.forEach(b => params.append('breeds', b));
    if (zipCodes?.length) zipCodes.forEach(z => params.append('zipCodes', z));
    if (ageMin != null)   params.append('ageMin', ageMin);
    if (ageMax != null)   params.append('ageMax', ageMax);
    if (size != null)     params.append('size', size);
    if (from)             params.append('from', from);
    if (sort)             params.append('sort', sort);

    url = `${API_BASE_URL}/dogs/search?${params.toString()}`;
  }

  const res = await fetch(url, { credentials: 'include' });
  await checkStatus(res);
  return res.json();
}

//GET dogs by ID
export async function getDogsByIds(dogIds = []) {
  const ids = Array.isArray(dogIds) ? dogIds.slice(0, 100) : [];

  const res = await fetch(ENDPOINTS.GET_DOGS, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ids),
  });
  await checkStatus(res);
  return res.json();
}

export async function matchDogs(dogIds = []) {
  const res = await fetch(ENDPOINTS.MATCH_DOGS, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dogIds),
  });
  await checkStatus(res);
  return res.json();  // { match: string }
}
