module.exports = {
  apps: [
    {
      name: "JCWD-AHLS02-02",
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 5202,
      },
      time: true,
    },
  ],
};
