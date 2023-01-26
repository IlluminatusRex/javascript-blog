{'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
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
  };   

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){
    console.log('Generate Title Links runed');
    
    // eslint-disable-next-line no-undef
    titleList = document.querySelector(optTitleListSelector);

    /* remove contents of titleList */
    function clearMessages(){
      console.log('Clear messages runed');
      // eslint-disable-next-line no-undef
      titleList.innerHTML = '';
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
    // eslint-disable-next-line no-undef
    titleList.insertAdjacentHTML('beforeend', html);
    console.log(html);
    const links = document.querySelectorAll('.titles a');
    console.log('Links: ' + links);
    
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();


  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (const article of articles) {
      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('Tags array: ' + articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        console.log('Tag: ' + tag);
        /* add generated code to html variable */
        const linkHTML = '<li><a href="#tag-' + tag +'" style="text-decoration: inherit">'+ tag +'	&#xA0</a></li>';
        html = html + linkHTML;
        console.log(linkHTML);
      }
      
      titleList.insertAdjacentHTML('beforeend', html);
      /* END LOOP: for each tag */
    
      /* insert HTML of all the links into the tags wrapper */
      
    /* END LOOP: for every article: */
    }
  }

  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('a.active[href^="#tag-"]');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTag = tag.querySelectorAll('a.active');
    /* START LOOP: for each active tag link */
    for(let tag of activeTag){
      /* remove class active */
      tag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    /* START LOOP: for each found tag link */
  
    /* add class active */
  
    /* END LOOP: for each found tag link */
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll(optArticleTagsSelector);
    /* START LOOP: for each link */
    for(let link of links){
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();
  //tagClickHandler();
  

}
