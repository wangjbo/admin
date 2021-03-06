// let ipUrl = 'http://127.0.0.1:7001/admin/'
let ipUrl = 'http://localhost:7001/admin/'

let servcePath = {
   checkLogin:ipUrl+'checkLogin/', // 获取登录的返回结果
   getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
   addArticle:ipUrl + 'addArticle' , // 添加文章
   updateArticle:ipUrl+ 'updateArticle', // 修改文章
   getArticleList:ipUrl + 'getArticleList' ,  //  文章列表 
   delArticle:ipUrl + 'delArticle/' ,  //  删除文章
   getArticleById:ipUrl + 'getArticleById/' ,  //  通过查询id获取相应的文章
}

export default servcePath;