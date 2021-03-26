const { DateTime } = require("luxon");

const timeUnits = {
  m: "minutes",
  min: "minutes",

  h: "hours",
  hr: "hours",

  d: "days",
  day: "days",
  days: "days",

  mth: "months",
}

function parseMessage(message) {
  const reg = /^(@?\w+)\s+(.*)\s(in|at|on)\s(.*)$/;

  const [,target, msg, prep, time] = reg.exec(message.argumentText.trim()) || [];
  const remindObj = {
    mention: undefined,
    message: msg,
    date: undefined
  };

  console.log({target, msg, prep, time});
  if([target, msg, prep, time].some(v => !v)) {
    throw new Error("Wrong message format format");
  }

  if(target === "me") {
    remindObj.mention = message.sender.name;
  } else {
    throw new Error(`Unrecognized \`who\` \`${target}\``);
  }

  if(prep === 'in') {
    remindObj.date = DateTime.fromISO(message.createTime).startOf("minute");
    time.trim().split(/\s/).forEach(timeSection => {
      const mt = /(\d+)([a-z]{1,4})/.exec(timeSection.toLowerCase());
      console.log({timeSection, mt})
      if(!mt) {
        throw new Error("Wrong time format");
      }
      const [,value, _unit] = mt;

      const unit = timeUnits[_unit];
      if(!unit) {
        throw new Error(`Unrecognized time unit \`${_unit}\``);
      }

      remindObj.date = remindObj.date.plus({[unit]: value})
    })
  } else {
    remindObj.date = DateTime.fromSQL(time);
    if(!remindObj.isVaild) {
      throw new Error(remindObj.invalidExplanation);
    }
  }

  return remindObj;
}

module.exports = parseMessage;
