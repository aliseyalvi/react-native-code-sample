import {Linking} from 'react-native';

export function getNextDateTime(day: number, hours: number, minutes: number) {
  var date = new Date();

  if (
    date.getDay() == day &&
    date.getHours() <= hours &&
    date.getMinutes() < minutes
  ) {
    return new Date(date.setHours(hours, minutes));
  }

  var today = date.getDay(),
    diff = date.getDate() + ((7 + day - today) % 7);
  date.setDate(diff);
  date.setHours(hours, minutes);

  return new Date(date);
}

export function getRemainingTimeComponents(timeInFuture: number) {
  const currentTime = new Date().getTime();
  const t = timeInFuture - currentTime;

  let days = '00';
  let hours = '00';
  let minutes = '00';
  let seconds = '00';

  if (t > 0) {
    var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      cm = 60 * 1000,
      cs = 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.ceil((t - d * cd - h * ch) / cm),
      s = Math.round((t - d * cd - h * ch - m * cm) / cs),
      pad = function (n: number) {
        return n < 10 ? '0' + n : n;
      };
    if (s === 60) {
      m++;
      s = 0;
    }
    if (m === 60) {
      h++;
      m = 0;
    }
    if (h === 24) {
      d++;
      h = 0;
    }

    days = pad(d).toString();
    hours = pad(h).toString();
    minutes = pad(m).toString();
    seconds = pad(s).toString();
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function validateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export const openLink = async (url: string) => {
  try {
    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
  } catch (error) {
    console.warn(error.message);
  }
};
