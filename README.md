# Arcane Study Case

## Introduction
The goal of this project is to develop a minimal front-end application using React.js framework in order to handle users on the platform.

## BackEnd
The BackEnd part is a REST API in python using :
  - Flask
  - SQLAlchemy
  - Marshmallow

### Prerequesites
You need to have :
* 3.7 python installed : https://www.python.org/downloads/release/python-370/

* Pipenv installed :
```sh
# Install pipenv
$ pip3 install pipenv
```
See as well the [Pipenv documentation]

### Installation
Once you have cloned the repository and are in it, you need to activate venv :
```sh
# Activate venv
$ cd ./backend
$ pipenv shell
```
Then you need to install dependencies :
```sh
# Install dependencies automatically
$ pipenv install
```

## Run the server
### First use
You need to create your local SQlite Database :
```sh
# Create DB and fill it with fictional data
$ python databaseCreation.py
```

### Run the server
To run the server :
```sh
# Run server (http://localhost:5000)
$ python app.py
```

## FrontEnd

Install depedencies:
```sh
$ cd ./frontend
$ nvm use
$ npm install
```

Start the project:
```sh
npm start
```

# Development In Progress

## Package
Many packages are outdated resulting in some fulnerabilities. One of them is the @material-ui/core@3.9.2, by updating this package to the 4.11.3 some of the high vulnerabilities should fixed. Upgrading to version 4.11.3 of @material-ui/core requires to make changes on some components because many parameters were deprecated.

To fix some of the vulnerabilities:
```sh
npm audit
npm audit fix
```
*found 10 vulnerabilities (6 low, 4 high) in 2111 scanned packages* 

The majoirity of thoses vulnerabilites comes from the react-data-grid-addons
this package is not maintened, the version used is the 6.0.1 which was released 2 years ago
One of the other issues of using this package is the fact that warinings and errors are triggered 
in the console.log of the browser

**Solution: Replace this package and make a custom component which will manage data into grid**


## Architectures & Files
One of the most importent thing in a project is to get a good architecture in order to scale fastly. Clarity should be reflected by the structure
### Current Architecture

```
frontend                             
│   README.md                 
│   tsconfig.json                     
│   package.json                     
│   ...                 
└───src                 
│   │   userServices.js                      
│   │   index.js                
│   │   App.js              
│   │   index.css             
│   │   ...              
│   └───components                                
│   │   └───Buttons                                            
│   │   │      CustomSwitch.js               
│   │   └───DataGrid/Fromatters                                            
│   │   │             ColumnFormatterDateTime.js
│   │   └───Dialogs                                            
│   │   │      DeleteDialog.tsx          
│   │   │      DiscardChangesDialog.js          
│   │   │      ErrorDialog.tsx          
│   │   │      FormDialog.tsx          
│   │   │      FormTitle.tsx          
│   │   │      LoadingDialog.js          
│   │   │      SaveDialog.tsx          
│   │   │      logo_arcane_small.png          
│   │   └───FormInputs 
│   │   │      CustomSelect.tsx          
│   │   │      CustomTextField.tsx        
│   │   └───SettingsUI 
│   │          index.js
│   │          View.js
│   │           └───components
│   │                   ParameterDataGrid.js
│   │
│   └───utils                  
│   │     routingUtils.tsx                  
│   │                  
│   └───UserRights                  
│       │   index.js                 
│       └───components                
│           │   FormUsersRights.js                     
│           └───formComponents
│                  ClientsTab.js         
│                  FeaturesTab.js         
│                           
└───public                
    │   ...                 
```
### Javascript vs Typescript
As you can see the frontend folder which is represent the frontend part of the app is written in Typescript but also in javascript. You can also find in the same component folder, components written in JS and other in Typescript. It is better to get one single type of file even if Typescript will be transcompiled into javascript for more clarity we will rewrite all the javascript file into Typescript.

### New Architecture

When we have a first look into the project we don't understand the basic structure, where is the files related to the API (fetching), the models or the app pages. So a new structure have to be implemented as follow:

```
frontend                             
│   README.md                 
│   tsconfig.json                     
│   package.json                     
│   .prettierrc                     
│   ...                 
└───src                 
│   │   index.js                
│   │   App.js              
│   │   index.css             
│   │   ...              
│   └───api                                
│   │      userServices.ts              
│   └───assets                                
│   │   ...              
│   └───models                                
│   │      types.ts              
│   └───styles                                
│   │     stylesConstant.ts             
│   └───utils                  
│   │     routingUtils.tsx                                             
│   └───app                                
│   │   └───components                                            
│   │   │     ... all the components structured into subfolder
│   │   └───hooks                                            
│   │   │     useDarkMode.ts
│   │   └───layout                                            
│   │   │     BaseLayout.tsx
│   │   └───pages                                            
│   │       └───DataManagement                                            
│   │       |      index.tsx                                      
│   │       └───Settings                                            
│   │              index.tsx         
│   │
│   └───utils                  
│   │     routingUtils.tsx                  
│                           
└───public                
    │   ...                 
```

The new architure gives us a better understanding of how the project is structured, we got a folder for managing the API fetching, a folder assets, styles, models and utils. Finally we got a folder dedicated for the app where we defined :
- components
: all the components of the app. Actually the app is relatively small so we can put all the components in this folder. As we scale we will refine with a global comoponents folder where we define all the reusable components and a components folder into each pages folder where we will implement only the components related to the pages
- hooks
: all the custom hooks implemented like in our project the useDarkMode hook, which allows to the user to swap between Light Mode and Dar kMode
- layout
: all the custom layout, the layout of an application is composed of fixed areas
- pages
: all the pages, each page reflects a route


## Pages

### Settings

This is the page where we can add, remove and and update user and user permissions.
Mainly composed by a grid

### DataManagement

This is the page where we can add clients, active or deactivate client


## Styles

By using the @material-ui/core package we need to follow a specific way of defining styles by creating and injecting styles:


`interface CustomSelectProps extends WithStyles<typeof styles> {
  ...
}
export default withStyles(styles)(CustomSelect)
`

**styles** need to be defined and this lead to implement them in each components only for the @material-ui component. If we want to add custom styles we also need to define them. This adds unnecessary code when you want to share resources between components and make our components less readable.
In order to avoid this we can add a CSS Modules Stylesheet for each **Components.tsx** by implementing a **Components.modules.css** but this will not allow us to share ressources so I define a **styles/stylesConstants.ts** file where all CSSProperties and @material-ui styles are defined.

We should use a modern css package like styled-components:
----------
[styled-components](https://styled-components.com/docs)

## Hook vs Classes

Many components where Class based but since version 16.8 we can read in the react documentation that using Hook is more suited:

[Hook](https://reactjs.org/docs/hooks-faq.html#gatsby-focus-wrapper)


## Linting

Prettier