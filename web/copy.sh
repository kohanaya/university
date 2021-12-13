npm run build
rm -rf ~/Dev/university-app-api/src/main/resources/static/*
cp -r ./build/ ~/Dev/university-app-api/src/main/resources/static/
cd ~/Dev/university-app-api
git add .
git commit -m "Update"
git push heroku master
