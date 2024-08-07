import { Suspense } from "react";

import Search from "./page";

export default function Template() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}
