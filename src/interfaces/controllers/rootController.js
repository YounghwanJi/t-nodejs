const { execSync } = require("child_process");
const path = require("path");
const pkg = require(path.resolve(__dirname, "../../../package.json"));

const serverStartTime = new Date().toISOString();

exports.getHealthcheck = async (req, res) => {
    res.json({status: "UP"});
};

exports.getInfo = async (req, res) => {
    res.json({
        build: {
            name: pkg.name,
            version: pkg.version,
            environment: process.env.NODE_ENV || "local",
            appStartTime: serverStartTime,
        },
        git: getGitInfo(),
    });
};

// TODO: 추후 runtime 기반이 아닌, build-info.json 등 별도의 파일로 구성한 후 읽어오는 방식으로 전환 필요.
// TODO: util 파일로 분리 필요?
function getGitInfo() {
    try {
        const branch = execSync("git rev-parse --abbrev-ref HEAD")
            .toString()
            .trim();
        const commitId = execSync("git rev-parse --short HEAD")
            .toString()
            .trim();
        const commitTime = execSync("git log -1 --format=%cI")
            .toString()
            .trim();
        return { branch, commit: { id: commitId, time: new Date(commitTime).toISOString() } };
    } catch (err) {
        return { branch: null, commit: { id: null, time: null } };
    }
}