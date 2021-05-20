# Introduction
WDIO Automation

# Getting Started

Prereq - app to be tested must already be deployed and has access to experience editor

1.	Run `$npm i`
2.	Update .env fields BASEURL, USER_NAME, PASSWORD, and APPNAME or can provide values from cmdline
3.  To run tests: 
    - Run single spec file - `set "APPNAME=JssNextWeb" & set "PASSWORD=b" && npx wdio wdio.conf.js --baseUrl https://ssge2ecm --spec ./test/specs/experience-editor.spec.js`
    - Run suite as defined in wdio.conf.js - `set "APPNAME=etoenextjs" & set "PASSWORD=b" && npx wdio wdio.conf.js --baseUrl https://cm.jssdev.localhost --suite ee`
