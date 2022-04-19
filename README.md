# FWC
FWC use CustomElement js native feature to create reusable components (Who need a front-end framework in 2022?)

## How to use
Download index.js in ./dist/index.js and add it in your page. It will init each custom component, log their name in the console, and you will be able to use them.
Here an example : 
```html
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>fwc sample</title>
    <meta content="width=device-width,initial-scale=1" name="viewport">
    <script src="./dist/index.js"></script>
    <style>
        body{
            margin: 0;
        }
    </style>
</head>
<body>
    <fwc-popup ms="5000">
        <div slot="content">Test</div>
    </fwc-popup>
</body>
</html>
```

## Customize
### The easy way
For easy change in components, we have set some css variables. You will not be able to change anything by using them, but you will be able to do major changes
```css
:host{
    ---primary-color: var(--primary-color,#e76f51);
    ---secondary-color: var(--secondary-color,#e9c46a);
    ---text: var(--text, white);
    ---font: var(--font, Tahoma, sans-serif);
    font-family: var(--font);
}
```
If you want to change some of those variables, you can do like this:
```css
*{
    --primary-color: black;
    --secondary-color: white;
}
```

### The suffering way
To customize any css property (because it can be needed) of those components, you can use css selector `:part` like this:
```css
    fwc-popup::part(loadingBar){
        background-color: black
    }
```
This css rule will change the background color of the loading bar which is in the popup element. To find the name of a part (in this example it was loadingBar), explore the html in the page and search for part property in the element you want to change, example for loadingBar:
```html
<div id="loadingBar" part="loadingBar">
    <div id="progress" part="progress" style="transition: all 500000ms ease 0s; width: 100%;"></div>
</div>
```
If i want to change the progress bar which is in the loading bar, the css selector would be `fwc-popup::part(progress)`

## How to create custom components
In ./src/ you will find MVC model and some components. Follow those examples to do your own components.

To install dependencies and build the project:
```cmd
npm run i
npm run build
```
If you want to recompile each time you save, you can run `npm run build:watch` instead.

## Rules to follow
Here some rules to respect when you want to create components:
- ALAWAYS..., use exportparts when you create a components with parts. Like this, if components have components which have components, which have components, ..., the final user will just have to do this to select the part `fwc-something::part(theExportedPart)` and update his style.
- Take your time to develop components to make them fast and easy to use.

## Components documentation
TODO: make this generation automatic or i will die