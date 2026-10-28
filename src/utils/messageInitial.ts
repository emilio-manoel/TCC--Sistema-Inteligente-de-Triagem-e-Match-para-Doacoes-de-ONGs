import type { MessageItem } from "../types/chatAndMesssage";

export const MsgInitial: MessageItem = {
  id: Date.now().toString(),
  content: `
👋 Olá! Que bom ter você por aqui.
Eu sou o assistente inteligente de doações. O meu papel é conectar você diretamente aos projetos sociais e ONGs ativas na sua região.

## Como funciona?
Informe o seu CEP ou cidade e estado.
(Opcional) Escreva com suas palavras o que você deseja doar.

💡 Você escolhe como navegar:

Com item: "Moro no CEP 40020-000 e tenho 3 cobertores." (Busco a ONG exata e mais proxima para a sua doação, se houver.).

Apenas localização: "Moro no CEP 40020-000." (Te mostro a lista de tudo o que as ONGs da sua região estão precisando no momento).

Qual é o seu CEP ou cidade para começarmos?
`,
  sender: "bot",
};
