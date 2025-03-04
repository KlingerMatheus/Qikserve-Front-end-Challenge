import {
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "@/assets/icons";
import { RootState } from "@/types";
import { formatPrice } from "@/utils";
import { useBreakpoints } from "@/hooks";
import { cartAddNewItem } from "@/reducers/slices/cartSlice";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";

import "./selected-item-modal.css";

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
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    unitPrice: selectedItem?.price,
  });
  const totalPrice = useMemo(
    () => (selectedOption.unitPrice ?? 0) * quantity,
    [quantity, selectedOption.unitPrice]
  );
  const { isMobileOrTablet } = useBreakpoints();
  const dispatch = useDispatch();

  function handleAddItemToOrder() {
    if (!selectedItem) return;

    dispatch(
      cartAddNewItem({
        ...selectedItem,
        selectedModifierId: selectedOption.modifierId,
        quantity,
        unitPrice: selectedOption.unitPrice ?? 0,
      })
    );
    closeModal();
  }

  function quantityAction(type: "increment" | "decrement") {
    if (type === "decrement") setQuantity((prevState) => prevState - 1);
    else if (type === "increment") setQuantity((prevState) => prevState + 1);

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
                          <span className="option-name">{item.name}</span>
                          <span className="option-price">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <input
                          type="radio"
                          id={item.id.toString()}
                          name="modifier-option"
                          value={item.id}
                          onChange={() => {
                            setSelectedOption({
                              modifierId: item.id,
                              unitPrice: item.price,
                            });
                          }}
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
            <div className="quantity-control">
              <button
                disabled={quantity <= 1}
                onClick={() => quantityAction("decrement")}
              >
                <MinusIcon />
              </button>
              <span>{quantity}</span>
              <button onClick={() => quantityAction("increment")}>
                <PlusIcon />
              </button>
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
