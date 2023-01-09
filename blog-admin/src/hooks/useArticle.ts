/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-05 02:47:02
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-07 00:07:51
 * @FilePath: \项目\yl-blog\src\hooks\useArticle.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function () {
  const router = useRouter();
  function toArticleDetails(id: number) {
    console.log(id);
    router.push({
      path: "/articleshow/" + id,
    });
  }

  function toPages(path: string, query: object) {
    router.push({
      path: path,
      query: query,
    });
  }

  return {
    toArticleDetails,
    toPages,
  };
}
