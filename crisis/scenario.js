(function(root){'use strict';
const C=root.Conflict||(typeof require==='function'?require('./engine.js'):null);
const chapters=[
 {id:'berlin',title:'柏林不能退，但能走多远？',date:'1961',intro:'你接手的不只有古巴。柏林的通行争议，让美国的承诺、盟友的期待和现场的军事准备纠缠在一起。',theory:'安全困境与盟友协调'},
 {id:'testing',title:'他们试了，我们跟不跟？',date:'1961—1962',intro:'担心对方偷偷取得优势，会让克制变得困难。你需要区分已经确认的消息、技术判断，以及最坏情况的猜测。',theory:'信息不对称与核查'},
 {id:'cuba',title:'十三天',date:'1962 · OCTOBER',intro:'照片已经送进白宫。你要让苏联撤走导弹，同时设法控制每一道命令可能引出的后果。古巴也有自己的要求。',theory:'危机交涉与可信承诺'},
 {id:'aftermath',title:'下一次怎么办？',date:'1962—1963',intro:'交涉之后，核查、盟友关系和后续合作仍然需要处理。没有谈成的事项会保留，不会自动变成历史上的结果。',theory:'联盟政治与有限合作'}
];
const sources=[
 {id:'pig',title:'猪湾入侵及后续对古政策',org:'美国国务院历史办公室',url:'https://history.state.gov/milestones/1961-1968/bay-of-pigs',note:'开场背景。美国对古巴的实际行动应与相互误判分别理解。'},
 {id:'berlin',title:'柏林危机',org:'美国国务院历史办公室',url:'https://history.state.gov/milestones/1953-1960/berlin-crises',note:'柏林章节背景；具体交涉按问题压缩。'},
 {id:'gdr',title:'东德与柏林危机的档案研究',org:'Hope Harrison · 美国国家档案馆',url:'https://www.archives.gov/research/foreign-policy/cold-war/conference/harrison.html',note:'东德有自身诉求，不能只作为莫斯科的传声筒。'},
 {id:'cuba',title:'古巴导弹危机',org:'美国国务院历史办公室',url:'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis',note:'侦察、内部方案争论、不同沟通渠道、十月交涉和后续撤除。'},
 {id:'mikoyan',title:'1962年11月22日米高扬与卡斯特罗会谈',org:'National Security Archive · 苏方会谈记录',url:'https://nsarchive.gwu.edu/document/20666-national-security-archive-doc-11-record',note:'苏古对安全、部队及后续安排的分歧。会谈发言代表发言者当时的表述。'},
 {id:'ban',title:'有限禁试条约',org:'美国国务院历史办公室',url:'https://history.state.gov/milestones/1961-1968/limited-ban',note:'禁试谈判早于古巴危机。1963年的条约没有禁止地下试验。'},
 {id:'hotline',title:'直接通信联系备忘录',org:'联合国条约汇编 · 1963年6月20日',url:'https://treaties.un.org/doc/Publication/UNTS/Volume%20472/volume-472-I-6839-English.pdf',note:'最初的直接通信联系采用电报设备，并非两位领导人随手拨打的红色电话。'},
 {id:'kato',title:'State transition for de-escalation in the graph model for conflict resolution framework',org:'Yukiko Kato · JSIAM Letters · 2021',url:'https://www.jstage.jst.go.jp/article/jsiaml/13/0/13_60/_pdf/-char/en',note:'两主体四状态算例、稳定性定义及降温可达性。三方情境是本作品的扩展。'},
 {id:'gmcr',title:'GMCR 三十年发展回顾',org:'Hipel、Fang、Kilgour · 2020',url:'https://doi.org/10.1007/s10726-019-09648-z',note:'冲突图、行动可达性、序数偏好与稳定性。数学规则由本项目独立实现。'},
 {id:'mid',title:'Militarized Interstate Disputes 与编码资料',org:'Correlates of War Project',url:'https://correlatesofwar.org/data-sets/mids/',note:'记录军事威胁、展示武力、使用武力与战争。沿用分类思路，不声称已取得1962年逐日事件数据。'}
];
// All option effects and response texts below are disclosed scenario assumptions.
const scenes=[
 {id:'b1',ch:0,model:'berlin',date:'1961年 · 柏林局势',title:'怎样让盟友放心？',lead:'西柏林的问题还没有解决。盟友想知道，美国会不会维护当地的权利与存在。你要先把这份保证说到哪一步？',facts:['外交人员希望明确美国要维护哪些具体事项。','军方正在讨论必要的准备；准备不等于已经决定使用武力。','东德方面也有自己的政治与通行诉求。'],unknown:'你不知道苏方是否会把新的美方准备理解成进攻信号。',ask:'你准备先做什么？',consult:[['国务卿','先说清楚我们要维护什么。不要让每个人都把一句保证理解成自己希望的样子。'],['军事顾问','准备需要时间。我们可以先做准备，再由你决定怎样使用。'],['盟友来电','我们需要明确支持，也希望你在公开讲话前与我们协调。']],history:'柏林争议涉及美苏及德国方面的不同目标。这里把多次接触压缩成三个问题，没有把柏林写成古巴部署的必然原因。',sources:['berlin','gdr'],options:[
  {id:'clear',title:'把要维护的事项说清楚。',desc:'公开重申责任，避免没有边界的保证。',set:{1:1},flag:{clearPledge:true},feedback:'盟友收到明确表态。外交团队继续核对，对方是否理解了同样的边界。',review:'明确保证有助于解释立场，也会限制后来怎样调整措辞。'},
  {id:'allies',title:'先和盟友商量，再一起表态。',desc:'多花一些时间，减少公开说法互相打架。',set:{1:1},flag:{alliesConsulted:true},feedback:'磋商记录送来，仍有需要协调的措辞。等待期间，现场问题并没有停止。',review:'盟友不是背景。它们的反馈决定了公开声明是否能够共同发出。'},
  {id:'prepare',title:'先加强准备，让盟友看见行动。',desc:'增加准备也可能引起对方警惕。',set:{0:1},mid:3,feedback:'准备命令进入执行。现场人员要求你继续明确，可以做到哪一步。',review:'增加力量可能安抚盟友，也可能让对手更加不安；要看它随后怎样回应。'}]},
 {id:'b2',ch:0,model:'berlin',date:'1961年 · 现场对峙',title:'命令，写到哪一步？',lead:'双方力量在现场直接对峙。指挥官请求进一步指示。你还不能确认，对方究竟是在试探，还是准备升级。',facts:['现场有自己的信息与反应时间。','美国指挥官可以提出建议，重大决定仍需按命令权限处理。','让现场等指示，也可能产生新的风险。'],unknown:'对方的下一步命令尚未送达你的桌面。',ask:'你怎样划定现场权限？',consult:[['军事顾问','“必要时应对”太含糊。请说清楚什么情况需要重新请示。'],['外交人员','我们的行动规则，也会改变对方对美国意图的判断。']],history:'现场对峙与高层沟通并行。对具体命令的重构应与真实逐字命令区分。',sources:['berlin'],options:[
  {id:'central',title:'保持位置，进一步行动先请示。',desc:'保留中央控制，承受等待的代价。',set:{0:1},flag:{tightOrders:true},mid:3,feedback:'指挥官确认了请示要求。联络是否及时，成为接下来必须盯住的问题。',review:'中央控制较强，未必代表现场反应总能及时。'},
  {id:'bounded',title:'列出几种情况，允许现场按规则应对。',desc:'授权有边界，每次行动都要报告。',set:{0:1},flag:{delegated:true},mid:3,feedback:'命令列明了权限范围。你也承担了现场可能作出不同判断的风险。',review:'授权改变的是谁能采取下一步，不是直接替对方决定反应。'},
  {id:'channel',title:'保持防护，同时问清后撤条件。',desc:'军事准备继续，外交渠道开始探询。',set:{0:1,1:1},flag:{backchannel:true},mid:3,feedback:'接触请求发出。你仍要等对方是否愿意把退让顺序谈清楚。',review:'两条渠道并行，可能保住接触机会，也可能传出不一致的信号。'}]},
 {id:'b3',ch:0,model:'berlin',date:'1961年 · 寻找退路',title:'都有退意，谁先动？',lead:'渠道传来消息，对方可能愿意讨论相互后撤。但顺序还没有谈妥。你得提出一个能执行的办法。',facts:['一方表达兴趣，还不是双方已经同意。','后撤需要确认，也需要与现场人员沟通。','东德的配合与美苏接触是不同事项。'],unknown:'你不能保证对方第一步一定照约定行动。',ask:'你怎样提出后撤安排？',consult:[['外交人员','可以把大动作拆成小步骤。每一步要由谁确认，请一起写清楚。'],['军事顾问','先动以后怎么办？如果对方没有回应，我们需要备用命令。']],history:'历史中的后撤依赖接触与现场执行。游戏保留磋商和配合问题，不把“愿意谈”写成已经完成撤退。',sources:['berlin','gdr'],options:[
  {id:'steps',title:'小步交替后撤，一步一确认。',desc:'提出程序，等对方接受；不直接替它撤退。',set:{1:1,0:0},flag:{berlinSteps:true},feedback:'美方提出交替安排，并作有限调整。对方接下来是否移动，将决定这个办法能否继续。',review:'程序为相互回应提供条件；有路径不等于已经走完。'},
  {id:'first',title:'要求对方先退，我们再回应。',desc:'保住现有位置，也可能停在互相等待。',set:{0:1,1:0},feedback:'要求已传达。如果对方也坚持你先动，双方需要重新寻找顺序。',review:'等待可以保住位置，但也可能使可接受的退路迟迟无法执行。'},
  {id:'limited',title:'先作有限调整，明确希望对方回应什么。',desc:'动作可控，未得到回应就重新评估。',set:{0:0,1:1},flag:{berlinSteps:true},feedback:'现场收到有限调整的命令。外交团队等待对方确认，不把沉默算作同意。',review:'你为后撤创造了入口，也承担了对方暂不配合的风险。'}]},
 {id:'t1',ch:1,model:'testing',date:'1961年 · 核试验消息',title:'担心落后，有多少依据？',lead:'苏联恢复核试验的消息到了。军方担心美国失去优势，科学顾问则在区分已经确认的变化和最坏情况的猜测。',facts:['已有消息不能说明对方全部技术进展。','准备试验、决定实施与实施后的结果是三件事。','有关放射性影响的讨论也在继续。'],unknown:'你没有掌握对方所有试验数据。',ask:'先怎样回应？',consult:[['科学顾问','请把测量结果和推测分开。我们可以继续收集，但不能保证消除全部不确定性。'],['军事顾问','准备可以先做。什么时候批准实施，由你决定。'],['公众来信','政府说需要安全，我们想知道有关试验会带来什么影响。']],history:'核试验与禁试谈判有各自延续的背景。不能把每一次试验都当成针对古巴危机的直接行动。',sources:['ban'],options:[
  {id:'assess',title:'先补充评估，暂不宣布实施。',desc:'判断依据更充分，也承受继续等待的压力。',set:{0:0,3:1},flag:{scienceChecked:true},feedback:'评估请求已发出。报告仍会把已确认和未确认的部分分别列出。',review:'收集信息有价值，也有时间成本。信息多了，不等于只剩一种决定。'},
  {id:'ready',title:'先批准准备，实施另作决定。',desc:'准备本身也可能被外界观察到。',set:{0:0},flag:{testPrepared:true},feedback:'有关部门开始准备，尚未得到实施许可。外交人员担心这会引发外界猜测。',review:'不要把准备记录自动算作已经进行核试验。'},
  {id:'explain',title:'公布确认的情况，继续禁试接触。',desc:'不把猜测当成结论，也不保证对方接受解释。',set:{3:1},flag:{scienceChecked:true},feedback:'说明发布，科学与外交人员继续接受追问。苏方是否愿意回应，仍需接触。',review:'公开材料能解释立场，也会暴露目前不能回答的问题。'}]},
 {id:'t2',ch:1,model:'testing',date:'1961—1962年 · 两条路线',title:'试验和谈判，怎样安排？',lead:'桌上出现具体试验需求。禁试谈判仍卡在核查问题上。继续等待和立即实施，都有代价。',facts:['技术收益由有关评估说明，不能直接等于国家安全提升。','对方是否暂停，要由对方决定。','同一政策可能得到不同国内群体的支持或反对。'],unknown:'你无法确认对方是否会秘密继续有关活动。',ask:'你批准哪种安排？',consult:[['科学顾问','不同试验回答的问题不同。不要把一份笼统担忧当成每项试验的理由。'],['外交人员','暂停需要对方配合，也需要说明如何确认。']],history:'1960年代早期，美苏恢复试验与禁试接触并存。本文选项是情境重构。',sources:['ban'],options:[
  {id:'test',title:'按明确需求批准有关试验，谈判继续。',desc:'推进技术工作，同时解释范围和目标。',set:{0:1,3:1},flag:{testAuthorized:true},feedback:'有关试验得到批准。反对者要求解释放射性影响，外交团队继续说明谈判仍在进行。',review:'实施与谈判可以并行，但会使对方怀疑两者的关系。'},
  {id:'pause',title:'提出相互暂停，给核查讨论留时间。',desc:'美方暂缓；是否成为双方暂停仍待回应。',set:{0:0,3:1},flag:{pauseOffer:true},feedback:'暂停提议送出。没有收到确认前，界面不会显示“双方已停”。',review:'本国选择与共同安排必须分开记录。'},
  {id:'narrow',title:'先谈范围较小的限制。',desc:'把较容易达成的事项先列出来。',set:{3:1},flag:{limitedTalk:true},feedback:'外交团队准备有限范围的提案。对方和本国有关人员分别评估它留下的缺口。',review:'缩小范围可能出现交集，也可能被认为放弃了重要问题。'}]},
 {id:'t3',ch:1,model:'testing',date:'1962年 · 核查争议',title:'要查到哪一步，才敢相信？',lead:'美方要求足够的核查条件，苏方担心检查暴露军事信息。科学顾问解释：有些活动较容易发现，有些不能轻易分辨。',facts:['核查需要对方同意相关程序。','不同范围的协议，面对的核查难题不同。','本节点只形成谈判方向，不提前宣布1963年的条约。'],unknown:'对方的真实接受范围需要在交涉中了解。',ask:'你给谈判团队什么指示？',consult:[['科学顾问','把能检测什么、不能检测什么说清楚。政治承诺代替不了技术能力。'],['外交人员','可以分别讨论范围、次数和程序。一个“全面核查”还不是可以执行的文本。']],history:'全面禁试长期受地下试验与现场核查争议影响。有限禁试后来将地下试验留在范围之外。',sources:['ban'],options:[
  {id:'full',title:'保留较全面的检查要求。',desc:'争取可靠核查，也承担对方拒绝的可能。',set:{3:0},flag:{fullInspection:true},feedback:'要求保持严格。谈判团队报告，这使部分分歧暂时无法收拢。',review:'更高要求可能增加本国信心，也可能缩小谈判交集。'},
  {id:'details',title:'逐项谈次数、范围和程序。',desc:'把分歧拆开，不保证都能解决。',set:{3:1},flag:{inspectionDetailed:true},feedback:'双方继续交换具体要求，仍有需要各自请示的事项。',review:'原则一致与程序可执行，是不同层次。'},
  {id:'limited',title:'难以核查的先留到以后。',desc:'尝试形成有限范围的共同文本。',set:{3:1},flag:{limitedTalk:true},feedback:'有限范围进入讨论。有关人员继续评估它留下什么，而不是将其当成全面解决。',review:'部分合作应当按其实际覆盖范围评价。'}]},
 {id:'c1',ch:2,model:'cuba',date:'1962年10月中旬 · 侦察照片',title:'照片摆上桌，还要确认什么？',lead:'侦察照片显示古巴正在建设有关导弹设施。设施何时能够使用、完整部署和苏方意图，仍有未知部分。',facts:['照片支持有关设施存在的判断。','尚不能保证掌握全部目标和人员情况。','你此时看不到苏古内部讨论记录。'],unknown:'美方无法确认全部现场指挥与武器情况。',ask:'你先做什么？',consult:[['情报负责人','我们会注明哪些判断来自照片，哪些仍需其他材料印证。'],['国务卿','请同时准备不同办法。现在还不应把一种方案当成唯一选择。']],history:'侦察照片使白宫集中处理导弹问题。游戏不向玩家提前展示后来解密的全部部署。',sources:['cuba'],options:[
  {id:'meet',title:'秘密召集核心顾问，立即比较办法。',desc:'先把各方案的目标和风险摆在同一张桌上。',flag:{cabinet:true},feedback:'核心讨论开始。军事、外交和情报人员提出不同判断，尚未形成共同建议。',review:'总统有决定权，但建议的形成仍需要不同人员提供信息。'},
  {id:'recon',title:'补充侦察，应对方案同时准备。',desc:'争取更多信息，也承担侦察行动的风险。',flag:{recon:true},feedback:'补充任务进入准备。新消息要等任务完成后才能确认，并非立即消除未知。',review:'更多侦察可能改进判断，也会产生新的行动风险。'},
  {id:'ask',title:'先通过外交渠道质询苏方。',desc:'得到的解释仍需核实，苏方也会知道美方的关注。',flag:{diplomaticQuery:true},feedback:'质询送出。对方得到美方正在追问的信号，但没有因此交出全部信息。',review:'询问既是获取信息，也在向对方传递信息。'}]},
 {id:'c2',ch:2,model:'cuba',date:'1962年10月 · 方案讨论',title:'先采取哪种回应？',lead:'空袭、海上隔离和先交涉，都已摆上桌。没有人能够保证一项行动会消除全部导弹，或保证对方及时接受要求。',facts:['空袭可能造成伤亡，并引出新的军事回应。','海上隔离会产生船只接触与执行问题。','外交要求也需要处理等待、期限和不被接受的情况。'],unknown:'你不知道苏方与古方最终会接受什么条件。',ask:'你决定先推进哪种办法？',consult:[['军事顾问','我们能给出行动方案，但不能保证一次行动消除所有目标。'],['国务卿','要给对方一个知道如何回应的要求，也要留意我们自己的退路。']],history:'肯尼迪最终选择海上隔离，同时继续准备与交涉。这里保留不同选择，但军事分支不冒充对后续战争的完整预测。',sources:['cuba'],options:[
  {id:'airstrike',title:'批准实施空袭。',desc:'进入军事分支并结算；本版不推算整个战争。',terminal:'airstrike',mid:4,feedback:'你批准了空袭，相关行动开始。目标能否全部达成、苏古怎样回应，超出本版对后续战争的覆盖范围。',review:'这条分支记录了你怎样走到使用武力，不把战争结果编成一个成功率。'},
  {id:'quarantine',title:'采取海上隔离，同时要求撤除。',desc:'继续交涉，接下来必须写清海上规则。',set:{0:1},mid:4,flag:{route:'quarantine'},feedback:'海上隔离措施开始执行，撤除要求同步发出。接下来还要明确现场接触船只的具体规则。',review:'本版沿MID分类思路把海上封锁类行动列入“使用武力”；不是战争概率。'},
  {id:'diplomacy',title:'先提出有期限的外交要求，军事准备继续。',desc:'期限只约束美方重新评估，不预告战争何时发生。',set:{0:0},mid:2,flag:{route:'diplomacy'},feedback:'要求传出，军事准备没有取消。期限到达时，你需要重新评估，不能把没有回应直接当作开战命令。',review:'公开要求会形成压力，也可能使后来调整更难解释。'}]},
 {id:'c3',ch:2,model:'cuba',date:'1962年10月 · 对外说明',title:'怎样向公众和盟友说明？',lead:'你需要解释美国正在做什么。演讲稿里有不同强度的警告，盟友也在等待消息。',facts:['讲话应区分证据、要求与可能后果。','先通知盟友不代表对方接受全部措施。','公开承诺会进入以后交涉的背景。'],unknown:'对方听到的是公开表态，不会自动知道你的全部保留条件。',ask:'你怎样安排讲话与磋商？',consult:[['演讲团队','请决定哪些是明确要求，哪些是警告。不要把没有批准的行动写成已决定。'],['盟友消息','我们希望在公开宣布前知道主要内容，也保留自己的判断。']],history:'美国公开讲话与盟友接触是危机的一部分。公开立场与秘密渠道并不完全相同。',sources:['cuba'],options:[
  {id:'limits',title:'说明证据、目标和行动边界。',desc:'让对方知道可以怎样回应，不承诺没有批准的后果。',flag:{publicClarity:true},feedback:'讲话把要求与行动边界分别说明。部分顾问仍希望使用更强措辞。',review:'说明边界有助于理解，也会使后来改变要求更明显。'},
  {id:'warning',title:'突出严重后果，要求苏方立即退让。',desc:'增加公开压力，也压缩自己解释妥协的空间。',set:{0:1},mid:2,flag:{hardSpeech:true},feedback:'警告公开发布。它是否促成让步，要看对方怎样理解与回应。',review:'不能把强硬措辞直接换算成威慑成功。'},
  {id:'consult',title:'先完成必要磋商，再发表讲话。',desc:'争取配合，承受等待和消息外泄的风险。',flag:{alliesConsulted:true},feedback:'有关盟友收到说明并提出意见。美方还需要决定哪些建议纳入最终表态。',review:'盟友的反馈通过具体意见影响方案，不用一个总满意度替代。'}]},
 {id:'c4',ch:2,model:'cuba',date:'1962年10月 · 执行规则',title:'船只接近时，现场怎么办？',alt:{when:'diplomacy',title:'期限在走，接下来怎样准备？',lead:'你先选择了外交要求。期限正在临近，军方请求明确准备与执行的界线。你还没有批准海上隔离。'},lead:'海军报告船只动态，请求明确接触规则。部分信息可以远程确认，部分需要接触才能判断。',facts:['授权规则与实际发生的军事行动分开记录。','现场报告不能保证完整，也不能保证立即送达。','本节点不把提出规则直接写成已经发生交火。'],unknown:'现场人员看到的情况，可能比白宫收到的报告更新。',ask:'你怎样划定下一步权限？',consult:[['海军联络人员','把需要请示的事项列明。现场需要知道什么可以做、什么不可以。'],['外交人员','对方也在判断这些规则。可以传递边界，但不能保证它相信。']],history:'海上措施涉及执行与沟通。对先交涉路线，本节点改为准备与授权，不强行插入未获批准的隔离行动。',sources:['cuba'],options:[
  {id:'report',title:'关键接触先请示，先核实情况。',desc:'保留中央控制，关注报告能否及时传递。',flag:{tightOrders:true},feedback:'命令明确了请示范围。现场等待报告时，局势仍会继续变化。',review:'更集中控制与更快速应对之间存在取舍。'},
  {id:'delegate',title:'列清条件，给现场相应处置权限。',desc:'在有限范围内执行，每次行动均需报告。',flag:{delegated:true},feedback:'权限和限制一并发出。你需要为现场可能与预期不同的判断负责。',review:'授权不是战争发生概率；它改变可执行动作的范围。'},
  {id:'different',title:'分情况处理，规则也通过渠道说明。',desc:'不把所有接触一概而论。',flag:{publicClarity:true,tightOrders:true},feedback:'有关人员按情形核对规则。掌握的信息不足时，仍然需要请示。',review:'分类处理依赖信息质量，不会自动使每次接触安全。'}]},
 {id:'c5',ch:2,model:'cuba',date:'1962年10月26日前后 · 间接渠道',title:'有人带来一个可以谈的条件。',lead:'间接渠道传来消息：撤除可能与美国不入侵古巴的保证有关。传话人能代表谁？这是不是得到授权的条件？',facts:['传来条件，不等于正式提案已经成立。','不入侵保证必须明确对象、内容与相关条件。','古巴的要求不一定与美苏完全相同。'],unknown:'你尚未确认对方把哪些话当成正式承诺。',ask:'怎样接住这条消息？',consult:[['国务卿','可以回应，但要标明哪些话属于试探，哪些已经得到批准。'],['联络人员','我们可以核实渠道。得到一个解释还需要与其他消息对照。']],history:'间接接触与领导人来信并行，信息需要辨别与核实。页面中的对话并非历史原话。',sources:['cuba'],options:[
  {id:'verify',title:'先核实渠道，再明确回应。',desc:'暂不作出不入侵承诺。',flag:{channelChecked:true},feedback:'核实请求已经送出。对方此时看到的是美方继续询问，还不是明确保证。',review:'少承诺减少误传，也可能让对方继续等待。'},
  {id:'conditional',title:'给出附条件回应，试探撤除安排。',desc:'明确这项提案与撤除有关，不冒充无条件保证。',set:{1:1},flag:{conditionalAssurance:true},feedback:'美方提出与撤除相关的不入侵保证。是否接受和怎样落实，还需要双方继续交涉。',review:'在本模型里，这改变苏方对撤除方案的排序；参数是公开的情境假设。'},
  {id:'formal',title:'转入正式渠道，要求明确文本。',desc:'把权责写清楚，不把传话当成协议。',flag:{formalText:true,channelChecked:true},feedback:'文本要求发出。正式渠道可能更清楚，也可能更慢或出现更强措辞。',review:'形式更正式，不一定立即扩大可以达成的范围。'}]},
 {id:'c6',ch:2,model:'cuba',date:'1962年10月27日 · 飞机被击落',title:'是否立即反击？',lead:'侦察飞机被击落。报告尚不能完全说明谁批准了行动，也不能直接证明莫斯科决定统一升级。',facts:['事件已经发生，伤亡不能被后来的谈判抹去。','行动归属和高层授权需要分别核实。','总统需要同时处理军事建议和正在进行的交涉。'],unknown:'现场责任与有关指令尚未全部核实。',ask:'你怎样回应？',consult:[['军事顾问','我们可以准备回应，但请明确是否已经批准实施。'],['国务卿','先区分发生了什么，与是谁决定要传递什么信号。']],history:'飞机被击落与高层交涉同时发生。不能让玩家根据后来才有的档案直接认定全部责任链。',sources:['cuba'],options:[
  {id:'strike',title:'批准针对有关目标的军事回应。',desc:'进入军事分支并结算；后续战争未在本版展开。',terminal:'retaliation',mid:4,feedback:'你批准了军事回应。新的武力行动使后续局势超出本版覆盖范围，本条分支在此记录并结算。',review:'使用武力是一个新的行动，不是把危机条简单加满。'},
  {id:'hold',title:'暂缓反击，先核实指挥责任。',desc:'保持准备，继续处理交涉。',flag:{incidentChecked:true},mid:4,feedback:'反击暂缓，核实请求发出。军事顾问要求你说明再次发生事件时怎样处理。',review:'暂缓行动保留了决定空间，也需要承受进一步事件的风险。'},
  {id:'warn',title:'发出警告，调整侦察与防护。',desc:'不立即实施打击，重新说明行动边界。',set:{0:1},flag:{warningAfterIncident:true},mid:4,feedback:'警告与新安排传出。其他方面如何理解，还要看下一份回复。',review:'危机中的警告既传递立场，也可能被当成行动即将开始的信号。'}]},
 {id:'c7',ch:2,model:'cuba',date:'1962年10月27日前后 · 条件与盟友',title:'谈到了土耳其。',lead:'苏方要求涉及土耳其导弹。顾问提醒你，这件事涉及盟友关系和执行程序，不能只当成美苏之间的一个按钮。',facts:['美国可以决定自己的政策，但涉及盟友的安排仍需处理协调。','秘密说明与公开交换不是同一种承诺。','本模型不把土耳其的全部反应压成一个数字。'],unknown:'你不能保证有关盟友怎样接受或解释调整。',ask:'你怎样处理这项要求？',consult:[['国务卿','把公开回应与秘密说明的边界分开。不要对没有协调的事情作出过度承诺。'],['盟友渠道','有关我们的安排，希望事先得到解释。'],['司法部长渠道','我可以传达经你批准的内容，不代表对方已经接受。']],history:'罗伯特·肯尼迪与多勃雷宁的秘密接触涉及土耳其导弹。公开安排、秘密说明与之后的撤除需要分开。',sources:['cuba'],options:[
  {id:'reject',title:'公开拒绝把两件事联系起来。',desc:'维持立场，也可能让对方认为退路不足。',flag:{turkey:'reject'},feedback:'公开拒绝已经作出。外交团队仍需了解苏方是否愿意沿其他条件继续谈。',review:'一项公开立场不能证明对方没有其他可接受安排。'},
  {id:'private',title:'继续秘密接触，限定可以说明的内容。',desc:'记录传达范围，安排有关协调。',set:{1:1},flag:{turkey:'private',conditionalAssurance:true},feedback:'经批准的说明通过渠道传递。它保留商谈机会，也留下盟友协调和执行问题。',review:'该具体议题记入事件记录；五条件模型不声称独立求解土耳其问题。'},
  {id:'coordinate',title:'先争取与有关盟友协调，再回应。',desc:'增加参与，承受时间和保密压力。',flag:{turkey:'coordinate',alliesConsulted:true},feedback:'协调请求发出。得到意见以前，系统不会把土耳其事项标成已经完成。',review:'协调是实际过程，不能把发送通知算作获得同意。'}]},
 {id:'c8',ch:2,model:'cuba',date:'1962年10月28日前后 · 执行安排',title:'有了撤除提案，怎样落实？',lead:'交涉出现新的机会。你需要把原则说法变成执行安排：撤什么，怎样确认，完成一步后美国怎样回应。',facts:['苏方是否接受撤除，取决于此前和本轮提出的条件。','古巴是否接受现场核查，是另一项决定。','本轮不会提前宣称所有武器已经撤走。'],unknown:'提案可能被接受，也可能被要求补充。',ask:'你给出怎样的执行办法？',consult:[['外交人员','如果各方只说“同意原则”，还要有人把每一步的条件写出来。'],['核实人员','没有现场核查时，要说明其他办法能确认什么，不能确认什么。']],history:'10月28日的宣布不是所有后续事项立即完成。海上措施、轰炸机、核查和苏古协调继续进入交涉。',sources:['cuba','mikoyan'],options:[
  {id:'principle',title:'先确认原则，再逐项谈执行。',desc:'保留现有压力，未作出的保证不会自动补上。',flag:{implementation:'principle'},feedback:'美方提出先确认原则。各方继续判断，条件是否足以进入执行。',review:'如果苏方仍没有接受撤除，这一局就停在继续交涉，不会出现虚构的胜利宣布。'},
  {id:'insist',title:'先把核查办法谈清，再调整美方措施。',desc:'明确标准，也可能延长争议。',set:{0:1},flag:{implementation:'insist'},feedback:'核查要求保持明确。古巴的接受与否会成为后续的具体障碍。',review:'美苏之间的兴趣交集，不等于古巴接受全部执行方式。'},
  {id:'reciprocal',title:'提出分步执行，每完成一步相应回应。',desc:'提出附条件保证并调整施压，等待对方采取自己的行动。',set:{0:0,1:1},flag:{implementation:'steps',conditionalAssurance:true},feedback:'分步安排送出，美方作出限定调整。苏方是否接受撤除，将由它自己的规则回应。',review:'相互步骤可以扩大可行路径，仍需各方分别确认并落实。'}]},
 {id:'a1',ch:3,model:'cuba',date:'1962年10月底至11月 · 仍需核实',title:'古巴有自己的答案。',lead:'现场核查并未得到古巴同意。你也许已经取得苏方撤除承诺，也许仍在争取。接下来，怎样取得足够的确认？',facts:['核查需要有关方面配合。','海上观察或其他核实办法，不等于无所不知。','美方可以提出安排，不能替古巴接受。'],unknown:'有些现场情况仍未得到充分确认。',ask:'你怎样推进？',consult:[['核实人员','不同办法覆盖不同信息。我们应把剩余未知写出来。'],['外交人员','调停可以传递要求，不能保证替任何一方答应。']],history:'古巴反对有关现场核查，苏古后续交涉持续到11月。不能在10月28日直接宣称全部问题解决。',sources:['cuba','mikoyan'],options:[
  {id:'onsite',title:'继续争取现场核查，维持要求。',desc:'保留标准，接受争议延续的可能。',set:{0:1},flag:{verification:'onsite'},feedback:'原有核查要求继续传达。若古方没有同意，执行缺口仍然保留。',review:'对方拒绝不是游戏出错；它也有改变方案的能力。'},
  {id:'alternative',title:'评估其他核实办法，列清局限。',desc:'改谈替代程序，不要求古巴自动开放现场。',set:{0:0,1:1},flag:{verification:'alternative'},feedback:'核实团队准备替代程序。它需要有关配合，且不能消除所有未知。',review:'本版用“替代程序已提出”记录进展，不把它当成历史上任意条件都能成立。'},
  {id:'mediator',title:'通过调停，提出对等的程序磋商。',desc:'请求古方讨论条件；愿意磋商不等于接受检查。',set:{0:0,1:1},flag:{verification:'mediator',reciprocalInspection:true},feedback:'程序磋商请求传达。在本情境设定中，对等条件可以改变古方的接受排序，但仍由古方回应。',review:'偏好调整是本项目的情境假设，应与真实古方立场分别比较。'}]},
 {id:'a2',ch:3,model:null,date:'1963年 · 通信联系',title:'下次还要这样来回传话吗？',lead:'你收到危机总结：消息送达、翻译、确认和理解都曾出问题。有关人员提出建立更直接的通信联系。',facts:['通信更快，不等于双方利益一致。','建立联系与决定怎样使用，需要分别安排。','最初的热线采用电报设备。'],unknown:'一条更快的渠道，仍不能让你直接知道对方真实意图。',ask:'你怎样安排这项工作？',consult:[['通信人员','先确定设备、送达与确认程序，才能谈随时可用。'],['外交人员','写清楚谁发出、谁确认，避免把普通消息误认成领导人的正式决定。']],history:'1963年6月20日签署的备忘录规定了直接通信联系。它改善通信条件，不是无条件互信。',sources:['hotline'],options:[
  {id:'priority',title:'优先建立直接联系。',desc:'技术与程序同步推进。',flag:{hotline:'priority'},feedback:'技术与外交人员进入准备，程序仍需双方确认。',review:'这里更新通信事项，不改变三方核查模型，也不抹去已经发生的军事行动。'},
  {id:'procedure',title:'先明确使用和确认规则。',desc:'先把发信、翻译与确认说清楚。',flag:{hotline:'procedure'},feedback:'程序草案形成，设备和操作仍需安排。',review:'可靠渠道既需要技术，也需要明确的操作规则。'},
  {id:'existing',title:'先加强现有渠道。',desc:'暂不承诺新的直接联系。',flag:{hotline:'existing'},feedback:'现有渠道接受检讨和调整，新联系暂未进入共同安排。',review:'这条路线的结果不能显示为历史上的热线已经建立。'}]},
 {id:'a3',ch:3,model:'ban',date:'1963年 · 有限合作',title:'范围有限的协议，接受吗？',lead:'全面禁试仍有难题。有关各方讨论先限制部分环境中的核试验，把难以解决的事项留到以后。',facts:['美国、苏联、英国在本轮分别作出判断。','古巴不是这项协议的三个最初签署方之一。','条约文本、国内批准和执行不是同一个状态。'],unknown:'国际上形成共同文本，不保证国内程序一定完成。',ask:'你怎样指示谈判团队？',consult:[['科学顾问','请把覆盖范围写清楚。没有覆盖地下试验，就不能说所有核试验都禁止了。'],['外交人员','可以争取部分合作，也要准备回答留下的缺口。']],history:'1963年有限禁试条约禁止大气层、外层空间和水下核试验，没有禁止地下试验。此处模型更换为美苏英。',sources:['ban'],options:[
  {id:'comprehensive',title:'继续争取全面协议。',desc:'保留较大目标，承担迟迟无法收拢的可能。',set:{0:1,3:0},flag:{banScope:'full'},feedback:'全面要求继续保留。其他方面是否愿意作相应调整，由各自判断。',review:'本模型可以显示持续分歧，不把较大目标自动记成较高得分。'},
  {id:'limited',title:'接受有限范围，明确剩余问题。',desc:'将有限文本送交后续程序。',set:{0:0,3:1},flag:{banScope:'limited'},feedback:'美方接受有限文本。是否形成共同安排，还取决于苏英回应。',review:'部分协议应当按实际范围评价，不能等同于结束军备竞争。'},
  {id:'review',title:'先补充审查，再决定范围。',desc:'把关键问题带回评估。',set:{3:0},flag:{banScope:'review'},feedback:'补充问题发出，本轮不提前确认美方已经接受。',review:'更多审查可能澄清内容，也可能延长等待。'}]},
 {id:'a4',ch:3,model:null,date:'1963年 · 国内程序',title:'谈好了，国内还要怎样走完？',lead:'有关文本与意见进入国内讨论。支持者与反对者分别提出安全、核查和技术问题。总统可以争取支持，不能替参议院投票。',facts:['如果前一轮没有共同文本，本轮只准备国内磋商，不能冒称批准已启动。','听取意见与获得批准需要分开。','本版记录程序进展，不虚构国会支持率。'],unknown:'你不能保证审议结果。',ask:'你怎样争取国内理解与支持？',consult:[['科学顾问','公开说明既要讲收益，也要讲条约没做什么。'],['国会联络人员','我们可以安排解释与沟通，不能替议员作决定。'],['反核倡议来信','如果文本确实限制了部分试验，请公开解释具体内容和后续计划。']],history:'国际协议的形成、签署、国内批准和生效需要分别记录。这里没有建立完整的参议院投票模型。',sources:['ban'],options:[
  {id:'campaign',title:'尽快争取支持，说明直接收益。',desc:'同时接受对未解问题的追问。',flag:{domestic:'campaign'},feedback:'说明与联络工作展开。系统记录已开展工作，不自动宣布批准。',review:'公众讨论是实际过程，不是总满意度加分。'},
  {id:'hear',title:'组织有关人员逐项解释争议。',desc:'让不同意见进入明确的问题清单。',flag:{domestic:'hear'},feedback:'科学、外交与军事人员准备回应。分歧可能被澄清，也可能更公开。',review:'听取反对意见不等于失去控制；它能暴露尚未回答的问题。'},
  {id:'execution',title:'先补充执行说明，再推进程序。',desc:'解释实施方式，不擅自改写已谈文本。',flag:{domestic:'execution'},feedback:'执行说明补充完成，后续审议仍由相应机构决定。',review:'解释执行方式与重新谈判国际文本需要区分。'}]}
];
const initialModels={berlin:1,testing:2,cuba:0,ban:3};
const fresh=()=>({version:1,index:0,started:false,locked:false,complete:false,terminal:null,models:{...initialModels},flags:{},records:[],midPeak:1,midNow:1});
function activeScene(state){const base=scenes[state.index];if(base.alt&&state.flags.route===base.alt.when)return {...base,title:base.alt.title,lead:base.alt.lead};return base;}
function submit(state,choiceId){
 if(state.locked||state.complete)throw Error('本节点已经提交');
 const scene=activeScene(state),option=scene.options.find(x=>x.id===choiceId);if(!option)throw Error('无效选项');
 const next=JSON.parse(JSON.stringify(state));next.started=true;next.locked=true;Object.assign(next.flags,option.flag||{});
 const model=scene.model;let calculation=null;
 if(model){
  const game=C.scenario(model,next.flags),before=next.models[model];let proposed=before;
  for(const [b,v] of Object.entries(option.set||{})){
   if(!game.controls.us.includes(+b))throw Error('越权操作');proposed=v?proposed|(1<<b):proposed&~(1<<b);
  }
  if(!game.states.includes(proposed))throw Error('不可行状态');
  const response=C.react(game,proposed);next.models[model]=response.state;
  const path=game.path(response.state,game.goal,{maxDepth:5});
  const improvingPath=game.path(response.state,game.goal,{maxDepth:5,improving:true});
  calculation={kind:model,before,proposed,after:response.state,trace:response.trace,analysis:game.analyze(response.state),path,improvingPath,goal:game.goal(response.state),states:game.states.length};
 }
 let actualMid=null;
 if(option.mid){actualMid=option.mid;next.midNow=actualMid;next.midPeak=Math.max(next.midPeak,actualMid);}
 if(option.terminal){next.terminal=option.terminal;next.complete=true;}
 next.records.push({sceneId:scene.id,choiceId,title:scene.title,option:option.title,feedback:option.feedback,review:option.review,model:calculation,mid:actualMid,midPeak:next.midPeak,terminal:option.terminal||null});
 return next;
}
function advance(state){if(!state.locked||state.complete)throw Error('请先提交决定');const s=JSON.parse(JSON.stringify(state));if(s.index===scenes.length-1)s.complete=true;else{s.index++;s.locked=false;}return s;}
function replay(choices){let s=fresh();s.started=true;for(let i=0;i<choices.length;i++){s=submit(s,choices[i]);if(i<choices.length-1)s=advance(s);}return s;}
function restore(raw){
 if(!raw||raw.version!==1||!Array.isArray(raw.records)||raw.records.length>18)throw Error('存档格式不匹配');
 let s=replay(raw.records.map(x=>x.choiceId));
 if(!raw.records.length)s.started=Boolean(raw.started);
 else if(!raw.locked&&!s.complete)s=advance(s);
 if(raw.complete&&!s.complete){if(s.index!==17||!s.locked)throw Error('无效结局');s=advance(s);}
 if(raw.index!==s.index||Boolean(raw.locked)!==s.locked||Boolean(raw.complete)!==s.complete)throw Error('存档次序不匹配');
 return s;
}
function beforeNode(state,index){if(!Number.isInteger(index)||index<0||index>state.records.length||index>=18)throw Error('无效节点');let s=fresh();s.started=true;for(let i=0;i<index;i++){s=submit(s,state.records[i].choiceId);s=advance(s);}return s;}
const api={chapters,sources,scenes,fresh,activeScene,submit,advance,replay,restore,beforeNode};root.Campaign=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
