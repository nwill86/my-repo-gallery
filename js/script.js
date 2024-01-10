// Div overview (profile information)
const overviewElement = document.querySelector(".overview");
const repoElement = document.querySelector(".repo-list");

const username = "nwill86";

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
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repos.json();
    showUserRepos(repoData);
}

const showUserRepos = function (repos) {
    for (let repo of repos) {
        const div = document.createElement("div");
        div.classList.add("repo");
        div.innerHTML = `<h3>${repo.name}</h3>`;
        repoElement.append(div);
    }
};


