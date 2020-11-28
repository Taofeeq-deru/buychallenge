const rootBody = document.querySelector("body");

const content = {
  query: `{
    viewer {
      login
      bio
      avatarUrl
      name
      repositories(last: 20, orderBy: {field: UPDATED_AT, direction: ASC}, privacy: PUBLIC) {
        totalCount
        nodes {
          forkCount
          isFork
          url
          stargazerCount
          name
          description
          updatedAt
          primaryLanguage {
            color
            name
          }
          parent {
            forkCount
            name
            nameWithOwner
            stargazerCount
            updatedAt
            url
            licenseInfo {
              name
            }
          }
        }
      }
    }
  }`,
};

const body = JSON.stringify(content);
//const url = "https://api.github.com/graphql";
//const url = "http://localhost:8888/api/fun";
const url = "https://buychallenge.netlify.app/api/fun";
//const token = process.env.API_KEY || config.API_KEY;
//const token = config.API_KEY;

const options = {
  method: "post",
  headers: {
    "Content-type": "application/json",
  },
  body,
};

const avis = document.querySelectorAll(".my-avi");
const desc = document.querySelector("#bio-desc");
const usernames = document.querySelectorAll(".my-username");
const fullnames = document.querySelectorAll(".my-fullname");
const counts = document.querySelectorAll(".repo-count");
const repoList = document.querySelector("#repoList");

async function fetchAPI() {
  await fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      const {
        avatarUrl,
        login,
        name,
        bio,
        repositories,
      } = data.data.data.viewer;
      avis.forEach((avi) => {
        avi.setAttribute("src", avatarUrl);
        avi.setAttribute("alt", login);
      });
      desc.innerHTML = bio;
      usernames.forEach((username) => {
        username.innerHTML = login;
      });
      fullnames.forEach((fullname) => {
        fullname.innerHTML = name;
      });
      counts.forEach((count) => {
        count.innerHTML = repositories.totalCount;
      });
      const months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
      };

      const thisMins = new Date().getMinutes();
      const thisHour = new Date().getHours();
      const todayDate = new Date().getDate();
      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();

      const today = {
        mins: thisMins,
        hour: thisHour,
        date: todayDate,
        month: thisMonth,
        year: thisYear,
      };

      repoList.innerHTML = repositories.nodes
        .map((repo) => {
          const mins = new Date(repo.updatedAt).getMinutes();
          const hour = new Date(repo.updatedAt).getHours();
          const date = new Date(repo.updatedAt).getDate();
          const monthVar = new Date(repo.updatedAt).getMonth();
          const year = new Date(repo.updatedAt).getFullYear();
          let updatedDate;
          if (year == today.year) {
            if (monthVar == today.month) {
              if (date == today.date) {
                if (hour == today.hour) {
                  if (mins == today.mins) {
                    updatedDate = `a few seconds ago`;
                  } else {
                    const diff = today.mins - mins;
                    updatedDate = `${diff} minutes ago`;
                  }
                } else {
                  const diff = today.hour - hour;
                  updatedDate = `${diff} hours ago`;
                }
              } else {
                const diff = today.date - date;
                if (diff == 1) {
                  const hourDiff = today.hour + 24 - hour;
                  if (hourDiff < 24) {
                    updatedDate = `${hourDiff} hours ago`;
                  } else {
                    updatedDate = `yesterday`;
                  }
                } else if (1 < diff < 7) {
                  updatedDate = `${diff} days ago`;
                } else {
                  updatedDate = `on ${months[monthVar]} ${date}`;
                }
              }
            } else {
              updatedDate = `on ${months[monthVar]} ${date}`;
            }
          } else {
            updatedDate = `on ${months[monthVar]} ${date}, ${year}`;
          }
          return `
        <div class="repo">
          <div class="name-lang">
            <div class="name">
              <a href=${repo.url}>${repo.name}</a>
            </div>
            ${
              repo.parent
                ? `<p class="forked">
                Forked from${" "}
                <a href=${repo.parent.url} class="link">
                  ${repo.parent.nameWithOwner} 
                </a>
              </p>`
                : ``
            }
            ${
              repo.description
                ? `<p class="detail">${repo.description}</p>`
                : ``
            }
            <div class="lang-updated">
              <p class="lang">
                <i
                  class="fas fa-circle"
                  style="color:${repo.primaryLanguage.color}"></i>
                ${repo.primaryLanguage.name}
              </p>
              ${
                repo.stargazerCount > 0
                  ? `<a href="">
                  <i class="far fa-star"></i> ${repo.stargazerCount}
                </a>`
                  : ``
              }
              ${
                repo.isFork
                  ? `<a href="">
                  <i class="fas fa-code-branch"></i> ${repo.parent.forkCount}
                </a>`
                  : !repo.isFork && repo.forkCount > 0
                  ? `<a href="">
                  <i class="fas fa-code-branch"></i> ${repo.forkCount}
                </a>`
                  : ``
              }
              ${
                repo.parent && repo.parent.licenseInfo
                  ? `<p>
                  <i class="fas fa-balance-scale"></i>${" "}
                  ${repo.parent.licenseInfo.name}
                </p>`
                  : ``
              }
              <p class="updated">Updated ${updatedDate}</p>
            </div>
          </div>
          <div class="star">
            <button class="btn-star">
              <i class="far fa-star"></i> Star
            </button>
          </div>
        </div>`;
        })
        .join("");
    })
    .catch((err) => {
      console.log(err);
      rootBody.innerHTML = `<div class="error"><h1>Please try again later</h1></div>`;
    });
}

fetchAPI();
