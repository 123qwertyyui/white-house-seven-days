/* Original implementation of published ordinal conflict-graph definitions. */
(function(root){'use strict';
const bit=(s,i)=>Boolean(s&(1<<i));
const compare=(a,b)=>{for(let i=0;i<Math.max(a.length,b.length);i++){const x=Number(a[i]||0),y=Number(b[i]||0);if(x!==y)return x>y?1:-1;}return 0;};
const names={us:'美国',ussr:'苏联',cuba:'古巴',gdr:'东德',uk:'英国'};
function makeGame({states,actors,edges,rank}){
 const successors=(i,s)=>(edges[i]?.[s]||[]).filter(t=>states.includes(t)&&t!==s);
 const prefers=(i,t,s)=>compare(rank(i,t),rank(i,s))>0;
 const improvements=(i,s)=>successors(i,s).filter(t=>prefers(i,t,s));
 // Coalition paths are sequences of moves by other actors; in SEQ every step
 // must improve the moving actor's own ranking. They never include focal i.
 function replies(i,start,improving){
  const seen=new Set([start]),out=[],q=[start];
  while(q.length){const s=q.shift();for(const j of actors.filter(a=>a!==i)){
   for(const t of (improving?improvements(j,s):successors(j,s))){if(!seen.has(t)){seen.add(t);out.push(t);q.push(t);}}
  }}return out;
 }
 function stability(i,s,type='Nash'){
  return improvements(i,s).every(t=>{
   if(type==='Nash')return false;
   const rr=replies(i,t,type==='SEQ');
   return rr.some(u=>!prefers(i,u,s)&&(type!=='SMR'||successors(i,u).every(v=>!prefers(i,v,s))));
  });
 }
 function analyze(s){return actors.map(i=>({id:i,name:names[i]||i,moves:successors(i,s).length,improvements:improvements(i,s).length,Nash:stability(i,s),GMR:stability(i,s,'GMR'),SEQ:stability(i,s,'SEQ'),SMR:stability(i,s,'SMR')}));}
 function path(start,target,{maxDepth=5,improving=false}={}){
  const q=[{s:start,path:[]}],seen=new Set([start]);
  while(q.length){const x=q.shift();if(target(x.s))return x.path;if(x.path.length>=maxDepth)continue;
   for(const i of actors)for(const t of (improving?improvements(i,x.s):successors(i,x.s))){if(!seen.has(t)){seen.add(t);q.push({s:t,path:[...x.path,{actor:i,from:x.s,to:t}]});}}
  }return null;
 }
 return {states,actors,successors,prefers,improvements,replies,stability,analyze,path,rank};
}
function cube(actors,controls,rank,valid=()=>true){
 const states=Array.from({length:32},(_,i)=>i).filter(valid),edges={};
 for(const i of actors){edges[i]={};for(const s of states)edges[i][s]=controls[i].map(b=>s^(1<<b)).filter(valid);}
 return makeGame({states,actors,edges,rank});
}
const descriptions={
 berlin:['美方保持现场施压','美方提出相互后撤','苏方接受后撤','东德接受程序磋商','东德愿意继续接触'],
 testing:['美方继续有关试验','苏方继续有关试验','英方支持有限范围','美方提出限制方案','苏方接受继续谈判'],
 cuba:['美方维持军事施压','美方提出不入侵保证','苏方接受撤除方案','古方接受现场核查','古方愿意参加磋商'],
 ban:['美方保留全面要求','苏方保留全面要求','英方支持有限文本','美方接受有限文本','苏方接受有限文本']
};
function scenario(kind,flags={}){
 let actors,controls,rank,valid=()=>true;
 if(kind==='berlin'){
  actors=['us','ussr','gdr'];controls={us:[0,1],ussr:[2],gdr:[3,4]};
  rank=(i,s)=>{const b=Array.from({length:5},(_,n)=>+bit(s,n));
   if(i==='us')return [b[2],b[2]?1-b[0]:b[0],b[1],b[4],b[3]];
   if(i==='ussr')return [b[1]&&b[2],!b[0],b[1]?b[2]:1-b[2],b[4],b[3]];
   return [b[4],b[3],!b[0],b[2]];
  };
 }else if(kind==='testing'||kind==='ban'){
  actors=['us','ussr','uk'];controls={us:[0,3],ussr:[1,4],uk:[2]};
  rank=(i,s)=>{const b=Array.from({length:5},(_,n)=>+bit(s,n));
   const deal=b[2]&&b[3]&&b[4];
   if(kind==='ban'){
    if(i==='us')return [deal,b[4]?b[3]:1-b[3],!b[0],b[2]];
    if(i==='ussr')return [deal,b[3]?b[4]:1-b[4],!b[1],b[2]];
    return [deal,b[2],!b[0],!b[1]];
   }
   if(i==='us')return [b[3]&&b[4],b[1]?b[0]:1-b[0],b[3],b[2]];
   if(i==='ussr')return [b[3]&&b[4],b[0]?b[1]:1-b[1],b[4],b[2]];
   return [b[2],b[3]&&b[4],!b[0],!b[1]];
  };
 }else{
  kind='cuba';actors=['us','ussr','cuba'];controls={us:[0,1],ussr:[2],cuba:[3,4]};
  // Allowing an inspection requires willingness to engage. Withdrawal can
  // remain feasible without on-site inspections (verification alternatives).
  valid=s=>!bit(s,3)||bit(s,4);
  rank=(i,s)=>{const b=Array.from({length:5},(_,n)=>+bit(s,n));
   if(i==='us')return [b[2],b[2]?1-b[0]:b[0],b[4],b[3],1-b[1]];
   if(i==='ussr')return [b[1]&&!b[0],!b[0],b[1],b[1]?b[2]:1-b[2],b[4],!b[3]];
   // Inspection preferences depend on an explicit procedural proposal, not
   // the role being awarded a permanently accumulating friendship score.
   if(flags.reciprocalInspection)return [b[1],!b[0],b[4],b[1]&&!b[0]?b[3]:1-b[3],!b[2]];
   return [b[1],!b[0],b[4],!b[3],!b[2]];
  };
 }
 const g=cube(actors,controls,rank,valid);
 return Object.assign(g,{kind,controls,labels:descriptions[kind],goal:s=>kind==='berlin'?bit(s,1)&&bit(s,2)&&!bit(s,0):kind==='testing'?bit(s,3)&&bit(s,4):kind==='ban'?bit(s,2)&&bit(s,3)&&bit(s,4):bit(s,1)&&bit(s,2)&&bit(s,4)&&!bit(s,0)});
}
function react(game,state,{rounds=2,hold=[]}={}){
 const trace=[];let current=state;
 for(let n=0;n<rounds;n++){let moved=false;for(const actor of game.actors.filter(a=>a!=='us'&&!hold.includes(a))){
  const moves=game.improvements(actor,current).sort((a,b)=>compare(game.rank(actor,b),game.rank(actor,a))||a-b);
  const safe=moves.filter(t=>!game.replies(actor,t,true).some(u=>!game.prefers(actor,u,current)));
  const t=(safe.length?safe:moves)[0];
  if(t!==undefined){trace.push({actor,from:current,to:t,bit:Math.log2(current^t),sanctionAvoided:safe.length>0});current=t;moved=true;}
 }if(!moved)break;}
 return {state:current,trace};
}
function kato(extra=false){
 const states=[0,1,2,3],actors=['us','ussr'],edges={us:{0:[1],1:[0],2:[3],3:[2]},ussr:{0:[2],1:[3],2:[0],3:[1]}};
 if(extra)edges.ussr[3].push(0);
 return makeGame({states,actors,edges,rank:(i,s)=>[(i==='us'?[4,3,1,2]:[4,1,3,2])[s]]});
}
const api={bit,compare,makeGame,scenario,react,kato,names,descriptions};
root.Conflict=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
