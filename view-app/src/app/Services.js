export const GetHotels = async ()=> {
  const response = await fetch('/api/hotels')
  return await response.json()
}

export const GetPackages = async ()=> {
  const response = await fetch('/api/packages')
  return await response.json()
}

export const GetPackage = async (id)=> {
  const response = await fetch('/api/packages/'+id)
  return await response.json()
}

export const UpdatePackage = async (data)=> {
  const id = data._id;
  delete data._id
  const response = await fetch('/api/packages/'+id, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return await response.json()
}

export const CreatePackage = async (data)=> {
  
  const response = await fetch('/api/packages', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return await response.json()
}

export const DeletePackage = async (id)=> {
  const response = await fetch('/api/packages/'+id, { method: 'DELETE' })
  return await response.json()
}
