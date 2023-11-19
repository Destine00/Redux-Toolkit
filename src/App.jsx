import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { calcTotals, getCartItems } from "./features/cart/CartSlice";
import Modal from "./components/Modal";

function App() {
  const { cart, loading } = useSelector((store) => store.cart);
  const { isModalOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  useEffect(() => {
    dispatch(calcTotals());
  }, [cart]);

  if (loading) {
    return <div className="loading"></div>
  }

  return (
    <main>
      {isModalOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
