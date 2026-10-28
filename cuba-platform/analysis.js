(function(root){'use strict';
const D=root.PlatformContent||(typeof require==='function'?require('./content.js'):null),M=root.PlatformModel||(typeof require==='function'?require('./model.js'):null);
const get=(r,id)=>r.records.find(x=>x.id===r.role+'-'+id),evidence=r=>r?{id:r.id,text:r.choice}:null;
function nodeExplanation(run,r,n){const id=n.id.split('-').slice(1).join('-'),w=r.after,choice=r.choiceId;
 if(id==='assurance'||id==='offer')return run.role==='us'?(choice==='conditional'?'你把美国的保证与苏联撤除导弹联系起来，回答了对方撤除后得到什么承诺的问题。程序中的原则答复由这项交换条件触发，不代表真正撤除已经完成。':'你当时没有正式提出完整交换条件。要求对方先行动或继续审查，并没有自动回答撤除后的安全问题；后面的决定可能再补上这一缺口。'):(choice==='exchange'?'你提出撤除可以交换美国的承诺，而不是只要求美国先取消隔离。美方的条件回应仍不等于古巴同意核查。':'你要求美国先取消隔离，却没有提出对应的撤除承诺。双方在本情境中仍缺少可对应的交换条件。');
 if(id==='deployment')return run.ending==='nondeployment'?'你改变了真实危机的基本前提。本版不继续套用部署被发现后的十三天，也不能据此证明美国以后不会施压。':run.role==='cuba'?'你接受了能提供保护、也可能带来牵连的外援。古巴接受部署与古巴控制核使用权是两件事。':'你试图用靠近美国的部署处理苏联和古巴的安全问题，但同一部署也可能使美国更不安全，促使其加强行动。';
 if(id==='ships'||id==='defense')return '你决定的是现场权限，而不是只表达强硬程度。扩大权限可以加快处置，也可能使实际接触更难由领导人逐项控制。本作没有把后来某次开火归因于你的这个选择。';
 if(id==='plane')return choice==='strike'?'你在致命事件之后批准报复，这改变了此前交涉的前提。本版停止战争推演，不把攻击解释为必然成功或必然失败。':'你暂不攻击，保留了继续交涉的机会。但这不证明对方没有进攻意图，也不保证现场以后不会再发生事件。';
 if(id==='turkey')return run.role==='us'?(choice==='private'?'你尝试通过秘密安排扩大交换空间，同时把公开交换的盟友成本留在另一条政治线上。私下承诺仍需要实际撤除和盟友协调。':choice==='consult'?'你让土耳其参与有关自身安全的讨论，也接受答复可能变慢或出现反对。盟友不是美苏可以直接替其决定立场的工具。':'你保留了美国原来的公开要求，也保留了苏方提出的分歧。本作没有用一个总分替你判断拒绝是否一定有效。'):(choice==='private'?'你允许私下确认美国的调整，降低了对公开同步交换的坚持。但保密不等于承诺已经履行。':'你坚持公开前提，会增加美国同时向盟友和国内解释的难度。本情境中的美国没有自动接受该要求。');
 if(id==='inspection'||id==='verification')return run.role==='cuba'?(choice==='limited'?'你改变了真实历史中的拒绝方向，原则允许受限核查。但许可有具体条件，不能据此跳到美国接受、检查完成或信任恢复。':choice==='terms'?'你把一项整体拒绝转成可以商量的人员、地点和任务条件，但没有提前批准入境。':'你保留了古巴对领土准入的决定权，同时使其他方面仍需要解决如何确认撤除的问题。'):(choice==='alternative'?'你把“获得核实信息”与“必须进入古巴现场”分开，尝试绕开一项准入分歧，但接受替代办法会有信息局限。':choice==='mediator'?'你尝试改变核查程序，而不是命令古巴答应。请求磋商不会在模型中自动变成古巴同意。':'你坚持现场要求，这可以维持美方核实标准，也可能使准入分歧延续。美苏形成交换条件不等于古巴接受。');
 if(id==='excluded'||id==='mikoyan'||id==='relations')return run.role==='cuba'?'你处理的是较弱盟友如何在依赖保护的同时争取参与和自主。提出异议不代表能够支配苏联武器，苏联撤除也不代表古巴接受全部执行方式。':'你处理的是苏联与盟友的关系，而非仅与美国交换。苏联能决定本国武器，却不能把古巴的同意当作同一项命令的结果。';
 if(id==='letter')return choice==='conditional'?'你的建议以美国实际入侵为条件，体现了古巴对遭到攻击的强烈担忧。但苏联还要考虑更广的战争风险；古方请求不能被程序当作苏方核使用命令。':'你把请求集中在防御保障，避免提出核先发建议。这改变了向盟友传递的要求，不证明苏联的风险判断和古巴完全相同。';
 if(id==='hotline')return '你处理的是通信可靠性。新的联系可以缩短转达环节，但不会让国家自动相信对方，也不能代替明确的命令和承诺。';
 if(id==='ban')return choice==='limited'?'你接受先处理部分可达成的问题，把范围与剩余核查分歧分开。有限文本仍需有关国家接受并完成各自程序。':'你保留了全面目标，也保留了全面安排尚未解决的核查难题。更大的目标不自动等于更大的实际合作。';
 if(id==='agreement'||id==='withdraw')return '你需要把原则接受、实际撤除和核实分别处理。即使领导人接受了条件，现场执行和第三方的批准也不会自动完成。';
 if(id==='detente')return '你把美苏之间减少核风险的合作，与古巴自身诉求是否得到满足分开判断。古巴可以支持或批评，却不能直接否决美苏各自签署的安排。';
 if(id==='voice'||id==='secrecy')return '你改变的是对外信息和政治参与方式。公开可以改变各方知道什么，却不能仅凭公开说法改变导弹本身的军事能力。';
 return D.theories[n.theory].explain+' 这一章的选择会保留在后续记录中，但后来新的历史事件不被认定为这个选择的必然结果。';
}
function analyze(run){if(!run.complete)throw Error('当前分支结束后才能查看复盘。');const role=run.role,w=run.world,parts=[],mechanisms=[],issues=[],record=id=>get(run,id),push=(title,text,ids)=>mechanisms.push({title,text,evidence:ids.map(record).map(evidence).filter(Boolean)});
 let title;
 if(run.ending){title=run.ending==='nondeployment'?'你没有接受真实历史中的核导弹部署。':'你选择进入军事行动分支。';parts.push(run.records.at(-1).result);parts.push('这条分支改变了后续前提。本版只解释已经作出的选择，不把未发生的后续决定补成一场虚构的完整历史。');}
 else if(role==='us'){
  const a=record('assurance'),late=a?.choiceId!=='conditional'&&record('agreement')?.choiceId==='steps',pressure=w.us.route==='quarantine';
  title=w.us.assurance?(late?'你从要求对方先行动，转向了分步交换。':pressure?'你先施压，再给出美国会怎样回应的承诺。':'你用外交要求与附条件承诺争取撤除。'):'你要求撤除导弹，但没有补齐本情境的交换条件。';
  parts.push('在柏林和核试验问题上，你先决定美国怎样维护安全与处理核实分歧。后来侦察照片带来了新的古巴部署问题；程序没有把这一部署归因于你此前的某个选择。');
  parts.push((pressure?(record('response')?.choiceId==='diplomacy'?'你先提出外交要求，随后转向海上隔离施压。':'危机公开后，你以海上隔离施压。'):'危机公开后，你先保留了外交等待路线。')+(w.us.assurance?(late?'直到后续执行交涉，你才把不入侵保证与相应调整海上措施放入一套分步安排。':'你随后提供不入侵保证，并说明苏联按约撤除后美国会怎样调整海上措施。'):'你没有把美国的保证和相应调整措施完整提出，原则撤除条件仍未对应起来。'));
  parts.push(w.us.verification==='alternative'?'面对古巴拒绝进入现场的分歧，你转向评估替代核实办法。这改变了获取信息的手段，却没有证明核实已经完成。':w.us.verification==='mediator'?'你请求商议核查程序，但古巴仍有权拒绝。调停没有让古巴自动接受。':'你保留现场核查要求，古巴尚未同意。美苏原则安排与古巴准入问题仍未同时解决。');
  push('压力与保证，回答的是两个相连的问题。',w.us.assurance?'海上压力要求苏联改变部署，不入侵保证回答对方撤除后得到什么承诺。它们可以组成一套策略，而不是互相抵消的加分项。':'要求苏联放弃部署，没有自动回答撤除后古巴是否仍可能遭到入侵的问题。没有攻击不等于已经形成互惠条件。',['response','assurance','agreement']);
  push('你怎样控制了现场事件的升级？',record('plane')?.choiceId==='hold'?'侦察机被击落后，你暂不报复，保留了继续交涉的机会。不能据此判断苏联一定没有进攻意图，也不能把现场事件简单等同于莫斯科已经放弃谈判。':'你暂不立即攻击，但提出进一步警告。威胁的内容与现场授权仍需明确，不能只用“强硬”二字概括。',['ships','plane']);
  push('第三方的同意，是另一道执行条件。',nodeExplanation(run,record('verification'),D.nodes.us.find(n=>n.id==='us-verification')),['turkey','verification']);
  if(w.us.orders==='delegated')issues.push('你给了海军较大的现场权限，却又希望在外交上控制升级。这并非直接矛盾，但中央克制需要具体命令支持；本作没有模拟现场一定怎样行动。');
  if(late)issues.push('最后都有不入侵保证的两局，过程可能不同。你第4个危机决定留下的缺口，后来由分步提案补上，不能只看最终一行条件。');
  if(w.us.turkey==='private')issues.push('你用秘密渠道讨论土耳其部署，同时仍需处理盟友与公开立场。这个过程没有被简化为“苏联好感增加”。');
 }
 else if(role==='ussr'){
  title=w.ussr.withdrawal==='accepted'?'你从前沿部署，转向条件撤除与盟友协调。':'你保留部署或附加条件，撤除安排仍未收拢。';
  parts.push('你先处理柏林的安全争议，随后批准向古巴部署核导弹。部署试图保护盟友并改变战略处境，也使美国面对更近的威胁。这是同一措施被不同国家作不同安全判断的情境。');
  parts.push((w.ussr.secrecy==='secret'?'你选择继续保密。':'你尝试改变公开安排。')+'美国公开实施隔离后，你仍需分别处理船只接触、撤除条件和古巴的参与，任何一项都不能替代其余问题。');
  parts.push(w.ussr.withdrawal==='accepted'?'你最终接受撤除原则。美国的保证与海上措施仍需落实，而古巴对被排除和现场核查的异议不会随苏方命令消失。':'你没有接受本局的最终撤除安排，因此程序没有自动宣布真实历史中的撤除结果。后续通信与禁试只作为假设议题继续。');
  push('保护古巴的部署，也会使美国感到更危险。','苏联对部署的防御解释不能消除它威胁美国的能力。你的部署与公开方式需要同时考虑对方如何理解，而不能把所有担忧都当成误会。',['deployment','secrecy']);
  push('你要求美国怎样回应苏联的让步？',w.ussr.turkey==='public'?'你坚持公开处理土耳其，扩大了公开前提。美国还面对盟友和国内的支持条件，这会影响它能够公开接受的范围。':'你允许私下处理部分条件，尝试扩大交换空间；但私下承诺也需要确认与执行。',['offer','turkey','withdraw']);
  push('苏联能撤除本国武器，却不能替古巴同意核查。','你还需要向古巴解释安全保障和参与方式。较强盟友优先控制全球风险，较弱盟友则可能担心自己的安全被牺牲。',['withdraw','mikoyan']);
  if(w.ussr.followup==='unilateral')issues.push('你优先落实苏方撤除，却仍需要古巴在部分执行问题上配合。对本国武器的决定权与对盟友领土的决定权不是同一件事。');
  if(w.ussr.turkey==='public'&&w.ussr.withdrawal!=='accepted')issues.push('你保留的公开交换前提，没有在本情境中获得美方接受。继续坚持能够维持要求，也可能延长撤除僵局。');
 }
 else{
  title=w.cuba.inspection==='limited-approved'?'你接受外部保护，同时改变了核查的准入条件。':'你寻求苏联保护，也保留了古巴对参与和核查的要求。';
  parts.push((w.cuba.security==='support'?'你先向苏联寻求援助并提出参与要求，随后接受了导弹部署。':'你先强调审查援助条件与加强本国防御，后来仍接受了苏联导弹部署。')+'接受部署并没有使古巴取得苏方核武器的使用权；保护与依赖同时进入了古巴的处境。');
  parts.push(w.cuba.nuclearRequest==='conditional'?'你在入侵条件下向苏联提出激烈建议。古巴希望避免遭到攻击，苏联还担心被拖入全面战争；双方虽是盟友，对风险的承受和排序并不相同。':'你把对苏方的请求集中在防御与外交保障，没有提出核先发建议。这改变了对盟友的要求，但不证明苏联会自动提供你希望的全部保护。');
  parts.push(w.cuba.inspection==='limited-approved'?'美苏公开撤除安排后，你原则批准了受限核查。这与古巴真实历史中的拒绝方向不同，但程序没有把你的原则许可写成美国接受具体条件或检查已经完成。':w.cuba.inspection==='terms'?'美苏公开撤除安排后，你同意商量核查条件，却没有提前批准外国人员入境。磋商、许可和实际检查是三个不同步骤。':'美苏公开撤除安排后，你拒绝现场核查。这保留了古巴的准入决定权，也使其他方面继续面对怎样确认撤除的问题。');
  push('保护你的盟友，也可能替你决定风险。','接受苏联援助可以服务于古巴安全，但苏联还要控制对美国的全球风险。你不能把阵营一致当作利益完全相同。',['security','deployment','excluded']);
  push('你怎样表达入侵担忧，而没有核发射决定权？',nodeExplanation(run,record('letter'),D.nodes.cuba.find(n=>n.id==='cuba-letter')),['defense','letter']);
  push('你把领土准入作为古巴自己的决定。',nodeExplanation(run,record('inspection'),D.nodes.cuba.find(n=>n.id==='cuba-inspection')),['excluded','inspection','mikoyan']);
  issues.push('美方不入侵保证回答的是一种安全担忧，不会自动回答谁有权进入古巴检查。接受、拒绝或商议核查，需要分别看待。');
  if(w.cuba.future==='autonomy')issues.push('你提出减少对单一盟友依赖的方向，但本作没有把这个目标当作古巴已经获得足够资源和独立防御能力。');
 }
 if(run.ending){const last=run.records.at(-1),n=D.nodes[role].find(n=>n.id===last.id);mechanisms.push({title:'这一项选择改变了后续前提。',text:nodeExplanation(run,last,n),evidence:[evidence(last)]});}
 if(!issues.length)issues.push('阶段性形成条件，不代表武器已经撤离、核查已经完成或所有关系已经修复。本局记录的每项进展都有相应边界。');
 const comparisons=run.records.map(r=>{const n=D.nodes[role].find(n=>n.id===r.id);return {record:r,node:n,close:n.historyChoice.includes(r.choiceId),explanation:nodeExplanation(run,r,n)};});
 let index;if(run.ending)index=run.records.length-1;else index=run.records.findIndex(r=>r.id===({us:'us-assurance',ussr:'ussr-offer',cuba:'cuba-inspection'}[role]));
 const original=run.records[index],before=M.rewind(run,index),n=M.node(before),alternative=n.options.find(o=>o.id!==original.choiceId),changed=M.changeOne(run,index,alternative.id),oldLocal=original.after,newLocal=changed.records[index].after;
 let counterText;
 if(run.ending)counterText='这项替换改变了原局结束的前提。但原局没有后续选择可以保持不变，因此这里不继续编造一条必然避免危机或赢得战争的路线。';
 else if(role==='cuba')counterText='只改古巴的核查选择，会改变古方准入立场；它不会撤销美苏已经公开的安排，也不会自动完成检查。这个比较检验的是古巴自己的决定权。';
 else {const localChanged=role==='us'?oldLocal.ussr.withdrawal!==newLocal.ussr.withdrawal:oldLocal.us.assurance!==newLocal.us.assurance;counterText=(localChanged?'替换这一步以后，对方在本情境中的当轮答复发生变化。':'替换这一步以后，本情境没有产生不同的当轮原则答复。')+(M.exchange(run.world)===M.exchange(changed.world)?(M.exchange(run.world)?'但保持后来选择不变，终局都形成了原则交换条件。后续决定补上了前面的缺口；过程不同，不一定使终局这一项记录不同。':'但你后来仍未接受最终撤除，所以两条路线在终局都没有形成完整的原则交换。对方愿意讨论保证，不等于苏方已经作出撤除决定。'):'保持后来选择不变，终局的原则交换状态也随之不同。这个差异来自本作明确的回应规则，不是对真实国家必然行为的因果证明。');}
 return {title,parts,mechanisms,issues,comparisons,counterfactual:{index,original:original.choice,alternative:alternative.text,text:counterText,changed},exchange:M.exchange(run.world)};
}
const api={analyze,nodeExplanation};root.PlatformAnalysis=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
