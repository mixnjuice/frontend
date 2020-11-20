import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';

afterEach(cleanup);

expect.extend({ toMatchDiffSnapshot });
