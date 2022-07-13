/* eslint-disable camelcase */
import request from '@/utils/request'

/**
 * type	[1,2,3]	值：1，2，3 分别表示显示一层二层三层分类列表
【可选参数】如果不传递，则默认获取所有级别的分类
pagenum	当前页码值	【可选参数】如果不传递，则默认获取所有分类
pagesize	每页显示多少条数据	【可选参数】如果不传递，则默认获取所有分类
 */
export const getCategories = ({ type, pagenum, pagesize }) => request({
  url: 'categories',
  params: { type, pagenum, pagesize }
})

/**
 * cat_pid	分类父 ID	不能为空，如果要添加 1 级分类，则父分类 Id 应该设置为 0
cat_name	分类名称	不能为空
cat_level	分类层级	不能为空，0表示一级分类；1表示二级分类；2表示三级分类
 */
// eslint-disable-next-line camelcase
export const addCategories = ({ cat_pid, cat_name, cat_level }) => request({
  method: 'POST',
  url: 'categories',
  data: { cat_pid, cat_name, cat_level }
})

/**
 * 分类参数管理
 * :id	分类 ID	不能为空携带在url中
sel	[only,many]	不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
 */
export const getSortParmas = (id, sel) => request({
  url: `categories/${id}/attributes`,
  params: { sel }
})

/**
 * :id	分类 ID	不能为空携带在url中
attr_name	参数名称	不能为空
attr_sel	[only,many]	不能为空
attr_vals	如果是 many 就需要填写值的选项，以逗号分隔	【可选参数】
 */
// eslint-disable-next-line camelcase
export const addAttrs = (id, { attr_name, attr_sel, attr_vals }) => request({
  url: `categories/${id}/attributes`,
  method: 'POST',
  data: { attr_name, attr_sel, attr_vals }
})

/**
 * 删除分类
 * :id	分类 ID	不能为空携带在url中
:attrid	参数 ID	不能为空携带在url中
 */
export const delSortParmas = (id, attrid) => request({
  url: `categories/${id}/attributes/${attrid}`,
  method: 'DELETE'
})

//编辑提交参数
export const editParams = (id, attrid, { attr_name, attr_sel, attr_vals }) => request({
  url: `categories/${id}/attributes/${attrid}`,
  method: 'PUT',
  data: { attr_name, attr_sel, attr_vals }
})

/**
 *
 * @param {文件内容} file
 * @returns
 */
export const upload = (file) => request({
  url: 'upload',
  method: 'POST',
  data: { file }
})
