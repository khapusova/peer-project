/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES
} from '@constants';
import storage from 'redux-persist/lib/storage';
import enTexts from '@translations/en.json';
import { api } from './api';
import { getAllComments, changeCommentsById, setReplyComment } from './helper';

const { JOURNALPAGE } = STORE_NAMES;

const getJournalInfoThunkName = `${JOURNALPAGE}/getJournalInfo`;
const reactOnCommentThunkName = `${JOURNALPAGE}/reactOnComment`;
const addGeneralCommentThunkName = `${JOURNALPAGE}/addGeneralComment`;
const addReplyCommentThunkName = `${JOURNALPAGE}/addReplyComment`;

export const reactOnComment = createAsyncThunk(
  reactOnCommentThunkName,
  async (body, { rejectWithValue }) => {
    const journals = await api.getJournals(body);

    if (journals.error || !journals) {
      return rejectWithValue(journals.error);
    }

    const [matchedJournal] = journals.filter(
      (journal) => journal.id === body.journalID
    );

    if (!matchedJournal) {
      return rejectWithValue('no availaible journal with setted id');
    }

    const allComments = getAllComments(matchedJournal.comments);
    const [matchedComment] = allComments.filter(
      (comment) => comment.comment_id === body.commentID
    );

    if (!matchedComment) {
      return rejectWithValue('no availaible comment with setted id');
    }
    const newLikedBy =
      body.action === 'dislike'
        ? matchedComment.likedBy.filter(
            (likeBy) => likeBy.id !== body.userData.id
          )
        : [...matchedComment.likedBy, body.userData];
    const newComments = changeCommentsById(matchedJournal.comments, {
      ...matchedComment,
      likedBy: newLikedBy
    });

    await api.updateJournal({ ...matchedJournal, comments: newComments });
    return { ...matchedJournal, comments: newComments };
  }
);

export const addGeneralComment = createAsyncThunk(
  addGeneralCommentThunkName,
  async (body, { rejectWithValue }) => {
    const journals = await api.getJournals(body);

    if (journals.error || !journals) {
      return rejectWithValue(journals.error);
    }

    const [matchedJournal] = journals.filter(
      (journal) => journal.id === body.journalID
    );

    if (!matchedJournal) {
      return rejectWithValue('no availaible journal with setted id');
    }

    const allComments = getAllComments(matchedJournal.comments);
    const ids = allComments.map((comment) => comment.comment_id);
    const generatedId = Math.max.apply(null, ids) + 1;
    const newComment = {
      comment_id: generatedId,
      content: body.content,
      replies: [],
      dateOfPublication: 'today',
      likedBy: [],
      author: {
        id: body.author.id,
        name: body.author.name || enTexts.claims.anonymousUser
      }
    };
    const newComments = [...matchedJournal.comments, newComment];

    await api.updateJournal({ ...matchedJournal, comments: newComments });
    return { ...matchedJournal, comments: newComments };
  }
);

export const addReplyComment = createAsyncThunk(
  addReplyCommentThunkName,
  async (body, { rejectWithValue }) => {
    const journals = await api.getJournals(body);

    if (journals.error || !journals) {
      return rejectWithValue(journals.error);
    }

    const [matchedJournal] = journals.filter(
      (journal) => journal.id === body.journalID
    );

    if (!matchedJournal) {
      return rejectWithValue('no availaible journal with setted id');
    }

    const allComments = getAllComments(matchedJournal.comments);
    const ids = allComments.map((comment) => comment.comment_id);
    const generatedId = Math.max.apply(null, ids) + 1;

    const newComment = {
      comment_id: generatedId,
      content: body.content,
      to: body.replyTo,
      dateOfPublication: 'today',
      likedBy: [],
      author: {
        id: body.author.id,
        name: body.author.name || enTexts.claims.anonymousUser
      }
    };
    const newComments = setReplyComment(matchedJournal.comments, newComment);

    await api.updateJournal({ ...matchedJournal, comments: newComments });
    return { ...matchedJournal, comments: newComments };
  }
);

export const getJournalInfo = createAsyncThunk(
  getJournalInfoThunkName,
  async (body, { rejectWithValue }) => {
    const journals = await api.getJournals(body);

    if (journals.error || !journals) {
      return rejectWithValue(journals.error);
    }

    const [matchedJournal] = journals.filter(
      (journal) => journal.id === body.journalID
    );

    if (!matchedJournal) {
      return rejectWithValue('no availaible journal with setted id');
    }

    return matchedJournal;
  }
);

const initialState = {
  ...INITIAL_STATE,
  journal: {
    id: null,
    name: null,
    area: null,
    year: null,
    citescore: null,
    avatarUri: null,
    comments: []
  },
  replyTo: null,
  userID: null
};

const journalPageSlice = createSlice({
  name: JOURNALPAGE,
  initialState,
  reducers: {
    resetState: () => initialState,
    setReplyComment: (state, { payload }) => ({
      ...state,
      replyTo: payload
    }),
    resetGeneralComment: (state) => ({ ...state, replyTo: null })
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getJournalInfo.pending,
          reactOnComment.pending,
          addGeneralComment.pending,
          addReplyComment.pending
        ),
        (state) => {
          if (!state.isPending) {
            return {
              ...state,
              ...PENDING_STATE
            };
          }
        }
      )
      .addMatcher(
        isAnyOf(
          getJournalInfo.rejected,
          reactOnComment.rejected,
          addGeneralComment.rejected,
          addReplyComment.rejected
        ),
        (state) => {
          if (state.isPending) {
            const newState = {
              ...state,
              ...REJECTED_STATE
            };
            return newState;
          }
          return state;
        }
      )

      .addMatcher(
        isAnyOf(
          getJournalInfo.fulfilled,
          reactOnComment.fulfilled,
          addGeneralComment.fulfilled,
          addReplyComment.fulfilled
        ),
        (state, { payload }) => ({
          ...state,
          journal: {
            id: payload?.id || null,
            name: payload?.name || null,
            area: payload?.area || null,
            year: payload?.year || null,
            citescore: payload?.citescore || null,
            avatarUri: payload?.avatarUri || null,
            comments: payload?.comments || []
          },
          ...FULFILLED_STATE
        })
      );
  }
});

const journalPagePersistConfig = {
  key: JOURNALPAGE,
  storage
};

const { actions: journalPageActions, reducer: journalPageReducer } =
  journalPageSlice;
export { journalPageActions, journalPageReducer, journalPagePersistConfig };
