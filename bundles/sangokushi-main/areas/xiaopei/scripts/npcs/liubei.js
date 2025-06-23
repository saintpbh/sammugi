'use strict';

const { Broadcast } = require('ranvier');

module.exports = (srcPath) => {
  return {
    listeners: {
      playerEnter: state => function (player) {
        if (this.hasEffectType('silence')) {
          return;
        }

        // 랜덤 인사말 (ENFJ - 따뜻하고 포용적)
        const greetings = [
          "어서 오게. 그대의 얼굴에 근심이 보이는구나.",
          "잘 왔다. 무엇이 그대를 이곳으로 이끌었는가?",
          "그대를 맞이하게 되어 반갑다. 편히 쉬어가게나.",
          "이곳에 온 것을 환영한다. 백성들이 평안한가?",
          "어려운 시국에 그대가 와주니 고맙구나."
        ];
        
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        Broadcast.sayAt(player, `<b><yellow>유현덕</yellow></b>이 그대를 바라보며 온화하게 말합니다:`);
        Broadcast.sayAt(player, `<b><cyan>"${greeting}"</cyan></b>`);
      },

      // 플레이어가 말할 때
      playerSpeak: state => function (player, message) {
        // ENFJ 특성: 공감하고 조화를 만들어냄
        const responses = {
          // 일반 대화
          default: [
            "그대의 말에 깊은 뜻이 담겨있구나.",
            "백성들을 위한 마음이 느껴진다.",
            "함께 의논하여 좋은 방법을 찾아보자.",
            "그대의 지혜가 필요한 때이다."
          ],
          
          // 정치/치리 관련
          politics: [
            "정치는 백성을 위해 있는 것이다. 이를 잊어서는 안 된다.",
            "인덕으로 다스리면 백성들이 스스로 따를 것이다.",
            "힘으로만 다스리는 것은 오래가지 못한다.",
            "백성의 마음이 곧 하늘의 뜻이다."
          ],
          
          // 전쟁/군사 관련  
          military: [
            "전쟁은 불가피할 때만 해야 한다.",
            "의로운 전쟁만이 하늘의 도움을 받을 수 있다.",
            "백성을 보호하기 위한 싸움이라면 주저하지 않겠다.",
            "무력보다는 덕으로 천하를 평정하고 싶다."
          ],
          
          // 인재/장수 관련
          talent: [
            "현명한 인재들이 있어야 대업을 이룰 수 있다.",
            "각자의 장점을 살려 적재적소에 배치하는 것이 중요하다.",
            "관우, 장비와 같은 의형제들이 있어 든든하다.",
            "공명의 지혜가 없었다면 여기까지 오지 못했을 것이다."
          ]
        };

        // 키워드 매칭
        let responseCategory = 'default';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('정치') || lowerMessage.includes('치리') || lowerMessage.includes('백성')) {
          responseCategory = 'politics';
        } else if (lowerMessage.includes('전쟁') || lowerMessage.includes('군사') || lowerMessage.includes('싸움')) {
          responseCategory = 'military';
        } else if (lowerMessage.includes('장수') || lowerMessage.includes('인재') || lowerMessage.includes('관우') || lowerMessage.includes('장비')) {
          responseCategory = 'talent';
        }

        const categoryResponses = responses[responseCategory];
        const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        
        // 지연 후 대답 (생각하는 모습 연출)
        setTimeout(() => {
          Broadcast.sayAt(player, `<b><yellow>유현덕</yellow></b>이 잠시 생각한 후 고개를 끄덕이며 말합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${response}"</cyan></b>`);
          
          // 추가 조언이나 격려 (ENFJ의 멘토 역할)
          const encouragements = [
            "그대의 의견도 들어보고 싶구나.",
            "함께 노력한다면 반드시 좋은 결과가 있을 것이다.",
            "어려운 때일수록 서로 믿고 의지해야 한다.",
            "그대 같은 이들이 있어 희망을 가질 수 있다."
          ];
          
          if (Math.random() < 0.4) { // 40% 확률로 추가 격려
            setTimeout(() => {
              const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
              Broadcast.sayAt(player, `<b><cyan>"${encouragement}"</cyan></b>`);
            }, 2000);
          }
        }, 1500);
      },

      // 특별 명령어들
      playerCommand: state => function (player, commandInput) {
        const cmd = commandInput.command;
        
        if (cmd === 'greet' || cmd === '인사') {
          const personalGreetings = [
            "그대를 만나게 되어 영광이다.",
            "이 어려운 시국에 그대 같은 이가 있어 든든하다.",
            "언제든 도움이 필요하면 주저 말고 말하게나.",
            "그대의 충성심을 믿고 있다."
          ];
          
          const greeting = personalGreetings[Math.floor(Math.random() * personalGreetings.length)];
          Broadcast.sayAt(player, `<b><yellow>유현덕</yellow></b>이 공손히 절하며 말합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${greeting}"</cyan></b>`);
          
        } else if (cmd === 'ask' || cmd === '묻다') {
          // 조언 요청
          const advice = [
            "어떤 일이든 백성을 먼저 생각하게나.",
            "의리를 잃지 않는 것이 가장 중요하다.",
            "급하다고 해서 올바른 길을 버려서는 안 된다.",
            "신뢰할 수 있는 동료들과 상의하는 것이 좋겠다.",
            "하늘이 도울 수 있는 길을 선택하게나."
          ];
          
          const selectedAdvice = advice[Math.floor(Math.random() * advice.length)];
          Broadcast.sayAt(player, `<b><yellow>유현덕</yellow></b>이 진지한 표정으로 조언합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${selectedAdvice}"</cyan></b>`);
        }
      }
    }
  };
}; 