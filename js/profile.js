

github_data={
    token:"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"
}
username=localStorage.getItem("username")

if(username==null){
    document.getElementById("content").style.display="none";
    // document.getElementById("error").style.display="block";

}else{





const baseUrl="https://api.github.com/graphql";
const headers = {
    "Content-Type":"application/json",
    Authorization:"bearer "+github_data.token
}
const body={
    "query":
    `
    {
        user(login: "${username}") {
          repositories(first: 20) {
            nodes {
              name
              owner {
                avatarUrl
                login
              }
              updatedAt
              stargazerCount
              forkCount
              languages(first: 1) {
                nodes {
                  name
                  color
                }
              }
              description
            }
          }
          bio
          name
        }
      }
      
    `
}

var result;
var user;
async function fetching(){
    await fetch(baseUrl,{
        method:"post",
        headers:headers,
        body:JSON.stringify(body)
    }).then(async response=>{
       result = await response.json()
       user=result['data']['user']
       populate(user);
    }).catch(err=>{
        console.log(err)
    })
}

fetching()
formatDate("2019-06-01T07:49:50Z")
var temp=""

function populate(data) {

    console.log(data)
    if(data['repositories']['nodes'].length > 0){
        document.getElementById("loader").style.display="none";
        document.getElementById("content").style.display="block";

    document.getElementById('profile-avatar').src=data['repositories']['nodes'][0]['owner']['avatarUrl']
    document.getElementById("total-repo").innerText=data['repositories']['nodes'].length
    document.getElementById('profile-img').src=data['repositories']['nodes'][0]['owner']['avatarUrl']
    document.getElementById('profile-name').innerHTML=data['name']
    document.getElementById('profile-bio').innerHTML=data['bio']
    document.getElementById('login').innerHTML=data['repositories']['nodes'][0]['owner']['login']
    data['repositories']['nodes'].forEach((element)=>{
        console.log()
        temp+=  '<div role="repo-list" >';
        temp+=  '<div role="repo-list-left">'
        temp+= '<h3 role="repo-name" class="mb-10 "><a class="text-blue" id="repo-name">'+element.name+'</a> </h3>';
        if(element.description !==null){
            temp+= '<p role="repo-description" class="mb-10 fs-14" id="repo-description">'+element?.description+'</p>';
        }
        
        temp+= '<div role="repo-features" class="d-flex-row">';
        if(element['languages']['nodes'].length !==0){
            temp+= `<div class="mr-15  d-flex-row align-center"><p  role="lang-color" style="background:${element['languages']['nodes'][0]?.color};" class="mr-5"></p> <p class="text-soft fs-12">${element['languages']['nodes'][0]?.name}</p></div>`;
        }

         temp+= '<p class="mr-15 fs-12 d-flex-row align-center text-soft">';
        temp+= '<svg class="mr-5" fill="#696868" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">';
        temp+= '<path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>';
        temp+=  element.stargazerCount+'</p>';
          temp+= '<p class="mr-15 fs-12 d-flex-row align-center text-soft">';
           temp+= '<svg  viewBox="0 0 16 16" fill="#696868" height="16" width="16" class="mr-5">';
           temp+= '<path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>';
           temp+=  '</svg>'+element.forkCount+ '</p>';
           temp+= '<p class="fs-12 text-soft">Updated on '+formatDate(element.updatedAt)+'</p>';
           temp+='</div>';
           temp+='</div>';
           temp+='<div role="repo-list-right ">';
           temp+='<button role="repo-list-button"><svg  viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>';
           temp+='</svg>Star</button>';
           temp+='</div>';
           temp+='</div>';
    })
    document.getElementById('wrapper').innerHTML=temp
    
}else{
    document.getElementById("content").style.display="none";
    // document.getElementById("error").style.display="block";
    window.alert("User not found")
}
}




function formatDate(raw_date){
    var month_names = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

 var month_num=Number(raw_date.split('-')[1]);
 var day = Number(raw_date.split('-')[2].split('T')[0]);
 var month = month_names[month_num];
 var date = `${day} ${month}`;
 return date
}



}

