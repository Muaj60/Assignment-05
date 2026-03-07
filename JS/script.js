let allIssues=[];

const priorityBadge = (priority) => {
  const p = priority.toUpperCase(); 
  return `
    <span class="w-20 text-center px-3 py-2 text-sm rounded-md font-semibold
      ${
        p === "HIGH"
          ? "bg-red-100 text-red-600"
          : p === "MEDIUM"
          ? "bg-yellow-100 text-yellow-600"
          : p === "LOW"
          ? "bg-gray-100 text-gray-600"
          : "bg-green-100 text-green-600"
      }">
      ${p}
    </span>
  `;
};



const createElement = (labels) => {
  return labels
    .map((label) => {
      if (label.toLowerCase() === "bug") {
        return `<span class="px-3 py-1 text-xs rounded-full border border-red-400 text-red-500">🐞 BUG</span>`;
      } 
      else if (label.toLowerCase() === "help wanted") {
        return `<span class="px-3 py-1 text-xs rounded-full border border-yellow-400 text-yellow-600">⚙️ HELP WANTED</span>`;
      } 
      else if (label.toLowerCase() === "enhancement") {
        return `<span class="px-3 py-1 text-xs rounded-full border border-green-400 text-green-600">✨ ENHANCEMENT</span>`;
      } 
      else if (label.toLowerCase() === "good first issue") {
        return `<span class="px-3 py-1 text-xs rounded-full border border-blue-400 text-blue-600">🚀 GOOD FIRST ISSUE</span>`;
      } 
      else if (label.toLowerCase() === "documentation") {
        return `<span class="px-3 py-1 text-xs rounded-full border border-gray-400 text-gray-600">📄 DOCUMENTATION</span>`;
      }
    })
    .join(" ");
};

document.getElementById("login-btn").addEventListener("click", () => {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {

    document.getElementById("login-section").classList.add("hidden");
    document.querySelector("header").classList.remove("hidden");
    document.getElementById("all-btn").classList.remove("hidden")
    document.getElementById("count-section").classList.remove("hidden")
    document.getElementById("issue-section").classList.remove("hidden");

    loadIssue();

  } 
  else {
    alert("Wrong Username or Password");
  }

});

const loadIssue = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;       
      displayIssues(allIssues);    
      updateCount(allIssues);       
    });
};


const getIssueDetails=(id)=>{
fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then((res)=>res.json())
.then((data)=>{
  showIssueModal(data.data)
})
}

const displayIssues = (issues) => {
      const container = document.getElementById("issue-container");

      container.innerHTML = "";

      issues.forEach((issue) => {

        const borderColor=issue.status.toLowerCase()==='open'?"border-t-4 border-green-400 ":"border-t-4 border-purple-400";

        const div = document.createElement("div");

       div.onclick=()=>getIssueDetails(issue.id);

        div.className = `card bg-white shadow-sm p-5 rounded-xl bg-gray-200 ${borderColor}`;

        div.innerHTML = `

<div class="h-full flex flex-col justify-between mb-2 ">
   <div class="flex justify-between">
   <img class="w-8" src="./assets/Open-Status.png" alt="">
   ${priorityBadge(issue.priority)}
   </div>
  <h2 class="font-semibold text-[18px]">
    ${issue.title}
  </h2>

  <p class="text-sm text-gray-500">
    ${issue.description}
  </p>

</div>

<div class="flex flex-nowrap md:flex-wrap  gap-2 mt-2">
  ${createElement(issue.labels)}
</div>

<div class="border-t border-gray-200 mt-2"></div>

<div class="text-sm mt-2 space-y-2 text-gray-400">
  #${issue.id} by john_doe
  <br>
  1/15/2024
</div>

`;

        container.append(div);

      });
      

    };



const showIssueModal = (issue) => {
  const container = document.getElementById("details-container")

  container.innerHTML = `
     <h2 class="text-xl font-bold">${issue.title}</h2>

     <div class="flex items-center gap-2 text-sm">
        <span class="badge badge-success">${issue.status}</span>
        <span>Opened by ${issue.author}</span>
     </div>

    
     <div class="flex flex-nowrap md:flex-wrap gap-2 mt-2">
        ${createElement(issue.labels)}
     </div>

     
     <p class="text-sm text-gray-500 mt-2">
        ${issue.description}
     </p>

     
     <div class="flex justify-center  p-4 rounded-md bg-gray-200 w-full mt-4">

  <div class="w-1/2 flex flex-col space-y-2 ">
    <p class="text-gray-400">Assignee:</p>
    <p class="font-semibold">
      ${issue.assignee ? issue.assignee : "Not Assigned"}
    </p>
  </div>

  <div class="text-right flex flex-col items-center w-20">
    <p class="text-gray-400 mb-1">Priority:</p>
      ${priorityBadge(issue.priority)}
  </div>

</div>
  
  `;

document.getElementById("word_modal").showModal();
    
   
}




const updateCount=(issues)=>{
document.getElementById("count").innerText=`${issues.length} Issues`
}

document.querySelectorAll("#all-btn button").forEach((btn)=>{
  btn.addEventListener('click',()=>{

    const type=btn.innerText.toLowerCase();
    if(type==='all'){
      displayIssues(allIssues);
      updateCount(allIssues);
    }
    else if(type==='open'){
      const openIssues=allIssues.filter(issue=>issue.status.toLowerCase()==="open");

      displayIssues(openIssues)
      updateCount(openIssues)
    }
    else if(type==='closed'){
      const closedIssues=allIssues.filter(issue=>issue.status.toLowerCase()==="closed");
      displayIssues(closedIssues)
      updateCount(closedIssues)
    }
    document.querySelectorAll("#all-btn button").forEach(b=>{
      b.classList.remove('btn-primary')
      b.classList.add('btn-neutral')
    });
    btn.classList.remove('btn-neutral')
   btn.classList.add('btn-primary')

    })
  });



