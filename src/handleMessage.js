const util = require('util')
const parseMessage = require("../lib/parseMessage");

const log = (...v) => console.log(util.inspect(v, false, null, true /* enable colors */))

function handleMessage(req, res) {
  const { message, space } = req.body;
  console.log('someone pinged @', req.body.type, req.body);

  log(message, message.annotations);

  try{
    const remind = parseMessage(message);
    console.log(remind, remind.date.diffNow("hours"));
    return res.json({
      text: `I will remind  that to <${remind.mention}>${
        remind.date.diffNow("hours").hours > 24
          ? `on ${remind.date.toFormat("LLLL d")}`
          : ''
      } at ${remind.date.toFormat("T ZZZZ")}`
    });
  } catch (e) {
    console.error(e);
    return res.json({
      text: `${e.message}\n[comand] [who] [message] [in|at] [date]\n example: \`@remind me soemthing special in 10min\``
    })
  }

  // if (req.body.type === 'MESSAGE') {
  //   return res.json({
  //     text: `I will remind  that to <users/123456789012345678901>! at 00:00:00`
  //   });
  // }
}

module.exports = handleMessage;
