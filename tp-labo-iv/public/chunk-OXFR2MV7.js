import{Aa as N,D as m,F as p,G as f,H as O,L as o,M as a,N as c,O as u,P as l,Q as C,U as r,V as x,W as T,ia as P,ja as b,la as S,q as A,ra as I,u as h,v as M,x as g,y as _}from"./chunk-Z643WCP7.js";function D(e,t){e&1&&c(0,"img",4)}function L(e,t){e&1&&c(0,"img",5)}function F(e,t){e&1&&c(0,"img",6)}function j(e,t){e&1&&c(0,"img",7)}function U(e,t){e&1&&c(0,"img",8)}function G(e,t){e&1&&c(0,"img",9)}function H(e,t){e&1&&c(0,"img",10)}function J(e,t){if(e&1){let n=u();o(0,"div",17)(1,"button",18),l("click",function(){let i=g(n).$implicit,d=C();return _(d.comprobarExistenciaLetra(i))}),r(2),a()()}if(e&2){let n=t.$implicit;m(2),x(n)}}function z(e,t){if(e&1){let n=u();o(0,"div",17)(1,"button",18),l("click",function(){let i=g(n).$implicit,d=C();return _(d.comprobarExistenciaLetra(i))}),r(2),a()()}if(e&2){let n=t.$implicit;m(2),x(n)}}function B(e,t){if(e&1){let n=u();o(0,"div",19)(1,"div",20)(2,"h2"),r(3,"GAME OVER"),a(),o(4,"button",21),l("click",function(){g(n);let i=C();return _(i.volverAIntentar())}),r(5,"VOLVER A INTENTAR"),a()()()}}function $(e,t){if(e&1){let n=u();o(0,"div",19)(1,"div",20)(2,"h2"),r(3,"HAS GANADO!"),a(),o(4,"button",21),l("click",function(){g(n);let i=C();return _(i.volverAIntentar())}),r(5,"VOLVER A JUGAR"),a()()()}}var v=class e{palabrasDisponibles=["VERANO","OTO\xD1O","INVIERNO","PRIMAVERA","SOL","LUNA","ESTRELLA","GALAXIA","MONTANA","RIO","MAR","OCEANO","ARBOL","FLOR","PLANTA","JARDIN","ANIMAL","PERRO","GATO","PAJARO","FELIZ","TRISTE","SONRISA","RISA","AMIGO","FAMILIA","CIELO","TIERRA","AGUA","FUEGO","VIENTO","NIEVE","CARNIVAL","FIESTA","BAILE","CANCION","LIBRO","PELICULA","JUEGO","DIVERSION","DIA","NOCHE","TIEMPO","HORA","HOGAR","CAMA","COMIDA","BEBIDA","MUSICA","ARTE","CULTURA","HISTORIA","RUTA","CAMINO","AVION","TREN","COSTUMBRES","TRADICIONES","VACACIONES","RECUERDOS"];palabraAAdivinar;palabraAAdivinarDescompuesta;cantidadErrores=0;letras="ABCDEFGHIJKLMN\xD1OPQRSTUVWXYZ".split("");palabraExhibida;victoria=!1;constructor(){}ngOnInit(){this.elegirPalabraRandom()}elegirPalabraRandom(){let t=Math.floor(Math.random()*this.palabrasDisponibles.length);this.palabraAAdivinar=this.palabrasDisponibles[t],console.log("Palabra a adivinar: "+this.palabraAAdivinar),this.palabraAAdivinarDescompuesta=this.palabraAAdivinar.split(""),this.palabraExhibida=this.palabraAAdivinarDescompuesta.map(()=>"_").join(" ")}comprobarExistenciaLetra(t){this.palabraAAdivinar.includes(t)?(this.palabraExhibida=this.palabraAAdivinarDescompuesta.map((n,s)=>n===t?t:this.palabraExhibida.split(" ")[s]).join(" "),this.verificarVictoria()):this.cantidadErrores++}verificarVictoria(){this.palabraExhibida.replace(/\s+/g,"")===this.palabraAAdivinar&&(this.victoria=!0)}volverAIntentar(){this.cantidadErrores=0,this.elegirPalabraRandom(),this.victoria=!1}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=h({type:e,selectors:[["app-ahorcado"]],decls:27,vars:6,consts:[[1,"banner"],[1,"ahorcado-main"],[1,"horca-palabra"],[1,"horca"],["src","/assets/img/ahorcado0.png"],["src","/assets/img/ahorcado1.png"],["src","/assets/img/ahorcado2.png"],["src","/assets/img/ahorcado3.png"],["src","/assets/img/ahorcado4.png"],["src","/assets/img/ahorcado5.png"],["src","/assets/img/ahorcado6.png"],[1,"palabra"],[1,"letras"],[1,"elige"],[1,"row","justify-content-center"],["class","col-auto",4,"ngFor","ngForOf"],["class","overlay",4,"ngIf"],[1,"col-auto"],["type","button",1,"btn","btn-danger","m-2","letra-btn",3,"click"],[1,"overlay"],[1,"game-over"],[1,"btn","btn-danger","m-1","p-3",3,"click"]],template:function(n,s){if(n&1&&(o(0,"section")(1,"div",0)(2,"h2"),r(3,"AHORCADO"),a()()(),o(4,"section",1)(5,"div",2)(6,"div",3),p(7,D,1,0,"img",4)(8,L,1,0,"img",5)(9,F,1,0,"img",6)(10,j,1,0,"img",7)(11,U,1,0,"img",8)(12,G,1,0,"img",9)(13,H,1,0,"img",10),a(),o(14,"div",11)(15,"p"),r(16),a()()(),o(17,"div",12)(18,"div",13)(19,"h3"),r(20,"ELIGE UNA LETRA"),a()(),o(21,"div",14),p(22,J,3,1,"div",15),a(),o(23,"div",14),p(24,z,3,1,"div",15),a()()(),p(25,B,6,0,"div",16)(26,$,6,0,"div",16)),n&2){let i;m(7),O((i=s.cantidadErrores)===0?7:i===1?8:i===2?9:i===3?10:i===4?11:i===5?12:i===6?13:-1),m(9),x(s.palabraExhibida),m(6),f("ngForOf",s.letras.slice(0,14)),m(2),f("ngForOf",s.letras.slice(14)),m(),f("ngIf",s.cantidadErrores===6),m(),f("ngIf",s.victoria)}},dependencies:[P,b],styles:[".ahorcado-main[_ngcontent-%COMP%]{padding:10px;display:flex;flex-direction:column}.horca-palabra[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:50%}.horca[_ngcontent-%COMP%]{display:flex;flex:60%;justify-content:center;align-items:center}.palabra[_ngcontent-%COMP%]{color:#fff;display:flex;flex:40%;justify-content:center;align-items:center}.palabra[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Ubuntu;font-size:4rem;white-space:pre}.letras[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{display:flex;margin-top:20px;margin-bottom:20px;justify-content:center;align-items:center}.letra-btn[_ngcontent-%COMP%]{width:60px;height:60px;font-size:1.5rem}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000000b3;display:flex;justify-content:center;align-items:center;z-index:1000;animation:_ngcontent-%COMP%_fadeIn .5s}.game-over[_ngcontent-%COMP%]{background-color:#1c1b1b;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 10px #00000080;animation:_ngcontent-%COMP%_popUp .5s}.game-over[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:30px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_popUp{0%{transform:scale(.7)}to{transform:scale(1)}}"]})};function X(e,t){e&1&&c(0,"img",4)}function Y(e,t){e&1&&c(0,"img",5)}function Z(e,t){e&1&&c(0,"img",6)}function K(e,t){e&1&&c(0,"img",7)}function Q(e,t){e&1&&c(0,"img",8)}function W(e,t){e&1&&c(0,"img",9)}function q(e,t){e&1&&c(0,"img",10)}function ee(e,t){e&1&&c(0,"img",11)}function te(e,t){e&1&&c(0,"img",12)}function ne(e,t){e&1&&c(0,"img",13)}function ie(e,t){e&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F\u2764\uFE0F"),a())}function oe(e,t){e&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F\u2764\uFE0F"),a())}function ae(e,t){e&1&&(o(0,"p"),r(1,"VIDAS: \u2764\uFE0F"),a())}function re(e,t){e&1&&(o(0,"p"),r(1,"VIDAS: \u{1F494}"),a())}function se(e,t){if(e&1){let n=u();o(0,"div",20)(1,"div",21)(2,"h2"),r(3,"GAME OVER"),a(),o(4,"button",22),l("click",function(){g(n);let i=C();return _(i.volverAIntentar())}),r(5,"VOLVER A INTENTAR"),a()()()}}function ce(e,t){if(e&1){let n=u();o(0,"div",20)(1,"div",21)(2,"h2"),r(3,"HAS GANADO!"),a(),o(4,"button",22),l("click",function(){g(n);let i=C();return _(i.volverAIntentar())}),r(5,"VOLVER A JUGAR"),a()()()}}var y=class e{ronda=1;vidas=3;puntaje=0;cartasOrdenadasRandom;resultado;constructor(){}ngOnInit(){this.generarCartasOrdenadasRandom()}generarCartasOrdenadasRandom(){this.cartasOrdenadasRandom=Array.from({length:10},(t,n)=>n+1).sort(()=>Math.random()-.5),console.log("ORDEN: "+this.cartasOrdenadasRandom)}comprobarMayorOMenor(t){switch(this.resultado=!1,t){case 0:this.cartasOrdenadasRandom[this.ronda]<this.cartasOrdenadasRandom[this.ronda-1]&&(this.resultado=!0);break;case 1:this.cartasOrdenadasRandom[this.ronda]>this.cartasOrdenadasRandom[this.ronda-1]&&(this.resultado=!0);break}return this.resultado?this.puntaje++:this.vidas--,this.ronda++,this.resultado}volverAIntentar(){this.ronda=1,this.vidas=3,this.puntaje=0,this.generarCartasOrdenadasRandom()}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=h({type:e,selectors:[["app-mayor-o-menor"]],decls:35,vars:5,consts:[[1,"banner"],[1,"mayor-main"],[1,"carta-estado"],[1,"carta"],["src","/assets/img/carta1.png"],["src","/assets/img/carta2.png"],["src","/assets/img/carta3.png"],["src","/assets/img/carta4.png"],["src","/assets/img/carta5.png"],["src","/assets/img/carta6.png"],["src","/assets/img/carta7.png"],["src","/assets/img/carta8.png"],["src","/assets/img/carta9.png"],["src","/assets/img/carta10.png"],[1,"estado"],[1,"opciones"],[1,"elige"],[1,"botones"],["type","button",1,"btn","btn-danger","m-2","opcion-btn",3,"click"],["class","overlay",4,"ngIf"],[1,"overlay"],[1,"game-over"],[1,"btn","btn-danger","m-1","p-3",3,"click"]],template:function(n,s){if(n&1&&(o(0,"section")(1,"div",0)(2,"h2"),r(3,"MAYOR O MENOR"),a()()(),o(4,"section",1)(5,"div",2)(6,"div",3),p(7,X,1,0,"img",4)(8,Y,1,0,"img",5)(9,Z,1,0,"img",6)(10,K,1,0,"img",7)(11,Q,1,0,"img",8)(12,W,1,0,"img",9)(13,q,1,0,"img",10)(14,ee,1,0,"img",11)(15,te,1,0,"img",12)(16,ne,1,0,"img",13),a(),o(17,"div",14),p(18,ie,2,0,"p")(19,oe,2,0,"p")(20,ae,2,0,"p")(21,re,2,0,"p"),o(22,"p"),r(23),a()()(),o(24,"div",15)(25,"div",16)(26,"h3"),r(27,"ADIVINA LA PROXIMA CARTA"),a()(),o(28,"div",17)(29,"button",18),l("click",function(){return s.comprobarMayorOMenor(0)}),r(30," MENOR "),a(),o(31,"button",18),l("click",function(){return s.comprobarMayorOMenor(1)}),r(32," MAYOR "),a()()()(),p(33,se,6,0,"div",19)(34,ce,6,0,"div",19)),n&2){let i,d;m(7),O((i=s.cartasOrdenadasRandom[s.ronda-1])===1?7:i===2?8:i===3?9:i===4?10:i===5?11:i===6?12:i===7?13:i===8?14:i===9?15:i===10?16:-1),m(11),O((d=s.vidas)===3?18:d===2?19:d===1?20:d===0?21:-1),m(5),T("PUNTAJE: ",s.puntaje,"/10"),m(10),f("ngIf",s.vidas===0),m(),f("ngIf",s.ronda===10)}},dependencies:[b],styles:[".mayor-main[_ngcontent-%COMP%]{display:flex;flex-direction:column}.carta-estado[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:50%}.carta[_ngcontent-%COMP%]{padding:20px;display:flex;flex:60%;justify-content:center;align-items:center}.carta[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:400px;width:auto;height:auto}.estado[_ngcontent-%COMP%]{background-image:url(/assets/img/card-bg-juegos.png);background-repeat:no-repeat;background-size:cover;color:#fff;display:flex;flex-direction:column;justify-content:space-evenly;flex:40%;justify-content:center;align-items:center}.estado[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Ubuntu;font-size:3rem}.opciones[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:30px;margin-bottom:30px}.opciones[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:20px}.opcion-btn[_ngcontent-%COMP%]{height:60px;font-size:1.5rem}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000000b3;display:flex;justify-content:center;align-items:center;z-index:1000;animation:_ngcontent-%COMP%_fadeIn .5s}.game-over[_ngcontent-%COMP%]{background-color:#1c1b1b;padding:40px;border-radius:10px;text-align:center;box-shadow:0 0 10px #00000080;animation:_ngcontent-%COMP%_popUp .5s}.game-over[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:30px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_popUp{0%{transform:scale(.7)}to{transform:scale(1)}}"]})};var me=[{path:"ahorcado",component:v},{path:"mayor-o-menor",component:y}],E=class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=M({type:e});static \u0275inj=A({imports:[I.forChild(me),I]})};var V=class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=M({type:e});static \u0275inj=A({imports:[S,E,N]})};export{V as JuegosModule};