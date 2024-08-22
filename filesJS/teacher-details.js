
let teacherDetailsBox = document.getElementById("teacher-details-box");


async function fetchTeacherDetails(id) {
    try {
        let result = await fetch(`https://reqres.in/api/users/${id}`);
        let data = await result.json();
        return data;
    } catch (error) {
        console.error('Error :', error);
    }
}


function displayTeacherDetails(teacher) {
    teacherDetailsBox.innerHTML = `
        <h1>${teacher.first_name} ${teacher.last_name}</h1>
        <img src="${teacher.avatar}" alt="${teacher.first_name} ${teacher.last_name}" width="150">
        <p>ID: ${teacher.id}</p>
        <p>Email: ${teacher.email}</p>
        <div class="introductory-video">
            <h3>Introductory video</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ETYNmcSVWAo?si=q-J0mRLamCt1jjCn"}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;
}

function getURL(name) {
    const url= new URLSearchParams(window.location.search);
    return url.get(name);
}

async function loadTeacherDetails() {
    let teacherId = getURL('id');
    if (teacherId) {
        let teacherDetails = await fetchTeacherDetails(teacherId);
        if (teacherDetails && teacherDetails.data) {
            displayTeacherDetails(teacherDetails.data);
        } else {
            teacherDetailsBox.innerHTML = '<p>Teacher not found.</p>';
        }
    } else {
        teacherDetailsBox.innerHTML = '<p>Teacher ID is missing .</p>';
    }
}

loadTeacherDetails();