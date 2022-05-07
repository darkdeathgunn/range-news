console.log("using news main.js");

let APIKey= "ac072ab17a6240bebf8db91bb8346bb8";
let newsChannelMain="";

let channelSourceCodeList=[
    {channelName:"BBC News",newsChannel:"bbc-news"},
    {channelName:"The Times of India",newsChannel:"the-times-of-india"},
    {channelName:"The Hindu",newsChannel:"the-hindu"},
    {channelName:"Business Insider",newsChannel:"business-insider"},
    {channelName:"Time",newsChannel:"time"},
    {channelName:"USA Today",newsChannel:"usa-today"},
    {channelName:"The Verge",newsChannel:"the-verge"},
    {channelName:"TalkSport",newsChannel:"talksport"}
];

let channelList=document.getElementById("channelList");
let str="";
channelSourceCodeList.forEach(function(element,index){
    str+=`<button type="button" id="${element.newsChannel}" onclick="assignMainSource(${index})" class="btn btn-primary btn-lg my-2 mx-2">${element.channelName}</button>`;
});
channelList.innerHTML=str;

function assignMainSource(index) {
    newsChannelMain=channelSourceCodeList[index].newsChannel;
    loadTheChannel();
}


function loadTheChannel() {
    let xhr=new XMLHttpRequest();
    xhr.open("GET",`https://newsapi.org/v2/top-headlines?sources=${newsChannelMain}&apiKey=${APIKey}`,true);
    xhr.onload=function(){
        if(this.status===200){
            let newObj=JSON.parse(this.responseText);
            // console.log(newObj);
            let articlesArray=newObj.articles;
            // console.log(articlesArray);
            let strHtml="";
            articlesArray.forEach(function(element,index){
                strHtml+=`<div class="accordion-item">
                                <h2 class="accordion-header" id="flush-heading${index}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
                                    ${element.title}<span class="badge bg-secondary mx-5" > BY-${element.author} </span>
                                    </button>
                                </h2>
                                <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">${element.content} <a href="${element.url}" target="_blank" >Read Full Article</a> </div>
                                </div>
                            </div>`;
            });
            document.getElementById("newscorner").innerHTML=strHtml;
        }
        else{
            console.log("Something went wrong");
        }
    }
    xhr.send();
}