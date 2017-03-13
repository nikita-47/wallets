#Wallets

Small web-application.

## Deploy

The project contains a ready for use `gulp-webserver`.
Just do:

```
git clone https://github.com/NikitaBonachev/wallets.git
cd wallets
npm install
bower install
gulp dev
```
Then visit [http://localhost:8888/](http://localhost:8888/).
Also, you can use this application at [GitHub Pages](https://nikitabonachev.github.io/wallets/#/users). 
 
##What I've used
 - [Angular 1.6](https://angularjs.org/)
 - [Semantic UI](http://semantic-ui.com/)
 - [Moment.js](https://momentjs.com/)
 - [Toastr](http://codeseven.github.io/toastr/)
 
##Browser support
 I have tested on following desktop latest versions: 
 - Google Chrome (Mac and Windows)
 - Opera (Mac and Windows)
 - Mozilla Firefox (Mac and Windows)
 - Safari
 - IE 11
 
##Testing
 
 - Manual testing (check-list).
 - Unit-tests (Jasmine.js + Karma + Several browsers). 
 To run unit-tests: `npm install -g karma-cli` and then `karma start`.
 Then you can visit `coverage` folder to see the result.
 
## My mark 8/10
 
 Why not 10:
 
 * Better to implement range-picker on separate directive
 * One deprecation warning with my range-picker
 * No mobile version
