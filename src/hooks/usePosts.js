import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
   const sortedPosts = useMemo(() => {
      console.log('отработала функция sortedPosts')
      if(sort) {
         return  [...posts].sort((a,b) => a[sort].localeCompare(b[sort]))
      } else {
        return posts;
      }
   },[sort, posts]);
    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
   //* получим масив отсортированных постов:
   const sortedPosts = useSortedPosts(posts, sort)
   const sortAndSearchPosts = useMemo(() => {
      return sortedPosts?.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
   }, [query, sortedPosts])
   return sortAndSearchPosts;
}



