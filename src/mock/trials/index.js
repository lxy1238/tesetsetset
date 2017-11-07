import Mock from 'mockjs'
const LoginUsers = [{
  id: 1,
  username: '15361031234',
  password: '123456',
  avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
  name: '沐子'
}]

const couponsDetails = []

for (let i = 0; i < 60; i++) {
  couponsDetails.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    'platName|1': [
      '美国亚马逊',
      '英国亚马逊'
    ],
    'price|200-500': 1,
    'shopNum|1': [
      'A15',
      'A16'
    ],
    'state|1-1': {
      '1': '待审核',
      '2': '已审核',
      '3': '不通过',
      '4': '进行中',
      '5': '已结束',
      '6': '已过期'
    },
    'num|5-60': 1,
    'sin|12345-45678': 1
  }))
}

export { LoginUsers, couponsDetails }
