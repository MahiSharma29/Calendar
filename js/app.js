/* app.js – UI, bhasha (Hindi/English), calendar, panchang, muhurat, chaughadiya */
const $=id=>document.getElementById(id);
const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
let LANG=ls("lang")||"hi",REG=ls("reg")||"all",PUR=+(ls("pur")||0),CI=+(ls("city")||0);
if(!CITIES[CI])CI=0;setCity(CITIES[CI]);
const UI={
ttl:["हिन्दू पंचांग","Hindu Panchang"],stl:["तिथि · नक्षत्र · मुहूर्त · चौघड़िया · पर्व","Tithi · Nakshatra · Muhurat · Choghadiya · Festivals"],
amanta:["अमान्त मास","Amanta months"],purn:["पूर्णिमान्त मास","Purnimanta months"],theme:["◐ थीम","◐ Theme"],print:["🖨 प्रिंट","🖨 Print"],today:["आज","Today"],
tithi:["तिथि","Tithi"],nak:["नक्षत्र","Nakshatra"],yog:["योग","Yoga"],kar:["करण","Karana"],mrash:["चन्द्र राशि","Moon sign"],srash:["सूर्य राशि","Sun sign"],
sr:["सूर्योदय","Sunrise"],ss:["सूर्यास्त","Sunset"],sam:["विक्रम संवत् / शक","Vikram / Shaka Samvat"],till:["तक","till"],
sh:["शुक्ल","Shukla"],kr:["कृष्ण","Krishna"],pak:["पक्ष","Paksha"],mas:["मास","Maas"],adh:["अधिक","Adhika"],
mon:["आज","Today"],hero_t:["आज की तिथि","Today"],
chg:["चौघड़िया मुहूर्त","Choghadiya"],day:["दिन","Day"],night:["रात","Night"],
mu:["शुभ-अशुभ समय","Auspicious & inauspicious times"],good:["शुभ समय","Auspicious"],avoid:["त्याज्य समय","Avoid"],
rahu:["राहु काल","Rahu Kaal"],yama:["यमगण्ड","Yamaganda"],guli:["गुलिक काल","Gulika Kaal"],abh:["अभिजित मुहूर्त","Abhijit Muhurat"],brh:["ब्रह्म मुहूर्त","Brahma Muhurat"],
wed:["बुधवार को वर्जित","avoided on Wednesday"],ovl:["राहु काल से टकराव","overlaps Rahu Kaal"],
fh:["इस माह के पर्व व व्रत","Festivals & vrats this month"],none:["इस माह कोई पर्व नहीं (चयनित क्षेत्र में)","No festivals this month (for selected region)"],
leg:["चन्द्रमा की कला तिथि के अनुसार · लाल = पर्व · पीला = व्रत / संक्रान्ति / योग","Moon phase shows the tithi · red = festival · amber = vrat / sankranti / yoga"],
ft:["गणना खगोलीय सूत्रों (लाहिरी अयनांश) पर आधारित है। पर्व सूर्योदय / प्रदोष / निशीथ / मध्याह्न काल की तिथि से निकाले गए हैं; स्थानीय परम्परा या पंचांग भेद से 1 दिन का अन्तर सम्भव है। विवाह, गृह प्रवेश जैसे विशेष कार्यों के लिए अपने पंडित / प्रमाणिक पंचांग से मिलान करें।","Calculated from astronomical formulas (Lahiri ayanamsha). Festivals use the tithi at sunrise / pradosh / nishita / midday as per the rule for each; local traditions may differ by 1 day. For weddings, griha pravesh and other special rites, please confirm with your pandit or a published panchang."],
now:["अभी","Now"],more:["अधिक मास","Adhika Maas"]};
const U=k=>UI[k][LANG==="hi"?0:1],N=p=>p[LANG==="hi"?0:1];
const tName=t=>{const i=(t-1)%15;return i===14?(t<=15?[ "पूर्णिमा","Purnima"]:["अमावस्या","Amavasya"]):TN[i]};
const tFull=(i)=>`${U(i.shukla?"sh":"kr")} ${N(tName(i.t))}`;
const hmName=i=>{const x=PUR&&!i.shukla?(i.mi+1)%12:i.mi;return(i.adhika?U("adh")+" ":"")+N(HM[x])};
function fh(h){h=((h%24)+24)%24;let H=Math.floor(h),M=Math.round((h-H)*60);if(M===60){M=0;H=(H+1)%24}return`${((H+11)%12)+1}:${String(M).padStart(2,"0")} ${H>=12?"PM":"AM"}`}
const rng=r=>`${fh(r[0])} – ${fh(r[1])}`;
function fj(jd,ref){const x=new Date((jd-2440587.5)*864e5+5.5*36e5),H=x.getUTCHours(),M=String(x.getUTCMinutes()).padStart(2,"0");
 return`${((H+11)%12)+1}:${M} ${H>=12?"PM":"AM"}`+(x.getUTCDate()===ref?"":` (${x.getUTCDate()} ${N(GM[x.getUTCMonth()]).slice(0,3)})`)}
function moonSvg(el,sz){const r=10,w=el<180,e=w?el:360-el,rx=Math.abs(Math.cos(e*RAD)*r).toFixed(2),sw=e<90?0:1;
 const p=e<1?"":(e>179?`M0,-${r}A${r},${r} 0 1 1 0,${r}A${r},${r} 0 1 1 0,-${r}`:`M0,-${r}A${r},${r} 0 0 1 0,${r}A${rx},${r} 0 0 ${sw} 0,-${r}`);
 return`<svg width="${sz}" height="${sz}" viewBox="-11 -11 22 22" aria-hidden="true"><circle r="10" fill="var(--moon)" stroke="var(--line)"/><g transform="scale(${w?1:-1},1)"><path d="${p}" fill="var(--lit)"/></g></svg>`}
const inReg=f=>REG==="all"||f.r.includes("pan")||f.r.split(",").includes(REG);
const regTag=r=>{if(r==="pan")return"";const c=r.split(",")[0];const x=REGIONS.find(z=>z[0]===c);return x?`<span class="tag">${LANG==="hi"?x[1]:x[2]}</span>`:""};
const fests=(y,m,d)=>{const o=festsOf(y,m,d);o.list=o.list.filter(inReg);return o};
const now=new Date(),TODAY={y:now.getFullYear(),m:now.getMonth(),d:now.getDate()};
let vy=TODAY.y,vm=TODAY.m,S={...TODAY};
function istNow(){const n=new Date(Date.now()+5.5*36e5);return n.getUTCHours()+n.getUTCMinutes()/60}
function setupStatic(){
 document.documentElement.lang=LANG;document.title=`${U("ttl")} · Hindu Panchang`;
 $("ttl").textContent=U("ttl");$("stl").textContent=U("stl");$("lang").textContent=LANG==="hi"?"English":"हिन्दी";
 $("theme").textContent=U("theme");$("prt").textContent=U("print");$("td").textContent=U("today");$("leg").textContent=U("leg");$("ft").textContent=U("ft");$("fht").textContent=U("fh");
 $("city").innerHTML=CITIES.map((c,i)=>`<option value="${i}">${N(c)}</option>`).join("");$("city").value=CI;
 $("reg").innerHTML=REGIONS.map(r=>`<option value="${r[0]}">${LANG==="hi"?r[1]:r[2]}</option>`).join("");$("reg").value=REG;
 $("mode").innerHTML=`<option value="0">${U("amanta")}</option><option value="1">${U("purn")}</option>`;$("mode").value=PUR;
 $("mo").innerHTML=GM.map((n,i)=>`<option value="${i}">${N(n)}</option>`).join("");
 if(!$("yr").options.length){let s="";for(let y=1950;y<=2100;y++)s+=`<option>${y}</option>`;$("yr").innerHTML=s}}
function render(){
 const first=new Date(vy,vm,1).getDay(),dim=new Date(vy,vm+1,0).getDate();let h="";
 WDS.forEach(w=>h+=`<div class="dow">${N(w)}</div>`);for(let k=0;k<first;k++)h+=`<div class="cell out"></div>`;
 const list=[];
 for(let d=1;d<=dim;d++){const{i,list:fl}=fests(vy,vm,d),isT=TODAY.y===vy&&TODAY.m===vm&&TODAY.d===d,isS=S.y===vy&&S.m===vm&&S.d===d;
  const main=fl.find(x=>x.k==="fest")||fl.find(x=>x.k!=="fest");const lab=main?`<span class="f${main.k==="fest"?"":" v"}">${N(main.n)}</span>`:"";
  if(fl.length)list.push([d,fl]);
  h+=`<button class="cell${i.wd===0?" sun":""}${isT?" today":""}${isS?" sel":""}" data-d="${d}" aria-label="${d} ${N(GM[vm])}"><span class="n">${d}</span><span class="mp">${moonSvg(i.a.el,18)}</span><span class="t">${LANG==="hi"?(i.shukla?"शु. ":"कृ. "):(i.shukla?"S ":"K ")}${N(tName(i.t))}</span>${lab}</button>`}
 $("g").innerHTML=h;$("mt").textContent=`${N(GM[vm])} ${vy}`;
 const a=info(vy,vm,1),b=info(vy,vm,dim);
 $("ms").textContent=`${hmName(a)}${hmName(a)!==hmName(b)?" – "+hmName(b):""} · ${LANG==="hi"?"विक्रम संवत्":"Vikram Samvat"} ${samvat(b)[0]}`;
 $("mo").value=vm;$("yr").value=vy;
 $("fl").innerHTML=list.map(([d,fl])=>`<li data-d="${d}"><span class="d">${d} ${N(GM[vm]).slice(0,3)}</span><span>${fl.map(x=>`<div class="${x.k==="fest"?"":"v"}">${N(x.n)}${regTag(x.r)}</div>`).join("")}</span></li>`).join("")||`<li><small>${U("none")}</small></li>`;
 detail();hero()}
function detail(){const{y,m,d}=S,{i,list}=fests(y,m,d),a=i.a,jd=i.jd,M=muhurat(y,m,d);
 const tE=endOf(fT,jd),nE=endOf(fN,jd),yE=endOf(fY,jd),kE=endOf(fK,jd);
 const[vs,sk]=samvat(i),k=fK(a),kn=k===0?KRF[0]:k>=57?KRF[k-56]:KR[(k-1)%7];
 $("sd").innerHTML=`<div class="big">${moonSvg(a.el,64)}<div><h3 class="dv">${d} ${N(GM[m])} ${y}</h3><div style="color:var(--mute)">${N(WD[i.wd])} · ${N(CT)}</div></div></div>
 <div>${list.map(x=>`<span class="badge r">${N(x.n)}</span>`).join("")}<span class="badge">${U(i.shukla?"sh":"kr")} ${U("pak")}</span><span class="badge">${hmName(i)} ${U("mas")}</span></div>
 <table style="margin-top:8px">
 <tr><td>${U("tithi")}</td><td>${tFull(i)}<small>${fj(tE,d)} ${U("till")}</small></td></tr>
 <tr><td>${U("nak")}</td><td>${N(NK[fN(a)])}<small>${fj(nE,d)} ${U("till")}</small></td></tr>
 <tr><td>${U("yog")}</td><td>${N(YG[fY(a)])}<small>${fj(yE,d)} ${U("till")}</small></td></tr>
 <tr><td>${U("kar")}</td><td>${N(kn)}<small>${fj(kE,d)} ${U("till")}</small></td></tr>
 <tr><td>${U("mrash")}</td><td>${N(RS[Math.floor(a.ms/30)])}</td></tr>
 <tr><td>${U("srash")}</td><td>${N(RS[Math.floor(a.ss/30)])}</td></tr>
 <tr><td>${U("sr")} / ${U("ss")}</td><td>${fh(M.sr)} / ${fh(M.ss)}</td></tr>
 <tr><td>${U("sam")}</td><td>${vs} / ${sk}</td></tr></table>`;
 // muhurat card
 const isT=TODAY.y===y&&TODAY.m===m&&TODAY.d===d,hn=istNow();
 const goodDay=M.day.filter(s=>CH_CLASS[s.c]==="good").map(s=>({s,o:overlap([s.s,s.e],M.rahu)}));
 let g=`<div class="mh">${U("good")}</div>`;
 g+=`<div class="mrow g"><span>${U("abh")}${M.wd===3?`<small>${U("wed")}</small>`:""}</span><span>${rng(M.abhijit)}</span></div>`;
 g+=`<div class="mrow g"><span>${U("brh")}</span><span>${rng(M.brahma)}</span></div>`;
 g+=goodDay.map(x=>`<div class="mrow ${x.o?"n":"g"}"><span>${N(CHN[x.s.c])} ${LANG==="hi"?"चौघड़िया":"Choghadiya"}${x.o?`<small>${U("ovl")}</small>`:""}</span><span>${rng([x.s.s,x.s.e])}</span></div>`).join("");
 g+=`<div class="mh">${U("avoid")}</div>`+[["rahu",M.rahu],["yama",M.yama],["guli",M.guli]].map(([k,r])=>`<div class="mrow b"><span>${U(k)}</span><span>${rng(r)}</span></div>`).join("");
 $("mc").innerHTML=`<h3 class="ct dv">${U("mu")}</h3>${g}`;
 // chaughadiya
 const col=(arr,title)=>`<div><div class="mh">${title}</div>${arr.map(s=>{const cur=isT&&((hn>=s.s&&hn<s.e)||(hn+24>=s.s&&hn+24<s.e));return`<div class="slot ${CH_CLASS[s.c]}${cur?" now":""}"><span>${N(CHN[s.c])}${cur?` · ${U("now")}`:""}</span><span>${rng([s.s,s.e])}</span></div>`}).join("")}</div>`;
 $("chc").innerHTML=`<h3 class="ct dv">${U("chg")} · ${N(WD[i.wd])}</h3><div class="chg">${col(M.day,"☀ "+U("day"))}${col(M.night,"☾ "+U("night"))}</div>`}
function hero(){const t=info(TODAY.y,TODAY.m,TODAY.d),M=muhurat(TODAY.y,TODAY.m,TODAY.d);
 $("hl").textContent=`${hmName(t)} ${U(t.shukla?"sh":"kr")} ${U("pak")} · ${N(tName(t.t))}`;
 $("hs").textContent=`${U("hero_t")}: ${N(WD[t.wd])}, ${TODAY.d} ${N(GM[TODAY.m])} ${TODAY.y} · ${LANG==="hi"?"विक्रम संवत्":"Vikram Samvat"} ${samvat(t)[0]} · ${N(CT)}`;
 $("chips").innerHTML=`<div class="chip">${U("nak")}<b>${N(NK[fN(t.a)])}</b></div><div class="chip">${U("rahu")}<b>${rng(M.rahu)}</b></div><div class="chip">${U("abh")}<b>${rng(M.abhijit)}</b></div><div class="chip">${U("sr")} / ${U("ss")}<b>${fh(M.sr)} / ${fh(M.ss)}</b></div>`}
function full(){setupStatic();render()}
$("lang").onclick=()=>{LANG=LANG==="hi"?"en":"hi";ls("lang",LANG);full()};
$("city").onchange=e=>{CI=+e.target.value;ls("city",CI);setCity(CITIES[CI]);render()};
$("reg").onchange=e=>{REG=e.target.value;ls("reg",REG);render()};
$("mode").onchange=e=>{PUR=+e.target.value;ls("pur",PUR);render()};
$("mo").onchange=e=>{vm=+e.target.value;render()};$("yr").onchange=e=>{vy=+e.target.value;render()};
const step=n=>{vm+=n;if(vm<0){vm=11;vy--}if(vm>11){vm=0;vy++}render()};
$("pv").onclick=()=>step(-1);$("nx").onclick=()=>step(1);
$("td").onclick=()=>{vy=TODAY.y;vm=TODAY.m;S={...TODAY};render()};
$("g").onclick=e=>{const c=e.target.closest(".cell");if(c&&c.dataset.d){S={y:vy,m:vm,d:+c.dataset.d};render()}};
$("fl").onclick=e=>{const c=e.target.closest("li");if(c&&c.dataset.d){S={y:vy,m:vm,d:+c.dataset.d};render();$("sd").scrollIntoView({behavior:"smooth",block:"nearest"})}};
document.addEventListener("keydown",e=>{if(/SELECT|INPUT/.test(e.target.tagName))return;if(e.key==="ArrowLeft")step(-1);if(e.key==="ArrowRight")step(1)});
$("theme").onclick=()=>{const r=document.documentElement,dk=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=dk?"light":"dark";ls("theme",r.dataset.theme);render()};
$("prt").onclick=()=>window.print();
if(ls("theme"))document.documentElement.dataset.theme=ls("theme");
full();
