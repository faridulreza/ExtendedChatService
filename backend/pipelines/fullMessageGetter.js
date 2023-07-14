const getFullMessage = async (openai, text, system) => {
  console.log("getting full message");
  const messages = [
    { role: "system", content: system },
    { role: "user", content: text },
  ];

  let resp = "";

  while (true) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let choice = response.data.choices[0];
    resp += choice.message.content;
    if (choice.finish_reason === "length") {
      messages.push(choice.message);
    } else break;
  }

  return resp;
};

module.exports = getFullMessage;
