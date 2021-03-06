{
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
  authorsLink: Handlebars.compile(document.querySelector('#template-authorsLink').innerHTML)

}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector= '.post-tags .list',
  optArticleAuthorSelector= '.post .post-author',
  optTagsListSelector ='.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector ='.authors.list';

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags){
  const params =  {'min': 9999, 'max': 0};
  for (let tag in tags){
    console.log (tag + ' is used ' + tags[tag] + ' times')
    if (tags[tag] > params.max){
      params.max = tags[tag];
    }
    if (tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateTagClass(count, params){
  const normalizedCount = count - params.min,
    normalizedMax = params.max - params.min,
    percantage = normalizedCount / normalizedMax,
    classNumber = Math.floor(percantage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;

}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);;
      /* add ggenerated code to  html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }else{
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for each article */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};
  /* [NEW] START LOOP for each tag in allTags: */
  for (let tag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li class="' + calculateTagClass(allTags[tag], tagsParams) + '"><a href="#tag-' + tag + '">' + tag + ',  </a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    }
  /* [NEW] add html for allTagsHTML to tagList */
tagList.innerHTML = templates.tagCloudLink(allTagsData);
console.log('allTagsData:', allTagsData)
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
  /* [NEW] create new object for all authore */
  let allAuthors = {};
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
    const linkHTMLData = {articleAuthor: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
        /* add ggenerated code to  html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the authors wrapper */
    authorsWrapper.innerHTML = html;
    /* [NEW] check if this link is NOT already in allTags */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    }else{
      allAuthors[articleAuthor]++;
    }
  /* END LOOP: for each article */
  }
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);


  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = {authors: []};
  /* [NEW] START LOOP for each author in allAuthors: */
  for (let author in allAuthors){
    /*[NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    })

    //const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') </a></li>';

    }
  /* [NEW] add html for allAuthorsHTML to authorList */
  authorsList.innerHTML = templates.authorsLink(allAuthorsData);
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
  /* find author from the href */

  const author = href.replace('#author-', '');

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="'+ author +'"]');
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
