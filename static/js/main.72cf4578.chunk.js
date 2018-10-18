(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){e.exports=a(75)},39:function(e,t,a){},41:function(e,t,a){},64:function(e,t,a){},67:function(e,t,a){},69:function(e,t,a){},71:function(e,t,a){},73:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(32),c=a.n(o),l=(a(39),a(8)),s=a(9),r=a(11),m=a(10),u=a(12),d=(a(41),function(e){function t(){return Object(l.a)(this,t),Object(r.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"header flex"},i.a.createElement("img",{src:"img/movie3.png",className:"header-img"}),i.a.createElement("h1",{className:"header-title"},"Herolo Cinema"))}}]),t}(n.Component)),v=a(76),h=a(18),f=a.n(h),p=a(33),b=a.n(p),E=a(5),g=a.n(E),N="cf5f5d9f",y=null;function D(e){return f.a.get("https://www.omdbapi.com/?i=".concat(e,"&page=2&apikey=").concat(N)).then(function(e){return e.data})}var O={getMovies:function(){if(null!==y)return y},getMovieById:D,saveMovie:function(e){var t,a=!1;if(y.some(function(t){e.Title===t.Title&&e.imdbID!==t.imdbID&&(a=!0,g()("This movie already Exist!").then(function(){return!1}))}),!a)return e.imdbID?function(e){var t=y.findIndex(function(t){return e.imdbID===t.imdbID});-1!==t&&(y[t]=e)}(e):(t=e,new Promise(function(e,a){t.imdbID=b()(),t.Poster="img/movie3.png",y.push(t),e(t)}))},loadMovies:function(){return null===y?f.a.get("https://www.omdbapi.com/?s=job&type=movie&page=3&apikey=".concat(N)).then(function(e){y=[];var t=[];return e.data.Search.forEach(function(e){t.push(D(e.imdbID).then(function(e){y.push(e)}))}),Promise.all(t)}).then(function(){return y.sort(function(e,t){var a=e.Runtime.toLowerCase(),n=t.Runtime.toLowerCase();return a<n?-1:a>n?1:0}),y}):Promise.resolve(y)},deleteMovie:function(e){return console.log("id: ",e),new Promise(function(t,a){var n=y.findIndex(function(t){return t.imdbID===e});-1!==n&&(y.splice(n,1),console.log("deleted!")),t()})},checkDuplicate:function(e){var t=!1;return y.some(function(a){e.Title===a.Title&&e.imdbID!==a.imdbID&&(t=!0,g()("This movie already Exist!").then(function(){return!1}))}),t},searchMovieById:function(e){console.log("id service:",e);var t={};return y.some(function(a){e===a.imdbID&&(console.log("movie-service:",a),t=a)}),t},convertMonth:function(e){for(var t=["January","February","March","April","May","June","July","August","September","October","November","December"],a=0;a<t.length;a++)if(a===e)return t[a]}},k=a(79),w=a(6),x=(a(64),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(r.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={movie:a.props.movie,back:!1,edit:!1},a.editMovie=function(){a.setState({edit:!a.state.edit})},a.back=function(){a.setState({back:!a.state.back})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.movie;if(this.state.back)return i.a.createElement(k.a,{to:"/movie"});if(this.state.edit)return i.a.createElement(k.a,{to:{pathname:"/movie/edit/".concat(e.imdbID),movie:this.state.movie}});var t=e.Poster;return null!==t&&"N/A"!==t||(t="img/movie3.png"),i.a.createElement("div",{className:"movie-container flex column"},i.a.createElement(v.a,{to:"/movie/".concat(e.imdbID),movie:e,className:"a-title"},i.a.createElement("h2",{className:"title"},e.Title.toLowerCase().substring(0,36))),i.a.createElement("img",{src:t||"img/movie3.png",alt:""}),i.a.createElement("p",{className:"director"},i.a.createElement("span",null,"Directed by: "),e.Director),i.a.createElement("div",{className:"year-container flex"},i.a.createElement("p",{className:"year"},e.Year,",\xa0"),i.a.createElement("p",{className:"runtime"}," ",e.Runtime)),i.a.createElement("ul",{className:"genre-list flex"},e.Genre.split(",").map(function(e){return i.a.createElement("li",{className:"genre",key:e.id},e)})),i.a.createElement("button",{className:"btn btn-edit",onClick:this.editMovie},i.a.createElement(w.a,{icon:"edit",title:"edit"})))}}]),t}(n.Component)),M=(a(67),function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(m.a)(t).call(this,e,a))).addMovie=function(){n.setState({add:!n.state.add})},n.refreshMovies=function(){},n.state={add:!1,movies:[],img:null},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;O.loadMovies().then(function(t){console.log("dataaaa",t),e.setState({movies:t})})}},{key:"render",value:function(){return this.state.add?i.a.createElement(k.a,{to:{pathname:"/movie/edit/new",updateMovie:this.updateMovie}}):i.a.createElement("div",{className:"movies flex column"},i.a.createElement("div",{className:"sub-title flex"},i.a.createElement("p",null,"Let's watch some movies!"),i.a.createElement("button",{onClick:this.addMovie,className:"btn add-btn"},i.a.createElement("span",null,"+"),i.a.createElement(w.a,{icon:"video",title:"add movie"}))),i.a.createElement("div",{className:"movie-preview"},i.a.createElement("ul",{className:"movies-list flex"},this.state.movies&&this.state.movies.map(function(e){return i.a.createElement("li",{className:"movie-list",key:e.imdbID},i.a.createElement(x,{movie:e}))}))))}}]),t}(n.Component)),I=a(17),j=(a(69),function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(m.a)(t).call(this,e,a))).cancel=function(){n.setState({cancel:!n.state.cancel})},n.handleTitle=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Title=e.target.value,n.setState({movie:t})},n.handleDirector=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Director=e.target.value,n.setState({movie:t})},n.handleYear=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Year=e.target.value,n.setState({movie:t})},n.handleReleased=function(e){var t=JSON.parse(JSON.stringify(n.state.movie)),a=Date.parse(e.target.value),i=new Date(a);console.log("newDate: ",i,"dateReleased",a);var o,c=O.convertMonth(i.getMonth());console.log(c),o=i.getDate()+" "+c+" "+i.getFullYear(),console.log("fullDate: ",o),t.Released=e.target.value,n.setState({movieDate:o}),n.setState({movie:t})},n.handleRuntime=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Runtime=e.target.value,n.setState({movie:t})},n.handleGenre=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Genre=e.target.value,n.setState({movie:t})},n.delete=function(){g()({title:"Are you sure you want to delete this movie?",icon:"warning",buttons:["Cancel","Delete"],dangerMode:!0,className:"swal-warning"}).then(function(e){e?O.deleteMovie(n.state.movieId).then(function(){n.setState({cancel:!n.state.cancel}),g()("Your movie has been deleted!",{icon:"success",timer:2e3,className:"swal-text",button:!1})}):g.a.close()})},n.state={cancel:!1,movieId:n.props.match.params.movieId,movie:{},movieDate:null},n.saveMovie=n.saveMovie.bind(Object(I.a)(Object(I.a)(n))),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=O.searchMovieById(this.state.movieId);console.log("movie$$",e),this.setState({movie:e})}},{key:"saveMovie",value:function(e){var t=this.state.movie;this.state.movieDate&&(t.Released=this.state.movieDate),console.log("movie to be saved:",t);var a=0;for(var n in t){if(""===t[n])return console.log("edit- fill them all!"),void g()("Fill all fields!").then(function(){});a++}if(a<5)return console.log("new- fill them all!",a),void g()("Fill all fields!").then(function(){});for(var i=t.Title,o=0;o<i.length;o++)if(32!==i.charCodeAt(o)&&i.charCodeAt(o)<65||i.charCodeAt(o)>122||i.charCodeAt(o)>90&&i.charCodeAt(o)<97)return console.log("i: ",i[o]),void g()("Only English caracters!").then(function(){});O.checkDuplicate(t)||(t.Title=i,e.preventDefault(),O.saveMovie(t),this.setState({cancel:!this.state.cancel}))}},{key:"render",value:function(){if(this.state.cancel)return i.a.createElement(k.a,{to:"/"});var e=this.state.movie;return(new Date).setTime(Date.parse(e.Released)),i.a.createElement("div",{className:"edit flex column"},i.a.createElement("h1",{className:"edit-title"},e.imdbID?"Edit":"Add Movie"),i.a.createElement("div",{className:"form-edit flex column"},i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"Title:"),i.a.createElement("input",{value:this.state.movie.Title,className:"input-edit",type:"text",onChange:this.handleTitle})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"Director: "),i.a.createElement("input",{value:this.state.movie.Director,className:"input-edit",type:"text",onChange:this.handleDirector})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"Released: "),i.a.createElement("input",{value:this.state.movie.Released,className:"input-edit",type:"date",onChange:this.handleReleased})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"runtime: "),i.a.createElement("input",{value:this.state.movie.Runtime,className:"input-edit",type:"text",onChange:this.handleRuntime})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"genre: "),i.a.createElement("input",{value:this.state.movie.Genre,className:"input-edit",type:"text",onChange:this.handleGenre})),i.a.createElement("div",{className:"btns btns-edit flex"},i.a.createElement("button",{className:"btn",onClick:this.saveMovie},i.a.createElement(w.a,{icon:"save",title:"save"})),i.a.createElement("button",{className:"btn",onClick:this.delete},i.a.createElement(w.a,{icon:"trash-alt",title:"delete"})),i.a.createElement("button",{className:"btn",onClick:this.cancel},i.a.createElement(w.a,{icon:"undo",title:"back"})))))}}]),t}(n.Component)),S=(a(71),function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(m.a)(t).call(this,e,a))).editMovie=function(){n.setState({edit:!n.state.edit})},n.back=function(){n.setState({back:!n.state.back})},n.delete=function(){g()({title:"Are you sure you want to delete this movie?",icon:"warning",buttons:["Cancel","Delete"],dangerMode:!0,className:"swal-warning"}).then(function(e){e?O.deleteMovie(n.state.movieId).then(function(){n.setState({back:!n.state.back}),g()("Your movie has been deleted!",{icon:"success",timer:2e3,className:"swal-text",button:!1})}):g.a.close()})},n.state={movieId:n.props.match.params.movieId,movie:{},back:!1,edit:!1},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){console.log("id",this.state.MovieId);var e=O.searchMovieById(this.state.movieId);console.log("movie$$",e),this.setState({movie:e})}},{key:"render",value:function(){if(this.state.back)return i.a.createElement(k.a,{to:"/"});if(this.state.edit)return i.a.createElement(k.a,{to:"/movie/edit/".concat(this.props.match.params.movieId)});var e=this.state.movie,t=e.Poster;return null!==t&&"N/A"!==t||(t="img/movie3.png"),i.a.createElement("div",{className:"movie-details-container flex column"},i.a.createElement("h2",{className:"title title-details"},e.Title),i.a.createElement("div",{className:"movie-details flex column"},i.a.createElement("div",{className:"details-container flex"},i.a.createElement("img",{src:t||"img/movie3.png",alt:""}),i.a.createElement("div",{className:"movie-text flex column"},i.a.createElement("p",{className:"director"},i.a.createElement("span",{className:"bold"},"Directed by: "),e.Director),i.a.createElement("p",{className:"actors"},i.a.createElement("span",{className:"bold"},"Actors: "),e.Actors?e.Actors:"Gal Gadot"),i.a.createElement("p",{className:"rating"},i.a.createElement("span",{className:"bold"},"IMDb rating: "),e.imdbRating?e.imdbRating:"2.5","/10"),i.a.createElement("p",{className:"released"},i.a.createElement("span",{className:"bold"},"Released: "),e.Released),i.a.createElement("div",{className:"year-container flex"},i.a.createElement("p",{className:"runtime"}," ",e.Runtime,",\xa0"),i.a.createElement("p",{className:"language"}," ",e.Language?e.Language:"Jibrish")),i.a.createElement("p",{className:"plot"},e.Plot?e.Plot:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."))),i.a.createElement("div",{className:"btns flex"},i.a.createElement("button",{className:"btn btn-edit",onClick:this.editMovie},i.a.createElement(w.a,{icon:"edit",title:"edit"})),i.a.createElement("button",{className:"btn btn-delete",onClick:this.delete},i.a.createElement(w.a,{icon:"trash-alt",title:"delete"})),i.a.createElement("button",{className:"btn btn-back",onClick:this.back},i.a.createElement(w.a,{icon:"undo",title:"back"})))))}}]),t}(n.Component)),C=(a(73),a(14)),R=a(16),A=a(77),J=a(81),T=a(80);C.b.add(R.a),C.b.add(R.c),C.b.add(R.d),C.b.add(R.b),C.b.add(R.e);var P=function(e){function t(){return Object(l.a)(this,t),Object(r.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(A.a,null,i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"App"},i.a.createElement(d,{className:"App-header"})),i.a.createElement(J.a,{className:"body"},i.a.createElement(T.a,{exact:!0,path:"/",component:M}),i.a.createElement(T.a,{exact:!0,path:"/movie",component:M}),i.a.createElement(T.a,{exact:!0,path:"/movie/:movieId",component:S}),i.a.createElement(T.a,{exact:!0,path:"/movie/edit/:movieId",component:j}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var G=a(78);c.a.render(i.a.createElement(G.a,{basename:"/cinema"},i.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,2,1]]]);
//# sourceMappingURL=main.72cf4578.chunk.js.map