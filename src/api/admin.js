import request from '@/utils/request'

//获取左侧菜单接口
export const getMenus = () => request({
  url: 'menus'
})

/**
 * 权限列表 值 list 或 tree , list 列表显示权限, tree 树状显示权限,参数是url参数:type
 */
export const getAuthority = (type) => request({
  url: `rights/${type}`
})
