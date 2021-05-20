# Introduction
WDIO Automation

# Getting Started

Prereq - app to be tested must already be deployed and has access to experience editor

1.	Run `$npm i`
2.	Update .env fields BASEURL, USER_NAME, PASSWORD, and APPNAME or can provide values from cmdline
3.  To run tests: 
    - Run single spec file - `set "APPNAME=JssNextWeb" & set "PASSWORD=b" && npx wdio wdio.conf.js --baseUrl https://ssge2ecm --spec ./test/specs/experience-editor.spec.js`
    - Run suite as defined in wdio.conf.js - `set "APPNAME=etoenextjs" & set "PASSWORD=b" && npx wdio wdio.conf.js --baseUrl https://cm.jssdev.localhost --suite ee`
4. To run setup script for new fresh environments `set "APPNAME=etoenextjs" & set "PASSWORD=b" && npx wdio wdio.conf.js --baseUrl https://cm.jssdev.localhost --suite setup`. This will: 
    - enable admin permission for JssImport user in user manage page if not already enabled
    - populate solr schema and indexing manager in control panel page
    - publish content items and resolve suggested fix in workbox page
    - uncomment line in setup-new-environment.spec.js to create new api key or get existing api key
    
