// button appears in the case that scroll to top >= 600 
let buttonUp=document.getElementById("button-up");
window.onscroll=function(){
    if(window.scrollY>=600){
        buttonUp.style.display="block"
    }
    else{
        buttonUp.style.display="none"

    }
};
buttonUp.onclick=function(){
   window.scrollTo({
    left:0,
    top:0,
    behavior:"smooth",
   });
    
};
// the start basic
let API_Link="https://reqres.in/api/users?page=";
let teachersBox=document.getElementById("teachers-box");
let prevButton=document.getElementById("prev-page");
let nextButton=document.getElementById("next-page");
let currentPage = 1;
let totalPages = 0;

async function fetchTeachers(page) {
    try{
    let result=await fetch(`${API_Link}${page}`);
    let data=await result.json();
    return data;
    }
    catch(error){
     console.error('Error : ',error);
    }
}

function displayTeachers(teachers){
    teachersBox.innerHTML=teachers.map(teacher =>`
        <div class="teacher-card">
          <img src="${teacher.avatar}" alt="${teacher.first_name} ${teacher.last_name}" width="100">
          <h3>${teacher.first_name} ${teacher.last_name}</h3>
          <a href="../pagesHTML/teacher.html?id=${teacher.id}">View Details</a>
        </div>
        `).join("");
}

function changePagination(page,total){
    prevButton.disabled=page<=1;
    nextButton.disabled=page>=total;
}

async function  loadPageData(page) {
    let data=await fetchTeachers(page) ;
    displayTeachers(data.data);
    changePagination(page,data.totalPages);
    currentPage=page;
}
prevButton.addEventListener('click', () => {
    if (currentPage >1) {
        loadPageData(currentPage - 1);
    }
});
nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        loadPageData(currentPage + 1);
    }
});


fetch(`${API_Link}1`).then(result =>result.json()).then(data => {
    totalPages = data.total_pages;
    ;
    loadPageData(currentPage);
});