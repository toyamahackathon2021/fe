const host = 'http://localhost:3000'
export const fetcher = (url :string)=> fetch(`${host}${url}`).then(r => r.json())