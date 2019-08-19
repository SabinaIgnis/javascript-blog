{
'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector= '.post-tags .list',
  optArticleAuthorSelector= '.post .post-author';

const titleClickHandler = function(event){

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;

  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE]get 'href' attribute from the clicked link */
  const articleSelector=clickedElement.getAttribute("href");
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}
function generateTitleLinks(customSelector = ''){
  /* [DONE]remove contents of titleList */
  const titleList=document.querySelector(optTitleListSelector);

  titleList.innerHTML='';
  /* [DONE]for each article */
  const articles=document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  for(let article of articles){
    /*][DONE] get the article id */
    const articleId=article.getAttribute("id");
    /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles=document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article */
  for (let article of articles){
    /* find tags wrapper */
    const tagsWrapper=article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html='';
    /* get tags from data-tags attribute */
    const articleTags=article.getAttribute("data-tags");
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
      for (let tag of articleTagsArray){
      /* genrate HTML of each link  I CAN NOT ADD SPACE BETWEEN TAGS*/
      const linkHTML= '<li><a href="#tag-' + tag + '"><span> ' + tag + '</span></a></li>';
      /* add ggenerated code to  html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for each article */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named clickedElement and give it value of "this"*/
  const clickedElement = this;
  /* make new constant "href" and read the attribute "href" of the clicked element */
  const href=clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]')
  /* START LOOP: for each active  tag link */
  for (let activeTagLink of activeTagLinks){
    /* remove class acive */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="'+ href +']')
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="'+ tag +'"]');
}

function addClickListenersToTags(){
  /* find all link to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]')
  /* START LOOP: for each link */
  for (tagLink of tagLinks){
    /* add tagCLickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles=document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article */
  for (let article of articles){
    /* find authors wrapper */
    const authorsWrapper=article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html='';
    /* get authors from data-authors attribute */
    const articleAuthor=article.getAttribute("data-author");
    /* genrate HTML of each link */
    const linkHTML= '<li><a href="#author-'+ articleAuthor + '"><span class="author-name"> by ' + articleAuthor + '</span></a></li>';
    /* add ggenerated code to  html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the authors wrapper */
    authorsWrapper.innerHTML = html;
  /* END LOOP: for each article */
  }
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named clickedElement and give it value of "this"*/
  const clickedElement = this;
  /* make new constant "href" and read the attribute "href" of the clicked element */
  const href=clickedElement.getAttribute("href");
  /* find all links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]')
  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks){
    /* remove class acive */
    activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="'+ href +'"]')
  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="'+ tag +'"]');
}

function addClickListenersToAuthors(){
  /* find all link to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]')
  /* START LOOP: for each link */
  for (authorLink of authorLinks){
    /* add authorCLickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();


}
