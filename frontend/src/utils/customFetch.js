
export default async function customFetch({
  slug,
  method = 'GET',
  body = null,
}) {
  const API_URL = import.meta.env.VITE_API_URL

  const fetchOptions = {
    credentials: 'include',
    method
  }


  if (body) {
    fetchOptions.body = JSON.stringify(body)

    if (Object.hasOwn(fetchOptions, 'headers')) {
      fetchOptions.headers['Content-Type'] = 'application/json'
    } else {
      fetchOptions.headers = {
        'Content-Type': 'application/json'
      }
    }
  }

  const res = await fetch(API_URL + slug, fetchOptions)

  return res
}