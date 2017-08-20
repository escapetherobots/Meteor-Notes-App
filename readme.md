# Meteor/React Notes App

## Deploy instructions for Heroku
------------------------------------------------
1. Create Heroku app
2. Setup buildpack for meteor
    >> heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
3. setup mongolab db on Heroku
    >> heroku addons:create mongolab:sandbox
4. configure ROOT_URL env variable
    >> https://crux-meteor-notes.herokuapp.com
    >> heroku config:set ROOT_URL="https://crux-meteor-notes.herokuapp.com"
5. Set node version in package.json
6. Commit and deploy
