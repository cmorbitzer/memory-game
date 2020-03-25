(this["webpackJsonpmemory-game"]=this["webpackJsonpmemory-game"]||[]).push([[0],{29:function(e,t,a){e.exports=a(55)},39:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(13),o=a.n(c),i=a(8),s=(a(39),a(17)),l=a(11),u=a.n(l),m=a(21),d=a(22),p=a(15),f=a.n(p);a(42);f.a.initializeApp({apiKey:"AIzaSyDiaPYEVSwz33J4SKqO5ZaBj6aaaZY0wQ8",authDomain:"superior-speech-therapy.firebaseapp.com",databaseURL:"https://superior-speech-therapy.firebaseio.com",projectId:"superior-speech-therapy"});var v=f.a.firestore(),h=a(28),g=a(16),b=Object(g.b)({name:"game",initialState:null,reducers:{setGame:function(e,t){return t.payload},updateGameState:function(e,t){if(e){var a=Object.fromEntries(Object.entries(t.payload).map((function(e){var t=Object(h.a)(e,2);return["state."+t[0],t[1]]})));v.collection("games").doc(e.id).update(a)}return e}}}),E=b.actions,y=E.setGame,C=E.updateGameState,w=b.reducer;function O(e){return function(t){e.onSnapshot((function(a){var n=a.data()||null;n&&(n.id=e.id),t(y(n))}))}}var j=a(27),S=a.n(j),G=(a(52),a(53),function(e){return r.a.createElement("div",{onClick:e.onClick},e.selected?r.a.createElement("div",{className:"Card Card__front"},e.value):r.a.createElement("div",{className:"Card Card__back"}))});function _(e,t,a){var n=t.state.selectedCards;if(!(n.length>=2)&&(n=e===n[0]?[]:n.concat(e),a({selectedCards:n}),2===n.length)){var r=t.props.cards[n[0]]===t.props.cards[n[1]];setTimeout((function(){return function(e,t,a){var n,r={selectedCards:[]};e&&(r.matchedCards=(n=S.a.firestore.FieldValue).arrayUnion.apply(n,Object(s.a)(t)));a(r)}(r,n,a)}),2e3)}}var k={updateGameState:C},x=Object(i.b)(null,k)((function(e){var t=e.game,a=e.updateGameState;return r.a.createElement("div",{className:"Game"},r.a.createElement("div",{className:"Game__info"},r.a.createElement("h2",null,"Game ID: ",t.webId)),r.a.createElement("div",{className:"Game__table"},t&&t.props.cards.map((function(e,n){return r.a.createElement("div",{key:n.toString(),style:{order:t.props.order[n]}},-1===t.state.matchedCards.indexOf(n)&&r.a.createElement(G,{value:e,selected:t.state.selectedCards.indexOf(n)>-1,onClick:function(){return _(n,t,a)}}))}))))})),N=(a(54),{createGame:function(e,t){return function(){var a=Object(m.a)(u.a.mark((function a(n){var r,c,o,i;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return void 0===t&&(t={cards:Object(s.a)(Array(24)).map((function(e,t){return Math.floor(t/2).toString()})),order:Object(d.shuffle)(Object(d.range)(24))}),r={selectedCards:[],matchedCards:[]},c=Math.random().toString(36).substr(7).toUpperCase().padStart(6,"0"),o={type:e,webId:c,props:t,state:r},a.next=6,v.collection("games").add(o);case 6:i=a.sent,n(O(i));case 8:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},loadGame:function(e){return function(){var t=Object(m.a)(u.a.mark((function t(a){var n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.collection("games").where("webId","==",e).limit(1).get();case 2:(n=t.sent).empty||(r=n.docs[0].ref,a(O(r)));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}),I=Object(i.b)((function(e){return{game:e.game}}),N)((function(e){var t=e.game,a=e.createGame,n=e.loadGame;return r.a.createElement("div",{className:"App"},t?r.a.createElement(x,{game:t}):r.a.createElement("div",{className:"App__login"},r.a.createElement("div",{className:"App__login_input"},r.a.createElement("h2",null,"Enter your game code:"),r.a.createElement("input",{type:"text",maxLength:6,autoFocus:!0,autoComplete:"off",onChange:function(e){6===e.target.value.length&&n(e.target.value.toUpperCase())}})),r.a.createElement("div",null,r.a.createElement("a",{onClick:function(){return a("memory")}},r.a.createElement("small",null,"Start a new game")))))})),A={game:w},U=Object(g.a)({reducer:A});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,{store:U},r.a.createElement(I,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.e9a3e7eb.chunk.js.map