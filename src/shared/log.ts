// don't apply these for warning because of the serverity.
const ignoredTags: Array<string> = []; // Example: ['DetectedDirection']
const ignoredMsg = 'DetectedDirection'; // Example: ['DetectedDirection']
// const filterTags = ['iOS', 'contactManager']; // Filter sync apple log
const filterTags: Array<string> = []; // Example: ['DetectedDirection']

export const logdfunc = (func: Function, msg: string): void => {
  logd(func.name, msg);
};

export const logd = (tag: string, msg: string): void => {
  if (__DEV__) {
    if (ignoredTags.indexOf(tag) !== -1) {
      return;
    }
    if (msg.indexOf(ignoredMsg) !== -1) {
      return;
    }
    if (filterTags.length > 0 && filterTags.indexOf(tag) === -1) {
      return;
    }
    console.log(`[${tag}] ${msg}`);
  }
};

export const loge = (tag: string, msg: string): void => {
  if (__DEV__) {
    console.error(`[${tag}] ${msg}`);
  }
};

// Dont use this method to parse object to string. This for dev mode only to write log.
export const toJSONStr = (obj?: any): string => {
  if (obj === undefined) {
    return 'undefined';
  }
  if (__DEV__) {
    return JSON.stringify(obj);
  }
  return '';
};
