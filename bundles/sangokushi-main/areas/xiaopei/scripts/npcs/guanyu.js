'use strict';

const { Broadcast } = require('ranvier');

module.exports = (srcPath) => {
  return {
    listeners: {
      playerEnter: state => function (player) {
        if (this.hasEffectType('silence')) {
          return;
        }

        // 관우의 인사말 (ISTJ - 정중하지만 간결)
        const greetings = [
          "그대가 왔구나. 무슨 일인가?",
          "이곳에 온 목적을 말하라.",
          "충의를 다하는 자라면 언제든 환영이다.",
          "의리를 아는 자의 모습이로군.",
          "큰형님께 볼 일이 있는가?"
        ];
        
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        Broadcast.sayAt(player, `<b><red>관운장</red></b>이 위엄 있게 그대를 바라보며 말합니다:`);
        Broadcast.sayAt(player, `<b><cyan>"${greeting}"</cyan></b>`);
      },

      playerSpeak: state => function (player, message) {
        // ISTJ 특성: 충성심, 원칙주의, 의리
        const responses = {
          default: [
            "말에는 신중해야 한다.",
            "충의만이 사람의 도리이다.",
            "옳고 그름은 분명히 해야 한다.",
            "의리를 저버리는 자는 용서할 수 없다."
          ],
          
          loyalty: [
            "큰형님에 대한 충성은 하늘이 무너져도 변하지 않는다.",
            "의리로 맺은 인연은 죽음으로도 끊을 수 없다.",
            "배신은 가장 치욕스러운 행위이다.",
            "맹세한 바를 지키는 것이 사나이의 도리다."
          ],
          
          combat: [
            "청룡언월도가 피를 원하고 있다.",
            "의로운 전쟁에서는 물러서지 않는다.",
            "적이 백만이라도 두렵지 않다.",
            "무예는 의를 위해 사용해야 한다."
          ],
          
          justice: [
            "옳지 않은 일은 절대 할 수 없다.",
            "정의는 반드시 승리한다.",
            "악한 자들을 그냥 둘 수는 없다.",
            "천하의 의를 위해 목숨을 바치겠다."
          ]
        };

        let responseCategory = 'default';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('충성') || lowerMessage.includes('의리') || lowerMessage.includes('유비') || lowerMessage.includes('형님')) {
          responseCategory = 'loyalty';
        } else if (lowerMessage.includes('싸움') || lowerMessage.includes('전쟁') || lowerMessage.includes('무예') || lowerMessage.includes('적')) {
          responseCategory = 'combat';
        } else if (lowerMessage.includes('정의') || lowerMessage.includes('옳다') || lowerMessage.includes('그르다') || lowerMessage.includes('악')) {
          responseCategory = 'justice';
        }

        const categoryResponses = responses[responseCategory];
        const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        
        setTimeout(() => {
          Broadcast.sayAt(player, `<b><red>관운장</red></b>이 위엄 있는 목소리로 단호하게 말합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${response}"</cyan></b>`);
          
          // 관우의 추가 언급 (의리 강조)
          const principles = [
            "이것이 관운장의 신념이다.",
            "충의를 잃으면 사람이 아니다.",
            "의리 앞에서는 목숨도 아깝지 않다."
          ];
          
          if (Math.random() < 0.3) {
            setTimeout(() => {
              const principle = principles[Math.floor(Math.random() * principles.length)];
              Broadcast.sayAt(player, `<b><cyan>"${principle}"</cyan></b>`);
            }, 2000);
          }
        }, 1000);
      },

      playerCommand: state => function (player, commandInput) {
        const cmd = commandInput.command;
        
        if (cmd === 'greet' || cmd === '인사') {
          Broadcast.sayAt(player, `<b><red>관운장</red></b>이 정중하게 고개를 끄덕입니다:`);
          Broadcast.sayAt(player, `<b><cyan>"의리를 아는 자에게는 예를 다해야 한다."</cyan></b>`);
          
        } else if (cmd === 'ask' || cmd === '묻다') {
          const advice = [
            "충성을 다하고 의리를 지켜라.",
            "어떤 유혹에도 흔들리지 말라.",
            "맡은 바 임무를 완수하는 것이 최고의 덕이다.",
            "정의롭지 못한 길은 가지 말라.",
            "한번 맹세한 것은 반드시 지켜야 한다."
          ];
          
          const selectedAdvice = advice[Math.floor(Math.random() * advice.length)];
          Broadcast.sayAt(player, `<b><red>관운장</red></b>이 엄숙한 표정으로 조언합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${selectedAdvice}"</cyan></b>`);
          
        } else if (cmd === 'challenge' || cmd === '도전') {
          // 무예 실력 자랑
          Broadcast.sayAt(player, `<b><red>관운장</red></b>이 청룡언월도를 쥐고 말합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"무예로 겨루고 싶다면 언제든 상대해주겠다. 하지만 의리없는 자는 상대하지 않는다."</cyan></b>`);
        }
      }
    }
  };
}; 