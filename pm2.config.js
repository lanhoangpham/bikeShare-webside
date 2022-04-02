module.exports = {
    apps : [
        {
          name: "vu-teacher",
          script: "./dist/app.js",
          watch: true,
          env: {
            "NODE_ENV": "development",
          }
        }
    ]
  }