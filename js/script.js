// Div overview (profile information)
const overviewElement = document.querySelector(".overview");
const username = "nwill86";
const repoListElement = document.querySelector(".repo-list");
const reposElement = document.querySelector(".repos");
const repoDataElement = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");




const gitUserData = async function () {
    const userData = await fetch(`https://api.github.com/users/${username}`);
    const data = await userData.json();
    showUserInfo(data);
};

gitUserData();

const showUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`
    overviewElement.append(div);
    gitUserRepos();
};

const gitUserRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    showUserRepos(repoData);
};

const showUserRepos = function (repos) {
    for (const repo of repos) {
        const repoListItem = document.createElement("li");
        repoListItem.classList.add("repo");
        repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoListElement.append(repoListItem);
    }
};

repoListElement.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});


const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    backButton.classList.remove("hide");
    repoDataElement.innerHTML = "";
    repoDataElement.classList.remove("hide");
    reposElement.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
<p>Description: ${repoInfo.description}</p>
<p>Default Branch: ${repoInfo.default_branch}</p>
<p>Languages: ${languages.join(", ")}</p>
<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoDataElement.append(div);
};


