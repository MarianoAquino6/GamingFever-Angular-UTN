import{E as O,F as s,G as A,H as d,Ha as Y,I as u,J as g,N as o,O as a,P as f,Q as N,R as b,S as m,T as l,X as r,Y as B,Z as p,ka as J,la as v,n as I,na as K,o as $,oa as L,pa as Q,q as S,qa as y,r as P,sa as X,t as T,v as x,w as k,y as _,ya as z,z as h}from"./chunk-RNHN6RD7.js";function ee(n,e){n&1&&f(0,"img",4)}function te(n,e){n&1&&f(0,"img",5)}function ne(n,e){n&1&&f(0,"img",6)}function ie(n,e){n&1&&f(0,"img",7)}function oe(n,e){n&1&&f(0,"img",8)}function ae(n,e){n&1&&f(0,"img",9)}function re(n,e){n&1&&f(0,"img",10)}function ce(n,e){if(n&1){let t=b();o(0,"button",22),m("click",function(){_(t);let c=l().$implicit,C=l();return h(C.comprobarExistenciaLetra(c))}),r(1),a()}if(n&2){let t=l().$implicit;s(),p(" ",t," ")}}function se(n,e){if(n&1){let t=b();o(0,"button",23),m("click",function(){_(t);let c=l().$implicit,C=l();return h(C.comprobarExistenciaLetra(c))}),r(1),a()}if(n&2){let t=l().$implicit;s(),p(" ",t," ")}}function le(n,e){if(n&1&&(o(0,"div",19),d(1,ce,2,1,"button",20)(2,se,2,1,"button",21),a()),n&2){let t=e.$implicit,i=l();s(),g(i.letrasDescubiertas.includes(t)?1:2)}}function pe(n,e){if(n&1){let t=b();o(0,"button",22),m("click",function(){_(t);let c=l().$implicit,C=l();return h(C.comprobarExistenciaLetra(c))}),r(1),a()}if(n&2){let t=l().$implicit;s(),p(" ",t," ")}}function me(n,e){if(n&1){let t=b();o(0,"button",23),m("click",function(){_(t);let c=l().$implicit,C=l();return h(C.comprobarExistenciaLetra(c))}),r(1),a()}if(n&2){let t=l().$implicit;s(),p(" ",t," ")}}function de(n,e){if(n&1&&(o(0,"div",19),d(1,pe,2,1,"button",20)(2,me,2,1,"button",21),a()),n&2){let t=e.$implicit,i=l();s(),g(i.letrasDescubiertas.includes(t)?1:2)}}function ue(n,e){if(n&1){let t=b();o(0,"div",24)(1,"div",25)(2,"h2"),r(3,"GAME OVER"),a(),o(4,"p"),r(5),a(),o(6,"button",26),m("click",function(){_(t);let c=l();return h(c.volverAIntentar(!0))}),r(7,"VOLVER A INTENTAR"),a()()()}if(n&2){let t=l();s(5),p("Tu puntaje: ",t.puntaje,"")}}function ge(n,e){if(n&1){let t=b();o(0,"div",24)(1,"div",25)(2,"h2"),r(3,"HAS GANADO!"),a(),o(4,"p"),r(5),a(),o(6,"button",26),m("click",function(){_(t);let c=l();return h(c.volverAIntentar(!1))}),r(7,"SEGUIR JUGANDO"),a()()()}if(n&2){let t=l();s(5),p("Tu puntaje: ",t.puntaje,"")}}var w=class n{palabrasDisponibles=["VERANO","OTO\xD1O","INVIERNO","PRIMAVERA","SOL","LUNA","ESTRELLA","GALAXIA","MONTANA","RIO","MAR","OCEANO","ARBOL","FLOR","PLANTA","JARDIN","ANIMAL","PERRO","GATO","PAJARO","FELIZ","TRISTE","SONRISA","RISA","AMIGO","FAMILIA","CIELO","TIERRA","AGUA","FUEGO","VIENTO","NIEVE","CARNIVAL","FIESTA","BAILE","CANCION","LIBRO","PELICULA","JUEGO","DIVERSION","DIA","NOCHE","TIEMPO","HORA","HOGAR","CAMA","COMIDA","BEBIDA","MUSICA","ARTE","CULTURA","HISTORIA","RUTA","CAMINO","AVION","TREN","COSTUMBRES","TRADICIONES","VACACIONES","RECUERDOS"];palabraAAdivinar;palabraAAdivinarDescompuesta;cantidadErrores=0;letras="ABCDEFGHIJKLMN\xD1OPQRSTUVWXYZ".split("");palabraExhibida;victoria=!1;puntaje=0;letrasDescubiertas=[];constructor(){}ngOnInit(){this.elegirPalabraRandom(),this.precargarImagenes()}precargarImagenes(){["/assets/img/ahorcado0.png","/assets/img/ahorcado1.png","/assets/img/ahorcado2.png","/assets/img/ahorcado3.png","/assets/img/ahorcado4.png","/assets/img/ahorcado5.png","/assets/img/ahorcado6.png"].forEach(t=>{let i=new Image;i.src=t})}elegirPalabraRandom(){let e=Math.floor(Math.random()*this.palabrasDisponibles.length);this.palabraAAdivinar=this.palabrasDisponibles[e],console.log("Palabra a adivinar: "+this.palabraAAdivinar),this.palabraAAdivinarDescompuesta=this.palabraAAdivinar.split(""),this.palabraExhibida=this.palabraAAdivinarDescompuesta.map(()=>"_").join(" ")}comprobarExistenciaLetra(e){this.palabraAAdivinar.includes(e)?(this.palabraExhibida=this.palabraAAdivinarDescompuesta.map((t,i)=>t===e?e:this.palabraExhibida.split(" ")[i]).join(" "),this.letrasDescubiertas.includes(e)||(this.letrasDescubiertas.push(e),this.puntaje++),this.verificarVictoria()):this.cantidadErrores++}verificarVictoria(){this.palabraExhibida.replace(/\s+/g,"")===this.palabraAAdivinar&&(this.victoria=!0)}volverAIntentar(e){this.cantidadErrores=0,this.elegirPalabraRandom(),this.victoria=!1,this.letrasDescubiertas=[],e&&(this.puntaje=0)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=x({type:n,selectors:[["app-ahorcado"]],decls:31,vars:7,consts:[[1,"banner"],[1,"ahorcado-main"],[1,"horca-palabra"],[1,"horca"],["src","/assets/img/ahorcado0.png"],["src","/assets/img/ahorcado1.png"],["src","/assets/img/ahorcado2.png"],["src","/assets/img/ahorcado3.png"],["src","/assets/img/ahorcado4.png"],["src","/assets/img/ahorcado5.png"],["src","/assets/img/ahorcado6.png"],[1,"puntaje-palabra"],[1,"puntaje"],[1,"palabra"],[1,"letras"],[1,"elige"],[1,"row","justify-content-center"],["class","col-auto",4,"ngFor","ngForOf"],["class","overlay",4,"ngIf"],[1,"col-auto"],["type","button",1,"btn","btn-success","m-2","letra-btn"],["type","button",1,"btn","btn-danger","m-2","letra-btn"],["type","button",1,"btn","btn-success","m-2","letra-btn",3,"click"],["type","button",1,"btn","btn-danger","m-2","letra-btn",3,"click"],[1,"overlay"],[1,"game-over"],[1,"btn","btn-danger","m-1","p-3",3,"click"]],template:function(t,i){if(t&1&&(o(0,"section")(1,"div",0)(2,"h2"),r(3,"AHORCADO"),a()()(),o(4,"section",1)(5,"div",2)(6,"div",3),d(7,ee,1,0,"img",4)(8,te,1,0,"img",5)(9,ne,1,0,"img",6)(10,ie,1,0,"img",7)(11,oe,1,0,"img",8)(12,ae,1,0,"img",9)(13,re,1,0,"img",10),a(),o(14,"div",11)(15,"div",12)(16,"p"),r(17),a()(),o(18,"div",13)(19,"p"),r(20),a()()()(),o(21,"div",14)(22,"div",15)(23,"h3"),r(24,"ELIGE UNA LETRA"),a()(),o(25,"div",16),d(26,le,3,1,"div",17),a(),o(27,"div",16),d(28,de,3,1,"div",17),a()()(),d(29,ue,8,1,"div",18)(30,ge,8,1,"div",18)),t&2){let c;s(7),g((c=i.cantidadErrores)===0?7:c===1?8:c===2?9:c===3?10:c===4?11:c===5?12:c===6?13:-1),s(10),p("PUNTAJE: ",i.puntaje,""),s(3),B(i.palabraExhibida),s(6),u("ngForOf",i.letras.slice(0,14)),s(2),u("ngForOf",i.letras.slice(14)),s(),u("ngIf",i.cantidadErrores===6),s(),u("ngIf",i.victoria)}},dependencies:[J,v],styles:[".ahorcado-main[_ngcontent-%COMP%]{padding:10px;display:flex;flex-direction:column}.horca-palabra[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:50%}.horca[_ngcontent-%COMP%]{display:flex;flex:60%;justify-content:center;align-items:center}.puntaje-palabra[_ngcontent-%COMP%]{color:#fff;display:flex;flex:40%;justify-content:center;align-items:center;flex-direction:column}.puntaje[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Ubuntu;font-size:4rem;white-space:pre}.palabra[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:10px;font-family:Ubuntu;font-size:4rem;white-space:pre}.letras[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{display:flex;margin-top:20px;margin-bottom:20px;justify-content:center;align-items:center}.letra-btn[_ngcontent-%COMP%]{width:60px;height:60px;font-size:1.5rem}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000000b3;display:flex;justify-content:center;align-items:center;z-index:1000;animation:_ngcontent-%COMP%_fadeIn .5s}.game-over[_ngcontent-%COMP%]{background-color:#1c1b1b;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 10px #00000080;animation:_ngcontent-%COMP%_popUp .5s}.game-over[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:20px;font-family:Ubuntu;font-size:2rem;white-space:pre}.game-over[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:30px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_popUp{0%{transform:scale(.7)}to{transform:scale(1)}}"]})};function fe(n,e){if(n&1&&f(0,"img",12),n&2){let t=l();u("src",t.cartaActual.image,O)}}function _e(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F\u2764\uFE0F"),a())}function he(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F"),a())}function be(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F"),a())}function Ce(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u{1F494}"),a())}function xe(n,e){if(n&1){let t=b();o(0,"div",13)(1,"div",14)(2,"h2"),r(3,"GAME OVER"),a(),o(4,"p"),r(5),a(),o(6,"button",15),m("click",function(){_(t);let c=l();return h(c.volverAIntentar())}),r(7,"VOLVER A INTENTAR"),a()()()}if(n&2){let t=l();s(5),p("Tu puntaje: ",t.puntaje,"")}}var R=class n{constructor(e){this.http=e}vidas=3;puntaje=0;deckId="";cartaActual;cartaAnterior;ngOnInit(){this.obtenerNuevoMazo()}obtenerNuevoMazo(){this.http.get("https://deckofcardsapi.com/api/deck/new/shuffle/").subscribe(e=>{this.deckId=e.deck_id,this.dibujarCarta()})}dibujarCarta(){this.http.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`).subscribe(e=>{this.cartaAnterior=this.cartaActual,this.cartaActual=e.cards[0]})}comprobarMayorOMenor(e){if(!this.cartaAnterior){this.dibujarCarta();return}let t=this.obtenerValorNumerico(this.cartaActual.value),i=this.obtenerValorNumerico(this.cartaAnterior.value);e===0&&t<i||e===1&&t>i?this.puntaje++:this.vidas--,this.vidas>0&&this.dibujarCarta()}obtenerValorNumerico(e){switch(e){case"ACE":return 1;case"JACK":return 11;case"QUEEN":return 12;case"KING":return 13;default:return parseInt(e)}}volverAIntentar(){this.vidas=3,this.puntaje=0,this.obtenerNuevoMazo()}static \u0275fac=function(t){return new(t||n)(A(y))};static \u0275cmp=x({type:n,selectors:[["app-mayor-o-menor"]],decls:26,vars:4,consts:[[1,"banner"],[1,"mayor-main"],[1,"carta-estado"],[1,"carta"],["alt","Carta actual",3,"src",4,"ngIf"],[1,"estado"],[1,"opciones"],[1,"elige"],[1,"botones"],["type","button","aria-label","Elegir menor",1,"btn","btn-danger","m-2","opcion-btn",3,"click"],["type","button","aria-label","Elegir mayor",1,"btn","btn-danger","m-2","opcion-btn",3,"click"],["class","overlay",4,"ngIf"],["alt","Carta actual",3,"src"],[1,"overlay"],[1,"game-over"],[1,"btn","btn-danger","m-1","p-3",3,"click"]],template:function(t,i){if(t&1&&(o(0,"section")(1,"div",0)(2,"h2"),r(3,"MAYOR O MENOR"),a()()(),o(4,"section",1)(5,"div",2)(6,"div",3),d(7,fe,1,1,"img",4),a(),o(8,"div",5),d(9,_e,2,0,"p")(10,he,2,0,"p")(11,be,2,0,"p")(12,Ce,2,0,"p"),o(13,"p"),r(14),a()()()(),o(15,"section")(16,"div",6)(17,"div",7)(18,"h3"),r(19,"ADIVINA LA PROXIMA CARTA"),a()(),o(20,"div",8)(21,"button",9),m("click",function(){return i.comprobarMayorOMenor(0)}),r(22," MENOR "),a(),o(23,"button",10),m("click",function(){return i.comprobarMayorOMenor(1)}),r(24," MAYOR "),a()()()(),d(25,xe,8,1,"div",11)),t&2){let c;s(7),u("ngIf",i.cartaActual),s(2),g((c=i.vidas)===3?9:c===2?10:c===1?11:c===0?12:-1),s(5),p("PUNTAJE: ",i.puntaje,""),s(11),u("ngIf",i.vidas===0)}},dependencies:[v],styles:[".mayor-main[_ngcontent-%COMP%]{display:flex;flex-direction:column}.carta-estado[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:50%}.carta[_ngcontent-%COMP%]{padding:20px;display:flex;flex:60%;justify-content:center;align-items:center}.carta[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:400px;width:auto;height:auto}.estado[_ngcontent-%COMP%]{background-image:url(/assets/img/card-bg-juegos.png);background-repeat:no-repeat;background-size:cover;color:#fff;display:flex;flex-direction:column;justify-content:space-evenly;flex:40%;justify-content:center;align-items:center}.estado[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Ubuntu;font-size:3rem}.opciones[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:30px;margin-bottom:30px}.opciones[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:20px}.opcion-btn[_ngcontent-%COMP%]{height:60px;font-size:1.5rem}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000000b3;display:flex;justify-content:center;align-items:center;z-index:1000;animation:_ngcontent-%COMP%_fadeIn .5s}.game-over[_ngcontent-%COMP%]{background-color:#1c1b1b;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 10px #00000080;animation:_ngcontent-%COMP%_popUp .5s}.game-over[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:20px;font-family:Ubuntu;font-size:2rem;white-space:pre}.game-over[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:30px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_popUp{0%{transform:scale(.7)}to{transform:scale(1)}}"]})};var j=class n{constructor(e){this.http=e}getPaises(){return this.http.get("https://restcountries.com/v3.1/all").pipe(I(e=>e.map(t=>({nombre:t.translations?.spa?.common||t.name.common,bandera:t.flags.png}))))}static \u0275fac=function(t){return new(t||n)(T(y))};static \u0275prov=S({token:n,factory:n.\u0275fac,providedIn:"root"})};function Oe(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F\u2764\uFE0F"),a())}function Me(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F"),a())}function Ae(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F"),a())}function ye(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u{1F494}"),a())}function Ee(n,e){n&1&&N(0)}function Ie(n,e){if(n&1&&d(0,Ee,1,0,"ng-container",11),n&2){let t=l();u("ngIf",t.verificarRespuesta("TIMEOUT"))}}function Se(n,e){if(n&1){let t=b();o(0,"div",10)(1,"div",12)(2,"h2"),r(3,"GAME OVER"),a(),o(4,"p"),r(5),a(),o(6,"button",13),m("click",function(){_(t);let c=l();return h(c.volverAIntentar())}),r(7,"VOLVER A INTENTAR"),a()()()}if(n&2){let t=l();s(5),p("Tu puntaje: ",t.puntaje,"")}}var V=class n{constructor(e){this.banderasService=e}vidas=3;puntaje=0;contador=10;intervalo;paises;subscripcion;opciones;numeroRandom;posicionPaisSeleccionado;primeraOpcion;segundaOpcion;terceraOpcion;cuartaOpcion;banderaPaisSeleccionado;ngOnInit(){this.obtenerPaises(),this.iniciarContador()}ngOnDestroy(){this.subscripcion&&this.subscripcion.unsubscribe(),clearInterval(this.intervalo)}iniciarContador(){this.intervalo=setInterval(()=>{this.contador>0?this.contador--:clearInterval(this.intervalo)},1e3)}obtenerPaises(){this.subscripcion=this.banderasService.getPaises().subscribe(e=>{this.paises=e,this.seleccionarAleatoreamentePais(),this.generarOpciones()})}seleccionarAleatoreamentePais(){let e=Math.floor(Math.random()*this.paises.length);this.posicionPaisSeleccionado=e,this.banderaPaisSeleccionado=this.paises[this.posicionPaisSeleccionado].bandera,console.log("El pa\xEDs elegido es "+this.paises[this.posicionPaisSeleccionado].nombre)}generarOpciones(){let e=new Set;for(;e.size<3;){let i=Math.floor(Math.random()*this.paises.length);e.add(i)}let t=Array.from(e);t.push(this.posicionPaisSeleccionado),this.shuffleArray(t),this.primeraOpcion=this.paises[t[0]].nombre,this.segundaOpcion=this.paises[t[1]].nombre,this.terceraOpcion=this.paises[t[2]].nombre,this.cuartaOpcion=this.paises[t[3]].nombre}shuffleArray(e){for(let t=e.length-1;t>0;t--){let i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}verificarRespuesta(e){console.log("La respuesta es: "+e+" y la correcta es "+this.paises[this.posicionPaisSeleccionado].nombre),e==this.paises[this.posicionPaisSeleccionado].nombre?this.puntaje++:this.vidas--,this.vidas>0?(this.seleccionarAleatoreamentePais(),this.generarOpciones(),this.contador=10):this.contador=0}volverAIntentar(){this.vidas=3,this.puntaje=0,this.seleccionarAleatoreamentePais(),this.generarOpciones(),this.contador=10}static \u0275fac=function(t){return new(t||n)(A(j))};static \u0275cmp=x({type:n,selectors:[["app-preguntados"]],decls:32,vars:10,consts:[[1,"banner"],[1,"preguntados-main"],[1,"bandera-estado"],[1,"bandera"],["alt","Bandera pais seleccionado",3,"src"],[1,"estado"],[1,"multiple-choice"],[1,"pregunta"],[1,"opciones"],["type","button",1,"btn","btn-danger","m-2","opcion-btn",3,"click"],[1,"overlay"],[4,"ngIf"],[1,"game-over"],[1,"btn","btn-danger","m-1","p-3",3,"click"]],template:function(t,i){if(t&1&&(o(0,"section")(1,"div",0)(2,"h2"),r(3,"PREGUNTADOS"),a()()(),o(4,"section",1)(5,"div",2)(6,"div",3),f(7,"img",4),a(),o(8,"div",5)(9,"p"),r(10),a(),d(11,Oe,2,0,"p")(12,Me,2,0,"p")(13,Ae,2,0,"p")(14,ye,2,0,"p"),o(15,"p"),r(16),a()()(),o(17,"div",6)(18,"div",7)(19,"h3"),r(20,"A QUE PAIS CORRESPONDE ESTA BANDERA?"),a()(),o(21,"div",8)(22,"button",9),m("click",function(){return i.verificarRespuesta(i.primeraOpcion)}),r(23),a(),o(24,"button",9),m("click",function(){return i.verificarRespuesta(i.segundaOpcion)}),r(25),a(),o(26,"button",9),m("click",function(){return i.verificarRespuesta(i.terceraOpcion)}),r(27),a(),o(28,"button",9),m("click",function(){return i.verificarRespuesta(i.cuartaOpcion)}),r(29),a()()()(),d(30,Ie,1,1,"ng-container")(31,Se,8,1,"div",10)),t&2){let c;s(7),u("src",i.banderaPaisSeleccionado,O),s(3),p("TIEMPO: ",i.contador,""),s(),g((c=i.vidas)===3?11:c===2?12:c===1?13:c===0?14:-1),s(5),p("PUNTAJE: ",i.puntaje,""),s(7),p(" ",i.primeraOpcion," "),s(2),p(" ",i.segundaOpcion," "),s(2),p(" ",i.terceraOpcion," "),s(2),p(" ",i.cuartaOpcion," "),s(),g(i.contador==0&&i.vidas>0?30:-1),s(),g(i.vidas===0?31:-1)}},dependencies:[v],styles:[".preguntados-main[_ngcontent-%COMP%]{display:flex;flex-direction:column}.bandera-estado[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:50%}.bandera[_ngcontent-%COMP%]{padding:20px;display:flex;flex:60%;justify-content:center;align-items:center;width:500px;height:400px;overflow:hidden}.bandera[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain;object-position:center}.estado[_ngcontent-%COMP%]{background-image:url(/assets/img/card-bg-juegos.png);background-repeat:no-repeat;background-size:cover;color:#fff;display:flex;flex-direction:column;justify-content:space-evenly;flex:40%;justify-content:center;align-items:center}.estado[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Ubuntu;font-size:3rem}.multiple-choice[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:30px;margin-bottom:30px}.pregunta[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:20px;font-size:1.7rem}.opciones[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;align-items:center}.opcion-btn[_ngcontent-%COMP%]{width:600px;font-size:1.5rem;background:linear-gradient(180deg,#b80000,#000);color:#fff;border:none;padding:7px;border-radius:10px;transition:transform .2s,box-shadow .2s,background .3s ease-in-out;font-family:Ubuntu,sans-serif;cursor:pointer;box-shadow:0 5px 15px #0000004d;background-size:200% 100%;background-position:right bottom}.opcion-btn[_ngcontent-%COMP%]:hover{transform:scale(1.05);box-shadow:0 8px 20px #00000080;background-position:left bottom}.opcion-btn[_ngcontent-%COMP%]:active{transform:scale(.98);background:linear-gradient(90deg,#8b0000,#000)}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000000b3;display:flex;justify-content:center;align-items:center;z-index:1000;animation:_ngcontent-%COMP%_fadeIn .5s}.game-over[_ngcontent-%COMP%]{background-color:#1c1b1b;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 10px #00000080;animation:_ngcontent-%COMP%_popUp .5s}.game-over[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:20px;font-family:Ubuntu;font-size:2rem;white-space:pre}.game-over[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:30px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_popUp{0%{transform:scale(.7)}to{transform:scale(1)}}"]})};var D=class n{constructor(e){this.http=e}albums=["Kill 'Em All (Remastered)","Ride The Lightning (Remastered)","Master Of Puppets (Remastered)","...And Justice For All (Remastered)","Load","Reload","Garage Inc.","St. Anger","Death Magnetic","Metallica (Remastered 2021)","72 Seasons"];getSpotifyToken(){let e="d03a386f1fb548c8b484765b4593f255",t="e5db683f5ea24bee868fab7281a69721",i=new Q().set("grant_type","client_credentials"),c=new L({Authorization:"Basic "+btoa(`${e}:${t}`),"Content-Type":"application/x-www-form-urlencoded"});return this.http.post("https://accounts.spotify.com/api/token",i.toString(),{headers:c})}getMetallicaSong(){return this.getSpotifyToken().pipe($(e=>{let t=e.access_token,i=new L({Authorization:`Bearer ${t}`}),c=50,C=Math.floor(Math.random()*1e3);return this.http.get(`https://api.spotify.com/v1/search?q=metallica&type=track&offset=${C}&limit=${c}`,{headers:i}).pipe(I(W=>W.tracks.items.filter(E=>this.albums.includes(E.album.name)).slice(0,40).map(E=>({titulo:E.name,album:E.album.images[0]?.url,audio:E.preview_url}))))}))}static \u0275fac=function(t){return new(t||n)(T(y))};static \u0275prov=S({token:n,factory:n.\u0275fac,providedIn:"root"})};function Te(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F\u2764\uFE0F"),a())}function ke(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F"),a())}function Ne(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F"),a())}function we(n,e){n&1&&(o(0,"p"),r(1,"VIDAS: \u{1F494}"),a())}function Re(n,e){n&1&&N(0)}function je(n,e){if(n&1&&d(0,Re,1,0,"ng-container",12),n&2){let t=l();u("ngIf",t.verificarRespuesta("TIMEOUT"))}}function Ve(n,e){if(n&1){let t=b();o(0,"div",11)(1,"div",13)(2,"h2"),r(3,"GAME OVER"),a(),o(4,"p"),r(5),a(),o(6,"button",14),m("click",function(){_(t);let c=l();return h(c.volverAIntentar())}),r(7,"VOLVER A INTENTAR"),a()()()}if(n&2){let t=l();s(5),p("Tu puntaje: ",t.puntaje,"")}}var F=class n{constructor(e){this.cancionesService=e}vidas=3;puntaje=0;contador=10;intervalo;cancionesMetallica;posicionCancionSeleccionada;subscripcion;opciones;numeroRandom;primeraOpcion;segundaOpcion;terceraOpcion;cuartaOpcion;imagenAlbumCancionSeleccionada;tituloCancionSeleccionada;audioCancionSeleccionada;cancionesSeleccionadas=new Set;ngOnInit(){this.obtenerCanciones()}obtenerCanciones(){this.subscripcion=this.cancionesService.getMetallicaSong().subscribe(e=>{this.cancionesMetallica=e,this.seleccionarAleatoreamenteCancion(),this.generarOpciones(),this.iniciarContador()},e=>{console.error("Error al obtener canciones: ",e)})}ngOnDestroy(){this.subscripcion&&this.subscripcion.unsubscribe(),clearInterval(this.intervalo)}iniciarContador(){this.intervalo&&clearInterval(this.intervalo),this.intervalo=setInterval(()=>{this.contador>0?this.contador--:clearInterval(this.intervalo)},1e3)}seleccionarAleatoreamenteCancion(){if(this.cancionesMetallica&&this.cancionesMetallica.length>0){let e;do e=Math.floor(Math.random()*this.cancionesMetallica.length);while(this.cancionesSeleccionadas.has(e));let t=this.cancionesMetallica[e];t?(console.log("Canci\xF3n seleccionada:",t),t.album?(this.cancionesSeleccionadas.add(e),this.posicionCancionSeleccionada=e,this.imagenAlbumCancionSeleccionada=t.album,this.tituloCancionSeleccionada=t.titulo,this.audioCancionSeleccionada=t.audio,console.log("La canci\xF3n elegida es "+this.tituloCancionSeleccionada)):console.error("La canci\xF3n seleccionada no tiene un \xE1lbum definido.")):console.error("No se pudo seleccionar una canci\xF3n.")}else console.error("No se encontraron canciones.")}generarOpciones(){let e=new Set;for(;e.size<3;){let i=Math.floor(Math.random()*this.cancionesMetallica.length);i!==this.posicionCancionSeleccionada&&!e.has(i)&&e.add(i)}let t=Array.from(e);t.push(this.posicionCancionSeleccionada),this.shuffleArray(t),this.primeraOpcion=this.cancionesMetallica[t[0]].titulo,this.segundaOpcion=this.cancionesMetallica[t[1]].titulo,this.terceraOpcion=this.cancionesMetallica[t[2]].titulo,this.cuartaOpcion=this.cancionesMetallica[t[3]].titulo}shuffleArray(e){for(let t=e.length-1;t>0;t--){let i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}verificarRespuesta(e){console.log("La respuesta es: "+e+" y la correcta es "+this.cancionesMetallica[this.posicionCancionSeleccionada].titulo),e==this.cancionesMetallica[this.posicionCancionSeleccionada].titulo?this.puntaje++:this.vidas--,this.vidas>0?(this.seleccionarAleatoreamenteCancion(),this.generarOpciones(),this.contador=10):this.contador=0}volverAIntentar(){this.vidas=3,this.puntaje=0,this.seleccionarAleatoreamenteCancion(),this.generarOpciones(),this.contador=10,this.cancionesSeleccionadas.clear()}static \u0275fac=function(t){return new(t||n)(A(D))};static \u0275cmp=x({type:n,selectors:[["app-namethesong"]],decls:33,vars:11,consts:[[1,"banner"],[1,"preguntados-main"],[1,"bandera-estado"],[1,"bandera"],["autoplay","",3,"src"],["alt","Bandera album cancion seleccionada",3,"src"],[1,"estado"],[1,"multiple-choice"],[1,"pregunta"],[1,"opciones"],["type","button",1,"btn","btn-danger","m-2","opcion-btn",3,"click"],[1,"overlay"],[4,"ngIf"],[1,"game-over"],[1,"btn","btn-danger","m-1","p-3",3,"click"]],template:function(t,i){if(t&1&&(o(0,"section")(1,"div",0)(2,"h2"),r(3,"NAME THE METALLICA SONG"),a()()(),o(4,"section",1)(5,"div",2)(6,"div",3),f(7,"audio",4)(8,"img",5),a(),o(9,"div",6)(10,"p"),r(11),a(),d(12,Te,2,0,"p")(13,ke,2,0,"p")(14,Ne,2,0,"p")(15,we,2,0,"p"),o(16,"p"),r(17),a()()(),o(18,"div",7)(19,"div",8)(20,"h3"),r(21,"COMO SE LLAMA LA CANCION?"),a()(),o(22,"div",9)(23,"button",10),m("click",function(){return i.verificarRespuesta(i.primeraOpcion)}),r(24),a(),o(25,"button",10),m("click",function(){return i.verificarRespuesta(i.segundaOpcion)}),r(26),a(),o(27,"button",10),m("click",function(){return i.verificarRespuesta(i.terceraOpcion)}),r(28),a(),o(29,"button",10),m("click",function(){return i.verificarRespuesta(i.cuartaOpcion)}),r(30),a()()()(),d(31,je,1,1,"ng-container")(32,Ve,8,1,"div",11)),t&2){let c;s(7),u("src",i.audioCancionSeleccionada,O),s(),u("src",i.imagenAlbumCancionSeleccionada,O),s(3),p("TIEMPO: ",i.contador,""),s(),g((c=i.vidas)===3?12:c===2?13:c===1?14:c===0?15:-1),s(5),p("PUNTAJE: ",i.puntaje,""),s(7),p(" ",i.primeraOpcion," "),s(2),p(" ",i.segundaOpcion," "),s(2),p(" ",i.terceraOpcion," "),s(2),p(" ",i.cuartaOpcion," "),s(),g(i.contador==0&&i.vidas>0?31:-1),s(),g(i.vidas===0?32:-1)}},dependencies:[v],styles:[".preguntados-main[_ngcontent-%COMP%]{display:flex;flex-direction:column}.bandera-estado[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:50%}.bandera[_ngcontent-%COMP%]{padding:20px;display:flex;flex:60%;justify-content:center;align-items:center;width:500px;height:400px;overflow:hidden}.bandera[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain;object-position:center}.estado[_ngcontent-%COMP%]{background-image:url(/assets/img/card-bg-juegos.png);background-repeat:no-repeat;background-size:cover;color:#fff;display:flex;flex-direction:column;justify-content:space-evenly;flex:40%;justify-content:center;align-items:center}.estado[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Ubuntu;font-size:3rem}.multiple-choice[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:30px;margin-bottom:30px}.pregunta[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:20px;font-size:1.7rem}.opciones[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;align-items:center}.opcion-btn[_ngcontent-%COMP%]{width:600px;font-size:1.5rem;background:linear-gradient(180deg,#b80000,#000);color:#fff;border:none;padding:7px;border-radius:10px;transition:transform .2s,box-shadow .2s,background .3s ease-in-out;font-family:Ubuntu,sans-serif;cursor:pointer;box-shadow:0 5px 15px #0000004d;background-size:200% 100%;background-position:right bottom}.opcion-btn[_ngcontent-%COMP%]:hover{transform:scale(1.05);box-shadow:0 8px 20px #00000080;background-position:left bottom}.opcion-btn[_ngcontent-%COMP%]:active{transform:scale(.98);background:linear-gradient(90deg,#8b0000,#000)}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000000b3;display:flex;justify-content:center;align-items:center;z-index:1000;animation:_ngcontent-%COMP%_fadeIn .5s}.game-over[_ngcontent-%COMP%]{background-color:#1c1b1b;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 10px #00000080;animation:_ngcontent-%COMP%_popUp .5s}.game-over[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:20px;font-family:Ubuntu;font-size:2rem;white-space:pre}.game-over[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:30px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_popUp{0%{transform:scale(.7)}to{transform:scale(1)}}"]})};var De=[{path:"ahorcado",component:w},{path:"mayor-o-menor",component:R},{path:"preguntados",component:V},{path:"name-the-song",component:F}],U=class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=k({type:n});static \u0275inj=P({imports:[z.forChild(De),z]})};var q=class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=k({type:n});static \u0275inj=P({imports:[K,U,Y,X]})};export{q as JuegosModule};
