/* A small, explicit conditional-exchange scenario, not an equilibrium solver. */
(function(root){'use strict';
const fresh=()=>({exchange:0,force:'prepared',withdrawal:'unresolved',inspection:'not-discussed',turkey:'not-addressed',orders:'unset'});
function apply(previous,sceneId,choiceId,flags){const game={...previous},replies=[];
 if(sceneId==='response'){game.force=choiceId==='airstrike'?'attack':choiceId==='quarantine'?'quarantine':'prepared';}
 if(sceneId==='ships'){game.orders=flags.orders||'unset';if(flags.route==='quarantine')game.force='quarantine';}
 if(sceneId==='assurance'){game.exchange=+(choiceId==='conditional');}
 if(sceneId==='plane'&&choiceId==='strike')game.force='attack';
 if(sceneId==='turkey')game.turkey=choiceId;
 if(sceneId==='agreement'&&choiceId==='steps'){game.exchange=1;}
 if(['assurance','agreement','verification'].includes(sceneId)&&game.force!=='attack'){
  game.withdrawal=game.exchange?'principle':'unresolved';
  if(game.withdrawal!==previous.withdrawal)replies.push(game.withdrawal==='principle'?'在本作的简化条件下，苏联接受以撤除有关导弹交换美国不入侵保证和相应调整海上措施的原则方案。双方还没有完成武器撤除和核实。':'苏联尚未接受美国当前提出的撤除要求。美方还没有提出本情境要求的完整交换条件。');
  else if(sceneId==='assurance'&&game.withdrawal==='unresolved')replies.push('美国尚未提出完整交换条件，苏联在本情境中没有接受撤除方案。');
 }
 if(sceneId==='verification'){
  game.inspection=choiceId==='onsite'?'refused':choiceId==='alternative'?'alternative-proposed':'consultation-requested';
  replies.push(choiceId==='onsite'?'古巴没有同意联合国人员进入古巴实施现场核查。美国坚持要求，并不能代替古巴批准。':choiceId==='alternative'?'美国已经提出评估其他核实办法。古巴没有因此同意现场检查，有关办法也尚未完成核实。':'美国已请求联合国与古巴商量人员身份、任务和进入条件。没有古巴的进一步答复，不能认定古巴已经同意。');
 }
 return {game,replies};
}
root.Bargaining={fresh,apply};if(typeof module!=='undefined')module.exports=root.Bargaining;
})(typeof window!=='undefined'?window:globalThis);
