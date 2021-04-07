import { get } from 'lodash';

const responseEnvelope = ({ data, countPath }) => ({
  records: data,
  metadata: {
    totalCount: get(data, countPath, data).length,
  },
});


export default responseEnvelope;