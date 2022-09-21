import {
  CHECK_NEW_DOCUMENTS,
  LAST_DATE_ACQUISITION,
  RESET_DOCUMENTS,
  SET_CHECKED_ALL_LIST,
  SET_COLLECTION,
  SET_CURRENT_ARTICLE,
  SET_CURRENT_FILTER,
  SET_DOCUMENTS,
  SET_LOADING,
  SET_ORDER_DOC,
} from './store.actions';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DOCUMENTS:
      const newJson = action.payload;

      const newDocuments = [...state.documents, newJson?.documents]
        .flat()
        .sort((a, b) =>
          a?.ingestDate && b?.ingestDate
            ? new Date(b.ingestDate) - new Date(a.ingestDate)
            : -1
        );

      const copySection = [...state.sections];

      Object.entries(newJson?.sections).map(([key, count]) => {
        copySection.push({ key: key, count: count });
      });

      const newSection = copySection
        .reduce((acc, val) => {
          const index = acc.findIndex((obj) => obj.key === val.key);
          if (index !== -1) {
            acc[index].count += val.count;
          } else {
            acc.push({
              key: val.key,
              count: val.count,
            });
          }
          return acc;
        }, [])
        .sort((a, b) => b.count - a.count);

      const corruptedDocumentsIds = [
        ...new Set([
          ...state.corruptedDocumentsIds,
          ...(newJson.corruptedDocuments || []),
        ]),
      ];

      return {
        ...state,
        documents: newDocuments || [...state.documents],
        sections: newSection || [...state.sections],
        corruptedDocumentsIds,
      };

    case SET_ORDER_DOC:
      const order = action.payload;

      if (order === 'ascA') {
        const newDocOrder = [...state.documents].sort((a, b) =>
          a?.ingestDate && b?.ingestDate
            ? new Date(a.ingestDate) - new Date(b.ingestDate)
            : -1
        );

        return {
          ...state,
          documents: newDocOrder,
          orderBy: order,
        };
      } else if (order === 'descA') {
        const newDocOrder = [...state.documents].sort((a, b) =>
          a?.ingestDate && b?.ingestDate
            ? new Date(b.ingestDate) - new Date(a.ingestDate)
            : -1
        );

        return {
          ...state,
          documents: newDocOrder,
          orderBy: order,
        };
      } else if (order === 'ascP') {
        const newDocOrder = [...state.documents].sort((a, b) =>
          a?.schema?.document?.datadoc && b?.schema?.document?.datadoc
            ? new Date(b.schema.document.datadoc) -
              new Date(a.schema.document.datadoc)
            : -1
        );

        return {
          ...state,
          documents: newDocOrder,
          orderBy: order,
        };
      } else if (order === 'descP') {
        const newDocOrder = [...state.documents].sort((a, b) =>
          a?.schema?.document?.datadoc && b?.schema?.document?.datadoc
            ? new Date(a.schema.document.datadoc) -
              new Date(b.schema.document.datadoc)
            : -1
        );

        return {
          ...state,
          documents: newDocOrder,
          orderBy: order,
        };
      }

    case SET_COLLECTION:
      const newCollection = action.payload;

      return {
        ...state,
        collection: newCollection,
      };

    case SET_CURRENT_ARTICLE:
      const newCurrentArticle = action.payload;

      return {
        ...state,
        currentArticle: newCurrentArticle,
      };

    case SET_CHECKED_ALL_LIST:
      const checkedAll = action.payload;

      if (checkedAll) {
        return {
          ...state,
          collection: [...state.documents],
        };
      } else {
        return {
          ...state,
          collection: [],
        };
      }

    case SET_CURRENT_FILTER:
      const newCurrentFilter = action.payload;

      return {
        ...state,
        currentFilter: newCurrentFilter,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CHECK_NEW_DOCUMENTS:
      return {
        ...state,
        checkNewDocuments: {
          loading: action.payload,
        },
      };

    case LAST_DATE_ACQUISITION:
      const date = action.payload;

      return {
        ...state,
        lastDateAcquisition: date,
      };

    case RESET_DOCUMENTS:
      return {
        documents: [],
        sections: [],
        currentFilter: '',
        collection: [],
        currentArticle: {},
        orderBy: 'desc',
        loading: true,
        checkNewDocuments: { loading: false },
        corruptedDocumentsIds: [],
        lastDateAcquisition: false,
      };

    default:
      return state;
  }
}
