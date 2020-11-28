const fetch = require("node-fetch");

const handler = async function (event) {
  // const content = {
  //   query: `{
  //     viewer {
  //       login
  //       bio
  //       avatarUrl
  //       name
  //       repositories(last: 20, orderBy: {field: UPDATED_AT, direction: ASC}, privacy: PUBLIC) {
  //         totalCount
  //         nodes {
  //           forkCount
  //           isFork
  //           url
  //           stargazerCount
  //           name
  //           description
  //           updatedAt
  //           primaryLanguage {
  //             color
  //             name
  //           }
  //           parent {
  //             forkCount
  //             name
  //             nameWithOwner
  //             stargazerCount
  //             updatedAt
  //             url
  //             licenseInfo {
  //               name
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }`,
  // };

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  //const params = querystring.parse(event.body);

  const token = process.env.API_KEY;
  const options = {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: event.body,
  };
  try {
    const response = await fetch("https://api.github.com/graphql", options);
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
