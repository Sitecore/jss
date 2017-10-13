import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { commonContainer } from 'enhancers';
import * as actions from './actions';

import DownloadCallout from './DownloadCallout';

const mapStateToProps = (state, ownProps) => ({
  loading: state.downloadCallout.loading,
  data: state.downloadCallout.data,
  show: state.downloadCallout.show,
  language: state.app.currentLang,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(commonContainer(DownloadCallout));
