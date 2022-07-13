import request from '@/utils/request'

/**
 *
 * @returns query	查询参数
pagenum	当前页码
pagesize	每页显示条数
 */
export const getOrderList = ({ query, pagenum, pagesize }) => request({
  url: 'orders',
  params: { query, pagenum, pagesize }
})
