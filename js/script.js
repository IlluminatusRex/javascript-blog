{
'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
*/

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    
    console.log('Link was clicked!');
  
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    
    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active'); //odn.instrukcji - zamiana .titles a.active na active nie usuwa artykułu; należy dodać .posts .active

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  
    /* [DONE] get 'href' attribute from the clicked link */

    const articSelector = clickedElement.getAttribute('href');
    console.log('link: ', articSelector);
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  
    const targetArticle = document.querySelector(articSelector);
    console.log('article: ', targetArticle);
    
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
}   
  



    
function generateTitleLinks(){
    console.log('Generate Title Links runed');
    const   optArticleSelector = '.post',
            optTitleSelector = '.post-title',
            optTitleListSelector = '.titles';
            titleList = document.querySelector(optTitleListSelector);

    /* remove contents of titleList */
    function clearMessages(){
        console.log('Clear messages runed');
        titleList.innerHTML = '';
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for (const article of articles) {
        
        /* get the article id */
            const articleID = article.getAttribute('id');
        /* find the title element and get the title from the title element*/
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(articleTitle);
        /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);
        /* insert link into titleList */
            html = html + linkHTML;
            //titleList.innerHTML = titleList.innerHTML + linkHTML;
    }
    titleList.insertAdjacentHTML("beforeend", html);
    console.log(html);
    const links = document.querySelectorAll('.titles a');
    console.log('Links: ' + links);
    
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

}
