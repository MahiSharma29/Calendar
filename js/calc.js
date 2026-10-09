/* calc.js – khagoliya ganana: tithi, nakshatra, yog, karan, maas, muhurat, tyohaar */
const RAD=Math.PI/180,nm=x=>((x%360)+360)%360,sgn=e=>e>180?e-360:e;
const jdOf=(y,m,d,h)=>Date.UTC(y,m,d)/864e5+2440587.5+(h-5.5)/24; // h = IST ghanta
function astro(jd){const T=(jd-2451545)/36525,s=Math.sin;
 const M=nm(357.5291092+35999.0502909*T)*RAD;
 const sun=nm(280.46646+36000.76983*T+1.914602*s(M)+0.019993*s(2*M));
 const D=nm(297.8501921+445267.1114034*T)*RAD,Mp=nm(134.9633964+477198.8675055*T)*RAD,F=nm(93.272095+483202.0175233*T)*RAD;
 const moon=nm(218.3164477+481267.88123421*T+6.289*s(Mp)+1.274*s(2*D-Mp)+0.658*s(2*D)+0.214*s(2*Mp)-0.186*s(M)-0.114*s(2*F)+0.059*s(2*D-2*Mp)+0.057*s(2*D-M-Mp)+0.053*s(2*D+Mp)+0.046*s(2*D-M)+0.041*s(Mp-M)-0.035*s(D)-0.031*s(M+Mp));
 const ay=23.857+1.3972*T; // Lahiri ayanamsha
 return{sun,moon,el:nm(moon-sun),ss:nm(sun-ay),ms:nm(moon-ay)}}
const fT=a=>Math.floor(a.el/12),fN=a=>Math.floor(a.ms/(360/27)),fY=a=>Math.floor(nm(a.ss+a.ms)/(360/27)),fK=a=>Math.floor(a.el/6);
function endOf(fn,jd){const v=fn(astro(jd));let t=jd;for(let i=0;i<220;i++){const n=t+1/96;if(fn(astro(n))!==v){let a=t,b=n;for(let k=0;k<22;k++){const mid=(a+b)/2;fn(astro(mid))===v?a=mid:b=mid}return b}t=n}return t}
function newMoon(g){let t=g;for(let i=0;i<6;i++)t-=sgn(astro(t).el)/12.19;return t}
let CT=CITIES[0],_cache=new Map();
function setCity(c){CT=c;_cache.clear()}
function sunTimes(y,m,d){ // [suryoday, suryast] IST ghante
 const n=Math.round((Date.UTC(y,m,d)-Date.UTC(y,0,0))/864e5),B=2*Math.PI*(n-81)/364;
 const eot=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B);
 const lam=astro(jdOf(y,m,d,12)).sun*RAD,dec=Math.asin(Math.sin(23.44*RAD)*Math.sin(lam)),la=CT[2]*RAD;
 const c=(Math.sin(-0.833*RAD)-Math.sin(la)*Math.sin(dec))/(Math.cos(la)*Math.cos(dec));
 const ha=Math.acos(Math.max(-1,Math.min(1,c)))/RAD/15,noon=12+(82.5-CT[3])/15-eot/60;
 return[noon-ha,noon+ha]}
function lunar(jd){const k=Math.round(jd*2e4);if(_cache.has(k))return _cache.get(k);
 const a=astro(jd),n1=newMoon(jd-a.el/12.19),n2=newMoon(n1+29.53);
 const s1=Math.floor(astro(n1).ss/30),s2=Math.floor(astro(n2).ss/30);
 const o={a,t:fT(a)+1,mi:(s1+1)%12,adhika:s1===s2};_cache.set(k,o);return o}
function norm(y,m,d){const D=new Date(Date.UTC(y,m,d));return[D.getUTCFullYear(),D.getUTCMonth(),D.getUTCDate()]}
function info(y,m,d){[y,m,d]=norm(y,m,d);const[sr,ss]=sunTimes(y,m,d),jd=jdOf(y,m,d,sr),L=lunar(jd);
 return{y,m,d,jd,sr,ss,...L,shukla:L.t<=15,wd:new Date(Date.UTC(y,m,d)).getUTCDay()}}
function samvat(i){const early=i.m<=3&&i.mi>=8;return[i.y+(early?56:57),i.y-(early?79:78)]}
function atMode(y,m,d,mode){[y,m,d]=norm(y,m,d);const[sr,ss]=sunTimes(y,m,d);
 if(mode==="sr")return lunar(jdOf(y,m,d,sr));
 if(mode==="md")return lunar(jdOf(y,m,d,(sr+ss)/2));
 if(mode==="ap")return lunar(jdOf(y,m,d,sr+(ss-sr)*0.7));
 if(mode==="pd")return lunar(jdOf(y,m,d,ss+1.25));
 const[sr2]=sunTimes(y,m,d+1);return lunar(jdOf(y,m,d,ss+(sr2+24-ss)/2))}
const nxt=t=>t%30+1,prv=t=>(t+28)%30+1;
function festsOf(y,m,d){const i=info(y,m,d),out=[];
 const cache={};const g=(dd,md)=>cache[dd+md]||(cache[dd+md]=atMode(y,m,d+dd,md));
 const named=new Set();
 for(const f of FEST){const md=f[5]||"sr",c=g(0,md),p=g(-1,md);let ok=false;
  if(c.t===f[1]&&p.t!==f[1]&&c.mi===f[0]&&!c.adhika)ok=true;
  else if(c.t===nxt(f[1])&&p.t===prv(f[1])&&p.mi===f[0]&&!p.adhika)ok=true;
  if(ok){out.push({n:[f[2],f[3]],k:"fest",r:f[4]});named.add(f[1])}}
 const s=g(0,"sr"),sp=g(-1,"sr"),pd=g(0,"pd"),pp=g(-1,"pd");
 const V=(h,e)=>out.push({n:[h,e],k:"vrat",r:"pan"});
 if((s.t===11||s.t===26)&&sp.t!==s.t&&!(named.has(11)))V("एकादशी व्रत","Ekadashi Vrat");
 if(s.t===15&&sp.t!==15&&!out.some(x=>x.k==="fest"&&/पूर्णिमा/.test(x.n[0])))V("पूर्णिमा","Purnima");
 if(s.t===30&&sp.t!==30&&!out.some(x=>/अमावस्या|दीपावली/.test(x.n[0])))V("अमावस्या","Amavasya");
 if((pd.t===13||pd.t===28)&&pp.t!==pd.t)V("प्रदोष व्रत","Pradosh Vrat");
 if(pd.t===19&&pp.t!==19&&!out.some(x=>/सकट|करवा/.test(x.n[0])))V("संकष्टी चतुर्थी","Sankashti Chaturthi");
 const sk=x=>Math.floor(astro(jdOf(...norm(y,m,d+x),sunTimes(...norm(y,m,d+x))[1])).ss/30);
 const k0=sk(0),kp=sk(-1),kn=sk(1);
 if(k0!==kp){const sp2=SANK_SPECIAL[k0];out.push(sp2?{n:[sp2[0],sp2[1]],k:"fest",r:"pan"}:{n:[RS[k0][0]+" संक्रान्ति",RS[k0][1].split(" ")[0]+" Sankranti"],k:"vrat",r:"pan"})}
 if(kn===9&&k0!==9)out.push({n:["लोहड़ी","Lohri"],k:"fest",r:"north"});
 if(i.wd===0&&fN(i.a)===7)out.push({n:["रवि पुष्य योग","Ravi Pushya Yoga"],k:"yoga",r:"pan"});
 if(i.wd===4&&fN(i.a)===7)out.push({n:["गुरु पुष्य योग","Guru Pushya Yoga"],k:"yoga",r:"pan"});
 return{i,list:out}}
/* Muhurat / Chaughadiya */
const RAHU=[8,2,7,5,6,4,3],YAMA=[5,4,3,2,1,7,6],GULI=[7,6,5,4,3,2,1],CH_FIRST=[0,3,6,2,5,1,4],CH_CLASS=["bad","neu","good","good","bad","good","bad"];
function muhurat(y,m,d){[y,m,d]=norm(y,m,d);const wd=new Date(Date.UTC(y,m,d)).getUTCDay(),[sr,ss]=sunTimes(y,m,d),[sr2]=sunTimes(y,m,d+1),dl=ss-sr,nl=sr2+24-ss;
 const part=k=>[sr+(k-1)*dl/8,sr+k*dl/8];
 const day=[],night=[];
 for(let k=0;k<8;k++)day.push({c:(CH_FIRST[wd]+k)%7,s:sr+k*dl/8,e:sr+(k+1)*dl/8});
 const nf=(CH_FIRST[wd]+5)%7;
 for(let k=0;k<8;k++)night.push({c:(nf+k)%7,s:ss+k*nl/8,e:ss+(k+1)*nl/8});
 return{wd,sr,ss,dl,rahu:part(RAHU[wd]),yama:part(YAMA[wd]),guli:part(GULI[wd]),abhijit:[sr+7*dl/15,sr+8*dl/15],brahma:[sr-1.6,sr-0.8],day,night}}
const overlap=(a,b)=>Math.min(a[1],b[1])-Math.max(a[0],b[0])>0.02;
if(typeof module!=="undefined")module.exports={info,festsOf,muhurat,astro,setCity,sunTimes,samvat,lunar};
