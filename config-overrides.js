const {compose} = require("react-app-rewired");
const {withLoaderOptions: rewireSass} = require("react-app-rewire-sass-modules");

module.exports = compose(
    rewireSass({
        includePaths: ["src/"],
    }),
);