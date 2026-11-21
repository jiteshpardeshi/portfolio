# Bloom Portfolio

Static portfolio. HTML + CSS + JS. Nginx container. GitHub Actions CI/CD.

## Structure
```
index.html
css/style.css
js/main.js
Dockerfile
nginx.conf
.github/workflows/ci.yml            # validate, build, test, push to GHCR
.github/workflows/deploy-pages.yml  # deploy to GitHub Pages
```

## Run local
```
docker build -t bloom-portfolio .
docker run -p 8080:80 bloom-portfolio
```

## Pipeline
- PR / push to main: file + JS syntax checks -> Docker build -> smoke test
- Push to main: image to `ghcr.io/<user>/bloom-portfolio`, site to GitHub Pages
