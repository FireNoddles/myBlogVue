import request from './request'

export const PostLoginApi = (params) => request.post('admin/login', params)


export const GetUserListApi = (params) => request.get('/my-blog/admin/user/getUsersList', {params})
export const PostAddUserApi = (params) => request.post('/my-blog/admin/user/add', params)
export const PostUpdateUserApi = (params) => request.post('/my-blog/admin/user/update', params)
export const PostDelUserApi = (params) => request.post('/my-blog/admin/user/delete', params)

export const GetCategoryListApi = (params) => request.get('/my-blog/admin/category/getCategory', {params})
export const PostAddCategoryApi = (params) => request.post('/my-blog/admin/category/addCategory', params)
export const PostUpdateCategoryApi = (params) => request.post('/my-blog/admin/category/updateCategory', params)
export const PostDelCategoryApi = (params) => request.post('/my-blog/admin/category/delCategory', params)

export const GetArticleListApi = (params) => request.get('/my-blog/admin/article/getArticleList', {params})
export const GetArticleInfoApi = (params) => request.get('/my-blog/admin/article/getArticleInfo', {params})
export const PostAddArticleApi = (params) => request.post('/my-blog/admin/article/addArticle', params)
export const PostUpdateArticleApi = (params) => request.post('/my-blog/admin/article/updateArticle', params)

export const PostPicApi = (params) => request.post('/my-blog/admin/file/upload', params)
