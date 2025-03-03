import { createPortal } from "react-dom";
import "./style.css";
import {
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "@/assets/icons";
import { RootState } from "@/types";
import { useSelector } from "react-redux";
import { formatPrice } from "@/utils";
import { PrimaryButton } from "../primary-button";
import { useBreakpoints } from "@/hooks";

interface Props {
  closeModal: VoidFunction;
}

type SelectedOption = { modifierId?: number; unitPrice?: number };

const AddOrderModalComponent: FunctionComponent<PropsWithChildren<Props>> = ({
  closeModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const selectedItem = useSelector(
    (state: RootState) => state.cart.selectedItem
  );
  const [amount, setAmount] = useState(1);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    unitPrice: selectedItem?.price,
  });
  const totalPrice = useMemo(
    () => (selectedOption.unitPrice ?? 0) * amount,
    [amount, selectedOption.unitPrice]
  );
  const device = useBreakpoints();
  const isMobileOrTablet = ["mobile", "tablet"].includes(device);

  function handleAddItemToOrder() {
    alert("Added");
    closeModal();
  }

  function amountAction(type: "increment" | "decrement") {
    if (type === "decrement") setAmount((prevState) => prevState - 1);
    else if (type === "increment") setAmount((prevState) => prevState + 1);

    return;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        ref={modalRef}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="close-button" onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <div>
          {selectedItem?.images && (
            <img
              src={selectedItem?.images?.[0].image}
              alt={selectedItem?.name}
            />
          )}
          <div className="modal-info">
            <h2>{selectedItem?.name}</h2>
            <p>{selectedItem?.description}</p>
          </div>
        </div>
        {selectedItem?.modifiers?.map((modifier) => (
          <>
            <div className="item-modifiers">
              <span className="modifier-name">{modifier.name}</span>
              <span className="modifier-limit">
                Select {modifier.maxChoices} option
              </span>
            </div>
            <div className="modifier-options">
              {modifier?.items.map(
                (item) =>
                  item.visible && (
                    <div className="modifier-options-option-container">
                      <label htmlFor={item.id.toString()}>
                        <div className="modifier-options-option">
                          <span className="option-name">{item.name}</span>{" "}
                          <span className="option-price">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <input
                          type="radio"
                          id={item.id.toString()}
                          name="modifier-option"
                          value={item.id}
                          onChange={() =>
                            setSelectedOption({
                              modifierId: item.id,
                              unitPrice: item.price,
                            })
                          }
                        />
                      </label>
                    </div>
                  )
              )}
            </div>
          </>
        ))}
        {(!selectedItem?.modifiers ||
          selectedOption.modifierId ||
          isMobileOrTablet) && (
          <div className="container-add-order">
            <div className="amount-control">
              <button
                disabled={amount <= 1}
                onClick={() => amountAction("decrement")}
              >
                -
              </button>
              <span>{amount}</span>
              <button onClick={() => amountAction("increment")}>+</button>
            </div>
            <PrimaryButton
              disabled={totalPrice <= 0}
              onClick={handleAddItemToOrder}
              label={`Add to order • ${formatPrice(totalPrice)}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const Modal: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  return createPortal(<AddOrderModalComponent {...props} />, document.body);
};
