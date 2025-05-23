import { useEffect } from "react";
import { AddNewProduct } from "./Components/AddNewProduct";
import { AllProduct } from "./Components/AllProduct";
import { DeleteProduct } from "./Components/DeleteProduct";
import { SpecificProduct } from "./Components/SpecificProduct";
import { UpdateProduct } from "./Components/UpdateProduct";
import { Counter } from "./features/counter/Counter";
// import { AddPost } from "./features/slice/AddPost";
import { PostList } from "./features/slice/async/Posts/PostList";
import { useAppDispatch } from "./app/store";
import { fetchUsers } from "./features/slice/async/User/usersSlice";
import { AddPost } from "./features/slice/async/Posts/AddPost";
// import { PostList } from "./features/slice/PostList";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Fetching users...");

    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <main className="p-2">
      <AddPost />
      {/* <PostList /> */}
      <PostList />
      {/* <Counter /> */}
      {/* <AllProduct /> */}
      {/* <SpecificProduct /> */}
      {/* <AddNewProduct /> */}
      {/* <UpdateProduct productId={4} />
      <DeleteProduct productId={2} /> */}
    </main>
  );
}

export default App;
