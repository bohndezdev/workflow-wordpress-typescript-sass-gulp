# workflow-wordpress-typescript-sass-gulp
Workflow to develop wordpress projects with Typescript, Sass (scss). I use Gulp to bundle code and run tasks.


## Dependencies
You need some dependencies installed for develop:
- Local server like:
  - MAMP
  - WAMP
  - XAMPP
- PHP in that server
- Nodejs in your machine

## How to start
1. Get the whole files of this proyect and place them in the root of your wordpress proyect. Take care with the hidden files:
   * .babelrc
   * browserslistrc
   * .gitignore (You can replace it if you want)

For __".git"__ file. You might want to have your own, I recomend you not copy it.

2. Config your project in "WORKFLOWCONFIG.json" file [Options here](#config-options)

3. Install node dependencies with `npm install` command.

4. Start the proyect with develop mode `npm start`.

## Config project

### Default

```
{
  "theme_route"        : "./wp-content/themes/example-theme",
  "script_source_file" : "./src/ts/main.ts",
  "script_bundle_name" : "bundle.min.js",
  "script_dest"        : "./wp-content/themes/example-theme/assets/js",
  "style_source_file"  : "./src/scss/main.scss",
  "style_bundle_name"  : "styles.min.css",
  "style_dest"         : "./wp-content/themes/example-theme/assets/css",
  "images_src"         : "./src/img/*",
  "images_dest"        : "./wp-content/themes/example-theme/assets/img"
}
```

### Config options

Option             | Description
------             | -----------
theme_route        | Route to the theme that you will develop.
script_source_file | Route to the main typescript file where you'll code.
script_bundle_name | Name for for the output js file (typescript bundled).
script_dest        | Route to the directory that will contains the js files.
style_source_file  | Route to main file for scss styles.
style_bundle_name  | Name for the bundled css file.
style_dest         | Route to the directory that will contains the css files.
images_src         | Directory for source images.
images_dest        | Directory to put processed images




