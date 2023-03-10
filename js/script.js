{'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#tagCloudLink').innerHTML),
  AuthorCloudLink: Handlebars.compile(document.querySelector('#AuthorCloudLink').innerHTML),
  TagLinkLoop: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  AuthorLinkLoop: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}
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
    optArticleTagsSelector = '.post-tags .list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.post-author';
    const allTagsData = {tags: []};
    const allAuthorsData = {tags: []};

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
      const linkHTMLData = {id: articleID, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagCloudLink(linkHTMLData);
        html = html + linkHTML;
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
    console.log('THIS: ' + this);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
    /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  // eslint-disable-next-line no-inner-declarations
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags a, .list.tags a');
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      console.log('TAGTEST: ' +tagLink)
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();
  
  function generateAuthor(){
     /* find all articles */
     const articles = document.querySelectorAll(optArticleSelector);
     /* START LOOP: for every article: */
     for (let article of articles) {
      // add authorname as post-author and add articleAuthor as seted in HTML
      const authorName = article.querySelector('.post-author');
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);
      // add linkHTML as link in HTML
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.AuthorCloudLink(linkHTMLData);
      //const linkHTML = '<a href="#author-' + articleAuthor +'">'+ articleAuthor +'</a>';
      console.log(linkHTML);
      // add link to HTML content
      authorName.insertAdjacentHTML('beforeend', linkHTML);
     }
  }

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    console.log('HREF: ' + href);
    const tag = href.replace('#author-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#author-"]');
    for(let activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
    /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    console.log('TagLinks: ' + tagLink);
    }
    generateTitleLinks('[data-author="' + tag + '"]');
  }


  function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('.post-author a, .list.authors a');
    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    console.log('Author listner added');
    /* END LOOP: for each link */
    }
  }

  generateAuthor();
  

  const params = {max:0, min:999999};
  function calculateTagsParams (tags) {
    
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
    }
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass (count, params){
    const classNumber = Math.floor( ( (count - params.min) / (params.max - 2) ) * optCloudClassCount + 1 );
    //console.log(optCloudClassPrefix +''+ classNumber);
    return optCloudClassPrefix + classNumber;
  }

  const optTagsListSelector = '.tags.list';
  function generateTagsList(){

    
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
  
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
  
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
  
        /* generate HTML of the link */
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagCloudLink(linkHTMLData);
        console.log('Tag: ' + tag);
  
        /* add generated code to html variable */
        html = html + linkHTML;
      
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else{
          allTags[tag]++;
        }
  
      /* END LOOP: for each tag */
      }
  
      /* insert HTML of all the links into the tags wrapper */
      //titleList.insertAdjacentHTML('beforeend', html);
  
    /* END LOOP: for every article: */
      }
  
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
  
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      console.log(calculateTagClass(allTags[tag],tagsParams));
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      
      //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag],tagsParams) + '"><span>' + tag +  ' (' + allTags[tag] + ') ' + '</span></a></li>';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.TagLinkLoop(allTagsData);;
    console.log('AJAXTEST: ' + allTagsData);
  }

  generateTagsList();
  addClickListenersToTags();

  //tags names are assigned to authors names!

  const authorparams = {max:0, min:999999};
  function calculateAuthorParams (tags) {
    
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > authorparams.max){
        authorparams.max = tags[tag];
      }
    }
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] < authorparams.min){
        authorparams.min = tags[tag];
      }
    }
    console.log('AuthorParams: ' + authorparams);
    return authorparams;
  }

  function calculateAuthorClass (count, params){
    const classNumber = Math.floor( ( (count - authorparams.min) / (authorparams.max - 2) ) * optCloudClassCount + 1 );
    //console.log(optCloudClassPrefix +''+ classNumber);
    return optCloudClassPrefix + classNumber;
  }


  function generateAuthorsList(){
    
      /* [NEW] create a new variable allTags with an empty array */
      let allTags = {};
    
      /* find all articles */
      const articles = document.querySelectorAll(optArticleSelector);
    
      /* START LOOP: for every article: */
      for (const article of articles) {
    
        /* find tags wrapper */
        const titleList = article.querySelector(optAuthorsListSelector);
    
        /* make html variable with empty string */
        let html = '';
    
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-author');
    
        /* split tags into array */
        const articleTagsArray = articleTags.split('   ');
    
        /* START LOOP: for each tag */
        for(let tag of articleTagsArray){
    
          /* generate HTML of the link */
          const linkHTMLData = {id: tag, title: tag};
          const linkHTML = templates.tagCloudLink(linkHTMLData);
    
          /* add generated code to html variable */
          html = html + linkHTML;
        
          /* [NEW] check if this link is NOT already in allTags */
          if(!allTags[tag]) {
            /* [NEW] add tag to allTags object */
            allTags[tag] = 1;
          } else{
            allTags[tag]++;
          }
    
        /* END LOOP: for each tag */
        }
    
        /* insert HTML of all the links into the tags wrapper */
        //titleList.insertAdjacentHTML('beforeend', html);
    
      /* END LOOP: for every article: */
        }
    
      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector('.list.authors');
    
      /* [NEW] create variable for all links HTML code */
      const tagsParams = calculateAuthorParams(allTags);
      console.log('AuthorParams:', tagsParams);
  
      allTagsHTML = '';
  
      /* [NEW] START LOOP: for each tag in allTags: */
      for(let tag in allTags){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        console.log(calculateAuthorParams(allTags[tag],tagsParams));
        allAuthorsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateAuthorClass(allTags[tag], tagsParams)
        });
        //allTagsHTML += '<li><a href="#author-' + tag + '" class="' + calculateAuthorClass(allTags[tag],tagsParams) + '"><span>' + tag +  ' (' + allTags[tag] + ') ' + '</span></a></li>';
      }
      /* [NEW] END LOOP: for each tag in allTags: */
  
      /*[NEW] add HTML from allTagsHTML to tagList */
      //tagList.innerHTML = allTagsHTML;
      tagList.innerHTML = templates.AuthorLinkLoop(allAuthorsData);
    }

  generateAuthorsList();
  addClickListenersToAuthors();






}

