import request from '@/utils/request'

//获取角色列表
export const getRoles = () => request({
  url: 'roles'
})

/**
 * 删除角色指定权限
 * roles/:roleId/rights/:rightId
 */
export const delRoles = (roleId, rightsId) => request({
  url: `roles/${roleId}/rights/${rightsId}`,
  method: 'DELETE'
})

/**
 * 角色授权
 * :roleId	角色 ID	不能为空携带在url中
rids	权限 ID 列表（字符串）	以 , 分割的权限 ID 列表（获取所有被选中、叶子节点的 key 和半选中节点的 key, 包括 1，2，3 级节点）
 */
export const assignRights = (roleId, ridsStr) => request({
  url: `roles/${roleId}/rights`,
  method: 'POST',
  data: { rids: ridsStr }
})
