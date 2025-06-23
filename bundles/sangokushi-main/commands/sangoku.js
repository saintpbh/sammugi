'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  usage: 'sangoku [메뉴]',
  description: '삼국지 게임의 메인 메뉴를 엽니다.',
  aliases: ['삼국', 'sk'],
  command: (state) => (args, player) => {
    if (!args || args === 'menu' || args === '메뉴') {
      showMainMenu(player);
    } else {
      switch (args.toLowerCase()) {
        case 'status':
        case '현황':
          showStatus(player);
          break;
        case 'generals':
        case '장수':
          showGenerals(player);
          break;
        case 'cities':
        case '성':
          showCities(player);
          break;
        case 'missions':
        case '임무':
          showMissions(player);
          break;
        case 'diplomacy':
        case '외교':
          showDiplomacy(player);
          break;
        default:
          showMainMenu(player);
      }
    }
  }
};

function showMainMenu(player) {
  const menu = `
<span style="color: #ffff00; font-weight: bold;">
═══════════════════════════════════════════
          🏯 삼국지 MUD - 소패성 🏯
═══════════════════════════════════════════
</span>
<span style="color: #ffffff;">
주군 ${player.name}님, 무엇을 명하시겠습니까?

📋 <span style="color: #00ff00;">sangoku status</span> (현황) - 성과 백성의 상태 확인
👥 <span style="color: #00ff00;">sangoku generals</span> (장수) - 장수들 관리 및 배치
🏰 <span style="color: #00ff00;">sangoku cities</span> (성) - 소유 성과 마을 관리
⚔️  <span style="color: #00ff00;">sangoku missions</span> (임무) - 진행 중인 임무 확인
🤝 <span style="color: #00ff00;">sangoku diplomacy</span> (외교) - 다른 세력과의 외교
</span>
<span style="color: #ffff00;">
═══════════════════════════════════════════
         "의를 위해 행동하라!" - 유현덕
═══════════════════════════════════════════
</span>`;
  
  Broadcast.sayAt(player, menu);
}

function showStatus(player) {
  const status = `
<span style="color: #ffff00; font-weight: bold;">
═══════════════ 🏯 소패성 현황 🏯 ═══════════════
</span>
<span style="color: #ffffff;">
🏰 <span style="color: #00ff00;">영토:</span> 소패성 + 4개 마을 (동촌, 서촌, 남촌, 북촌)
👑 <span style="color: #00ff00;">성주:</span> 유현덕 (仁德지수: 95/100)
👥 <span style="color: #00ff00;">장수:</span> 11명 (유비 포함)
🎖️  <span style="color: #00ff00;">병력:</span> 5,000명
💰 <span style="color: #00ff00;">금전:</span> 15,000냥
🌾 <span style="color: #00ff00;">군량:</span> 25,000석
😊 <span style="color: #00ff00;">민심:</span> 85/100 (높음)

<span style="color: #ffdd00;">📊 마을별 상황:</span>
🌾 동촌 (농업): 풍작 예상, 인구 1,200명
🏪 서촌 (상업): 교역 활발, 인구 900명  
🎣 남촌 (어업): 어획량 양호, 인구 800명
⛏️  북촌 (광업): 철광석 풍부, 인구 600명
</span>
<span style="color: #ffff00;">
═══════════════════════════════════════════
</span>`;

  Broadcast.sayAt(player, status);
}

function showGenerals(player) {
  const area = player.room.area;
  const npcs = [...area.npcs.values()];
  
  const generals = `
<span style="color: #ffff00; font-weight: bold;">
═══════════════ ⚔️ 장수단 현황 ⚔️ ═══════════════
</span>
<span style="color: #ffffff;">
👑 <span style="color: #gold;">유현덕 (劉備)</span> - ENFJ | 🏰 소패성 대전
   📊 지력:75 무력:65 매력:95 정치:80
   💭 "백성들을 위해 살겠노라."

⚔️ <span style="color: #ff6b6b;">관운장 (關羽)</span> - ISTJ | 🏰 소패성 대전  
   📊 지력:70 무력:95 매력:85 정치:60
   💭 "의리를 저버리는 자는 용서치 않겠다."

⚔️ <span style="color: #ff6b6b;">장익덕 (張飛)</span> - ESTP | 🏰 소패성 대전
   📊 지력:55 무력:98 매력:70 정치:45  
   💭 "싸움이라면 언제든 환영이다!"

🧙 <span style="color: #4ecdc4;">제갈공명 (諸葛亮)</span> - INTJ | 📚 작전실
   📊 지력:100 무력:35 매력:90 정치:95
   💭 "모든 것은 계획대로 진행되고 있습니다."

🛡️ <span style="color: #45b7d1;">조자룡 (趙雲)</span> - ISFJ | 🏭 병영
   📊 지력:75 무력:90 매력:85 정치:70
   💭 "주군을 위해서라면 목숨도 아깝지 않습니다."

🐎 <span style="color: #f7b731;">마맹기 (馬超)</span> - ESFP | 🐴 마구간
   📊 지력:65 무력:92 매력:80 정치:55
   💭 "복수는 반드시 이루겠다!"

🏹 <span style="color: #5f27cd;">황한승 (黃忠)</span> - ISTP | 🏭 병영
   📊 지력:70 무력:85 매력:75 정치:65
   💭 "늙었다고 얕보지 마라."

⚔️ <span style="color: #ff3838;">위문장 (魏延)</span> - ENTJ | 🏭 병영  
   📊 지력:65 무력:88 매력:60 정치:50
   💭 "언젠가 큰 공을 세우겠습니다!"

🎭 <span style="color: #2ed573;">간헌화 (簡雍)</span> - ESFJ | 🏰 소패성 대전
   📊 지력:80 무력:25 매력:90 정치:85
   💭 "모든 일에는 웃음이 필요하죠."

💰 <span style="color: #ffa502;">미자중 (糜竺)</span> - ISFP | 🏰 소패성 대전
   📊 지력:75 무력:20 매력:80 정치:90
   💭 "재정은 제게 맡겨주십시오."

📝 <span style="color: #70a1ff;">손공우 (孫乾)</span> - ISTJ | 📚 작전실
   📊 지력:78 무력:22 매력:70 정치:88
   💭 "모든 일은 규칙대로 처리해야 합니다."
</span>
<span style="color: #ffff00;">
═══════════════════════════════════════════
</span>`;

  Broadcast.sayAt(player, generals);
}

function showCities(player) {
  const cities = `
<span style="color: #ffff00; font-weight: bold;">
═══════════════ 🏰 영토 관리 🏰 ═══════════════
</span>
<span style="color: #ffffff;">
🏯 <span style="color: #gold;">소패성 (小沛城)</span> - 본거지
   👑 성주: 유현덕 | 🎖️ 수비병: 3,000명
   📈 발전도: 85/100 | 😊 민심: 90/100
   
🌾 <span style="color: #2ed573;">동촌 (東村)</span> - 농업 마을
   🧑‍🌾 인구: 1,200명 | 🌾 생산: 쌀 8,000석/월
   📊 상황: 풍작 예상 | 요청: 농기구 지원
   
🏪 <span style="color: #ffa502;">서촌 (西村)</span> - 상업 마을  
   👥 인구: 900명 | 💰 수입: 2,500냥/월
   📊 상황: 교역 활발 | 요청: 도적 토벌
   
🎣 <span style="color: #4ecdc4;">남촌 (南村)</span> - 어업 마을
   🎣 인구: 800명 | 🐟 생산: 생선 5,000근/월  
   📊 상황: 어획량 양호 | 요청: 배 수리 지원
   
⛏️ <span style="color: #70a1ff;">북촌 (北村)</span> - 광업 마을
   ⚒️ 인구: 600명 | 🔨 생산: 철광석 3,000근/월
   📊 상황: 광맥 풍부 | 요청: 새 갱도 개발
</span>
<span style="color: #ffff00;">
═══════════════════════════════════════════
</span>`;

  Broadcast.sayAt(player, cities);
}

function showMissions(player) {
  const missions = `
<span style="color: #ffff00; font-weight: bold;">
═══════════════ ⚔️ 현재 임무 ⚔️ ═══════════════
</span>
<span style="color: #ffffff;">
🔴 <span style="color: #ff6b6b;">긴급 임무</span>
   📍 서촌 도적 토벌 (7일 후 만료)
   💰 보상: 3,000냥 + 서촌 민심 +15
   👥 추천 장수: 관우, 장비, 조운

🟡 <span style="color: #ffa502;">일반 임무</span>  
   📍 동촌 농기구 지원 (14일 후 만료)
   🌾 보상: 쌀 5,000석 + 동촌 발전도 +10
   👥 추천 장수: 미축, 손건

   📍 남촌 배 수리 지원 (10일 후 만료)  
   🎣 보상: 생선 3,000근 + 남촌 기술력 +5
   👥 추천 장수: 황충, 위연

🟢 <span style="color: #2ed573;">장기 프로젝트</span>
   📍 북촌 새 갱도 개발 (30일 프로젝트)
   ⛏️ 보상: 월 철광석 생산량 +50%
   👥 추천 장수: 제갈량 + 보조 장수 2명

💡 <span style="color: #4ecdc4;">특별 기회</span>
   📍 인근 현 태수와의 외교 협상
   🤝 효과: 새로운 교역로 개방 가능
   👥 추천 장수: 간옹
</span>
<span style="color: #ffff00;">
═══════════════════════════════════════════
</span>`;

  Broadcast.sayAt(player, missions);
}

function showDiplomacy(player) {
  const diplomacy = `
<span style="color: #ffff00; font-weight: bold;">
═══════════════ 🤝 외교 현황 🤝 ═══════════════
</span>
<span style="color: #ffffff;">
⚔️ <span style="color: #ff6b6b;">적대 세력</span>
   🔥 조조 (曹操) - 위나라 | 관계: -75/100
   💭 "유비를 없애야 천하통일이 가능하다."
   
   🔥 손권 (孫權) - 오나라 | 관계: -45/100  
   💭 "강동의 안전을 위해서는..."

🤝 <span style="color: #4ecdc4;">동맹 세력</span>
   💚 마등 (馬騰) - 관중군벌 | 관계: +60/100
   💭 "마초를 잘 부탁한다."

😐 <span style="color: #ffa502;">중립 세력</span>
   ⚫ 유표 (劉表) - 형주목 | 관계: +20/100
   💭 "같은 한실 종친이니..."
   
   ⚫ 유장 (劉璋) - 서주목 | 관계: +10/100
   💭 "평화가 최고다."

📊 <span style="color: #2ed573;">외교 활동</span>
   🎯 진행 중인 협상: 없음
   📜 체결 가능한 조약:
      • 마등과의 상호 불가침 조약
      • 유표와의 교역 협정
      
💡 <span style="color: #70a1ff;">외교 조언</span>
   제갈량: "먼저 주변 소세력들과 관계를 개선하는 것이 좋겠습니다."
   간옹: "외교는 무력보다 강한 무기입니다."
</span>
<span style="color: #ffff00;">
═══════════════════════════════════════════
</span>`;

  Broadcast.sayAt(player, diplomacy);
} 