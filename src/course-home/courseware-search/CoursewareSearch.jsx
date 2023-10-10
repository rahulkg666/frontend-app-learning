import React from 'react';
import { useParams } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button, Icon } from '@edx/paragon';
import { Search } from '@edx/paragon/icons';
import { useModel } from '../../generic/model-store';
import messages from './messages';

const CoursewareSearch = ({ intl, ...rest }) => {
  const { courseId } = useParams();
  const { enabled } = useModel('coursewareSearch', courseId);

  if (!enabled) { return null; }

  return (
    <Button variant="tertiary" size="sm" className="p-1 mt-2 mr-2 rounded-lg" aria-label={intl.formatMessage(messages.searchOpenAction)} data-testid="courseware-search-button" {...rest}>
      <Icon src={Search} />
    </Button>
  );
};

CoursewareSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CoursewareSearch);
