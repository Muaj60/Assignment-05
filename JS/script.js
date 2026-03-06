let allIssues=[];

const priorityBadge = (priority) => {
  const p = priority.toUpperCase(); 
  return `
    <span class="w-24 text-center px-3 py-2 text-sm rounded-md font-semibold
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

const displayIssues = (issues) => {
      const container = document.getElementById("issue-container");

      container.innerHTML = "";

      issues.forEach((issue) => {

        const borderColor=issue.status.toLowerCase()==='open'?"border-t-4 border-green-400 ":"border-t-4 border-purple-400";

        const div = document.createElement("div");

        div.className = `card bg-white shadow-sm p-5 rounded-xl bg-gray-200 ${borderColor}`;

        div.innerHTML = `

<div class="h-full flex flex-col justify-between mb-2">
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

<div class="flex gap-2">
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



