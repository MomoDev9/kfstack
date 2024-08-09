import { Suspense } from "react";

import Search from "./page";
import Loading from "../../components/loading";

export default function Template() {
  return (
    <Suspense fallback={<Loading />}>
      <Search />
    </Suspense>
  );
}
