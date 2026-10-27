/* Evidence-linked interpretation of a sequence of choices. No personal scores. */
(function(root){'use strict';
const S=root.Crisis||(typeof require==='function'?require('./scenario-v3.js'):null);
const find=(s,id)=>s.records.find(r=>r.sceneId===id);
const quote=r=>r?{chapter:S.scenes.findIndex(s=>s.id===r.sceneId)+1,sceneId:r.sceneId,text:r.option}:null;
function analyze(state){if(!state.complete)throw Error('本局决定结束后才能复盘。');
 const response=find(state,'response'),ships=find(state,'ships'),offer=find(state,'assurance'),plane=find(state,'plane'),turkey=find(state,'turkey'),agreement=find(state,'agreement'),verification=find(state,'verification'),discovery=find(state,'discovery');
 const early=offer?.choiceId==='conditional',late=!!offer&&!early&&agreement?.choiceId==='steps',g=state.game;
 const pressure=response?.choiceId==='quarantine'||ships?.flags.route==='quarantine';
 const start=response?.choiceId==='quarantine'?'你先选择用海上隔离对苏联施压':pressure?'你先提出外交要求，随后改用海上隔离施压':'你先给苏联的答复设定期限，暂不实施海上隔离';
 let title,summary=[];
 if(state.terminal){title=state.terminal==='airstrike'?'你在交涉初期决定直接攻击导弹设施。':'你先保留交涉路线，后来因侦察机被击落而批准报复。';summary.push(state.terminal==='airstrike'?'这局的转折发生在第2章。你没有继续用海上隔离或外交条件争取撤除，而是批准美国直接攻击古巴的导弹设施。':start+'。但第5章侦察机被击落后，你批准攻击有关防空设施，路线从交涉与施压转向实际攻击。');if(early)summary.push('在批准报复之前，你已经提出过不入侵保证和相应调整海上措施的交换条件。因此，不能把整局归为“始终拒绝妥协”；后来的军事决定改变了此前交涉的前提。');summary.push('这项决定能说明你在何处选择使用武力，不能说明苏联一定退让，或美国一定摧毁了全部导弹。本作在此停止，不编造战争结果。');}
 else if(early){title=pressure?'你先施压，随后给出了撤除导弹的交换条件。':'你通过外交要求和附条件承诺争取撤除导弹。';summary.push(start+'。第4章，你又提出美国不入侵古巴的保证，并承诺在苏联按约撤除有关武器、安排核实后，相应调整海上措施。');summary.push('这两步处理的是同一场交涉的两个问题：前一步要求苏联改变部署，后一步回答“苏联改变部署以后，美国会怎样回应”。在本作简化规则中，后一步补齐了原则交换条件，苏联因此接受撤除的原则方案；这不表示武器已经运走。');}
 else if(late){title='你前期要求苏联先让步，后来改成分步交换。';summary.push(start+'。第4章，你没有正式提出完整的不入侵与相应调整海上措施的交换条件，苏联在本情境中仍未接受撤除。');summary.push('直到第7章，你提出分步安排，把美国的承诺和苏联的撤除放在同一套条件里。这是本局的路线调整：你从“苏联先处理导弹，美国再决定提供什么”转向“双方约定各自完成什么”。');}
 else{title='你要求苏联撤除导弹，但始终没有补齐本情境的交换条件。';summary.push(start+'。但到本局结束，你没有把美国不入侵古巴的保证与相应调整海上措施，一起作为撤除导弹的条件正式提出。');summary.push('因此，本作将苏联的答复保留为“尚未接受原则方案”。这里的障碍不是你的强硬程度不够，而是要求对方撤除武器后，对方的安全担忧仍没有得到这套提案的回答。这是本作设定下的解释，不是对真实苏联行为的必然预测。');}
 if(!state.terminal&&plane){summary.push(plane.choiceId==='hold'?'侦察机被击落后，你没有立即报复，而是追问事件并继续谈判。你把“现场发生致命事件”与“苏联最高领导人已经决定放弃交涉”分开处理，因而没有在本局把该事件直接转成美国的报复命令。':'侦察机被击落后，你暂不攻击，但提出再次遭袭后重新评估武力行动的警告。你保留了交涉，同时给对方说明了下一次事件可能带来的后果。');}
 if(!state.terminal&&verification){summary.push(verification.choiceId==='onsite'?'最后，你坚持联合国人员进入古巴核查。即使美苏已经谈妥原则交换，古巴仍未同意外国人员入境，所以撤除安排与现场核查没有在本局同时解决。':verification.choiceId==='alternative'?'最后，你尝试通过空中侦察和观察运输等办法核实撤除。这改变了美国获取信息的手段，避免把所有核实都押在进入古巴现场上；但相关办法只是提出，不能据此宣称核实已经完成。':'最后，你请求联合国与古巴商量人员身份、任务和进入条件。你开始把古巴当作能够决定准入条件的一方，但请求磋商仍不等于古巴已经同意核查。');}
 const chain=[];
 if(response)chain.push({title:pressure?'美国为了减少导弹威胁，选择施加军事压力。':state.terminal?'美国选择直接攻击有关设施。':'美国提出撤除要求，同时保留军事准备。',explanation:state.terminal&&state.terminal==='airstrike'?'你把使用武力直接作为处理导弹设施的办法。军事威胁由可能发生的行动变成已批准的攻击，后续不能再照搬未发动攻击时的谈判路线。':pressure?'海上隔离能阻止部分新增运输，并向苏联施压；它不能直接移走古巴岛上已有的导弹。美国的措施也可能使苏联和古巴更担心美国准备入侵。':'你暂不实施海上隔离，但对苏联提出了要求和期限。这给交涉留下时间，也没有自动使苏联相信美国放弃了入侵古巴的可能。',evidence:[quote(response),pressure&&response.choiceId==='diplomacy'?quote(ships):null].filter(Boolean)});
 if(offer)chain.push({title:early?'你用附条件承诺回答了对方的一部分安全担忧。':'你当时没有正式回答撤除之后的安全问题。',explanation:early?'美国不入侵古巴的保证，使撤除导弹不再仅仅意味着苏联单方面放弃部署；相应调整海上措施的承诺，则说明美国会在什么条件下回应。这是在改变双方的交换条件，不是给苏联增加“好感分”。':offer.choiceId==='first'?'你要求苏联先撤除导弹，之后才讨论美国是否提供保证。对方需要先让出一种保护手段，却还不知道会得到什么承诺，因此本作保留了撤除僵局。':'你要求继续确认条款，但没有正式提供保证。核实细节值得讨论；然而讨论本身不能代替美国对撤除后行动的承诺。',evidence:[quote(offer)]});
 if(late)chain.push({title:'第7章的分步安排补上了此前缺少的交换条件。',explanation:'这项后续决定改变了第4章留下的条件。复盘必须把两章连起来看，而不能把第一次拒绝与后来提供保证分别当成互不相关的分数。',evidence:[quote(offer),quote(agreement)]});
 if(verification)chain.push({title:'古巴的准入决定是另一道关口。',explanation:verification.choiceId==='onsite'?'不入侵保证处理古巴的部分安全担忧，现场核查还涉及外国人员能否进入古巴领土。美国和苏联的利益交集，没有自动变成古巴的同意。':verification.choiceId==='alternative'?'你没有把获得核实信息与外国人员必须进入古巴视为同一件事。这为程序选择增加了一条路，但并未消除美国的信息缺口。':'你把“检查谁、由谁检查、检查什么”变成进一步商议的内容。这个过程需要古巴作答，联合国也不能替古巴接受。',evidence:[quote(verification)]});
 const tensions=[];
 if(ships?.flags.orders==='delegated'&&plane&&plane.choiceId!=='strike')tensions.push({title:'白宫暂不报复，不等于现场风险也已得到控制。',text:'第3章，你给美国海军较大的现场处置权限；第5章，你又选择暂不因侦察机被击落而攻击。这不是直接自相矛盾，但白宫克制与现场授权之间存在张力。你的外交路线仍需要具体的交战规则支持。游戏没有模拟现场人员一定怎样行动，也没有把飞机被击落归因于这项海军授权。',evidence:[quote(ships),quote(plane)]});
 if(late)tensions.push({title:'这是一项路线调整，不能只看最终条件。',text:'你先没有提供完整交换条件，后来又在第7章提出。仅看最后是否有保证，会漏掉前期为何谈不拢；把两章都列成独立数字，也看不出后一次决定怎样改变前一次的后果。现有选择不能证明你为何改变主意，复盘不替你编造动机。',evidence:[quote(offer),quote(agreement)]});
 if(turkey?.choiceId==='private')tensions.push({title:'私下交换还需要处理公开立场与盟友关系。',text:'你选择秘密讨论撤除美国在土耳其的有关导弹，这可以理解为尝试扩大美苏之间的交换空间。但美国还需要与土耳其处理部署变化，也要考虑秘密承诺与公开说明之间的关系。本作没有单独模拟土耳其的答复，不能把这个选择写成苏联接受的已验证原因。',evidence:[quote(turkey)]});
 if(verification?.choiceId==='onsite'&&g.exchange)tensions.push({title:'提供安全保证以后，核查仍可能被主权问题阻住。',text:'你已经提出美国不入侵古巴的保证，最后仍坚持有关人员进入古巴检查。这两项政策并不互相否定；问题是保证没有自动回答谁能进入古巴领土。你减少了一类分歧，又遇到另一类分歧。',evidence:[quote(offer?.choiceId==='conditional'?offer:agreement),quote(verification)]});
 if(!tensions.length&&early)tensions.push({title:'施压与提供保证可以服务于同一套策略。',text:'你前期要求苏联改变部署，随后给出美国会怎样回应的承诺。不能因为你先强硬、后愿意交换，就把两次决定认定为互相矛盾。判断这套策略，还要看承诺是否具体、各方能否核实，以及古巴是否接受执行安排。',evidence:[quote(response),quote(offer)]});
 if(!tensions.length)tensions.push({title:'不能因为你没有发动攻击，就认定安全困境已经缓解。',text:'暂停攻击保留了交涉，但如果对方仍担心撤除武器后会遭到入侵，僵局仍可能持续。这里需要区别“没有马上升级”与“已经提出双方可接受的安排”。',evidence:[quote(response),quote(offer)].filter(Boolean)});
 let counterfactual=null;
 if(state.terminal){const index=state.records.length-1,choice=state.terminal==='airstrike'?'quarantine':'hold',changed=S.changeOne(state,index,choice);counterfactual={index,original:state.records[index].option,alternative:S.activeScene(S.beforeNode(state,index)).options.find(o=>o.id===choice).title,text:['只替换这一步，美国就不会在这个节点批准该次攻击。','原局在这里已经结束，没有后续选择可供保持不变，因此不能继续宣称这个改动一定带来撤除协议或避免战争。'],changed};}
 else if(offer){const index=state.records.indexOf(offer),choice=early?'first':'conditional',changed=S.changeOne(state,index,choice),changedRecord=changed.records[index];let text=[];text.push(early?'原局第4章提出了完整交换条件；只改成要求苏联先撤除，苏联在本作的当轮答复就由接受原则方案变为尚未接受。':'原局第4章没有提出完整交换条件；只改成提出附条件保证，苏联在本作的当轮答复就由尚未接受变为接受原则方案。');if(changed.game.withdrawal===g.withdrawal){text.push(agreement?.choiceId==='steps'?'但你第7章仍然提出分步交换，所以两条路线到终局都保留了原则交换条件。后来的决定补上了前面的缺口；终局相同，不表示整段过程相同。':'后续决定使两条路线在终局保留相同答复。这个比较应连同具体过程阅读，不能把最终一项记录当作全部结果。');}else text.push('保持其他已作出的选择不变，终局的原则答复也随之改变。这个差异来自本作写明的交换规则，不是关于真实苏联必然让步的因果证明。');text.push('古巴并不会因为美国改变保证，就自动同意现场核查；这项改动也不证明武器已经实际撤离。');counterfactual={index,original:offer.option,alternative:S.scenes[index].options.find(o=>o.id===choice).title,text,changed,localChanged:offer.after.withdrawal!==changedRecord.after.withdrawal};}
 return {title,summary,chain,tensions:tensions.slice(0,3),counterfactual,outcome:g.withdrawal==='principle'?'在本情境规则中，美苏形成了撤除导弹的原则交换条件；实际撤除和核实仍未完成。':'在本情境规则中，美苏尚未形成完整的原则交换条件。',terminal:state.terminal,game:g};
}
root.CrisisReview={analyze};if(typeof module!=='undefined')module.exports=root.CrisisReview;
})(typeof window!=='undefined'?window:globalThis);
