import AppLayout from "./layouts/AppLayout";

const App = () => {


  return (
    // provide a UserContextProvider as parent of browser router
    <div>
      <AppLayout />
    </div>
  );
};

export default App;
