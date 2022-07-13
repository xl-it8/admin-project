import request from '@/utils/request'

/**
 * query	查询参数	可以为空
pagenum	当前页码	不能为空
pagesize	每页显示条数	不能为空
 */
export const getGoodsData = ({ query, pagenum, pagesize }) => request({
  url: 'goods',
  params: { query, pagenum, pagesize }
})
