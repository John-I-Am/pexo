'use client';

import { unauthenticate } from '../api/actions';

export default function Page() {
  return (
    <div>
      <h1>This is the dashboard</h1>
      <button type="button" onClick={() => unauthenticate()}>
        Logout
      </button>
    </div>
  );
}
