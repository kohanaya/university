cd web
npm run build
rm -rf ../api/src/main/resources/static/*
cp -r ./build/ ../api/src/main/resources/static/
cd ../api
git add .
git commit -m "update"
git push heroku master
