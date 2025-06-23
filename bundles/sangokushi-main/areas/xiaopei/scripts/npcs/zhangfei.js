'use strict';

const { Broadcast } = require('ranvier');

module.exports = (srcPath) => {
  return {
    listeners: {
      playerEnter: state => function (player) {
        if (this.hasEffectType('silence')) {
          return;
        }

        // 장비의 인사말 (ESTP - 호탕하고 직접적)
        const greetings = [
          "오오! 누구냐? 싸우러 온 것이냐?",
          "하하하! 새로운 얼굴이군! 술이나 한 잔 하자!",
          "어디서 온 놈이냐? 배짱이 좋구나!",
          "큰형님께 볼 일이 있다면 어서 가보거라!",
          "재미있겠군! 무슨 일로 왔느냐?"
        ];
        
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        Broadcast.sayAt(player, `<b><blue>장익덕</blue></b>이 우렁찬 목소리로 소리칩니다:`);
        Broadcast.sayAt(player, `<b><cyan>"${greeting}"</cyan></b>`);
      },

      playerSpeak: state => function (player, message) {
        // ESTP 특성: 즉흥성, 행동력, 호탕함
        const responses = {
          default: [
            "하하하! 좋은 말이다!",
            "그래그래! 바로 그런 정신이야!",
            "말이 길구나! 간단히 해라!",
            "흥미롭군! 더 말해보거라!"
          ],
          
          action: [
            "말보다는 행동이 중요하다!",
            "당장 달려가서 해치우자!",
            "망설일 시간에 벌써 끝냈겠다!",
            "장팔뱀창이 근질근질하는구나!"
          ],
          
          fighting: [
            "싸움이라고? 하하하! 최고다!",
            "누구든 덤벼라! 두렵지 않다!",
            "장비가 있는데 무서울 게 뭐가 있나!",
            "한 번에 백 명도 상대할 수 있다!"
          ],
          
          drinking: [
            "술 없이는 못 살겠다!",
            "좋은 술이 있으면 알려달라!",
            "술 한 잔 하며 이야기하자!",
            "취하고 나서야 진짜 실력이 나온다!"
          ],
          
          loyalty: [
            "큰형님은 내 목숨보다 소중하다!",
            "의형제의 정은 하늘보다 깊다!",
            "유비, 관우와 함께라면 죽음도 두렵지 않다!",
            "배신자는 내가 직접 처치하겠다!"
          ]
        };

        let responseCategory = 'default';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('행동') || lowerMessage.includes('달려') || lowerMessage.includes('빨리') || lowerMessage.includes('즉시')) {
          responseCategory = 'action';
        } else if (lowerMessage.includes('싸움') || lowerMessage.includes('전쟁') || lowerMessage.includes('적') || lowerMessage.includes('무예')) {
          responseCategory = 'fighting';
        } else if (lowerMessage.includes('술') || lowerMessage.includes('마시') || lowerMessage.includes('잔치')) {
          responseCategory = 'drinking';
        } else if (lowerMessage.includes('유비') || lowerMessage.includes('관우') || lowerMessage.includes('형님') || lowerMessage.includes('의리')) {
          responseCategory = 'loyalty';
        }

        const categoryResponses = responses[responseCategory];
        const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        
        // 즉석에서 바로 대답 (ESTP 특성)
        setTimeout(() => {
          Broadcast.sayAt(player, `<b><blue>장익덕</blue></b>이 호탕하게 웃으며 큰 소리로 말합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${response}"</cyan></b>`);
          
          // 장비의 추가 호기 (즉흥적)
          const exclamations = [
            "이야! 신난다!",
            "그런데 술은 어디 있나?",
            "장팔뱀창으로 한 번 보여줄까?",
            "하하하! 재미있군!"
          ];
          
          if (Math.random() < 0.5) { // 50% 확률로 추가 호기
            setTimeout(() => {
              const exclamation = exclamations[Math.floor(Math.random() * exclamations.length)];
              Broadcast.sayAt(player, `<b><cyan>"${exclamation}"</cyan></b>`);
            }, 1000);
          }
        }, 500); // 빠른 반응
      },

      playerCommand: state => function (player, commandInput) {
        const cmd = commandInput.command;
        
        if (cmd === 'greet' || cmd === '인사') {
          Broadcast.sayAt(player, `<b><blue>장익덕</blue></b>이 큰 손으로 등을 치며 웃습니다:`);
          Broadcast.sayAt(player, `<b><cyan>"하하하! 좋은 놈이군! 마음에 든다!"</cyan></b>`);
          
        } else if (cmd === 'ask' || cmd === '묻다') {
          const advice = [
            "생각하지 말고 일단 부딪쳐라!",
            "복잡한 것은 관우 형님께 맡기고 우리는 싸우자!",
            "술 마시고 고민하면 답이 나온다!",
            "적이 나타나면 일단 창부터 휘둘러라!",
            "의형제와 함께라면 무엇이든 할 수 있다!"
          ];
          
          const selectedAdvice = advice[Math.floor(Math.random() * advice.length)];
          Broadcast.sayAt(player, `<b><blue>장익덕</blue></b>이 가슴을 치며 호탕하게 말합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${selectedAdvice}"</cyan></b>`);
          
        } else if (cmd === 'challenge' || cmd === '도전') {
          Broadcast.sayAt(player, `<b><blue>장익덕</blue></b>이 장팔뱀창을 휘두르며 흥미롭게 바라봅니다:`);
          Broadcast.sayAt(player, `<b><cyan>"오호! 장비에게 도전하겠다고? 좋다! 하지만 다치더라도 원망하지 말거라!"</cyan></b>`);
          
        } else if (cmd === 'drink' || cmd === '술') {
          const drinkResponses = [
            "좋다! 술이 최고지! 어디서 구했나?",
            "하하하! 역시 사람은 술을 알아야 해!",
            "취할 때까지 마시자! 의형제의 정을 나누면서!",
            "술이 없으면 밥맛이 없다! 더 가져와라!"
          ];
          
          const drinkResponse = drinkResponses[Math.floor(Math.random() * drinkResponses.length)];
          Broadcast.sayAt(player, `<b><blue>장익덕</blue></b>이 눈을 빛내며 기뻐합니다:`);
          Broadcast.sayAt(player, `<b><cyan>"${drinkResponse}"</cyan></b>`);
        }
      }
    }
  };
}; 