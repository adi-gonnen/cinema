(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){e.exports=a(75)},39:function(e,t,a){},41:function(e,t,a){},45:function(e,t,a){},67:function(e,t,a){},69:function(e,t,a){},71:function(e,t,a){},73:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(32),o=a.n(c),l=(a(39),a(7)),s=a(8),r=a(10),m=a(9),u=a(11),d=a(76),v=(a(41),function(e){function t(){return Object(l.a)(this,t),Object(r.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"header flex"},i.a.createElement(d.a,{to:"/"},i.a.createElement("img",{src:"img/movie3.png",className:"header-img",alt:""})),i.a.createElement(d.a,{to:"/"},i.a.createElement("h1",{className:"header-title"},"Herolo Cinema")))}}]),t}(n.Component)),h=a(79),b=a(5),f=(a(45),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return(a=Object(r.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={movie:a.props.movie,edit:!1,info:!1},a.editMovie=function(){a.setState({edit:!a.state.edit})},a.details=function(){a.setState({info:!a.state.info})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.movie;if(this.state.edit)return i.a.createElement(h.a,{to:"/movie/edit/".concat(e.imdbID)});if(this.state.info)return i.a.createElement(h.a,{to:"/movie/".concat(e.imdbID)});var t={backgroundImage:"url("+(e.Poster&&"N/A"!==e.Poster?e.Poster:"img/movie3.png")+")",backgroundSize:"cover",backgroundPosition:"center",backgroundrepeat:"no-repeat"};return i.a.createElement("div",{className:"movie-container flex column"},i.a.createElement(d.a,{to:"/movie/".concat(e.imdbID),movie:e,className:"a-title"},i.a.createElement("h2",{className:"title"},e.Title.toLowerCase().substring(0,36))),i.a.createElement(d.a,{to:"/movie/".concat(e.imdbID),style:t,movie:e,className:"a-img"}),i.a.createElement("p",{className:"director"},i.a.createElement("span",{className:"bold"},"Directed by: "),e.Director),i.a.createElement("div",{className:"year-container flex"},i.a.createElement("p",{className:"year"},e.Year,",\xa0 \xa0"),i.a.createElement("p",{className:"runtime"}," ",e.Runtime)),i.a.createElement("ul",{className:"genre-list flex"},e.Genre.replace(/,/g,"").split(" ").map(function(e){return i.a.createElement("li",{className:"genre",key:e},e)})),i.a.createElement("div",{className:"btns flex"},i.a.createElement("button",{className:"btn btn-edit",onClick:this.editMovie},i.a.createElement(b.a,{icon:"edit",title:"edit"})),i.a.createElement("button",{className:"btn btn-info ml15",onClick:this.details},i.a.createElement(b.a,{icon:"info",title:"details"}))))}}]),t}(n.Component)),p=a(24),E=a.n(p),N=a(33),g=a.n(N),y=a(14),k=a.n(y),O="cf5f5d9f",D=null;function w(e){return E.a.get("https://www.omdbapi.com/?i=".concat(e,"&page=2&apikey=").concat(O)).then(function(e){return e.data})}var x={getMovies:function(){if(null!==D)return D},getMovieById:w,saveMovie:function(e){return e.imdbID?(t=e,new Promise(function(e,a){var n=D.findIndex(function(e){return t.imdbID===e.imdbID});-1!==n&&(D[n]=t),e(t),k()("Your movie has been saved!",{icon:"success",timer:2e3,className:"swal-text",button:!1})})):function(e){return new Promise(function(t,a){e.imdbID=g()(),e.Poster="img/movie3.png",D.push(e),t(e),k()("Your movie has been added!",{icon:"success",timer:2e3,className:"swal-text",button:!1})})}(e);var t},loadMovies:function(){return null===D?E.a.get("https://www.omdbapi.com/?s=job&type=movie&page=3&apikey=".concat(O)).then(function(e){D=[];var t=[];return e.data.Search.forEach(function(e){t.push(w(e.imdbID).then(function(e){D.push(e)}))}),Promise.all(t)}).then(function(){return D.sort(function(e,t){var a=e.Runtime.toLowerCase(),n=t.Runtime.toLowerCase();return a<n?-1:a>n?1:0}),console.log("movies:",D),D}):Promise.resolve(D)},deleteMovie:function(e){return k()({title:"Are you sure you want to delete this movie?",icon:"warning",buttons:["Cancel","Delete"],dangerMode:!0,className:"swal-warning"}).then(function(t){if(t)return new Promise(function(t,a){var n=D.findIndex(function(t){return t.imdbID===e});-1!==n&&D.splice(n,1),t()}).then(function(){k()("Your movie has been deleted!",{icon:"success",timer:2e3,className:"swal-text",button:!1})});k.a.close()})},checkDuplicate:function(e,t){var a=!1;return D.some(function(n){e.toLowerCase()===n.Title.toLowerCase()&&t!==n.imdbID&&(a=!0,k()("This movie already exist!").then(function(){}))}),a},searchMovieById:function(e){var t={};return D.some(function(a){e===a.imdbID&&(t=a)}),t},convertMonth:function(e){for(var t=["January","February","March","April","May","June","July","August","September","October","November","December"],a=0;a<t.length;a++)if(a===e)return t[a]}},I=(a(67),function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(m.a)(t).call(this,e,a))).addMovie=function(){n.setState({add:!n.state.add})},n.state={add:!1,movies:[],img:null},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;x.loadMovies().then(function(t){e.setState({movies:t})})}},{key:"render",value:function(){return this.state.add?i.a.createElement(h.a,{to:{pathname:"/movie/edit/new",updateMovie:this.updateMovie}}):i.a.createElement("div",{className:"movies flex column"},i.a.createElement("div",{className:"sub-title flex"},i.a.createElement("p",null,"let's watch some movies!"),i.a.createElement("button",{onClick:this.addMovie,className:"btn add-btn"},i.a.createElement("div",{className:"flex plus-add"},i.a.createElement(b.a,{icon:"plus",title:"add movie"})))),i.a.createElement("div",{className:"movie-preview"},i.a.createElement("ul",{className:"movies-list flex"},this.state.movies&&this.state.movies.map(function(e){return i.a.createElement("li",{className:"movie-list",key:e.imdbID},i.a.createElement(f,{movie:e}))}))))}}]),t}(n.Component)),M=a(17),S=(a(69),function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(m.a)(t).call(this,e,a))).cancel=function(){n.setState({cancel:!n.state.cancel})},n.handleTitle=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Title=e.target.value,n.setState({movie:t})},n.handleDirector=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Director=e.target.value,n.setState({movie:t})},n.handleYear=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Year=e.target.value,n.setState({movie:t})},n.handleReleased=function(e){var t,a=JSON.parse(JSON.stringify(n.state.movie)),i=Date.parse(e.target.value),c=new Date(i),o=x.convertMonth(c.getMonth());t=c.getDate()+" "+o+" "+c.getFullYear(),a.Year=c.getFullYear(),a.Released=e.target.value,n.setState({movieDate:t}),n.setState({movie:a})},n.handleRuntime=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Runtime=e.target.value,n.setState({movie:t})},n.handleGenre=function(e){var t=JSON.parse(JSON.stringify(n.state.movie));t.Genre=e.target.value,n.setState({movie:t})},n.delete=function(){x.deleteMovie(n.state.movieId).then(function(){n.setState({cancel:!n.state.cancel})})},n.state={cancel:!1,movieId:n.props.match.params.movieId,movie:{},movieDate:null},n.saveMovie=n.saveMovie.bind(Object(M.a)(Object(M.a)(n))),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=x.searchMovieById(this.state.movieId);this.setState({movie:e})}},{key:"saveMovie",value:function(e){var t=this.state.movie;this.state.movieDate&&(t.Released=this.state.movieDate),console.log("movie to be saved:",t);var a=0;for(var n in t){if(""===t[n])return void k()("Fill all fields!").then(function(){});a++}if(a<5)k()("Fill all fields!").then(function(){});else{for(var i=t.Title,c=0;c<i.length;c++){var o=i;(32!==i.charCodeAt(c)&&i.charCodeAt(c)<65||i.charCodeAt(c)>122||i.charCodeAt(c)>90&&i.charCodeAt(c)<97)&&(o=i.substring(0,c)+i.substring(c+1,i.length),c--,i=o)}x.checkDuplicate(i,this.state.movieId)||(t.Title=i,e.preventDefault(),x.saveMovie(t),this.setState({cancel:!this.state.cancel}))}}},{key:"render",value:function(){if(this.state.cancel)return i.a.createElement(h.a,{to:"/"});var e=this.state.movie;return(new Date).setTime(Date.parse(e.Released)),i.a.createElement("div",{className:"edit flex column"},i.a.createElement("h1",{className:"edit-title"},e.imdbID?"Edit":"Add Movie"),i.a.createElement("div",{className:"form-edit flex column"},i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"Title:"),i.a.createElement("input",{value:this.state.movie.Title,className:"input-edit",type:"text",onChange:this.handleTitle})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"Director: "),i.a.createElement("input",{value:this.state.movie.Director,className:"input-edit",type:"text",onChange:this.handleDirector})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"Released: "),i.a.createElement("input",{value:this.state.movie.Released,className:"input-edit",type:"date",onChange:this.handleReleased})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"runtime: "),i.a.createElement("input",{value:this.state.movie.Runtime,className:"input-edit",type:"text",onChange:this.handleRuntime})),i.a.createElement("div",{className:"input-container flex"},i.a.createElement("p",null,"genre: "),i.a.createElement("input",{value:this.state.movie.Genre,className:"input-edit",type:"text",onChange:this.handleGenre})),i.a.createElement("div",{className:"btns btns-edit flex"},i.a.createElement("button",{className:"btn",onClick:this.saveMovie},i.a.createElement(b.a,{icon:"save",title:"save"})),i.a.createElement("button",{className:"btn btn-delete ml15",onClick:this.delete},i.a.createElement(b.a,{icon:"trash-alt",title:"delete"})),i.a.createElement("button",{className:"btn btn-back ml15",onClick:this.cancel},i.a.createElement(b.a,{icon:"undo",title:"back"})))))}}]),t}(n.Component)),j=(a(71),function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(m.a)(t).call(this,e,a))).editMovie=function(){n.setState({edit:!n.state.edit})},n.back=function(){n.setState({back:!n.state.back})},n.delete=function(){x.deleteMovie(n.state.movieId).then(function(){n.setState({back:!n.state.back})})},n.state={movieId:n.props.match.params.movieId,movie:{},back:!1,edit:!1},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=x.searchMovieById(this.state.movieId);this.setState({movie:e})}},{key:"render",value:function(){if(this.state.back)return i.a.createElement(h.a,{to:"/"});if(this.state.edit)return i.a.createElement(h.a,{to:"/movie/edit/".concat(this.props.match.params.movieId)});var e=this.state.movie,t=e.Poster;return null!==t&&"N/A"!==t||(t="img/movie3.png"),i.a.createElement("div",{className:"movie-details-container flex column"},i.a.createElement("h2",{className:"title title-details"},e.Title),i.a.createElement("div",{className:"movie-details flex column"},i.a.createElement("div",{className:"details-container flex"},i.a.createElement("img",{src:t||"img/movie3.png",alt:""}),i.a.createElement("div",{className:"movie-text flex column"},i.a.createElement("p",{className:"director mb15"},i.a.createElement("span",{className:"bold"},"Directed by: "),e.Director),i.a.createElement("p",{className:"actors mb15"},i.a.createElement("span",{className:"bold"},"Actors: "),e.Actors?e.Actors:"Gal Gadot"),i.a.createElement("p",{className:"rating mb15"},i.a.createElement("span",{className:"bold"},"IMDb rating: "),e.imdbRating?e.imdbRating:"2.5","/10"),i.a.createElement("p",{className:"released mb15"},i.a.createElement("span",{className:"bold"},"Released: "),e.Released),i.a.createElement("div",{className:"year-container mb15 flex"},i.a.createElement("p",{className:"runtime"}," ",e.Runtime,",\xa0"),i.a.createElement("p",{className:"language"}," ",e.Language?e.Language:"Jibrish")),i.a.createElement("p",{className:"plot"},e.Plot?e.Plot:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."))),i.a.createElement("div",{className:"btns flex"},i.a.createElement("button",{className:"btn btn-edit",onClick:this.editMovie},i.a.createElement(b.a,{icon:"edit",title:"edit"})),i.a.createElement("button",{className:"btn btn-delete ml15",onClick:this.delete},i.a.createElement(b.a,{icon:"trash-alt",title:"delete"})),i.a.createElement("button",{className:"btn btn-back ml15",onClick:this.back},i.a.createElement(b.a,{icon:"undo",title:"back"})))))}}]),t}(n.Component)),C=(a(73),a(12)),R=a(16),J=a(77),A=a(81),P=a(80);C.b.add(R.a),C.b.add(R.e),C.b.add(R.f),C.b.add(R.d),C.b.add(R.g),C.b.add(R.b),C.b.add(R.c);var T=function(e){function t(){return Object(l.a)(this,t),Object(r.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(J.a,null,i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"App"},i.a.createElement(v,{className:"App-header"})),i.a.createElement(A.a,{className:"body"},i.a.createElement(P.a,{exact:!0,path:"/",component:I}),i.a.createElement(P.a,{exact:!0,path:"/movie",component:I}),i.a.createElement(P.a,{exact:!0,path:"/movie/:movieId",component:j}),i.a.createElement(P.a,{exact:!0,path:"/movie/edit/:movieId",component:S}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Y=a(78);o.a.render(i.a.createElement(Y.a,{basename:"/cinema"},i.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,2,1]]]);
//# sourceMappingURL=main.fb2750a8.chunk.js.map