export const db = [
  {
    id: 1,
    chats: [
      {
        id: 2,
        messages: [
          {
            messageId: 1,
            fromId: 1,
            toId: 2,
            content: { type: 'text', data: 'Heyyy!' }
          },
          {
            messageId: 2,
            fromId: 1,
            toId: 2,
            content: { type: 'text', data: 'How are you?' }
          },
          {
            messageId: 3,
            fromId: 2,
            toId: 1,
            content: { type: 'text', data: 'Hi. I am fine. And you? :)' }
          }
        ]
      }
    ]
  }
];
