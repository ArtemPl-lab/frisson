import { observer } from "mobx-react-lite";
import { useStore } from "./store";
import { AuthRoutes, BaseRoutes } from "./Routes";
import { Load } from "./pages/Load";
import { useEffect, useState } from "react";

function App() {
  const { admin, load } = useStore();
  const [loaded, setLoad] = useState(false);
  useEffect(async () => {
    await load;
    setLoad(true);
  }, [loaded]);
  if(!loaded) return <Load />
  if(!admin.data) return <AuthRoutes />
  return <BaseRoutes />
}

export default observer(App);
