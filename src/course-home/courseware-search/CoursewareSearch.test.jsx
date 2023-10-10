import React from 'react';
import {
  initializeMockApp,
  render,
  screen,
} from '../../setupTest';
import { useModel } from '../../generic/model-store';
import { CoursewareSearch } from './index';

jest.mock('../../generic/model-store', () => ({
  useModel: jest.fn(),
}));

function renderComponent() {
  const { container } = render(<CoursewareSearch />);
  return container;
}

describe('CoursewareSearch', () => {
  beforeAll(async () => {
    initializeMockApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When rendered by default', () => {
    beforeEach(() => {
      useModel.mockReturnValue({ enabled: false });
      renderComponent();
    });

    it('Should not show', () => {
      expect(screen.queryByTestId('courseware-search-button')).not.toBeInTheDocument();
    });
  });

  describe('When rendered with the waffle flag enabled', () => {
    beforeEach(() => {
      useModel.mockReturnValue({ enabled: true });
      renderComponent();
    });

    it('Should show', () => {
      expect(screen.getByTestId('courseware-search-button')).toBeInTheDocument();
    });
  });
});
