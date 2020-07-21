(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{33:function(e,t,a){e.exports=a(57)},39:function(e,t,a){},45:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(25),s=a.n(i),c=a(3),l=a.n(c),o=a(10),u=a(6),m=a(7),d=a(9),p=a(8),h=a(11),v=(a(39),function(e){return n.a.createElement("div",{id:"logoBanner"},n.a.createElement(h.b,{to:"/home",className:"logo"},"MAGELLAN"),e.verified?n.a.createElement(h.b,{to:"/user",className:"loginButton"},"View Your Saved Recipes"):n.a.createElement("div",null),e.verified?n.a.createElement("button",{className:"logoutButton",onClick:e.logout},"Log Out"):n.a.createElement(h.b,{to:"/login",className:"loginButton"},"Log In"))}),f=a(21),E=(a(45),function(e){for(var t=[],a=0;a<e.list.length;a++){for(var r=[],i=e.list[a],s=1;s<i.length;s++){var c=i[s];r.push(n.a.createElement("li",{key:c},c))}var l=i[0];"main"!==l&&t.push(n.a.createElement("div",{className:"sectionHeader",key:l},l)),t.push(n.a.createElement("div",{className:"sectionData"},e.ordered?n.a.createElement("ol",{key:r.toString()},r):n.a.createElement("ul",{key:r.toString()},r)))}return n.a.createElement("div",null,t)}),g=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={recipeFound:!0,recipeID:r.props.match.params.recipeid,URL:"",imageURL:"",author:"",recipeName:"",difficulty:"",totalTime:"",prepTime:"",inactiveTime:"",activeTime:"",cookTime:"",yield:"",ingredients:[],directions:[],source:""},r}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/recipe/".concat(this.state.recipeID));case 2:return t=e.sent,e.next=5,t.json();case 5:(a=e.sent).error?this.setState({recipeFound:!1}):this.setState({URL:a.URL,imageURL:a.imageURL,author:a.author,recipeName:a.recipeName,difficulty:a.difficulty,totalTime:a.totalTime,prepTime:a.prepTime,inactiveTime:a.inactiveTime,activeTime:a.activeTime,cookTime:a.cookTime,yield:a.yield,ingredients:a.ingredients,directions:a.directions,source:a.source});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.recipeFound?n.a.createElement("div",null,this.state.recipeName?n.a.createElement(f.a,null,n.a.createElement("title",null,"Magellan - "+this.state.recipeName)):n.a.createElement(f.a,null,n.a.createElement("title",null,"Magellan")),n.a.createElement("div",{id:"header"},n.a.createElement("div",{id:"recipeName"},this.state.recipeName),n.a.createElement("div",{id:"author"},"by ",this.state.author),n.a.createElement("div",{id:"source"},"Courtesy of",n.a.createElement("span",{id:"sourceText"},this.state.source))),n.a.createElement("div",{id:"image"},this.state.imageURL?n.a.createElement("img",{src:this.state.imageURL,alt:"",width:"600"}):n.a.createElement("p",{className:"invisibleElement"}),n.a.createElement("div",{id:"sourceLink"},n.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:this.state.URL},"Original Recipe"))),n.a.createElement("div",{id:"details"},n.a.createElement("div",{id:"detailsLeft"},n.a.createElement("div",{id:"difficulty"},"Difficulty:",n.a.createElement("span",{id:"difficultyText"},this.state.difficulty)),n.a.createElement("div",{id:"yield"},"Yield:",n.a.createElement("span",{id:"yieldText"},this.state.yield))),n.a.createElement("div",{id:"times"},n.a.createElement("div",{id:"totalTime"},"Total Time:",n.a.createElement("span",{id:"totalTimeText"},this.state.totalTime)),n.a.createElement("div",{id:"timesList"},n.a.createElement("ul",null,n.a.createElement("div",{id:"prepTime"},this.state.prepTime?n.a.createElement("li",null,n.a.createElement("span",{id:"prepTimeText"},this.state.prepTime),"prep time"):n.a.createElement("p",{className:"invisibleElement"})),n.a.createElement("div",{id:"cookTime"},this.state.cookTime?n.a.createElement("li",null,n.a.createElement("span",{id:"cookTimeText"},this.state.cookTime),"cook time"):n.a.createElement("p",{className:"invisibleElement"})),n.a.createElement("div",{id:"activeTime"},this.state.activeTime?n.a.createElement("li",null,n.a.createElement("span",{id:"activeTimeText"},this.state.activeTime),"active time"):n.a.createElement("p",{className:"invisibleElement"})),n.a.createElement("div",{id:"inactiveTime"},this.state.inactiveTime?n.a.createElement("li",null,n.a.createElement("span",{id:"inactiveTimeText"},this.state.inactiveTime),"inactive time"):n.a.createElement("p",{className:"invisibleElement"})))))),n.a.createElement("div",{id:"ingredients"},n.a.createElement("div",{className:"listHeader"},"Ingredients"),n.a.createElement(E,{list:this.state.ingredients,ordered:!1})),n.a.createElement("div",{id:"directions"},n.a.createElement("div",{className:"listHeader"},"Directions"),n.a.createElement(E,{list:this.state.directions,ordered:!0}))):n.a.createElement("div",{id:"notFoundNotice"},"Recipe not found! Please try again")}}]),a}(r.Component),b=a(29),y=a(18),T=a(31),w=a.n(T),S=(a(50),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={recipe:e.info},r}return Object(m.a)(a,[{key:"render",value:function(){var e=this.state.recipe,t="/recipe/".concat(e._id),a="";switch(e.source){case"Food Network":a="FNsource";break;case"Taste of Home":a="TOHsource"}return n.a.createElement("div",{id:"card",className:"expandableCard"},n.a.createElement("a",{className:"cardRecipeLink",target:"_blank",rel:"noopener noreferrer",href:t},n.a.createElement("div",{id:"cardContents"},n.a.createElement("div",{id:"cardInfo"},n.a.createElement("div",{id:"cardRecipeName"},e.recipeName),n.a.createElement("div",{id:"secondaryDetails"},e.author?n.a.createElement("div",{id:"cardAuthor"},"by ",e.author):n.a.createElement("p",null),n.a.createElement("div",{id:"tertiaryDetails"},e.source?n.a.createElement("div",{id:"cardSource",className:a},"from ",e.source):n.a.createElement("p",null),e.totalTime?n.a.createElement("div",{id:"cardTotalTime"},e.totalTime):n.a.createElement("p",null)))),e.imageURL?n.a.createElement("img",{id:"cardPhoto",src:e.imageURL,alt:""}):n.a.createElement("p",null))))}}]),a}(r.Component)),j=(a(51),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).updateCurrentResults=function(){console.log("updating current results");var e=r.state.currentPage,t=r.state.numResultsPerPage,a=(e-1)*t,i=e*t;console.log(a,i);var s=r.props.data.slice(a,i).map((function(e){return n.a.createElement(S,{info:e})}));r.setState({currentResults:s},(function(){console.log("visible results updated"),r.forceUpdate()}))},r.goToPreviousPage=function(){console.log("going to previous page");var e=r.state.currentPage;e>1&&r.setState({currentPage:e-1},(function(){console.log("page num decremented"),r.updateCurrentResults()}))},r.goToNextPage=function(){console.log("going to next page");var e=r.state.currentPage;e<r.state.lastPage&&r.setState({currentPage:e+1},(function(){console.log("page num incremented"),r.updateCurrentResults()}))},r.state={currentResults:[],numResults:0,numResultsPerPage:5,lastPage:0,currentPage:1},r}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.data.length,a=this.state.numResultsPerPage;this.setState({numResults:t,lastPage:Math.ceil(t/a)},(function(){e.updateCurrentResults()}))}},{key:"render",value:function(){return console.log("rendering"),n.a.createElement("div",{id:"wrapper"},n.a.createElement("div",{id:"topResultsLabel"},"Top Results:"),n.a.createElement("div",{id:"resultsContainer"},n.a.createElement("div",{id:"scrollLeftButton"},this.state.currentPage>1?n.a.createElement("button",{className:"scrollButton",onClick:this.goToPreviousPage},"\u25c0"):n.a.createElement("div",{className:"scrollPlaceholder"}," ")),n.a.createElement("div",{id:"resultsList"},this.state.currentResults),n.a.createElement("div",{id:"scrollRightButton"},this.state.currentPage<this.state.lastPage?n.a.createElement("button",{className:"scrollButton",onClick:this.goToNextPage},"\u25b6"):n.a.createElement("div",{className:"scrollPlaceholder"}," "))),n.a.createElement("div",{id:"pageDetails"},n.a.createElement("div",null,"Viewing page ",this.state.currentPage," of ",this.state.lastPage)))}}]),a}(r.Component));a(52);function O(){var e=Object(b.a)(["\n            width: 285px;\n            margin-top: 10px;\n            margin-left: auto;\n            margin-right: auto;\n            background-color: lightgrey;\n        "]);return O=function(){return e},e}var k=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={searchType:"name",input:"",emptyInput:!1,resultsFound:!0,loading:!1,results:[],maxResults:35},e.getResults=Object(o.a)(l.a.mark((function t(){var a,r,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.state.input){t.next=12;break}return a="/api/search/".concat(e.state.searchType,"/").concat(e.state.input,"/").concat(e.state.maxResults),e.setState({results:[],resultsFound:!0,loading:!0,emptyInput:!1}),t.next=5,fetch(a);case 5:return r=t.sent,t.next=8,r.json();case 8:(n=t.sent).error?e.setState({resultsFound:!1,loading:!1}):e.setState({resultsFound:!0,loading:!1,results:n.searchResults}),t.next=13;break;case 12:e.setState({emptyInput:!0,resultsFound:!0,results:[]});case 13:case"end":return t.stop()}}),t)}))),e.updateInput=function(t){e.setState({input:t.currentTarget.value})},e.updateSearchType=function(t){e.setState({searchType:t.currentTarget.value})},e}return Object(m.a)(a,[{key:"render",value:function(){var e=Object(y.css)(O());return n.a.createElement("div",{id:"searchContainer"},n.a.createElement("div",{id:"notice"},"Find your next meal!"),n.a.createElement("form",{name:"searchBar",target:"hiddenFrame",onSubmit:this.getResults},n.a.createElement("div",{id:"searchBarWrapper"},n.a.createElement("input",{name:"search",id:"searchInput",type:"text",autoComplete:"off",placeholder:"Search for recipes",onChange:this.updateInput}),n.a.createElement("button",{type:"submit",id:"searchButton",className:"fa fa-search"})),n.a.createElement("div",{id:"searchType"},"Search by:",n.a.createElement("div",{id:"searchTypeNameWrapper"},n.a.createElement("input",{type:"radio",id:"searchTypeNameButton",name:"searchType",value:"name",onChange:this.updateSearchType,checked:"name"===this.state.searchType}),n.a.createElement("label",{htmlFor:"searchTypeNameButton"},"Recipe Name")),n.a.createElement("div",{id:"searchTypeIngWrapper"},n.a.createElement("input",{type:"radio",id:"searchTypeIngButton",name:"searchType",value:"ing",onChange:this.updateSearchType,checked:"ing"===this.state.searchType}),n.a.createElement("label",{htmlFor:"searchTypeIngButton"},"Ingredient"))),n.a.createElement("div",{id:"inputReminder"},this.state.emptyInput?n.a.createElement("h4",null,"Please enter something to search"):n.a.createElement("p",null)),n.a.createElement("div",{id:"loadingBar"},this.state.loading?n.a.createElement("div",null,"Searching...",n.a.createElement(w.a,{height:6,css:e})):n.a.createElement("p",null))),n.a.createElement("div",{id:"results"},this.state.resultsFound?n.a.createElement("p",null):n.a.createElement("div",{id:"failNotice"},"No results found. Try again"),this.state.results.length?n.a.createElement(j,{data:this.state.results}):n.a.createElement("p",null)),n.a.createElement("iframe",{name:"hiddenFrame",id:"iframe",title:"hidden"}))}}]),a}(r.Component),N=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(k,null))}}]),a}(r.Component),P=a(32),R=a(4),x=(a(53),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={email:"",password:"",confirmPassword:"",errors:[],redirectAfterSumbit:!1},e.updateInput=function(t){var a=t.currentTarget,r=a.id,n=a.value;e.setState(Object(P.a)({},r,n))},e.submitPage=function(t){t.preventDefault();var a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:e.state.email,password:e.state.password,confirmPassword:e.state.confirmPassword})};try{Object(o.a)(l.a.mark((function t(){var r,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/auth/register",a);case 2:return r=t.sent,t.next=5,r.json();case 5:(n=t.sent).length?e.setState({errors:n}):e.setState({redirectAfterSumbit:!0});case 7:case"end":return t.stop()}}),t)})))()}catch(r){console.log("Error submitting registration form:",r)}},e}return Object(m.a)(a,[{key:"render",value:function(){return this.state.redirectAfterSumbit?n.a.createElement(R.a,{to:"/login"}):n.a.createElement("div",{id:"registerWrapper"},n.a.createElement("div",{id:"registerHeader"},"Create an account"),n.a.createElement("form",{name:"registerForm",onSubmit:this.submitPage},n.a.createElement("div",null,"ERRORS:",this.state.errors.length?this.state.errors:""),n.a.createElement("div",{id:"inputWrapper"},n.a.createElement("label",{id:"emailLabel",className:"label",htmlFor:"email"},"Email Address:"),n.a.createElement("input",{className:"input",id:"email",name:"email",type:"text",autoComplete:"off",placeholder:"Email Address",value:this.state.email,onChange:this.updateInput}),n.a.createElement("label",{id:"passwordLabel",className:"label",htmlFor:"password"},"Password:"),n.a.createElement("input",{className:"input",id:"password",name:"password",type:"password",autoComplete:"off",placeholder:"Password",value:this.state.password,onChange:this.updateInput}),n.a.createElement("label",{id:"confirmPasswordLabel",className:"label",htmlFor:"confirmPassword"},"Confirm Password:"),n.a.createElement("input",{className:"input",id:"confirmPassword",name:"confirmPassword",type:"password",autoComplete:"off",placeholder:"Confirm Password",value:this.state.confirmPassword,onChange:this.updateInput})),n.a.createElement("div",{id:"registerLink"},"Already have an account?",n.a.createElement(h.b,{to:"/login"},"Log in here")),n.a.createElement("div",{id:"submitButtonWrapper"},n.a.createElement("button",{type:"submit",id:"submitButton"},"Submit"))))}}]),a}(r.Component)),C=(a(54),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).updateInput=function(e){var t=e.currentTarget,a=t.id,n=t.value;"email"===a?r.setState({email:n}):r.setState({password:n})},r.submitPage=function(e){e.preventDefault();var t={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:r.state.email,password:r.state.password})};try{Object(o.a)(l.a.mark((function e(){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/auth/login",t);case 2:return a=e.sent,e.next=5,a.json();case 5:(n=e.sent).length?r.setState({errors:n}):(r.updateLoginStatus(),r.setState({redirectAfterSumbit:!0}));case 7:case"end":return e.stop()}}),e)})))()}catch(a){console.log("Error submitting login form:",a)}},r.updateLoginStatus=e.updateLoginStatus,r.state={email:"",password:"",errors:[],redirectAfterSumbit:!1},r}return Object(m.a)(a,[{key:"updateLoginStatus",value:function(){}},{key:"render",value:function(){return this.props.verified?n.a.createElement("div",null,n.a.createElement("h3",null,"You are already logged in"),n.a.createElement("h4",null,"Click",n.a.createElement("span",null,n.a.createElement(h.b,{to:"/home"},"here")),"to return to the home page")):this.state.redirectAfterSumbit?n.a.createElement(R.a,{to:"/home"}):n.a.createElement("div",{id:"loginWrapper"},n.a.createElement("div",{id:"loginHeader"},"Log In"),n.a.createElement("form",{name:"loginForm",onSubmit:this.submitPage},n.a.createElement("div",null,"ERRORS:",this.state.errors.length?this.state.errors:""),n.a.createElement("div",{id:"inputWrapper"},n.a.createElement("label",{id:"emailLabel",className:"label",htmlFor:"email"},"Email Address:"),n.a.createElement("input",{className:"input",id:"email",name:"email",type:"text",autoComplete:"off",placeholder:"Email Address",value:this.state.email,onChange:this.updateInput}),n.a.createElement("label",{id:"passwordLabel",className:"label",htmlFor:"password"},"Password:"),n.a.createElement("input",{className:"input",id:"password",name:"password",type:"password",autoComplete:"off",placeholder:"Password",value:this.state.password,onChange:this.updateInput})),n.a.createElement("div",{id:"registerLink"},"Don't have an account yet?",n.a.createElement(h.b,{to:"/register"},"Register here")),n.a.createElement("div",{id:"submitButtonWrapper"},n.a.createElement("button",{type:"submit",id:"submitButton"},"Submit"))))}}]),a}(r.Component)),L=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).getUserData=Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/auth/userData");case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,r.setState({email:a.email,savedRecipes:a.savedRecipes}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("Error retrieving user data:",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])}))),r.state={email:"",savedRecipes:[]},r}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getUserData();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.props.verified?n.a.createElement("div",null,n.a.createElement("div",null,"GREAT SUCCESS!"),n.a.createElement("div",null,"You are logged in as ",this.state.email),n.a.createElement("div",null,"Here are your saved recipes:",this.state.savedRecipes.toString())):n.a.createElement("div",null,n.a.createElement("h3",null,"You are not yet logged in"),n.a.createElement("h4",null,"Click",n.a.createElement("span",null,n.a.createElement(h.b,{to:"/login"},"here")),"to log in"))}}]),a}(r.Component),I=(a(55),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={verified:!1,auth_error:""},e}return Object(m.a)(a,[{key:"updateLoginStatus",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/auth/verified");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.setState({verified:a.verified,auth_error:a.auth_error});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.updateLoginStatus()}},{key:"logout",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/auth/logout");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.setState({verified:a.verified,auth_error:a.auth_error});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement(h.a,null,n.a.createElement(v,{verified:this.state.verified,auth_error:this.state.auth_error,logout:this.logout.bind(this)}),n.a.createElement(R.d,null,n.a.createElement(R.b,{path:"/home",component:N}),n.a.createElement(R.b,{path:"/recipe/:recipeid",component:g}),n.a.createElement(R.b,{path:"/register",component:x}),n.a.createElement(R.b,{path:"/login",render:function(t){return n.a.createElement(C,Object.assign({},t,{verified:e.state.verified,updateLoginStatus:e.updateLoginStatus.bind(e)}))}}),n.a.createElement(R.b,{path:"/user",render:function(t){return n.a.createElement(L,Object.assign({},t,{verified:e.state.verified}))}}),n.a.createElement(R.b,{path:"/"},n.a.createElement(R.a,{to:"/home"})))))}}]),a}(r.Component));a(56);s.a.render(n.a.createElement(I,null),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.61f42b29.chunk.js.map