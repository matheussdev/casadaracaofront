import { Navigation } from "./Routes/Routes";
import { AuthProvider } from "./hooks/useAuth";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
("dayjs");
dayjs.locale("pt-br");

function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
}

export default App;
