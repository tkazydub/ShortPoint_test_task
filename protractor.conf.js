require("ts-node").register({
    project: "./tsconfig.json"
});

const { SpecReporter } = require("jasmine-spec-reporter");
const fs = require("fs");

exports.config = {
    framework: "jasmine",
    directConnect: true,
    specs: ["./specs/*.spec.ts"],
    baseUrl: "https://antongshortpoint.sharepoint.com",
    suites: {
        navigation_between_sites: "specs/navigation-between-sites.spec.ts",
        slideshow: "specs/slideshow-animation.spec.ts",
        tile_hover: "specs/tile-hover-effects.spec.ts"
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60 * 1000
    },
    beforeLaunch: async function () {
        const reportsDir = "reports";
        // remove reports folder with all files
        fs.rmdirSync(reportsDir, { recursive: true });
        // create empty reports folder
        fs.mkdirSync(reportsDir);
    },
    onPrepare: async function() {
        await browser.waitForAngularEnabled(false);

        const HtmlReporter = require("protractor-beautiful-reporter");

        jasmine.getEnv().addReporter(
            new HtmlReporter({
                baseDirectory: "reports/html-report",
                jsonsSubfolder: "jsons",
                screenshotsSubfolder: "images",
                preserveDirectory: false
            }).getJasmine2Reporter()
        );

        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: true
                }
            })
        );
    }
};
