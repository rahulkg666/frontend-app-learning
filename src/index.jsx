import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
  mergeConfig,
  getConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage, PageWrap } from '@edx/frontend-platform/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { fetchDiscussionTab, fetchLiveTab } from './course-home/data/thunks';
import DiscussionTab from './course-home/discussion-tab/DiscussionTab';

import messages from './i18n';
import { UserMessagesProvider } from './generic/user-messages';

import './index.scss';
import OutlineTab from './course-home/outline-tab';
import { CourseExit } from './courseware/course/course-exit';
import CoursewareContainer from './courseware';
import CoursewareRedirectLandingPage from './courseware/CoursewareRedirectLandingPage';
import DatesTab from './course-home/dates-tab';
import GoalUnsubscribe from './course-home/goal-unsubscribe';
import ProgressTab from './course-home/progress-tab/ProgressTab';
import { TabContainer } from './tab-page';

import { fetchDatesTab, fetchOutlineTab, fetchProgressTab } from './course-home/data';
import { fetchCourse } from './courseware/data';
import initializeStore from './store';
import NoticesProvider from './generic/notices';
import PathFixesProvider from './generic/path-fixes';
import LiveTab from './course-home/live-tab/LiveTab';
import CourseAccessErrorPage from './generic/CourseAccessErrorPage';
import DecodePageRoute from './decode-page-route';
import { DECODE_ROUTES, ROUTES } from './constants';
subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={initializeStore()}>
      <Helmet>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      </Helmet>
      <PathFixesProvider>
        <NoticesProvider>
          <UserMessagesProvider>
            <Routes>
              <Route path={ROUTES.UNSUBSCRIBE} element={<PageWrap><GoalUnsubscribe /></PageWrap>} />
              <Route path={ROUTES.REDIRECT} element={<PageWrap><CoursewareRedirectLandingPage /></PageWrap>} />
              <Route
                path={DECODE_ROUTES.ACCESS_DENIED}
                element={<DecodePageRoute><CourseAccessErrorPage /></DecodePageRoute>}
              />
              <Route
                path={DECODE_ROUTES.HOME}
                element={(
                  <DecodePageRoute>
                    <TabContainer tab="outline" fetch={fetchOutlineTab} slice="courseHome">
                      <OutlineTab />
                    </TabContainer>
                  </DecodePageRoute>
              )}
              />
              <Route
                path={DECODE_ROUTES.LIVE}
                element={(
                  <DecodePageRoute>
                    <TabContainer tab="lti_live" fetch={fetchLiveTab} slice="courseHome">
                      <LiveTab />
                    </TabContainer>
                  </DecodePageRoute>
                )}
              />
              <Route
                path={DECODE_ROUTES.DATES}
                element={(
                  <DecodePageRoute>
                    <TabContainer tab="dates" fetch={fetchDatesTab} slice="courseHome">
                      <DatesTab />
                    </TabContainer>
                  </DecodePageRoute>
                )}
              />
              <Route
                path={DECODE_ROUTES.DISCUSSION}
                element={(
                  <DecodePageRoute>
                    <TabContainer tab="discussion" fetch={fetchDiscussionTab} slice="courseHome">
                      <DiscussionTab />
                    </TabContainer>
                  </DecodePageRoute>
                )}
              />
              {DECODE_ROUTES.PROGRESS.map((route) => (
                <Route
                  path={route}
                  element={(
                    <DecodePageRoute>
                      <TabContainer
                        tab="progress"
                        fetch={fetchProgressTab}
                        slice="courseHome"
                        isProgressTab
                      >
                        <ProgressTab />
                      </TabContainer>
                    </DecodePageRoute>
                  )}
                />
              ))}
              <Route
                path={DECODE_ROUTES.COURSE_END}
                element={(
                  <DecodePageRoute>
                    <TabContainer tab="courseware" fetch={fetchCourse} slice="courseware">
                      <CourseExit />
                    </TabContainer>
                  </DecodePageRoute>
                )}
              />
              {DECODE_ROUTES.COURSEWARE.map((route) => (
                <Route
                  path={route}
                  element={(
                    <DecodePageRoute>
                      <CoursewareContainer />
                    </DecodePageRoute>
                  )}
                />
              ))}
            </Routes>
          </UserMessagesProvider>
        </NoticesProvider>
      </PathFixesProvider>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig({
        CONTACT_URL: process.env.CONTACT_URL || null,
        CREDENTIALS_BASE_URL: process.env.CREDENTIALS_BASE_URL || null,
        CREDIT_HELP_LINK_URL: process.env.CREDIT_HELP_LINK_URL || null,
        DISCUSSIONS_MFE_BASE_URL: process.env.DISCUSSIONS_MFE_BASE_URL || null,
        ENTERPRISE_LEARNER_PORTAL_HOSTNAME: process.env.ENTERPRISE_LEARNER_PORTAL_HOSTNAME || null,
        ENABLE_JUMPNAV: process.env.ENABLE_JUMPNAV || null,
        ENABLE_NOTICES: process.env.ENABLE_NOTICES || null,
        INSIGHTS_BASE_URL: process.env.INSIGHTS_BASE_URL || null,
        SEARCH_CATALOG_URL: process.env.SEARCH_CATALOG_URL || null,
        SOCIAL_UTM_MILESTONE_CAMPAIGN: process.env.SOCIAL_UTM_MILESTONE_CAMPAIGN || null,
        STUDIO_BASE_URL: process.env.STUDIO_BASE_URL || null,
        SUPPORT_URL: process.env.SUPPORT_URL || null,
        SUPPORT_URL_CALCULATOR_MATH: process.env.SUPPORT_URL_CALCULATOR_MATH || null,
        SUPPORT_URL_ID_VERIFICATION: process.env.SUPPORT_URL_ID_VERIFICATION || null,
        SUPPORT_URL_VERIFIED_CERTIFICATE: process.env.SUPPORT_URL_VERIFIED_CERTIFICATE || null,
        TERMS_OF_SERVICE_URL: process.env.TERMS_OF_SERVICE_URL || null,
        TWITTER_HASHTAG: process.env.TWITTER_HASHTAG || null,
        TWITTER_URL: process.env.TWITTER_URL || null,
        LEGACY_THEME_NAME: process.env.LEGACY_THEME_NAME || null,
        EXAMS_BASE_URL: process.env.EXAMS_BASE_URL || null,
        PROCTORED_EXAM_FAQ_URL: process.env.PROCTORED_EXAM_FAQ_URL || null,
        PROCTORED_EXAM_RULES_URL: process.env.PROCTORED_EXAM_RULES_URL || null,
        CHAT_RESPONSE_URL: process.env.CHAT_RESPONSE_URL || null,
        PRIVACY_POLICY_URL: process.env.PRIVACY_POLICY_URL || null,
      }, 'LearnerAppConfig');
    },
  },
  messages,
});
