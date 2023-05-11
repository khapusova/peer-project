export const INITIAL_STATE = {
  isFulfilled: false,
  isPending: false,
  isRejected: false,
  error: null
};

export const PENDING_STATE = {
  ...INITIAL_STATE,
  isPending: true
};

export const REJECTED_STATE = {
  ...INITIAL_STATE,
  isRejected: true
};

export const FULFILLED_STATE = {
  ...INITIAL_STATE,
  isFulfilled: true
};

export const STORE_NAMES = {
  AUTHORIZATION: 'authorization',
  TRENDING: 'trending',
  ROOT: 'root',
  EXPLORING: 'exploring',
  JOURNALPAGE: 'journalPage'
};
