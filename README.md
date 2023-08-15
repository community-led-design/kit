# Community-Led Co-design Kit

[![Netlify Status](https://api.netlify.com/api/v1/badges/41596f93-63f6-4071-865b-2d12aa7b1af3/deploy-status)](https://app.netlify.com/sites/co-design/deploys)

This repository contains the source files for the [Community-Led Co-design Kit](https://co-design.inclusivedesign.ca).

## Usage

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at [http://localhost:8080](http://localhost:8080).

### To build and serve using Docker

You can build and serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t codesign.inclusivedesign.ca .`
* Run the container: `docker run --name codesign.inclusivedesign.ca -p 8000:80 codesign.inclusivedesign.ca`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

### To build for deployment to a personal web server

1. Install the required NPM packages: `npm install`
2. Run the build script: `npm run build`
3. Upload the contents of the `./_site/` directory to the web root of your server.

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./_site/`
directory to the web root of your server.

## Notes

Modifications can be made to any source file or directory except for the contents of the `./_site/` directory. The
`./_site/` directory is not versioned since it contains the built website that Eleventy generates from the source files,
and  files in `_site` are overwritten at build time.

## License

The Community-Led Co-Design Toolkit website is available under the [New BSD License](https://raw.githubusercontent.com/inclusive-design/codesign.inclusivedesign.ca/master/LICENSE.md).

The website's content is available under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).

## Third Party Software in the Community-Led Co-Design Toolkit

The Community-Led Co-Design Toolkit website is based on other publicly available software, categorized by license:

### MIT License

* [Eleventastic](https://github.com/maxboeck/eleventastic)
* [eleventy-webpack](https://github.com/clenemt/eleventy-webpack)
* [Hylia](https://github.com/hankchizljaw/hylia)
* [Supermaya](https://github.com/MadeByMike/supermaya)
