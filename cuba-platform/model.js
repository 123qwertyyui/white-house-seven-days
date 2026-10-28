(function(root){'use strict';
const D=root.PlatformContent||(typeof require==='function'?require('./content.js'):null),copy=x=>JSON.parse(JSON.stringify(x));
const owned={us:['berlin','testing','disclosure','route','orders','assurance','reciprocity','retaliation','turkey','announcement','verification','hotline','testBan','publicSwapAccepted'],ussr:['berlin','deployment','secrecy','shipping','withdrawal','turkey','consultation','followup','hotline','testBan','nuclearControl'],cuba:['security','participation','deployment','publicity','defense','nuclearRequest','withdrawalResponse','inspection','followup','future','detente']};
const world=()=>({us:{berlin:'unset',testing:'unset',disclosure:'unset',route:'prepared',orders:'unset',assurance:false,reciprocity:false,retaliation:'none',turkey:'unaddressed',announcement:'none',verification:'none',hotline:'none',testBan:'none',publicSwapAccepted:false},ussr:{berlin:'unset',deployment:'unknown',secrecy:'unknown',shipping:'unset',withdrawal:'none',turkey:'unaddressed',consultation:'none',followup:'none',hotline:'none',testBan:'none',nuclearControl:'moscow-only'},cuba:{security:'unset',participation:'not-confirmed',deployment:'unknown',publicity:'unknown',defense:'unset',nuclearRequest:'none',withdrawalResponse:'unset',inspection:'not-discussed',followup:'none',future:'none',detente:'none'}});
function set(w,actor,key,value){if(!owned[actor]?.includes(key))throw Error('这不是该决策方能够改变的条件。');w[actor][key]=value;}
function prepare(run){const n=D.nodes[run.role][run.index];run.incoming=[];
 if(n.id==='us-discovery'){set(run.world,'ussr','deployment','approved');set(run.world,'cuba','deployment','accepted');run.incoming.push('本作按史实引入侦察照片这一新事件，不把苏方部署归因于你上一项柏林或核试验选择。');}
 if(n.id==='ussr-ships'||n.id==='cuba-defense'){set(run.world,'us','route','quarantine');run.incoming.push('本节点以美国公开宣布海上隔离作为新的情境事件，不代表此前某个选项必然导致这一行动。');}
 if(n.id==='cuba-excluded'){set(run.world,'ussr','withdrawal','accepted');set(run.world,'us','assurance',true);set(run.world,'us','reciprocity',true);run.incoming.push('本节点引入美苏公开的撤除与保证安排。古巴没有参加全部交涉；这里不向你透露当时未被告知的私下内容。');}
 return run;
}
function fresh(role){if(!D.roles[role])throw Error('请选择美国、苏联或古巴。');return prepare({version:1,role,index:0,started:false,locked:false,complete:false,ending:null,world:world(),records:[],incoming:[]});}
function node(run){const base=D.nodes[run.role][run.index];let n={...base};if(n.alt&&run.world.us.route===n.alt.when)n={...n,...n.alt};if(n.id==='us-agreement'&&run.world.ussr.withdrawal!=='accepted')n={...n,question:'苏联尚未接受撤除。美国怎样继续交涉？',newEvent:'你此前的提案尚未在本情境中获得苏方接受。美国不能自动宣布真实历史中的10月28日安排已经达成。',known:['苏联尚未接受本局中的撤除条件。','美国可以修改自己的保证和执行提案，但不能替苏联接受。','古巴是否允许核查仍是另一项决定。']};if(n.id==='ussr-withdraw'&&!run.world.us.assurance)n={...n,question:'美国尚未确认保证。苏联怎样继续交涉？',newEvent:'你此前没有获得本情境中的正式美方保证。苏联可以提出以美方确认保证为条件的撤除原则，但不能假定保证已经存在。',known:['美方尚未在本局正式提供不入侵保证。','苏联可以提出附条件的撤除原则，等待美国回应。','古巴的参与与核查许可仍需另外处理。'],options:n.options.map(o=>o.id==='accept'?{...o,text:'我提出以美国正式确认不入侵保证为条件接受撤除原则，并要求双方确认执行办法。'}:o)};return n;}
function respond(run,n){const w=run.world,out=[],say=(actor,text)=>out.push({actor,text});
 if(run.role==='us'&&['us-assurance','us-agreement','us-verification'].includes(n.id)){
  const previous=w.ussr.withdrawal;
  if(w.us.assurance&&w.us.reciprocity&&w.us.route!=='attack')set(w,'ussr','withdrawal','accepted');else set(w,'ussr','withdrawal','none');
  if(previous!==w.ussr.withdrawal||n.id==='us-assurance')say('ussr',w.ussr.withdrawal==='accepted'?'在本情境规则中，苏联接受以撤除有关导弹交换美国不入侵保证与相应调整海上措施的原则方案。武器尚未实际撤离。':'苏联尚未接受美国的撤除要求。美方尚未提出这套规则所要求的完整交换条件。');
  if(n.id==='us-verification'){set(w,'cuba','inspection','refused');say('cuba',w.us.verification==='mediator'?'古巴尚未批准现场核查。美国请求商议新程序，不等于古巴已经答应。':w.us.verification==='alternative'?'古巴没有因此接受现场检查。美国可以评估其他核实办法，但检查还没有完成。':'古巴没有同意有关人员进入古巴现场检查。美苏之间的安排不能代替古巴批准。');}
 }
 if(run.role==='ussr'){
  if(n.id==='ussr-deployment'&&w.ussr.deployment==='approved'){set(w,'cuba','deployment','accepted');say('cuba','本情境以古巴接受苏方部署计划为继续推进的前提，具体政治与防御条件仍需苏古协调。');}
  if(n.id==='ussr-offer'&&w.ussr.withdrawal==='offered'){set(w,'us','assurance',true);set(w,'us','reciprocity',true);say('us','美国愿意把不入侵保证与可核实的撤除相联系，但尚未认定所有执行问题已经谈妥。');}
  if(n.id==='ussr-offer'&&w.ussr.withdrawal==='none')say('us','美国没有仅因苏方要求先取消隔离，就接受全部苏方要求。撤除条件仍待交涉。');
  if(n.id==='ussr-turkey')say('us',w.ussr.turkey==='public'?'美国没有接受公开同步交换土耳其导弹的要求。有关公开前提仍构成分歧。':'美国愿意通过私下渠道继续确认有关安排，但承诺与实际撤除必须分开。');
  if(n.id==='ussr-withdraw'&&w.ussr.withdrawal==='accepted'){set(w,'us','assurance',true);set(w,'us','reciprocity',true);set(w,'cuba','inspection','refused');say('us','美国保留与撤除和核实相联系的不入侵保证，不宣布全部执行已经完成。');say('cuba','古巴要求说明撤除与参与安排，尚未接受外国人员进入现场核查。');}
  if(n.id==='ussr-mikoyan')say('cuba','古巴继续要求安全保障和参与，苏方说明撤除理由不等于古方接受全部程序。');
 }
 if(run.role==='cuba'){
  if(n.id==='cuba-deployment'&&w.cuba.deployment==='accepted'){set(w,'ussr','deployment','approved');say('ussr','苏方继续安排部署，但苏联核武器的使用权没有交给古巴。');}
  if(n.id==='cuba-letter')say('ussr',w.cuba.nuclearRequest==='conditional'?'苏联保留核使用决定权，并把古方关于入侵的警报视为需要处理的严重风险。古方建议不会自动触发核行动。':'苏联收到防御支持请求，仍需自己判断具体承诺，不把请求当作自动参战命令。');
  if(n.id==='cuba-excluded')say('ussr','苏方继续说明撤除与避免战争的考虑。古巴提出异议，没有自动撤销苏方对本国武器的决定。');
  if(n.id==='cuba-inspection')say('us',w.cuba.inspection==='limited-approved'?'美国要求进一步确认古巴提出的人员、地点与任务限制。古巴原则许可，不等于各方已完成安排或检查。':w.cuba.inspection==='terms'?'美国仍需确认撤除情况。古巴同意商议条件，尚未批准检查人员入境。':'美国仍需确认撤除情况，并继续考虑其他核实办法。');
  if(n.id==='cuba-mikoyan')say('ussr','苏方仍然决定本国武器的安排。古巴的防御与参与要求需要继续交涉。');
 }
 if(n.id==='us-hotline'&&w.us.hotline==='proposed'){set(w,'ussr','hotline','willing');say('ussr','苏方愿意继续商定直接通信的技术与使用程序，设备和人员仍需落实。');}
 if(n.id==='ussr-hotline'&&w.ussr.hotline==='proposed'){set(w,'us','hotline','willing');say('us','美方愿意继续商定直接通信程序，尚未因一次决定就完成建设。');}
 if(n.id==='us-ban'&&w.us.testBan==='limited'){set(w,'ussr','testBan','willing');say('ussr','苏方愿意继续讨论有限文本。英国的立场和美国国内程序没有被这个三方小模型代替。');}
 if(n.id==='ussr-ban'&&w.ussr.testBan==='limited'){set(w,'us','testBan','willing');say('us','美方愿意继续讨论有限文本，但国际文本与国内批准仍是不同程序。');}
 return out;
}
function submit(state,choiceId,note=''){if(state.locked||state.complete)throw Error('这一决定已经提交。');const n=node(state),o=n.options.find(x=>x.id===choiceId);if(!o)throw Error('没有找到这项选择。');const run=copy(state),before=copy(run.world);for(const [path,value]of Object.entries(o.changes||{})){const [actor,key]=path.split('.');if(actor!==run.role)throw Error('你不能替另一个国家下令。');set(run.world,actor,key,value);}const replies=respond(run,n);run.started=true;run.locked=true;if(o.terminal){run.ending=o.terminal;run.complete=true;}run.records.push({id:n.id,choiceId,event:n.event,phase:n.phase,date:n.date,choice:o.text,detail:o.detail,result:o.result,note:String(note).slice(0,500),before,after:copy(run.world),replies,incoming:[...run.incoming]});return run;}
function advance(state){if(!state.locked||state.complete)throw Error('请先提交本次决定。');const r=copy(state);if(r.index===D.nodes[r.role].length-1){r.complete=true;return r;}r.index++;r.locked=false;return prepare(r);}
function rewind(state,index){if(!Number.isInteger(index)||index<0||index>=D.nodes[state.role].length||index>state.records.length)throw Error('不能回到尚未走过的决定。');let r=fresh(state.role);r.started=true;for(let i=0;i<index;i++){r=submit(r,state.records[i].choiceId,state.records[i].note);r=advance(r);}return r;}
function restore(raw){if(!raw||raw.version!==1||!D.roles[raw.role]||!Array.isArray(raw.records)||raw.records.length>D.nodes[raw.role].length)throw Error('存档格式不匹配。');let r=fresh(raw.role);r.started=!!raw.started;for(let i=0;i<raw.records.length;i++){if(raw.records[i].id!==node(r).id)throw Error('存档次序不匹配。');r=submit(r,raw.records[i].choiceId,raw.records[i].note);if(i<raw.records.length-1)r=advance(r);}if(raw.records.length&&!raw.locked&&!r.complete)r=advance(r);if(raw.complete&&!r.complete){if(r.index!==D.nodes[r.role].length-1||!r.locked)throw Error('结局次序不匹配。');r=advance(r);}if(raw.index!==r.index||!!raw.locked!==r.locked||!!raw.complete!==r.complete)throw Error('存档进度不匹配。');return r;}
function changeOne(state,index,choiceId){let r=fresh(state.role);r.started=true;for(let i=0;i<state.records.length;i++){r=submit(r,i===index?choiceId:state.records[i].choiceId,state.records[i].note);if(r.complete)break;if(i<state.records.length-1)r=advance(r);}if(!r.complete&&state.complete&&r.index===D.nodes[r.role].length-1)r=advance(r);return r;}
function exchange(w){return w.us.assurance&&w.us.reciprocity&&w.ussr.withdrawal==='accepted';}
root.PlatformModel={fresh,node,submit,advance,rewind,restore,changeOne,exchange,owned};if(typeof module!=='undefined')module.exports=root.PlatformModel;
})(typeof window!=='undefined'?window:globalThis);
