import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { authorization:token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async(blogThatIsLeaving, serverUrl) => {
  const config = {
    headers: { authorization:token }
  }
  await axios.put(serverUrl, blogThatIsLeaving, config)
  const blogsAfterUpdate = await getAll()
  return blogsAfterUpdate
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const deleteBlog = async(id) => {
  const serverUrl = `/api/blogs/${id}`
  const config = {
    headers: { authorization:token }
  }
  await axios.delete(serverUrl, config)
  const newBlogs = await getAll()
  return newBlogs
}

const getUsers = async() => {
  const response = await axios.get('/api/users')
  return response.data
}


export default { getAll, create, setToken, update, deleteBlog, token, getUsers}