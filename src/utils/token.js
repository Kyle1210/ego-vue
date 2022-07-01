import jsCookie from 'js-cookie'

const Token = 'token'

// 设置token
export const setToken = (token) => jsCookie.set(Token, token)

// 获取token
export const getToken = () => jsCookie.get(Token)

// 删除token
export const removeToken = () => jsCookie.remove(Token)
