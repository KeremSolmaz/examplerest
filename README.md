# examplerest

npm install

Data extraction by connecting to another rest api

Way : /api/posts

Parameters
 tags parameter is required
 
 sortBy parameter is optional
  -id
  -reads
  -likes
  -popularity
  --default is "id"
  
 direction parameter is optional
  -asc
  -desc
  --default is "asc"
  
 Errors 
  Json key is error
 --required parameter error
 ---parameter is required
 --invalid Parameter error
 ---parameter is invalid
 
 
 Example Result
[
   {
      "author":"Jon Abbott",
      "authorId":4,
      "id":95,
      "likes":985,
      "popularity":0.42,
      "reads":55875,
      "tags":[
         "politics",
         "tech",
         "health",
         "history"
      ]
   }
]
 
