/* Reconstructed teaching scenario. No dialogue is a verbatim historical quote. */
(function(root){
const sources={
 book:{title:'《论美国》第17章',detail:'用户提供的中文版PDF，第517—519、527—529、538—540页（正文516—518、526—528、537—539页）。用于同盟协调、向上汇报及美国团队立场；不据此虚构逐场会谈记录。'},
 ottawa:{title:'德国联邦政府：1990年2月13日，渥太华',url:'https://www.bundesregierung.de/breg-de/schwerpunkte/deutsche-einheit/beschluss-von-ottawa-ueber-2-4-gespraeche-354028',detail:'两德与四国商定就统一的外部问题举行会谈。两德共同处理内部统一，不能由四大国代替德国人决定。'},
 paris:{title:'德国联邦政府：1990年7月17日，巴黎',url:'https://www.bundesregierung.de/breg-de/schwerpunkte/deutsche-einheit/dritte-2-4-ministerkonferenz-in-paris-476390',detail:'波兰参与涉及边界的会谈。两德议会已于6月21日作出同文声明；政治声明、六方条约与后续德波条约应当区分。'},
 dates:{title:'美国国务院历史办公室：德国',url:'https://history.state.gov/countries/germany',detail:'用于核对1990年10月3日德国统一与1991年3月15日最终解决条约生效，避免把签字与生效合并。'},
 memo:{title:'美国国务院：“两加四”的利弊备忘录',url:'https://nsarchive.gwu.edu/document/16124-document-11-u-s-state-department-two-plus-four',detail:'1990年2月21日文件。档案编者推测由佐利克执笔，并非已确定作者。用于理解程序如何影响各方位置。'},
 museum:{title:'美国外交博物馆：德国统一外交',url:'https://diplomacy.state.gov/berlin-wall/',detail:'官方历史介绍，确认佐利克参与“两加四”谈判的重要角色。'},
 memoir:{title:'佐利克：两加四，德国统一的经验',url:'https://nationalinterest.org/legacy/two-plus-four-1205',detail:'2000年回顾文章。说明美国团队的战略考虑；属于参与者事后解释，不是1990年的实时记录。'},
 treaty:{title:'1990年9月12日最终解决条约',url:'https://germanhistorydocs.org/en/a-new-germany-1990-2023/ghdi:document-176',detail:'条约原文：第1条边界；第3条军备；第4条苏军撤离；第5条原东德地区的军事安排；第6条联盟权；第7—9条权利、批准与生效。'},
 parliament:{title:'德国联邦议院：边界与军事地位',url:'https://www.bundestag.de/dokumente/textarchiv/1990-09-12-zwei-plus-vier-vertrag-202422',detail:'议会历史介绍，说明邻国关切、联盟归属和德国军力限制。'},
 final:{title:'美国会后报告：9月12日莫斯科会议',url:'https://nsarchive.gwu.edu/document/16139-document-25',detail:'1990年11月2日整理，包含最终会议情况和议定记录。仅在末轮复盘开放；不能当作此前已到手的文件。'},
 troops:{title:'德国联邦档案馆：苏军撤离',url:'https://www.bundesarchiv.de/staat-militaer-und-gesellschaft/armee-im-umbruch/die-bundeswehr-und-der-abzug-der-sowjetischen-streitkraefte-aus-deutschland/',detail:'撤离过程延续至1994年。条约签字、德国统一、撤军完成是不同事件。'}
};
const actors=[
 {id:'us',code:'US',name:'美国团队',person:'贝克 / 布什',want:'支持统一，也要让德国留在北约。',power:'贝克主持交涉；重大承诺须由领导层决定。',color:'#536d7b'},
 {id:'frg',code:'FRG',name:'联邦德国',person:'科尔 / 根舍',want:'尽快统一，恢复完整主权。',power:'同民主德国商谈内部统一；决定德国方面的承诺。',color:'#a28b4a'},
 {id:'gdr',code:'GDR',name:'民主德国',person:'民主德国代表团',want:'让德国人有权决定自己的未来。',power:'是两加四的一方，不应被当成等待处置的领土。',color:'#81724f'},
 {id:'ussr',code:'USSR',name:'苏联',person:'戈尔巴乔夫 / 谢瓦尔德纳泽',want:'避免统一使自身安全地位突然恶化。',power:'参与四国权利的终结；协商驻军与撤离条件。',color:'#a74a39'},
 {id:'uk',code:'UK',name:'英国',person:'英国代表团',want:'德国统一后的安全安排必须可靠。',power:'作为四国之一，审议最终解决安排。',color:'#635e7c'},
 {id:'fr',code:'FR',name:'法国',person:'法国代表团',want:'统一应有明确边界，也应留在欧洲合作之中。',power:'作为四国之一，审议最终解决安排。',color:'#486f69'},
 {id:'pl',code:'PL',name:'波兰',person:'斯库比谢夫斯基 / 波兰政府',want:'现有边界获得明确、可靠的确认。',power:'参与涉及边界的会谈；是后续德波边界条约当事方。',color:'#95675f'}
];
const scenes=[
 {id:'table',date:'1990年2月 · 渥太华',short:'谁坐上桌',place:'筹备会谈',title:'先决定谁有资格谈。',lead:'德国统一已经提上日程。可谈判还没开始，各方先争起了谁能坐上桌。',brief:['四国仍对柏林和德国整体拥有权利与责任。','德国人不愿再由大国关起门来决定德国的未来。','波兰担心，自己不在桌上，边界就会被留到最后。'],question:'贝克要你先准备一个谈判办法。你怎么写？',sources:['ottawa','memo','book'],history:'2月13日，各方在渥太华确定“两加四”框架。讨论对象是统一的外部问题；德国内部统一由两德处理。',consult:{frg:'让两个德国以当事方身份坐下。我们的未来，不能只由四国决定。',ussr:'四国的权利还在。任何办法都得处理这些权利，不能假装它们已经消失。',pl:'统一当然关系德国人，但边界也关系我们。请说清楚，谈到波兰时，我们在哪里。'},options:[
 {id:'twofour',title:'两德和四国一起谈。',desc:'把内部统一留给德国人，六方处理外部条件。',set:{format:'twofour'},responses:[['frg','愿意继续','德国人坐在桌边，内部统一也没有被交给四国。'],['ussr','附有条件','可以讨论这个程序，但安全和四国权利必须谈。'],['pl','还在追问','六方名单里没有波兰。谈边界时，我们要能发言。']]},
 {id:'four',title:'先让四国谈出一个办法。',desc:'先看四国能不能谈拢，再把两德请进来。',set:{format:'four'},responses:[['gdr','提出异议','如果别人已经决定好了，我们加入还有什么意义？'],['frg','提出异议','请把德国作为谈判当事方。这个程序需要重写。'],['ussr','愿意讨论','先谈四国责任有依据，但不能因此替德国人包办统一。']]},
 {id:'all',title:'请所有相关欧洲国家一起谈。',desc:'让邻国都能提出安全关切，再收拢成具体议题。',set:{format:'broad'},responses:[['pl','愿意参加','至少我们的边界不会在门外被讨论。'],['frg','担心拖延','问题越摊越大，统一的程序到底由谁负责？'],['us','要求修改','先区分正式缔约方与应被听取意见的邻国，不能混成一张名单。']]}
 ]},
 {id:'alliance',date:'1990年5月 · 以波恩会谈议题为背景',short:'德国属于哪里',place:'联盟归属',title:'统一以后，德国站在哪里？',lead:'苏联不愿看到一个统一德国留在北约。美国也不愿以德国退出北约作为统一的代价。只说“支持统一”，已经不够了。',brief:['联盟归属尚未解决；苏联的立场仍在变化。','美国团队希望统一德国留在北约。','你可以建议谈判办法，但无权替德国承诺中立。'],question:'下一份给贝克的建议，先谈什么？',sources:['memoir','book'],history:'联盟归属贯穿数月谈判。后来形成的安排保留德国选择联盟的权利，同时处理原东德地区的特殊军事条件；这不是5月就已落定的结果。',consult:{us:'先把能谈的条件列出来。不要在我的名义下承诺德国中立。',ussr:'如果只是把北约的军事部署原样往东推，你准备怎样解释我们的安全处境？',frg:'不能拿走德国选择联盟的权利，作为恢复主权的价格。'},options:[
 {id:'package',title:'保留北约归属，另谈部署条件。',desc:'把联盟身份和原东德地区怎样驻军分开讨论。',set:{alliance:'nato',securityTalk:true},responses:[['us','允许探讨','可以沿这个方向起草。具体限制和承诺还要报上来。'],['ussr','尚未同意','这是可以继续谈的问题，不代表我们已经接受北约归属。'],['frg','愿意继续','保留选择联盟的权利，具体安全安排另谈。']]},
 {id:'neutral',title:'建议用德国中立换苏联同意。',desc:'先向贝克申请改变美国立场，未经批准不向外承诺。',set:{alliance:'unapproved-neutral'},responses:[['us','未获授权','这改变了我们的基本方向。先不要拿它向其他代表作承诺。'],['ussr','愿意听取','中立值得讨论，但你是否得到美国和德国方面的授权？'],['frg','提出异议','你不能代替德国人决定联盟归属。']]},
 {id:'demand',title:'先要求苏联接受北约归属。',desc:'把美国立场说明白，部署与撤军的细节以后再谈。',set:{alliance:'nato',securityTalk:false},responses:[['us','保留立场','方向没有变。但你还得找出对方愿意继续谈的理由。'],['ussr','拒绝现稿','你只列了自己的目标，没有回答我们的安全问题。'],['uk','等待细节','原则声明还不能代替一份可执行的安全安排。']]}
 ]},
 {id:'border',date:'1990年7月 · 以巴黎边界会谈为背景',short:'波兰的椅子',place:'边界问题',title:'门外的波兰，也要一个答案。',lead:'德国的边界要写进最终安排。华沙不想只听一句“请相信我们”，也不愿等所有人谈完以后才拿到通知。',brief:['波兰不是两加四条约的六个缔约方之一。','边界问题直接涉及波兰，不能由美国替它接受。','两德能作出声明；后续德波条约仍需由相关国家完成。'],question:'波兰这边，你打算怎么办？',sources:['treaty','parliament'],history:'波兰外长参加7月17日巴黎会谈中涉及边界的讨论。最终条约确认边界的最终性，并要求统一德国与波兰以有约束力的条约确认现有边界。德波条约在11月14日签署。',consult:{pl:'我们要的是明确的边界安排，不是一句以后不会出事的安慰。',frg:'可以商谈确认办法，但要分清眼下声明与统一后缔约的权限。',fr:'如果邻国仍担心边界，最终解决就不能说已经谈妥。'},options:[
 {id:'binding',title:'请波兰参与边界讨论，把承诺写明。',desc:'草案确认边界的最终性，并列出后续德波缔约步骤。',set:{border:'binding'},responses:[['pl','有条件支持','这样才有可以核对的承诺。后续德波条约也必须落实。'],['frg','愿意商谈','把两德现在能承诺什么、统一后谁来签约写清楚。'],['fr','愿意继续','边界有了明确位置，可以继续处理安全安排。']]},
 {id:'later',title:'先让两德作政治保证，条文以后再写。',desc:'争取先推进其余议题，再回头处理边界。',set:{border:'assurance'},responses:[['pl','不接受空泛保证','等其他事情都谈好，我们还有多少要求修改的余地？'],['fr','要求补充','不能把边界一直留在附件之外。'],['frg','需要再谈','程序快了一点，但争议没有消失。']]},
 {id:'outside',title:'边界留给德国和波兰自己谈。',desc:'六方先完成自己的安排，不在本稿列出边界承诺。',set:{border:'excluded'},responses:[['pl','明确反对','如果这份安排影响我们的安全，就不能要求我们只在旁边等。'],['fr','提出异议','边界是最终解决的一部分，不能从六方文本里拿掉。'],['us','要求补谈','双边条约与六方确认可以衔接，不能用前者取消后者。']]}
 ]},
 {id:'military',date:'1990年7月 · 安全条件的交涉',short:'安全怎么保证',place:'原东德地区',title:'“不会威胁你”，具体指什么？',lead:'现在要谈军队了。部队归谁指挥、哪些地方可以驻军、哪些武器不能部署，都不能只靠一句善意。',brief:['联盟归属与具体军事部署，是相关但不同的问题。','德国军力上限和原东德地区的安排需要分别写明。','本轮只能起草建议；外国代表的回应不等于政府最终批准。'],question:'给苏方看的草案，你建议写到哪一步？',sources:['treaty','memoir'],history:'最终条约分别规定德国军力削减与原东德地区的军事安排。撤军前、撤军后适用的规定不同；第5条的地区性安排不能直接改写成一条关于整个东欧的笼统条约条款。',consult:{ussr:'请说清楚撤军前后分别怎样安排。我们要看的是条文，而不是一个形容词。',uk:'限制怎么写会影响部队行动。模糊的一句话，可能以后谁也解释不清。',frg:'德国军力和本国领土上的安排都要由德国方面参与决定。'},options:[
 {id:'specific',title:'先写清楚：多少兵，驻哪里，过渡期怎么办。',desc:'提出军力限制，原东德地区另设驻军和核武器条款；送各方审议。',set:{military:'specific'},responses:[['ussr','有条件继续','有具体限制才能继续谈。撤军时间和落实办法还没解决。'],['frg','有条件继续','可以审议，但军力承诺须由德国方面同意。'],['uk','要求核对','逐条看驻扎、部署与临时活动的含义，不能只看标题。']]},
 {id:'vague',title:'先承诺尊重苏联安全，不列细则。',desc:'避免过早卡住文字，试着先取得政治谅解。',set:{military:'vague'},responses:[['ussr','要求实质条件','你希望我们撤军，却没有说明撤军以后会发生什么。'],['uk','要求补充','我们同样不知道这句话将怎样限制行动。'],['frg','等待明确','没有条款，就无法判断德国要承担什么。']]},
 {id:'unlimited',title:'主权完整，就不另设地区限制。',desc:'主张统一后德国全境适用相同安排。',set:{military:'unrestricted'},responses:[['ussr','反对现稿','没有过渡和地区性安排，我们不能接受。'],['us','要求重谈','坚持联盟归属，不等于不需要谈安全条件。'],['frg','存在分歧','主权诉求没有自动解决外部安全问题。']]}
 ]},
 {id:'withdrawal',date:'1990年9月初 · 撤军条件',short:'部队怎样回去',place:'撤军与费用',title:'撤走一支军队，需要谁来付账？',lead:'一纸撤军条款背后，是营房、运输和安置。你不能用美国没有批准的钱作保证，也不能替德国政府写下金额。',brief:['苏联与德国需要商定撤军的期限和条件。','费用与安置安排涉及德国、苏联之间的具体协议。','六方最终文本与配套双边安排，应当相互衔接。'],question:'这一轮，你准备怎样推进？',sources:['treaty','troops'],history:'最终条约规定苏军撤离应在1994年底前完成，具体驻军与撤军条件由德国和苏联以条约商定。撤军并未在1990年签字时立即完成。',consult:{ussr:'时间表要和实际安置条件一起谈。只催日期，不会让部队自己回去。',frg:'我们可以同苏方谈配套安排，但具体承诺必须由德国政府决定。',us:'帮各方把问题接起来，不要替别人的财政部门签字。'},options:[
 {id:'linked',title:'让德苏谈配套，把时间表接上。',desc:'建议以1994年底为撤离期限，资金与安置另交有权部门确认。',set:{withdrawal:'linked'},responses:[['ussr','有条件继续','可以核对期限，但配套承诺必须真正谈妥。'],['frg','愿意交涉','德国方面与苏方确认具体条件，你不能替我们承诺金额。'],['us','允许推进','把尚未批准的内容标出来，分别送有关政府确认。']]},
 {id:'instant',title:'要求在德国统一前全部撤走。',desc:'不留长期过渡，把撤离作为立即完成的前提。',set:{withdrawal:'instant'},responses:[['ussr','拒绝现稿','你提出的时间与我们要完成的任务不相称。'],['frg','担心受阻','这会把统一进程绑在一个尚无可行方案的期限上。'],['us','要求调整','压力不能替代运输和安置安排。']]},
 {id:'promise',title:'先答应美国会承担费用。',desc:'用美国出资的口头保证，尝试换取撤军同意。',set:{withdrawal:'unauthorized'},responses:[['us','没有这项授权','这不是你能作出的承诺。必须收回，重新请示。'],['ussr','要求核实','请提供正式授权和可以落实的安排，口头答应还不算数。'],['frg','尚待协调','不要用未经确认的资金安排替代德苏交涉。']]}
 ]},
 {id:'final',date:'1990年9月 · 以莫斯科定稿议题为背景',short:'最后一处括号',place:'送交部长之前',title:'签字之前，再看一遍小字。',lead:'原东德地区的军事安排还得逐字核对。英国方面关心有关措辞是否会妨碍临时军事活动；苏方也不愿看到承诺在最后一刻被掏空。',brief:['常驻、部署与临时活动，不能随意混用。','任何修订都要重新交有关各方确认。','你交出的是待部长审议的草案，没有替六国签字的权力。'],question:'你准备怎样处理这处争议？',sources:['treaty','final'],history:'9月12日六方在莫斯科签署最终解决条约，并处理了相关议定记录。德国于10月3日统一；该条约于1991年3月15日生效。签字、统一与生效不能合并成同一刻。',consult:{uk:'请核对条款会不会把临时活动也一并堵死。不要等签完以后再各自解释。',ussr:'我们接受过的限制不能在最后一处小字里被取消。改了就要重新确认。',frg:'涉及德国领土的解释，德国政府也得同意。'},options:[
 {id:'clarify',title:'把争议写明，交各方重新确认。',desc:'保留限制，对具体用词作共同核对；此前未解决的问题仍列入待谈清单。',set:{final:'reviewed'},responses:[['uk','拿回去核对','可以核对解释，但不能把我们的审议省掉。'],['ussr','拿回去核对','只接受我们确认过的文本，不接受单方重写。'],['frg','拿回去核对','把条约与有关记录一起送审，德国方面也要确认。']]},
 {id:'hide',title:'先保留模糊写法，签后再解释。',desc:'避免现在重新争论，希望各方先接受整份文件。',set:{final:'ambiguous'},responses:[['uk','要求澄清','这正是我们要在签前弄清的问题。'],['ussr','保留同意','没有共同解释，就不能当成已经同意。'],['frg','要求澄清','争议不会因为签字就自行消失。']]},
 {id:'erase',title:'删去地区限制，再送出新稿。',desc:'争取更大的行动自由，但必须面对其他方重新审议。',set:{final:'removed',military:'unrestricted'},responses:[['ussr','撤回对现稿的支持','你修改了安全安排，之前的条件性回应不再适用。'],['uk','需要重审','这已经不是一个用词问题，而是修改了交易本身。'],['us','贝克没有同意','重大修改要重新请示，不能当作技术订正。']]}
 ]}
];
// Vary the presentation order; an option's position is not its recommendation.
for(const [i,ids] of [[1,['demand','package','neutral']],[2,['later','outside','binding']],[3,['vague','specific','unlimited']],[5,['hide','erase','clarify']]]){
 const items=scenes[i].options;scenes[i].options=ids.map(id=>items.find(o=>o.id===id));
}
scenes[2].sources.push('paris');
scenes[2].brief[2]='两德议会已在6月作出边界声明。接下来仍要处理六方条款与后续德波条约。';
scenes[5].sources.push('dates');
function fresh(){return {version:1,index:0,started:false,decided:false,complete:false,flags:{},history:[],consulted:[],chat:null,selected:null};}
function assess(flags){
 const goodFormat=flags.format==='twofour';
 const result={
 us:[flags.alliance==='nato'&&flags.withdrawal!=='unauthorized','美国授权','联盟方向与资金承诺必须在授权范围内。'],
 frg:[goodFormat&&flags.alliance==='nato','德国的当事方地位','德国参与决定自己的未来，也保留选择联盟的权利。'],
 gdr:[goodFormat,'民主德国的参与','不能由四国替两德决定内部统一。'],
 ussr:[flags.alliance==='nato'&&flags.military==='specific'&&flags.withdrawal==='linked'&&flags.final==='reviewed','苏方安全与撤离条件','需要具体军事安排、可行撤军配套及共同确认的文本。'],
 uk:[flags.final==='reviewed'&&flags.military==='specific','英国对文本的审议','有关军事活动的用词必须澄清并重新确认。'],
 fr:[flags.border==='binding'&&goodFormat,'法国对最终安排的审议','程序与边界都需要明确。'],
 pl:[flags.border==='binding','波兰边界关切','须参与有关讨论，并衔接有约束力的德波确认。']
 };
 return Object.fromEntries(Object.entries(result).map(([k,v])=>[k,{ready:v[0],title:v[1],reason:v[2]}]));
}
function choose(state,choice){
 if(state.complete||state.decided)throw Error('本轮已经提交');
 const scene=scenes[state.index],o=scene.options.find(x=>x.id===choice);if(!o)throw Error('无效选项');
 const s=JSON.parse(JSON.stringify(state));Object.assign(s.flags,o.set);s.decided=true;s.selected=choice;s.chat=null;
 let responses=JSON.parse(JSON.stringify(o.responses));
 if(state.index>0&&s.flags.format!=='twofour')responses.push(['gdr','程序仍未解决','你之前建议的程序没有保证两德的完整参与。这一异议仍然留在桌上。']);
 if(state.index>2&&s.flags.border!=='binding')responses.push(['pl','此前异议仍在','请别把边界当作已经处理完了。我们还没有得到明确安排。']);
 if(state.index===4&&s.flags.military!=='specific')responses.push(['ussr','安全条款仍未谈妥','撤军配套值得谈，但它不能替代军事安排。']);
 s.history.push({scene:scene.id,title:scene.title,date:scene.date,choice:o.title,choiceId:o.id,consulted:[...s.consulted],responses});return s;
}
function advance(state){if(!state.decided)throw Error('请先提交建议');const s=JSON.parse(JSON.stringify(state));if(s.index===scenes.length-1){s.complete=true;}else{s.index++;s.decided=false;s.selected=null;s.consulted=[];s.chat=null;}return s;}
function restore(p){
 if(!p||p.version!==1||!Array.isArray(p.history)||p.history.length>6||!Number.isInteger(p.index)||p.index<0||p.index>5)throw Error('无效存档');
 let s=fresh();s.started=!!p.started;
 for(let i=0;i<p.history.length;i++){
  const h=p.history[i];if(!h||h.scene!==scenes[i].id||!Array.isArray(h.consulted)||h.consulted.length>2||new Set(h.consulted).size!==h.consulted.length||h.consulted.some(id=>!Object.hasOwn(scenes[i].consult,id)))throw Error('无效记录');
  s.consulted=[...h.consulted];s=choose(s,h.choiceId);
  if(i<p.history.length-1||p.complete||p.index>i)s=advance(s);
 }
 if(s.index!==p.index||s.decided!==!!p.decided||s.complete!==!!p.complete)throw Error('进度不一致');
 if(!s.decided&&!s.complete){const ids=Array.isArray(p.consulted)?p.consulted:[];if(ids.length>2||new Set(ids).size!==ids.length||ids.some(id=>!Object.hasOwn(scenes[s.index].consult,id)))throw Error('无效交谈');s.consulted=[...ids];s.chat=ids.includes(p.chat)?p.chat:null;}
 return s;
}
const data={sources,actors,scenes,fresh,choose,advance,assess,restore};root.Germany=data;if(typeof module!=='undefined')module.exports=data;
})(typeof globalThis!=='undefined'?globalThis:this);
