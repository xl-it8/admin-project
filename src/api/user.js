import request from '@/utils/request'

//post,put,patch => data get,delete=> params
//登录接口
export const login = ({ username, password }) => request({
  method: 'POST',
  url: 'login',
  data: { username, password }
})

// //注册接口
// export const users = ({ username, password }) => request({
//   url: 'user',
//   params: { username, password }
// })

/**
 *
 * @returns query	查询参数
pagenum	当前页码
pagesize	每页显示条数
 */
export const getUserList = ({ query, pagenum, pagesize }) => request({
  url: 'users',
  params: { query, pagenum, pagesize }

})

/**
 *
 * @param uId	用户 ID	不能为空携带在url中
           type	用户状态	不能为空携带在url中，值为 true 或者 false
 * @returns
 */
export const putUserStatus = (uId, type) => request({
  url: `users/${uId}/state/${type}`,
  method: 'PUT'
})

/**
 *username	用户名称	不能为空
password	用户密码	不能为空
email	邮箱	可以为空
mobile	手机号	可以为空
 */
export const addUser = ({ username, password, email, mobile }) => request({
  url: 'users',
  method: 'POST',
  data: { username, password, email, mobile }
})

/**
 * users/:id 根据id查询用户数据
 */
export const getUserById = (id) => request({
  url: `users/${id}`
})

/**
 * 编辑用户
 * id	用户 id	不能为空 参数是url参数:id
    email	邮箱	可以为空
    mobile	手机号	可以为空
 */
export const editUserInfo = ({ id, email, mobile }) => request({
  url: `users/${id}`,
  method: 'PUT',
  data: { email, mobile }
})

/**
 * users/:id 删除用户
 */
export const delUser = (id) => request({
  url: `users/${id}`,
  method: 'DELETE'
})
