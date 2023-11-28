const fs = require("fs");
const axios = require("axios");

const jsonFilePath = "sampleUserData.json";

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const usersWithPosts = await Promise.all(
      response.data.map(async (user) => {
        const postsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );
        const posts = postsResponse.data;
        return { ...user, posts };
      })
    );
    return usersWithPosts;
  } catch (error) {
    console.error("Error fetching data from external API:", error.message);
    return [];
  }
};
const updateJsonFile = async () => {
  let userData = [];

  if (fs.existsSync(jsonFilePath)) {
    const fileData = fs.readFileSync(jsonFilePath, "utf-8");
    userData = JSON.parse(fileData);
  }
  const fetchedData = await fetchData();

  userData = userData.concat(
    fetchedData.filter(
      (user) => !userData.some((existingUser) => existingUser.id === user.id)
    )
  );

  const modifiedUsers = userData.map((user) => ({
    ...user,
    totalPosts: user.posts.length,
  }));

  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(modifiedUsers, null, 2));
    console.log("Data added to JSON file successfully.");
  } catch (error) {
    console.error("Error writing JSON file:", error.message);
  }
};

updateJsonFile();
